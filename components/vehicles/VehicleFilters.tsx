import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  filters: {
    condition?: string[];
    make?: string[];
    class?: string[];
  };
  onFilterChange: (category: string, value: string) => void;
}

export function VehicleFilters({ filters, onFilterChange }: FiltersProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Condition</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new"
                checked={filters.condition?.includes('New')}
                onCheckedChange={() => onFilterChange('condition', 'New')}
              />
              <Label htmlFor="new">New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="used"
                checked={filters.condition?.includes('Used')}
                onCheckedChange={() => onFilterChange('condition', 'Used')}
              />
              <Label htmlFor="used">Used</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Make</h3>
          <div className="space-y-2">
            {['Kenworth', 'Peterbilt', 'Freightliner'].map((make) => (
              <div key={make} className="flex items-center space-x-2">
                <Checkbox
                  id={make}
                  checked={filters.make?.includes(make)}
                  onCheckedChange={() => onFilterChange('make', make)}
                />
                <Label htmlFor={make}>{make}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
