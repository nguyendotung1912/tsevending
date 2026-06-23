import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { getRelatedPosts } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import ArticleCard from "@/components/ArticleCard";
import type { WorldNewsItem } from "../../../../../scripts/fetch-world-news";

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
    return new Date(d).toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const CAT_LABEL: Record<string, string> = {
  industry: "Công nghiệp Vending",
  retail: "Bán lẻ Công nghệ",
  foodtech: "Food Tech",
  logistics: "Vận chuyển & Logistics",
  iot: "IoT & Kết nối",
  tech: "Công nghệ",
  asia: "Thị trường Châu Á",
  fintech: "Fintech",
};

export function generateStaticParams() {
  const { items } = loadWorldNews();
  return items.filter((i) => i.slug).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { items } = loadWorldNews();
  const item = items.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    ...buildMetadata({
      title: item.titleVi,
      description: item.summaryVi,
      path: `/tin-tuc/the-gioi/${slug}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function WorldNewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { items } = loadWorldNews();
  const item = items.find((i) => i.slug === slug);
  if (!item) notFound();

  // Get related domestic articles
  const relatedPosts = getRelatedPosts("", 3);

  const breadcrumbs = [
    { name: "Tin tức", path: "/tin-tuc" },
    { name: "Tin thế giới", path: "/tin-tuc/the-gioi" },
    { name: item.titleVi, path: `/tin-tuc/the-gioi/${slug}` },
  ];

  const catLabel = CAT_LABEL[item.category] || item.category;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: item.titleVi,
          description: item.summaryVi,
          path: `/tin-tuc/the-gioi/${slug}`,
          datePublished: item.pubDate || new Date().toISOString(),
          articleSection: catLabel,
        })}
      />

      {/* Breadcrumb strip */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-2">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <Link href="/tin-tuc" className="hover:text-brand-600">Tin tức</Link>
            <span>/</span>
            <Link href="/tin-tuc/the-gioi" className="hover:text-brand-600">Tin thế giới</Link>
            <span>/</span>
            <span className="text-slate-700 line-clamp-1">{item.titleVi}</span>
          </nav>
        </div>
      </div>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_260px]">

            {/* Article content */}
            <article>
              {/* Category + source badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                  {catLabel}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {item.source}
                </span>
                {item.pubDate && (
                  <span className="text-xs text-slate-400">{formatDate(item.pubDate)}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 lg:text-4xl">
                {item.titleVi}
              </h1>

              {/* Summary lead */}
              <p className="mb-8 text-lg leading-relaxed text-slate-600 border-l-4 border-brand-600 pl-4">
                {item.summaryVi}
              </p>

              {/* Full article HTML */}
              <div
                className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-a:text-brand-600 prose-a:font-medium hover:prose-a:text-brand-700"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
              />

              {/* Original source attribution */}
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Nguồn gốc bài viết
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  Bài viết được tổng hợp và phân tích theo góc nhìn thị trường Việt Nam từ nguồn:{" "}
                  <strong>{item.source}</strong>
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Đọc bài gốc tại {item.source}
                </a>
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-2xl bg-brand-700 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Quan tâm đến giải pháp Vending & Locker cho doanh nghiệp?
                </h3>
                <p className="text-sm text-blue-100 mb-4">
                  TSE Vending cung cấp máy bán hàng tự động và tủ locker thông minh phù hợp xu hướng quốc tế, thiết kế riêng cho thị trường Việt Nam.
                </p>
                <Link
                  href="/lien-he"
                  className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-blue-50 transition"
                >
                  Nhận tư vấn miễn phí →
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* World news nav */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                  Tin thế giới
                </h2>
                <Link
                  href="/tin-tuc/the-gioi"
                  className="block text-sm font-semibold text-brand-700 hover:underline mb-3"
                >
                  ← Tất cả tin quốc tế
                </Link>
                <hr className="border-slate-100 mb-3" />
                <ul className="space-y-1 text-sm">
                  <li><Link href="/tin-tuc" className="text-slate-600 hover:text-brand-700">Tất cả tin tức VN</Link></li>
                  <li><Link href="/tin-tuc/xu-huong" className="text-slate-600 hover:text-brand-700">Xu hướng</Link></li>
                  <li><Link href="/tin-tuc/kien-thuc" className="text-slate-600 hover:text-brand-700">Kiến thức</Link></li>
                </ul>
              </div>

              {/* Product links */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                  Sản phẩm TSE Vending
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/tu-locker-thong-minh" className="flex items-center gap-2 font-medium text-brand-700 hover:underline">
                      🔒 Tủ locker thông minh
                    </Link>
                  </li>
                  <li>
                    <Link href="/may-ban-hang-tu-dong" className="flex items-center gap-2 font-medium text-brand-700 hover:underline">
                      🤖 Máy bán hàng tự động
                    </Link>
                  </li>
                  <li>
                    <Link href="/giai-phap-kinh-doanh" className="flex items-center gap-2 text-brand-600 hover:underline">
                      💼 Giải pháp kinh doanh
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CTA block */}
              <Link
                href="/lien-he"
                className="block rounded-2xl bg-brand-700 p-5 text-center text-sm font-bold text-white hover:bg-brand-800 transition"
              >
                Cần tư vấn? Liên hệ ngay
              </Link>
            </aside>
          </div>

          {/* Related domestic articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 text-xl font-bold text-slate-900 border-l-4 border-brand-600 pl-4">
                Bài viết liên quan
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
