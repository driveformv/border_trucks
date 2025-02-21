"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/analytics";

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Construct full URL with search params
      let url = pathname;
      const search = searchParams?.toString();
      if (search) {
        url += `?${search}`;
      }

      // Track page view
      pageview(url);
    }
  }, [pathname, searchParams]);
}
