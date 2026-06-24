// Remap any blog article dated in the future (> TODAY) to a sensible past date.
// Future-dated articles hurt SEO (Google distrusts future publish dates).
// Future-dated posts are spread evenly across 2026-01-05 .. 2026-06-20,
// preserving their relative chronological order. Run: node scripts/fix-future-dates.mjs
import fs from "fs";
import path from "path";

const BLOG = path.join(process.cwd(), "src", "content", "blog");
const TODAY = "2026-06-24";
const RANGE_START = Date.parse("2026-01-05T00:00:00Z");
const RANGE_END = Date.parse("2026-06-20T00:00:00Z");

const dateRe = /^date:\s*"(\d{4}-\d{2}-\d{2})"/m;

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".md"));
const future = [];
for (const f of files) {
  const full = path.join(BLOG, f);
  const raw = fs.readFileSync(full, "utf8");
  const m = raw.match(dateRe);
  if (m && m[1] > TODAY) future.push({ f, full, raw, oldDate: m[1] });
}

// Sort by current (future) date ascending so earlier-scheduled => earlier new date.
future.sort((a, b) => (a.oldDate < b.oldDate ? -1 : a.oldDate > b.oldDate ? 1 : a.f < b.f ? -1 : 1));

const n = future.length;
function fmt(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

let changed = 0;
future.forEach((item, i) => {
  const t = n <= 1 ? RANGE_END : RANGE_START + Math.round(((RANGE_END - RANGE_START) * i) / (n - 1));
  const newDate = fmt(t);
  const updated = item.raw.replace(dateRe, `date: "${newDate}"`);
  if (updated !== item.raw) {
    fs.writeFileSync(item.full, updated);
    changed++;
  }
});

console.log(`Future-dated articles found: ${n}`);
console.log(`Rewritten to ${RANGE_START && fmt(RANGE_START)} .. ${fmt(RANGE_END)}: ${changed}`);
if (n > 0) {
  console.log(`Sample: ${future[0].oldDate} -> ${fmt(RANGE_START)} | ${future[n - 1].oldDate} -> ${fmt(RANGE_END)}`);
}
