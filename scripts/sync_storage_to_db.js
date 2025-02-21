const { initializeApp } = require('firebase/app');
const { getDatabase, ref: dbRef, update, get } = require('firebase/database');
const { getStorage, ref: storageRef, listAll, getDownloadURL, uploadBytes } = require('firebase/storage');
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

async function waitForAuth() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function processVehicleImages(vehicleType, vehicleId) {
  console.log(`Processing ${vehicleType} ${vehicleId}...`);
  try {
    const imagesRef = storageRef(storage, `vehicles/${vehicleType}/${vehicleId}`);
    const imagesList = await listAll(imagesRef);
    if (imagesList.items.length === 0) {
      console.log(`No images found for ${vehicleType} ${vehicleId}`);
      return;
    }

    const imageUrls = await Promise.all(
      imagesList.items.map(imageRef => getDownloadURL(imageRef))
    );
    
    // Sort URLs by timestamp in filename
    imageUrls.sort((a, b) => {
      const getTimestamp = (url) => {
        const match = url.match(/\/(\d+)_/);
        return match ? parseInt(match[1]) : 0;
      };
      return getTimestamp(a) - getTimestamp(b);
    });

    // Update database
    const updates = {};
    updates[`vehicles/${vehicleType}/${vehicleId}/images`] = imageUrls;
    await update(dbRef(db), updates);
    console.log(`Updated ${vehicleType} ${vehicleId} with ${imageUrls.length} images`);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log(`No images directory found for ${vehicleType} ${vehicleId}`);
    } else {
      console.error(`Error processing ${vehicleType} ${vehicleId}:`, error);
    }
  }
}

async function syncStorageToDb() {
  try {
    // 1. Sign in
    console.log('Signing in...');
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Successfully signed in');

    // 2. Wait for auth to be ready
    console.log('Waiting for auth to be ready...');
    const user = await waitForAuth();
    if (!user) {
      throw new Error('Authentication failed');
    }
    console.log('Auth ready, user ID:', user.uid);

    // 3. Get all vehicles from database
    console.log('\nFetching current database data...');
    const dbSnapshot = await get(dbRef(db, 'vehicles'));
    const dbData = dbSnapshot.val() || {};
    
    // 4. Process trucks
    console.log('\nProcessing trucks...');
    const trucks = dbData.trucks || {};
    for (const truckId of Object.keys(trucks)) {
      await processVehicleImages('trucks', truckId);
    }

    // 5. Process trailers
    console.log('\nProcessing trailers...');
    const trailers = dbData.trailers || {};
    for (const trailerId of Object.keys(trailers)) {
      await processVehicleImages('trailers', trailerId);
    }

    console.log('\nStorage to database sync completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    console.error('Error details:', error.stack);
    process.exit(1);
  }
}

syncStorageToDb();
