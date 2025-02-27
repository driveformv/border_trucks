"use client";

import { ServiceScheduleForm } from "@/components/forms/ServiceScheduleForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ScheduleServicePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[300px] flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/images%2F3l0a6682_r2.tif%5B1024_-1xoxar%5D.png?alt=media&token=041f9913-2734-4b85-acf5-d780a05d7023')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Schedule a Service
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-normal">
              Book your service appointment online and our team will contact you to confirm the details.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <Button 
          asChild
          variant="ghost" 
          className="mb-8 text-[#1C1C1C] hover:text-[#FF2A00] hover:bg-transparent"
        >
          <Link href="/services" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1C1C1C] p-8 rounded-lg shadow-sm border border-[#1C1C1C]/10 dark:border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1C1C1C] dark:text-white">
              Schedule a Service Online
            </h2>
            <p className="text-[#1C1C1C]/70 dark:text-white/70 mb-8">
              Fill out the form below to schedule a service appointment. Our team will contact you to confirm the details and answer any questions you may have.
            </p>
            
            <ServiceScheduleForm />
          </div>
        </div>
      </div>
    </main>
  );
}
