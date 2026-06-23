/**
 * Fetches RSS feeds from 15+ international sources about vending machines and smart lockers,
 * then generates full 300-400 word Vietnamese articles with H2/H3 and internal links using Gemini.
 * Output: src/data/world-news.json
 *
 * Usage: npm run fetch:news
 * Required env: GEMINI_API_KEY (in scripts/.env.local)
 */
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "src", "data", "world-news.json");

export interface WorldNewsItem {
  title: string;       // Original English title
  titleVi: string;     // Translated Vietnamese title
  summaryVi: string;   // Short summary 80-100 words for cards
  contentHtml: string; // Full 300-400 word article HTML with H2/H3 and internal links
  url: string;
  source: string;
  pubDate: string;
  category: string;
  slug: string;        // URL slug for /tin-tuc/the-gioi/[slug]
}

interface RawItem {
  title: string;
  url: string;
  pubDate: string;
  description: string;
  source: string;
  category: string;
}

const RSS_SOURCES = [
  // Vending industry
  { name: "Vending Times", url: "https://www.vendingtimes.com/feed/", category: "industry" },
  { name: "Automatic Merchandiser", url: "https://www.automerchandiser.com/rss/topic/1", category: "industry" },
  { name: "Vending Market Watch", url: "https://www.vendingmarketwatch.com/rss/news", category: "industry" },
  // Smart locker / last-mile delivery
  { name: "The Spoon", url: "https://thespoon.tech/feed/", category: "foodtech" },
  { name: "Supply Chain Dive", url: "https://www.supplychaindive.com/feeds/news/", category: "logistics" },
  { name: "Parcel Industry", url: "https://www.parcelandpostaltechnologyinternational.com/feed", category: "logistics" },
  // Retail technology
  { name: "Retail Dive", url: "https://www.retaildive.com/feeds/news/", category: "retail" },
  { name: "Retail Tech Innovation Hub", url: "https://retailtechinnovationhub.com/feed/", category: "retail" },
  { name: "Retail Customer Experience", url: "https://www.retailcustomerexperience.com/rss/", category: "retail" },
  // IoT & Smart tech
  { name: "IoT Analytics", url: "https://iotanalytics.com/feed/", category: "iot" },
  { name: "IoT World Today", url: "https://www.iotworldtoday.com/rss.xml", category: "iot" },
  // Tech news
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", category: "tech" },
  // Asia Pacific
  { name: "KrASIA", url: "https://kr.asia/feed/", category: "asia" },
  { name: "e27", url: "https://e27.co/feed/", category: "asia" },
  // Fintech (cashless vending/payment)
  { name: "Fintech Futures", url: "https://www.fintechfutures.com/feed/", category: "fintech" },
];

const RELEVANT_KEYWORDS = [
  "vending", "locker", "smart locker", "parcel locker", "package locker",
  "automated retail", "self-service", "cashierless", "unattended",
  "kiosk", "dispensing", "micro market", "automated store",
  "last-mile delivery", "e-commerce delivery", "package delivery",
  "IoT retail", "contactless", "autonomous store",
];

const INTERNAL_LINKS_GUIDE = `Liên kết nội bộ tsevending.com (dùng tự nhiên 2-3 lần trong bài):
- <a href="/tu-locker-thong-minh">tủ locker thông minh</a>
- <a href="/may-ban-hang-tu-dong">máy bán hàng tự động</a>
- <a href="/tu-locker-thong-minh/tu-locker-van-phong">locker văn phòng</a>
- <a href="/tu-locker-thong-minh/giai-phap-nha-o">locker chung cư</a>
- <a href="/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat">máy bán nước giải khát</a>
- <a href="/may-ban-hang-tu-dong/mo-hinh-kinh-doanh">mô hình kinh doanh máy bán hàng</a>
- <a href="/lien-he">liên hệ TSE Vending</a>`;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/gi, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70)
    .replace(/^-|-$/g, "");
}

