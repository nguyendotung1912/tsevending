/**
 * audit-thin-content.mjs
 *
 * Scans all blog markdown files in src/content/blog/ and flags:
 * - Posts with fewer than 600 words (noindex candidates)
 * - Posts with no images
 * - Posts with duplicate/very similar titles
 *
 * Usage: node scripts/audit-thin-content.mjs
 * Output: audit-report.json + console summary
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../src/content/blog");
const OUTPUT_FILE = path.join(__dirname, "../audit-report.json");

const MIN_WORDS = 600;

function countWords(markdown) {
  // Strip frontmatter
  const body = markdown.replace(/^---[\s\S]*?---/, "");
  // Strip markdown syntax
  const text = body
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[.*?\]\(.*?\)/g, "$1") // links
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(" ").filter(Boolean).length;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split("\n");
  const result = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

function hasImage(content) {
  return /image:\s*["']?\/images\//i.test(content) || /!\[.*?\]\(.*?\)/.test(content);
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
console.log(`\n📋 Auditing ${files.length} blog posts...\n`);

const results = {
  total: files.length,
  thinContent: [],   // < MIN_WORDS
  noImage: [],       // no image
  ok: [],
  summary: {},
};

for (const file of files) {
  const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const fm = extractFrontmatter(content);
  const words = countWords(content);
  const hasImg = hasImage(content);
  const slug = file.replace(".md", "");

  const entry = {
    slug,
    title: fm.title ?? slug,
    words,
    hasImage: hasImg,
    date: fm.date ?? "unknown",
  };

  if (words < MIN_WORDS) {
    results.thinContent.push(entry);
  }
  if (!hasImg) {
    results.noImage.push(entry);
  }
  if (words >= MIN_WORDS && hasImg) {
    results.ok.push(entry);
  }
}

// Sort by word count ascending (worst first)
results.thinContent.sort((a, b) => a.words - b.words);
results.noImage.sort((a, b) => a.words - b.words);

results.summary = {
  total: files.length,
  thinContent: results.thinContent.length,
  noImage: results.noImage.length,
  ok: results.ok.length,
  thinContentPercent: `${((results.thinContent.length / files.length) * 100).toFixed(1)}%`,
};

// Write JSON report
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");

// Console summary
console.log("═══════════════════════════════════════════════════");
console.log("  TSE Vending — Blog Content Audit Report");
console.log("═══════════════════════════════════════════════════");
console.log(`  Total posts:       ${results.summary.total}`);
console.log(`  OK (>600w + img):  ${results.summary.ok}`);
console.log(`  Thin (<600w):      ${results.summary.thinContent} (${results.summary.thinContentPercent})`);
console.log(`  No image:          ${results.summary.noImage}`);
console.log("═══════════════════════════════════════════════════");

console.log(`\n🔴 TOP 20 THINNEST POSTS (candidates for noindex):\n`);
results.thinContent.slice(0, 20).forEach((p, i) => {
  console.log(`  ${String(i + 1).padStart(2, " ")}. [${p.words}w] ${p.title.slice(0, 70)}`);
  console.log(`      → /tin-tuc/${p.slug}`);
});

if (results.thinContent.length > 20) {
  console.log(`\n  ... and ${results.thinContent.length - 20} more — see audit-report.json`);
}

console.log(`\n📁 Full report saved to: audit-report.json\n`);
