"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <div className="bg-[#1C1C1C] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex space-x-8">
            <Link href="/events" className="text-white text-sm hover:text-white/80">
              Upcoming Training
            </Link>
            <Link href="https://repairlinkshop.com/Account/Login?navistar" className="text-white text-sm hover:text-white/80">
              RepairLink
            </Link>
            <Link href="https://borderint.securepayments.cardpointe.com/pay?signature=PrJ5QAhsV1VNgdM8Jr17CAogO5Lz%2FXBwdHxhN5WRtD0rRUVCVNa%2FM6C5hxmbDI6xs%3D&paymentType=cc" className="text-white text-sm hover:text-white/80">
              Customer Portal
            </Link>
          </div>
          <Button variant="ghost" size="sm" className="text-white">
            <Image 
              src="/assets/icons/White/International_Icon_Phone_White.svg"
              alt="Phone"
              width={16}
              height={16}
              className="mr-2"
            />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
}
