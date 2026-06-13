// Generates src/data/legacy-redirects.json mapping every URL of the old
// tsevending.com (WordPress) site - found via the Wayback Machine CDX index -
// to the closest equivalent page on the new site, so external backlinks and
// any residual Google rankings carry 301 authority to the new structure.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const slugs = fs
  .readFileSync(path.join(root, "scripts/legacy-urls.txt"), "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

// Paths that are pure WordPress/WooCommerce internals with no SEO value -
// skip them entirely (no redirect needed).
const SKIP = [
  /^\.well-known\//,
  /^ajax\//,
  /^wp-json/,
  /^xmlrpc\.php$/,
  /^img\//,
  /^uploads\//,
  /^vendor\//,
  /^wp-content\//,
  /^cart(-2)?$/,
  /^my-account-2/,
  /^wishlist$/,
  /^compare$/,
  /^tim-kiem$/,
  /^home-base$/,
  /^uncategorized$/,
  /^khac$/,
  /^7981-2$/,
  /^2020\/10\/12$/,
  /^en$/, // already redirected
  /^giao-thong-thong-minh$/, // already redirected

  // Old site paths that coincide with paths on the new site - redirecting
  // them would create a self-redirect loop and break the live page.
  /^lien-he$/,
  /^may-ban-hang-tu-dong$/,
  /^tin-tuc$/,
];

// Ordered rules - first match wins. Tested against the slug (lowercase).
const RULES = [
  // --- New dedicated article: vending machine placement guide ---
  [/^vi-tri-(dat|lap)-may-ban-hang|^vi-tri-lap-may-ban-hang-tu-dong|tieu-chi-lua-chon-diem-dat-may-ban-hang-tu-dong|^8-diem-dat-may-ban-hang-tu-dong-hai-ra-tien|lua-chon-vi-tri-toi-uu-cho-may-ban-hang-tu-dong|de-dang-trien-khai-may-ban-hang-tu-dong-o-nhieu-dia-diem/, "/tin-tuc/vi-tri-dat-may-ban-hang-tu-dong-hieu-qua-nhat"],

  // --- New dedicated article: AI / IoT remote management ---
  [/cong-nghe-ket-noi-internet-va-iot|cong-nghe-iot$|dieu-khien-tu-xa|phan-mem-quan-ly-may-ban-hang-tu-dong|giai-phap-ai|tinh-nang-moi.*ai|mo-hinh-ai|phan-tich-ai|tich-hop-tri-tue-nhan-tao|tinh-chinh-thuat-toan-ai|danh-gia-tac-dong-cua-ai|quan-ly-de-dang-voi-may-ban-hang-tu-dong/, "/tin-tuc/cong-nghe-ai-iot-quan-ly-may-ban-hang-tu-dong-tu-xa"],

  // --- New dedicated article: locker unlock technology comparison ---
  [/locker.*nhan-dien-khuon-mat|nhan-dien-khuon-mat.*locker|khoa-smart-locker-la-gi|cach-mo-khoa-tu-locker|co-nen-su-dung-o-khoa-tu-locker-khong|so-sanh-locker-thong-minh-va-locker-truyen-thong-dau-la-su-lua-chon-toi-uu/, "/tin-tuc/cong-nghe-mo-khoa-tu-locker-qr-rfid-van-tay-nhan-dien-khuon-mat"],

  // --- New dedicated article: smart locker for hotels / supermarkets / tourism ---
  [/locker.*(khach-san|sieu-thi|du-lich|du-khach|bai-bien|nha-ga|ben-tau)|(khach-san|sieu-thi|du-lich|du-khach|bai-bien|nha-ga|ben-tau).*locker|tu-smartlocker-cho-(khach-san|sieu-thi)/, "/tin-tuc/tu-locker-thong-minh-cho-khach-san-sieu-thi-khu-du-lich"],

  // --- New dedicated article: vending machine investment cost / ROI ---
  [/^chi-phi-dau-tu|^dau-tu-may-ban-hang-tu-dong|^co-hoi-dau-tu-may-ban-hang-tu-dong|^the\/co-hoi-dau-tu-may-ban-hang-tu-dong|^the\/dau-tu-may-ban-hang-tu-dong/, "/tin-tuc/chi-phi-dau-tu-may-ban-hang-tu-dong-bao-lau-hoan-von"],

  // --- Smart locker: shipper / delivery / logistics ---
  [/shipper|giao-nhan|tu-giao-nhan|tu-khoa-giao-nhan|tu-khoa-tu-dong.*giao-hang|locker.*giao-hang|locker-dien-tu/, "/tin-tuc/tu-locker-giao-nhan-hang-cho-shipper-logistics"],

  // --- Smart locker: apartment buildings ---
  [/chung-cu/, "/tu-locker-thong-minh/tu-locker-chung-cu"],

  // --- Smart locker: office / factory / access control / time-attendance / face recognition for security ---
  [/kiem-soat-vao-ra|cham-cong|nha-may|toa-nha|doanh-nghiep|co-quan|chinh-phu|van-phong/, "/tu-locker-thong-minh/tu-locker-van-phong"],

  // --- Smart locker: school / mall / gym / hotel / airport / tourism / supermarket (public storage) ---
  [/truong-hoc|gym|ho-boi|sieu-thi|khach-san|san-bay|du-lich|du-khach|bai-bien|nha-ga|ben-tau|trung-tam-the-thao/, "/tu-locker-thong-minh/tu-gui-do-thong-minh"],

  // --- General smart locker / face-recognition locker / locker hub ---
  [/locker|tu-smartlocker|tu-smart-locker|tu-dong-thong-minh-tl|tu-khoa-thong-minh-tl|tu-sach-thong-minh-tl|tu-thong-minh-smart/, "/tu-locker-thong-minh"],

  // --- Vending: beverages (water, soda, coffee, milk tea, juice) ---
  [/nuoc-|nuoc$|ca-phe|nuoc-mia|nuoc-cam|nuoc-trai-cay|nuoc-giai-khat/, "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat"],

  // --- Vending: snacks / food / masks / books / rice / noodles ---
  [/do-an-vat|do-an-nhanh|snack|banh-|khau-trang|mi-tu-dong|com-hop|sach-tu-dong|sach-doi-moi|my-pham/, "/may-ban-hang-tu-dong/may-ban-do-an-vat"],

  // --- Vending: cold / frozen / eggs / fruit-veg ---
  [/hang-lanh|dong-lanh|kem-tu-dong|trung-tu-dong|rau-cu|trai-cay/, "/may-ban-hang-tu-dong/may-ban-hang-lanh"],

  // --- Vending: gas ---
  [/may-ban-gas|ban-gas/, "/may-ban-hang-tu-dong/may-ban-gas"],

  // --- Vending: components / parts / accessories ---
  [/linh-kien|bo-mach|ban-phim|phu-tung|man-hinh-hien-thi|mam-khay/, "/may-ban-hang-tu-dong/linh-kien-phu-tung"],

  // --- Business / investment / cooperation models / cost / strategy ---
  [/kinh-doanh|dau-tu|hop-tac|chien-luoc|chi-phi|loi-nhuan|von|khoi-nghiep|tu-van/, "/giai-phap-kinh-doanh"],

  // --- Project case studies / installations ---
  [/^du-an/, "/tin-tuc"],

  // --- About / company info ---
  [/gioi-thieu-chung|ban-lanh-dao|co-cau-to-chuc|su-menh-tam-nhin|ve-chung-toi|chinh-sach|thong-tin-noi-bo/, "/gioi-thieu"],

  // --- Contact / services / repair / custom requests ---
  [/^dich-vu|^lien-he$|sua-chua|giai-phap-theo-yeu-cau|thiet-ke-may-ban-hang-theo-yeu-cau/, "/lien-he"],

  // --- Off-topic content-farm pages (laundry, fire alarm, security cameras, driving cabins, gas stations, parking, canteen, warehouse, PPE, kiosks unrelated to vending) ---
  [/giat-say|bao-chay|cabin|cay-xang|dem-xe|nha-ve-sinh-thong-minh|mo-phong-lai-xe|can-tin|kho-hang|tram-can|ppe|video-wall|camera|xam-nhap|an-ninh|thuc-te-ao|hoi-cho-ao|3d|menu-thong-minh|seal-container|giam-sat/, "/"],

  // --- News / blog index / misc taxonomy ---
  [/^tin-tuc$|^blog$|^portfolio$|^testimonial$|kenh-tiktok|^the\/|^tu-khoa-san-pham\//, "/tin-tuc"],

  // --- Product category pages ---
  [/danh-muc-san-pham\/tu-thong-minh-smart-locker/, "/tu-locker-thong-minh"],
  [/danh-muc-san-pham\/linh-kien-may-ban-hang-tu-dong/, "/may-ban-hang-tu-dong/linh-kien-phu-tung"],
  [/danh-muc-san-pham/, "/may-ban-hang-tu-dong"],

  // --- Individual product pages (san-pham/*) ---
  [/^san-pham\/.*(smart-locker|tu-khoa|tu-sach|tu-dong-thong-minh-tl)/, "/tu-locker-thong-minh"],
  [/^san-pham\/.*nuoc-cam/, "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat"],
  [/^san-pham\/.*khau-trang|^san-pham\/.*sach-tu-dong|^san-pham\/.*sach-3d/, "/may-ban-hang-tu-dong/may-ban-do-an-vat"],
  [/^san-pham\//, "/may-ban-hang-tu-dong"],

  // --- Generic vending machine pages (anything left mentioning may-ban / vending) ---
  [/may-ban|vending|tse-v|kiosk|gia-may/, "/may-ban-hang-tu-dong"],
];

// Explicit overrides for slugs that don't fit any pattern rule above.
const MANUAL = {
  "bai-giu-xe-thong-minh": "/",
  "bo-nhan-va-tra-lai-tien-thua-1-menh-gia-brv-ict": "/may-ban-hang-tu-dong/linh-kien-phu-tung",
  "bo-nhan-va-tra-lai-tien-thua-1-menh-gia-nv-11": "/may-ban-hang-tu-dong/linh-kien-phu-tung",
  "cac-nha-sang-lap-va-cong-ty-tien-phong-trong-linh-vuc-nay": "/may-ban-hang-tu-dong",
  "dieu-chinh-theo-nhu-cau-cua-khach-hang-tao-ra-gia-tri-va-duy-tri-su-canh-tranh": "/giai-phap-kinh-doanh",
  "gang-tay-vinyl": "/",
  "he-thong-kiem-tra-xuat-nhap-kho-va-can-tai-hang-hoa-toi-uu-hoa-van-chuyen-va-quan-ly-don-hang": "/",
  "kha-nang-tuong-thich-voi-moi-truong-xung-quanh-yeu-to-quyet-dinh-trong-quan-ly-van-hanh": "/may-ban-hang-tu-dong",
  "kios-ban-ve-thanh-toan-tu-dong": "/may-ban-hang-tu-dong",
  "may-choi-game-tang-qua-tu-dong-tse": "/may-ban-hang-tu-dong",
  "nang-cao-tien-ich-cong-dong": "/may-ban-hang-tu-dong",
  "sach-3d-ung-dung-cong-nghe-ar": "/",
  "san-pham": "/may-ban-hang-tu-dong",
  "san-pham-khac": "/may-ban-hang-tu-dong",
  services: "/lien-he",
  "tac-gia/sudo": "/tin-tuc",
  "thi-truong-toan-cau-tinh-hinh-hien-tai-va-xu-huong-phat-trien": "/may-ban-hang-tu-dong",
  "thong-tin-can-biet-ve-kios-thanh-toan-tu-dong-cho-bai-gui-xe-hieu-qua-va-nhanh-chong": "/",
  "tu-gui-do-thong-minh-la-gi": "/tu-locker-thong-minh/tu-gui-do-thong-minh",
  "tu-khoa-tu-dong-thong-minh": "/tin-tuc",
  "van-de-ve-sinh-yeu-to-quan-trong-trong-quan-ly-va-van-hanh": "/giai-phap-kinh-doanh",
};

const redirects = [];
const skipped = [];
const unmatched = [];

for (const slug of slugs) {
  if (SKIP.some((re) => re.test(slug))) {
    skipped.push(slug);
    continue;
  }

  const rule = RULES.find(([re]) => re.test(slug));
  const destination = MANUAL[slug] ?? (rule ? rule[1] : null);

  if (!destination) {
    unmatched.push(slug);
    continue;
  }

  redirects.push({
    source: `/${slug}`,
    destination,
    permanent: true,
  });
}

fs.writeFileSync(
  path.join(root, "src/data/legacy-redirects.json"),
  JSON.stringify(redirects, null, 2) + "\n"
);

console.log(`Total slugs:    ${slugs.length}`);
console.log(`Redirects:      ${redirects.length}`);
console.log(`Skipped (WP):   ${skipped.length}`);
console.log(`Unmatched:      ${unmatched.length}`);
if (unmatched.length) {
  console.log("\nUnmatched slugs:");
  for (const s of unmatched) console.log("  " + s);
}
