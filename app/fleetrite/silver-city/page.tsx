import { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleetrite® Parts Store Silver City, NM | Border International",
  description: "Visit our Fleetrite® parts store in Silver City, NM for quality heavy-duty truck parts. Serving International®, IC Bus®, and all major truck brands with expert service and competitive prices.",
};

export default function FleetriteSilverCityPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <a href="/fleetrite/silver-city" className="inline-block hover:text-teal-600 transition-colors">
            <h1 className="text-4xl font-bold mb-4">
              Fleetrite® Parts Store - Silver City, NM
            </h1>
          </a>
          <p className="text-lg text-gray-700 mb-8">
            Your trusted source for quality heavy-duty truck parts in Silver City
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Store Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <address className="not-italic space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <span className="block">2110 E US Highway 180</span>
                    <span className="block">Silver City, NM 88061</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <a href="tel:+15752094813" className="hover:text-teal-600">
                    (575) 209-4813
                  </a>
                </div>
              </address>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-teal-600" />
                  <div>
                    <p>Monday - Friday: 8am - 5pm MST</p>
                    <p>Saturday: 8am - 12pm MST</p>
                    <p className="text-teal-600 font-medium">24/7 Emergency Service Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCalhvCU0Uz3iO_HUPee7F4LCMJ4EZgScI&q=2110+E+US+Highway+180,Silver+City,NM+88061"
              allowFullScreen
              title="Silver City Fleetrite Store Location"
            />
          </div>
        </div>

        {/* Parts Information */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Quality Parts for Every Need</h2>
          <p className="text-gray-700 mb-4">
            At our Silver City Fleetrite® store, we offer an extensive range of high-quality parts 
            designed to fit International® and IC Bus® vehicles, as well as various other OEM makes 
            and models. Our inventory includes parts compatible with:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 list-none p-0 mb-8">
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Kenworth
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Freightliner
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Volvo
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Mack
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Peterbilt
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Hino
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Thomas Built Buses
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-600">✓</span> Western Star
            </li>
          </ul>
          <p className="text-gray-700">
            Visit our store today to discover our competitive prices and exceptional service. Our 
            knowledgeable staff is ready to help you find the exact parts you need to keep your 
            fleet running at peak performance.
          </p>
        </div>
      </div>
    </main>
  );
}
