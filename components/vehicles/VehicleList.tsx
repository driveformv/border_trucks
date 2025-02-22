"use client";

import { useState, useMemo } from "react";
import { VehicleGrid } from "./list/VehicleGrid";
import { VehicleSort } from "./list/VehicleSort";
import { SidebarFilters } from "./filters/SidebarFilters";
import { applyFilters, sortVehicles } from "@/lib/utils/filterUtils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useVehicles } from "@/lib/hooks/useVehicles";
import type { VehicleFilters } from "@/types/filters";

interface VehicleListProps {
  searchFilters: {
    searchTerm?: string;
    make?: string[];
    condition?: string[];
    year?: string[];
    type?: string[];
    category?: string[];
  };
  onClearSearch?: () => void;
}

export function VehicleList({ searchFilters, onClearSearch }: VehicleListProps) {
  const { vehicles, loading } = useVehicles();
  const [sidebarFilters, setSidebarFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState("newest");

  const filteredVehicles = useMemo(() => {
    // Merge sidebar filters with search filters
    const mergedFilters: VehicleFilters = {
      ...sidebarFilters,
      // Add search filters
      ...(searchFilters.make && { make: searchFilters.make }),
      ...(searchFilters.condition && { condition: searchFilters.condition }),
      ...(searchFilters.year && { year: searchFilters.year }),
      ...(searchFilters.type && { type: searchFilters.type }),
      ...(searchFilters.category && { category: searchFilters.category })
    };

    const filtered = applyFilters(vehicles, mergedFilters, searchFilters.searchTerm || "");
    return sortVehicles(filtered, sortBy);
  }, [vehicles, sidebarFilters, searchFilters, sortBy]);

  const handleFilterChange = (category: string, value: string) => {
    setSidebarFilters(prev => {
      const categoryFilters = prev[category] || [];
      const valueIndex = categoryFilters.findIndex(
        (v: string) => v.toLowerCase() === value.toLowerCase()
      );
      
      const updated = valueIndex >= 0
        ? categoryFilters.filter((_: string, i: number) => i !== valueIndex)
        : [...categoryFilters, value];
      
      const newFilters = { ...prev };
      
      if (updated.length > 0) {
        newFilters[category] = updated;
      } else {
        delete newFilters[category];
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSidebarFilters({});
    setSortBy("newest");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const hasActiveFilters = Object.values(sidebarFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : !!value
  ) || Object.keys(searchFilters).length > 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <VehicleSort
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalVehicles={filteredVehicles.length}
        />
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear All Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SidebarFilters
            onFilterChange={handleFilterChange}
            activeFilters={sidebarFilters}
            onClearFilters={clearAllFilters}
          />
        </aside>

        <div className="lg:col-span-3">
          <VehicleGrid vehicles={filteredVehicles} />
        </div>
      </div>
    </div>
  );
}
