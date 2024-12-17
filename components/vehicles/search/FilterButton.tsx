"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterButtonProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterButton({ label, options, value, onChange }: FilterButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-[52px] px-6 text-lg border-2 border-gray-200 hover:bg-gray-50"
        >
          {label}
          <ChevronDown className="ml-2 h-5 w-5 text-[#1C1C1C]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="p-2">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 ${
                value === option ? 'bg-gray-100' : ''
              }`}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}