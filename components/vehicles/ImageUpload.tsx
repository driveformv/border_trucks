"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadVehicleImages } from '@/lib/services/imageService';
import { ImageGallery } from './gallery/ImageGallery';
import type { VehicleImage } from '@/types/vehicle';

interface ImageUploadProps {
  vehicleId: string;
  existingImages?: VehicleImage[];
  onImagesUploaded: (images: VehicleImage[]) => void;
}

export function ImageUpload({ vehicleId, existingImages = [], onImagesUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<VehicleImage[]>(existingImages);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploading(true);
    try {
      const newImages = await uploadVehicleImages(e.target.files, vehicleId);
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesUploaded(updatedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      // Add error handling/notification here
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading && <span>Uploading...</span>}
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <ImageGallery images={images} />
        </div>
      )}
    </div>
  );
}