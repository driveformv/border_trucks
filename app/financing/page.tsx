import { Button } from "@/components/ui/button";

export default function FinancingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-[#333333] via-[#222222] to-[#111111]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col justify-end pb-36">
          <h1 className="text-[5.5rem] font-bold tracking-wide">FINANCING</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="container py-24">
        <div className="max-w-5xl">
          <div className="mb-20">
            <h2 className="mb-12 text-[4rem] font-bold tracking-tight">UNLOCK YOUR POTENTIAL.</h2>
            <p className="text-2xl leading-relaxed text-gray-300">
              Our comprehensive financing solutions can help you take your business to the next level. We offer financing solutions for new and used commercial trucks and buses, as well as used vehicles of all makes and models offered through our dealers.
            </p>
          </div>

          <div>
            <h3 className="mb-10 text-[2.5rem] font-semibold">Expert Financial Solutions</h3>
            <div className="space-y-8 text-xl leading-relaxed text-gray-300">
              <p>
                As an expert in the commercial vehicle industry, we have a deep understanding of your wants and needs and are ready to enable your success.
              </p>
              <p>
                We offer flexible solutions to fit your truck, bus, vehicle or equipment financing needs, helping you secure the best financing products for your specific situation. Whether you&apos;re looking for a fleet vehicle loan or you need to lease fleet vehicles, our financial team can provide you with the best option suited to your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="border-y border-[#2A2A2A] bg-[#161616] py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-12 text-[2.5rem] font-bold">Already a customer? Login here.</h3>
            <div className="flex justify-center gap-8">
              <a href="https://nfc.navistar.com/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="min-w-[260px] bg-black text-lg font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  CUSTOMER LOGIN
                </Button>
              </a>
              <a href="https://www.nfcdealerportal.com/Origination" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="min-w-[260px] bg-white text-lg font-semibold text-black hover:bg-gray-100 transition-colors"
                >
                  DEALER LOGIN
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Options */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#2A2A2A] bg-[#161616] p-16">
          <h3 className="mb-8 text-[2.5rem] font-bold">Looking for Additional Financing Options?</h3>
          <p className="mb-12 text-xl leading-relaxed text-gray-300">
            Contact our financing team today to learn more about our flexible financing solutions and how we can help your business grow.
          </p>
          <a href="/contact">
            <Button 
              size="lg"
              className="min-w-[260px] bg-black text-lg font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              CONTACT US
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
