"use client";

import { useState, useMemo } from "react";
import { VehicleGrid } from "./list/VehicleGrid";
import { VehicleSort } from "./list/VehicleSort";
import { SidebarFilters } from "./filters/SidebarFilters";
import { applyFilters, sortVehicles } from "@/lib/utils/filterUtils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import type { VehicleFilters } from "@/types/filters";

interface VehicleListProps {
  initialVehicles: Vehicle[];
  searchFilters: any;
  onClearSearch?: () => void;
}

export function VehicleList({ initialVehicles, searchFilters, onClearSearch }: VehicleListProps) {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [sortBy, setSortBy] = useState("newest");

  const filteredVehicles = useMemo(() => {
    const filtered = applyFilters(initialVehicles, filters, searchFilters.searchTerm || "");
    return sortVehicles(filtered, sortBy);
  }, [initialVehicles, filters, searchFilters, sortBy]);

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const categoryFilters = prev[category] || [];
      const updated = categoryFilters.includes(value)
        ? categoryFilters.filter(v => v !== value)
        : [...categoryFilters, value];
      
      return {
        ...prev,
        [category]: updated
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    setSortBy("newest");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : !!value
  ) || !!searchFilters.searchTerm;

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
            activeFilters={filters}
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