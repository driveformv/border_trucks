// List all images from Firebase Storage
const { initializeApp } = require('firebase/app');
const { getStorage, ref, listAll, getDownloadURL } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyDNZtAcrZt9r3ORhh7L-WJHVyxvOGHwGxE",
  authDomain: "bordertrucks-d8624.firebaseapp.com",
  projectId: "bordertrucks-d8624",
  storageBucket: "bordertrucks-d8624.appspot.com",
  messagingSenderId: "363069772905",
  appId: "1:363069772905:web:4206a2e24b7990cf2c1b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function listAllImages() {
  const imagesRef = ref(storage, 'images');
  
  try {
    const result = await listAll(imagesRef);
    
    console.log('All Images:');
    console.log('===========');
    
    for (const item of result.items) {
      const url = await getDownloadURL(item);
      console.log(`${item.name}:`);
      console.log(url);
      console.log('---');
    }
  } catch (error) {
    console.error('Error listing images:', error);
  }
}

listAllImages();
