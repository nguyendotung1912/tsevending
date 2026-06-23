/**
 * Fetch real Pexels images only for articles whose frontmatter `image:` points
 * to a file that is missing on disk (the render layer currently falls back to
 * og-default.svg for these). Updates frontmatter to the downloaded path.
 *
 * Run: npx tsx scripts/fill-missing-images.ts  [DRY_RUN=1]
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOTENV_PATH = path.join("scripts", ".env.local");
if (fs.existsSync(DOTENV_PATH)) {
  for (const line of fs.readFileSync(DOTENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

import { fetchPexelsImage } from "./fetch-pexels-image";

const BLOG_DIR = path.join("src", "content", "blog");
const PUBLIC = "public";
const DRY = process.env.DRY_RUN === "1";

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const missing: { file: string; slug: string; silo: string; sub: string | null; title: string }[] = [];

  for (const f of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    const { data } = matter(raw);
    const img = String(data.image ?? "");
    if (!img || /^https?:\/\//.test(img)) continue;
    if (fs.existsSync(path.join(PUBLIC, img.replace(/^\//, "")))) continue;
    missing.push({
      file: f,
      slug: f.replace(/\.md$/, ""),
      silo: String(data.silo ?? ""),
      sub: (data.sub as string) ?? null,
      title: String(data.title ?? f),
    });
  }

  console.log(`Articles with missing image file: ${missing.length}`);
  if (DRY) { missing.forEach((m) => console.log("  " + m.slug)); return; }

  const used = new Set<number>();
  let ok = 0, fail = 0;
  for (const m of missing) {
    process.stdout.write(`[${ok + fail + 1}/${missing.length}] ${m.slug.slice(0, 55).padEnd(55)} `);
    try {
      const res = await fetchPexelsImage(m.slug, m.silo, m.sub, used, m.title);
      if (!res) { console.log("✗ no photo"); fail++; continue; }
      used.add(res.photoId);
      const filePath = path.join(BLOG_DIR, m.file);
      let raw = fs.readFileSync(filePath, "utf8");
      raw = raw.replace(/^(image:\s*)["'][^"'\n]*["']/m, `$1"${res.imagePath}"`);
      fs.writeFileSync(filePath, raw, "utf8");
      console.log("✓ " + res.imagePath);
      ok++;
    } catch (e) {
      console.log("✗ " + (e instanceof Error ? e.message : e));
      fail++;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  console.log(`\nDone: ${ok} fetched, ${fail} failed`);
}

main().catch((e) => { console.error(e); process.exit(1); });
