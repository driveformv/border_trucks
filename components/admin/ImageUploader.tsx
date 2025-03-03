import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref as storageRef, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set, get } from 'firebase/database';
import { storage, db } from '@/lib/firebase/config';
import { XCircle, GripHorizontal, EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useEffect } from 'react';
import { useAuth } from '@/lib/firebase/auth-context';
import { Camera, Trash2, X } from 'lucide-react';
import type { VehicleImage } from '@/types/vehicle';

interface ImageUploaderProps {
  vehicleId: string;
  vehicleType: 'trucks' | 'trailers';
  existingImages: (VehicleImage | string)[];
  onImagesUpdate?: (images: (VehicleImage | string)[]) => void;
}

interface SortableImageProps {
  image: VehicleImage;
  onDelete: () => void;
  onToggleActive: () => void;
  isUploading?: boolean;
  vehicleStatus: string;
}

function SortableImage({ image, onDelete, onToggleActive, isUploading, vehicleStatus }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden"
    >
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <>
          <img
            src={image.url}
            alt={image.caption || "Vehicle image"}
            className="w-full h-full object-cover"
          />
          {!image.isActive && <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity" />}
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${vehicleStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {vehicleStatus === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onDelete}
              className="p-2 bg-white rounded-full hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
            <button
              onClick={onToggleActive}
              className="p-2 bg-white rounded-full hover:bg-gray-50"
            >
              {image.isActive ? 
                <EyeOffIcon className="h-4 w-4 text-gray-600" /> :
                <EyeIcon className="h-4 w-4 text-gray-600" />
              }
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface PreviewImageProps {
  file: File;
  onRemove: () => void;
}

function PreviewImage({ file, onRemove }: PreviewImageProps) {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="relative aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden">
      {preview && (
        <>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onRemove}
              className="p-2 bg-white rounded-full hover:bg-gray-50"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  vehicleId,
  vehicleType,
  existingImages = [],
  onImagesUpdate = () => {}
}) => {
  const [vehicleStatus, setVehicleStatus] = useState<string>('');
  const [images, setImages] = useState<VehicleImage[]>([]);

  // Load vehicle status and images from database
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get vehicle status
        const vehicleRef = dbRef(db, `vehicles/${vehicleType}/${vehicleId}`);
        const vehicleSnapshot = await get(vehicleRef);
        if (vehicleSnapshot.exists()) {
          const vehicleData = vehicleSnapshot.val();
          setVehicleStatus(vehicleData.status || '');
        }

        // Get images
        const imagesRef = dbRef(db, `vehicles/${vehicleType}/${vehicleId}/images`);
        const imagesSnapshot = await get(imagesRef);
        if (imagesSnapshot.exists()) {
          setImages(imagesSnapshot.val());
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data');
      }
    };
    loadData();
  }, [vehicleId, vehicleType]);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const compressImage = async (file: File) => {
    try {
      if (typeof imageCompression !== 'function') {
        console.warn('Image compression not available, using original file');
        return file;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      };
      
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      return file;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      setError('You must be logged in to upload images');
      return;
    }
    setError(null);
    setPreviewFiles(prev => [...prev, ...acceptedFiles]);
  }, [user]);

  const updateDatabase = async (updatedImages: VehicleImage[]) => {
    try {
      const vehicleRef = dbRef(db, `vehicles/${vehicleType}/${vehicleId}/images`);
      await set(vehicleRef, updatedImages);
    } catch (error) {
      console.error('Error updating database:', error);
      throw error;
    }
  };

  const uploadImages = async () => {
    if (!user) {
      setError('You must be logged in to upload images');
      return;
    }

    if (previewFiles.length === 0) return;

    setUploadingImages(previewFiles.map(file => URL.createObjectURL(file)));
    setPreviewFiles([]);

    try {
      const token = await user.getIdToken();
      if (!token) {
        throw new Error('No auth token available');
      }

      const compressedFiles = await Promise.all(
        previewFiles.map(file => compressImage(file))
      );

      const newImages = await Promise.all(
        compressedFiles.map(async (file, index) => {
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
          const path = `vehicles/${vehicleType}/${vehicleId}/${timestamp}_${safeFileName}`;
          const imageRef = storageRef(storage, path);
          await uploadBytes(imageRef, file);
          const url = await getDownloadURL(imageRef);
          
          return {
            id: `image-${timestamp}-${index}`,
            url,
            isPrimary: images.length === 0 && index === 0,
            isActive: false // New images are inactive by default
          };
        })
      );
      
      const updatedImages = [...images, ...newImages];
      
      // Update database first
      await updateDatabase(updatedImages);
      
      // Then update local state and notify parent
      setImages(updatedImages);
      onImagesUpdate(updatedImages);
    } catch (err: any) {
      setError(err.message || 'Failed to upload images. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploadingImages([]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10485760, // 10MB
  });

  const handleToggleActive = async (imageToToggle: VehicleImage) => {
    try {
      const updatedImages = images.map(img => 
        img.id === imageToToggle.id 
          ? { ...img, isActive: !img.isActive }
          : img
      );
      
      // Update database first
      await updateDatabase(updatedImages);
      
      // Then update local state and notify parent
      setImages(updatedImages);
      onImagesUpdate(updatedImages);
    } catch (error) {
      console.error('Error toggling image status:', error);
      setError('Failed to update image status. Please try again.');
    }
  };

  const handleDelete = async (imageToDelete: VehicleImage) => {
    try {
      // Update database first
      const updatedImages = images.filter(img => img.id !== imageToDelete.id);
      await updateDatabase(updatedImages);

      // Then update local state and notify parent
      setImages(updatedImages);
      onImagesUpdate(updatedImages);

      // Finally try to delete from storage
      try {
        const imageRef = storageRef(storage, imageToDelete.url);
        await deleteObject(imageRef);
      } catch (storageError) {
        // If file doesn't exist in storage, that's okay
        console.log('File may have already been deleted from storage:', storageError);
      }
    } catch (error) {
      console.error('Error handling image deletion:', error);
      setError('Failed to delete image. Please try again.');
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      try {
        const oldIndex = images.findIndex(img => img.id === active.id);
        const newIndex = images.findIndex(img => img.id === over.id);
        const newOrder = arrayMove(images, oldIndex, newIndex);
        
        // Update isPrimary flag while preserving isActive status
        const updatedOrder = newOrder.map((img, idx) => ({
          ...img,
          isPrimary: idx === 0
        }));
        
        // Update database first
        await updateDatabase(updatedOrder);
        
        // Then update local state and notify parent
        setImages(updatedOrder);
        onImagesUpdate(updatedOrder);
      } catch (error) {
        console.error('Error updating image order:', error);
        setError('Failed to update image order. Please try again.');
      }
    }
  };

  // Reset upload state when vehicle changes
  useEffect(() => {
    setPreviewFiles([]);
    setUploadingImages([]);
    setError(null);
  }, [vehicleId, vehicleType]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <div {...getRootProps()} className="space-y-2 text-center cursor-pointer">
          <input {...getInputProps()} />
          <div className="mx-auto flex justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Drag & drop images here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports: JPG, PNG, WebP (Max: 10MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Preview Area */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...previewFiles, ...uploadingImages].map((file, index) => (
          <div key={index} className="relative aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden">
            <img
              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  if (typeof file === 'string') {
                    setUploadingImages(prev => prev.filter((_, i) => i !== index));
                  } else {
                    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
                  }
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-50"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Existing Images */}
      {images.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Current Images</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <SortableImage
                    key={image.id}
                    image={image}
                    onDelete={() => handleDelete(image)}
                    onToggleActive={() => handleToggleActive(image)}
                    vehicleStatus={vehicleStatus}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {previewFiles.length > 0 && (
        <button
          onClick={uploadImages}
          disabled={!user}
          className="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-[#1a56db] rounded-md hover:bg-[#1e429f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a56db] disabled:opacity-50"
        >
          {uploadingImages.length > 0 ? 'Uploading...' : 'Upload Images'}
        </button>
      )}
    </div>
  );
}

export default ImageUploader;
