import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, articleJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { mainAuthor } from "@/content/authors";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, CATEGORY_META } from "@/lib/content";
import { getSiloBySlug, getSubcategory } from "@/content/categories";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const meta = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/tin-tuc/${slug}`,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    type: "article",
    datePublished: post.date,
    dateModified: post.updated,
  });

  // Noindex thin content — protects against Google Scaled Content Abuse penalty.
  // `indexable` is computed in lib/content (single source of truth shared with
  // the sitemap) so the sitemap never advertises a page we set to noindex.
  if (!post.indexable) {
    return { ...meta, robots: { index: false, follow: false } };
  }

  return meta;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const silo = getSiloBySlug(post.silo);
  const subResult = post.sub ? getSubcategory(post.silo, post.sub) : undefined;
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const breadcrumbs = [
    { name: "Tin tức", path: "/tin-tuc" },
    ...(post.category
      ? [{ name: CATEGORY_META[post.category].label, path: `/tin-tuc/${post.category}` }]
      : []),
    { name: post.title, path: `/tin-tuc/${slug}` },
  ];
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/tin-tuc/${slug}`,
          datePublished: post.date,
          dateModified: post.updated,
          image: post.image ? `${siteConfig.url}${post.image}` : undefined,
          keywords: post.keywords,
          articleSection: silo?.title,
        })}
      />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={faqJsonLd(post.faqs)} />
      )}
      <PageHeader title={post.title} breadcrumbs={breadcrumbs} />

      {post.image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <section className="py-10">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_260px]">
          <article>
            <p className="mb-6 text-sm text-slate-500">Cập nhật: {date}</p>
            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span key={kw} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/40 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <details key={i} className="group rounded-xl border border-brand-100 bg-white" open={i === 0}>
                      <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 font-semibold text-slate-800 marker:hidden list-none">
                        <span>{faq.q}</span>
                        <span className="shrink-0 text-brand-600 transition group-open:rotate-180">▾</span>
                      </summary>
                      <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center text-white text-lg font-bold">
                {mainAuthor.name.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Tác giả</p>
                <Link href={mainAuthor.url} className="font-bold text-slate-900 hover:text-brand-700">
                  {mainAuthor.name}
                </Link>
                <p className="text-xs text-brand-700 font-medium">{mainAuthor.jobTitle}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mainAuthor.description}</p>
              </div>
            </div>
          </article>

          <aside className="space-y-4">
            {post.category && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  Loại bài viết
                </h2>
                <Link
                  href={`/tin-tuc/${post.category}`}
                  className={`inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${CATEGORY_META[post.category].bg} ${CATEGORY_META[post.category].color} hover:opacity-80`}
                >
                  {CATEGORY_META[post.category].label}
                </Link>
              </div>
            )}
            {silo && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-600">
                  Chuyên mục
                </h2>
                <Link href={`/${silo.slug}`} className="mt-2 block font-bold text-brand-700 hover:underline">
                  {silo.icon} {silo.title}
                </Link>
                {subResult && (
                  <Link
                    href={`/${silo.slug}/${subResult.sub.slug}`}
                    className="mt-2 block text-sm text-brand-600 hover:underline"
                  >
                    {subResult.sub.icon} {subResult.sub.title}
                  </Link>
                )}
              </div>
            )}
            {silo && silo.subcategories.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  Danh mục sản phẩm
                </h2>
                <ul className="space-y-2">
                  {silo.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/${silo.slug}/${sub.slug}`}
                        className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-900 hover:underline font-medium"
                      >
                        <span className="text-base">{sub.icon}</span>
                        <span>{sub.shortTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {silo && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  Trang chính
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href={`/${silo.slug}`} className="text-brand-700 hover:underline font-medium">
                      Tất cả {silo.shortTitle}
                    </Link>
                  </li>
                  <li>
                    <Link href="/tin-tuc" className="text-brand-700 hover:underline">
                      ← Tất cả bài viết
                    </Link>
                  </li>
                  <li>
                    <Link href="/lien-he" className="text-brand-700 hover:underline">
                      Liên hệ tư vấn
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <Link
              href="/lien-he"
              className="block rounded-2xl bg-brand-700 p-5 text-center text-sm font-bold text-white hover:bg-brand-800"
            >
              Cần tư vấn? Liên hệ ngay
            </Link>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Bài viết liên quan</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
