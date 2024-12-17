"use client";

import { PartnersHeader } from "./partners/PartnersHeader";
import { PartnersGrid } from "./partners/PartnersGrid";

export function PartnersSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <PartnersHeader />
        <PartnersGrid />
      </div>
    </section>
  );
}