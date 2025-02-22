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
import { useVehicles } from "@/lib/hooks/useVehicles";
import type { FilterSection } from "@/types/filters";

interface SidebarFiltersProps {
  onFilterChange: (category: string, value: string) => void;
  activeFilters: Record<string, string[]>;
  onClearFilters?: () => void;
}

export function SidebarFilters({ onFilterChange, activeFilters }: SidebarFiltersProps) {
  const { filterSections } = useVehicles();
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="space-y-4">
        {filterSections.map((section: FilterSection) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="text-lg font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {section.options.map((option) => {
                  const isChecked = activeFilters[section.id]?.includes(option.value) || false;
                  
                  return (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${section.id}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={() => 
                          onFilterChange(section.id, option.value)
                        }
                      />
                      <Label 
                        htmlFor={`${section.id}-${option.value}`}
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
