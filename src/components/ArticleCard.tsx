import Link from "next/link";
import type { BlogPostMeta } from "@/lib/content";

export default function ArticleCard({ post }: { post: BlogPostMeta }) {
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">{date}</span>
      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-brand-700">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
      <span className="mt-4 text-sm font-semibold text-brand-600">Đọc tiếp →</span>
    </Link>
  );
}
