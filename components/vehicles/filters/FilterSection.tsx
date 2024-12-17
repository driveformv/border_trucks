"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FilterSection as FilterSectionType } from "@/types/filters";

interface FilterSectionProps {
  section: FilterSectionType;
  selectedValues: string[];
  onChange: (value: string) => void;
}

export function FilterSection({ section, selectedValues, onChange }: FilterSectionProps) {
  return (
    <AccordionItem value={section.id}>
      <AccordionTrigger className="text-lg font-semibold">
        {section.title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 pt-2">
          {section.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${section.id}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => onChange(option.value)}
              />
              <Label 
                htmlFor={`${section.id}-${option.value}`}
                className="flex-1 cursor-pointer"
              >
                {option.label} ({option.count})
              </Label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}