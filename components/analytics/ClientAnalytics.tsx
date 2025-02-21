"use client";

import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import { usePageTracking } from "@/lib/hooks/usePageTracking";

export function ClientAnalytics() {
  useEffect(() => {
    // Initialize GA4
    initGA();
  }, []);

  // Track page views
  usePageTracking();

  return null;
}
