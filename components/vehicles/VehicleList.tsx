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
  };
  onClearSearch?: () => void;
}

export function VehicleList({ searchFilters, onClearSearch }: VehicleListProps) {
  const { vehicles, loading } = useVehicles();
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState("newest");

  const filteredVehicles = useMemo(() => {
    const filtered = applyFilters(vehicles, filters, searchFilters.searchTerm || "");
    return sortVehicles(filtered, sortBy);
  }, [vehicles, filters, searchFilters.searchTerm, sortBy]);

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const categoryFilters = prev[category] || [];
      const updated = categoryFilters.includes(value)
        ? categoryFilters.filter((v: string) => v !== value)
        : [...categoryFilters, value];
      
      // Convert to VehicleFilters format for applyFilters
      const newFilters: Record<string, string[]> = {
        ...prev,
        [category]: updated
      };
      
      return newFilters;
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
