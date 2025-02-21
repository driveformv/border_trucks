const { initializeApp } = require('firebase/app');
const { getDatabase, ref, child, get } = require('firebase/database');

const app = initializeApp({
  databaseURL: "https://bordertrucks-d8624-default-rtdb.firebaseio.com"
});

const dbRef = ref(getDatabase());

get(child(dbRef, 'vehicles')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
