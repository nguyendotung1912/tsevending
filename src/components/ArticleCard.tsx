import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/categories";
import { CATEGORY_META } from "@/lib/categories";

const SILO_LABELS: Record<string, string> = {
  "may-ban-hang-tu-dong": "Máy bán hàng",
  "tu-locker-thong-minh": "Smart Locker",
  "giai-phap-kinh-doanh": "Giải pháp",
};

function GradientPlaceholder({ post, catMeta }: { post: BlogPostMeta; catMeta: { label: string; bg: string; color: string } | null }) {
  return (
    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 flex flex-col justify-between p-4">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`dots-${post.slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="white" fillOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${post.slug})`} />
      </svg>
      {catMeta && (
        <span className={`relative self-start rounded-full px-2 py-0.5 text-xs font-semibold ${catMeta.bg} ${catMeta.color}`}>
          {catMeta.label}
        </span>
      )}
      <p className="relative text-sm font-bold leading-snug text-white/90 line-clamp-3 drop-shadow">
        {post.title}
      </p>
    </div>
  );
}

function estimateReadTime(description: string): number {
  const words = description.split(/\s+/).length;
  return Math.max(2, Math.ceil(words * 8 / 200));
}

interface ArticleCardProps {
  post: BlogPostMeta;
  /** "default" = card with image top | "horizontal" = image left, text right | "compact" = no image, list-style */
  variant?: "default" | "horizontal" | "compact";
}

export default function ArticleCard({ post, variant = "default" }: ArticleCardProps) {
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const catMeta = post.category ? CATEGORY_META[post.category] : null;
  const siloLabel = SILO_LABELS[post.silo] ?? post.silo;
  const readMin = estimateReadTime(post.description ?? "");

  if (variant === "compact") {
    return (
      <Link href={`/tin-tuc/${post.slug}`} className="group flex items-start gap-3 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-1 transition">
        {post.image && (
          <div className="relative h-14 w-20 flex-none overflow-hidden rounded-lg bg-slate-100">
            <Image src={post.image} alt={post.imageAlt ?? post.title} fill className="object-cover" sizes="80px" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs text-slate-400 mb-0.5">{date}</p>
          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 line-clamp-2 leading-snug">{post.title}</h4>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/tin-tuc/${post.slug}`} className="group flex gap-4 rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-28 w-36 flex-none overflow-hidden bg-slate-100">
          {post.image ? (
            <Image src={post.image} alt={post.imageAlt ?? post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="144px" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-950" />
          )}
        </div>
        <div className="flex flex-col justify-center py-3 pr-4">
          {catMeta ? (
            <span className={`mb-1.5 self-start rounded-full px-2 py-0.5 text-xs font-semibold ${catMeta.bg} ${catMeta.color}`}>{catMeta.label}</span>
          ) : null}
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 line-clamp-2 leading-snug">{post.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{date} · {readMin} phút đọc</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {post.image ? (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
           
          />
          {catMeta && (
            <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm ${catMeta.bg} ${catMeta.color}`}>
              {catMeta.label}
            </span>
          )}
        </div>
      ) : (
        <GradientPlaceholder post={post} catMeta={catMeta} />
      )}

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {!catMeta && (
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
              {siloLabel}
            </span>
          )}
          <span className="text-xs text-slate-400">{date}</span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">{readMin} phút đọc</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-brand-700 line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2 flex-1">
          {post.description}
        </p>
        <span className="mt-3 text-xs font-semibold text-brand-600 group-hover:text-brand-700">
          Đọc tiếp →
        </span>
      </div>
    </Link>
  );
}
