"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/images%2F3l0a6682_r2.tif%5B1024_-1xoxar%5D.png?alt=media&token=041f9913-2734-4b85-acf5-d780a05d7023')",
          backgroundColor: '#1a1a1a'
        }}
      >
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
              <Link href="/service">SCHEDULE SERVICE</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}