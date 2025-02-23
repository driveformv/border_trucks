import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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

async function checkImageStatus() {
  try {
    const trucksRef = ref(db, 'vehicles/trucks');
    const trailersRef = ref(db, 'vehicles/trailers');
    
    const [trucksSnap, trailersSnap] = await Promise.all([
      get(trucksRef),
      get(trailersRef)
    ]);

    console.log('=== Image Status Report ===\n');

    if (trucksSnap.exists()) {
      console.log('TRUCKS:');
      const trucks = trucksSnap.val();
      Object.entries(trucks).forEach(([id, truck]) => {
        if (truck.images) {
          console.log(`\nTruck ID: ${id}`);
          truck.images.forEach((img, idx) => {
            console.log(`Image ${idx + 1}: ${img.isActive ? 'Active' : 'Inactive'} ${img.isPrimary ? '(Primary)' : ''}`);
          });
        }
      });
    }

    if (trailersSnap.exists()) {
      console.log('\nTRAILERS:');
      const trailers = trailersSnap.val();
      Object.entries(trailers).forEach(([id, trailer]) => {
        if (trailer.images) {
          console.log(`\nTrailer ID: ${id}`);
          trailer.images.forEach((img, idx) => {
            console.log(`Image ${idx + 1}: ${img.isActive ? 'Active' : 'Inactive'} ${img.isPrimary ? '(Primary)' : ''}`);
          });
        }
      });
    }
  } catch (error) {
    console.error('Error checking image status:', error);
  }
}

checkImageStatus();
