// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get Firebase services
const db = getDatabase(app);
const auth = getAuth(app);

async function readVehicles() {
  try {
    // Authenticate first
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Authentication successful');

    // Read vehicles data
    console.log('Fetching vehicles data...');
    
    // Get trucks data
    const trucksRef = ref(db, 'vehicles/trucks');
    onValue(trucksRef, (snapshot) => {
      console.log('\nTrucks:');
      console.log(JSON.stringify(snapshot.val(), null, 2));
    }, { onlyOnce: true });

    // Get trailers data
    const trailersRef = ref(db, 'vehicles/trailers');
    onValue(trailersRef, (snapshot) => {
      console.log('\nTrailers:');
      console.log(JSON.stringify(snapshot.val(), null, 2));
    }, { onlyOnce: true });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

readVehicles();
