import { useState, useCallback } from 'react';
import type { VehicleFilters } from '@/types/filters';
import type { Vehicle } from '@/types/vehicle';

export function useVehicleFilters(initialVehicles: Vehicle[]) {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const updateFilter = useCallback((category: keyof VehicleFilters, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  }, []);

  const updateRangeFilter = useCallback((
    category: keyof VehicleFilters,
    min?: number,
    max?: number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { min, max }
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  const applyFilters = useCallback((vehicles: Vehicle[]) => {
    return vehicles.filter((vehicle) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchFields = [
          vehicle.make,
          vehicle.model,
          vehicle.engineMake,
          vehicle.engineModel,
          vehicle.stockNumber,
          vehicle.description
        ].map(field => field?.toLowerCase() || '');

        if (!searchFields.some(field => field.includes(searchLower))) {
          return false;
        }
      }

      // Category filters
      for (const [category, values] of Object.entries(filters)) {
        if (!values || (Array.isArray(values) && values.length === 0)) continue;

        switch (category) {
          case 'condition':
          case 'make':
          case 'model':
            if (Array.isArray(values) && !values.includes(vehicle[category])) {
              return false;
            }
            break;

          case 'year':
          case 'price':
          case 'mileage':
            const range = values as { min?: number; max?: number };
            const value = vehicle[category] as number;
            if (
              (range.min !== undefined && value < range.min) ||
              (range.max !== undefined && value > range.max)
            ) {
              return false;
            }
            break;
        }
      }

      return true;
    });
  }, [filters, searchTerm]);

  return {
    filters,
    searchTerm,
    updateFilter,
    updateRangeFilter,
    setSearchTerm,
    clearFilters,
    applyFilters
  };
}