import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  authDomain: "bordertrucks-d8624.firebaseapp.com",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com",
  projectId: "bordertrucks-d8624",
  storageBucket: "bordertrucks-d8624.firebasestorage.app",
  messagingSenderId: "1046286132964",
  appId: "1:1046286132964:web:b8951fa9f7d392ba0deef1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

async function fetchImagesForVehicle(vehicleType: 'trucks' | 'trailers', vehicleId: string) {
  try {
    // List all images in the vehicle's storage directory
    const vehicleRef = storageRef(storage, `vehicles/${vehicleType}/${vehicleId}`);
    const result = await listAll(vehicleRef);

    if (result.items.length === 0) {
      console.log(`No images found for ${vehicleType} ${vehicleId}`);
      return [];
    }

    // Get download URLs for all images
    const imageUrls = await Promise.all(
      result.items.map(async (imageRef) => {
        const url = await getDownloadURL(imageRef);
        return {
          id: imageRef.name.split('.')[0], // Use filename without extension as ID
          url,
          isPrimary: false // Will set first image as primary later
        };
      })
    );

    // Sort by timestamp in filename if present
    imageUrls.sort((a, b) => {
      const getTimestamp = (url: string) => {
        const match = url.match(/\/(\d+)_/);
        return match ? parseInt(match[1]) : 0;
      };
      return getTimestamp(a.url) - getTimestamp(b.url);
    });

    // Set first image as primary
    if (imageUrls.length > 0) {
      imageUrls[0].isPrimary = true;
    }

    return imageUrls;
  } catch (error) {
    if ((error as any).code === 'storage/object-not-found') {
      console.log(`No images directory found for ${vehicleType} ${vehicleId}`);
      return [];
    }
    throw error;
  }
}

async function updateVehicleImages() {
  try {
    // Sign in
    console.log('Signing in...');
    await signInWithEmailAndPassword(auth, process.env.ADMIN_EMAIL || 'admin@driveformvt.com', process.env.ADMIN_PASSWORD || '04100B0rd3rTrucks.');
    console.log('Successfully signed in');

    // Get all vehicles from database
    console.log('\nFetching vehicles from database...');
    const dbSnapshot = await get(dbRef(db, 'vehicles'));
    const dbData = dbSnapshot.val() || {};

    const updates: Record<string, any> = {};

    // Process trucks
    console.log('\nProcessing trucks...');
    const trucks = dbData.trucks || {};
    for (const [truckId, truck] of Object.entries(trucks)) {
      console.log(`Processing truck ${truckId}...`);
      try {
        const images = await fetchImagesForVehicle('trucks', truckId);
        if (images.length > 0) {
          updates[`vehicles/trucks/${truckId}/images`] = images;
        }
      } catch (error) {
        console.error(`Error processing truck ${truckId}:`, error);
      }
    }

    // Process trailers
    console.log('\nProcessing trailers...');
    const trailers = dbData.trailers || {};
    for (const [trailerId, trailer] of Object.entries(trailers)) {
      console.log(`Processing trailer ${trailerId}...`);
      try {
        const images = await fetchImagesForVehicle('trailers', trailerId);
        if (images.length > 0) {
          updates[`vehicles/trailers/${trailerId}/images`] = images;
        }
      } catch (error) {
        console.error(`Error processing trailer ${trailerId}:`, error);
      }
    }

    // Apply all updates
    if (Object.keys(updates).length > 0) {
      console.log('\nUpdating database with storage images...');
      await update(dbRef(db), updates);
      console.log('Successfully updated vehicle images');
    } else {
      console.log('\nNo updates needed');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateVehicleImages();
