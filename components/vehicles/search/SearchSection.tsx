"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/lib/hooks/useVehicles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SearchFilters {
  searchTerm?: string;
  make?: string[];
  condition?: string[];
  year?: string[];
}

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
  onClear?: () => void;
  searchFilters: SearchFilters;
}

export function SearchSection({ onSearch, onClear, searchFilters }: SearchSectionProps) {
  const { filterSections } = useVehicles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterClick = (category: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      const newFilters = { ...prev };
      if (newValues.length > 0) {
        newFilters[category] = newValues;
      } else {
        delete newFilters[category];
      }

      // Immediately trigger search with new filters
      onSearch({
        searchTerm,
        ...newFilters
      });

      return newFilters;
    });
  };

  const handleSearch = () => {
    onSearch({
      searchTerm,
      ...filters
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({});
    if (onClear) {
      onClear();
    }
  };

  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      setSearchTerm("");
      setFilters({});
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

        {/* Dynamic Filters */}
        <div className="flex gap-4">
          {filterSections.map((section) => (
            <DropdownMenu key={section.id}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`h-[52px] px-6 text-lg border-2 hover:bg-gray-50 ${
                    filters[section.id]?.length ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
                  }`}
                >
                  {filters[section.id]?.length 
                    ? `${section.title} (${filters[section.id].length})`
                    : section.title
                  }
                  <ChevronDown className="ml-2 h-5 w-5 text-[#1C1C1C]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg">
                {section.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className={`flex items-center px-4 py-2 cursor-pointer ${
                      filters[section.id]?.includes(option.value) ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleFilterClick(section.id, option.value)}
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
  );
}
