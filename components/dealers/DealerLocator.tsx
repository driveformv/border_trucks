"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DealerLocator() {
  const [location, setLocation] = useState("");

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter ZIP code or city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="text-lg py-6"
        />
        <Button size="lg" className="bg-[#1C1C1C] hover:bg-[#2C2C2C] px-8">
          <Search className="h-5 w-5 mr-2" />
          Find Dealers
        </Button>
      </div>
    </div>
  );
}