interface VehicleSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  totalVehicles: number;
}

export function VehicleSort({ sortBy, onSortChange, totalVehicles }: VehicleSortProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-xl font-bold">
        {totalVehicles} truck(s) found
      </div>
      <select
        className="border rounded-md p-2"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Sort by: Newest First</option>
        <option value="oldest">Sort by: Oldest First</option>
        <option value="price-low">Sort by: Price (Low to High)</option>
        <option value="price-high">Sort by: Price (High to Low)</option>
      </select>
    </div>
  );
}