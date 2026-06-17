/**
 * Daily SEO article generator using Google Gemini API.
 * Picks the next pending topic from scripts/content-calendar.json,
 * generates a 700-word Vietnamese SEO article, creates an SVG image,
 * and writes both to disk.
 *
 * Usage: npm run generate:article:gemini
 * Required env: GEMINI_API_KEY
 */
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSiloBySlug, getSubcategory, SOLUTIONS_SILO } from "../src/content/categories";
import { saveArticleImage } from "./generate-svg-image";

const ROOT = path.join(__dirname, "..");
const CALENDAR_PATH = path.join(ROOT, "scripts", "content-calendar.json");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

interface CalendarItem {
  id: number;
  silo: string;
  sub: string | null;
  topic: string;
  keywords: string[];
  status: "pending" | "published";
  publishedSlug?: string;
  publishedDate?: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function uniqueSlug(base: string): string {
  let slug = base;
  let counter = 2;
  while (fs.existsSync(path.join(BLOG_DIR, `${slug}.md`))) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}

function nextIsoDate(): string {
  const existing = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const m = raw.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m);
      return m ? m[1] : "2025-01-01";
    })
    .sort()
    .reverse();
  const latest = existing[0] ?? new Date().toISOString().slice(0, 10);
  const next = new Date(latest);
  next.setDate(next.getDate() + 1);
  return next.toISOString().slice(0, 10);
}

function buildSystemPrompt(item: CalendarItem): string {
  const silo = getSiloBySlug(item.silo);
  const subResult = item.sub ? getSubcategory(item.silo, item.sub) : undefined;
  const siloTitle = silo?.title ?? item.silo;
  const subTitle = subResult?.sub?.title ?? "";

  const internalLinks: string[] = [
    `[máy bán hàng tự động](/may-ban-hang-tu-dong)`,
    `[tủ locker thông minh](/tu-locker-thong-minh)`,
    `[giải pháp kinh doanh](/giai-phap-kinh-doanh)`,
    `[liên hệ TSE Vending](/lien-he)`,
  ];

  return `Bạn là chuyên gia SEO content writer về máy bán hàng tự động và tủ locker thông minh.

Viết một bài viết chuẩn SEO bằng tiếng Việt hoàn toàn TỰ NHIÊN cho trang tsevending.com.

YÊU CẦU BẮT BUỘC:
- Độ dài: 680–750 từ (đếm chính xác)
- Cấu trúc: 1 đoạn mở, 3–4 section H2, mỗi section có 1–2 đoạn văn hoặc H3/bullet points
- Giọng văn: chuyên nghiệp nhưng gần gũi, như tư vấn từ chuyên gia thực tế
- Từ khóa chính phải xuất hiện tự nhiên trong tiêu đề H1, H2 đầu tiên và đoạn mở
- KHÔNG được dùng cụm sáo rỗng như "trong thế giới ngày nay", "không thể phủ nhận", "đặt vấn đề"
- KHÔNG được có lỗi thực tế — chỉ viết điều chắc chắn đúng
- KHÔNG được copy, paraphrase hay dịch từ bất kỳ nguồn nào — nội dung hoàn toàn gốc

INTERNAL LINKS (phải nhúng ít nhất 2–3 link trong bài, dùng đúng markdown):
${internalLinks.join("\n")}

CHUYÊN MỤC: ${siloTitle}${subTitle ? ` > ${subTitle}` : ""}

OUTPUT FORMAT — trả về đúng block markdown, không có gì khác:
---
title: "[Tiêu đề bài viết tiếng Việt, 50–65 ký tự, có từ khóa chính]"
description: "[Mô tả meta, 140–155 ký tự, có từ khóa chính và call-to-action ngắn]"
date: "PLACEHOLDER_DATE"
silo: "${item.silo}"${item.sub ? `\nsub: "${item.sub}"` : ""}
keywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]
image: "PLACEHOLDER_IMAGE"
imageAlt: "[Mô tả ảnh chuẩn SEO, 80–100 ký tự, có từ khóa chính]"
---

[Nội dung bài viết bắt đầu bằng đoạn mở — KHÔNG có H1, vì tiêu đề đã là H1 trên trang]

## [H2 đầu tiên]
...

## [H2 thứ hai]
...`;
}

