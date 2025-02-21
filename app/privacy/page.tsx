import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Border International",
  description: "Privacy Policy for Border International - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Border International ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information (name, email address, phone number)</li>
            <li>Business information (company name, job title)</li>
            <li>Vehicle preferences and requirements</li>
            <li>Financing and credit application information</li>
            <li>Service and maintenance requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and respond to your inquiries</li>
            <li>Provide quotes and information about vehicles</li>
            <li>Process service and maintenance requests</li>
            <li>Send you updates about our products and services</li>
            <li>Improve our website and customer service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website, conducting our business, or servicing you, as long as they agree to keep this information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our practices, please contact us at:
          </p>
          <div className="mt-4">
            <p>Border International</p>
            <p>12283 Rojas Dr</p>
            <p>El Paso, TX 79936</p>
            <p>Phone: (915) 900-6564</p>
            <p>Email: privacy@borderint.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
