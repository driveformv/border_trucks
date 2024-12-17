import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Border International",
  description: "Thank you for your inquiry. We will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-[#1C1C1C] dark:text-white">
          Thank You for Your Inquiry
        </h1>
        <p className="text-lg text-[#1C1C1C]/80 dark:text-white/80">
          We have received your message and will get back to you shortly. One of our representatives will contact you within 24 hours.
        </p>
        <div className="space-y-4">
          <p className="text-[#1C1C1C]/60 dark:text-white/60">
            While you wait, you can:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button variant="outline" className="w-full sm:w-auto">
                Browse More Vehicles
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
