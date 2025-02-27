import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

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
const db = getDatabase(app);

async function deployRules() {
  try {
    // Authenticate first
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Authentication successful');

    // Deploy database rules
    console.log('Deploying database rules...');
    const { stdout, stderr } = await execPromise('npx firebase deploy --only database');
    
    if (stderr) {
      console.error('Error deploying rules:', stderr);
      return;
    }
    
    console.log(stdout);
    console.log('Database rules deployed successfully!');
    
    console.log('\nYou can now run the service requests script:');
    console.log('npm run show-service-requests');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

deployRules();
