import { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { GoogleMap } from "@/components/ui/GoogleMap";

export const metadata: Metadata = {
  title: "Fleetrite Truck Parts El Paso | Border International",
  description: "Visit our Fleetrite truck parts store in El Paso for quality truck parts and exceptional service. Located at 101 Montoya Rd, El Paso, TX 79932.",
};

export default function FleetriteElPaso() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fleetrite Truck Parts El Paso</h1>
        
        <div className="bg-[#1C1C1C] text-white p-8 rounded-t-xl">
          <h2 className="text-2xl font-bold">Location & Hours</h2>
        </div>
        <div className="bg-white rounded-b-xl shadow-lg">
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-lg">101 Montoya Rd</p>
                    <p className="text-gray-600">El Paso, TX 79932</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <a 
                    href="tel:+19154445893" 
                    className="font-medium text-lg hover:text-blue-600 transition-colors"
                  >
                    (915) 444-5893
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-lg">Monday - Friday</p>
                    <p className="text-gray-600">8am - 5pm MST</p>
                    <p className="font-medium text-lg mt-4">Saturday</p>
                    <p className="text-gray-600">8am - 12pm MST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="my-12 rounded-xl overflow-hidden shadow-lg">
          <GoogleMap address="101 Montoya Rd, El Paso, TX 79932" />
        </div>

        <div className="prose max-w-3xl mx-auto">
          <h2>About Our El Paso Fleetrite Store</h2>
          <p>
            Our El Paso Fleetrite truck parts store offers a comprehensive selection of quality truck parts 
            and accessories. As an authorized Fleetrite dealer, we provide reliable parts backed by 
            industry-leading warranties and competitive pricing.
          </p>
          
          <h2>Available Services</h2>
          <ul>
            <li>Extensive inventory of Fleetrite parts</li>
            <li>Expert parts consultation</li>
            <li>Quick order fulfillment</li>
            <li>Competitive pricing</li>
            <li>Warranty support</li>
          </ul>

          <h2>Why Choose Fleetrite?</h2>
          <p>
            Fleetrite is International's private label brand for quality aftermarket truck parts. 
            With over 100 years of experience, Fleetrite parts are designed to exact specifications for 
            all truck makes and are backed by competitive warranties.
          </p>
        </div>
      </div>
    </main>
  );
}
