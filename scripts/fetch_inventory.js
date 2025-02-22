const Client = require('ssh2-sftp-client');
const { parse } = require('csv-parse/sync');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set, update } = require('firebase/database');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  authDomain: "bordertrucks-d8624.firebaseapp.com",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com",
  projectId: "bordertrucks-d8624",
  storageBucket: "bordertrucks-d8624.firebasestorage.app",
  messagingSenderId: "1046286132964",
  appId: "1:1046286132964:web:b8951fa9f7d392ba0deef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Transform truck data to match Vehicle interface
function transformTruckData(truck, existingData = {}) {
  // Helper to handle undefined/null values
  const clean = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        obj[key] = '';  // Convert undefined/null to empty string
      } else if (typeof obj[key] === 'object') {
        clean(obj[key]);  // Recursively clean nested objects
      }
    });
    return obj;
  };

  // Keep existing images or use placeholder if none exist
  const images = existingData.images && existingData.images.length > 0 
    ? existingData.images 
    : [{
        id: 'placeholder',
        url: 'https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/vehicles%2Fplaceholder.jpg?alt=media',
        isPrimary: true
      }];

  return clean({
    id: `T${truck.UntId}`,
    type: 'truck',
    condition: truck['Stock Type']?.startsWith('NEW') ? 'New' : 'Used',
    make: truck.Make || '',
    model: truck.Model || '',
    year: parseInt(truck.Year) || 0,
    price: parseInt(truck.Price) || 0,
    mileage: parseInt(truck.Mileage) || 0,
    stockNumber: truck.UntId || '',
    vin: truck.VIN || '',
    description: `${truck.Year || ''} ${truck.Make || ''} ${truck.Model || ''} - ${truck.Engine || ''} ${truck['Engine Make'] || ''}`.trim(),
    engineMake: truck['Engine Make'] || '',
    engineModel: truck.Engine || '',
    horsepower: parseInt(truck.Horsepower) || 0,
    transmission: truck['Transmission Type'] || '',
    transmissionType: truck['Transmission Type']?.toLowerCase().includes('auto') ? 'Automatic' : 'Manual',
    location: 'Border International',
    specs: {
      suspension: truck['Suspension Type'] || 'N/A',
      driveTrain: truck['Drive Train'] || 'N/A',
      engine: `${truck['Engine Make'] || ''} ${truck.Engine || ''}`.trim() || 'N/A',
      transmission: truck['Transmission Type'] || 'N/A'
    },
    features: [
      truck.APU === 'Y' && 'APU',
      truck.PTO === 'Y' && 'PTO',
      truck['Collision Mitigation'] === 'Y' && 'Collision Mitigation',
      truck['Bunk Beds'] === 'Y' && 'Bunk Beds'
    ].filter(Boolean),
    category: [truck['Stock Type'] || 'UNKNOWN'],
    images: images,
    status: 'active',
    lastUpdated: {
      '.sv': 'timestamp'
    }
  });
}

// Transform trailer data to match Vehicle interface
function transformTrailerData(trailer, existingData = {}) {
  // Helper to handle undefined/null values
  const clean = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        obj[key] = '';  // Convert undefined/null to empty string
      } else if (typeof obj[key] === 'object') {
        clean(obj[key]);  // Recursively clean nested objects
      }
    });
    return obj;
  };

  // Keep existing images or use placeholder if none exist
  const images = existingData.images && existingData.images.length > 0 
    ? existingData.images 
    : [{
        id: 'placeholder',
        url: 'https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/vehicles%2Fplaceholder.jpg?alt=media',
        isPrimary: true
      }];

  return clean({
    id: `TR${trailer.UntId}`,
    type: 'trailer',
    condition: trailer['Stock Type']?.startsWith('NEW') ? 'New' : 'Used',
    make: trailer.Make || '',
    model: trailer.Model || '',
    year: parseInt(trailer.Year) || 0,
    price: parseInt(trailer.Price) || 0,
    stockNumber: trailer.UntId || '',
    vin: trailer.VIN || '',
    description: `${trailer.Year || ''} ${trailer.Make || ''} ${trailer.Model || ''}`.trim(),
    trailerType: trailer['Body Type'] || '',
    location: 'Border International',
    specs: {
      bodyType: trailer['Body Type'] || 'N/A',
      gvwr: trailer.GVWR || 'N/A',
      type: trailer.Type || 'N/A',
      tandem: trailer.Tandem || 'N/A',
      wheels: trailer.Wheels || 'N/A'
    },
    features: [
      trailer.Skirts === 'Y' && 'Side Skirts',
      trailer['Air Pressure Pkg'] === 'Y' && 'Air Pressure Package',
      trailer.Refer === 'Y' && 'Refrigeration Unit',
      trailer['Aero Pkg Rear'] === 'Y' && 'Aerodynamic Package'
    ].filter(Boolean),
    category: [trailer['Stock Type'] || 'UNKNOWN'],
    images: images,
    status: 'active',
    lastUpdated: {
      '.sv': 'timestamp'
    }
  });
}

