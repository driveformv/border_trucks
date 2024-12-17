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
            <Link href="/training" className="text-white text-sm hover:text-white/80">
              Upcoming Training
            </Link>
            <Link href="/parts" className="text-white text-sm hover:text-white/80">
              Order Parts
            </Link>
            <Link href="/portal" className="text-white text-sm hover:text-white/80">
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