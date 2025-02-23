import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

async function activateVehicles() {
  try {
    // Authenticate first
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Authentication successful');

    const updates = {};

    // Get trucks
    const trucksRef = ref(db, 'vehicles/trucks');
    const trucksSnap = await get(trucksRef);
    if (trucksSnap.exists()) {
      const trucks = trucksSnap.val();
      Object.keys(trucks).forEach(truckId => {
        updates[`vehicles/trucks/${truckId}/status`] = 'active';
      });
    }

    // Get trailers
    const trailersRef = ref(db, 'vehicles/trailers');
    const trailersSnap = await get(trailersRef);
    if (trailersSnap.exists()) {
      const trailers = trailersSnap.val();
      Object.keys(trailers).forEach(trailerId => {
        updates[`vehicles/trailers/${trailerId}/status`] = 'active';
      });
    }

    // Update all vehicles at once
    await update(ref(db), updates);
    console.log('All vehicles have been activated');

  } catch (error) {
    console.error('Error:', error);
  }
}

activateVehicles();
