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
  "tu-locker-chung-cu":           "apartment parcel delivery locker",
  "tu-locker-van-phong":          "modern office storage technology",
  "tu-locker-truong-hoc":         "university campus students locker",
  "tu-locker-truong-hoc-dai-hoc": "university campus students locker",
  "tu-locker-benh-vien":          "hospital medical storage cabinet",
  "tu-locker-benh-vien-y-te":     "hospital medical storage cabinet",
  "tu-locker-khach-san":          "hotel luggage storage travel",
  "tu-locker-khach-san-resort":   "hotel lobby luggage storage",
  "tu-locker-sieu-thi-banle":     "supermarket self-service retail checkout",
  "tu-locker-ga-tau":             "train station platform travel luggage",
  "tu-locker-giao-nhan-hang":     "package delivery parcel locker",
  "tu-locker-kho-van":            "warehouse logistics delivery packages",
  "may-ban-nuoc":                 "vending machine drinks beverages",
  "may-ban-ca-phe":               "coffee vending machine office",
  "may-ban-thuc-pham":            "food vending machine snack",
  "may-ban-snack":                "snack vending machine",
};

const SILO_QUERIES: Record<string, string> = {
  "may-ban-hang-tu-dong":  "vending machine technology modern",
  "tu-locker-thong-minh":  "smart locker storage technology",
  "giai-phap-kinh-doanh":  "business technology solution modern office",
};

// Fallback pool when primary queries exhaust unique photos
const FALLBACK_QUERIES = [
  "modern technology storage",
  "smart city technology",
  "automated retail machine",
  "package delivery service",
  "digital locker security",
];

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

async function searchPexels(
  query: string,
  apiKey: string,
  page = 1
): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&page=${page}&size=large`;

  const data = await new Promise<{ photos: PexelsPhoto[]; total_results: number }>((resolve, reject) => {
    https.get(url, { headers: { Authorization: apiKey } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Pexels parse error: ${body.slice(0, 100)}`));
        }
      });
    }).on("error", reject);
  });

  return data.photos ?? [];
}

// Pick the first photo not already used in this run or saved on disk
function pickUniquePhoto(
  photos: PexelsPhoto[],
  usedPhotoIds: Set<number>
): PexelsPhoto | null {
  for (const photo of photos) {
    if (!usedPhotoIds.has(photo.id)) return photo;
  }
  return null;
}

export interface PexelsResult {
  imagePath: string;
  credit: string;
  creditUrl: string;
  photoId: number;
}

export async function fetchPexelsImage(
  slug: string,
  silo: string,
  sub: string | null | undefined,
  usedPhotoIds: Set<number> = new Set()
): Promise<PexelsResult | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.log("  ℹ  PEXELS_API_KEY not set — using SVG");
    return null;
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const primaryQuery = (sub && SUB_QUERIES[sub]) || SILO_QUERIES[silo] || "smart locker technology storage";
  const siloQuery = SILO_QUERIES[silo] || "smart locker technology";

  const queriesToTry = [primaryQuery];
  if (primaryQuery !== siloQuery) queriesToTry.push(siloQuery);
  queriesToTry.push(...FALLBACK_QUERIES);

  try {
    for (const query of queriesToTry) {
      // Try page 1 then page 2 to get more variety
      for (const page of [1, 2]) {
        const photos = await searchPexels(query, apiKey, page);
        const photo = pickUniquePhoto(photos, usedPhotoIds);
        if (photo) {
          const destPath = path.join(PUBLIC_DIR, `${slug}.jpg`);
          await downloadFile(photo.src.landscape, destPath);
          console.log(`  📸 Pexels: "${query}" p${page} → photo #${photo.id} by ${photo.photographer}`);
          return {
            imagePath: `/images/articles/${slug}.jpg`,
            credit: photo.photographer,
            creditUrl: photo.photographer_url,
            photoId: photo.id,
          };
        }
        console.log(`  ↩  All photos from "${query}" p${page} already used — trying next`);
      }
    }

    console.log("  ⚠  Pexels: no unique photos found — using SVG");
    return null;
  } catch (err) {
    console.log(`  ⚠  Pexels error: ${err} — using SVG`);
    return null;
  }
}
