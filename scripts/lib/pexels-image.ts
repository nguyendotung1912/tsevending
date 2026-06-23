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

// Base product domain detected in the text.
const DOMAIN_MAP: [RegExp, string][] = [
  [/tủ locker|smart locker|locker|tủ khóa/i, "smart locker"],
  [/máy bán nước|nước giải khát|beverage|đồ uống/i, "beverage vending machine"],
  [/cà phê|coffee/i, "coffee vending machine"],
  [/snack|đồ ăn vặt|bánh kẹo/i, "snack vending machine"],
  [/máy bán hàng|vending/i, "vending machine"],
];

// Specific CONTEXT/setting — this is what makes each article's photo unique.
// Ordered roughly specific → broad; we take the first 2 matches per article.
const CONTEXT_MAP: [RegExp, string][] = [
  [/bệnh viện|phòng khám|y tế|bệnh nhân/i, "hospital corridor"],
  [/trường|sinh viên|đại học|học sinh|giảng đường|ký túc/i, "university campus students"],
  [/chung cư|căn hộ|cư dân|shophouse|biệt thự|nhà ở/i, "modern apartment building"],
  [/văn phòng|coworking|công sở/i, "modern office interior"],
  [/khu công nghiệp|nhà máy|công nhân|xưởng|sản xuất/i, "industrial factory workers"],
  [/khách sạn|resort|nghỉ dưỡng/i, "hotel lobby"],
  [/siêu thị|trung tâm thương mại|tttm|mall/i, "supermarket interior"],
  [/gym|thể dục|thể hình|yoga|hồ bơi|bowling|bida/i, "gym fitness center"],
  [/sân bay|airport/i, "airport terminal"],
  [/nhà ga|tàu hỏa|đường sắt|tàu cao tốc/i, "train station platform"],
  [/bến xe|bến phà|cảng/i, "bus station transport"],
  [/rạp chiếu phim|giải trí|công viên/i, "entertainment venue"],
  [/logistics|kho|giao hàng|shipper|bưu cục|vận chuyển/i, "warehouse logistics delivery"],
  [/cây xăng|trạm dừng/i, "gas station convenience"],
  [/sự kiện|hội chợ|triển lãm|festival|hội nghị|đám cưới/i, "event exhibition hall"],
  [/golf|sân golf/i, "golf course luxury"],
  [/thanh toán|qr|ví điện tử|cashless/i, "contactless payment terminal"],
  [/camera|an ninh|bảo mật|giám sát/i, "security camera system"],
  [/ai|trí tuệ nhân tạo|machine learning|robot/i, "artificial intelligence robot"],
  [/iot|cảm biến|kết nối|5g/i, "iot sensor technology"],
  [/blockchain/i, "blockchain digital network"],
  [/màn hình|quảng cáo|marketing|branding|thương hiệu/i, "digital advertising screen"],
  [/bảo trì|sửa chữa|linh kiện|kỹ thuật|lắp đặt/i, "technician repair equipment"],
  [/đầu tư|roi|doanh thu|tài chính|lợi nhuận|chi phí|giá/i, "business finance chart"],
  [/môi trường|xanh|tái chế|bền vững|năng lượng/i, "green sustainable technology"],
  [/nông thôn|tỉnh|vùng|địa phương|nông sản/i, "rural vietnam town"],
  [/du lịch|khách quốc tế/i, "travel tourist"],
  [/hoa|mỹ phẩm|làm đẹp/i, "flower cosmetics shop"],
  [/khẩu trang|covid|sức khỏe/i, "health safety mask"],
  [/mã pin|mở khóa|vân tay|khuôn mặt|sinh trắc/i, "fingerprint biometric access"],
];

const GENERIC_POOL = [
  "smart technology modern interior",
  "automated retail kiosk",
  "digital self service machine",
  "modern building service lobby",
  "technology innovation business",
  "clean modern storage facility",
  "urban smart city street",
  "people using touchscreen kiosk",
];

/** Ordered list of candidate English queries for one article, specific → broad.
 *  Per-article context makes the resulting photos differ between articles. */
export function buildQueryList(title: string, content: string, index = 0): string[] {
  const clean = `${title} ${title} ${content}`
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`>_[\]()|!~\-]/g, " ")
    .toLowerCase();

  let domain = "vending machine smart locker";
  for (const [re, d] of DOMAIN_MAP) { if (re.test(clean)) { domain = d; break; } }

  const ctx: string[] = [];
  for (const [re, c] of CONTEXT_MAP) {
    if (re.test(clean) && !ctx.includes(c)) ctx.push(c);
    if (ctx.length >= 2) break;
  }

  const queries: string[] = [];
  if (ctx[0]) queries.push(`${domain} ${ctx[0]}`);
  if (ctx[1]) queries.push(`${domain} ${ctx[1]}`);
  if (ctx[0]) queries.push(ctx[0]);
  queries.push(domain);
  if (ctx[1]) queries.push(ctx[1]);
  // Rotate the generic pool by index so unmatched articles don't all collide.
  for (let i = 0; i < GENERIC_POOL.length; i++) {
    queries.push(GENERIC_POOL[(index + i) % GENERIC_POOL.length]);
  }
  return [...new Set(queries)];
}

export function buildContentQuery(title: string, content: string): { query: string; keywords: string[] } {
  const clean = `${title}\n${content}`.replace(/[#*`>_[\]()|!~\-]/g, " ").toLowerCase();
  const freq = new Map<string, number>();
  for (const w of clean.split(/\s+/)) {
    const t = w.trim();
    if (t.length < 3 || STOPWORDS.has(t) || /^\d+$/.test(t)) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const keywords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w);
  return { query: buildQueryList(title, content)[0], keywords };
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
  index?: number;
  usedPhotoIds?: Set<number>;
  /** When true, return the remote Pexels CDN URL (hotlink) instead of downloading. */
  hotlink?: boolean;
}): Promise<ImageResult | null> {
  const { slug, title, content, apiKey, index = 0, hotlink = false } = opts;
  const usedPhotoIds = opts.usedPhotoIds ?? new Set<number>();
  if (!hotlink && !fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  // Try each candidate query (specific → broad) across several pages, picking
  // the first photo not already used. Guarantees uniqueness: a duplicate is
  // never written — if nothing unique is found the caller keeps the old image.
  const queries = buildQueryList(title, content, index);

  for (const query of queries) {
    for (const page of [1, 2, 3]) {
      const photos = await searchPexels(query, apiKey, page); // may throw RateLimitError
      if (photos.length === 0) break; // no more pages for this query
      const photo = photos.find((p) => !usedPhotoIds.has(p.id));
      if (photo) {
        usedPhotoIds.add(photo.id);
        let imagePath: string;
        if (hotlink) {
          imagePath = photo.src.landscape; // remote Pexels CDN URL, no download
        } else {
          await downloadFile(photo.src.landscape, path.join(PUBLIC_DIR, `${slug}.jpg`));
          imagePath = `/images/articles/${slug}.jpg`;
        }
        // Alt = article title (Vietnamese, content-derived, fits a hero image).
        return { imagePath, alt: title, photoId: photo.id, photographer: photo.photographer, query };
      }
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