async function generateArticle(
  genAI: GoogleGenerativeAI,
  item: CalendarItem,
  date: string
): Promise<{ slug: string; content: string }> {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash-latest",
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  });

  const prompt = buildSystemPrompt(item) + `\n\nChủ đề: ${item.topic}\nTừ khóa: ${item.keywords.join(", ")}`;

  console.log(`  📝 Generating: "${item.topic}"...`);
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  // Strip markdown code fences if Gemini wraps in ```
  const stripped = raw
    .replace(/^```(?:markdown)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  // Replace placeholder date
  const withDate = stripped.replace("PLACEHOLDER_DATE", date);

  // Extract title for slug + image generation
  const titleMatch = withDate.match(/^title:\s*"(.+)"/m);
  const title = titleMatch ? titleMatch[1] : item.topic;

  // Extract imageAlt for SVG
  const imageAltMatch = withDate.match(/^imageAlt:\s*"(.+)"/m);
  const imageAlt = imageAltMatch ? imageAltMatch[1] : title;

  // Generate slug
  const baseSlug = slugify(title).slice(0, 80);
  const slug = uniqueSlug(baseSlug || slugify(item.topic).slice(0, 80));

  // Generate SVG image
  console.log(`  🖼  Creating SVG image for "${slug}"...`);
  const imagePath = saveArticleImage(slug, imageAlt, item.silo);

  // Replace placeholder image path
  const finalContent = withDate.replace("PLACEHOLDER_IMAGE", imagePath);

  return { slug, content: finalContent };
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY environment variable is required");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Load calendar
  if (!fs.existsSync(CALENDAR_PATH)) {
    console.error("❌ content-calendar.json not found");
    process.exit(1);
  }
  const calendar: CalendarItem[] = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8"));
  const pending = calendar.filter((i) => i.status === "pending");

  if (pending.length === 0) {
    console.log("✅ No pending topics in content calendar.");
    return;
  }

  // How many to generate this run (env var or default 4)
  const count = parseInt(process.env.ARTICLES_PER_RUN || "4");

  // Pick 1 vending machine + rest smart locker (ratio enforced per run)
  const vendingPending = pending.filter((i) => i.silo === "may-ban-hang-tu-dong");
  const lockerPending = pending.filter((i) => i.silo === "tu-locker-thong-minh");
  const otherPending = pending.filter(
    (i) => i.silo !== "may-ban-hang-tu-dong" && i.silo !== "tu-locker-thong-minh"
  );

  const vendingPick = vendingPending.slice(0, 1);
  const lockerCount = Math.min(count - vendingPick.length, lockerPending.length);
  const lockerPick = lockerPending.slice(0, lockerCount);
  const remaining = count - vendingPick.length - lockerPick.length;
  const otherPick = otherPending.slice(0, remaining);

  const toGenerate = [...lockerPick, ...vendingPick, ...otherPick].slice(0, count);

  console.log(`🚀 Generating ${count} article(s) with Gemini...\n`);

  let date = nextIsoDate();

  for (const item of toGenerate) {
    try {
      const { slug, content } = await generateArticle(genAI, item, date);

      // Write article
      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`  ✅ Saved: src/content/blog/${slug}.md`);

      // Mark as published in calendar
      const idx = calendar.findIndex((c) => c.id === item.id);
      if (idx !== -1) {
        calendar[idx].status = "published";
        calendar[idx].publishedSlug = slug;
        calendar[idx].publishedDate = date;
      }

      // Advance date
      const d = new Date(date);
      d.setDate(d.getDate() + 1);
      date = d.toISOString().slice(0, 10);

      // Small delay between requests to avoid rate limiting
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ❌ Failed to generate "${item.topic}":`, err);
    }
  }

  // Save updated calendar
  fs.writeFileSync(CALENDAR_PATH, JSON.stringify(calendar, null, 2), "utf8");
  console.log("\n📅 Content calendar updated.");
  console.log(`✅ Done. Generated ${count} article(s).`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
