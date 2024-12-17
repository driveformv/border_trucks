"use client";

import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "International trucks have been the backbone of our fleet for over a decade. The reliability and service support are unmatched.",
      author: "John Smith",
      role: "Fleet Manager",
      company: "National Logistics"
    },
    {
      quote: "The service team goes above and beyond. They understand that time is money in our business.",
      author: "Sarah Johnson",
      role: "Operations Director",
      company: "Regional Transport Co."
    },
    {
      quote: "From sales to service, they've been a true partner in our success. The quality of International trucks speaks for itself.",
      author: "Mike Wilson",
      role: "Owner",
      company: "Wilson Trucking"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Customer Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8">
              <Quote className="h-8 w-8 text-[#1C1C1C] mb-4" />
              <blockquote className="text-lg mb-6">{testimonial.quote}</blockquote>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="text-gray-600">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}