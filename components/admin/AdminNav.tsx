"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { label: "Vehicles", href: "/admin/vehicles" },
  { label: "Events", href: "/admin/events" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1C1C1C]">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          <div className="flex space-x-8">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white hover:text-white/80 transition-colors ${
                  pathname === item.href
                    ? "text-white border-b-2 border-white"
                    : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
