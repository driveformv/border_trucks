"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { VehicleShowcase } from "@/components/vehicles/VehicleShowcase";
import { ServicePartsSection } from "@/components/home/ServicePartsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { sampleVehicles } from "@/lib/data/sampleVehicles";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Featured Vehicles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Vehicles</h2>
          <VehicleShowcase vehicles={sampleVehicles.slice(0, 3)} />
        </div>
      </section>

      {/* Service & Parts */}
      <ServicePartsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Why Choose Us */}
      <WhyChooseSection />

      {/* Partners */}
      <PartnersSection />
    </main>
  );
}