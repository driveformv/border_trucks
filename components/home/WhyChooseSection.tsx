"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="p-8 bg-transparent border-white/20">
            <Image
              src="/assets/icons/White/International_Icon_Document-check_White.svg"
              alt="Certified Dealer"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Authorized Dealer</h3>
            <p className="text-gray-300">Factory-trained staff and genuine parts</p>
          </Card>

          <Card className="p-8 bg-transparent border-white/20">
            <Image
              src="/assets/icons/White/International_Icon_Clock_White.svg"
              alt="Clock"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-300">Emergency service when you need it</p>
          </Card>

          <Card className="p-8 bg-transparent border-white/20">
            <Image
              src="/assets/icons/White/International_Icon_User-multiple_White.svg"
              alt="Users"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
            <p className="text-gray-300">Decades of combined experience</p>
          </Card>

          <Card className="p-8 bg-transparent border-white/20">
            <Image
              src="/assets/icons/White/International_Icon_Star_White.svg"
              alt="Shield"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-300">Satisfaction guaranteed on all services</p>
          </Card>
        </div>
      </div>
    </section>
  );
}