const { initializeApp, getApps } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  authDomain: "bordertrucks-d8624.firebaseapp.com",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com",
  projectId: "bordertrucks-d8624",
  storageBucket: "bordertrucks-d8624.firebasestorage.app",
  messagingSenderId: "1046286132964",
  appId: "1:1046286132964:web:7ccbe2cdbb041df90deef1"
};

// Initialize Firebase exactly like the app does
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

// Read trucks data
const trucksRef = ref(db, 'vehicles/trucks');
console.log('Reading trucks data...');
onValue(trucksRef, (snapshot) => {
  console.log('Trucks data:', snapshot.val());
}, { onlyOnce: true });

// Keep the script running for a bit to allow the async operation to complete
setTimeout(() => process.exit(0), 5000);
