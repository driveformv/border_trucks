"use client";

import { useEffect, useState } from "react";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import type { Vehicle, VehicleImage } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImageGallery } from "@/components/vehicles/ImageGallery";
import { db } from "@/lib/firebase/config";
import { ref, onValue } from "firebase/database";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id;
    
    // Try to load from trucks first
    const trucksRef = ref(db, `vehicles/trucks/${id}`);
    
    const processVehicleData = (data: any, type: 'truck' | 'trailer') => {
      if (data) {
        const vehicleData = {
          ...data,
          type, // Explicitly set the type
          images: (data.images || []).map((img: string | VehicleImage, index: number) => 
            typeof img === 'string' ? {
              id: `img-${index}`,
              url: img,
              isPrimary: index === 0
            } : img
          ),
          specs: data.specs || {},
          features: data.features || [],
          status: data.status
        };
        setVehicle(vehicleData);
        setLoading(false);
        return true;
      }
      return false;
    };

    // First try trucks
    const unsubscribeTrucks = onValue(trucksRef, (snapshot) => {
      const data = snapshot.val();
      const found = processVehicleData(data, 'truck');
      
      // If not found in trucks, try trailers
      if (!found) {
        const trailersRef = ref(db, `vehicles/trailers/${id}`);
        const unsubscribeTrailers = onValue(trailersRef, (snapshot) => {
          const data = snapshot.val();
          const found = processVehicleData(data, 'trailer');
          
          // If not found in trailers either, set loading to false
          if (!found) {
            setLoading(false);
          }
        });
        
        // Clean up trailers listener when component unmounts
        return () => unsubscribeTrailers();
      }
    });

    return () => unsubscribeTrucks();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-8">The vehicle you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/inventory">Return to Inventory</Link>
          </Button>
        </div>
      </main>
    );
  }

  // Format the image data for the gallery
  const galleryImages = (vehicle.images || []).map((img: any, index: number) => ({
    id: typeof img === 'string' ? `img-${index}` : (img.id || `img-${index}`),
    url: typeof img === 'string' ? img : img.url,
    caption: img.caption || '',
    isPrimary: typeof img === 'string' ? index === 0 : (img.isPrimary !== undefined ? img.isPrimary : index === 0)
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Stock #{vehicle.stockNumber}</span>
                <span>|</span>
                <span>VIN: {vehicle.vin}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary mb-2">
                ${vehicle.price?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Plus taxes & licensing</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <ImageGallery images={galleryImages} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>

        {/* Vehicle Details and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Condition</div>
                <div className="font-semibold">{vehicle.condition}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Mileage</div>
                <div className="font-semibold">{vehicle.mileage?.toLocaleString() || 'N/A'} mi</div>
              </div>
              
              {vehicle.type === 'trailer' ? (
                // Trailer-specific information
                <>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Trailer Type</div>
                    <div className="font-semibold">{vehicle.trailerType || 'N/A'}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Length</div>
                    <div className="font-semibold">{vehicle.length || 'N/A'}</div>
                  </div>
                </>
              ) : (
                // Truck-specific information
                <>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Engine</div>
                    <div className="font-semibold">{vehicle.engineMake} {vehicle.engineModel}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Transmission</div>
                    <div className="font-semibold">{vehicle.transmission}</div>
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600">{vehicle.description}</p>
            </div>

            {/* Specifications */}
            {vehicle.specs && Object.keys(vehicle.specs).length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <div className="text-sm text-gray-500">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <VehicleDetailClient vehicle={vehicle} />
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-600">{vehicle.location || 'Border International'}</p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Last Updated</h3>
                  <p className="text-gray-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Disclaimer</h3>
                  <p className="text-sm text-gray-600">
                    Vehicle pricing and availability subject to change. Contact us for the most current information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
