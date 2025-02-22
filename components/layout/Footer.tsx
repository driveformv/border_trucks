"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo variant="white" className="h-12 w-12" />
            <p className="text-gray-400">
              Building the future of transportation since 1902.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/inventory" className="text-gray-400 hover:text-white">Inventory</Link></li>
              <li><Link href="/fleetrite" className="text-gray-400 hover:text-white">Fleetrite Parts</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/financing" className="text-gray-400 hover:text-white">Financing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/dealers" className="text-gray-400 hover:text-white">Find a Dealer</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 8am - 5pm MST</li>
              <li>Saturday: 8am - 12pm MST</li>
              <li>24/7 Emergency Service Available</li>
            </ul>
          </div>
        </div>

        {/* Locations */}
        <div className="border-t border-gray-800 pt-8 mb-12">
          <h3 className="text-lg font-bold mb-6">Our Locations</h3>
          
          {/* Dealerships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-2">El Paso</h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    12283 Rojas Dr<br />
                    El Paso, TX 79936
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+19159006564" className="hover:text-white">(915) 900-6564</a>
                </div>
              </address>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Las Cruces</h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    2701 W Amador Ave<br />
                    Las Cruces, NM 88005
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+15755414259" className="hover:text-white">(575) 541-4259</a>
                </div>
              </address>
            </div>
          </div>

          {/* Parts Stores */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="font-bold mb-2">
                <Link href="/fleetrite/silver-city" className="hover:text-white">
                  Fleetrite Silver City
                </Link>
              </h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    2110 E US Highway 180<br />
                    Silver City, NM 88061
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+15752094813" className="hover:text-white">(575) 209-4813</a>
                </div>
              </address>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                <Link href="/fleetrite/el-paso" className="hover:text-white">
                  Fleetrite El Paso
                </Link>
              </h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    101 Montoya Rd<br />
                    El Paso, TX 79932
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+19154445893" className="hover:text-white">(915) 444-5893</a>
                </div>
              </address>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                <Link href="/fleetrite/alamogordo" className="hover:text-white">
                  Fleetrite Alamogordo
                </Link>
              </h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    631 Hwy 70 W<br />
                    Alamogordo, NM 88310
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+15755023420" className="hover:text-white">(575) 502-3420</a>
                </div>
              </address>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                <Link href="/fleetrite/las-cruces" className="hover:text-white">
                  Fleetrite Las Cruces
                </Link>
              </h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    2701 W Amador Ave<br />
                    Las Cruces, NM 88005
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+15755414259" className="hover:text-white">(575) 541-4259</a>
                </div>
              </address>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                <Link href="/fleetrite/el-paso-east" className="hover:text-white">
                  Fleetrite El Paso East
                </Link>
              </h4>
              <address className="text-gray-400 not-italic">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    12283 Rojas Dr<br />
                    El Paso, TX 79936
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+19159006564" className="hover:text-white">(915) 900-6564</a>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Border International. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link 
                href="/admin/login"
                className="text-gray-400 hover:text-white text-sm flex items-center"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
