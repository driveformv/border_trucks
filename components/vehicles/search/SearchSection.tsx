"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterButton } from "./FilterButton";

interface SearchSectionProps {
  onSearch: (filters: any) => void;
  onClear?: () => void;
  searchFilters: any;
}

export function SearchSection({ onSearch, onClear, searchFilters }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    priceRange: "",
  });

  const handleSearch = () => {
    onSearch({ 
      searchTerm,
      ...filters,
      type: filters.make ? "truck" : undefined,
      condition: filters.condition
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({
      make: "",
      year: "",
      priceRange: "",
    });
    if (onClear) {
      onClear();
    }
  };

  // Listen for external clear events
  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      setSearchTerm("");
      setFilters({
        make: "",
        year: "",
        priceRange: "",
      });
    }
  }, [searchFilters]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">SEARCH BY KEYWORD:</h2>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-[#1C1C1C]" />
            </div>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by make, model, year..."
              className="w-full pl-12 h-[52px] text-lg bg-white border-gray-200"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-[52px] px-8 text-lg bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white"
          >
            Search Inventory
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <FilterButton
            label="Make"
            options={["International", "Kenworth", "Peterbilt", "Freightliner"]}
            value={filters.make}
            onChange={(value) => setFilters({ ...filters, make: value })}
          />
          <FilterButton
            label="Year"
            options={["2025", "2024", "2023", "2022"]}
            value={filters.year}
            onChange={(value) => setFilters({ ...filters, year: value })}
          />
          <FilterButton
            label="Price Range"
            options={[
              "Under $150,000",
              "$150,000 - $200,000",
              "$200,000 - $250,000",
              "Over $250,000"
            ]}
            value={filters.priceRange}
            onChange={(value) => setFilters({ ...filters, priceRange: value })}
          />
        </div>
      </div>
    </div>
  );
}