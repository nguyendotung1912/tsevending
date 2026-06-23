import fs from "fs";
import path from "path";
import Link from "next/link";
import type { WorldNewsItem } from "../../scripts/fetch-world-news";

function loadWorldNews(): { items: WorldNewsItem[]; updatedAt: string } {
  try {
    const dataPath = path.join(process.cwd(), "src", "data", "world-news.json");
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch {
    return { items: [], updatedAt: "" };
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatDateShort(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  } catch {
    return "";
  }
}

interface Props {
  /** compact=true: vertical list for sidebar (3 items). Default: 3-col grid (all items). */
  compact?: boolean;
}

export default function WorldNewsWidget({ compact = false }: Props) {
  const { items, updatedAt } = loadWorldNews();
  if (items.length === 0) return null;

  const updatedLabel = updatedAt ? formatDate(updatedAt) : "";

  // Compact sidebar mode
  if (compact) {
    const displayItems = items.slice(0, 3);
    return (
      <div className="rounded-2xl border border-orange-200 bg-orange-50 overflow-hidden">
        <div className="bg-orange-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-black text-white uppercase tracking-wide">Tin Thế Giới</span>
          </div>
          <Link href="/tin-tuc/the-gioi" className="text-xs font-semibold text-orange-100 hover:text-white">
            Xem tất cả →
          </Link>
        </div>
        <div className="divide-y divide-orange-100">
          {displayItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.slug ? `/tin-tuc/the-gioi/${item.slug}` : item.url}
              {...(!item.slug ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
              className="flex gap-3 p-3.5 hover:bg-orange-100/60 transition group"
            >
              <span className="shrink-0 text-lg font-black text-orange-300 leading-none mt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-orange-700 mb-0.5 truncate">{item.source}</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-700 transition">
                  {item.titleVi}
                </p>
                {item.pubDate && (
                  <p className="mt-1 text-xs text-slate-400">{formatDateShort(item.pubDate)}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
        {updatedLabel && (
          <div className="px-4 py-2 bg-orange-100/50 text-xs text-orange-500 text-right">
            Cập nhật {updatedLabel}
          </div>
        )}
      </div>
    );
  }

  // Full grid mode (homepage/dedicated section)
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Tin tức thế giới về Vending &amp; Smart Locker
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tổng hợp và phân tích từ các nguồn quốc tế — cập nhật {updatedLabel}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Quốc tế
            </span>
            <Link
              href="/tin-tuc/the-gioi"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.slug ? `/tin-tuc/the-gioi/${item.slug}` : item.url}
              {...(!item.slug ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-brand-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  {item.source}
                </span>
                {item.pubDate && (
                  <span className="text-xs text-slate-400">{formatDate(item.pubDate)}</span>
                )}
              </div>

              <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-brand-700 transition line-clamp-2 mb-2">
                {item.titleVi}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                {item.summaryVi}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600 group-hover:text-brand-700">
                {item.slug ? "Đọc phân tích tiếng Việt" : "Đọc bản gốc"}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Nội dung phân tích và bình luận bằng tiếng Việt.
          </p>
          <Link
            href="/tin-tuc/the-gioi"
            className="text-xs font-bold text-orange-600 hover:underline sm:hidden"
          >
            Xem tất cả tin quốc tế →
          </Link>
        </div>
      </div>
    </section>
  );
}
