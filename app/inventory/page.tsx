"use client";

import { useVehicles } from "@/lib/hooks/useVehicles";
import { InventoryClient } from "./components/InventoryClient";
import { useAuth } from "@/lib/firebase/auth-context";

export default function InventoryPage() {
  const { filterSections } = useVehicles();
  const { user } = useAuth();

  return <InventoryClient filterSections={filterSections} isAdmin={!!user} />;
}
