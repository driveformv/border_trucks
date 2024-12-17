// This function is called at build time to generate all possible vehicle detail pages
export async function generateStaticParams() {
  return sampleVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

// This function gets the vehicle data for a specific ID
async function getVehicle(id: string): Promise<Vehicle | null> {
  const vehicle = sampleVehicles.find(v => v.id === id);
  return vehicle || null;
}

import { sampleVehicles } from "@/lib/data/sampleVehicles";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicle(params.id);

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <p>The vehicle you're looking for does not exist.</p>
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

        {/* Image Gallery and Action Buttons */}
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
              {vehicle.mileage !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Mileage:</span>
                  <span className="font-semibold">{vehicle.mileage.toLocaleString()} miles</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Engine:</span>
                <span className="font-semibold">{vehicle.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-semibold">{vehicle.transmission}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Location & Availability</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Border International</p>
                  <p className="text-gray-600">2701 Mesilla Street</p>
                  <p className="text-gray-600">Las Cruces, NM 88046</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div className="text-gray-600">
                  Available for immediate delivery
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Engine & Performance</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Engine Type:</span>
                <span className="font-semibold">{vehicle.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horsepower:</span>
                <span className="font-semibold">{vehicle.horsepower} HP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Torque:</span>
                <span className="font-semibold">{vehicle.torque} lb-ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-semibold">{vehicle.transmission}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Chassis & Dimensions</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Wheelbase:</span>
                <span className="font-semibold">{vehicle.wheelbase}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GVWR:</span>
                <span className="font-semibold">{vehicle.gvwr} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Suspension:</span>
                <span className="font-semibold">{vehicle.suspension}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Axle Configuration:</span>
                <span className="font-semibold">{vehicle.axleConfiguration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}