import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import type { Vehicle, VehicleImage } from '../types/vehicle';

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

// Default placeholder image
const placeholderImage: VehicleImage = {
  id: 'placeholder',
  url: 'https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/vehicles%2Fplaceholder.jpg?alt=media',
  isPrimary: true,
  isActive: true
};

function convertToVehicleImage(image: string | VehicleImage, index: number): VehicleImage {
  if (typeof image === 'string') {
    return {
      id: `image-${index}`,
      url: image,
      isPrimary: index === 0,
      isActive: true // Default to active for existing images
    };
  }
  // If it's already a VehicleImage but missing isActive, add it
  return {
    id: image.id,
    url: image.url,
    isPrimary: image.isPrimary,
    caption: image.caption,
    isActive: 'isActive' in image ? image.isActive : true // Default to active if not present
  };
}

async function standardizeVehicleImages(vehicleType: 'trucks' | 'trailers', vehicleId: string, vehicle: Vehicle) {
  console.log(`Processing ${vehicleType} ${vehicleId}...`);

  // If no images array exists or it's empty, use placeholder
  if (!vehicle.images || vehicle.images.length === 0) {
    return {
      [`vehicles/${vehicleType}/${vehicleId}/images`]: [placeholderImage]
    };
  }

  // Convert all images to VehicleImage format
  const standardizedImages = vehicle.images.map((image, index) => 
    convertToVehicleImage(image, index)
  );

  return {
    [`vehicles/${vehicleType}/${vehicleId}/images`]: standardizedImages
  };
}

async function standardizeAllImages() {
  try {
    // Get admin credentials from environment or prompt user
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD environment variables');
      process.exit(1);
    }

    // Sign in
    console.log('Signing in...');
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Successfully signed in');

    // Get all vehicles
    console.log('\nFetching vehicles from database...');
    const snapshot = await get(ref(db, 'vehicles'));
    const vehicles = snapshot.val();

    if (!vehicles) {
      console.log('No vehicles found in database');
      process.exit(0);
    }

    // Process all vehicles
    const updates: Record<string, VehicleImage[]> = {};

    // Process trucks
    if (vehicles.trucks) {
      console.log('\nProcessing trucks...');
      for (const [truckId, truck] of Object.entries(vehicles.trucks)) {
        const truckUpdates = await standardizeVehicleImages('trucks', truckId, truck as Vehicle);
        Object.assign(updates, truckUpdates);
      }
    }

    // Process trailers
    if (vehicles.trailers) {
      console.log('\nProcessing trailers...');
      for (const [trailerId, trailer] of Object.entries(vehicles.trailers)) {
        const trailerUpdates = await standardizeVehicleImages('trailers', trailerId, trailer as Vehicle);
        Object.assign(updates, trailerUpdates);
      }
    }

    // Apply all updates
    console.log('\nApplying updates to database...');
    await update(ref(db), updates);

    console.log('\nSuccessfully standardized all image formats');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

standardizeAllImages();
