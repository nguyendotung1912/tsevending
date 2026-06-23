/**
 * Download real Pexels photos for articles that currently only have SVG placeholders.
 * Run: cd d:\vba\tsevending && npx tsx scripts/fix-svg-images.ts
 */
import fs from "fs";
import path from "path";
import https from "https";

const DOTENV = path.join("scripts", ".env.local");
const env: Record<string, string> = {};
if (fs.existsSync(DOTENV)) {
  for (const line of fs.readFileSync(DOTENV, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  }
}
const PEXELS_KEY = env.PEXELS_API_KEY || "";
const IMAGES_DIR = path.join("public", "images", "articles");
const BLOG_DIR = path.join("src", "content", "blog");

if (!PEXELS_KEY) { console.error("PEXELS_API_KEY missing"); process.exit(1); }

// slug → best Pexels English query
const TARGETS: Record<string, string> = {
  "ban-giao-lap-dat-tu-locker-thong-minh-thuc-te":          "smart locker installation handover",
  "bang-gia-tu-locker-thong-minh-chi-tiet-2026":            "modern storage locker system office",
  "cau-hoi-thuong-gap-tu-locker-thong-minh-faq":            "electronic locker security access",
  "huong-dan-chon-tu-locker-thong-minh-phu-hop":            "office locker storage selection",
  "huong-dan-tinh-so-o-locker-van-phong-chung-cu":          "office lockers apartment building corridor",
  "smart-locker-la-gi-nguyen-ly-hoat-dong":                 "smart locker technology digital storage",
  "so-sanh-qr-rfid-van-tay-mo-khoa-locker":                 "digital keypad access control security",
  "so-sanh-thuong-hieu-locker-thong-minh-viet-nam-2026":    "locker storage comparison modern facility",
  "tu-locker-gui-do-sieu-thi-coop-mart":                    "supermarket self-service luggage storage",
  "tu-locker-gui-hanh-ly-ga-ha-noi-du-lich":                "train station luggage storage travel",
  "tu-locker-khach-san-rsm-nha-trang":                      "hotel resort lobby luggage storage",
  "tu-locker-sinh-vien-dai-hoc-rmit-viet-nam":              "university campus students technology",
  "tu-locker-thong-minh-cho-thue-gia-dich-vu-2026":         "smart locker rental service modern",
  "xu-huong-locker-giao-nhan-hang-ecommerce-2026":          "parcel delivery package locker ecommerce",
  "xu-huong-smart-locker-viet-nam-2026":                    "smart locker technology city modern",
};

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    function get(u: string) {
      https.get(u, res => {
        if (res.statusCode === 301 || res.statusCode === 302) { file.close(); get(res.headers.location!); return; }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      }).on("error", err => { fs.unlink(dest, () => {}); reject(err); });
    }
    get(url);
    file.on("error", err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function pexelsSearch(query: string, page = 1): Promise<{ id: number; photographer: string; src: { landscape: string }; alt: string }[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=10&page=${page}`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: PEXELS_KEY } }, res => {
      let body = "";
      res.on("data", c => (body += c));
      res.on("end", () => { try { resolve((JSON.parse(body) as { photos: ReturnType<typeof pexelsSearch> extends Promise<infer T> ? T : never }).photos ?? []); } catch(e) { reject(e); } });
    }).on("error", reject);
  });
}

function updateFrontmatter(slug: string, imagePath: string, alt: string, credit: string) {
  const fp = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) return;
  let raw = fs.readFileSync(fp, "utf8");
  raw = raw.replace(/^image:.*\n/m, "").replace(/^imageAlt:.*\n/m, "").replace(/^imageCredit:.*\n/m, "");
  raw = raw.replace(/^(---\n[\s\S]*?)(date:.*\n)/m, `$1$2image: "${imagePath}"\nimageAlt: "${alt}"\nimageCredit: "Photo by ${credit} on Pexels"\n`);
  fs.writeFileSync(fp, raw, "utf8");
  console.log(`  ✅ Updated frontmatter: ${slug}`);
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const usedIds = new Set<number>();

  for (const [slug, query] of Object.entries(TARGETS)) {
    const dest = path.join(IMAGES_DIR, `${slug}.jpg`);
    const svgPath = path.join(IMAGES_DIR, `${slug}.svg`);

    console.log(`\n📸 ${slug}`);
    console.log(`   Query: "${query}"`);

    let downloaded = false;
    for (const page of [1, 2]) {
      const photos = await pexelsSearch(query, page);
      const photo = photos.find(p => !usedIds.has(p.id));
      if (!photo) { console.log(`   ↩  page ${page}: no unique photo`); continue; }
      usedIds.add(photo.id);
      try {
        await downloadFile(photo.src.landscape, dest);
        console.log(`   ✔  #${photo.id} by ${photo.photographer} → ${path.basename(dest)}`);
        // Remove SVG if it exists
        if (fs.existsSync(svgPath)) { fs.unlinkSync(svgPath); console.log(`   🗑  Removed ${slug}.svg`); }
        // Update article frontmatter
        updateFrontmatter(slug, `/images/articles/${slug}.jpg`, photo.alt || query, photo.photographer);
        downloaded = true;
        break;
      } catch(e) {
        console.error(`   ✗  Download failed: ${e}`);
      }
    }
    if (!downloaded) console.warn(`   ⚠  Skipped (no photo found)`);
    await sleep(300); // rate limit
  }
  console.log("\n✅ Done.");
}

main().catch(console.error);