function generateSlug(titleVi: string, source: string, pubDate: string): string {
  const srcSlug = source.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 15);
  const dateStr = pubDate
    ? new Date(pubDate).toISOString().slice(0, 10).replace(/-/g, "")
    : new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const titleSlug = slugify(titleVi).slice(0, 55);
  return `${srcSlug}-${dateStr}-${titleSlug}`.replace(/-+/g, "-");
}

function extractXmlField(xml: string, tag: string): string {
  const cdataMatch = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i").exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();
  const plainMatch = new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, "i").exec(xml);
  if (plainMatch) return plainMatch[1].trim();
  return "";
}

function parseRssItems(xml: string, sourceName: string, category: string): RawItem[] {
  const items: RawItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractXmlField(itemXml, "title");
    const link = extractXmlField(itemXml, "link") || extractXmlField(itemXml, "guid");
    const pubDate = extractXmlField(itemXml, "pubDate");
    const description = extractXmlField(itemXml, "description")
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/g, " ")
      .slice(0, 400);

    if (!title || !link) continue;

    const combined = (title + " " + description).toLowerCase();
    const isRelevant = RELEVANT_KEYWORDS.some((kw) => combined.includes(kw));
    if (!isRelevant) continue;

    items.push({ title, url: link, pubDate, description, source: sourceName, category });
  }
  return items;
}

async function fetchRss(url: string, sourceName: string, category: string): Promise<RawItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "TSEVending-NewsBot/2.0 (+https://tsevending.com)" },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssItems(xml, sourceName, category);
  } catch {
    console.warn(`  ⚠ Skipped ${sourceName}`);
    return [];
  }
}

