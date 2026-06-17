/**
 * Pexels API integration for article cover images.
 * Searches by topic context (silo + sub-category) and downloads landscape photo.
 * Pexels license: free for commercial use, attribution not required.
 *
 * Requires: PEXELS_API_KEY in scripts/.env.local
 * Returns: image path string + credit info, or null if unavailable.
 */
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "articles");

// Maps sub-category slugs → English Pexels search terms
const SUB_QUERIES: Record<string, string> = {
  "tu-locker-chung-cu":          "apartment parcel delivery locker",
  "tu-locker-van-phong":         "modern office storage technology",
  "tu-locker-truong-hoc":        "university campus students locker",
  "tu-locker-truong-hoc-dai-hoc":"university campus students locker",
  "tu-locker-benh-vien":         "hospital medical storage cabinet",
  "tu-locker-benh-vien-y-te":    "hospital medical storage cabinet",
  "tu-locker-khach-san":         "hotel luggage storage travel",
  "tu-locker-khach-san-resort":  "hotel lobby luggage storage",
  "tu-locker-sieu-thi-banlẻ":    "supermarket self-service retail checkout",
  "tu-locker-ga-tau":            "train station platform travel luggage",
  "tu-locker-giao-nhan-hang":    "package delivery parcel locker",
  "tu-locker-kho-van":           "warehouse logistics delivery packages",
};

const SILO_QUERIES: Record<string, string> = {
  "may-ban-hang-tu-dong":  "vending machine technology modern",
  "tu-locker-thong-minh":  "smart locker storage technology",
  "giai-phap-kinh-doanh":  "business technology solution modern office",
};

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith("https") ? https : http;

    function doGet(targetUrl: string) {
      proto.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          doGet(res.headers.location!);
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      }).on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    doGet(url);
    file.on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

interface PexelsPhoto {
  id: number;
  photographer: string;
  photographer_url: string;
  src: { landscape: string };
  alt: string;
}

async function searchPexels(query: string, apiKey: string): Promise<PexelsPhoto | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&size=large`;

  const data = await new Promise<{ photos: PexelsPhoto[]; total_results: number }>((resolve, reject) => {
    https.get(url, { headers: { Authorization: apiKey } }, (res) => {
      let body = "";
      res.on("data", (c) => body += c);
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`Pexels parse error: ${body.slice(0, 100)}`)); }
      });
    }).on("error", reject);
  });

  return data.photos?.[0] ?? null;
}

export interface PexelsResult {
  imagePath: string;
  credit: string;
  creditUrl: string;
}

export async function fetchPexelsImage(
  slug: string,
  silo: string,
  sub?: string | null
): Promise<PexelsResult | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.log("  ℹ  PEXELS_API_KEY not set — using SVG");
    return null;
  }

  // Pick search query: sub-category takes priority, then silo, then generic fallback
  const query = (sub && SUB_QUERIES[sub]) || SILO_QUERIES[silo] || "smart locker technology storage";

  try {
    let photo = await searchPexels(query, apiKey);

    // Fallback: if sub-category query returns nothing, try silo query
    if (!photo && sub && SUB_QUERIES[sub]) {
      const fallbackQuery = SILO_QUERIES[silo] || "smart locker technology";
      console.log(`  ↩  Pexels: no results for "${query}", retrying with "${fallbackQuery}"`);
      photo = await searchPexels(fallbackQuery, apiKey);
    }

    if (!photo) {
      console.log(`  ⚠  Pexels: no results — using SVG`);
      return null;
    }

    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const destPath = path.join(PUBLIC_DIR, `${slug}.jpg`);
    await downloadFile(photo.src.landscape, destPath);
    console.log(`  📸 Pexels: saved photo by ${photo.photographer}`);

    return {
      imagePath: `/images/articles/${slug}.jpg`,
      credit: photo.photographer,
      creditUrl: photo.photographer_url,
    };
  } catch (err) {
    console.log(`  ⚠  Pexels error: ${err} — using SVG`);
    return null;
  }
}
