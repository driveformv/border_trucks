"use client";

import Link from "next/link";
import {
  NavigationMenu as Nav,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationMenu() {
  return (
    <Nav>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 hover:text-gray-300">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[400px]">
              <Link href="/inventory/new" className="block p-2 hover:bg-gray-100">
                New Truck Inventory
              </Link>
              <Link href="/inventory/used" className="block p-2 hover:bg-gray-100">
                Used Truck Inventory
              </Link>
              <Link href="/inventory/trailers/new" className="block p-2 hover:bg-gray-100">
                New Trailer Inventory
              </Link>
              <Link href="/inventory/trailers/used" className="block p-2 hover:bg-gray-100">
                Used Trailer Inventory
              </Link>
              <Link href="/manufacturers" className="block p-2 hover:bg-gray-100">
                Truck Manufacturers
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Parts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[400px]">
              <Link href="/parts/order" className="block p-2 hover:bg-gray-100">
                Order Parts
              </Link>
              <Link href="/parts/catalog" className="block p-2 hover:bg-gray-100">
                Parts Catalog
              </Link>
              <Link href="/parts/specials" className="block p-2 hover:bg-gray-100">
                Parts Specials
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[400px]">
              <Link href="/services/maintenance" className="block p-2 hover:bg-gray-100">
                Maintenance
              </Link>
              <Link href="/services/repair" className="block p-2 hover:bg-gray-100">
                Repair Services
              </Link>
              <Link href="/services/warranty" className="block p-2 hover:bg-gray-100">
                Warranty Work
              </Link>
              <Link href="/services/schedule" className="block p-2 hover:bg-gray-100">
                Schedule Service
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/financing" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 hover:text-gray-300">
              Financing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/careers" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 hover:text-gray-300">
              Careers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-6 w-[400px]">
              <Link href="/contact/locations" className="block p-2 hover:bg-gray-100">
                Locations
              </Link>
              <Link href="/contact/sales" className="block p-2 hover:bg-gray-100">
                Sales Team
              </Link>
              <Link href="/contact/support" className="block p-2 hover:bg-gray-100">
                Support
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </Nav>
  );
}