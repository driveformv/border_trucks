"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0"
      >
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/images%2FInternational_Photography-Film-01.png?alt=media&token=8ea181fb-ff14-4d5b-9ac5-ef213c4d0f40"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-6xl font-bold mb-6">
            POWERING YOUR BUSINESS FORWARD
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Your trusted partner in commercial trucks. From sales to service, we keep your fleet running strong with industry-leading International® trucks and 24/7 support.
          </p>
          <div className="flex space-x-4">
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="min-w-[200px]"
            >
              <Link href="/inventory">EXPLORE TRUCKS</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="min-w-[200px]"
            >
              <Link href="/services/schedule">SCHEDULE SERVICE</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
