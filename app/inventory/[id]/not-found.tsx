import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
        <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/inventory">Return to Inventory</Link>
        </Button>
      </div>
    </div>
  );
}