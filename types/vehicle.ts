export interface VehicleImage {
  id: string;
  url: string;
  isPrimary: boolean;
  caption?: string;
}

export interface Vehicle {
  id: string;
  type: 'truck' | 'trailer';
  condition: 'New' | 'Used';
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  stockNumber: string;
  vin: string;
  description: string;
  images: (VehicleImage | string)[];
  
  // Truck-specific fields
  engineMake?: string;
  engineModel?: string;
  horsepower?: number;
  torque?: number;
  transmission?: string;
  transmissionType?: 'Manual' | 'Automatic';
  wheelBase?: string;
  frontAxleWeight?: string;
  rearAxleWeight?: string;
  gvwr?: string;
  suspension?: string;
  
  // Trailer-specific fields
  trailerType?: string;
  length?: string;
  width?: string;
  height?: string;
  capacity?: string;
  axles?: number;
  
  // Common specs
  specs: Record<string, string | number>;
  features: string[];
  category: string[];
  status: 'Available' | 'Sold' | 'Pending';
  location: string;
}
