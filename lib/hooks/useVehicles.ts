import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Vehicle } from '@/types/vehicle';

export function useVehicles(filters?: { 
  condition?: string; 
  make?: string; 
  class?: string;
  searchTerm?: string;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    let q = collection(db, 'vehicles');
    
    if (filters) {
      if (filters.condition) {
        q = query(q, where('condition', '==', filters.condition));
      }
      if (filters.make) {
        q = query(q, where('make', '==', filters.make));
      }
      if (filters.class) {
        q = query(q, where('class', '==', filters.class));
      }
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const vehicleData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vehicle[];
        setVehicles(vehicleData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filters?.condition, filters?.make, filters?.class]);

  // Handle search filtering
  useEffect(() => {
    if (!filters?.searchTerm) {
      setFilteredVehicles(vehicles);
      return;
    }

    const searchTermLower = filters.searchTerm.toLowerCase();
    const filtered = vehicles.filter((vehicle) => {
      return (
        vehicle.make.toLowerCase().includes(searchTermLower) ||
        vehicle.model.toLowerCase().includes(searchTermLower) ||
        vehicle.engineMake.toLowerCase().includes(searchTermLower) ||
        vehicle.engineModel.toLowerCase().includes(searchTermLower) ||
        vehicle.stockNumber.toLowerCase().includes(searchTermLower) ||
        vehicle.chassisNumber.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredVehicles(filtered);
  }, [vehicles, filters?.searchTerm]);

  return { vehicles: filteredVehicles, loading, error };
}