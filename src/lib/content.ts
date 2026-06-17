import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  silo: string;
  sub?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  contentHtml: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
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
  const posts = slugs.map((slug) => {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    return { ...(data as BlogFrontmatter), slug };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return undefined;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return { ...(data as BlogFrontmatter), slug, contentHtml };
}

export function getPostsBySilo(siloSlug: string, subSlug?: string): BlogPostMeta[] {
  return getAllPostsMeta().filter((post) => {
    if (post.silo !== siloSlug) return false;
    if (subSlug && post.sub !== subSlug) return false;
    return true;
  });
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
