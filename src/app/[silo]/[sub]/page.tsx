import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllCategorySlugs, getSubcategory } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export function generateStaticParams() {
  return getAllCategorySlugs()
    .filter((entry) => entry.sub)
    .map((entry) => ({ silo: entry.silo, sub: entry.sub as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string; sub: string }>;
}): Promise<Metadata> {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) return {};
  const { sub } = result;

  return buildMetadata({
    title: sub.metaTitle,
    description: sub.metaDescription,
    path: `/${siloSlug}/${subSlug}`,
  });
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ silo: string; sub: string }>;
}) {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) notFound();
  const { silo, sub } = result;

  const posts = getPostsBySilo(silo.slug, sub.slug).slice(0, 3);
  const siblings = silo.subcategories.filter((s) => s.slug !== sub.slug);

  return (
    <>
      <PageHeader
        eyebrow={silo.title}
        title={sub.h1}
        description={sub.intro[0]}
        breadcrumbs={[
          { name: silo.title, path: `/${silo.slug}` },
          { name: sub.title, path: `/${silo.slug}/${sub.slug}` },
        ]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                {sub.intro.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h2 className="mt-8 mb-4 text-xl font-bold text-slate-900">Tính năng nổi bật</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {sub.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                  >
                    <span className="text-accent-500">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Các sản phẩm khác trong {silo.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${silo.slug}/${s.slug}`} className="flex items-center gap-2 text-brand-700 hover:underline">
                      <span>{s.icon}</span> {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${silo.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-brand-600 hover:underline"
              >
                ← Quay lại {silo.title}
              </Link>
            </aside>
          </div>

          {posts.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 text-xl font-bold text-slate-900">Bài viết liên quan</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-14">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Khám phá thêm</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <CategoryCard
                  key={s.slug}
                  href={`/${silo.slug}/${s.slug}`}
                  icon={s.icon}
                  title={s.title}
                  description={s.metaDescription}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={sub.faqs} />
      <Cta />
    </>
  );
}
