'use client';

import { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '@/lib/firebase/config';
import ImageUploader from '@/components/admin/ImageUploader';
import { useAuth } from '@/lib/firebase/auth-context';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<{ trucks: any[], trailers: any[] }>({ trucks: [], trailers: [] });
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<'trucks' | 'trailers'>('trucks');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();

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
          get(trucksRef),
          get(trailersRef)
        ]);

        const trucksData = trucksSnap.val() || {};
        const trailersData = trailersSnap.val() || {};

        setVehicles({
          trucks: Object.entries(trucksData).map(([id, data]) => ({ id, ...data as any })),
          trailers: Object.entries(trailersData).map(([id, data]) => ({ id, ...data as any }))
        });
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [user, router]);

  const handleImagesUpdate = async (urls: string[]) => {
    if (!selectedVehicle) return;

    try {
      const vehicleRef = ref(db, `vehicles/${selectedType}/${selectedVehicle.id}`);
      await update(vehicleRef, {
        images: urls
      });

      // Update local state
      setVehicles(prev => ({
        ...prev,
        [selectedType]: prev[selectedType].map(vehicle => 
          vehicle.id === selectedVehicle.id 
            ? { ...vehicle, images: urls }
            : vehicle
        )
      }));
    } catch (error) {
      console.error('Error updating images:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Vehicle Image Management</h1>
          
          {/* Vehicle Type Selector */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedType('trucks')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'trucks'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Trucks
            </button>
            <button
              onClick={() => setSelectedType('trailers')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'trailers'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Trailers
            </button>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Vehicle List */}
            <div className="md:col-span-4 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                {vehicles[selectedType].map(vehicle => (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`w-full text-left p-3 rounded-lg ${
                      selectedVehicle?.id === vehicle.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{vehicle.id}</div>
                    <div className="text-sm text-gray-500">
                      {vehicle.make} {vehicle.model}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-8">
              {selectedVehicle ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedVehicle.id}</p>
                  </div>
                  
                  <ImageUploader
                    vehicleId={selectedVehicle.id}
                    vehicleType={selectedType}
                    existingImages={selectedVehicle.images || []}
                    onImagesUpdate={handleImagesUpdate}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a vehicle to manage its images
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
