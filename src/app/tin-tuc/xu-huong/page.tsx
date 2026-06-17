import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPostsByCategory, CATEGORY_META } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: "Xu hướng Smart Locker & Vending Machine Việt Nam 2026",
  description: "Phân tích xu hướng thị trường tủ locker thông minh và máy bán hàng tự động tại Việt Nam: công nghệ mới, thị trường tăng trưởng, dự báo ngành.",
  path: "/tin-tuc/xu-huong",
});

export default function XuHuongPage() {
  const posts = getPostsByCategory("xu-huong");
  const meta = CATEGORY_META["xu-huong"];

  return (
    <>
      <PageHeader
        eyebrow="Chuyên mục"
        title="Xu hướng thị trường"
        description="Phân tích và dự báo xu hướng tủ locker thông minh, máy bán hàng tự động tại Việt Nam và khu vực Đông Nam Á."
        breadcrumbs={[
          { name: "Tin tức", path: "/tin-tuc" },
          { name: "Xu hướng", path: "/tin-tuc/xu-huong" },
        ]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link href="/tin-tuc" className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 hover:border-brand-600 hover:text-brand-600">← Tất cả</Link>
            {(["du-an","huong-dan","so-sanh","kien-thuc"] as const).map((slug) => (
              <Link key={slug} href={`/tin-tuc/${slug}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${CATEGORY_META[slug].bg} ${CATEGORY_META[slug].color} hover:opacity-80`}>
                {CATEGORY_META[slug].label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 mb-6">
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${meta.bg} ${meta.color}`}>{meta.label}</span>
            <p className="text-sm text-slate-500">{posts.length} bài viết</p>
          </div>
          {posts.length === 0 ? (
            <p className="text-slate-500">Chưa có bài viết trong chuyên mục này.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
