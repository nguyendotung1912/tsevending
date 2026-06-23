import type { Metadata } from "next";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { SOLUTIONS_SILO, SILOS } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: SOLUTIONS_SILO.metaTitle,
  description: SOLUTIONS_SILO.metaDescription,
  path: `/${SOLUTIONS_SILO.slug}`,
});

export default function SolutionsPage() {
  const posts = getPostsBySilo(SOLUTIONS_SILO.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: SOLUTIONS_SILO.title,
          description: SOLUTIONS_SILO.metaDescription,
          path: `/${SOLUTIONS_SILO.slug}`,
        })}
      />
      <PageHeader
        eyebrow="Mô hình hợp tác"
        title={SOLUTIONS_SILO.h1}
        description={SOLUTIONS_SILO.intro[0]}
        breadcrumbs={[{ name: SOLUTIONS_SILO.title, path: `/${SOLUTIONS_SILO.slug}` }]}
      />

      {/* ── INTRO ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-slate-600">
            {SOLUTIONS_SILO.intro.slice(1).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ITEMS: dark ── */}
      <section className="relative overflow-hidden bg-slate-900 py-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">Hình thức hợp tác</p>
          <h2 className="mt-2 mb-8 text-xl font-extrabold text-white">Các giải pháp TSE Vending cung cấp</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOLUTIONS_SILO.items.map((item) => (
              <div
                key={item.slug}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <span className="mt-0.5 text-2xl leading-none">{item.icon}</span>
                <div>
                  <h2 className="text-sm font-bold text-white">{item.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Sản phẩm & thiết bị</p>
          <h2 className="mt-2 mb-6 text-xl font-extrabold text-slate-900">Dòng sản phẩm TSE Vending</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SILOS.map((silo) => (
              <CategoryCard
                key={silo.slug}
                href={`/${silo.slug}`}
                icon={silo.icon}
                title={silo.title}
                description={silo.metaDescription}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      {posts.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Tài liệu tham khảo</p>
            <h2 className="mt-2 mb-6 text-xl font-extrabold text-slate-900">Bài viết liên quan</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={SOLUTIONS_SILO.faqs} />
      <Cta />
    </>
  );
}
