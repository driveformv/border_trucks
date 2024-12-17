"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState({
    keyword: "",
    make: "",
    model: "",
    year: "",
    price: "",
    condition: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">SEARCH BY KEYWORD:</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              value={filters.keyword}
              onChange={(e) => handleChange("keyword", e.target.value)}
              className="flex-1"
              placeholder="Enter keywords..."
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Search className="h-4 w-4 mr-2" />
              SEARCH
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <Select
              value={filters.make}
              onValueChange={(value) => handleChange("make", value)}
            >
              <option value="">All Makes</option>
              <option value="international">International</option>
              <option value="kenworth">Kenworth</option>
              <option value="peterbilt">Peterbilt</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <Select
              value={filters.model}
              onValueChange={(value) => handleChange("model", value)}
            >
              <option value="">All Models</option>
              <option value="lt625">LT625</option>
              <option value="hx620">HX620</option>
              <option value="rv">RV Series</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <Select
              value={filters.year}
              onValueChange={(value) => handleChange("year", value)}
            >
              <option value="">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </Select>
          </div>
        </div>
      </form>
    </Card>
  );
}