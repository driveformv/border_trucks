"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';
import { Camera } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import imageCompression from 'browser-image-compression';

interface EventImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function EventImageUploader({ onUploadComplete }: EventImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compressImage = async (file: File) => {
    try {
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
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const file = acceptedFiles[0];
      const compressedFile = await compressImage(file);
      
      const timestamp = Date.now();
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const path = `events/${timestamp}_${safeFileName}`;
      const imageRef = storageRef(storage, path);
      
      await uploadBytes(imageRef, compressedFile);
      const url = await getDownloadURL(imageRef);
      
      onUploadComplete(url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10485760, // 10MB
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploading ? 'pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {uploading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="md" />
            </div>
          ) : (
            <>
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag & drop an image here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports: JPG, PNG, WebP (Max: 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
