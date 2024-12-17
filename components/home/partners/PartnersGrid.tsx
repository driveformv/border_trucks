"use client";

import { partners } from "@/lib/constants/partners";
import { PartnerCard } from "./PartnerCard";

export function PartnersGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
      {partners.map((partner) => (
        <PartnerCard 
          key={partner.name}
          {...partner}
        />
      ))}
    </div>
  );
}