import type { Vehicle } from "@/types/vehicle";
import type { VehicleFilters } from "@/types/filters";

export function applyFilters(
  vehicles: Vehicle[],
  filters: VehicleFilters,
  searchTerm: string
): Vehicle[] {
  return vehicles.filter(vehicle => {
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const searchFields = [
        vehicle.make,
        vehicle.model,
        vehicle.description,
        vehicle.stockNumber,
        vehicle.engineMake,
        vehicle.engineModel,
        `${vehicle.year}`,
        vehicle.condition
      ].map(field => String(field).toLowerCase());

      if (!searchFields.some(field => field.includes(term))) {
        return false;
      }
    }

    // Apply category filters
    for (const [key, values] of Object.entries(filters)) {
      if (!values || (Array.isArray(values) && values.length === 0)) continue;

      switch (key) {
        case 'condition':
        case 'make':
        case 'model':
        case 'type':
          if (Array.isArray(values) && !values.includes(vehicle[key])) {
            return false;
          }
          break;

        case 'year':
          const yearRange = values as { min?: number; max?: number };
          if (
            (yearRange.min && vehicle.year < yearRange.min) ||
            (yearRange.max && vehicle.year > yearRange.max)
          ) {
            return false;
          }
          break;

        case 'price':
          const priceRange = values as { min?: number; max?: number };
          if (
            (priceRange.min && vehicle.price < priceRange.min) ||
            (priceRange.max && vehicle.price > priceRange.max)
          ) {
            return false;
          }
          break;

        case 'category':
          if (Array.isArray(values) && !values.some(cat => vehicle.category.includes(cat))) {
            return false;
          }
          break;
      }
    }

    return true;
  });
}

export function sortVehicles(vehicles: Vehicle[], sortBy: string): Vehicle[] {
  const sorted = [...vehicles];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'oldest':
      return sorted.sort((a, b) => a.year - b.year);
    default:
      return sorted;
  }
}