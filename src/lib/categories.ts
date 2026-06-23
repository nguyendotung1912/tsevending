export type ArticleCategory = "du-an" | "huong-dan" | "xu-huong" | "so-sanh" | "kien-thuc" | "tin-tuc";

export const CATEGORY_META: Record<ArticleCategory, { label: string; color: string; bg: string }> = {
  "du-an":     { label: "Dự án",     color: "text-orange-700", bg: "bg-orange-50" },
  "huong-dan": { label: "Hướng dẫn", color: "text-green-700",  bg: "bg-green-50" },
  "xu-huong":  { label: "Xu hướng",  color: "text-purple-700", bg: "bg-purple-50" },
  "so-sanh":   { label: "So sánh",   color: "text-blue-700",   bg: "bg-blue-50" },
  "kien-thuc": { label: "Kiến thức", color: "text-slate-700",  bg: "bg-slate-100" },
  "tin-tuc":   { label: "Tin tức",   color: "text-red-700",    bg: "bg-red-50" },
};

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  silo: string;
  sub?: string;
  category?: ArticleCategory;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  faqs?: { q: string; a: string }[];
  slug: string;
  /** Word count of the article body, used to gate thin content. */
  wordCount?: number;
  /** False when the article is too thin to index (kept out of sitemap + set to noindex). */
  indexable?: boolean;
}
