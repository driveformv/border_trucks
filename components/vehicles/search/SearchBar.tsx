"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="h-5 w-5 text-[#1C1C1C]" />
        </div>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by make, model..."
          className="w-full pl-12 h-[52px] text-lg bg-white border-gray-200"
        />
      </div>
      <Button
        onClick={onSearch}
        className="h-[52px] px-8 text-lg"
      >
        Search Inventory
      </Button>
    </div>
  );
}