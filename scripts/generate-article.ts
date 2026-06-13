/**
 * Daily SEO article generator for TSE Vending.
 *
 * Picks the next pending topic from scripts/content-calendar.json, asks
 * Claude to write a Silo-structured Vietnamese SEO article, and writes the
 * result as a Markdown file into src/content/blog/.
 *
 * Usage: tsx scripts/generate-article.ts
 * Required env: ANTHROPIC_API_KEY
 * Optional env: ANTHROPIC_MODEL (default: claude-sonnet-4-6)
 */
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";
import { getSiloBySlug, getSubcategory, SOLUTIONS_SILO } from "../src/content/categories";

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

function getCategoryContext(siloSlug: string, subSlug: string | null) {
  if (siloSlug === SOLUTIONS_SILO.slug) {
    return {
      siloTitle: SOLUTIONS_SILO.title,
      siloPath: `/${SOLUTIONS_SILO.slug}`,
      subTitle: undefined,
      subPath: undefined,
      relatedLinks: SOLUTIONS_SILO.items.map((i) => `/${SOLUTIONS_SILO.slug}#${i.slug}`),
    };
  }

  const silo = getSiloBySlug(siloSlug);
  if (!silo) {
    throw new Error(`Unknown silo "${siloSlug}" in content calendar`);
  }

  if (subSlug) {
    const result = getSubcategory(siloSlug, subSlug);
    if (!result) {
      throw new Error(`Unknown subcategory "${subSlug}" in silo "${siloSlug}"`);
    }
    return {
      siloTitle: silo.title,
      siloPath: `/${silo.slug}`,
      subTitle: result.sub.title,
      subPath: `/${silo.slug}/${result.sub.slug}`,
      relatedLinks: silo.subcategories
        .filter((s) => s.slug !== subSlug)
        .map((s) => `/${silo.slug}/${s.slug}`),
    };
  }

  return {
    siloTitle: silo.title,
    siloPath: `/${silo.slug}`,
    subTitle: undefined,
    subPath: undefined,
    relatedLinks: silo.subcategories.map((s) => `/${silo.slug}/${s.slug}`),
  };
}

function buildPrompt(item: CalendarItem) {
  const ctx = getCategoryContext(item.silo, item.sub);

  const linkTargets = [ctx.siloPath, ctx.subPath, ...ctx.relatedLinks]
    .filter(Boolean)
    .slice(0, 4);

  return `Bạn là chuyên gia content SEO tiếng Việt cho TSE Vending - công ty cung cấp máy bán hàng tự động và tủ locker thông minh tại Việt Nam.

Hãy viết một bài blog SEO cho chủ đề sau:
- Chủ đề: "${item.topic}"
- Chuyên mục (silo): ${ctx.siloTitle}${ctx.subTitle ? ` > ${ctx.subTitle}` : ""}
- Từ khóa mục tiêu: ${item.keywords.join(", ")}

Yêu cầu nội dung:
- Viết bằng tiếng Việt, văn phong chuyên nghiệp, dễ hiểu, không quảng cáo lộ liễu.
- Độ dài 600-900 từ.
- Cấu trúc rõ ràng với các tiêu đề H2 (##) và H3 (###) khi cần.
- Sử dụng định dạng Markdown (danh sách, đoạn văn ngắn).
- Chèn 1-3 internal link dạng Markdown trỏ đến các đường dẫn sau (chọn vị trí tự nhiên trong bài, dùng anchor text phù hợp ngữ cảnh): ${linkTargets.join(", ")}
- Không bịa số liệu thống kê, chứng nhận hoặc cam kết cụ thể không có thật.
- Kết bài bằng một đoạn ngắn gợi ý liên hệ TSE Vending để được tư vấn (có thể link tới /lien-he hoặc /giai-phap-kinh-doanh).

Trả lời CHỈ bằng một JSON object hợp lệ (không markdown code fence, không giải thích thêm) theo cấu trúc:
{
  "title": "Tiêu đề bài viết (60 ký tự trở xuống, hấp dẫn, chứa từ khóa chính)",
  "description": "Mô tả meta (140-160 ký tự, chứa từ khóa chính)",
  "keywords": ["từ khóa 1", "từ khóa 2", "từ khóa 3"],
  "body": "Nội dung bài viết đầy đủ ở dạng Markdown (bắt đầu từ đoạn mở bài, KHÔNG lặp lại tiêu đề H1)"
}`;
}

function extractJson(text: string): { title: string; description: string; keywords: string[]; body: string } {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/```$/, "");
  }
  return JSON.parse(cleaned);
}

function toFrontmatterArray(values: string[]): string {
  return `[${values.map((v) => JSON.stringify(v)).join(", ")}]`;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log("ANTHROPIC_API_KEY chưa được cấu hình - bỏ qua bước sinh bài viết hôm nay.");
    return;
  }

  const calendar: CalendarItem[] = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8"));
  const next = calendar.find((item) => item.status === "pending");

  if (!next) {
    console.log("Không còn topic nào ở trạng thái pending trong content-calendar.json.");
    return;
  }

  console.log(`Đang sinh bài viết cho topic #${next.id}: ${next.topic}`);

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    messages: [{ role: "user", content: buildPrompt(next) }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Không nhận được phản hồi văn bản từ Claude API.");
  }

  const result = extractJson(textBlock.text);
  const baseSlug = slugify(result.title);
  const slug = uniqueSlug(baseSlug);
  const date = new Date().toISOString().slice(0, 10);

  const frontmatterLines = [
    "---",
    `title: ${JSON.stringify(result.title)}`,
    `description: ${JSON.stringify(result.description)}`,
    `date: "${date}"`,
    `silo: "${next.silo}"`,
  ];
  if (next.sub) frontmatterLines.push(`sub: "${next.sub}"`);
  frontmatterLines.push(`keywords: ${toFrontmatterArray(result.keywords || next.keywords)}`);
  frontmatterLines.push("---", "");

  const fileContent = frontmatterLines.join("\n") + result.body.trim() + "\n";

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), fileContent, "utf8");

  next.status = "published";
  next.publishedSlug = slug;
  next.publishedDate = date;
  fs.writeFileSync(CALENDAR_PATH, JSON.stringify(calendar, null, 2) + "\n", "utf8");

  console.log(`Đã tạo bài viết: src/content/blog/${slug}.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
