/**
 * Tải ảnh từ Pexels cho các bài viết chưa có hình.
 * Dùng Gemini để tạo query tiếng Anh từ tiêu đề tiếng Việt.
 * Run: npx tsx scripts/download-article-images.ts
 * Options: --limit=20  --dry-run
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { URL } from "url";

const DOTENV_PATH = path.join("scripts", ".env.local");
const env: Record<string, string> = {};
if (fs.existsSync(DOTENV_PATH)) {
  for (const line of fs.readFileSync(DOTENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  }
}

const PEXELS_KEY = env.PEXELS_API_KEY || process.env.PEXELS_API_KEY || "";
const GEMINI_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = env.GEMINI_MODEL || "gemini-2.5-flash";

const BLOG_DIR = path.join("src", "content", "blog");
const IMAGES_DIR = path.join("public", "images", "articles");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const LIMIT = parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] ?? "200");
const FORCE = args.includes("--force");

// ── helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

function parseFrontmatter(content: string) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { meta: {} as Record<string, string>, body: content };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return { meta, body: content.slice(m[0].length) };
}

function updateFrontmatter(filePath: string, image: string, imageAlt: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  // Remove existing image/imageAlt lines then inject after first ---\n block
  const cleaned = raw.replace(/^image:.*\n/m, "").replace(/^imageAlt:.*\n/m, "");
  const updated = cleaned.replace(
    /^(---\n[\s\S]*?)(date:.*\n)/m,
    `$1$2image: "${image}"\nimageAlt: "${imageAlt}"\n`
  );
  fs.writeFileSync(filePath, updated, "utf8");
}

async function fetchJson(url: string, headers: Record<string, string>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const req = mod.get(url, { headers }, res => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Bad JSON: ${data.slice(0, 200)}`)); }
      });
    });
    req.on("error", reject);
  });
}

async function postJson(url: string, body: unknown): Promise<unknown> {
  const parsed = new URL(url);
  const bodyStr = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const mod = parsed.protocol === "https:" ? https : http;
    const req = mod.request(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(bodyStr) },
      },
      res => {
        let data = "";
        res.on("data", c => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(`Bad JSON: ${data.slice(0, 200)}`)); }
        });
      }
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const parsedUrl = new URL(url);
    const mod = parsedUrl.protocol === "https:" ? https : http;
    const request = (targetUrl: string) => {
      mod.get(targetUrl, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return request(res.headers.location!);
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", err => { fs.unlink(dest, () => {}); reject(err); });
      }).on("error", err => { fs.unlink(dest, () => {}); reject(err); });
    };
    request(url);
  });
}

// ── Gemini: generate English Pexels query from Vietnamese title ───────────────

async function getSearchQuery(title: string, silo: string, slug: string): Promise<string> {
  if (!GEMINI_KEY) {
    // Fallback: simple slug-based heuristic
    return fallbackQuery(slug, silo);
  }
  try {
    const siloHint = silo.includes("locker") ? "smart locker / parcel locker" : "vending machine";
    const prompt = `You are helping find stock photos for a Vietnamese B2B website about ${siloHint}.
Article title (Vietnamese): "${title}"
Article slug: "${slug}"

Write ONE short English phrase (3-6 words) for searching Pexels stock photos that visually represents this article.
Rules:
- Must be in English
- Should show a PLACE or OBJECT that matches the topic (e.g. "office vending machine", "industrial warehouse workers", "airport terminal kiosk")
- Prefer concrete, photogenic scenes over abstract concepts
- Output ONLY the search phrase, nothing else.`;

    const res = await postJson(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    ) as any;
    const text = res?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    if (text && text.length < 100) return text;
  } catch {
    // ignore, fall through
  }
  return fallbackQuery(slug, silo);
}

function fallbackQuery(slug: string, silo: string): string {
  const base = silo.includes("locker") ? "smart locker" : "vending machine";
  if (slug.includes("ca-phe")) return "coffee vending machine kiosk";
  if (slug.includes("nuoc")) return "beverage vending machine";
  if (slug.includes("snack") || slug.includes("do-an")) return "snack vending machine food";
  if (slug.includes("gas")) return "gas cylinder retail store";
  if (slug.includes("bia")) return "craft beer tap bar";
  if (slug.includes("san-bay") || slug.includes("airport")) return "airport terminal kiosk";
  if (slug.includes("benh-vien") || slug.includes("hospital")) return "hospital corridor vending";
  if (slug.includes("truong-hoc") || slug.includes("sinh-vien")) return "school students cafeteria";
  if (slug.includes("chung-cu") || slug.includes("can-ho")) return "apartment building lobby";
  if (slug.includes("van-phong")) return "modern office workspace";
  if (slug.includes("khu-cong-nghiep") || slug.includes("nha-may")) return "industrial factory workers";
  if (slug.includes("kho") || slug.includes("logistics")) return "warehouse logistics workers";
  if (slug.includes("sieu-thi")) return "supermarket aisle retail";
  if (slug.includes("iot") || slug.includes("cong-nghe")) return "IoT smart technology screen";
  if (slug.includes("ai") || slug.includes("robot")) return "artificial intelligence automation";
  if (slug.includes("blockchain")) return "blockchain digital network";
  if (slug.includes("thanh-toan") || slug.includes("cashless")) return "contactless payment mobile";
  if (slug.includes("bao-tri") || slug.includes("sua-chua")) return "technician machine repair";
  if (slug.includes("lap-dat")) return "equipment installation setup";
  if (slug.includes("dau-tu") || slug.includes("roi")) return "business investment growth";
  if (slug.includes("so-sanh")) return "product comparison evaluation";
  if (slug.includes("phap-ly") || slug.includes("phap-luat")) return "business legal documents";
  if (slug.includes("franchise")) return "franchise business partner";
  if (slug.includes("thi-truong") || slug.includes("xu-huong")) return "retail market trends";
  return base + " automated retail modern";
}

// ── Pexels search ─────────────────────────────────────────────────────────────

async function searchPexels(query: string): Promise<{ url: string; alt: string } | null> {
  if (!PEXELS_KEY) { console.error("No PEXELS_API_KEY"); return null; }
  try {
    const encoded = encodeURIComponent(query);
    const res = await fetchJson(
      `https://api.pexels.com/v1/search?query=${encoded}&per_page=3&orientation=landscape&size=medium`,
      { Authorization: PEXELS_KEY }
    ) as any;
    const photos: any[] = res?.photos ?? [];
    if (!photos.length) return null;
    const photo = photos[0];
    // Prefer large size (fits h-80 = 320px), capped at ~1200px wide
    const url = photo.src?.large ?? photo.src?.medium ?? photo.src?.original;
    const alt = photo.alt || query;
    return { url, alt };
  } catch (e) {
    console.error("Pexels error:", e);
    return null;
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".md"))
    .sort();

  const targets = files.filter(f => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    if (!FORCE && raw.includes("\nimage:")) return false;
    return true;
  }).slice(0, LIMIT);

  console.log(`Processing ${targets.length} posts (limit ${LIMIT})...`);
  if (DRY_RUN) console.log("[DRY RUN — no files written]");

  let ok = 0, fail = 0;

  for (const file of targets) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { meta } = parseFrontmatter(raw);
    const title = meta.title ?? file.replace(".md", "");
    const silo = meta.silo ?? "";
    const slug = file.replace(".md", "");
    const imgPath = `/images/articles/${slug}.jpg`;
    const destPath = path.join("public", imgPath);

    process.stdout.write(`[${String(ok + fail + 1).padStart(3)}/${targets.length}] ${slug.slice(0, 55).padEnd(55)} `);

    // Skip if image file already exists on disk (unless --force)
    if (!FORCE && fs.existsSync(destPath)) {
      console.log("→ skip (file exists)");
      if (DRY_RUN || raw.includes("\nimage:")) { ok++; continue; }
      updateFrontmatter(filePath, imgPath, title);
      ok++;
      continue;
    }

    // Get search query
    const query = await getSearchQuery(title, silo, slug);
    process.stdout.write(`"${query}" `);

    // Search Pexels
    let photo = await searchPexels(query);
    if (!photo) {
      const fallback = silo.includes("locker") ? "smart locker modern" : "vending machine modern";
      photo = await searchPexels(fallback);
    }
    if (!photo) { console.log("✗ no photo"); fail++; await sleep(1200); continue; }

    if (!DRY_RUN) {
      try {
        await downloadFile(photo.url, destPath);
        updateFrontmatter(filePath, imgPath, photo.alt);
        console.log("✓");
        ok++;
      } catch (e) {
        console.log(`✗ download error: ${e}`);
        fail++;
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      }
    } else {
      console.log(`→ dry-run OK (would download ${photo.url.slice(0, 60)})`);
      ok++;
    }

    // Pexels free tier: 200 req/hr = 1 req per 18s, but in practice 1/s is fine
    await sleep(600);
  }

  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

main().catch(e => { console.error(e); process.exit(1); });
