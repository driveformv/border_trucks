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

const filterSections = [
  {
    title: "Condition",
    options: [
      { label: "New", value: "new", count: 4 },
      { label: "Used", value: "used", count: 17 }
    ]
  },
  {
    title: "Type",
    options: [
      { label: "Trucks", value: "truck", count: 15 },
      { label: "Trailers", value: "trailer", count: 6 }
    ]
  },
  {
    title: "Make",
    options: [
      { label: "International", value: "international", count: 8 },
      { label: "Hyundai", value: "hyundai", count: 4 },
      { label: "Kenworth", value: "kenworth", count: 5 },
      { label: "Peterbilt", value: "peterbilt", count: 4 }
    ]
  },
  {
    title: "Category",
    options: [
      { label: "Day Cab", value: "day-cab", count: 6 },
      { label: "Sleeper", value: "sleeper", count: 9 },
      { label: "Dry Van", value: "dry-van", count: 3 },
      { label: "Reefer", value: "reefer", count: 3 }
    ]
  }
];

interface SidebarFiltersProps {
  onFilterChange: (category: string, value: string) => void;
  activeFilters: Record<string, string[]>;
  onClearFilters?: () => void;
}

export function SidebarFilters({ onFilterChange, activeFilters }: SidebarFiltersProps) {
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="space-y-4">
        {filterSections.map((section) => (
          <AccordionItem key={section.title} value={section.title.toLowerCase()}>
            <AccordionTrigger className="text-lg font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {section.options.map((option) => {
                  const isChecked = activeFilters[section.title.toLowerCase()]?.includes(option.value) || false;
                  
                  return (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${section.title}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={() => 
                          onFilterChange(section.title.toLowerCase(), option.value)
                        }
                      />
                      <Label 
                        htmlFor={`${section.title}-${option.value}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option.label} ({option.count})
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}