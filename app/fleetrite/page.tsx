import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleetrite® Parts Stores | Border International",
  description: "Visit our Fleetrite® parts stores in El Paso, Alamogordo, and Silver City for quality truck parts and exceptional service.",
};

export default function FleetritePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fleetrite® Parts Stores</h1>
        
        <div className="prose max-w-none mb-12">
          <p>
            As an authorized Fleetrite® dealer, Border International provides quality aftermarket truck parts 
            through our network of parts stores. Visit one of our locations for expert service and competitive pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* El Paso Store */}
          <Link 
            href="/fleetrite/el-paso"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-4">El Paso</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  101 Montoya Rd<br />
                  El Paso, TX 79932
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>(915) 444-5893</span>
              </div>
            </div>
          </Link>

          {/* Alamogordo Store */}
          <Link 
            href="/fleetrite/alamogordo"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-4">Alamogordo</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  631 Hwy 70 W<br />
                  Alamogordo, NM 88310
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>(575) 502-3420</span>
              </div>
            </div>
          </Link>

          {/* Silver City Store */}
          <Link 
            href="/fleetrite/silver-city"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-4">Silver City</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  2110 E US Highway 180<br />
                  Silver City, NM 88061
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>(575) 209-4813</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="prose max-w-none mt-12">
          <h2>Why Choose Fleetrite®?</h2>
          <p>
            Fleetrite® is International® Truck's private label brand for quality aftermarket truck parts. 
            With over 100 years of experience, Fleetrite® parts are designed to exact specifications for 
            all truck makes and are backed by competitive warranties.
          </p>

          <h2>Our Services</h2>
          <ul>
            <li>Extensive inventory of Fleetrite® parts</li>
            <li>Expert parts consultation</li>
            <li>Quick order fulfillment</li>
            <li>Competitive pricing</li>
            <li>Warranty support</li>
          </ul>

          <h2>Hours of Operation</h2>
          <p>
            All locations are open:<br />
            Monday - Friday: 8am - 5pm MST<br />
            Saturday: 8am - 12pm MST<br />
            24/7 Emergency Service Available
          </p>
        </div>
      </div>
    </main>
  );
}
