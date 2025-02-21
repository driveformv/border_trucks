const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function checkImages() {
  try {
    // Check trucks
    const trucksSnapshot = await get(ref(db, 'vehicles/trucks'));
    const trucks = trucksSnapshot.val();
    
    console.log('\nTRUCKS WITH IMAGES:');
    Object.entries(trucks || {}).forEach(([id, truck]) => {
      if (truck.images && truck.images.length > 0) {
        console.log(`\nTruck ${id}:`);
        console.log('Images:', truck.images);
      }
    });

    // Check trailers
    const trailersSnapshot = await get(ref(db, 'vehicles/trailers'));
    const trailers = trailersSnapshot.val();
    
    console.log('\nTRAILERS WITH IMAGES:');
    Object.entries(trailers || {}).forEach(([id, trailer]) => {
      if (trailer.images && trailer.images.length > 0) {
        console.log(`\nTrailer ${id}:`);
        console.log('Images:', trailer.images);
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();
