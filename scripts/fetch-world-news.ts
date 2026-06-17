/**
 * Fetches RSS feeds from international vending machine and smart locker news sources,
 * translates titles to Vietnamese and generates short summaries using Claude API,
 * then saves the result to src/data/world-news.json.
 *
 * Usage: npm run fetch:news
 * Required env: ANTHROPIC_API_KEY
 */
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "src", "data", "world-news.json");

const RSS_SOURCES = [
  {
    name: "Vending Times",
    url: "https://www.vendingtimes.com/feed/",
    category: "industry",
  },
  {
    name: "Automatic Merchandiser",
    url: "https://www.automerchandiser.com/rss/topic/1",
    category: "industry",
  },
  {
    name: "The Spoon",
    url: "https://thespoon.tech/feed/",
    category: "foodtech",
  },
  {
    name: "Retail Customer Experience",
    url: "https://www.retailcustomerexperience.com/rss/",
    category: "retail",
  },
  {
    name: "Retail Technology Innovation Hub",
    url: "https://retailtechinnovationhub.com/feed/",
    category: "retail",
  },
];

const KEYWORDS = [
  "vending", "vend", "locker", "smart locker", "parcel locker",
  "automated", "self-service", "cashierless", "unattended retail",
  "kiosk", "dispensing", "automated retail",
];

export interface WorldNewsItem {
  title: string;
  titleVi: string;
  summaryVi: string;
  url: string;
  source: string;
  pubDate: string;
  category: string;
}

function extractXmlField(xml: string, tag: string): string {
  const cdataMatch = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i").exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();
  const plainMatch = new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, "i").exec(xml);
  if (plainMatch) return plainMatch[1].trim();
  return "";
}

function parseRssItems(xml: string, sourceName: string, category: string): Array<{
  title: string; url: string; pubDate: string; description: string; source: string; category: string;
}> {
  const items: ReturnType<typeof parseRssItems> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractXmlField(itemXml, "title");
    const link = extractXmlField(itemXml, "link") || extractXmlField(itemXml, "guid");
    const pubDate = extractXmlField(itemXml, "pubDate");
    const description = extractXmlField(itemXml, "description").replace(/<[^>]+>/g, "").slice(0, 300);

    if (!title || !link) continue;

    const combined = (title + " " + description).toLowerCase();
    const isRelevant = KEYWORDS.some((kw) => combined.includes(kw));
    if (!isRelevant) continue;

    items.push({ title, url: link, pubDate, description, source: sourceName, category });
  }
  return items;
}

async function fetchRss(url: string, sourceName: string, category: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "TSEVending-NewsBot/1.0 (+https://tsevending.com)" },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssItems(xml, sourceName, category);
  } catch {
    console.warn(`⚠ Failed to fetch ${sourceName}: ${url}`);
    return [];
  }
}

async function translateAndSummarize(
  items: Array<{ title: string; description: string; url: string; pubDate: string; source: string; category: string }>,
  client: Anthropic
): Promise<WorldNewsItem[]> {
  if (items.length === 0) return [];

  const numbered = items
    .map((it, i) => `[${i + 1}] Title: ${it.title}\nDescription: ${it.description}`)
    .join("\n\n");

  const prompt = `Bạn là chuyên gia dịch thuật và tóm tắt tin tức về máy bán hàng tự động và tủ locker thông minh.

Dịch và tóm tắt ${items.length} tin tức quốc tế sau đây sang tiếng Việt.

Yêu cầu:
- titleVi: dịch tiêu đề sang tiếng Việt tự nhiên, ngắn gọn, khoảng 60-80 ký tự
- summaryVi: viết tóm tắt tiếng Việt ngắn khoảng 80-100 từ, dựa trên nội dung bài, không được copy nguyên văn tiếng Anh

Trả về JSON array theo format:
[{"index": 1, "titleVi": "...", "summaryVi": "..."}, ...]

Tin tức:
${numbered}

Chỉ trả về JSON array, không giải thích thêm.`;

  try {
    const message = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") return [];

    const jsonText = content.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const translations: Array<{ index: number; titleVi: string; summaryVi: string }> = JSON.parse(jsonText);

    return items.map((item, i) => {
      const t = translations.find((tr) => tr.index === i + 1);
      return {
        title: item.title,
        titleVi: t?.titleVi || item.title,
        summaryVi: t?.summaryVi || item.description,
        url: item.url,
        source: item.source,
        pubDate: item.pubDate,
        category: item.category,
      };
    });
  } catch (err) {
    console.error("Translation failed:", err);
    return items.map((item) => ({
      title: item.title,
      titleVi: item.title,
      summaryVi: item.description,
      url: item.url,
      source: item.source,
      pubDate: item.pubDate,
      category: item.category,
    }));
  }
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  console.log("🌐 Fetching RSS feeds from international sources...");

  const allRaw: ReturnType<typeof parseRssItems> = [];
  for (const source of RSS_SOURCES) {
    console.log(`  ↳ ${source.name}`);
    const items = await fetchRss(source.url, source.name, source.category);
    console.log(`    Found ${items.length} relevant items`);
    allRaw.push(...items);
  }

  // Deduplicate by URL, take newest 20
  const seen = new Set<string>();
  const unique = allRaw
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .slice(0, 20);

  console.log(`\n📝 Translating ${unique.length} articles with Claude...`);

  // Process in batches of 10 to stay within token limits
  const BATCH = 10;
  const translated: WorldNewsItem[] = [];
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH);
    console.log(`  Batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(unique.length / BATCH)}: ${batch.length} items`);
    const result = await translateAndSummarize(batch, client);
    translated.push(...result);
  }

  const output = {
    updatedAt: new Date().toISOString(),
    totalItems: translated.length,
    items: translated,
  };

  // Ensure data directory exists
  const dataDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
  console.log(`\n✅ Saved ${translated.length} translated news items to src/data/world-news.json`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
