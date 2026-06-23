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
import https from "https";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSiloBySlug, getSubcategory, SOLUTIONS_SILO } from "../src/content/categories";
import { saveArticleImage } from "./generate-svg-image";
import { fetchPexelsImage } from "./fetch-pexels-image";

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

function startIsoDate(): string {
  // Always anchor to today — never inherit far-future dates from existing articles
  return new Date().toISOString().slice(0, 10);
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

  const isTopicList = /top\s*\d|review.*model|đánh giá.*model/i.test(item.topic);

  return `Bạn là Nguyễn Đỗ Tùng — chuyên gia hơn 10 năm kinh nghiệm về máy bán hàng tự động và smart locker, đồng sáng lập TSE Vending từ 2014. Viết bài từ góc nhìn của người trong ngành, dựa trên kinh nghiệm thực tế triển khai hàng trăm dự án.

Yêu cầu E-E-A-T (Google):
- Chia sẻ insight thực tế từ kinh nghiệm triển khai, không chỉ lý thuyết chung
- Nếu đề cập số liệu, phải là ước tính thực tế từ kinh nghiệm thị trường VN (không bịa)
- Thể hiện "Experience" — người từng làm việc này thực sự, biết điều gì thực sự quan trọng

Viết một bài viết chuẩn SEO bằng tiếng Việt hoàn toàn TỰ NHIÊN cho trang tsevending.com.

YÊU CẦU BẮT BUỘC:
- Độ dài: 700–800 từ
- Cấu trúc: 1 đoạn mở (bắt đầu bằng câu in đậm), 3–4 section H2, mỗi section 1–2 đoạn hoặc bullet list
- Giọng văn: chuyên nghiệp, thực tế, như chuyên gia tư vấn trực tiếp
- Từ khóa chính xuất hiện tự nhiên trong H2 đầu và đoạn mở
- KHÔNG dùng cụm sáo như "trong thế giới ngày nay", "không thể phủ nhận", "bối cảnh hiện đại"
- KHÔNG được có lỗi thực tế — chỉ viết điều chắc chắn đúng và có thể kiểm chứng
- KHÔNG bịa tên thương hiệu, tên model sản phẩm cụ thể không có thật${isTopicList ? "\n- Chủ đề này là dạng TOP/REVIEW: KHÔNG đặt tên model giả. Thay vào đó hãy mô tả 5 LOẠI/TIÊU CHÍ thực tế (ví dụ: loại phù hợp khu công nghiệp, loại tiết kiệm điện, loại tích hợp IoT...)" : ""}
- TUYỆT ĐỐI KHÔNG thêm bất kỳ dòng nào ngoài output format (không "Word Count", không ghi chú, không "---" cuối bài)

CẤU TRÚC TỐI ƯU CHO GOOGLE AI OVERVIEW:
- Dòng đầu tiên của bài PHẢI là: **[Câu trả lời thẳng 1–2 câu, dưới 45 từ, định nghĩa rõ chủ đề]** — bắt buộc có dấu ** hai đầu để in đậm
- Mỗi H2 bắt đầu bằng câu trả lời thẳng vào vấn đề, không dẫn nhập dài
- Ưu tiên dùng: bullet list, bảng so sánh markdown, danh sách đánh số
- Số liệu chỉ khi 100% chính xác (ví dụ: "từ 4 đến 100+ ô" — đúng; "tăng 300% hiệu quả" — sai)

INTERNAL LINKS — chỉ dùng đúng các slug sau, không dùng URL tiếng Việt:
${internalLinks.join("\n")}
Phải nhúng ít nhất 2–3 link trên trong bài.

CHUYÊN MỤC: ${siloTitle}${subTitle ? ` > ${subTitle}` : ""}

OUTPUT FORMAT — trả về đúng block markdown sau, không có gì thêm:
---
title: "[Tiêu đề 50–65 ký tự, có từ khóa chính]"
description: "[Meta description 140–155 ký tự — chỉ text thuần, không markdown, không link, có từ khóa và call-to-action]"
date: "PLACEHOLDER_DATE"
silo: "${item.silo}"${item.sub ? `\nsub: "${item.sub}"` : ""}
keywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]
image: "PLACEHOLDER_IMAGE"
imageAlt: "[Mô tả ảnh 80–100 ký tự, có từ khóa chính]"
faqs:
  - q: "[Câu hỏi thực tế người dùng hay hỏi về chủ đề này]"
    a: "[Trả lời ngắn gọn, chính xác, dưới 55 từ, không có link]"
  - q: "[Câu hỏi 2 — khác hoàn toàn câu 1]"
    a: "[Trả lời]"
  - q: "[Câu hỏi 3]"
    a: "[Trả lời]"
---

**[Câu trả lời thẳng 1–2 câu dưới 45 từ — bắt buộc có ** hai đầu]**

[Phần còn lại đoạn mở, 2–3 câu, không có H1]

## [H2 đầu tiên có từ khóa chính]

[Nội dung — bắt đầu thẳng vào vấn đề]

## [H2 thứ hai]

[Nội dung]

## [H2 thứ ba]

[Nội dung — kết thúc bằng CTA tự nhiên dẫn đến /lien-he]`;
}

