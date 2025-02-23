"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { VehicleShowcase } from "@/components/vehicles/VehicleShowcase";
import { ServicePartsSection } from "@/components/home/ServicePartsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { db } from "@/lib/firebase/config";
import { ref, onValue } from "firebase/database";
import type { Vehicle } from "@/types/vehicle";

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get trucks and trailers
    const trucksRef = ref(db, 'vehicles/trucks');
    const trailersRef = ref(db, 'vehicles/trailers');

    const unsubscribeTrucks = onValue(trucksRef, (snapshot) => {
      const trucksData = snapshot.val();
      if (trucksData) {
        const trucksArray = Object.values(trucksData)
          .filter((truck: any) => 
            truck.images && 
            truck.images.length > 0 && 
            (truck.status === 'active' || truck.status === 'Available')
          )
          .map((truck: any) => {
            const details = truck.details || truck;
            return {
              id: truck.id,
              type: 'truck' as const,
              condition: (details.condition === 'New' ? 'New' : 'Used') as 'New' | 'Used',
              make: details.make,
              model: details.model,
              year: details.year,
              price: details.price || 0,
              mileage: details.mileage,
              stockNumber: details.stockNumber || '',
              vin: details.vin || '',
              description: details.description || '',
              images: truck.images || [],
              engineMake: details.engineMake,
              engineModel: details.engineModel,
              transmission: details.transmission,
              specs: truck.specs || {},
              features: truck.features || [],
              category: details.category || [],
              status: (truck.status === 'active' || truck.status === 'Available') ? truck.status as Vehicle['status'] : 'Available',
              location: details.location || ''
            };
          });
        setFeaturedVehicles(prev => [...prev.filter(v => v.type !== 'truck'), ...trucksArray.slice(0, 3)]);
      }
    });

    const unsubscribeTrailers = onValue(trailersRef, (snapshot) => {
      const trailersData = snapshot.val();
      if (trailersData) {
        const trailersArray = Object.values(trailersData)
          .filter((trailer: any) => 
            trailer.images && 
            trailer.images.length > 0 && 
            (trailer.status === 'active' || trailer.status === 'Available')
          )
          .map((trailer: any) => {
            const details = trailer.details || trailer;
            return {
              id: trailer.id,
              type: 'trailer' as const,
              condition: (details.condition === 'New' ? 'New' : 'Used') as 'New' | 'Used',
              make: details.make,
              model: details.model,
              year: details.year,
              price: details.price || 0,
              mileage: details.mileage,
              stockNumber: details.stockNumber || '',
              vin: details.vin || '',
              description: details.description || '',
              images: trailer.images || [],
              trailerType: details.trailerType,
              length: details.length,
              width: details.width,
              height: details.height,
              specs: trailer.specs || {},
              features: trailer.features || [],
              category: details.category || [],
              status: (trailer.status === 'active' || trailer.status === 'Available') ? trailer.status as Vehicle['status'] : 'Available',
              location: details.location || ''
            };
          });
        setFeaturedVehicles(prev => [...prev.filter(v => v.type !== 'trailer'), ...trailersArray.slice(0, 3)]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeTrucks();
      unsubscribeTrailers();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Featured Vehicles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Vehicles</h2>
          <VehicleShowcase vehicles={featuredVehicles} />
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
