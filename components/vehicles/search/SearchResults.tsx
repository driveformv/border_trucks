import { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "../VehicleCard";

interface SearchResultsProps {
  vehicles: Vehicle[];
  loading: boolean;
}

export function SearchResults({ vehicles, loading }: SearchResultsProps) {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}