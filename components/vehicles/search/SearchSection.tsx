@!!!!!"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { filterVehicles } from "@/lib/utils/filterUtils";
import type { Vehicle } from "@/types/vehicle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchVehicles } from "@/lib/firebase";

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface FilterOptions {
  type: FilterOption[];
  make: FilterOption[];
  category: FilterOption[];
  year: FilterOption[];
  price: FilterOption[];
}

interface Filters {
  search: string;
  type: string;
  make: string;
  category: string;
  year: string;
  price: string;
}

interface SearchSectionProps {
  vehicles: Vehicle[];
  onFilteredVehicles: (vehicles: Vehicle[]) => void;
}

export function SearchSection({ vehicles, onFilteredVehicles }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "",
    make: "",
    category: "",
    year: "",
    price: ""
  });
  const [fetchedVehicles, setFetchedVehicles] = useState<Vehicle[]>([]);

  // Fetch vehicles from Firestore on mount
  useEffect(() => {
    async function getVehicles() {
      const data = await fetchVehicles();
      setFetchedVehicles(data);
    }
    getVehicles();
  }, []);

  // Use fetched vehicles if available, otherwise fallback to prop vehicles
  const vehiclesData = fetchedVehicles.length > 0 ? fetchedVehicles : vehicles;

  // Calculate filter options from vehicles data
  const filterOptions = useMemo<FilterOptions>(() => {
    const options: Record<string, Record<string, number>> = {
      type: {},
      make: {},
      category: {},
      year: {},
      price: {},
    };

    vehiclesData.forEach(vehicle => {
      if (vehicle) {
        // Count types (trucks vs trailers)
        if (vehicle.type) {
          options.type[vehicle.type] = (options.type[vehicle.type] || 0) + 1;
        }

        // Count makes
        if (vehicle.make) {
          const makeKey = vehicle.make.toLowerCase();
          options.make[makeKey] = (options.make[makeKey] || 0) + 1;
        }

        // Count categories
        if (vehicle.category && Array.isArray(vehicle.category)) {
          vehicle.category.forEach(cat => {
            if (cat) {
              const categoryKey = cat.toLowerCase();
              options.category[categoryKey] = (options.category[categoryKey] || 0) + 1;
            }
          });
        }
      }
    });

    return {
      type: Object.entries(options.type).map(([value, count]) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
        count,
      })),
      make: Object.entries(options.make).map(([value, count]) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
        count,
      })),
      category: Object.entries(options.category).map(([value, count]) => ({
        label: value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value,
        count,
      })),
      year: Object.entries(options.year).map(([value, count]) => ({
        label: value,
        value,
        count,
      })),
      price: Object.entries(options.price).map(([value, count]) => ({
        label: value,
        value,
        count,
      })),
    };
  }, [vehiclesData]);

  // Filter vehicles based on search term and filters
  const filteredVehicles = useMemo(() => {
    const activeFilters = {
      search: searchTerm,
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      )
    };
    return filterVehicles(vehiclesData, activeFilters);
  }, [vehiclesData, searchTerm, filters]);

  // Update parent component with filtered vehicles
  useEffect(() => {
    onFilteredVehicles(filteredVehicles);
  }, [filteredVehicles, onFilteredVehicles]);

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
  };

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      make: "",
      category: "",
      year: "",
      price: "",
    });
    setSearchTerm("");
  };

  const getFilterLabel = (type: keyof Filters) => {
    if (type === 'search') return '';
    if (!filters[type]) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
    const option = filterOptions[type].find(opt => opt.value === filters[type]);
    return option ? option.label : type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <section className="w-full bg-[#1A202C] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-2xl mb-6">Search our inventory of new and used commercial trucks. We stock a variety of class 8, class 6 and super duty truck models.</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-[28px] font-bold mb-8">SEARCH BY KEYWORD:</h1>
          
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by make, model, year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-[220px] h-[52px] text-lg rounded-lg border-2 border-gray-200 focus:border-gray-300 focus:ring-0"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A202C] text-white hover:bg-black px-10 py-2 h-[48px] text-lg font-medium rounded-lg"
                onClick={handleSearch}
              >
                Search Inventory
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3">
              {(['make', 'year', 'price'] as const).map((type) => (
              <DropdownMenu key={type}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`px-5 py-2 text-base font-medium border-2 border-gray-200 rounded-lg bg-white text-black hover:bg-gray-50 min-w-[120px] ${
                      filters[type] ? 'bg-gray-50' : ''
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    <ChevronDown className="ml-1.5 h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] bg-white">
                  {filterOptions[type]?.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className="text-sm py-2"
                      onClick={() => handleFilterChange(type, option.value)}
                    >
                      {option.label} ({option.count})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
