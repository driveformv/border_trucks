"use client";

import { useState } from "react";
import { SearchSection } from "@/components/vehicles/search/SearchSection";
import { VehicleList } from "@/components/vehicles/VehicleList";
import type { FilterSection } from "@/types/filters";

interface SearchFilters {
  searchTerm?: string;
  make?: string[];
  condition?: string[];
  year?: string[];
  type?: string[];
  category?: string[];
}

interface InventoryClientProps {
  filterSections: FilterSection[];
}

export function InventoryClient({ filterSections }: InventoryClientProps) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setSearchFilters({});
  };

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
          onSearch={handleSearch}
          onClear={handleClearSearch}
          searchFilters={searchFilters}
          filterSections={filterSections}
        />
      </div>

      {/* Vehicle List */}
      <div className="container mx-auto px-4">
        <VehicleList 
          searchFilters={searchFilters} 
          onClearSearch={handleClearSearch}
        />
      </div>
    </main>
  );
}
