/**
 * Expand thin articles (<500 words) by rewriting their body content.
 * Keeps frontmatter (image, FAQ, metadata) intact — no re-fetch needed.
 *
 * Run: node_modules/.bin/tsx scripts/expand-thin-articles.ts
 * Options: BATCH_SIZE=50 (default), DRY_RUN=1, MIN_WORDS=500
 *          PROVIDER=gemini (default) | groq
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

function postGemini(apiKey: string, model: string, prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    });
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const urlObj = new URL(url);
    const req = https.request({ hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.error) { reject(new Error(json.error.message)); return; }
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          resolve(text.trim());
        } catch { reject(new Error("Bad JSON: " + data.slice(0, 300))); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function postGroq(apiKey: string, messages: { role: string; content: string }[], maxTokens = 4096): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.7, max_tokens: maxTokens });
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
        } catch { reject(new Error("Bad JSON: " + data.slice(0, 300))); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[.*?\]\(.*?\)/g, " ")
    .replace(/#{1,6}\s*/g, " ")
    .replace(/[*_~`>|#\-=+]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function buildPrompt(title: string, currentBody: string): string {
  return `Bạn là chuyên gia về máy bán hàng tự động và tủ locker thông minh tại Việt Nam.

Hãy viết lại bài viết sau thành nội dung đầy đủ, chi tiết và hữu ích. Yêu cầu:
- Độ dài: 700-1000 từ tiếng Việt (BẮT BUỘC tối thiểu 700 từ — viết đủ sâu)
- Dùng heading ## và ### để chia thành 3-4 phần rõ ràng
- Thêm ví dụ cụ thể, số liệu thực tế, lợi ích rõ ràng
- Ngôn ngữ chuyên nghiệp, tự nhiên, phù hợp độc giả doanh nghiệp Việt Nam
- KHÔNG thêm phần FAQ hoặc tiêu đề H1 (đã có riêng)
- Chỉ trả về nội dung markdown (không có frontmatter, không có \`\`\`)

Tiêu đề bài viết: "${title}"

Nội dung hiện tại (cần mở rộng và cải thiện):
${currentBody.slice(0, 1000)}`;
}

async function expandArticle(provider: string, apiKey: string, geminiModel: string, title: string, currentBody: string): Promise<string> {
  const prompt = buildPrompt(title, currentBody);
  if (provider === "gemini") {
    return await postGemini(apiKey, geminiModel, prompt);
  }
  return await postGroq(apiKey, [{ role: "user", content: prompt }], 2048);
}

async function main() {
  const provider = process.env.PROVIDER || "gemini";
  const apiKey = provider === "gemini"
    ? process.env.GEMINI_API_KEY
    : process.env.GROQ_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) { console.error(`❌ ${provider === "gemini" ? "GEMINI_API_KEY" : "GROQ_API_KEY"} missing`); process.exit(1); }
  console.log(`🤖 Provider: ${provider}${provider === "gemini" ? ` (${geminiModel})` : ""}`);

  const batchSize = parseInt(process.env.BATCH_SIZE || "50");
  const minWords = parseInt(process.env.MIN_WORDS || "500");
  const dryRun = process.env.DRY_RUN === "1";

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
  const thinFiles: Array<{ file: string; words: number; title: string }> = [];

  for (const f of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    try {
      const { data, content } = matter(raw);
      const words = countWords(content);
      if (words < minWords) thinFiles.push({ file: f, words, title: String(data.title || f) });
    } catch {}
  }

  thinFiles.sort((a, b) => a.words - b.words);

  const batch = thinFiles.slice(0, batchSize);
  console.log(`📋 Thin articles (<${minWords}w): ${thinFiles.length} total, processing ${batch.length}`);

  if (dryRun) {
    batch.forEach(({ file, words }) => console.log(`  ${words}w — ${file}`));
    console.log(`\n  ... and ${thinFiles.length - batch.length} more`);
    return;
  }

  let ok = 0, fail = 0;

  for (const { file, words, title } of batch) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");

    console.log(`\n  📝 [${words}w] "${title.slice(0, 60)}"`);

    try {
      const fmMatch = raw.match(/^(---[\s\S]+?---)/);
      if (!fmMatch) { console.log(`  ⚠ No frontmatter`); fail++; continue; }
      const frontmatter = fmMatch[1];
      const { content: currentBody } = matter(raw);

      let newBody = "";
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          newBody = await expandArticle(provider, apiKey!, geminiModel, title, currentBody);
          const newWords = countWords(newBody);
          console.log(`  → ${newWords}w`);
          if (newWords < 620) throw new Error(`Too short: ${newWords}w`);
          break;
        } catch (e) {
          console.log(`  ⚠ Attempt ${attempt}: ${e instanceof Error ? e.message : e}`);
          if (attempt < 3) await new Promise(r => setTimeout(r, 6000));
          else throw e;
        }
      }
      if (!newBody) throw new Error("Empty response");

      // Strip any accidental frontmatter or triple-backtick wrapper from model output
      newBody = newBody.replace(/^---[\s\S]+?---\n?/, "").replace(/^```.*\n?|```$/gm, "").trim();

      fs.writeFileSync(filePath, `${frontmatter}\n\n${newBody}\n`, "utf8");
      console.log(`  ✅ ${file}`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${e instanceof Error ? e.message : e}`);
      fail++;
    }

    await new Promise(r => setTimeout(r, 4000));
  }

  const remaining = thinFiles.length - batch.length;
  console.log(`\n✅ Done: ${ok} expanded, ${fail} failed`);
  console.log(`📌 Remaining thin articles: ${remaining}`);
}

main().catch(e => { console.error(e); process.exit(1); });
