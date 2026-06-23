/**
 * download-product-images.mjs
 *
 * Downloads 3 landscape photos per subcategory from Pexels API.
 * Saves to: public/images/products/[silo-slug]/[ascii-sub-slug]/01.jpg … 03.jpg
 *
 * Usage:
 *   node scripts/download-product-images.mjs
 *
 * Requires: PEXELS_API_KEY in scripts/.env.local
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load .env.local ──────────────────────────────────────────────
const envFile = path.join(__dirname, ".env.local");
const env = {};
fs.readFileSync(envFile, "utf-8").split("\n").forEach((line) => {
  const eq = line.indexOf("=");
  if (eq === -1) return;
  const k = line.slice(0, eq).trim();
  const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  env[k] = v;
});

const API_KEY = env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("❌ PEXELS_API_KEY not found in scripts/.env.local");
  process.exit(1);
}

const OUTPUT_ROOT = path.join(__dirname, "../public/images/products");

// ── Normalize slug to ASCII folder name ──────────────────────────
function normalizeSlug(slug) {
  return slug
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase();
}

// ── Product definitions ──────────────────────────────────────────
const PRODUCTS = [
  // Máy bán hàng tự động
  {
    silo: "may-ban-hang-tu-dong",
    sub: "may-ban-nuoc-giai-khat",
    queries: [
      "vending machine cold beverages drinks",
      "modern beverage dispenser refrigerated",
      "soft drinks cans vending machine",
    ],
  },
  {
    silo: "may-ban-hang-tu-dong",
    sub: "may-ban-do-an-vat",
    queries: [
      "snack vending machine food",
      "candy junk food vending dispenser",
      "convenience snack machine office",
    ],
  },
  {
    silo: "may-ban-hang-tu-dong",
    sub: "may-ban-hang-lanh",
    queries: [
      "frozen food vending machine refrigerated",
      "cold food storage cabinet commercial",
      "refrigerated display case food",
    ],
  },
  {
    silo: "may-ban-hang-tu-dong",
    sub: "may-ban-gas",
    queries: [
      "gas cylinder propane cooking kitchen",
      "gas canister small camping",
      "gas bottle storage commercial",
    ],
  },
  {
    silo: "may-ban-hang-tu-dong",
    sub: "linh-kien-phu-tung",
    queries: [
      "electronic circuit board repair workshop",
      "machine spare parts maintenance",
      "electrical components technology",
    ],
  },
  // Tủ locker thông minh
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-chung-cu",
    queries: [
      "apartment parcel delivery locker building",
      "package locker residential complex",
      "smart locker delivery service",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-van-phong",
    queries: [
      "office locker storage employees",
      "workplace employee locker modern",
      "industrial workplace storage cabinet",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-gui-do-thong-minh",
    queries: [
      "gym locker fitness center",
      "public locker storage school",
      "sports locker room modern",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-giao-nhan-hang",
    queries: [
      "parcel delivery locker package",
      "courier delivery package locker station",
      "logistics delivery point locker",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-truong-hoc-dai-hoc",
    queries: [
      "school locker students hallway",
      "university campus student storage",
      "education locker corridor",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-khach-san-resort",
    queries: [
      "hotel luggage storage travel lobby",
      "resort baggage service",
      "hotel concierge luggage room",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    // actual slug: tu-locker-sieu-thi-banlẻ — normalize to ASCII
    sub: "tu-locker-sieu-thi-banle",
    queries: [
      "supermarket shopping locker storage",
      "retail mall locker system",
      "shopping center baggage storage",
    ],
  },
  {
    silo: "tu-locker-thong-minh",
    sub: "tu-locker-benh-vien-y-te",
    queries: [
      "hospital storage cabinet medical",
      "healthcare locker medical facility",
      "clinic hospital storage modern",
    ],
  },
];

// ── Pexels helpers ────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith("https") ? https : http;

    function doGet(targetUrl) {
      proto.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          doGet(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${targetUrl}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      }).on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    file.on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });

    doGet(url);
  });
}

async function searchPexels(query, page = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=10&page=${page}&size=large`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: API_KEY } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          resolve(data.photos ?? []);
        } catch (e) {
          reject(new Error(`Parse error: ${body.slice(0, 100)}`));
        }
      });
    }).on("error", reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📦 Downloading product images to public/images/products/\n`);

  const usedIds = new Set();
  let totalDownloaded = 0;
  let totalSkipped = 0;

  for (const product of PRODUCTS) {
    const folderName = normalizeSlug(product.sub);
    const dir = path.join(OUTPUT_ROOT, product.silo, folderName);
    fs.mkdirSync(dir, { recursive: true });

    let imageCount = 0;

    // Check how many already exist
    for (let n = 1; n <= 3; n++) {
      if (fs.existsSync(path.join(dir, `0${n}.jpg`))) {
        console.log(`  ⏭  ${product.silo}/${folderName}/0${n}.jpg already exists`);
        imageCount++;
        totalSkipped++;
      }
    }

    if (imageCount >= 3) {
      console.log(`  ✅ ${product.silo}/${folderName} — all 3 images present\n`);
      continue;
    }

    console.log(`  🔍 ${product.silo}/${folderName}`);

    for (const query of product.queries) {
      if (imageCount >= 3) break;

      try {
        const photos = await searchPexels(query, 1);
        await sleep(250);

        for (const photo of photos) {
          if (imageCount >= 3) break;
          if (usedIds.has(photo.id)) continue;

          const destN = imageCount + 1;
          const dest = path.join(dir, `0${destN}.jpg`);
          if (fs.existsSync(dest)) {
            imageCount++;
            continue;
          }

          try {
            await downloadFile(photo.src.landscape, dest);
            usedIds.add(photo.id);
            console.log(`    ✓ 0${destN}.jpg — "${query}" #${photo.id} by ${photo.photographer}`);
            imageCount++;
            totalDownloaded++;
            await sleep(150);
          } catch (err) {
            console.warn(`    ✗ Download failed: ${err.message}`);
          }
        }
      } catch (err) {
        console.warn(`    ✗ Search error for "${query}": ${err.message}`);
      }
    }

    console.log(`  → ${imageCount}/3 images for ${folderName}\n`);
  }

  console.log(`═══════════════════════════════════════`);
  console.log(`  Downloaded: ${totalDownloaded}  |  Skipped (existing): ${totalSkipped}`);
  console.log(`  Images saved to: public/images/products/`);
  console.log(`═══════════════════════════════════════\n`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
