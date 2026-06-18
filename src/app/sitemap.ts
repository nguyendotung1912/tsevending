import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { SILOS, SOLUTIONS_SILO } from "@/content/categories";
import { getAllPostsMeta } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use fixed dates for stable pages so Google doesn't waste crawl budget re-crawling unchanged content
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date("2025-06-01"), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/gioi-thieu`, lastModified: new Date("2025-05-01"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/lien-he`, lastModified: new Date("2025-05-01"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/tin-tuc`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    {
      url: `${siteConfig.url}/${SOLUTIONS_SILO.slug}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const siloRoutes: MetadataRoute.Sitemap = [];
  for (const silo of SILOS) {
    siloRoutes.push({
      url: `${siteConfig.url}/${silo.slug}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const sub of silo.subcategories) {
      siloRoutes.push({
        url: `${siteConfig.url}/${silo.slug}/${sub.slug}`,
        lastModified: new Date("2025-06-01"),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  const postRoutes: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${siteConfig.url}/tin-tuc/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...siloRoutes, ...postRoutes];
}
