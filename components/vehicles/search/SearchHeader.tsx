"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  onSearch: (keyword: string) => void;
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  return (
    <div className="bg-gray-100 p-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl font-bold mb-4">SEARCH BY KEYWORD:</div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter keywords..."
            className="flex-1"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button className="bg-red-600 hover:bg-red-700">
            <Search className="h-4 w-4 mr-2" />
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
}