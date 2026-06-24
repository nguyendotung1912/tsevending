import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/content";

// Prerender at build time (fs reads aren't available in the Cloudflare worker
// at runtime). Same approach as sitemap.ts.
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Newest indexable posts only — mirrors what the sitemap advertises.
  const posts = getAllPostsMeta()
    .filter((p) => p.indexable)
    .slice(0, 50);

  const lastBuild = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/tin-tuc/${p.slug}`);
      const pubDate = new Date(p.date).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Tin tức</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>vi</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
