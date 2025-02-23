import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Building2, PhoneCall } from "lucide-react";

export default function FinancingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Financing</h1>
          <p className="text-xl text-gray-300">
            Flexible financing solutions to help your business grow.
          </p>
        </div>
      </div>

      {/* Financing Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8">
            <Wallet className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Customer Login</h2>
            <p className="text-gray-600 mb-6">
              Access your financing account and manage your payments online.
            </p>
            <Button 
              className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]"
              asChild
            >
              <a 
                href="https://nfc.navistar.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Customer Portal
              </a>
            </Button>
          </Card>

          <Card className="p-8">
            <Building2 className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Dealer Login</h2>
            <p className="text-gray-600 mb-6">
              Dealer portal for financing applications and account management.
            </p>
            <Button 
              className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]"
              asChild
            >
              <a 
                href="https://www.nfcdealerportal.com/Origination"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dealer Portal
              </a>
            </Button>
          </Card>

          <Card className="p-8">
            <PhoneCall className="h-12 w-12 mb-6 text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Speak with our financing team about flexible solutions for your business.
            </p>
            <Button 
              className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]"
              asChild
            >
              <a href="/contact">
                Get in Touch
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
