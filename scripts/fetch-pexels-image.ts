/**
 * Pexels API integration for article cover images.
 * Uses topic-specific queries to get relevant, logo-free photos.
 * Pexels license: free for commercial use, no attribution required.
 *
 * Requires: PEXELS_API_KEY in scripts/.env.local
 */
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "articles");

// Sub-category → Pexels query.
// Use scenario/environment shots, NOT branded product close-ups (avoids logos, phone numbers).
const SUB_QUERIES: Record<string, string> = {
  // ── Smart Locker sub-categories ──────────────────────────────
  "tu-locker-chung-cu":                "apartment building parcel locker residents",
  "tu-locker-van-phong":               "modern office storage corridor lockers",
  "tu-gui-do-thong-minh":             "luggage storage travel station self-service",
  "tu-locker-giao-nhan-hang":         "parcel delivery package locker building",
  "tu-locker-truong-hoc":             "university campus students studying hallway",
  "tu-locker-truong-hoc-dai-hoc":     "university campus students technology hallway",
  "tu-locker-benh-vien":              "hospital corridor medical staff clean",
  "tu-locker-benh-vien-y-te":         "hospital lobby healthcare modern interior",
  "tu-locker-khach-san":              "hotel lobby interior elegant service",
  "tu-locker-khach-san-resort":       "resort hotel tropical luggage concierge",
  "tu-locker-sieu-thi-banle":         "supermarket retail interior modern shopping",
  "tu-locker-ga-tau":                  "train station platform travel suitcase",
  "tu-locker-kho-van":                 "warehouse logistics packages storage shelves",
  // ── Vending Machine sub-categories ───────────────────────────
  "may-ban-nuoc-giai-khat":            "refreshing drinks beverages cold machine",
  "may-ban-do-an-vat":                 "snacks food kiosk modern retail",
  "may-ban-hang-lanh":                 "cold beverage refrigerator modern",
  "may-ban-gas":                       "gas cylinder storage industrial safety",
  "linh-kien-phu-tung":               "electronics components circuit board workshop",
  "may-ban-nuoc":                      "water dispensing machine clean modern",
  "may-ban-ca-phe":                    "coffee machine barista office modern",
  "may-ban-thuc-pham":                 "fresh food healthy meal kiosk",
  "may-ban-snack":                     "snack dispenser machine modern",
  // ── Special / other ──────────────────────────────────────────
  "cong-nghe-locker":                  "digital access control panel keypad security",
  "tinh-nang-locker":                  "smartphone app mobile access control",
  "chat-lieu-locker":                  "metal cabinet industrial strong durable",
  "bao-mat-locker":                    "cybersecurity data protection digital lock",
  "doanh-nghiep":                      "corporate business meeting office team",
  "giai-phap-nha-o":                   "apartment residential building exterior",
  "giai-phap-do-thi":                  "smart city urban technology skyline",
  "ung-dung-dac-biet":                 "technology innovation automated machine",
  "xu-huong":                          "future technology innovation smart city",
  "thuong-hieu-locker":               "product comparison storage lockers rows",
  "huong-dan-su-dung":                 "instructions guide installation technician",
  "mo-hinh-kinh-doanh":               "business model investment revenue chart",
  "ky-thuat":                          "technical engineering equipment installation",
  "luat-phap":                         "legal document office business law",
  "may-ban-thanh-toan":               "contactless payment terminal mobile digital",
  "may-ban-quan-ly":                   "data analytics dashboard monitoring screen",
};

const SILO_QUERIES: Record<string, string> = {
  "may-ban-hang-tu-dong":  "automated retail kiosk modern interior",
  "tu-locker-thong-minh":  "smart locker system storage modern building",
  "giai-phap-kinh-doanh":  "business solution technology office modern",
};