async function generateArticle(
  genAI: GoogleGenerativeAI,
  item: CalendarItem,
  date: string,
  usedPhotoIds: Set<number> = new Set()
): Promise<{ slug: string; content: string }> {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash-latest",
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });

  const prompt = buildSystemPrompt(item) + `\n\nChủ đề: ${item.topic}\nTừ khóa: ${item.keywords.join(", ")}`;

  console.log(`  📝 Generating: "${item.topic}"...`);

  // Retry up to 3 times on 503 (Gemini overload)
  let raw = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      raw = result.response.text().trim();
      break;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (attempt < 3 && msg.includes("503")) {
        const wait = attempt * 15000;
        console.log(`  ⏳ 503 on attempt ${attempt} — retrying in ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
      } else {
        throw err;
      }
    }
  }

  // Strip markdown code fences if Gemini wraps in ```
  const stripped = raw
    .replace(/^```(?:markdown)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  // Post-processing: remove Gemini artifacts
  const cleaned = stripped
    // Strip "Word Count" lines Gemini sometimes appends
    .replace(/\n---\n?\*?\*?Word Count[^\n]*\n?$/im, "")
    .replace(/\n\*?\*?Word Count[^\n]*$/im, "")
    // Fix Vietnamese URL slugs → correct ASCII slugs
    .replace(/\/giải-pháp-kinh-doanh/g, "/giai-phap-kinh-doanh")
    .replace(/\/máy-bán-hàng-tự-động/g, "/may-ban-hang-tu-dong")
    .replace(/\/tủ-locker-thông-minh/g, "/tu-locker-thong-minh")
    .replace(/\/tin-tức/g, "/tin-tuc")
    .replace(/\/liên-hệ/g, "/lien-he")
    .replace(/\/giới-thiệu/g, "/gioi-thieu");

  // Validate minimum content size — reject if truncated
  if (cleaned.length < 3500) {
    throw new Error(`Output too short (${cleaned.length} chars) — likely truncated by token limit`);
  }

  // Replace placeholder date
  const withDate = cleaned.replace("PLACEHOLDER_DATE", date);

  // Extract title for slug + image generation
  const titleMatch = withDate.match(/^title:\s*"(.+)"/m);
  const title = titleMatch ? titleMatch[1] : item.topic;

  // Extract imageAlt for SVG
  const imageAltMatch = withDate.match(/^imageAlt:\s*"(.+)"/m);
  const imageAlt = imageAltMatch ? imageAltMatch[1] : title;

  // Generate slug
  const baseSlug = slugify(title).slice(0, 80);
  const slug = uniqueSlug(baseSlug || slugify(item.topic).slice(0, 80));

  // Try Pexels first, fall back to SVG
  let imagePath: string;
  let finalContent = withDate;

  console.log(`  🖼  Fetching image for "${slug}"...`);
  const pexels = await fetchPexelsImage(slug, item.silo, item.sub ?? null, usedPhotoIds, item.topic);

  if (pexels) {
    imagePath = pexels.imagePath;
    usedPhotoIds.add(pexels.photoId);
    // Inject credit into frontmatter after imageAlt line
    finalContent = finalContent
      .replace("PLACEHOLDER_IMAGE", imagePath)
      .replace(
        /^(imageAlt:.*)/m,
        `$1\nimageCredit: "Photo by ${pexels.credit} on Pexels"`
      );
  } else {
    imagePath = saveArticleImage(slug, imageAlt, item.silo);
    finalContent = finalContent.replace("PLACEHOLDER_IMAGE", imagePath);
  }

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

  // Daily target: 2 vending + 3 locker (configurable via env)
  const vendingTarget = parseInt(process.env.VENDING_PER_RUN || "2");
  const lockerTarget = parseInt(process.env.LOCKER_PER_RUN || "3");

  const vendingPending = pending.filter((i) => i.silo === "may-ban-hang-tu-dong");
  const lockerPending = pending.filter((i) => i.silo === "tu-locker-thong-minh");
  const otherPending = pending.filter(
    (i) => i.silo !== "may-ban-hang-tu-dong" && i.silo !== "tu-locker-thong-minh"
  );

  const vendingPick = vendingPending.slice(0, vendingTarget);
  const lockerPick = lockerPending.slice(0, lockerTarget);
  const totalSoFar = vendingPick.length + lockerPick.length;
  const otherPick = otherPending.slice(0, Math.max(0, 5 - totalSoFar));

  // locker first (higher priority keyword), then vending, then other
  const toGenerate = [...lockerPick, ...vendingPick, ...otherPick];
  const count = toGenerate.length;

  console.log(`🚀 Generating ${count} article(s): ${lockerPick.length} locker + ${vendingPick.length} vending\n`);

  let date = startIsoDate();
  // Shared set to prevent image reuse across articles in this run
  const usedPhotoIds = new Set<number>();

  for (const item of toGenerate) {
    try {
      const { slug, content } = await generateArticle(genAI, item, date, usedPhotoIds);

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
  console.log(`✅ Done. ${toGenerate.length} queued → ${usedPhotoIds.size} unique Pexels photos used.`);

  // Ping Google to re-crawl sitemap immediately
  if (usedPhotoIds.size > 0) {
    const sitemapUrl = "https://tsevending.com/sitemap.xml";
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    https.get(pingUrl, (res) => {
      console.log(`🔔 Pinged Google sitemap: HTTP ${res.statusCode}`);
    }).on("error", () => {
      // Non-fatal — Google will re-crawl on its own schedule
    });
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
