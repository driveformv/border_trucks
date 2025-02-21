import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref as storageRef, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set } from 'firebase/database';
import { storage, db } from '@/lib/firebase/config';
import { XCircle, GripHorizontal } from 'lucide-react';
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

interface ImageUploaderProps {
  vehicleId: string;
  vehicleType: 'trucks' | 'trailers';
  existingImages: string[];
  onImagesUpdate?: (urls: string[]) => void;
}

interface SortableImageProps {
  url: string;
  onDelete: () => void;
  isUploading?: boolean;
}

function SortableImage({ url, onDelete, isUploading }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url });

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
            src={url}
            alt="Vehicle image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onDelete}
              className="p-2 bg-white rounded-full hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
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
  const [images, setImages] = useState<string[]>(existingImages);
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

  const updateDatabase = async (updatedImages: string[]) => {
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

      const newUrls = await Promise.all(
        compressedFiles.map(async (file) => {
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
          const path = `vehicles/${vehicleType}/${vehicleId}/${timestamp}_${safeFileName}`;
          const imageRef = storageRef(storage, path);
          await uploadBytes(imageRef, file);
          return getDownloadURL(imageRef);
        })
      );
      
      const updatedImages = [...images, ...newUrls];
      
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

  const handleDelete = async (urlToDelete: string) => {
    try {
      // Update database first
      const updatedImages = images.filter(url => url !== urlToDelete);
      await updateDatabase(updatedImages);

      // Then update local state and notify parent
      setImages(updatedImages);
      onImagesUpdate(updatedImages);

      // Finally try to delete from storage
      try {
        const imageRef = storageRef(storage, urlToDelete);
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
        const oldIndex = images.indexOf(active.id);
        const newIndex = images.indexOf(over.id);
        const newOrder = arrayMove(images, oldIndex, newIndex);
        
        // Update database first
        await updateDatabase(newOrder);
        
        // Then update local state and notify parent
        setImages(newOrder);
        onImagesUpdate(newOrder);
      } catch (error) {
        console.error('Error updating image order:', error);
        setError('Failed to update image order. Please try again.');
      }
    }
  };

  // Reset state when vehicle changes
  useEffect(() => {
    setImages(existingImages);
    setPreviewFiles([]);
    setUploadingImages([]);
    setError(null);
  }, [vehicleId, vehicleType, existingImages]);

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
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <SortableImage
                    key={url}
                    url={url}
                    onDelete={() => handleDelete(url)}
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
