import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SOLUTIONS_SILO, SILOS } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: SOLUTIONS_SILO.metaTitle,
  description: SOLUTIONS_SILO.metaDescription,
  path: `/${SOLUTIONS_SILO.slug}`,
});

export default function SolutionsPage() {
  const posts = getPostsBySilo(SOLUTIONS_SILO.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Đồng hành kinh doanh"
        title={SOLUTIONS_SILO.h1}
        description={SOLUTIONS_SILO.intro[0]}
        breadcrumbs={[{ name: SOLUTIONS_SILO.title, path: `/${SOLUTIONS_SILO.slug}` }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">
            {SOLUTIONS_SILO.intro.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SOLUTIONS_SILO.items.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-3xl">{item.icon}</span>
                <h2 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 mb-5 text-xl font-bold text-slate-900">Sản phẩm liên quan</h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
        </div>
      </section>

      <Cta />
    </>
  );
}
