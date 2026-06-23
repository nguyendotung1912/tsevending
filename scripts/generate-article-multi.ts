/**
 * Multi-provider article generator với auto-fallback:
 * Groq → Anthropic Claude → Gemini → OpenRouter
 * Khi provider nào hết quota/429 → tự động sang provider tiếp theo.
 *
 * Thêm key vào scripts/.env.local:
 *   GROQ_API_KEY=gsk_xxx          (free: console.groq.com)
 *   ANTHROPIC_API_KEY=sk-ant-xxx  (có phí, ~$0.25/1000 bài với haiku)
 *   GEMINI_API_KEY=xxx            (free 20/ngày, tự reset)
 *   OPENROUTER_API_KEY=sk-or-xxx  (free $1 credit: openrouter.ai)
 *
 * Run: npx tsx scripts/generate-article-multi.ts
 * Options: VENDING_PER_RUN=10 LOCKER_PER_RUN=10
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

// ── Provider definitions ──────────────────────────────────────────────────────

interface Provider {
  name: string;
  available: boolean;
  exhausted: boolean;
  generate: (prompt: string, topic: string) => Promise<string>;
}

function makeOpenAICompatProvider(
  name: string,
  apiKey: string,
  baseUrl: string,
  model: string,
  maxTokens = 4096
): Provider {
  const generate = (systemPrompt: string, topic: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const body = JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: topic },
        ],
        temperature: 0.75,
        max_tokens: maxTokens,
        top_p: 0.95,
      });

      const url = new URL(baseUrl);
      const req = https.request(
        {
          hostname: url.hostname,
          path: url.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "Content-Length": Buffer.byteLength(body),
            // OpenRouter requires this
            ...(name === "OpenRouter" ? { "HTTP-Referer": "https://tsevending.com" } : {}),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => {
            try {
              const json = JSON.parse(data) as {
                choices?: { message?: { content?: string } }[];
                error?: { message?: string; code?: string | number };
              };
              if (json.error) {
                const msg = json.error.message ?? String(json.error.code);
                reject(new Error(`${name} API error ${res.statusCode}: ${msg}`));
                return;
              }
              resolve((json.choices?.[0]?.message?.content ?? "").trim());
            } catch {
              reject(new Error(`${name} bad JSON (${res.statusCode}): ${data.slice(0, 200)}`));
            }
          });
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });

  return {
    name,
    available: !!apiKey,
    exhausted: false,
    generate,
  };
}

function makeAnthropicProvider(apiKey: string): Provider {
  const generate = (systemPrompt: string, topic: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const body = JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: topic }],
      });

      const req = https.request(
        {
          hostname: "api.anthropic.com",
          path: "/v1/messages",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "Content-Length": Buffer.byteLength(body),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => {
            try {
              const json = JSON.parse(data) as {
                content?: { type: string; text: string }[];
                error?: { message?: string };
              };
              if (json.error) {
                reject(new Error(`Anthropic error ${res.statusCode}: ${json.error.message}`));
                return;
              }
              const text = json.content?.find((b) => b.type === "text")?.text ?? "";
              resolve(text.trim());
            } catch {
              reject(new Error(`Anthropic bad JSON: ${data.slice(0, 200)}`));
            }
          });
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });

  return { name: "Anthropic Claude Haiku", available: !!apiKey, exhausted: false, generate };
}

function makeGeminiProvider(apiKey: string, model: string): Provider {
  const generate = (systemPrompt: string, topic: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const fullPrompt = `${systemPrompt}\n\n${topic}`;
      const body = JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { temperature: 0.8, topK: 40, topP: 0.95, maxOutputTokens: 8192 },
      });

      const req = https.request(
        {
          hostname: "generativelanguage.googleapis.com",
          path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
          method: "POST",
          headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => {
            try {
              const json = JSON.parse(data) as {
                candidates?: { content?: { parts?: { text?: string }[] } }[];
                error?: { message?: string; code?: number };
              };
              if (json.error) {
                reject(new Error(`Gemini error ${res.statusCode}: ${json.error.message}`));
                return;
              }
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
              resolve(text.trim());
            } catch {
              reject(new Error(`Gemini bad JSON: ${data.slice(0, 200)}`));
            }
          });
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });

  return { name: `Gemini ${model}`, available: !!apiKey, exhausted: false, generate };
}

// ── Build provider chain ──────────────────────────────────────────────────────

function buildProviders(): Provider[] {
  const groqKey = process.env.GROQ_API_KEY ?? "";
  const anthropicKey = process.env.ANTHROPIC_API_KEY ?? "";
  const geminiKey = process.env.GEMINI_API_KEY ?? "";
  const openrouterKey = process.env.OPENROUTER_API_KEY ?? "";

  return [
    // Groq: 1000 req/day (llama-3.3-70b) or 14400/day (gemma2-9b-it)
    makeOpenAICompatProvider(
      "Groq llama-3.3-70b",
      groqKey,
      "https://api.groq.com/openai/v1/chat/completions",
      "llama-3.3-70b-versatile"
    ),
    // Groq fallback model: 14400/day
    makeOpenAICompatProvider(
      "Groq gemma2-9b",
      groqKey,
      "https://api.groq.com/openai/v1/chat/completions",
      "gemma2-9b-it",
      2048
    ),
    // Anthropic Claude Haiku: very cheap (~$0.00025/article)
    makeAnthropicProvider(anthropicKey),
    // Gemini 2.5 Flash: 20/day free
    makeGeminiProvider(geminiKey, "gemini-2.5-flash"),
    // Gemini 2.0 Flash: separate quota
    makeGeminiProvider(geminiKey, "gemini-2.0-flash"),
    // OpenRouter: free $1 credit → try Llama 3.3 70B free
    makeOpenAICompatProvider(
      "OpenRouter llama-3.3-70b",
      openrouterKey,
      "https://openrouter.ai/api/v1/chat/completions",
      "meta-llama/llama-3.3-70b-instruct:free"
    ),
    // OpenRouter: Gemma 27B free
    makeOpenAICompatProvider(
      "OpenRouter gemma-3-27b",
      openrouterKey,
      "https://openrouter.ai/api/v1/chat/completions",
      "google/gemma-3-27b-it:free"
    ),
    // OpenRouter: DeepSeek V3 free
    makeOpenAICompatProvider(
      "OpenRouter DeepSeek V3",
      openrouterKey,
      "https://openrouter.ai/api/v1/chat/completions",
      "deepseek/deepseek-chat-v3-5:free"
    ),
  ].filter((p) => p.available);
}

// ── Call with auto-fallback ───────────────────────────────────────────────────

async function callWithFallback(
  providers: Provider[],
  systemPrompt: string,
  topic: string
): Promise<{ text: string; providerName: string }> {
  for (const provider of providers) {
    if (provider.exhausted) continue;

    try {
      const text = await provider.generate(systemPrompt, topic);
      if (text) return { text, providerName: provider.name };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isQuota = msg.includes("429") || msg.includes("quota") || msg.includes("exceeded") || msg.includes("rate");
      const is404 = msg.includes("404") || msg.includes("not found");

      if (isQuota) {
        console.log(`  ⚠️  ${provider.name}: quota/rate limit — switching provider`);
        provider.exhausted = true;
        continue;
      }
      if (is404) {
        console.log(`  ⚠️  ${provider.name}: model not found — skipping`);
        provider.exhausted = true;
        continue;
      }
      // Other errors: log and try next
      console.log(`  ⚠️  ${provider.name}: ${msg.slice(0, 120)} — trying next`);
      continue;
    }
  }
  throw new Error("All providers exhausted or unavailable");
}

// ── Shared helpers ────────────────────────────────────────────────────────────

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

function buildSystemPrompt(item: CalendarItem): string {
  const silo = getSiloBySlug(item.silo);
  const subResult = item.sub ? getSubcategory(item.silo, item.sub) : undefined;
  const siloTitle = silo?.title ?? item.silo;
  const subTitle = subResult?.sub?.title ?? "";
  const isTopicList = /top\s*\d|review.*model|đánh giá.*model/i.test(item.topic);

  return `Bạn là Nguyễn Đỗ Tùng — chuyên gia hơn 10 năm kinh nghiệm về máy bán hàng tự động và smart locker, đồng sáng lập TSE Vending từ 2014. Viết bài từ góc nhìn người trong ngành, dựa trên kinh nghiệm thực tế triển khai hàng trăm dự án tại Việt Nam.

YÊU CẦU BẮT BUỘC:
- Độ dài: 700–800 từ
- Cấu trúc: 1 đoạn mở (câu in đậm đầu tiên), 3–4 section H2, mỗi section 1–2 đoạn hoặc danh sách
- Giọng văn: chuyên nghiệp, thực tế, như chuyên gia tư vấn trực tiếp
- Từ khóa chính xuất hiện tự nhiên trong H2 đầu và đoạn mở
- KHÔNG dùng cụm sáo: "trong thế giới ngày nay", "không thể phủ nhận", "bối cảnh hiện đại"
- KHÔNG bịa số liệu, tên thương hiệu, tên model không có thật${isTopicList ? "\n- Chủ đề TOP/REVIEW: mô tả LOẠI/TIÊU CHÍ, không đặt tên model giả" : ""}
- TUYỆT ĐỐI không thêm gì ngoài block frontmatter + bài viết

INTERNAL LINKS — dùng đúng các link này, nhúng ít nhất 2:
[máy bán hàng tự động](/may-ban-hang-tu-dong)
[tủ locker thông minh](/tu-locker-thong-minh)
[giải pháp kinh doanh](/giai-phap-kinh-doanh)
[liên hệ TSE Vending](/lien-he)

CHUYÊN MỤC: ${siloTitle}${subTitle ? ` > ${subTitle}` : ""}

OUTPUT FORMAT — trả về CHÍNH XÁC block này, không có gì thêm:
---
title: "[Tiêu đề 50–65 ký tự, có từ khóa chính]"
description: "[Meta 140–155 ký tự, không markdown, có từ khóa + CTA]"
date: "PLACEHOLDER_DATE"
silo: "${item.silo}"${item.sub ? `\nsub: "${item.sub}"` : ""}
keywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]
image: "PLACEHOLDER_IMAGE"
imageAlt: "[Mô tả ảnh 80–100 ký tự có từ khóa]"
faqs:
  - q: "[Câu hỏi thực tế người dùng hay hỏi]"
    a: "[Trả lời dưới 55 từ, không link]"
  - q: "[Câu hỏi 2]"
    a: "[Trả lời]"
  - q: "[Câu hỏi 3]"
    a: "[Trả lời]"
---

**[Câu định nghĩa thẳng 1–2 câu, dưới 45 từ]**

[Đoạn mở 2–3 câu]

## [H2 có từ khóa chính]

[Nội dung]

## [H2 thứ hai]

[Nội dung]

## [H2 thứ ba]

[Nội dung — CTA dẫn đến /lien-he]`;
}

function postCleanup(raw: string): string {
  return raw
    .replace(/^```(?:markdown)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim()
    .replace(/\n---\n?\*?\*?Word Count[^\n]*\n?$/im, "")
    .replace(/\n\*?\*?Word Count[^\n]*$/im, "")
    .replace(/\/giải-pháp-kinh-doanh/g, "/giai-phap-kinh-doanh")
    .replace(/\/máy-bán-hàng-tự-động/g, "/may-ban-hang-tu-dong")
    .replace(/\/tủ-locker-thông-minh/g, "/tu-locker-thong-minh")
    .replace(/\/tin-tức/g, "/tin-tuc")
    .replace(/\/liên-hệ/g, "/lien-he")
    .replace(/\/giới-thiệu/g, "/gioi-thieu");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const providers = buildProviders();

  if (providers.length === 0) {
    console.error("❌ Không tìm thấy API key nào trong scripts/.env.local");
    console.error("   Thêm ít nhất một trong:");
    console.error("   GROQ_API_KEY=gsk_xxx          (free: console.groq.com)");
    console.error("   ANTHROPIC_API_KEY=sk-ant-xxx  (anthropic.com)");
    console.error("   OPENROUTER_API_KEY=sk-or-xxx  (free $1: openrouter.ai)");
    console.error("   GEMINI_API_KEY=xxx            (aistudio.google.com)");
    process.exit(1);
  }

  console.log(`🔌 Providers khả dụng: ${providers.map((p) => p.name).join(" → ")}\n`);

  const calendar: CalendarItem[] = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8"));
  const pending = calendar.filter((i) => i.status === "pending");

  if (pending.length === 0) {
    console.log("✅ Không còn bài pending.");
    return;
  }

  const vendingTarget = parseInt(process.env.VENDING_PER_RUN || "10");
  const lockerTarget = parseInt(process.env.LOCKER_PER_RUN || "10");

  const vendingPick = pending.filter((i) => i.silo === "may-ban-hang-tu-dong").slice(0, vendingTarget);
  const lockerPick = pending.filter((i) => i.silo === "tu-locker-thong-minh").slice(0, lockerTarget);
  const toGenerate = [...lockerPick, ...vendingPick];

  console.log(`🚀 Generating ${toGenerate.length} bài: ${lockerPick.length} locker + ${vendingPick.length} vending`);
  console.log(`   Còn lại trong queue: ${pending.length - toGenerate.length} bài\n`);

  let date = new Date().toISOString().slice(0, 10);
  const usedPhotoIds = new Set<number>();
  const published: { slug: string; itemId: number }[] = [];
  let ok = 0;
  let fail = 0;

  for (const item of toGenerate) {
    console.log(`\n[${ok + fail + 1}/${toGenerate.length}] "${item.topic}"`);

    try {
      const systemPrompt = buildSystemPrompt(item);
      const userMsg = `Chủ đề: ${item.topic}\nTừ khóa: ${item.keywords.join(", ")}`;

      const { text: raw, providerName } = await callWithFallback(providers, systemPrompt, userMsg);
      console.log(`  ✍️  Provider: ${providerName}`);

      const cleaned = postCleanup(raw);
      if (cleaned.length < 2800) {
        throw new Error(`Quá ngắn (${cleaned.length} ký tự) — bị cắt`);
      }

      const withDate = cleaned.replace("PLACEHOLDER_DATE", date);

      const titleMatch = withDate.match(/^title:\s*"(.+)"/m);
      const title = titleMatch ? titleMatch[1] : item.topic;
      const imageAltMatch = withDate.match(/^imageAlt:\s*"(.+)"/m);
      const imageAlt = imageAltMatch ? imageAltMatch[1] : title;

      const slug = uniqueSlug(slugify(title).slice(0, 80) || slugify(item.topic).slice(0, 80));

      console.log(`  🖼  Fetching image...`);
      const pexels = await fetchPexelsImage(slug, item.silo, item.sub ?? null, usedPhotoIds);

      let finalContent = withDate;
      if (pexels) {
        usedPhotoIds.add(pexels.photoId);
        finalContent = finalContent
          .replace("PLACEHOLDER_IMAGE", pexels.imagePath)
          .replace(/^(imageAlt:.*)/m, `$1\nimageCredit: "Photo by ${pexels.credit} on Pexels"`);
        console.log(`  📸 Pexels: ${pexels.imagePath}`);
      } else {
        const svgPath = saveArticleImage(slug, imageAlt, item.silo);
        finalContent = finalContent.replace("PLACEHOLDER_IMAGE", svgPath);
        console.log(`  🎨 SVG fallback`);
      }

      fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), finalContent, "utf8");
      console.log(`  ✅ ${slug}.md`);

      published.push({ slug, itemId: item.id });
      ok++;

      // Advance date
      const d = new Date(date);
      d.setDate(d.getDate() + 1);
      date = d.toISOString().slice(0, 10);

      // Throttle between requests
      await new Promise((r) => setTimeout(r, 1500));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`  ❌ ${msg}`);
      fail++;
    }
  }

  // Update calendar
  if (published.length > 0) {
    const today = new Date().toISOString().slice(0, 10);
    const updatedCal = calendar.map((i) => {
      const r = published.find((p) => p.itemId === i.id);
      if (!r) return i;
      return { ...i, status: "published" as const, publishedSlug: r.slug, publishedDate: today };
    });
    fs.writeFileSync(CALENDAR_PATH, JSON.stringify(updatedCal, null, 2), "utf8");
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅ Xong: ${ok} bài thành công, ${fail} bài thất bại`);

  const cal2 = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8")) as CalendarItem[];
  const pV = cal2.filter((x) => x.status === "pending" && x.silo === "may-ban-hang-tu-dong").length;
  const pL = cal2.filter((x) => x.status === "pending" && x.silo === "tu-locker-thong-minh").length;
  console.log(`📋 Còn pending: ${pV} vending + ${pL} locker = ${pV + pL} bài`);
}

main().catch((e) => { console.error(e); process.exit(1); });
