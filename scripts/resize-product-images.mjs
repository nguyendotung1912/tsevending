// Resize product gallery images to display size and (re)write their .webp.
// The gallery main image shows at ≤ ~864px wide (75vw of max-w-6xl) / full-width
// on mobile (~430px × 2 DPR ≈ 860px), so 1000px wide is plenty incl. retina.
// Full-size .jpg originals are kept as fallback; only the served .webp is shrunk.
// Run: node scripts/resize-product-images.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images", "products");
const MAX_W = 1000;
const QUALITY = 80;

function walkJpgs(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkJpgs(full));
    else if (/^0\d\.jpe?g$/i.test(e.name)) out.push(full); // 01/02/03.jpg
  }
  return out;
}

const files = fs.existsSync(ROOT) ? walkJpgs(ROOT) : [];
let before = 0, after = 0, n = 0;

for (const jpg of files) {
  const webp = jpg.replace(/\.jpe?g$/i, ".webp");
  const meta = await sharp(jpg).metadata();
  const pipeline = sharp(jpg);
  if (meta.width > MAX_W) pipeline.resize({ width: MAX_W, withoutEnlargement: true });
  const buf = await pipeline.webp({ quality: QUALITY }).toBuffer();
  const oldSize = fs.existsSync(webp) ? fs.statSync(webp).size : 0;
  fs.writeFileSync(webp, buf);
  before += oldSize; after += buf.length; n++;
  console.log(`  ${meta.width}px→${Math.min(meta.width, MAX_W)}px  ${Math.round(oldSize/1024)}KB→${Math.round(buf.length/1024)}KB  ${path.relative(ROOT, webp)}`);
}

console.log(`\n${n} ảnh · webp tổng ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (giảm ${before? Math.round((1-after/before)*100):0}%)`);
