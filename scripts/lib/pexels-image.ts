/**
 * Shared Pexels image helper — content-aware query, rate-limit-safe search,
 * download, and frontmatter writing. Used by both the new-article hook
 * (generate-article-gemini) and the batch replacer (replace-article-images).
 *
 * NEVER call this concurrently — Pexels limits requests/hour and parallel
 * bursts get the key throttled. Always await one article before the next.
 */
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const PUBLIC_DIR = path.join("public", "images", "articles");

// ── content → search query ────────────────────────────────────────────────
const STOPWORDS = new Set([
  "và", "là", "của", "có", "cho", "các", "được", "trong", "với", "để", "một",
  "những", "này", "đó", "khi", "như", "về", "tại", "theo", "không", "đã", "sẽ",
  "cũng", "nhưng", "hay", "hoặc", "nên", "rất", "nhiều", "thì", "ra", "vào",
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are",
]);

const DOMAIN_MAP: [RegExp, string][] = [
  [/tủ locker|smart locker|locker|tủ khóa/i, "smart locker parcel delivery"],
  [/máy bán nước|nước giải khát|beverage/i, "beverage vending machine"],
  [/máy bán hàng|vending/i, "vending machine retail"],
  [/snack|đồ ăn vặt/i, "snack vending machine"],
  [/cà phê|coffee/i, "coffee vending machine"],
  [/thanh toán|qr|cashless|ví điện tử/i, "contactless mobile payment"],
  [/iot|cảm biến|kết nối|công nghệ/i, "iot smart technology"],
  [/ai |trí tuệ nhân tạo|machine learning/i, "artificial intelligence technology"],
  [/chung cư|căn hộ|tòa nhà/i, "modern apartment building lobby"],
  [/văn phòng|office/i, "modern office workspace"],
  [/khu công nghiệp|nhà máy|công nhân/i, "industrial factory workers"],
  [/bệnh viện|y tế/i, "hospital corridor modern"],
  [/trường học|sinh viên|đại học/i, "university students campus"],
  [/siêu thị|bán lẻ|retail/i, "supermarket retail aisle"],
  [/logistics|kho |giao hàng|shipper/i, "warehouse logistics delivery"],
  [/khách sạn|resort|du lịch/i, "hotel lobby luggage"],
  [/bảo trì|sửa chữa|kỹ thuật/i, "technician equipment maintenance"],
  [/đầu tư|kinh doanh|doanh thu|roi/i, "business investment growth"],
];

export function buildContentQuery(title: string, content: string): { query: string; keywords: string[] } {
  const clean = `${title}\n${content}`
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`>_[\]()|!~\-]/g, " ")
    .toLowerCase();

  const hits: string[] = [];
  for (const [re, q] of DOMAIN_MAP) {
    if (re.test(clean) && !hits.includes(q)) hits.push(q);
    if (hits.length >= 2) break;
  }

  const freq = new Map<string, number>();
  for (const w of clean.split(/\s+/)) {
    const t = w.trim();
    if (t.length < 3 || STOPWORDS.has(t) || /^\d+$/.test(t)) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const keywords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w);
  const query = hits.length > 0 ? hits.join(" ") : "vending machine smart locker technology";
  return { query, keywords };
}

// ── rate-limit-aware Pexels search ──────────────────────────────────────────
export class RateLimitError extends Error {
  resetEpoch: number;
  constructor(resetEpoch: number) {
    super("Pexels rate limit reached");
    this.resetEpoch = resetEpoch;
  }
}

interface PexelsPhoto {
  id: number;
  photographer: string;
  photographer_url: string;
  src: { landscape: string };
  alt: string;
}

function searchPexels(query: string, apiKey: string, page: number): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&page=${page}&size=large`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: apiKey } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        const remaining = Number(res.headers["x-ratelimit-remaining"] ?? "1");
        const reset = Number(res.headers["x-ratelimit-reset"] ?? "0");
        if (res.statusCode === 429 || remaining <= 0) {
          reject(new RateLimitError(reset || Math.floor(Date.now() / 1000) + 3600));
          return;
        }
        try {
          resolve((JSON.parse(body).photos as PexelsPhoto[]) ?? []);
        } catch {
          reject(new Error(`Pexels parse error: ${body.slice(0, 120)}`));
        }
      });
    }).on("error", reject);
  });
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith("https") ? https : http;
    const doGet = (target: string) => {
      proto.get(target, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { file.close(); doGet(res.headers.location!); return; }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    };
    doGet(url);
    file.on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

export interface ImageResult {
  imagePath: string;
  alt: string;
  photoId: number;
  photographer: string;
  query: string;
}

/**
 * Find the best content-matched Pexels photo, download it to /public/images/
 * articles/<slug>.jpg, and return its info. Throws RateLimitError when the key
 * is throttled (caller should wait until reset, then retry). Returns null only
 * when no unique photo is found.
 */
export async function fetchArticleImage(opts: {
  slug: string;
  title: string;
  content: string;
  apiKey: string;
  usedPhotoIds?: Set<number>;
}): Promise<ImageResult | null> {
  const { slug, title, content, apiKey } = opts;
  const usedPhotoIds = opts.usedPhotoIds ?? new Set<number>();
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const { query } = buildContentQuery(title, content);

  for (const page of [1, 2, 3]) {
    const photos = await searchPexels(query, apiKey, page); // may throw RateLimitError
    const photo = photos.find((p) => !usedPhotoIds.has(p.id));
    if (photo) {
      const destPath = path.join(PUBLIC_DIR, `${slug}.jpg`);
      await downloadFile(photo.src.landscape, destPath);
      usedPhotoIds.add(photo.id);
      // Alt = article title (Vietnamese, content-derived, SEO-appropriate for a hero image).
      return {
        imagePath: `/images/articles/${slug}.jpg`,
        alt: title,
        photoId: photo.id,
        photographer: photo.photographer,
        query,
      };
    }
  }
  return null;
}

/** Set/replace `image:` and `imageAlt:` in a markdown file's frontmatter
 *  without touching the rest (string surgery, preserves YAML formatting). */
export function writeImageFrontmatter(filePath: string, imagePath: string, alt: string): void {
  let raw = fs.readFileSync(filePath, "utf8");
  const escAlt = alt.replace(/"/g, "'");

  if (/^image:\s*.*$/m.test(raw)) raw = raw.replace(/^image:\s*.*$/m, `image: "${imagePath}"`);
  else raw = raw.replace(/^(---\r?\n)/, `$1image: "${imagePath}"\n`);

  if (/^imageAlt:\s*.*$/m.test(raw)) raw = raw.replace(/^imageAlt:\s*.*$/m, `imageAlt: "${escAlt}"`);
  else raw = raw.replace(/^(image:\s*.*\r?\n)/m, `$1imageAlt: "${escAlt}"\n`);

  fs.writeFileSync(filePath, raw, "utf8");
}

/** Load scripts/.env.local into process.env (idempotent). */
export function loadEnvLocal(): void {
  const p = path.join("scripts", ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}
