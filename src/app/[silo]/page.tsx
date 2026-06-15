import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getAllSilos, getSiloBySlug } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import ComparisonTable from "@/components/ComparisonTable";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllSilos().map((silo) => ({ silo: silo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string }>;
}): Promise<Metadata> {
  const { silo: siloSlug } = await params;
  const silo = getSiloBySlug(siloSlug);
  if (!silo) return {};

  return buildMetadata({
    title: silo.metaTitle,
    description: silo.metaDescription,
    path: `/${silo.slug}`,
  });
}

export default async function SiloPage({ params }: { params: Promise<{ silo: string }> }) {
  const { silo: siloSlug } = await params;
  const silo = getSiloBySlug(siloSlug);
  if (!silo) notFound();

  const posts = getPostsBySilo(silo.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: silo.title,
          description: silo.metaDescription,
          path: `/${silo.slug}`,
        })}
      />
      <PageHeader
        eyebrow="Sản phẩm & dịch vụ"
        title={silo.h1}
        description={silo.intro[0]}
        breadcrumbs={[{ name: silo.title, path: `/${silo.slug}` }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                {silo.intro.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h2 className="mt-10 mb-4 text-xl font-bold text-slate-900">Danh mục sản phẩm</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {silo.subcategories.map((sub) => (
                  <CategoryCard
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    icon={sub.icon}
                    title={sub.title}
                    description={sub.metaDescription}
                  />
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">Vì sao chọn TSE Vending?</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {silo.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent-500">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-14">
            <h2 className="mb-2 text-xl font-bold text-slate-900">Nên chọn dòng nào? Bảng so sánh nhanh</h2>
            <p className="mb-5 max-w-3xl text-sm text-slate-600">
              Mỗi dòng sản phẩm trong nhóm {silo.title.toLowerCase()} phù hợp với một nhóm vị trí và mục tiêu kinh
              doanh khác nhau. Tham khảo bảng dưới đây để chọn dòng phù hợp nhất, hoặc liên hệ TSE Vending để được
              tư vấn chi tiết theo vị trí thực tế.
            </p>
            <ComparisonTable subcategories={silo.subcategories} />
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

      <FaqSection faqs={silo.faqs} />
      <Cta />
    </>
  );
}
