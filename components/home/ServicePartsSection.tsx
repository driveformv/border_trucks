"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, ShoppingCart, Clock, Truck } from "lucide-react";
import Link from "next/link";

export function ServicePartsSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Service & Parts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service Center */}
          <Card className="p-8 flex flex-col h-full">
            <div className="flex-1 space-y-6">
              <Wrench className="h-12 w-12 text-[#1C1C1C]" />
              <h3 className="text-2xl font-bold">Service Center</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#1C1C1C]" />
                  <span>24/7 Emergency Service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#1C1C1C]" />
                  <span>Mobile Service Units</span>
                </li>
              </ul>
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href="/services">Schedule Service</Link>
            </Button>
          </Card>

          {/* Parts Department */}
          <Card className="p-8 flex flex-col h-full">
            <div className="flex-1 space-y-6">
              <ShoppingCart className="h-12 w-12 text-[#1C1C1C]" />
              <h3 className="text-2xl font-bold">Parts Department</h3>
              <ul className="space-y-4 mb-8">
                <li>Genuine International Parts</li>
                <li>Online Parts Ordering</li>
                <li>Fleet Solutions</li>
              </ul>
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href="/parts">Order Parts</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}