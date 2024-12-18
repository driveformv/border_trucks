const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  authDomain: "bordertrucks-d8624.firebaseapp.com",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com",
  projectId: "bordertrucks-d8624",
  storageBucket: "bordertrucks-d8624.firebasestorage.app",
  messagingSenderId: "1046286132964",
  appId: "1:1046286132964:web:7ccbe2cdbb041df90deef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Sample truck data
const sampleTruck = {
  details: {
    id: "T123456",
    type: "truck",
    condition: "Used",
    stockType: "USED",
    make: "INTERNATIONAL",
    model: "LT625",
    year: 2019,
    price: 25750,
    mileage: 642227,
    stockNumber: "123456",
    vin: "3HSKZAPR2KN141534",
    description: "2019 INTERNATIONAL LT625",
    engineMake: "CUMMINS",
    engineModel: "X15",
    horsepower: 450,
    transmission: "AUTOMATIC",
    transmissionType: "Automatic",
    location: "Border International",
    apu: true,
    pto: true,
    collisionMitigation: true,
    bunkBeds: true,
    rawCsvData: {
      unitId: "123456",
      stockType: "USED",
      make: "INTERNATIONAL",
      model: "LT625",
      year: "2019",
      price: "25750",
      mileage: "642227",
      vin: "3HSKZAPR2KN141534",
      engine: "X15",
      engineMake: "CUMMINS",
      horsepower: "450",
      transmissionType: "AUTOMATIC",
      suspensionType: "AIR RIDE",
      driveTrain: "6x4",
      apu: "Y",
      pto: "Y",
      collisionMitigation: "Y",
      bunkBeds: "Y"
    }
  },
  specs: {
    suspension: "AIR RIDE",
    driveTrain: "6x4",
    engine: "CUMMINS X15",
    transmission: "AUTOMATIC"
  },
  features: ["APU", "PTO", "Collision Mitigation", "Bunk Beds"],
  category: ["USED"],
  images: [],
  status: "active",
  lastUpdated: {
    ".sv": "timestamp"
  }
};

// Sample trailer data
const sampleTrailer = {
  details: {
    id: "TR123456",
    type: "trailer",
    condition: "Used",
    stockType: "USED",
    make: "UTILITY",
    model: "VS2RA",
    year: 2024,
    price: 89500,
    stockNumber: "123456",
    vin: "1UYVS2538RP123456",
    description: "2024 UTILITY VS2RA",
    trailerType: "Reefer",
    location: "Border International",
    skirts: true,
    airPressurePkg: true,
    refer: true,
    aeroPkgRear: true,
    rawCsvData: {
      unitId: "123456",
      stockType: "USED",
      make: "UTILITY",
      model: "VS2RA",
      year: "2024",
      price: "89500",
      vin: "1UYVS2538RP123456",
      bodyType: "Reefer",
      gvwr: "68000",
      type: "Van",
      tandem: "Sliding",
      wheels: "8",
      skirts: "Y",
      airPressurePkg: "Y",
      refer: "Y",
      aeroPkgRear: "Y"
    }
  },
  specs: {
    bodyType: "Reefer",
    gvwr: "68000 lbs",
    type: "Van",
    tandem: "Sliding",
    wheels: "8"
  },
  features: ["Side Skirts", "Air Pressure Package", "Refrigeration Unit", "Aerodynamic Package"],
  category: ["USED"],
  images: [],
  status: "active",
  lastUpdated: {
    ".sv": "timestamp"
  }
};

async function writeTestData() {
  try {
    // Sign in with admin credentials
    console.log('Signing in...');
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Signed in successfully');

    // Write truck data
    console.log('Writing truck data...');
    await set(ref(db, 'vehicles/trucks/T123456'), sampleTruck);
    console.log('Truck data written successfully');

    // Write trailer data
    console.log('Writing trailer data...');
    await set(ref(db, 'vehicles/trailers/TR123456'), sampleTrailer);
    console.log('Trailer data written successfully');

    console.log('All test data written successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

writeTestData();
