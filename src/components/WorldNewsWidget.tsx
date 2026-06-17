import fs from "fs";
import path from "path";
import type { WorldNewsItem } from "../../scripts/fetch-world-news";

function loadWorldNews(): { items: WorldNewsItem[]; updatedAt: string } {
  try {
    const dataPath = path.join(process.cwd(), "src", "data", "world-news.json");
    const raw = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(raw);
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

export default function WorldNewsWidget() {
  const { items, updatedAt } = loadWorldNews();
  if (items.length === 0) return null;

  const updatedLabel = updatedAt ? formatDate(updatedAt) : "";

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Tin tức thế giới về Vending &amp; Smart Locker
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tổng hợp và dịch từ các nguồn quốc tế uy tín — cập nhật {updatedLabel}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Quốc tế
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
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
                Đọc bản gốc
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-400 text-center">
          Nội dung được tóm tắt và dịch sang tiếng Việt từ các nguồn quốc tế.
          Nhấn vào mỗi bài để đọc nội dung đầy đủ tại trang gốc.
        </p>
      </div>
    </section>
  );
}
