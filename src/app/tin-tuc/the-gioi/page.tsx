import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import type { WorldNewsItem } from "../../../../scripts/fetch-world-news";

export const metadata: Metadata = buildMetadata({
  title: "Tin Tức Thế Giới về Vending & Smart Locker",
  description:
    "Tổng hợp và phân tích tin tức quốc tế về máy bán hàng tự động và tủ locker thông minh — dịch và bình luận theo góc nhìn thị trường Việt Nam.",
  path: "/tin-tuc/the-gioi",
});

function loadWorldNews(): { items: WorldNewsItem[]; updatedAt: string } {
  try {
    const p = path.join(process.cwd(), "src", "data", "world-news.json");
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return { items: [], updatedAt: "" };
  }
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return "";
  }
}

const CAT_LABEL: Record<string, string> = {
  industry: "Công nghiệp",
  retail: "Bán lẻ",
  foodtech: "Food Tech",
  logistics: "Vận chuyển",
  iot: "IoT",
  tech: "Công nghệ",
  asia: "Châu Á",
  fintech: "Fintech",
};

const CAT_COLOR: Record<string, string> = {
  industry: "bg-blue-100 text-blue-700",
  retail: "bg-green-100 text-green-700",
  foodtech: "bg-orange-100 text-orange-700",
  logistics: "bg-purple-100 text-purple-700",
  iot: "bg-cyan-100 text-cyan-700",
  tech: "bg-slate-100 text-slate-700",
  asia: "bg-rose-100 text-rose-700",
  fintech: "bg-yellow-100 text-yellow-700",
};

export default function WorldNewsIndexPage() {
  const { items, updatedAt } = loadWorldNews();

  return (
    <>
      <PageHeader
        eyebrow="Tin tức Quốc tế"
        title="Tin Tức Thế Giới về Vending & Smart Locker"
        description="Phân tích và bình luận từ các nguồn quốc tế — góc nhìn thị trường Việt Nam"
        breadcrumbs={[
          { name: "Tin tức", path: "/tin-tuc" },
          { name: "Tin thế giới", path: "/tin-tuc/the-gioi" },
        ]}
      />

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* Meta bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                Quốc tế
              </span>
              <span className="text-sm text-slate-500">
                {items.length} bài — cập nhật {updatedAt ? formatDate(updatedAt) : "—"}
              </span>
            </div>
            <Link href="/tin-tuc" className="text-sm font-medium text-brand-600 hover:underline">
              ← Tất cả tin tức
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="text-4xl mb-4">🌐</p>
              <p className="font-semibold">Chưa có tin tức thế giới</p>
              <p className="text-sm mt-2">Chạy <code className="bg-slate-100 px-1 rounded">npm run fetch:news</code> để tải tin từ RSS</p>
            </div>
          ) : (
            <>
              {/* Featured world news (first item) */}
              {items[0] && (
                <div className="mb-10">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Nổi bật</p>
                  <Link
                    href={`/tin-tuc/the-gioi/${items[0].slug}`}
                    className="group block rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CAT_COLOR[items[0].category] || "bg-slate-100 text-slate-600"}`}>
                        {CAT_LABEL[items[0].category] || items[0].category}
                      </span>
                      <span className="text-xs text-slate-400">{items[0].source}</span>
                      {items[0].pubDate && (
                        <span className="text-xs text-slate-400">{formatDate(items[0].pubDate)}</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-brand-700 transition mb-3 leading-tight">
                      {items[0].titleVi}
                    </h2>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">{items[0].summaryVi}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-600 group-hover:text-brand-700">
                      Đọc bài phân tích →
                    </span>
                  </Link>
                </div>
              )}

              {/* Grid of remaining articles */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.slice(1).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/tin-tuc/the-gioi/${item.slug}`}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CAT_COLOR[item.category] || "bg-slate-100 text-slate-600"}`}>
                        {CAT_LABEL[item.category] || item.category}
                      </span>
                      <span className="text-xs text-slate-400 truncate">{item.source}</span>
                    </div>

                    <h3 className="font-bold text-slate-800 leading-snug group-hover:text-brand-700 transition line-clamp-2 mb-2 flex-1">
                      {item.titleVi}
                    </h3>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                      {item.summaryVi}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400">{item.pubDate ? formatDate(item.pubDate) : ""}</span>
                      <span className="text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                        Đọc phân tích →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Attribution note */}
              <p className="mt-10 text-center text-xs text-slate-400">
                Nội dung phân tích và bình luận bằng tiếng Việt.{" "}
                Bài viết gốc tiếng Anh từ các nguồn quốc tế uy tín trong ngành.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
