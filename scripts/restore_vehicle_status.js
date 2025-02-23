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

// Original status values from the database dump
const originalStatus = {
  trucks: {
    T123456: 'inactive',
    T171984: 'inactive',
    T172082: 'inactive',
    T172112: 'inactive',
    T174456: 'active',
    T175797: 'active',
    T176977: 'active',
    T176981: 'inactive',
    T176984: 'active',
    T176985: 'inactive',
    T176986: 'inactive',
    T176987: 'inactive',
    T176988: 'inactive',
    T176992: 'active',
    T176993: 'active',
    T181749: 'active',
    T188536: 'active',
    T188810: 'active',
    T189345: 'active',
    T189406: 'active',
    T189436: 'active',
    T189582: 'active',
    T190623: 'active',
    T191120: 'active',
    T191294: 'active',
    T191910: 'active',
    T192920: 'inactive',
    T193666: 'active',
    T193721: 'inactive',
    T193724: 'inactive',
    T193725: 'inactive',
    T194601: 'active'
  },
  trailers: {
    TR123456: 'inactive',
    TR188086: 'active',
    TR188550: 'active'
  }
};

async function restoreVehicleStatus() {
  try {
    // Authenticate first
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Authentication successful');

    const updates = {};

    // Restore truck status
    Object.entries(originalStatus.trucks).forEach(([truckId, status]) => {
      updates[`vehicles/trucks/${truckId}/status`] = status;
    });

    // Restore trailer status
    Object.entries(originalStatus.trailers).forEach(([trailerId, status]) => {
      updates[`vehicles/trailers/${trailerId}/status`] = status;
    });

    // Update all vehicles at once
    await update(ref(db), updates);
    console.log('All vehicle status values have been restored to their original values');

  } catch (error) {
    console.error('Error:', error);
  }
}

restoreVehicleStatus();
