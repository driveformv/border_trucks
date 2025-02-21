"use client";

import { useState, useEffect } from "react";
import { SearchSection } from "@/components/vehicles/search/SearchSection";
import { VehicleList } from "@/components/vehicles/VehicleList";
import { db } from "@/lib/firebase/config";
import { ref, onValue } from "firebase/database";
import type { Vehicle } from "@/types/vehicle";

export default function InventoryPage() {
  const [searchFilters, setSearchFilters] = useState({});
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get trucks and trailers
    const trucksRef = ref(db, 'vehicles/trucks');
    const trailersRef = ref(db, 'vehicles/trailers');

    const unsubscribeTrucks = onValue(trucksRef, (snapshot) => {
      const trucksData = snapshot.val();
      if (trucksData) {
        const trucksArray = Object.values(trucksData).map((truck: any) => ({
          ...truck.details,
          images: (truck.images || []).map((url: string) => ({ url })),
          specs: truck.specs || {},
          features: truck.features || [],
          status: truck.status
        }));
        setVehicles(prev => [...prev.filter(v => v.type !== 'truck'), ...trucksArray]);
      }
    });

    const unsubscribeTrailers = onValue(trailersRef, (snapshot) => {
      const trailersData = snapshot.val();
      if (trailersData) {
        const trailersArray = Object.values(trailersData).map((trailer: any) => ({
          ...trailer.details,
          images: (trailer.images || []).map((url: string) => ({ url })),
          specs: trailer.specs || {},
          features: trailer.features || [],
          status: trailer.status
        }));
        setVehicles(prev => [...prev.filter(v => v.type !== 'trailer'), ...trailersArray]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeTrucks();
      unsubscribeTrailers();
    };
  }, []);

  const handleClearSearch = () => {
    setSearchFilters({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Truck</h1>
          <p className="text-xl text-gray-300">
            Search our inventory of new and used commercial trucks. 
            We stock a variety of class 8, class 6 and super duty truck models.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8">
        <SearchSection 
          onSearch={setSearchFilters} 
          onClear={handleClearSearch}
          searchFilters={searchFilters}
        />
      </div>

      {/* Vehicle List */}
      <div className="container mx-auto px-4">
        <VehicleList 
          initialVehicles={vehicles} 
          searchFilters={searchFilters} 
          onClearSearch={handleClearSearch}
        />
      </div>
    </main>
  );
}