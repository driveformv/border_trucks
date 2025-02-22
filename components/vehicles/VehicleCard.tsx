"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "../../types/vehicle";
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
    return typeof image === "string" ? image : image.url;
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

      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-1 text-gray-900 leading-tight">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Stock#:</span>
            <span className="font-medium text-gray-900">{vehicle.stockNumber}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Mileage:</span>
            <span className="font-medium text-gray-900">{vehicle.mileage}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Engine:</span>
            <span className="font-medium text-gray-900">{vehicle.engineMake} {vehicle.engineModel}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Transmission:</span>
            <span className="font-medium text-gray-900">{vehicle.transmission}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <Button
            asChild
            className="flex-1 bg-[#1C1C1C] hover:bg-[#2C2C2C] font-medium text-sm py-2"
          >
            <Link href={`/inventory/${vehicle.id}`}>View Details</Link>
          </Button>
          <Button
            onClick={handleRequestInfo}
            variant="outline"
            className="flex-1 border-2 font-medium text-sm py-2 hover:bg-gray-50"
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
