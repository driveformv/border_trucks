const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');
const { getStorage, ref: storageRef, listAll } = require('firebase/storage');

const app = initializeApp({
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com",
  storageBucket: "bordertrucks-d8624.appspot.com"
});

const db = getDatabase(app);
const storage = getStorage(app);

async function checkVehicleImages(vehicleId) {
  try {
    const imagesRef = storageRef(storage, `vehicles/trucks/${vehicleId}`);
    const imagesList = await listAll(imagesRef);
    return imagesList.items.length;
  } catch (error) {
    console.error(`Error checking images for vehicle ${vehicleId}:`, error);
    return 0;
  }
}

// Get trucks and check their images
async function checkTrucksAndImages() {
  try {
    const snapshot = await get(ref(db, 'vehicles/trucks'));
    const trucks = snapshot.val();
    
    if (!trucks) {
      console.log('No trucks found in the database');
      return;
    }

    console.log('Found', Object.keys(trucks).length, 'trucks');

    for (const [truckId, truck] of Object.entries(trucks)) {
      const imageCount = await checkVehicleImages(truckId);
      console.log(`Truck ${truckId}:`, {
        make: truck.make,
        model: truck.model,
        year: truck.year,
        imagesInDB: truck.images ? truck.images.length : 0,
        imagesInStorage: imageCount,
        hasImageMismatch: truck.images?.length !== imageCount
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkTrucksAndImages();
