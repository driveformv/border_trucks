"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, FileText, Clock } from "lucide-react";

export default function FinancingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Truck Financing</h1>
          <p className="text-xl text-gray-300">
            Flexible financing solutions for your commercial truck needs.
          </p>
        </div>
      </div>

      {/* Financing Options */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8">
            <Calculator className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Payment Calculator</h2>
            <p className="text-gray-600 mb-6">
              Estimate your monthly payments and explore financing options.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">Calculate Payments</Button>
          </Card>

          <Card className="p-8">
            <FileText className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Apply for Financing</h2>
            <p className="text-gray-600 mb-6">
              Quick and easy online application process.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">Apply Now</Button>
          </Card>

          <Card className="p-8">
            <Clock className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
            <p className="text-gray-600 mb-6">
              Current financing promotions and lease specials.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">View Offers</Button>
          </Card>
        </div>
      </div>
    </main>
  );
}