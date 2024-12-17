"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Get in touch with our sales and support teams.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8">
            <MapPin className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
            <div className="text-gray-600 space-y-2">
              <p className="font-semibold">Border International</p>
              <p>2701 Mesilla Street</p>
              <p>Las Cruces, NM 88046</p>
              <p className="mt-4">Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p>Sat - Sun: Closed</p>
            </div>
          </Card>

          <Card className="p-8">
            <Phone className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Call Us</h2>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">Sales:</span>{" "}
                <a href="tel:+15551234567" className="hover:text-[#1C1C1C]">
                  (555) 123-4567
                </a>
              </p>
              <p>
                <span className="font-semibold">Service:</span>{" "}
                <a href="tel:+15557654321" className="hover:text-[#1C1C1C]">
                  (555) 765-4321
                </a>
              </p>
              <p>
                <span className="font-semibold">Parts:</span>{" "}
                <a href="tel:+15559876543" className="hover:text-[#1C1C1C]">
                  (555) 987-6543
                </a>
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <Mail className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Email Us</h2>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">Sales:</span>{" "}
                <a
                  href="mailto:sales@borderint.com"
                  className="hover:text-[#1C1C1C]"
                >
                  sales@borderint.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Service:</span>{" "}
                <a
                  href="mailto:service@borderint.com"
                  className="hover:text-[#1C1C1C]"
                >
                  service@borderint.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Parts:</span>{" "}
                <a
                  href="mailto:parts@borderint.com"
                  className="hover:text-[#1C1C1C]"
                >
                  parts@borderint.com
                </a>
              </p>
            </div>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <Card className="p-6">
            <ContactForm />
          </Card>
        </div>
      </div>
    </main>
  );
}