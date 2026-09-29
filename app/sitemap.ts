import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://viscosity.global";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/products/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