// Topic keyword patterns → more specific queries
const TOPIC_QUERIES: Array<{ pattern: RegExp; query: string }> = [
  // ── Locations / sectors ───────────────────────────────────────────────────────
  { pattern: /chung cư|apartment|cư dân|dân cư/i,            query: "modern apartment building lobby interior" },
  { pattern: /văn phòng|office/i,                            query: "modern office interior workspace professional" },
  { pattern: /bệnh viện|y tế|healthcare|hospital/i,          query: "hospital hallway modern medical interior" },
  { pattern: /khách sạn|resort|hotel/i,                      query: "hotel lobby luxury interior hospitality" },
  { pattern: /trường học|đại học|sinh viên|campus/i,         query: "university campus students modern building" },
  { pattern: /siêu thị|bán lẻ|retail|shopping/i,            query: "supermarket retail interior shopping customers" },
  { pattern: /giao nhận|shipper|delivery|bưu kiện/i,         query: "parcel delivery courier logistics packages" },
  { pattern: /sân bay|airport|hàng không/i,                  query: "airport terminal travel luggage interior" },
  { pattern: /ga tàu|bến xe|station|metro/i,                 query: "train station platform commuters travel" },
  { pattern: /gym|thể thao|thể dục|fitness/i,                query: "gym fitness center exercise modern" },
  { pattern: /spa|yoga|thiền|wellness/i,                     query: "yoga studio wellness meditation room" },
  { pattern: /nhà hàng|F&B|restaurant|ẩm thực/i,            query: "restaurant modern interior food service" },
  { pattern: /dược phẩm|pharmacy|thuốc/i,                    query: "pharmacy medical cabinet medicine storage" },
  { pattern: /chăm sóc|nursing|elderly|cao tuổi/i,           query: "elderly care senior nursing home interior" },
  { pattern: /trung tâm thương mại|mall|mua sắm/i,           query: "shopping mall modern retail interior escalator" },
  { pattern: /sân golf|golf/i,                               query: "golf course green sport clubhouse" },
  { pattern: /pickleball|tennis|bóng đá|sport/i,             query: "sports court outdoor recreation modern" },
  { pattern: /sân khấu|biểu diễn|nghệ thuật|concert/i,      query: "theater stage performance arts venue" },
  { pattern: /cảng|hàng hải|tàu biển|thủy thủ/i,            query: "harbor port ship marine logistics" },
  { pattern: /nhà thờ|chùa|tôn giáo|thánh thất/i,           query: "church temple spiritual community building" },
  { pattern: /làng nghề|thủ công|craft|truyền thống/i,       query: "traditional craft workshop artisan handmade" },
  { pattern: /khu công nghiệp|nhà máy|factory|sản xuất/i,    query: "factory industrial modern manufacturing" },
  { pattern: /xây dựng|công trình|construction|hạ tầng/i,    query: "construction site workers tools equipment" },
  { pattern: /nhà tù|giam giữ|prison|detention/i,            query: "correctional facility security professional" },
  { pattern: /giàn khoan|offshore|tàu biển|dầu khí/i,        query: "offshore oil rig industrial workers safety" },
  { pattern: /làng nghề|du lịch sinh thái|eco tourism/i,     query: "ecotourism nature green sustainable travel" },
  { pattern: /khu đô thị|urban|đô thị|thành phố/i,          query: "smart city urban modern architecture aerial" },
  { pattern: /khu công nghệ cao|tech park|silicon/i,         query: "tech park modern office campus architecture" },
  { pattern: /cai nghiện|phục hồi|rehabilitation/i,          query: "healthcare rehabilitation center modern clean" },
  // ── Smart locker special topics ───────────────────────────────────────────────
  { pattern: /IP65|ngoài trời|outdoor locker|chống thấm/i,   query: "outdoor weatherproof metal cabinet durable" },
  { pattern: /kết nối API|BMS|tòa nhà thông minh|EAM/i,      query: "building management system digital automation" },
  { pattern: /đa tầng|đa tòa|tập đoàn|enterprise/i,         query: "corporate headquarters modern glass building" },
  { pattern: /phòng thử|thời trang|fashion|quần áo/i,        query: "fashion retail dressing room boutique modern" },
  { pattern: /phòng thủ|trang phục|locker phòng thay đồ/i,   query: "locker room sports changing room modern clean" },
  { pattern: /pháp lý|luật sư|công chứng|hồ sơ/i,           query: "law office document filing legal professional" },
  { pattern: /nhật bản|japan|hàn quốc|korea|châu á|asia/i,  query: "japan korea asia modern technology urban city" },
  { pattern: /freelancer|làm việc từ xa|remote work/i,       query: "remote work coworking space laptop modern" },
  { pattern: /call center|chăm sóc khách hàng/i,             query: "call center customer service headset office" },
  { pattern: /HACCP|thực phẩm|food safety|vệ sinh/i,        query: "food processing hygiene clean industrial kitchen" },
  { pattern: /điện tử|linh kiện|semiconductor|chip/i,        query: "electronics manufacturing circuit board precision" },
  { pattern: /xe đạp|xe máy điện|bike sharing/i,            query: "electric bicycle bike sharing urban station" },
  { pattern: /locker công cộng|đô thị thông minh/i,          query: "smart city public service urban kiosk modern" },
  { pattern: /cybersecurity|hack|bảo mật dữ liệu|GDPR/i,    query: "cybersecurity data protection digital security" },
  { pattern: /ISO|CE|chứng nhận|tiêu chuẩn|certification/i, query: "quality certificate standard inspection professional" },
  { pattern: /lắp đặt|installation|kỹ thuật|kỹ sư/i,        query: "technician installation engineering equipment" },
  { pattern: /bảo trì|maintenance|sửa chữa|sự cố/i,         query: "maintenance technician repair service professional" },
  { pattern: /LEED|xanh|green building|bền vững|eco/i,       query: "green building sustainable eco architecture" },
  { pattern: /thể dục|locker gym|swimming|bể bơi/i,          query: "swimming pool gym locker room modern sports" },
  { pattern: /thể thao chuyên nghiệp|thi đấu|đội bóng/i,    query: "professional sports team locker room athlete" },
  { pattern: /maker|3D|in 3D|sáng tạo|coworking/i,          query: "3D printing makerspace innovation lab technology" },
  { pattern: /nhập khẩu|nội địa|so sánh thương hiệu/i,      query: "product comparison quality inspection storage" },
  { pattern: /phần mềm|software|app|quản lý/i,              query: "software dashboard analytics management screen" },
  { pattern: /hợp đồng|đặt hàng|mua sắm|procurement/i,      query: "business contract signing procurement office" },
  // ── Vending machine topics ────────────────────────────────────────────────────
  { pattern: /thực phẩm|ăn vặt|food|snack/i,               query: "healthy food snacks fresh modern kitchen" },
  { pattern: /cà phê|coffee/i,                              query: "coffee shop barista beans modern" },
  { pattern: /nước giải khát|beverage|đồ uống/i,            query: "refreshing drink beverage cold modern kiosk" },
  { pattern: /chiến lược|định giá|pricing|doanh thu/i,      query: "business strategy pricing revenue growth office" },
  { pattern: /lỗi|sự cố|xử lý|vận hành|operation/i,        query: "technical troubleshooting maintenance equipment" },
  { pattern: /lợi nhuận|ROI|đầu tư|phân tích tài chính/i,  query: "business investment financial analysis chart" },
  { pattern: /thương hiệu|branding|marketing|brand/i,       query: "branding marketing creative agency office" },
  // ── Generic tech/business fallbacks ──────────────────────────────────────────
  { pattern: /ROI|đầu tư|lợi nhuận|revenue/i,              query: "business investment financial growth chart" },
  { pattern: /AI|machine learning|trí tuệ nhân tạo/i,      query: "artificial intelligence technology data future" },
  { pattern: /IoT|kết nối|internet|smart/i,                 query: "smart home IoT connected technology devices" },
  { pattern: /môi trường|xanh|green|ESG|bền vững/i,        query: "sustainable green energy technology environment" },
  { pattern: /thanh toán|payment|QR|ví điện tử/i,          query: "digital payment contactless mobile transaction" },
  { pattern: /ngoài trời|outdoor|công viên|park/i,          query: "outdoor park urban modern architecture" },
  { pattern: /kho|warehouse|logistics/i,                    query: "warehouse logistics modern storage facility" },
  { pattern: /an ninh|bảo mật|security|camera/i,            query: "security system access control technology" },
  { pattern: /doanh nghiệp|công ty|tập đoàn|enterprise/i,  query: "corporate business team meeting office modern" },
  { pattern: /biển|beach|du lịch|tourism/i,                 query: "beach resort tropical vacation hotel" },
];