async function fetchInventory() {
  const sftp = new Client();
  
  try {
    // Sign in to Firebase and get current data
    console.log('Signing in to Firebase...');
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Firebase authentication successful');

    // Get current Firebase data
    console.log('Fetching current Firebase data...');
    const trucksSnapshot = await get(ref(db, '/vehicles/trucks'));
    const trailersSnapshot = await get(ref(db, '/vehicles/trailers'));
    
    // Get current vehicles as a map of id -> data
    const currentTrucks = trucksSnapshot.exists() ? trucksSnapshot.val() : {};
    const currentTrailers = trailersSnapshot.exists() ? trailersSnapshot.val() : {};
    console.log(`Found ${Object.keys(currentTrucks).length} existing trucks and ${Object.keys(currentTrailers).length} existing trailers`);

    console.log('Connecting to SFTP...');
    await sftp.connect({
      host: '35.192.146.69',
      port: 16308,
      username: 'testing',
      password: 'vDqvCYmuVwzSJQW'
    });
    console.log('Connected to SFTP');

    // Get truck data
    console.log('Fetching truck inventory...');
    const truckData = await sftp.get('/www/testing_144/public/trucks/truck_inventory.csv');
    const trucks = parse(truckData.toString(), {
      columns: true,
      skip_empty_lines: true
    });
    console.log(`Found ${trucks.length} trucks`);

    // Get trailer data
    console.log('Fetching trailer inventory...');
    const trailerData = await sftp.get('/www/testing_144/public/trailers/trailer_inventory.csv');
    const trailers = parse(trailerData.toString(), {
      columns: true,
      skip_empty_lines: true
    });
    console.log(`Found ${trailers.length} trailers`);

    // Transform and write data to Firebase
    console.log('Processing inventory updates...');
    
    // Prepare updates object
    const updates = {};
    
    // Process trucks
    const newTruckIds = new Set();
    trucks.forEach(truck => {
      const id = `T${truck.UntId}`;
      newTruckIds.add(id);
      const existingTruck = currentTrucks[id] || {};
      const transformed = transformTruckData(truck, existingTruck);
      transformed.status = 'active'; // Explicitly mark as active
      updates[`vehicles/trucks/${id}`] = transformed;
    });

    // Mark missing trucks as inactive
    Object.keys(currentTrucks).forEach(id => {
      if (!newTruckIds.has(id)) {
        console.log(`Marking truck ${id} as inactive`);
        updates[`vehicles/trucks/${id}/status`] = 'inactive';
        updates[`vehicles/trucks/${id}/lastUpdated`] = {'.sv': 'timestamp'};
      }
    });

    // Process trailers
    const newTrailerIds = new Set();
    trailers.forEach(trailer => {
      const id = `TR${trailer.UntId}`;
      newTrailerIds.add(id);
      const existingTrailer = currentTrailers[id] || {};
      const transformed = transformTrailerData(trailer, existingTrailer);
      transformed.status = 'active';
      updates[`vehicles/trailers/${id}`] = transformed;
    });

    // Mark missing trailers as inactive
    Object.keys(currentTrailers).forEach(id => {
      if (!newTrailerIds.has(id)) {
        console.log(`Marking trailer ${id} as inactive`);
        updates[`vehicles/trailers/${id}/status`] = 'inactive';
        updates[`vehicles/trailers/${id}/lastUpdated`] = {'.sv': 'timestamp'};
      }
    });

    // Write all updates in a single transaction
    console.log('Writing updates to Firebase...');
    await update(ref(db), updates);
    
    const stats = {
      trucks: trucks.length,
      trailers: trailers.length,
      total: trucks.length + trailers.length
    };
    
    console.log(`Success! Updated ${stats.total} vehicles (${stats.trucks} trucks, ${stats.trailers} trailers)`);

    await sftp.end();
    return stats;
  } catch (err) {
    console.error('Error:', err.message);
    if (sftp) await sftp.end();
    throw err; // Re-throw for proper error handling
  }
}

// Export the function
module.exports = { fetchInventory };

// Only run directly if this is the main module
if (require.main === module) {
  fetchInventory().catch(error => {
    console.error('Error in main:', error);
    process.exit(1);
  });
}
