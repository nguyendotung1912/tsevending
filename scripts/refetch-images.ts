/**
 * Re-fetch Pexels images for articles that received generic images.
 * Targets specific sub-categories known to have poor image queries.
 *
 * Run: node_modules/.bin/tsx scripts/refetch-images.ts
 * Options: REFETCH_SUBS=ung-dung-dac-biet,xu-huong,doanh-nghiep (default)
 *          REFETCH_LIMIT=20 (max articles to process, default=all)
 *          DRY_RUN=1 (list without downloading)
 */
import fs from "fs";
import path from "path";
import { fetchPexelsImage } from "./fetch-pexels-image";

const DOTENV_PATH = path.join("scripts", ".env.local");
if (fs.existsSync(DOTENV_PATH)) {
  for (const line of fs.readFileSync(DOTENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const ROOT = path.join(__dirname, "..");
const CALENDAR_PATH = path.join(ROOT, "scripts", "content-calendar.json");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

// Subs already done in previous batch — skip them
const ALREADY_DONE_SUBS = new Set([
  "ung-dung-dac-biet", "xu-huong", "doanh-nghiep", "niche-product", "nganh-niche",
]);

// Topic patterns that yield better images than sub-category (mirrors TOPIC_QUERIES in fetch-pexels-image.ts)
const TOPIC_PATTERNS: RegExp[] = [
  /chung cư|apartment|cư dân/i,
  /văn phòng|office/i,
  /bệnh viện|y tế|hospital/i,
  /khách sạn|resort|hotel/i,
  /trường học|đại học|sinh viên/i,
  /siêu thị|bán lẻ|retail|shopping/i,
  /giao nhận|shipper|delivery|bưu kiện/i,
  /sân bay|airport|hàng không/i,
  /ga tàu|bến xe|station|metro/i,
  /gym|thể thao|thể dục|fitness/i,
  /spa|yoga|wellness/i,
  /nhà hàng|restaurant|F&B/i,
  /dược phẩm|pharmacy|thuốc/i,
  /cai nghiện|phục hồi|rehabilitation/i,
  /trung tâm thương mại|mall/i,
  /sân khấu|biểu diễn|nghệ thuật/i,
  /cảng|hàng hải|tàu biển|thủy thủ/i,
  /nhà thờ|chùa|tôn giáo/i,
  /làng nghề|thủ công|craft/i,
  /khu công nghiệp|nhà máy|factory|sản xuất/i,
  /xây dựng|công trình|construction/i,
  /nhà tù|giam giữ|prison/i,
  /giàn khoan|offshore|dầu khí/i,
  /IP65|ngoài trời|outdoor locker|chống thấm/i,
  /BMS|EAM|tòa nhà thông minh/i,
  /đa tầng|đa tòa|tập đoàn lớn|enterprise/i,
  /phòng thử|thời trang|fashion|quần áo/i,
  /pháp lý|luật sư|công chứng|hồ sơ/i,
  /nhật bản|japan|hàn quốc|korea|châu á/i,
  /freelancer|làm việc từ xa|remote/i,
  /call center|chăm sóc khách hàng/i,
  /HACCP|food safety|vệ sinh an toàn/i,
  /điện tử|linh kiện|semiconductor|chip/i,
  /xe đạp|xe máy điện|bike sharing/i,
  /cybersecurity|hack|bảo mật dữ liệu|GDPR/i,
  /ISO|CE|chứng nhận|tiêu chuẩn/i,
  /lắp đặt|installation|kỹ thuật|kỹ sư/i,
  /bảo trì|maintenance|sửa chữa|sự cố/i,
  /LEED|green building|bền vững|eco/i,
  /gym|bể bơi|swimming/i,
  /maker|in 3D|makerspace|sáng tạo/i,
  /nhập khẩu|nội địa|so sánh thương hiệu/i,
  /phần mềm|software|app|dashboard/i,
  /hợp đồng|đặt hàng|mua sắm/i,
  /cà phê|coffee/i,
  /thực phẩm|ăn vặt|food|snack/i,
  /chiến lược|định giá|pricing|branding/i,
  /lỗi|sự cố|xử lý|vận hành/i,
  /lợi nhuận|ROI|đầu tư|tài chính/i,
  /AI|machine learning|trí tuệ nhân tạo/i,
  /IoT|kết nối|internet of things/i,
  /môi trường|xanh|ESG|bền vững/i,
  /thanh toán|payment|QR code/i,
  /kho|warehouse|logistics/i,
  /an ninh|bảo mật|security/i,
  /biển|beach|du lịch sinh thái/i,
  /chăm sóc|elderly|cao tuổi/i,
];

async function main() {
  const calendar = JSON.parse(fs.readFileSync(CALENDAR_PATH, "utf8"));
  const limit = parseInt(process.env.REFETCH_LIMIT || "999");
  const dryRun = process.env.DRY_RUN === "1";
  const allSubs = process.env.REFETCH_ALL === "1"; // re-fetch ALL articles

  // Mode: if REFETCH_ALL=1 → all published; else → only articles where topic matches patterns AND sub wasn't already done
  const targets = calendar.filter((i: { status: string; sub: string | null; publishedSlug?: string; topic?: string }) => {
    if (i.status !== "published" || !i.publishedSlug) return false;
    if (allSubs) return true;
    // Skip already-done subs from previous batch
    if (ALREADY_DONE_SUBS.has(i.sub ?? "")) return false;
    // Only re-fetch if topic matches a pattern (topic-based query > sub query)
    const topic = (i as { topic?: string }).topic ?? "";
    return TOPIC_PATTERNS.some(p => p.test(topic));
  }).slice(0, limit);

  console.log(`📋 Articles to re-fetch: ${targets.length} (mode: ${allSubs ? "ALL" : "topic-pattern match, excluding already-done subs"})`);
  if (dryRun) { console.log("DRY RUN — no downloads"); targets.forEach((i: { topic: string; sub: string; publishedSlug: string }) => console.log(`  ${i.sub} | ${i.publishedSlug} | ${i.topic}`)); return; }

  const usedPhotoIds = new Set<number>();
  let ok = 0, fail = 0;

  for (const item of targets) {
    const slug = item.publishedSlug!;
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(mdPath)) { console.log(`  ⚠ File not found: ${slug}.md`); continue; }

    console.log(`\n  🖼  [${item.sub}] "${item.topic}"`);

    const pexels = await fetchPexelsImage(slug, item.silo, item.sub ?? null, usedPhotoIds, item.topic);
    if (!pexels) { console.log(`  ⚠  No Pexels image found`); fail++; continue; }

    usedPhotoIds.add(pexels.photoId);

    // Update image in the .md file
    let content = fs.readFileSync(mdPath, "utf8");
    const oldImg = content.match(/^image:\s*"([^"]+)"/m)?.[1] ?? "";
    content = content.replace(/^(image:\s*)"[^"]*"/m, `$1"${pexels.imagePath}"`);
    // Update or insert imageCredit
    if (content.match(/^imageCredit:/m)) {
      content = content.replace(/^(imageCredit:.*)/m, `imageCredit: "Photo by ${pexels.credit} on Pexels"`);
    } else {
      content = content.replace(/^(imageAlt:.*)/m, `$1\nimageCredit: "Photo by ${pexels.credit} on Pexels"`);
    }
    fs.writeFileSync(mdPath, content, "utf8");
    console.log(`  ✅ Updated: ${oldImg} → ${pexels.imagePath}`);
    ok++;

    // Pexels rate limit — 2s between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n✅ Done: ${ok} updated, ${fail} failed`);
}

main().catch(e => { console.error(e); process.exit(1); });
