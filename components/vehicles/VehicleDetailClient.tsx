"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, FileText, Share2 } from "lucide-react";
import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { VehicleInquiryModal } from "./VehicleInquiryModal";

interface VehicleDetailClientProps {
  vehicle: Vehicle;
}

export function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Link href="/contact">
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> Contact Us
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowInquiryModal(true)}
        >
          <FileText className="w-4 h-4" /> Request Info
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>

      <VehicleInquiryModal
        open={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        vehicle={vehicle}
      />
    </div>
  );
}
