/**
 * Re-download Pexels images for articles whose imageAlt clearly doesn't match content.
 * Also fixes imageAlt to use the article title (not Pexels photo description).
 * Run: cd d:\vba\tsevending && npx tsx scripts/fix-wrong-images.ts
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

// slug → { query, imageAlt (use article title) }
const TARGETS: Record<string, { query: string; imageAlt: string }> = {
  "du-bao-thi-truong-vending-machine-2027-2030": {
    query: "vending machine technology market growth",
    imageAlt: "Dự báo thị trường vending machine 2027–2030: xu hướng tăng trưởng và cơ hội đầu tư",
  },
  "may-ban-hang-tu-dong-chung-cu-dich-vu-tien-ich": {
    query: "apartment building lobby automated service machine",
    imageAlt: "Máy bán hàng tự động tại chung cư — dịch vụ tiện ích 24/7 cho cư dân",
  },
  "may-ban-hang-tu-dong-thuc-pham-lanh-manh-xu-huong-my-va-anh": {
    query: "healthy food vending machine modern",
    imageAlt: "Xu hướng thực phẩm lành mạnh trong máy bán hàng tự động tại Mỹ và Anh",
  },
  "so-sanh-tu-locker-thong-minh-va-tu-gui-do-truyen-thong-tai-chung-cu": {
    query: "apartment locker storage parcel delivery",
    imageAlt: "So sánh tủ locker thông minh và tủ gửi đồ truyền thống tại chung cư",
  },
  "thi-truong-may-ban-hang-tu-dong-viet-nam-xu-huong-phat-trien-2026": {
    query: "vending machine modern retail technology",
    imageAlt: "Thị trường máy bán hàng tự động Việt Nam: xu hướng phát triển 2026",
  },
  "thi-truong-vending-machine-an-do-bung-no": {
    query: "India retail technology automated machine",
    imageAlt: "Thị trường vending machine Ấn Độ bùng nổ: cơ hội đầu tư mới",
  },
  "thi-truong-vending-machine-chau-phi-co-hoi-moi": {
    query: "Africa urban retail technology market",
    imageAlt: "Thị trường vending machine châu Phi: cơ hội mới cho nhà đầu tư",
  },
  "thi-truong-vending-machine-dong-nam-a-2026": {
    query: "Southeast Asia modern retail technology city",
    imageAlt: "Thị trường vending machine Đông Nam Á 2026: tiềm năng và xu hướng",
  },
  "thi-truong-vending-machine-trung-dong-uae": {
    query: "Dubai UAE modern retail automated technology",
    imageAlt: "Thị trường vending machine Trung Đông và UAE: tăng trưởng mạnh mẽ",
  },
  "tu-locker-chung-cu-nhan-buu-kien-parcel": {
    query: "apartment parcel locker package delivery",
    imageAlt: "Tủ locker thông minh tại chung cư nhận bưu kiện hộ cư dân 24/7",
  },
  "tu-locker-thong-minh-chung-cu-giai-phap-nhan-ho-hang": {
    query: "smart parcel locker apartment building",
    imageAlt: "Tủ locker thông minh chung cư: giải pháp nhận hộ hàng không cần bảo vệ",
  },
  "tu-locker-thong-minh-chung-cu-nhan-hang": {
    query: "smart locker parcel delivery residential building",
    imageAlt: "Tủ locker thông minh chung cư nhận hàng — giải pháp logistics cuối chặng",
  },
  "tu-locker-thong-minh-va-bai-toan-an-ninh-chung-cu-cao-tang": {
    query: "apartment high rise building security access control",
    imageAlt: "Tủ locker thông minh và bài toán an ninh chung cư cao tầng",
  },
  "tu-locker-y-te-nha-thuoc-tu-dong-xu-huong-moi": {
    query: "pharmacy healthcare automated dispensing cabinet",
    imageAlt: "Tủ locker y tế và nhà thuốc tự động: xu hướng mới trong ngành dược",
  },
  "vending-machine-cho-doanh-nghiep-b2b-co-hoi-thi-truong-lon": {
    query: "business office vending machine B2B modern",
    imageAlt: "Vending machine cho doanh nghiệp B2B: cơ hội thị trường lớn",
  },
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

async function pexelsSearch(query: string, page = 1): Promise<{ id: number; photographer: string; src: { landscape: string } }[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&page=${page}&size=large`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: PEXELS_KEY } }, res => {
      let body = "";
      res.on("data", c => (body += c));
      res.on("end", () => {
        try {
          const data = JSON.parse(body) as { photos?: typeof resolve extends (v: infer R) => void ? R : never };
          resolve((data as { photos: { id: number; photographer: string; src: { landscape: string } }[] }).photos ?? []);
        } catch(e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function updateFrontmatter(slug: string, imagePath: string, imageAlt: string, credit: string) {
  const fp = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) { console.log(`  ⚠ Not found: ${slug}.md`); return; }
  let raw = fs.readFileSync(fp, "utf8");
  raw = raw.replace(/^image:.*\n/m, "").replace(/^imageAlt:.*\n/m, "").replace(/^imageCredit:.*\n/m, "");
  raw = raw.replace(/^(---\n[\s\S]*?)(date:.*\n)/m,
    `$1$2image: "${imagePath}"\nimageAlt: "${imageAlt}"\nimageCredit: "Photo by ${credit} on Pexels"\n`
  );
  fs.writeFileSync(fp, raw, "utf8");
  console.log(`  ✅ Updated: ${slug}`);
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const usedIds = new Set<number>();

  for (const [slug, { query, imageAlt }] of Object.entries(TARGETS)) {
    console.log(`\n📸 ${slug}`);
    console.log(`   Query: "${query}"`);

    let done = false;
    for (const page of [1, 2, 3]) {
      const photos = await pexelsSearch(query, page);
      const photo = photos.find(p => !usedIds.has(p.id));
      if (!photo) { console.log(`   ↩  page ${page}: no unique photo`); continue; }
      usedIds.add(photo.id);
      const dest = path.join(IMAGES_DIR, `${slug}.jpg`);
      try {
        await downloadFile(photo.src.landscape, dest);
        console.log(`   ✔  #${photo.id} by ${photo.photographer}`);
        updateFrontmatter(slug, `/images/articles/${slug}.jpg`, imageAlt, photo.photographer);
        done = true;
        break;
      } catch(e) { console.error(`   ✗  ${e}`); }
    }
    if (!done) console.warn(`   ⚠  Skipped`);
    await sleep(350);
  }
  console.log("\n✅ All done.");
}

main().catch(console.error);
