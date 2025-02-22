export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
}

export interface VehicleFilters {
  condition?: string[];
  class?: string[];
  make?: string[];
  model?: string[];
  year?: string[] | { min?: number; max?: number };
  price?: { min?: number; max?: number };
  mileage?: { min?: number; max?: number };
  engineMake?: string[];
  transmission?: string[];
  sleeper?: string[];
  wheelbase?: string[];
  type?: string[];
  category?: string[];
}
