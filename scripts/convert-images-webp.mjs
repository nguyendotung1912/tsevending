// Generate a .webp sibling for every JPG/PNG under public/images.
// Originals are kept as a fallback; content.ts serves the .webp when present.
// Run: node scripts/convert-images-webp.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const QUALITY = 80;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
let converted = 0,
  skipped = 0,
  srcBytes = 0,
  webpBytes = 0,
  failed = 0;

for (const file of files) {
  const webp = file.replace(/\.(jpe?g|png)$/i, ".webp");
  try {
    const srcSize = fs.statSync(file).size;
    if (fs.existsSync(webp)) {
      skipped++;
      continue;
    }
    await sharp(file).webp({ quality: QUALITY }).toFile(webp);
    converted++;
    srcBytes += srcSize;
    webpBytes += fs.statSync(webp).size;
  } catch (err) {
    failed++;
    console.error(`✗ ${path.relative(process.cwd(), file)} — ${err.message}`);
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(
  `\nWebP done: ${converted} converted, ${skipped} skipped, ${failed} failed (of ${files.length}).`
);
if (converted > 0) {
  const saved = srcBytes - webpBytes;
  console.log(
    `Converted source ${mb(srcBytes)}MB → webp ${mb(webpBytes)}MB ` +
      `(saved ${mb(saved)}MB, -${Math.round((saved / srcBytes) * 100)}%).`
  );
}
