"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, GraduationCap } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Careers</h1>
          <p className="text-xl text-gray-300">
            Join our team and build the future of transportation.
          </p>
        </div>
      </div>

      {/* Career Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8">
            <Briefcase className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Current Openings</h2>
            <p className="text-gray-600 mb-6">
              Browse our current job opportunities across all departments.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">View Jobs</Button>
          </Card>

          <Card className="p-8">
            <Users className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Why Join Us</h2>
            <p className="text-gray-600 mb-6">
              Learn about our culture, benefits, and growth opportunities.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">Learn More</Button>
          </Card>

          <Card className="p-8">
            <GraduationCap className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Training Programs</h2>
            <p className="text-gray-600 mb-6">
              Discover our apprenticeships and development programs.
            </p>
            <Button className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]">Explore Programs</Button>
          </Card>
        </div>
      </div>
    </main>
  );
}