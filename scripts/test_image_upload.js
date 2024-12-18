const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getStorage, ref, uploadBytes, getDownloadURL, listAll } = require('firebase/storage');

// Initialize Firebase
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
const auth = getAuth(app);
const storage = getStorage(app);

async function testImageUpload() {
  try {
    // 1. Sign in
    console.log('Signing in...');
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Successfully signed in');

    // 2. Create a test file (small text file as a placeholder)
    const testData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" in bytes
    
    // 3. Upload test file
    console.log('Uploading test file...');
    const testRef = ref(storage, 'test/test-file.txt');
    await uploadBytes(testRef, testData);
    console.log('Successfully uploaded test file');

    // 4. Get download URL
    const url = await getDownloadURL(testRef);
    console.log('Download URL:', url);

    // 5. List files in test directory
    console.log('\nListing files in test directory:');
    const testDirRef = ref(storage, 'test');
    const files = await listAll(testDirRef);
    files.items.forEach((itemRef) => {
      console.log('File:', itemRef.fullPath);
    });

    console.log('\nAll tests passed successfully! ');
    process.exit(0);
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

testImageUpload();
