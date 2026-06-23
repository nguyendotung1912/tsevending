/**
 * One-time batch image replacer for existing articles.
 *
 * Safety rails:
 *   - Backs up every article's current image/imageAlt to scripts/image-backup.json
 *     BEFORE any change (never overwrites an existing backup).
 *   - Runs on 5 articles by default for review; set RUN_ALL=1 to process everything.
 *   - Sequential only, with a delay between articles; on Pexels rate limit it
 *     waits until the limit resets (next hour) and resumes — never bursts.
 *
 * Usage:
 *   npx tsx scripts/replace-article-images.ts              # test: 5 articles
 *   DRY_RUN=1 npx tsx scripts/replace-article-images.ts    # preview only
 *   RUN_ALL=1 npx tsx scripts/replace-article-images.ts    # full run (after review)
 *
 * Restore from backup:
 *   npx tsx scripts/replace-article-images.ts --restore
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fetchArticleImage, writeImageFrontmatter, loadEnvLocal, RateLimitError, buildContentQuery } from "./lib/pexels-image";

loadEnvLocal();

const BLOG_DIR = path.join("src", "content", "blog");
const BACKUP_FILE = path.join("scripts", "image-backup.json");
const DELAY_MS = Number(process.env.DELAY_MS || "4000");
const TEST_COUNT = Number(process.env.TEST_COUNT || "5");
const RUN_ALL = process.env.RUN_ALL === "1";
const DRY_RUN = process.env.DRY_RUN === "1";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Article { file: string; slug: string; title: string; content: string; image: string; imageAlt: string; }

function readArticles(): Article[] {
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")).sort().map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      file,
      slug: file.replace(/\.md$/, ""),
      title: String(data.title ?? file),
      content,
      image: String(data.image ?? ""),
      imageAlt: String(data.imageAlt ?? ""),
    };
  });
}

function restore() {
  if (!fs.existsSync(BACKUP_FILE)) { console.error("❌ Không tìm thấy file backup."); process.exit(1); }
  const backup = JSON.parse(fs.readFileSync(BACKUP_FILE, "utf8")) as Record<string, { image: string; imageAlt: string }>;
  let n = 0;
  for (const [slug, v] of Object.entries(backup)) {
    const fp = path.join(BLOG_DIR, `${slug}.md`);
    if (fs.existsSync(fp)) { writeImageFrontmatter(fp, v.image, v.imageAlt); n++; }
  }
  console.log(`✅ Đã khôi phục frontmatter ảnh cho ${n} bài từ backup.`);
}

async function main() {
  if (process.argv.includes("--restore")) return restore();

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) { console.error("❌ Thiếu PEXELS_API_KEY (scripts/.env.local)."); process.exit(1); }

  const all = readArticles();

  // 1) Backup once (never overwrite the original safety copy)
  if (!fs.existsSync(BACKUP_FILE)) {
    const backup: Record<string, { image: string; imageAlt: string }> = {};
    for (const a of all) backup[a.slug] = { image: a.image, imageAlt: a.imageAlt };
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(backup, null, 2), "utf8");
    console.log(`💾 Đã sao lưu ảnh hiện tại của ${all.length} bài → ${BACKUP_FILE}`);
  } else {
    console.log(`💾 Backup đã tồn tại (${BACKUP_FILE}) — giữ nguyên bản gốc.`);
  }

  const batch = RUN_ALL ? all : all.slice(0, TEST_COUNT);
  console.log(`\n🎯 Chế độ: ${RUN_ALL ? "TOÀN BỘ" : `CHẠY THỬ ${batch.length} bài`}${DRY_RUN ? " (DRY RUN)" : ""}`);
  console.log(`⏱  Nghỉ ${DELAY_MS}ms giữa mỗi bài, tuần tự, tự chờ khi bị giới hạn.\n`);

  const usedPhotoIds = new Set<number>();
  let ok = 0, fail = 0;

  for (let i = 0; i < batch.length; i++) {
    const a = batch[i];
    process.stdout.write(`[${i + 1}/${batch.length}] ${a.slug.slice(0, 50).padEnd(50)} `);

    // retry loop handles rate-limit waits
    while (true) {
      try {
        if (DRY_RUN) {
          console.log(`→ query: "${buildContentQuery(a.title, a.content).query}"`);
          ok++;
          break;
        }
        const res = await fetchArticleImage({ slug: a.slug, title: a.title, content: a.content, apiKey, usedPhotoIds });
        if (!res) { console.log("✗ không tìm được ảnh phù hợp"); fail++; break; }
        writeImageFrontmatter(path.join(BLOG_DIR, a.file), res.imagePath, res.alt);
        console.log(`✓ "${res.query}" → photo #${res.photoId} (${res.photographer})`);
        ok++;
        break;
      } catch (e) {
        if (e instanceof RateLimitError) {
          const waitMs = Math.max(60_000, (e.resetEpoch - Math.floor(Date.now() / 1000)) * 1000 + 15_000);
          const mins = Math.ceil(waitMs / 60000);
          console.log(`\n⏸  Hết hạn mức Pexels — chờ ~${mins} phút tới khi reset rồi chạy tiếp...`);
          await sleep(waitMs);
          continue; // retry same article
        }
        console.log(`✗ lỗi: ${e instanceof Error ? e.message : e}`);
        fail++;
        break;
      }
    }
    if (i < batch.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\n✅ Xong: ${ok} bài cập nhật, ${fail} lỗi.`);
  if (!RUN_ALL && !DRY_RUN) {
    console.log(`\n👉 Đây là ${batch.length} bài CHẠY THỬ. Xem lại ảnh, nếu ổn thì chạy toàn bộ:`);
    console.log(`   RUN_ALL=1 npx tsx scripts/replace-article-images.ts`);
    console.log(`   (Khôi phục nếu cần: npx tsx scripts/replace-article-images.ts --restore)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
