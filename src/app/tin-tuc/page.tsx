import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { getAllPostsMeta, CATEGORY_META, type ArticleCategory } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";
import WorldNewsWidget from "@/components/WorldNewsWidget";

export const metadata: Metadata = buildMetadata({
  title: `Tin tức Smart Locker & Vending Machine Việt Nam`,
  description: `Cập nhật tin tức, dự án thực tế, hướng dẫn và xu hướng về tủ locker thông minh và máy bán hàng tự động tại Việt Nam từ ${siteConfig.name}.`,
  path: "/tin-tuc",
});

const CATEGORIES: { slug: ArticleCategory; label: string; href: string }[] = [
  { slug: "du-an",     label: "Dự án thực tế", href: "/tin-tuc/du-an" },
  { slug: "xu-huong",  label: "Xu hướng",      href: "/tin-tuc/xu-huong" },
  { slug: "huong-dan", label: "Hướng dẫn",     href: "/tin-tuc/huong-dan" },
  { slug: "so-sanh",   label: "So sánh",        href: "/tin-tuc/so-sanh" },
  { slug: "kien-thuc", label: "Kiến thức",      href: "/tin-tuc/kien-thuc" },
];

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const featured = posts[0];
  const recent = posts.slice(1, 7);

  // Group by category for the section display
  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    posts: posts.filter((p) => p.category === cat.slug).slice(0, 3),
  })).filter((c) => c.posts.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Tin tức & Kiến thức"
        title="Trung tâm thông tin Smart Locker"
        description="Dự án thực tế · Xu hướng thị trường · Hướng dẫn vận hành · So sánh giải pháp"
        breadcrumbs={[{ name: "Tin tức", path: "/tin-tuc" }]}
      />

      {/* Category nav */}
      <div className="sticky top-16 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            <Link
              href="/tin-tuc"
              className="shrink-0 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white"
            >
              Tất cả
            </Link>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${meta.bg} ${meta.color} hover:opacity-80 transition-opacity`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">

          {/* Featured article */}
          {featured && (
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Bài viết nổi bật</h2>
              <Link
                href={`/tin-tuc/${featured.slug}`}
                className="group grid gap-6 rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow lg:grid-cols-[1fr_420px]"
              >
                <div className="relative h-64 lg:h-full min-h-[260px] bg-slate-100">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt ?? featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center">
                      <span className="text-white/20 text-8xl">🔐</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-8">
                  {featured.category && (
                    <span className={`mb-3 self-start rounded-full px-3 py-1 text-xs font-bold ${CATEGORY_META[featured.category].bg} ${CATEGORY_META[featured.category].color}`}>
                      {CATEGORY_META[featured.category].label}
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mb-2">
                    {new Date(featured.date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight group-hover:text-brand-700 mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed line-clamp-3">{featured.description}</p>
                  <span className="mt-6 text-sm font-bold text-brand-600 group-hover:text-brand-700">Đọc bài viết →</span>
                </div>
              </Link>
            </div>
          )}

          {/* Recent articles */}
          {recent.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Mới nhất</h2>
                <span className="text-xs text-slate-400">{posts.length} bài viết</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recent.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Category sections */}
          {byCategory.map((cat) => (
            <div key={cat.slug}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${CATEGORY_META[cat.slug].bg} ${CATEGORY_META[cat.slug].color}`}>
                    {cat.label}
                  </span>
                  <h2 className="text-sm font-bold text-slate-700">{cat.label}</h2>
                </div>
                <Link href={cat.href} className="text-xs font-semibold text-brand-600 hover:underline">
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ))}

          {/* All older articles */}
          {posts.length > 7 && (
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Tất cả bài viết</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(7).map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <WorldNewsWidget />
    </>
  );
}
