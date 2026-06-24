import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
// Shown when an article's frontmatter image is missing on disk, so the page
// never renders a broken hero (LCP) image or emits a 404 og:image.
const FALLBACK_IMAGE = "/og-default.png";

// Validates the frontmatter image at build time: returns it only if the file
// actually exists under /public, otherwise falls back to a known-good banner.
// Remote (http) images are passed through untouched.
// Returns the .webp sibling of a /public image when it exists on disk (built by
// scripts/convert-images-webp.mjs), else the original path. Lets us serve
// smaller WebP without rewriting any article markdown.
function webpIfExists(publicPath: string): string {
  if (!/\.(jpe?g|png)$/i.test(publicPath)) return publicPath;
  const webp = publicPath.replace(/\.(jpe?g|png)$/i, ".webp");
  const onDisk = path.join(PUBLIC_DIR, webp.replace(/^\//, ""));
  return fs.existsSync(onDisk) ? webp : publicPath;
}

function resolveImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//.test(image)) return image;
  const filePath = path.join(PUBLIC_DIR, image.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) return FALLBACK_IMAGE;
  return webpIfExists(image);
}

// Articles shorter than this are treated as thin content: set to noindex on the
// page AND excluded from the sitemap, so Google isn't asked to crawl/index pages
// it will reject as "Crawled - currently not indexed". Single source of truth.
export const MIN_WORDS_FOR_INDEX = 600;

// Approximate word count of a markdown body (strips code, html and md syntax).
export function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`>_[\]()|!~]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

import type { ArticleCategory, BlogPostMeta } from "./categories";
export type { ArticleCategory, BlogPostMeta } from "./categories";
export { CATEGORY_META } from "./categories";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  silo: string;
  sub?: string;
  category?: import("./categories").ArticleCategory;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  faqs?: { q: string; a: string }[];
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  contentHtml: string;
  wordCount: number;
  indexable: boolean;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const slugs = readSlugs();
  const posts: BlogPostMeta[] = slugs.map((slug) => {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const d = data as BlogFrontmatter;
    const wordCount = countWords(content);
    return {
      title: d.title,
      description: d.description,
      date: d.date,
      silo: d.silo,
      sub: d.sub,
      category: d.category,
      keywords: d.keywords,
      image: resolveImage(d.image),
      imageAlt: d.imageAlt,
      faqs: d.faqs,
      slug,
      wordCount,
      indexable: wordCount >= MIN_WORDS_FOR_INDEX,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return undefined;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  // Swap inline body images to their WebP sibling when one exists on disk.
  const contentHtml = processed
    .toString()
    .replace(/\/images\/[^"')\s]+\.(?:jpe?g|png)/gi, (m) => webpIfExists(m));

  const fm = data as BlogFrontmatter;
  const wordCount = countWords(content);
  return {
    ...fm,
    image: resolveImage(fm.image),
    slug,
    contentHtml,
    wordCount,
    indexable: wordCount >= MIN_WORDS_FOR_INDEX,
  };
}

export function getPostsBySilo(siloSlug: string, subSlug?: string): BlogPostMeta[] {
  return getAllPostsMeta().filter((post) => {
    if (post.silo !== siloSlug) return false;
    if (subSlug && post.sub !== subSlug) return false;
    return true;
  });
}

export function getPostsByCategory(category: ArticleCategory): BlogPostMeta[] {
  return getAllPostsMeta().filter((post) => post.category === category);
}

export function getAllPostSlugs(): string[] {
  return readSlugs();
}

// Ranks other posts by topical closeness (same sub > same silo > shared
// keywords) so blog posts cross-link within their SEO silo/content cluster.
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((post) => post.slug === currentSlug);
  const others = all.filter((post) => post.slug !== currentSlug);
  if (!current) return others.slice(0, limit);

  return others
    .map((post) => {
      let score = 0;
      if (current.sub && post.sub === current.sub) score += 3;
      else if (post.silo === current.silo) score += 2;
      if (current.category && post.category === current.category) score += 1;
      const sharedKeywords = (post.keywords ?? []).filter((kw) =>
        (current.keywords ?? []).includes(kw)
      ).length;
      score += sharedKeywords;
      return { post, score };
    })
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map(({ post }) => post);
}
