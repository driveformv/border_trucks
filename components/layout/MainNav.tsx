"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Parts", href: "/parts" },
  { label: "Services", href: "/services" },
  { label: "Financing", href: "/financing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" }
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1C1C1C]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Logo className="h-16 w-auto" />
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-white/80 transition-colors px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}