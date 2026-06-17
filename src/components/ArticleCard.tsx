import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/content";

const SILO_COLORS: Record<string, string> = {
  "may-ban-hang-tu-dong": "bg-blue-50 text-blue-700",
  "tu-locker-thong-minh": "bg-teal-50 text-teal-700",
  "giai-phap-kinh-doanh": "bg-green-50 text-green-700",
};

const SILO_LABELS: Record<string, string> = {
  "may-ban-hang-tu-dong": "Máy bán hàng",
  "tu-locker-thong-minh": "Smart Locker",
  "giai-phap-kinh-doanh": "Giải pháp",
};

export default function ArticleCard({ post }: { post: BlogPostMeta }) {
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const badgeClass = SILO_COLORS[post.silo] ?? "bg-slate-100 text-slate-600";
  const badgeLabel = SILO_LABELS[post.silo] ?? post.silo;

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Thumbnail */}
      {post.image ? (
        <div className="relative w-full h-40 overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center">
          <span className="text-white/30 text-5xl">📦</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
            {badgeLabel}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-700 line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 flex-1">
          {post.description}
        </p>
        <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
          Đọc tiếp →
        </span>
      </div>
    </Link>
  );
}
