"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { filterOptions } from "@/lib/data/filterOptions";

interface FilterAccordionProps {
  onFilterChange: (category: string, value: string) => void;
  activeFilters: Record<string, string[]>;
}

export function FilterAccordion({ onFilterChange, activeFilters }: FilterAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(filterOptions).map(([category, options]) => (
        <AccordionItem key={category} value={category}>
          <AccordionTrigger className="text-lg font-semibold capitalize">
            {category}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option.value}`}
                    checked={activeFilters[category]?.includes(option.value)}
                    onCheckedChange={() => onFilterChange(category, option.value)}
                  />
                  <Label 
                    htmlFor={`${category}-${option.value}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option.label} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}