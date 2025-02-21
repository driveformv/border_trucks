const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

const app = initializeApp({
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

// Get a single truck to check its data
get(ref(db, 'vehicles/trucks')).then(snapshot => {
  console.log('Trucks data:', snapshot.val());
  process.exit(0); // Exit when done
}).catch(error => {
  console.error('Error:', error);
  process.exit(1); // Exit on error
});