// Model fallback chain — tried in order when quota/rate-limit errors occur
const MODEL_FALLBACKS = [
  "gemini-2.5-flash-preview-05-20",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

async function generateBatchWithFallback(
  items: RawItem[],
  genAI: InstanceType<typeof GoogleGenerativeAI>,
  primaryModel: string
): Promise<WorldNewsItem[]> {
  const chain = [primaryModel, ...MODEL_FALLBACKS.filter((m) => m !== primaryModel)];

  for (const modelName of chain) {
    const model = genAI.getGenerativeModel({ model: modelName });
    const MAX_RETRIES = 2;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await model.generateContent(buildPrompt(items));
        let text = result.response.text().trim();
        text = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
        const parsed: Array<{ index: number; titleVi: string; summaryVi: string; html: string }> =
          JSON.parse(text);
        if (modelName !== primaryModel) console.log(`    ✓ Using fallback model: ${modelName}`);
        return items.map((item, i) => {
          const gen = parsed.find((p) => p.index === i + 1) || parsed[i];
          const titleVi = gen?.titleVi || item.title;
          return {
            title: item.title,
            titleVi,
            summaryVi: gen?.summaryVi || item.description,
            contentHtml: gen?.html || `<p>${item.description}</p>`,
            url: item.url,
            source: item.source,
            pubDate: item.pubDate,
            category: item.category,
            slug: generateSlug(titleVi, item.source, item.pubDate),
          };
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const is429 = msg.includes("429");
        const retryMatch = msg.match(/"retryDelay"\s*:\s*"(\d+)s"/);
        const retrySecs = retryMatch ? parseInt(retryMatch[1], 10) + 3 : 35;
        if (is429 && attempt < MAX_RETRIES) {
          console.log(`    ↻ ${modelName}: rate limit, wait ${retrySecs}s...`);
          await new Promise((r) => setTimeout(r, retrySecs * 1000));
        } else {
          const reason = is429 ? "quota" : msg.slice(0, 80);
          console.log(`    ✗ ${modelName}: ${reason} — trying next model`);
          break; // Move to next model in chain
        }
      }
    }
  }

  // All models failed
  console.warn("  ⚠ All models failed, using English fallback");
  return items.map((item) => ({
    title: item.title,
    titleVi: item.title,
    summaryVi: item.description,
    contentHtml: `<p>${item.description}</p>`,
    url: item.url,
    source: item.source,
    pubDate: item.pubDate,
    category: item.category,
    slug: generateSlug(item.title, item.source, item.pubDate),
  }));
}

function buildPrompt(items: RawItem[]): string {
  const numbered = items
    .map((it, i) => `[${i + 1}] Source: ${it.source}\nTitle: ${it.title}\nDescription: ${it.description}`)
    .join("\n\n---\n\n");
  return `Bạn là chuyên gia nội dung về máy bán hàng tự động và tủ locker thông minh tại Việt Nam.

Viết ${items.length} bài tiếng Việt từ tin tức quốc tế bên dưới. Mỗi bài 300-400 từ.

${INTERNAL_LINKS_GUIDE}

Quy tắc bắt buộc cho HTML của mỗi bài:
- Mở đầu: 1 thẻ <p> giới thiệu bối cảnh tin tức
- Thân bài: 2-3 thẻ <h2> (tiêu đề phần) + <p> nội dung bên dưới mỗi h2
- Phân tích VN: 1 thẻ <h2> phân tích góc nhìn thị trường Việt Nam
- Kết: 1 thẻ <p> kết luận có liên kết /lien-he
- Tích hợp tự nhiên ít nhất 2 liên kết nội bộ từ danh sách trên
- Không dùng thẻ <html>, <body>, <head>

Tin tức cần xử lý:
${numbered}

Trả về JSON array (không có markdown code fence, chỉ JSON thuần):
[{"index":1,"titleVi":"...","summaryVi":"...","html":"..."},...]

titleVi: 60-80 ký tự
summaryVi: 80-100 từ tóm tắt ngắn cho thẻ bài
html: nội dung HTML đầy đủ bài viết`;
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY environment variable is required");
    process.exit(1);
  }

  const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-preview-05-20";
  const genAI = new GoogleGenerativeAI(apiKey);

  console.log(`🌐 Fetching RSS from ${RSS_SOURCES.length} international sources...`);

  const allRaw: RawItem[] = [];
  for (const source of RSS_SOURCES) {
    process.stdout.write(`  ↳ ${source.name} ... `);
    const items = await fetchRss(source.url, source.name, source.category);
    console.log(`${items.length} relevant`);
    allRaw.push(...items);
  }

  // Deduplicate by URL, sort by pubDate desc, keep top 20
  const seen = new Set<string>();
  const unique = allRaw
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .sort((a, b) => {
      const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return db - da;
    })
    .slice(0, 20);

  console.log(`\n✍ Generating ${unique.length} Vietnamese articles (primary: ${primaryModel}, auto-fallback enabled)...`);

  const BATCH_SIZE = 4;
  const translated: WorldNewsItem[] = [];
  for (let i = 0; i < unique.length; i += BATCH_SIZE) {
    const batch = unique.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(unique.length / BATCH_SIZE);
    console.log(`  Batch ${batchNum}/${totalBatches}: ${batch.length} articles`);
    const result = await generateBatchWithFallback(batch, genAI, primaryModel);
    translated.push(...result);
    if (i + BATCH_SIZE < unique.length) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Ensure unique slugs
  const slugCount = new Map<string, number>();
  const final = translated.map((item) => {
    const base = item.slug;
    const count = slugCount.get(base) || 0;
    slugCount.set(base, count + 1);
    return count === 0 ? item : { ...item, slug: `${base}-${count}` };
  });

  const output = {
    updatedAt: new Date().toISOString(),
    totalItems: final.length,
    items: final,
  };

  const dataDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");

  console.log(`\n✅ Saved ${final.length} articles → src/data/world-news.json`);
  console.log(`   Categories: ${[...new Set(final.map((i) => i.category))].join(", ")}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
