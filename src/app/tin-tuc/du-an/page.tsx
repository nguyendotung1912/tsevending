import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPostsByCategory, CATEGORY_META } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: "Dự án thực tế Smart Locker — TSE Vending triển khai",
  description: "Các dự án tủ locker thông minh TSE Vending đã triển khai thực tế: ga Hà Nội, RMIT Việt Nam, Co.opmart, khách sạn RSM Nha Trang và nhiều đối tác khác.",
  path: "/tin-tuc/du-an",
});

export default function DuAnPage() {
  const posts = getPostsByCategory("du-an");
  const meta = CATEGORY_META["du-an"];

  return (
    <>
      <PageHeader
        eyebrow="Chuyên mục"
        title="Dự án thực tế"
        description="Các công trình TSE Vending đã thiết kế, lắp đặt và vận hành — minh chứng năng lực thực tế từ ga tàu, đại học quốc tế đến chuỗi siêu thị và khách sạn."
        breadcrumbs={[
          { name: "Tin tức", path: "/tin-tuc" },
          { name: "Dự án thực tế", path: "/tin-tuc/du-an" },
        ]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Category nav */}
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link href="/tin-tuc" className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 hover:border-brand-600 hover:text-brand-600">← Tất cả</Link>
            {(["xu-huong","huong-dan","so-sanh","kien-thuc"] as const).map((slug) => (
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
