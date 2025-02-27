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

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];
const requestId = args[1];
const newStatus = args[2];

async function showServiceRequests() {
  try {
    // Authenticate first
    await signInWithEmailAndPassword(auth, 'admin@driveformvt.com', '04100B0rd3rTrucks.');
    console.log('Authentication successful');

    // Get service requests
    const serviceRequestsRef = ref(db, 'serviceRequests');
    const snapshot = await get(serviceRequestsRef);
    
    if (snapshot.exists()) {
      const serviceRequests = snapshot.val();
      
      if (command === 'update' && requestId && newStatus) {
        // Update the status of a specific service request
        const updates = {};
        updates[`serviceRequests/${requestId}/status`] = newStatus;
        await update(ref(db), updates);
        console.log(`Updated service request ${requestId} status to ${newStatus}`);
        return;
      }
      
      console.log('=== Service Requests ===\n');
      
      // Filter by status if provided
      const statusFilter = command === 'filter' ? requestId : null;
      
      let count = 0;
      for (const [id, request] of Object.entries(serviceRequests)) {
        // Skip if filtering by status and this request doesn't match
        if (statusFilter && request.status !== statusFilter) continue;
        
        count++;
        console.log(`ID: ${id}`);
        console.log(`Name: ${request.firstName} ${request.lastName}`);
        console.log(`Email: ${request.email}`);
        console.log(`Phone: ${request.phone}`);
        console.log(`ZIP Code: ${request.zipCode}`);
        console.log(`Preferred Date: ${request.date}`);
        console.log(`Services: ${request.services}`);
        console.log(`Notes: ${request.notes || 'None'}`);
        console.log(`Status: ${request.status || 'pending'}`);
        console.log(`Created At: ${new Date(request.createdAt).toLocaleString()}`);
        console.log('-----------------------------------\n');
      }
      
      console.log(`Total: ${count} service requests`);
      
      if (count === 0 && statusFilter) {
        console.log(`No service requests with status "${statusFilter}" found.`);
      }
    } else {
      console.log('No service requests available');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Print usage instructions
function printUsage() {
  console.log(`
Usage:
  node scripts/show_service_requests.js                    # Show all service requests
  node scripts/show_service_requests.js filter pending     # Show only pending requests
  node scripts/show_service_requests.js filter completed   # Show only completed requests
  node scripts/show_service_requests.js update ID completed # Update request status to completed
  node scripts/show_service_requests.js update ID in_progress # Update request status to in_progress
  node scripts/show_service_requests.js update ID cancelled # Update request status to cancelled
  `);
}

// If no arguments or help requested, print usage
if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
  printUsage();
} else {
  showServiceRequests();
}
