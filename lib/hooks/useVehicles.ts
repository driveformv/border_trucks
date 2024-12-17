import { useState, useEffect } from 'react';
import type { Vehicle } from '@/types/vehicle';
import { sampleVehicles } from '@/data/sampleVehicles';

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

  // Load static data
  useEffect(() => {
    try {
      let filtered = [...sampleVehicles];
      
      if (filters) {
        if (filters.condition) {
          filtered = filtered.filter(v => v.condition === filters.condition);
        }
        if (filters.make) {
          filtered = filtered.filter(v => v.make === filters.make);
        }
        if (filters.class) {
          filtered = filtered.filter(v => v.class === filters.class);
        }
      }

      setVehicles(filtered);
      setLoading(false);
    } catch (err) {
      setError('Failed to load vehicles');
      setLoading(false);
    }
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