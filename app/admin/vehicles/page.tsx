'use client';

import { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase/config';
import ImageUploader from '@/components/admin/ImageUploader';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/lib/firebase/auth-context';

interface Vehicle {
  id: string;
  vin: string;
  description: string;
  type: 'trucks' | 'trailers';
  images?: string[];
}

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<{ trucks: Vehicle[], trailers: Vehicle[] }>({ trucks: [], trailers: [] });
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<'trucks' | 'trailers'>('trucks');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return {
      trucks: vehicles.trucks?.filter(vehicle => 
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.vin.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query)
      ) || [],
      trailers: vehicles.trailers?.filter(vehicle => 
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.vin.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query)
      ) || []
    };
  }, [vehicles, searchQuery]);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const fetchVehicles = async () => {
      try {
        const trucksRef = ref(db, 'vehicles/trucks');
        const trailersRef = ref(db, 'vehicles/trailers');

        const [trucksSnap, trailersSnap] = await Promise.all([
          new Promise((resolve) => {
            onValue(trucksRef, resolve, { onlyOnce: true });
          }),
          new Promise((resolve) => {
            onValue(trailersRef, resolve, { onlyOnce: true });
          }),
        ]);

        const trucksData = trucksSnap.val() || {};
        const trailersData = trailersSnap.val() || {};

        console.log('Trucks Data:', trucksData);
        console.log('Trailers Data:', trailersData);

        const trucksArray = Object.entries(trucksData).map(([id, data]: [string, any]) => ({
          id,
          ...data,
          type: 'trucks',
          description: data.details?.description || '',
          vin: data.details?.vin || '',
        }));

        const trailersArray = Object.entries(trailersData).map(([id, data]: [string, any]) => ({
          id,
          ...data,
          type: 'trailers',
          description: data.details?.description || '',
          vin: data.details?.vin || '',
        }));

        // Sort vehicles by ID in descending order (newest first)
        const sortedTrucks = trucksArray.sort((a, b) => {
          const aNum = parseInt(a.id.replace('T', ''));
          const bNum = parseInt(b.id.replace('T', ''));
          return bNum - aNum;
        });

        const sortedTrailers = trailersArray.sort((a, b) => {
          const aNum = parseInt(a.id.replace('T', ''));
          const bNum = parseInt(b.id.replace('T', ''));
          return bNum - aNum;
        });

        setVehicles({
          trucks: sortedTrucks,
          trailers: sortedTrailers,
        });
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [user, router]);

  const handleLogout = () => {
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-[#1b2637]">Vehicle Image Management</h1>
            {selectedVehicle && (
              <div className="flex items-start gap-8 bg-white/50 rounded-lg py-2 px-4">
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="text-sm text-gray-500">ID</span>
                    <p className="font-medium leading-tight">{selectedVehicle.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">VIN</span>
                    <p className="font-medium leading-tight">{selectedVehicle.vin}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="font-medium leading-tight">{selectedVehicle.description}</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-[#1b2637] hover:text-[#2d3a4f] font-medium"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b2637] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6 space-y-6">
            {/* Vehicle Type Selector */}
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setSelectedType('trucks');
                  setSelectedVehicle(null);
                }}
                className={`px-6 py-2 rounded-md ${
                  selectedType === 'trucks'
                    ? 'bg-[#1b2637] text-white hover:bg-[#2d3a4f]'
                    : 'border border-[#1b2637] text-[#1b2637] hover:bg-[#f8f9fa]'
                }`}
              >
                Trucks ({filteredVehicles.trucks.length})
              </button>
              <button
                onClick={() => {
                  setSelectedType('trailers');
                  setSelectedVehicle(null);
                }}
                className={`px-6 py-2 rounded-md ${
                  selectedType === 'trailers'
                    ? 'bg-[#1b2637] text-white hover:bg-[#2d3a4f]'
                    : 'border border-[#1b2637] text-[#1b2637] hover:bg-[#f8f9fa]'
                }`}
              >
                Trailers ({filteredVehicles.trailers.length})
              </button>
            </div>

            <div className="grid md:grid-cols-12 gap-6">
              {/* Vehicle List */}
              <div className="md:col-span-4">
                <div className="bg-[#f3f4f6] rounded-lg p-4">
                  <div className="space-y-2">
                    {filteredVehicles[selectedType].map(vehicle => (
                      <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={`w-full text-left p-3 rounded-md ${
                          selectedVehicle?.id === vehicle.id
                            ? 'bg-white border-2 border-[#1b2637]'
                            : 'hover:bg-white border border-transparent'
                        }`}
                      >
                        <span className="font-medium text-[#1b2637]">ID: {vehicle.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="md:col-span-8">
                {selectedVehicle ? (
                  <ImageUploader
                    vehicleId={selectedVehicle.id}
                    vehicleType={selectedType}
                    existingImages={selectedVehicle.images || []}
                    onImagesUpdate={(newImages) => {
                      // Update the vehicles state with new images
                      setVehicles(prev => ({
                        ...prev,
                        [selectedType]: prev[selectedType].map(vehicle =>
                          vehicle.id === selectedVehicle.id
                            ? { ...vehicle, images: newImages }
                            : vehicle
                        )
                      }));
                    }}
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500 bg-[#f3f4f6] rounded-lg">
                    Select a vehicle to manage its images
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
