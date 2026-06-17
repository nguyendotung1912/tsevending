import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPostsByCategory, CATEGORY_META } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: "So sánh Smart Locker: Loại khóa, công nghệ, thương hiệu",
  description: "So sánh chi tiết các loại tủ locker thông minh: QR code vs RFID vs vân tay, locker chung cư vs văn phòng vs trường học, các thương hiệu phổ biến tại Việt Nam.",
  path: "/tin-tuc/so-sanh",
});

export default function SoSanhPage() {
  const posts = getPostsByCategory("so-sanh");
  const meta = CATEGORY_META["so-sanh"];

  return (
    <>
      <PageHeader
        eyebrow="Chuyên mục"
        title="So sánh & Đánh giá"
        description="So sánh khách quan các loại tủ locker thông minh, công nghệ mở khóa và giải pháp phù hợp với từng ngành nghề và quy mô đầu tư."
        breadcrumbs={[
          { name: "Tin tức", path: "/tin-tuc" },
          { name: "So sánh", path: "/tin-tuc/so-sanh" },
        ]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link href="/tin-tuc" className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 hover:border-brand-600 hover:text-brand-600">← Tất cả</Link>
            {(["du-an","xu-huong","huong-dan","kien-thuc"] as const).map((slug) => (
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
