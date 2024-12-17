"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface VehicleSearchProps {
  onSearch: (keyword: string) => void;
}

export function VehicleSearch({ onSearch }: VehicleSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10"
        />
      </div>
      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
        <Search className="h-4 w-4 mr-2" />
        SEARCH
      </Button>
    </form>
  );
}