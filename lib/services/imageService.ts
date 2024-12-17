import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadVehicleImage(file: File, vehicleId: string): Promise<string> {
  const imageRef = ref(storage, `vehicles/${vehicleId}/${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

export async function uploadVehicleImages(
  files: FileList,
  vehicleId: string
): Promise<{ id: string; url: string; isPrimary: boolean }[]> {
  const uploadPromises = Array.from(files).map(async (file, index) => {
    const url = await uploadVehicleImage(file, vehicleId);
    return {
      id: `${vehicleId}-${index}`,
      url,
      isPrimary: index === 0
    };
  });

  return Promise.all(uploadPromises);
}