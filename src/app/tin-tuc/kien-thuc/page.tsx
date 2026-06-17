import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPostsByCategory, CATEGORY_META } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: "Kiến thức Smart Locker & Máy bán hàng tự động",
  description: "Kiến thức nền tảng về tủ locker thông minh và máy bán hàng tự động: định nghĩa, cách hoạt động, tiêu chuẩn lắp đặt, công nghệ xác thực.",
  path: "/tin-tuc/kien-thuc",
});

export default function KienThucPage() {
  const posts = getPostsByCategory("kien-thuc");
  const meta = CATEGORY_META["kien-thuc"];

  return (
    <>
      <PageHeader
        eyebrow="Chuyên mục"
        title="Kiến thức chuyên sâu"
        description="Tổng hợp kiến thức nền tảng về tủ locker thông minh và máy bán hàng tự động — từ nguyên lý hoạt động đến tiêu chuẩn lắp đặt và vận hành."
        breadcrumbs={[
          { name: "Tin tức", path: "/tin-tuc" },
          { name: "Kiến thức", path: "/tin-tuc/kien-thuc" },
        ]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link href="/tin-tuc" className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 hover:border-brand-600 hover:text-brand-600">← Tất cả</Link>
            {(["du-an","xu-huong","huong-dan","so-sanh"] as const).map((slug) => (
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
