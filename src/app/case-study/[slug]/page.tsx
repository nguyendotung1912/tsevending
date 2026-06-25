import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, articleJsonLd, organizationJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import VideoSection from "@/components/VideoSection";
import Cta from "@/components/Cta";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.metaTitle,
    description: cs.metaDescription,
    path: `/case-study/${cs.slug}`,
    type: "article",
    datePublished: `${cs.year}-01-01`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const breadcrumbs = [
    { name: "Khách hàng & dự án", path: "/khach-hang" },
    { name: cs.clientShort, path: `/case-study/${cs.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: cs.metaTitle,
          description: cs.metaDescription,
          path: `/case-study/${cs.slug}`,
          datePublished: `${cs.year}-01-01`,
          keywords: ["case study smart locker", "dự án tủ locker thông minh", cs.clientShort],
          articleSection: "Case study",
        })}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />

      <PageHeader
        eyebrow={`Case study · ${cs.industry}`}
        title={`Smart Locker tại ${cs.clientShort}`}
        description={cs.summary}
        breadcrumbs={breadcrumbs}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Meta bar */}
        <dl className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm sm:grid-cols-3">
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Khách hàng</dt><dd className="mt-0.5 font-bold text-slate-800">{cs.clientShort}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ngành</dt><dd className="mt-0.5 font-bold text-slate-800">{cs.industry}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Địa điểm · Năm</dt><dd className="mt-0.5 font-bold text-slate-800">{cs.location} · {cs.year}</dd></div>
        </dl>

        <div className="space-y-10 text-[15px] leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 text-xl font-extrabold text-slate-900">Bối cảnh khách hàng</h2>
            <p>{cs.context}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-extrabold text-slate-900">Vấn đề</h2>
            <ul className="space-y-2">
              {cs.problem.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-red-400" />{p}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-extrabold text-slate-900">Giải pháp của TSE Vending</h2>
            <ul className="space-y-2">
              {cs.solution.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-extrabold text-slate-900">Kết quả</h2>
            <div className="grid grid-cols-2 gap-4">
              {cs.results.map((r) => (
                <div key={r.label} className={`rounded-2xl border p-5 ${r.real ? "border-slate-200 border-t-4 border-t-brand-600 bg-white" : "border-dashed border-amber-300 bg-amber-50"}`}>
                  <p className={`text-2xl font-extrabold ${r.real ? "text-brand-700" : "text-amber-600"}`}>{r.value}</p>
                  <p className="mt-1 text-xs text-slate-600">{r.label}</p>
                </div>
              ))}
            </div>
          </section>

          {cs.testimonial && (
            <figure className="rounded-2xl border-l-4 border-brand-500 bg-brand-50/50 p-6">
              <blockquote className="text-base italic leading-relaxed text-slate-700">“{cs.testimonial.text}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-slate-800">
                {cs.testimonial.author}<span className="font-normal text-slate-500"> — {cs.testimonial.role}</span>
              </figcaption>
            </figure>
          )}

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-2 text-sm font-bold text-slate-800">Tìm hiểu giải pháp liên quan</p>
            <ul className="space-y-1.5">
              {cs.related.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-semibold text-brand-600 hover:underline">→ {l.label}</Link>
                </li>
              ))}
              <li><Link href="/khach-hang" className="text-sm font-semibold text-brand-600 hover:underline">→ Xem tất cả khách hàng &amp; dự án</Link></li>
            </ul>
          </section>
        </div>
      </article>

      {/* Video slot (placeholder until the case-study video is published) */}
      <VideoSection path={`/case-study/${cs.slug}`} title={`Video dự án ${cs.clientShort}`} />

      <Cta />
    </>
  );
}
