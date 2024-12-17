"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, Shield, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center min-h-[400px] md:h-[600px] flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/3l0a6682_r2.tif[1024_-1xoxar].png')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="container mx-auto px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-[72px] font-bold text-white mb-4 md:mb-6 leading-tight">
              Service & Support
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-6 md:mb-8 max-w-2xl leading-normal">
              Expert maintenance and repair services to keep your fleet running at peak performance. 
              Our certified technicians use genuine International parts and the latest diagnostic tools.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#1C1C1C] hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-md w-full md:w-auto"
            >
              <Link href="/services/schedule">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <Wrench className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h3 className="text-2xl font-bold mb-4">Preventive Maintenance</h3>
            <p className="text-gray-600 mb-6">
              Regular inspections and maintenance to prevent breakdowns and extend vehicle life.
            </p>
            <ul className="space-y-2 mb-8 text-gray-600">
              <li>• Oil and filter changes</li>
              <li>• Brake system service</li>
              <li>• Multi-point inspections</li>
              <li>• Fluid level checks</li>
            </ul>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/services/maintenance">Learn More</Link>
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h3 className="text-2xl font-bold mb-4">Repair Services</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive repair services for all International truck models.
            </p>
            <ul className="space-y-2 mb-8 text-gray-600">
              <li>• Engine diagnostics</li>
              <li>• Transmission repair</li>
              <li>• Electrical systems</li>
              <li>• Chassis repair</li>
            </ul>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/services/repair">View Services</Link>
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h3 className="text-2xl font-bold mb-4">24/7 Emergency Service</h3>
            <p className="text-gray-600 mb-6">
              Round-the-clock emergency repair and roadside assistance.
            </p>
            <ul className="space-y-2 mb-8 text-gray-600">
              <li>• Mobile service units</li>
              <li>• Roadside assistance</li>
              <li>• Emergency repairs</li>
              <li>• Towing service</li>
            </ul>
            <Button asChild className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">
              <Link href="/services/emergency">Get Help</Link>
            </Button>
          </Card>
        </div>
      </div>

      {/* Schedule Service */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="h-16 w-16 mx-auto mb-6 text-[#1C1C1C]" />
            <h2 className="text-3xl font-bold mb-4">Ready to Schedule Service?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Book your service appointment online or contact our service department.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-[#1C1C1C] hover:bg-[#2C2C2C]">
                <Link href="/services/schedule">Schedule Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}