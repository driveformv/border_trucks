"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleImage } from "@/types/vehicle";

interface ImageGalleryProps {
  images: VehicleImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].caption || "Vehicle image"}
          className="object-cover w-full h-full"
        />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={previousImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentIndex(index)}
            className={`flex-none w-24 h-24 rounded-lg overflow-hidden ${
              index === currentIndex ? "ring-2 ring-primary" : ""
            }`}
          >
            <img
              src={image.url}
              alt={image.caption || "Thumbnail"}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}