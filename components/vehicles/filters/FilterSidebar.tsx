"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const filterCategories = [
  {
    name: "Condition",
    options: [
      { label: "New", count: 4 },
      { label: "Used", count: 17 }
    ]
  },
  {
    name: "Class",
    options: [
      { label: "Heavy Duty", count: 21 }
    ]
  },
  {
    name: "Make",
    options: [
      { label: "Freightliner", count: 7 },
      { label: "Kenworth", count: 12 },
      { label: "Navistar", count: 1 },
      { label: "Peterbilt", count: 1 }
    ]
  },
  {
    name: "Model",
    options: [
      { label: "579", count: 1 },
      { label: "LT625", count: 1 },
      { label: "PT126064ST", count: 7 },
      { label: "T680", count: 8 },
      { label: "T880", count: 3 },
      { label: "W900L", count: 1 }
    ]
  }
];

interface FilterSidebarProps {
  onFilterChange: (category: string, value: string) => void;
  activeFilters: Record<string, string[]>;
}

export function FilterSidebar({ onFilterChange, activeFilters }: FilterSidebarProps) {
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="space-y-4">
        {filterCategories.map((category) => (
          <AccordionItem key={category.name} value={category.name}>
            <AccordionTrigger className="text-lg font-semibold">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {category.options.map((option) => (
                  <div key={option.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category.name}-${option.label}`}
                      checked={activeFilters[category.name]?.includes(option.label)}
                      onCheckedChange={() => 
                        onFilterChange(category.name, option.label)
                      }
                    />
                    <Label 
                      htmlFor={`${category.name}-${option.label}`}
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
    </Card>
  );
}