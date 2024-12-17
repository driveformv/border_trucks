import { sampleVehicles } from "@/lib/data/sampleVehicles";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ImageGallery } from "@/components/vehicles/ImageGallery";

// This function gets the vehicle data for a specific ID
async function getVehicle(id: string): Promise<Vehicle | null> {
  return sampleVehicles.find(v => v.id === id) || null;
}

// This function is called at build time to generate all possible vehicle detail pages
export async function generateStaticParams() {
  return sampleVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicle(params.id);

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
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery 
            images={vehicle.images} 
            title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <VehicleDetailClient vehicle={vehicle} />
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Specs</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">${vehicle.price.toLocaleString()}</span>
              </div>
              {vehicle.mileage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Mileage:</span>
                  <span className="font-semibold">{vehicle.mileage.toLocaleString()} miles</span>
                </div>
              )}
              {vehicle.engineMake && vehicle.engineModel && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Engine:</span>
                  <span className="font-semibold">{vehicle.engineMake} {vehicle.engineModel}</span>
                </div>
              )}
              {vehicle.transmission && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transmission:</span>
                  <span className="font-semibold">
                    {vehicle.transmission}
                    {vehicle.transmissionType && ` (${vehicle.transmissionType})`}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Location & Availability</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Border International</p>
                  <p className="text-gray-600">{vehicle.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div className="text-gray-600">
                  {vehicle.status === 'Available' ? 'Available for immediate delivery' : vehicle.status}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Warranty Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Extended Warranty Available</p>
                  <p className="text-gray-600">Contact us for warranty options and coverage details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vehicle.type === 'truck' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Engine & Performance</h2>
              <div className="space-y-3">
                {vehicle.engineMake && vehicle.engineModel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engine:</span>
                    <span className="font-semibold">{vehicle.engineMake} {vehicle.engineModel}</span>
                  </div>
                )}
                {vehicle.horsepower && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Horsepower:</span>
                    <span className="font-semibold">{vehicle.horsepower} HP</span>
                  </div>
                )}
                {vehicle.torque && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Torque:</span>
                    <span className="font-semibold">{vehicle.torque} lb-ft</span>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="font-semibold">
                      {vehicle.transmission}
                      {vehicle.transmissionType && ` (${vehicle.transmissionType})`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {vehicle.type === 'truck' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Chassis & Dimensions</h2>
              <div className="space-y-3">
                {vehicle.wheelBase && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wheelbase:</span>
                    <span className="font-semibold">{vehicle.wheelBase}</span>
                  </div>
                )}
                {vehicle.gvwr && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">GVWR:</span>
                    <span className="font-semibold">{vehicle.gvwr}</span>
                  </div>
                )}
                {vehicle.suspension && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Suspension:</span>
                    <span className="font-semibold">{vehicle.suspension}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {vehicle.type === 'trailer' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Trailer Specifications</h2>
              <div className="space-y-3">
                {vehicle.trailerType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{vehicle.trailerType}</span>
                  </div>
                )}
                {vehicle.length && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Length:</span>
                    <span className="font-semibold">{vehicle.length}</span>
                  </div>
                )}
                {vehicle.width && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Width:</span>
                    <span className="font-semibold">{vehicle.width}</span>
                  </div>
                )}
                {vehicle.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-semibold">{vehicle.height}</span>
                  </div>
                )}
                {vehicle.capacity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold">{vehicle.capacity}</span>
                  </div>
                )}
                {vehicle.axles && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Axles:</span>
                    <span className="font-semibold">{vehicle.axles}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}