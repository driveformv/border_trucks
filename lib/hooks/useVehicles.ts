import { useState, useEffect, useMemo } from 'react';
import type { Vehicle } from '@/types/vehicle';
import type { VehicleFilters, FilterSection } from '@/types/filters';
import { db } from '@/lib/firebase';
import { ref, onValue, off } from 'firebase/database';
import { applyFilters } from '@/lib/utils/filterUtils';

export function useVehicles(includeInactive: boolean = false) {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to normalize vehicle data
  const normalizeVehicleData = (data: any): Vehicle => {
    // If data has details object, merge it with root
    if (data.details) {
      return {
        ...data.details,
        specs: data.specs || {},
        features: data.features || [],
        category: data.category || [],
        images: data.images || [],
        status: data.status || 'Available',
        lastUpdated: data.lastUpdated
      };
    }
    // Data is already flat
    return {
      ...data,
      specs: data.specs || {},
      features: data.features || [],
      category: data.category || [],
      images: data.images || [],
      status: data.status || 'Available'
    };
  };

  // Fetch all vehicles once
  useEffect(() => {
    setLoading(true);
    console.log('Setting up realtime listeners...');
    
    const trucksRef = ref(db, '/vehicles/trucks');
    const trailersRef = ref(db, '/vehicles/trailers');

    // Set up realtime listeners
    onValue(trucksRef, (snapshot) => {
      const trucksData = snapshot.exists() ? 
        Object.entries(snapshot.val())
          .map(([id, data]) => normalizeVehicleData({
            id,
            type: 'truck',
            ...(data as any)
          }))
          .filter(vehicle => includeInactive || vehicle.status === 'active' || vehicle.status === 'Available') : [];

      onValue(trailersRef, (snapshot) => {
        const trailersData = snapshot.exists() ? 
          Object.entries(snapshot.val())
            .map(([id, data]) => normalizeVehicleData({
              id,
              type: 'trailer',
              ...(data as any)
            }))
            .filter(vehicle => includeInactive || vehicle.status === 'active' || vehicle.status === 'Available') : [];

        const vehicleData = [...trucksData, ...trailersData];
        console.log('Realtime update received:', vehicleData);
        setAllVehicles(vehicleData);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching trailers:', error);
        setError('Failed to load vehicles');
        setLoading(false);
      });
    }, (error) => {
      console.error('Error fetching trucks:', error);
      setError('Failed to load vehicles');
      setLoading(false);
    });

    // Cleanup listeners on unmount
    return () => {
      off(trucksRef);
      off(trailersRef);
    };
  }, [includeInactive]); // Re-fetch when includeInactive changes

  // Generate filter options from actual data
  const filterSections = useMemo(() => {
    if (!allVehicles.length) return [];

    const counts: {
      condition: Record<string, number>;
      make: Record<string, number>;
      type: Record<string, number>;
      category: Record<string, number>;
    } = {
      condition: {},
      make: {},
      type: {},
      category: {}
    };

    // Count occurrences of each value
    allVehicles.forEach(vehicle => {
      counts.condition[vehicle.condition] = (counts.condition[vehicle.condition] || 0) + 1;
      counts.make[vehicle.make] = (counts.make[vehicle.make] || 0) + 1;
      counts.type[vehicle.type] = (counts.type[vehicle.type] || 0) + 1;
      if (vehicle.category) {
        vehicle.category.forEach(cat => {
          counts.category[cat] = (counts.category[cat] || 0) + 1;
        });
      }
    });

    // Convert to filter sections format
    const sections: FilterSection[] = [
      {
        id: 'condition',
        title: 'Condition',
        type: 'checkbox',
        options: Object.entries(counts.condition).map(([value, count]) => ({
          label: value,
          value: value.toLowerCase(),
          count: count as number
        }))
      },
      {
        id: 'make',
        title: 'Make',
        type: 'checkbox',
        options: Object.entries(counts.make).map(([value, count]) => ({
          label: value,
          value: value.toLowerCase(),
          count: count as number
        }))
      },
      {
        id: 'type',
        title: 'Type',
        type: 'checkbox',
        options: Object.entries(counts.type).map(([value, count]) => ({
          label: value,
          value: value.toLowerCase(),
          count: count as number
        }))
      },
      {
        id: 'category',
        title: 'Category',
        type: 'checkbox',
        options: Object.entries(counts.category).map(([value, count]) => ({
          label: value,
          value: value.toLowerCase(),
          count: count as number
        }))
      }
    ];

    return sections.filter(section => section.options.length > 0);
  }, [allVehicles]);

  return { 
    vehicles: allVehicles,
    loading, 
    error,
    filterSections
  };
}
