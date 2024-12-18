import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '@/lib/firebase/config';
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

interface ImageUploaderProps {
  vehicleId: string;
  vehicleType: 'trucks' | 'trailers';
  existingImages: string[];
  onImagesUpdate: (urls: string[]) => void;
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
      className="relative group aspect-square bg-gray-50"
    >
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <>
          <Image
            src={url}
            alt="Vehicle image"
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg 
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <XCircle className="w-6 h-6 text-red-500 hover:text-red-600" />
          </button>
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-lg cursor-move
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <GripHorizontal className="w-6 h-6 text-gray-500" />
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
    <div className="relative aspect-square bg-gray-50">
      {preview && (
        <>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
          >
            <XCircle className="w-6 h-6 text-red-500 hover:text-red-600" />
          </button>
        </>
      )}
    </div>
  );
}

export default function ImageUploader({
  vehicleId,
  vehicleType,
  existingImages = [],
  onImagesUpdate
}: ImageUploaderProps) {
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
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.warn('Image compression failed, using original file:', error);
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
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
      
      const updatedImages = [...images, ...newUrls];
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
      // Extract the path from the URL
      const path = urlToDelete.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(path);
      const imageRef = ref(storage, decodedPath);
      
      await deleteObject(imageRef);
      
      const updatedImages = images.filter(url => url !== urlToDelete);
      setImages(updatedImages);
      onImagesUpdate(updatedImages);
    } catch (err) {
      setError('Failed to delete image. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        onImagesUpdate(newOrder);
        return newOrder;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl mb-2">📸</div>
          {isDragActive ? (
            <p className="text-blue-500">Drop the images here...</p>
          ) : (
            <>
              <p className="text-gray-600">Drag & drop images here, or click to select</p>
              <p className="text-sm text-gray-400">Supports: JPG, PNG, WebP (Max: 10MB)</p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {previewFiles.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewFiles.map((file, index) => (
              <PreviewImage
                key={`${file.name}_${index}`}
                file={file}
                onRemove={() => {
                  setPreviewFiles(prev => prev.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={uploadImages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                transition-colors duration-200"
            >
              Upload {previewFiles.length} {previewFiles.length === 1 ? 'Image' : 'Images'}
            </button>
          </div>
        </div>
      )}

      {/* Uploaded Images Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadingImages.map((url) => (
              <SortableImage
                key={url}
                url={url}
                onDelete={() => {}}
                isUploading={true}
              />
            ))}
            {images.map((url) => (
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
  );
}
