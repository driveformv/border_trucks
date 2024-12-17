"use client";

import { Card } from "@/components/ui/card";
import { FilterSection } from "./FilterSection";
import type { FilterSection as FilterSectionType } from "@/types/filters";

const filterSections: FilterSectionType[] = [
  {
    id: "condition",
    title: "Condition",
    type: "checkbox",
    options: [
      { label: "New", value: "new", count: 4 },
      { label: "Used", value: "used", count: 17 }
    ]
  },
  {
    id: "class",
    title: "Class",
    type: "checkbox",
    options: [
      { label: "Heavy Duty", value: "heavy-duty", count: 21 }
    ]
  },
  {
    id: "make",
    title: "Make",
    type: "checkbox",
    options: [
      { label: "Freightliner", value: "freightliner", count: 7 },
      { label: "Kenworth", value: "kenworth", count: 12 },
      { label: "Navistar", value: "navistar", count: 1 },
      { label: "Peterbilt", value: "peterbilt", count: 1 }
    ]
  },
  {
    id: "model",
    title: "Model",
    type: "checkbox",
    options: [
      { label: "579", value: "579", count: 1 },
      { label: "LT625", value: "lt625", count: 1 },
      { label: "T680", value: "t680", count: 8 },
      { label: "T880", value: "t880", count: 3 },
      { label: "W900L", value: "w900l", count: 1 }
    ]
  }
];

interface FilterPanelProps {
  activeFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string) => void;
}

export function FilterPanel({ activeFilters, onFilterChange }: FilterPanelProps) {
  return (
    <Card className="p-4">
      <div className="space-y-6">
        {filterSections.map((section) => (
          <FilterSection
            key={section.id}
            section={section}
            selectedValues={activeFilters[section.id] || []}
            onChange={(value) => onFilterChange(section.id, value)}
          />
        ))}
      </div>
    </Card>
  );
}