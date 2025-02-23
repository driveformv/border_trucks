"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContactForm } from '@/components/forms/ContactForm';

export default function S13IntegratedPowertrainPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] w-full bg-[#1C1C1C] flex items-center">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 max-w-5xl mx-auto leading-tight text-white">
            THE INTERNATIONAL® LT® WITH THE S13® INTEGRATED POWERTRAIN LEADS THE ON-HIGHWAY AERO CATEGORY IN FUEL ECONOMY BY AT LEAST 5%.*
          </h1>
          <div className="flex justify-center mt-8">
            <Button 
              className="h-12 bg-[#1C1C1C] hover:bg-[#FF2A00] text-white font-medium rounded-lg transition-colors"
              onClick={() => setShowContactForm(true)}
            >
              REQUEST A QUOTE
            </Button>
            <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
              <DialogContent className="max-w-2xl">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-12 text-[#1C1C1C]">SHIFT WHAT'S POSSIBLE.</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  The International® S13® Integrated Powertrain is our most advanced, fuel-efficient and streamlined powertrain, available in the LT®, RH™, HX®, and HV™ series.
                </p>
                <p>
                  In fact, the International® LT® with the S13 Integrated Powertrain leads the on-highway aero category by at least 5% in fuel economy.*
                </p>
                <p>
                  Capable of up to 515 hp and 1,850 lb-ft of torque, the S13 Integrated consists of an engine, transmission and aftertreatment system designed together to maximize integration between systems while allowing each component to perform its function. The result is a new standard of efficiency, profitability and sustainability for our on-highway and off-highway customers.
                </p>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-xl shadow-md border border-[#1C1C1C]/10">
                <h3 className="text-2xl font-bold mb-6 text-[#1C1C1C]">Technical Specifications</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Up to 515 horsepower</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Up to 1,850 lb-ft of torque</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>5%+ fuel economy improvement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Integrated aftertreatment system</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-[#1C1C1C]/10">
                <h3 className="text-2xl font-bold mb-6 text-[#1C1C1C]">Key Benefits</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Industry-leading fuel efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Maximized system integration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Enhanced durability and reliability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1.5">
                      <div className="w-2 h-2 bg-[#FF2A00] rounded-full"></div>
                    </div>
                    <span>Lower total cost of ownership</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Video Section */}
            <div className="aspect-video w-full bg-white rounded-xl overflow-hidden shadow-md mb-16">
              <iframe 
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/fJ2Munxr_X4?si=yHWKBz6toPgMfzpU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="text-sm text-gray-500 mt-8">
              * Fuel economy improvement based on internal testing comparing International® LT® with the S13 Integrated Powertrain to International® LT® with the A26 engine.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
