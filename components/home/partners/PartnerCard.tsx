"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface PartnerCardProps {
  name: string;
  logo: string;
  link: string;
}

export function PartnerCard({ name, logo, link }: PartnerCardProps) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-8 h-full">
      <div className="flex-1 w-full h-[120px] flex items-center justify-center mb-8 relative">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={200}
          height={100}
          className="object-contain w-auto h-auto"
          priority
          unoptimized
        />
      </div>
      <Button 
        asChild 
        className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white"
      >
        <Link href={link}>Get more information</Link>
      </Button>
    </div>
  );
}