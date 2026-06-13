import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { SILOS, SOLUTIONS_SILO } from "@/content/categories";
import { getAllPostsMeta } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/gioi-thieu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/lien-he`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/tin-tuc`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    {
      url: `${siteConfig.url}/${SOLUTIONS_SILO.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const siloRoutes: MetadataRoute.Sitemap = [];
  for (const silo of SILOS) {
    siloRoutes.push({
      url: `${siteConfig.url}/${silo.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const sub of silo.subcategories) {
      siloRoutes.push({
        url: `${siteConfig.url}/${silo.slug}/${sub.slug}`,
        lastModified: now,
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
