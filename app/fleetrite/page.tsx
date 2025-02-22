import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleetrite Truck Parts | Border International",
  description: "Visit our Fleetrite truck parts stores in El Paso, El Paso East, Las Cruces, Alamogordo, and Silver City for quality truck parts and exceptional service.",
};

export default function FleetritePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fleetrite Truck Parts</h1>
        
        <div className="prose max-w-3xl mb-12">
          <p>
            As an authorized Fleetrite dealer, Border International provides quality aftermarket truck parts 
            through our network of parts stores. Visit one of our locations for expert service and competitive pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* El Paso Store */}
          <Link 
            href="/fleetrite/el-paso"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="bg-[#1C1C1C] text-white p-6">
              <h2 className="text-2xl font-bold">El Paso</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">101 Montoya Rd</p>
                    <p>El Paso, TX 79932</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">(915) 444-5893</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Alamogordo Store */}
          <Link 
            href="/fleetrite/alamogordo"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="bg-[#1C1C1C] text-white p-6">
              <h2 className="text-2xl font-bold">Alamogordo</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">631 Hwy 70 W</p>
                    <p>Alamogordo, NM 88310</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">(575) 502-3420</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Silver City Store */}
          <Link 
            href="/fleetrite/silver-city"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="bg-[#1C1C1C] text-white p-6">
              <h2 className="text-2xl font-bold">Silver City</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">2110 E US Highway 180</p>
                    <p>Silver City, NM 88061</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">(575) 209-4813</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Las Cruces Store */}
          <Link 
            href="/fleetrite/las-cruces"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="bg-[#1C1C1C] text-white p-6">
              <h2 className="text-2xl font-bold">Las Cruces</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">2701 W Amador Ave</p>
                    <p>Las Cruces, NM 88005</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">(575) 541-4259</span>
                </div>
              </div>
            </div>
          </Link>

          {/* El Paso East Store */}
          <Link 
            href="/fleetrite/el-paso-east"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="bg-[#1C1C1C] text-white p-6">
              <h2 className="text-2xl font-bold">El Paso East</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">12283 Rojas Dr</p>
                    <p>El Paso, TX 79936</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">(915) 900-6564</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="prose max-w-3xl mx-auto mt-16">
          <h2>Why Choose Fleetrite?</h2>
          <p>
            Fleetrite is International's private label brand for quality aftermarket truck parts. 
            With over 100 years of experience, Fleetrite parts are designed to exact specifications for 
            all truck makes and are backed by competitive warranties.
          </p>

          <h2>Our Services</h2>
          <ul>
            <li>Extensive inventory of Fleetrite parts</li>
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
