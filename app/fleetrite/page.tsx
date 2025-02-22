import { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleetrite® Parts Stores | Border International",
  description: "Find quality heavy-duty truck parts at our Fleetrite® stores in El Paso, TX, Silver City, NM, and Alamogordo, NM. Serving all major truck brands with expert service.",
};

export default function FleetritePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Fleetrite® Parts Stores
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Quality parts and expert service at our convenient locations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* El Paso Location */}
          <Link 
            href="/fleetrite/el-paso"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">El Paso, TX</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block">1201 E San Antonio Ave</span>
                  <span className="block">El Paso, TX 79901</span>
                  <span className="block text-teal-600 mt-2">(915) 544-1100</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Silver City Location */}
          <Link 
            href="/fleetrite/silver-city"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Silver City, NM</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block">2110 E US Highway 180</span>
                  <span className="block">Silver City, NM 88061</span>
                  <span className="block text-teal-600 mt-2">(575) 209-4813</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Alamogordo Location */}
          <Link 
            href="/fleetrite/alamogordo"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Alamogordo, NM</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block">601 S White Sands Blvd</span>
                  <span className="block">Alamogordo, NM 88310</span>
                  <span className="block text-teal-600 mt-2">(575) 437-5800</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About Our Parts</h2>
          <p className="text-gray-700 mb-8">
            Fleetrite® is International's private label brand of quality aftermarket truck and bus parts. 
            With over 100 different product lines and thousands of part numbers available, we offer a 
            comprehensive selection of parts for all makes of trucks and buses. All Fleetrite® parts meet 
            or exceed OEM specifications and come with a nationwide warranty.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Services</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Parts for all major truck brands
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Expert technical support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Competitive pricing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Fast order fulfillment
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Why Choose Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Quality guaranteed parts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Nationwide warranty
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> 24/7 emergency service
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span> Knowledgeable staff
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
