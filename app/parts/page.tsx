"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";

export default function PartsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Parts & Service</h1>
          <p className="text-xl text-gray-300">
            Genuine International parts and expert service to keep your truck running at peak performance.
          </p>
        </div>
      </div>

      {/* Parts Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8">
            <ShoppingCart className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Order Parts</h2>
            <p className="text-gray-600 mb-6">
              Order genuine International parts online for pickup or delivery.
            </p>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/parts/order">Shop Now</Link>
            </Button>
          </Card>

          <Card className="p-8">
            <Tag className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Parts Catalog</h2>
            <p className="text-gray-600 mb-6">
              Browse our comprehensive parts catalog by vehicle or category.
            </p>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/parts/catalog">View Catalog</Link>
            </Button>
          </Card>

          <Card className="p-8">
            <Wrench className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Service Center</h2>
            <p className="text-gray-600 mb-6">
              Schedule service or find a certified service center near you.
            </p>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/services">Schedule Service</Link>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}