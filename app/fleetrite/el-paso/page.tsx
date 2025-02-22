import { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { GoogleMap } from "@/components/ui/GoogleMap";

export const metadata: Metadata = {
  title: "Fleetrite® Parts Store El Paso | Border International",
  description: "Visit our Fleetrite® parts store in El Paso for quality truck parts and exceptional service. Located at 101 Montoya Rd, El Paso, TX 79932.",
};

export default function FleetriteElPaso() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fleetrite® Parts Store El Paso</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">101 Montoya Rd</p>
                    <p>El Paso, TX 79932</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <a 
                    href="tel:+19154445893" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    (915) 444-5893
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hours</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p>Monday - Friday: 8am - 5pm MST</p>
                    <p>Saturday: 8am - 12pm MST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <GoogleMap address="101 Montoya Rd, El Paso, TX 79932" />
        </div>

        <div className="prose max-w-none">
          <h2>About Our El Paso Fleetrite® Store</h2>
          <p>
            Our El Paso Fleetrite® parts store offers a comprehensive selection of quality truck parts 
            and accessories. As an authorized Fleetrite® dealer, we provide reliable parts backed by 
            industry-leading warranties and competitive pricing.
          </p>
          
          <h2>Available Services</h2>
          <ul>
            <li>Extensive inventory of Fleetrite® parts</li>
            <li>Expert parts consultation</li>
            <li>Quick order fulfillment</li>
            <li>Competitive pricing</li>
            <li>Warranty support</li>
          </ul>

          <h2>Why Choose Fleetrite®?</h2>
          <p>
            Fleetrite® is International® Truck's private label brand for quality aftermarket truck parts. 
            With over 100 years of experience, Fleetrite® parts are designed to exact specifications for 
            all truck makes and are backed by competitive warranties.
          </p>
        </div>
      </div>
    </main>
  );
}
