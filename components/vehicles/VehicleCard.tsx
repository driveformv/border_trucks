"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import { VehicleInquiryModal } from "./VehicleInquiryModal";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Default image if none available
  const defaultImage = "https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/vehicles%2Fplaceholder.jpg?alt=media";

  // Safely get image URL
  const getImageUrl = () => {
    if (!vehicle.images || !vehicle.images.length) {
      return defaultImage;
    }
    const image = vehicle.images[currentImageIndex];
    if (!image) {
      return defaultImage;
    }
    return typeof image === 'string' ? image : image.url;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (vehicle.images && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (vehicle.images && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? vehicle.images.length - 1 : prev - 1
      );
    }
  };

  const handleRequestInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInquiryModal(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9]">
        <Image
          src={getImageUrl()}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          width={800}
          height={450}
          className="object-cover w-full h-full"
          priority={currentImageIndex === 0}
        />

        {vehicle.images && vehicle.images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </>
        )}

        {vehicle.status && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-white/90"
          >
            {vehicle.status}
          </Badge>
        )}
      </div>

      <div className="p-4 md:p-6">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg md:text-xl font-semibold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Stock #{vehicle.stockNumber}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm md:text-base">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Stock#:</span>
            <span className="font-medium">{vehicle.stockNumber}</span>
          </div>
          {vehicle.mileage && (
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Mileage:</span>
              <span className="font-medium">{vehicle.mileage.toLocaleString()}</span>
            </div>
          )}
          {vehicle.engineMake && (
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Engine:</span>
              <span className="font-medium">{vehicle.engineMake} {vehicle.engineModel}</span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Transmission:</span>
              <span className="font-medium">{vehicle.transmission}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <Button
            asChild
            className="flex-1 bg-[#1C1C1C] hover:bg-[#2C2C2C]"
            size="sm"
          >
            <Link href={`/inventory/${vehicle.id}`}>View Details</Link>
          </Button>
          <Button
            onClick={handleRequestInfo}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            Request Info
          </Button>
        </div>
      </div>

      <VehicleInquiryModal
        open={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        vehicle={vehicle}
      />
    </Card>
  );
}