// Fallback pool
const FALLBACK_QUERIES = [
  "smart technology modern office interior",
  "digital automated machine retail",
  "storage facility modern clean interior",
  "technology innovation business solution",
  "modern building interior service desk",
];

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith("https") ? https : http;
    function doGet(targetUrl: string) {
      proto.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { file.close(); doGet(res.headers.location!); return; }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    }
    doGet(url);
    file.on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

interface PexelsPhoto {
  id: number;
  photographer: string;
  photographer_url: string;
  src: { landscape: string };
  alt: string;
}

async function searchPexels(query: string, apiKey: string, page = 1): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&page=${page}&size=large`;
  const data = await new Promise<{ photos: PexelsPhoto[] }>((resolve, reject) => {
    https.get(url, { headers: { Authorization: apiKey } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`Pexels parse error: ${body.slice(0, 100)}`)); }
      });
    }).on("error", reject);
  });
  return data.photos ?? [];
}

function pickUniquePhoto(photos: PexelsPhoto[], usedPhotoIds: Set<number>): PexelsPhoto | null {
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
  usedPhotoIds: Set<number> = new Set(),
  topicTitle?: string
): Promise<PexelsResult | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) { console.log("  ℹ  PEXELS_API_KEY not set — using SVG"); return null; }
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  // Build query list from most specific to least specific
  const queriesToTry: string[] = [];

  // 1. Match topic title against semantic patterns (most specific)
  if (topicTitle) {
    for (const { pattern, query } of TOPIC_QUERIES) {
      if (pattern.test(topicTitle)) {
        queriesToTry.push(query);
        break;
      }
    }
  }

  // 2. Sub-category query
  const subQ = sub ? SUB_QUERIES[sub] : undefined;
  if (subQ && !queriesToTry.includes(subQ)) queriesToTry.push(subQ);

  // 3. Silo fallback
  const siloQ = SILO_QUERIES[silo];
  if (siloQ && !queriesToTry.includes(siloQ)) queriesToTry.push(siloQ);

  // 4. Generic fallbacks
  for (const f of FALLBACK_QUERIES) {
    if (!queriesToTry.includes(f)) queriesToTry.push(f);
  }

  try {
    for (const query of queriesToTry) {
      for (const page of [1, 2, 3]) {
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
