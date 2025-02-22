"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VehicleInquiryForm } from "@/components/forms/VehicleInquiryForm";

interface VehicleInfo {
  id: string;
  year: number;
  make: string;
  model: string;
  stockNumber: string;
}

interface VehicleInquiryModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

export function VehicleInquiryModal({
  open,
  onClose,
  vehicle,
}: VehicleInquiryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C1C1C] p-0 sm:p-6">
        <DialogHeader className="space-y-2 border-b border-[#1C1C1C]/10 p-4 sm:p-0 sm:pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-[#1C1C1C] dark:text-white">
            Request Vehicle Information
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-[#1C1C1C]/60 dark:text-white/60">
            Fill out the form below and our team will get back to you with more
            information about this vehicle.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 sm:p-6">
          <VehicleInquiryForm vehicle={vehicle} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
