import { db } from "@/lib/firebase/config";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

// Base URL of the website
const SITE_URL = "https://borderinternational.com";

// Static routes that should always be in the sitemap
const staticRoutes = [
  "",
  "/inventory",
  "/services",
  "/parts",
  "/financing",
  "/careers",
  "/contact",
  "/privacy",
];

export async function GET() {
  try {
    // Get vehicle IDs from Firebase
    const trucksRef = ref(db, "vehicles/trucks");
    const trailersRef = ref(db, "vehicles/trailers");

    const [trucksSnapshot, trailersSnapshot] = await Promise.all([
      get(trucksRef),
      get(trailersRef),
    ]);

    const truckIds = Object.keys(trucksSnapshot.val() || {});
    const trailerIds = Object.keys(trailersSnapshot.val() || {});

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
  ${truckIds
    .map(
      (id) => `
  <url>
    <loc>${SITE_URL}/inventory/${id}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  ${trailerIds
    .map(
      (id) => `
  <url>
    <loc>${SITE_URL}/inventory/${id}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    // Return the XML with proper content type
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
