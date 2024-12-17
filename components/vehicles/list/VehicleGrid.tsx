import { VehicleCard } from "../VehicleCard";
import type { Vehicle } from "@/types/vehicle";

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No vehicles found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}