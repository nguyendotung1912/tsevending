/**
 * Article generator using Groq API (free tier: 1000 req/day, llama-3.3-70b).
 * Drop-in replacement for generate-article-gemini.ts — same calendar, same output.
 *
 * Setup: add GROQ_API_KEY to scripts/.env.local
 *   Sign up free at https://console.groq.com
 *
 * Run: npx tsx scripts/generate-article-groq.ts
 * Options: VENDING_PER_RUN=5 LOCKER_PER_RUN=10
 */
import fs from "fs";
import path from "path";
import https from "https";
import { getSiloBySlug, getSubcategory } from "../src/content/categories";
import { saveArticleImage } from "./generate-svg-image";
import { fetchPexelsImage } from "./fetch-pexels-image";

// ── load scripts/.env.local ───────────────────────────────────────────────────
const DOTENV_PATH = path.join("scripts", ".env.local");
if (fs.existsSync(DOTENV_PATH)) {
  for (const line of fs.readFileSync(DOTENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const ROOT = path.join(__dirname, "..");
const CALENDAR_PATH = path.join(ROOT, "scripts", "content-calendar.json");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

// Model: meta-llama/llama-4-scout-17b-16e-instruct (high TPD, good quality)
// Fallback: llama-3.3-70b-versatile (100K TPD limit), llama-3.1-8b-instant (very high TPD)
const GROQ_MODEL = process.env.GROQ_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

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

// ── helpers ───────────────────────────────────────────────────────────────────

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
  return new Date().toISOString().slice(0, 10);
}

function postGroq(apiKey: string, messages: { role: string; content: string }[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.75,
      max_tokens: 4096,
      top_p: 0.95,
    });

    const req = https.request(
      GROQ_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(data) as {
              choices?: { message?: { content?: string } }[];
              error?: { message?: string };
            };
            if (json.error) {
              reject(new Error(`Groq API error: ${json.error.message}`));
              return;
            }
            const text = json.choices?.[0]?.message?.content ?? "";
            resolve(text.trim());
          } catch {
            reject(new Error(`Bad JSON from Groq: ${data.slice(0, 300)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
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
- KHÔNG bịa tên thương hiệu, tên model sản phẩm cụ thể không có thật${isTopicList ? "\n- Chủ đề này là dạng TOP/REVIEW: KHÔNG đặt tên model giả. Thay vào đó hãy mô tả 5 LOẠI/TIÊU CHÍ thực tế" : ""}
- TUYỆT ĐỐI KHÔNG thêm bất kỳ dòng nào ngoài output format (không "Word Count", không ghi chú, không "---" cuối bài)

CẤU TRÚC TỐI ƯU CHO GOOGLE AI OVERVIEW:
- Dòng đầu tiên của bài PHẢI là: **[Câu trả lời thẳng 1–2 câu, dưới 45 từ, định nghĩa rõ chủ đề]** — bắt buộc có dấu ** hai đầu để in đậm
- Mỗi H2 bắt đầu bằng câu trả lời thẳng vào vấn đề, không dẫn nhập dài
- Ưu tiên dùng: bullet list, bảng so sánh markdown, danh sách đánh số
- Số liệu chỉ khi 100% chính xác

INTERNAL LINKS — chỉ dùng đúng các slug sau, không dùng URL tiếng Việt:
${internalLinks.join("\n")}
Phải nhúng ít nhất 2–3 link trên trong bài.

CHUYÊN MỤC: ${siloTitle}${subTitle ? ` > ${subTitle}` : ""}

OUTPUT FORMAT — trả về đúng block markdown sau, KHÔNG có gì thêm bên ngoài block ---:
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
  apiKey: string,
  item: CalendarItem,
  date: string,
  usedPhotoIds: Set<number> = new Set()
): Promise<{ slug: string; content: string }> {
  const userMsg = `Chủ đề: ${item.topic}\nTừ khóa: ${item.keywords.join(", ")}`;

  console.log(`  📝 Generating: "${item.topic}"...`);

  let raw = "";
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      // Assistant prefill: model continues from "---\n", prepend it back
      const completion = await postGroq(apiKey, [
        { role: "system", content: buildSystemPrompt(item) },
        { role: "user", content: userMsg },
        { role: "assistant", content: "---\n" },
      ]);
      raw = completion ? "---\n" + completion : "";
      if (raw) break;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isRateLimit = msg.includes("Rate limit") || msg.includes("rate limit") || msg.includes("429") || msg.includes("quota");
      const isServerErr = msg.includes("503") || msg.includes("500") || msg.includes("502");
      if (attempt < 5 && (isRateLimit || isServerErr)) {
        // Extract "Please try again in Xs" from Groq error message
        const retryMatch = msg.match(/try again in ([\d.]+)s/i);
        const retryAfter = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) + 3 : attempt * 25;
        console.log(`  ⏳ Rate limit on attempt ${attempt} — waiting ${retryAfter}s...`);
        await new Promise((r) => setTimeout(r, retryAfter * 1000));
      } else {
        throw err;
      }
    }
  }

  // Strip markdown code fences
  const stripped = raw
    .replace(/^```(?:markdown)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  // Post-process artifacts
  let cleaned = stripped
    .replace(/\n---\n?\*?\*?Word Count[^\n]*\n?$/im, "")
    .replace(/\n\*?\*?Word Count[^\n]*$/im, "")
    .replace(/\/giải-pháp-kinh-doanh/g, "/giai-phap-kinh-doanh")
    .replace(/\/máy-bán-hàng-tự-động/g, "/may-ban-hang-tu-dong")
    .replace(/\/tủ-locker-thông-minh/g, "/tu-locker-thong-minh")
    .replace(/\/tin-tức/g, "/tin-tuc")
    .replace(/\/liên-hệ/g, "/lien-he")
    .replace(/\/giới-thiệu/g, "/gioi-thieu");

  if (cleaned.length < 2200) {
    throw new Error(`Output too short (${cleaned.length} chars) — likely truncated`);
  }

  // Verify frontmatter delimiters; if missing, auto-insert before article body
  const fmOpen = cleaned.indexOf("---");
  let fmClose = cleaned.indexOf("\n---", fmOpen + 3);

  if (fmClose === -1) {
    // Article body always starts with a blank line then **bold sentence** — insert --- there
    const bodyMatch = cleaned.match(/\n\n(\*\*[^\n])/);
    if (bodyMatch && bodyMatch.index !== undefined) {
      cleaned = cleaned.slice(0, bodyMatch.index + 1) + "---\n" + cleaned.slice(bodyMatch.index + 1);
      fmClose = cleaned.indexOf("\n---", fmOpen + 3);
    }
  }

  if (fmOpen === -1 || fmClose === -1) {
    throw new Error(`Missing frontmatter delimiters in output`);
  }

  // Prevent model from filling in placeholders — restore them for proper replacement
  const imageLineMatch = cleaned.match(/^image:\s*"([^"]+)"/m);
  if (imageLineMatch && imageLineMatch[1] !== "PLACEHOLDER_IMAGE") {
    cleaned = cleaned.replace(/^(image:\s*)"[^"]*"/m, '$1"PLACEHOLDER_IMAGE"');
  }
  // Also force-restore date placeholder (model may fill with its own date)
  cleaned = cleaned.replace(/^(date:\s*)"[^"]*"/m, '$1"PLACEHOLDER_DATE"');

  const withDate = cleaned.replace("PLACEHOLDER_DATE", date);

  const titleMatch = withDate.match(/^title:\s*"(.+)"/m);
  const title = titleMatch ? titleMatch[1] : item.topic;

  const imageAltMatch = withDate.match(/^imageAlt:\s*"(.+)"/m);
  const imageAlt = imageAltMatch ? imageAltMatch[1] : title;

  const baseSlug = slugify(title).slice(0, 80);
  const slug = uniqueSlug(baseSlug || slugify(item.topic).slice(0, 80));

  console.log(`  🖼  Fetching image for "${slug}"...`);
  let imagePath: string;
  let finalContent = withDate;

  const pexels = await fetchPexelsImage(slug, item.silo, item.sub ?? null, usedPhotoIds, item.topic);
  if (pexels) {
    imagePath = pexels.imagePath;
    usedPhotoIds.add(pexels.photoId);
    finalContent = finalContent
      .replace("PLACEHOLDER_IMAGE", imagePath)
      .replace(/^(imageAlt:.*)/m, `$1\nimageCredit: "Photo by ${pexels.credit} on Pexels"`);
  } else {
    imagePath = saveArticleImage(slug, imageAlt, item.silo);
    finalContent = finalContent.replace("PLACEHOLDER_IMAGE", imagePath);
  }

  return { slug, content: finalContent };
}

async function main() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("❌ GROQ_API_KEY not found.");
    console.error("   1. Đăng ký miễn phí tại https://console.groq.com");
    console.error("   2. Tạo API key");
    console.error("   3. Thêm GROQ_API_KEY=<key> vào scripts/.env.local");
    process.exit(1);
  }

  if (!fs.existsSync(CALENDAR_PATH)) {
    console.error("❌ content-calendar.json not found");
    process.exit(1);
  }

  const calendar: CalendarItem[] = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8"));
  const pending = calendar.filter((i) => i.status === "pending");

  if (pending.length === 0) {
    console.log("✅ No pending topics.");
    return;
  }

  const vendingTarget = parseInt(process.env.VENDING_PER_RUN || "5");
  const lockerTarget = parseInt(process.env.LOCKER_PER_RUN || "5");

  const vendingPick = pending.filter((i) => i.silo === "may-ban-hang-tu-dong").slice(0, vendingTarget);
  const lockerPick = pending.filter((i) => i.silo === "tu-locker-thong-minh").slice(0, lockerTarget);
  const toGenerate = [...lockerPick, ...vendingPick];

  console.log(`🚀 Model: ${GROQ_MODEL}`);
  console.log(`🚀 Generating ${toGenerate.length} article(s): ${lockerPick.length} locker + ${vendingPick.length} vending\n`);

  let date = startIsoDate();
  const usedPhotoIds = new Set<number>();
  const results: { slug: string; item: CalendarItem }[] = [];

  for (const item of toGenerate) {
    try {
      const { slug, content } = await generateArticle(apiKey, item, date, usedPhotoIds);

      const outPath = path.join(BLOG_DIR, `${slug}.md`);
      fs.writeFileSync(outPath, content, "utf8");
      console.log(`  ✅ Saved: src/content/blog/${slug}.md`);

      results.push({ slug, item });

      // Bump date by 1 day per article so articles have distinct dates
      const d = new Date(date);
      d.setDate(d.getDate() + 1);
      date = d.toISOString().slice(0, 10);

      // Throttle: 8s between requests (llama-4-scout has high TPM/TPD limits)
      await new Promise((r) => setTimeout(r, 8000));
    } catch (e) {
      console.log(`  ❌ Failed to generate "${item.topic}": ${e instanceof Error ? e.message : e}`);
    }
  }

  // Update calendar
  if (results.length > 0) {
    const updatedCalendar = calendar.map((i) => {
      const r = results.find((r) => r.item.id === i.id);
      if (!r) return i;
      return { ...i, status: "published" as const, publishedSlug: r.slug, publishedDate: new Date().toISOString().slice(0, 10) };
    });
    fs.writeFileSync(CALENDAR_PATH, JSON.stringify(updatedCalendar, null, 2), "utf8");
    console.log(`\n📅 Calendar updated: ${results.length} articles published.`);
  }

  console.log(`✅ Done. ${usedPhotoIds.size} unique Pexels photos used.`);
  console.log(`\nPending còn lại:`);
  const cal2 = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8")) as CalendarItem[];
  const pV = cal2.filter(x => x.status === "pending" && x.silo === "may-ban-hang-tu-dong").length;
  const pL = cal2.filter(x => x.status === "pending" && x.silo === "tu-locker-thong-minh").length;
  console.log(`  Vending: ${pV} | Locker: ${pL}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
