"use client";

import { Vehicle } from "@/types/vehicle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VehicleShowcaseProps {
  vehicles: Vehicle[];
}

export function VehicleShowcase({ vehicles }: VehicleShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden group">
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={vehicle.images && vehicle.images.length > 0 
                ? (typeof vehicle.images[0] === 'string' ? vehicle.images[0] : vehicle.images[0].url)
                : "https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/vehicles%2Fplaceholder.jpg?alt=media"}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-xl font-semibold">
                {vehicle.price > 0 
                  ? `$${vehicle.price.toLocaleString()}`
                  : "Contact for Price"}
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">Engine</span>
                <p className="font-medium">{vehicle.engineMake} {vehicle.engineModel}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Transmission</span>
                <p className="font-medium">{vehicle.transmission}</p>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href={`/inventory/${vehicle.id}`}>View Details</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
