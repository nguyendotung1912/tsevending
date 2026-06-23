/**
 * Add FAQs to articles that are missing them — uses Groq to generate
 * 3 relevant Q&A pairs from the article's title and content.
 *
 * Run: node_modules/.bin/tsx scripts/add-faqs.ts
 * Options: BATCH_SIZE=10 (articles per run, default=30)
 *          DRY_RUN=1 (list without writing)
 */
import fs from "fs";
import path from "path";
import https from "https";
import matter from "gray-matter";

const DOTENV_PATH = path.join("scripts", ".env.local");
if (fs.existsSync(DOTENV_PATH)) {
  for (const line of fs.readFileSync(DOTENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function postGroq(apiKey: string, messages: { role: string; content: string }[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 512,
    });
    const req = https.request(GROQ_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}`, "Content-Length": Buffer.byteLength(body) },
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.error) { reject(new Error(json.error.message)); return; }
          resolve((json.choices?.[0]?.message?.content ?? "").trim());
        } catch { reject(new Error("Bad JSON: " + data.slice(0, 200))); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

interface FAQ { q: string; a: string }

async function generateFaqs(apiKey: string, title: string, bodySnippet: string): Promise<FAQ[]> {
  const prompt = `Dựa trên bài viết sau, hãy tạo ĐÚNG 3 câu hỏi-trả lời (FAQ) mà người dùng thường thắc mắc về chủ đề này.

Tiêu đề: "${title}"
Nội dung tóm tắt: "${bodySnippet.slice(0, 600)}"

Trả về ĐÚNG định dạng JSON (không có gì thêm):
[
  {"q": "Câu hỏi 1?", "a": "Trả lời ngắn gọn dưới 50 từ."},
  {"q": "Câu hỏi 2?", "a": "Trả lời ngắn gọn dưới 50 từ."},
  {"q": "Câu hỏi 3?", "a": "Trả lời ngắn gọn dưới 50 từ."}
]`;

  const raw = await postGroq(apiKey, [
    { role: "user", content: prompt },
    { role: "assistant", content: "[" },
  ]);

  // Model starts mid-JSON (after "["), prepend it back
  const jsonStr = "[" + raw.replace(/```json?\n?|```$/g, "").trim();
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed) && parsed.length >= 3) {
      return parsed.slice(0, 3).map(item => ({ q: String(item.q || ""), a: String(item.a || "") }));
    }
  } catch (e) {
    // Try to extract Q/A pairs from malformed JSON
    const pairs = [...jsonStr.matchAll(/"q"\s*:\s*"([^"]+)"\s*,\s*"a"\s*:\s*"([^"]+)"/g)];
    if (pairs.length >= 2) {
      return pairs.slice(0, 3).map(m => ({ q: m[1], a: m[2] }));
    }
  }
  throw new Error("Could not parse FAQs: " + jsonStr.slice(0, 200));
}

function faqsToYaml(faqs: FAQ[]): string {
  return faqs.map(f => `  - q: "${f.q.replace(/"/g, '\\"')}"\n    a: "${f.a.replace(/"/g, '\\"')}"`).join("\n");
}

async function main() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) { console.error("❌ GROQ_API_KEY missing"); process.exit(1); }

  const batchSize = parseInt(process.env.BATCH_SIZE || "30");
  const dryRun = process.env.DRY_RUN === "1";

  const files = fs.readdirSync(BLOG_DIR);
  const noFaqFiles: string[] = [];

  for (const f of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    try {
      const { data } = matter(content);
      if (!data.faqs || data.faqs.length === 0) noFaqFiles.push(f);
    } catch {}
  }

  const batch = noFaqFiles.slice(0, batchSize);
  console.log(`📋 No-FAQ articles: ${noFaqFiles.length} total, processing ${batch.length}`);
  if (dryRun) { batch.forEach(f => console.log(" -", f)); return; }

  let ok = 0, fail = 0;

  for (const f of batch) {
    const filePath = path.join(BLOG_DIR, f);
    const rawContent = fs.readFileSync(filePath, "utf8");
    try {
      const parsed = matter(rawContent);
      const title = parsed.data.title as string || "";
      const body = parsed.content.trim();

      console.log(`\n  ❓ Adding FAQs: "${title.slice(0, 60)}"`);

      let faqs: FAQ[] | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          faqs = await generateFaqs(apiKey, title, body);
          break;
        } catch (e) {
          if (attempt < 3) await new Promise(r => setTimeout(r, 5000));
          else throw e;
        }
      }
      if (!faqs) throw new Error("Null FAQs");

      // Insert faqs into frontmatter
      const faqYaml = "faqs:\n" + faqsToYaml(faqs);
      let newContent: string;
      if (rawContent.match(/^faqs:/m)) {
        // Replace existing (empty) faqs block
        newContent = rawContent.replace(/^faqs:[\s\S]*?(?=\n\w|\n---)/m, faqYaml);
      } else {
        // Insert before closing ---
        newContent = rawContent.replace(/^(---\n[\s\S]*?)(---)$/m, `$1${faqYaml}\n$2`);
      }
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`  ✅ ${f} — added ${faqs.length} FAQs`);
      ok++;

      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.log(`  ❌ ${f}: ${e instanceof Error ? e.message : e}`);
      fail++;
    }
  }

  const remaining = noFaqFiles.length - batch.length;
  console.log(`\n✅ Done: ${ok} updated, ${fail} failed`);
  console.log(`📌 Remaining no-FAQ articles: ${remaining}`);
}

main().catch(e => { console.error(e); process.exit(1); });
