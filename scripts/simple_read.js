const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

const config = {
  apiKey: "AIzaSyAG7Pe8bHkSi3omQ07mytxZhkfWiir1tEo",
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(config);
const db = getDatabase(app);

// Read data
async function readData() {
  try {
    const snapshot = await get(ref(db, 'vehicles'));
    console.log('Data:', snapshot.val());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

readData();
