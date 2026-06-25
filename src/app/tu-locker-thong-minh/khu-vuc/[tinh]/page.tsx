import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { lockerAreas, getLockerArea } from "@/content/locker-areas";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export function generateStaticParams() {
  return lockerAreas.map((a) => ({ tinh: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tinh: string }> }): Promise<Metadata> {
  const { tinh } = await params;
  const area = getLockerArea(tinh);
  if (!area) return {};
  return buildMetadata({ title: area.metaTitle, description: area.metaDescription, path: `/tu-locker-thong-minh/khu-vuc/${area.slug}` });
}

export default async function LockerAreaPage({ params }: { params: Promise<{ tinh: string }> }) {
  const { tinh } = await params;
  const area = getLockerArea(tinh);
  if (!area) notFound();

  const breadcrumbs = [
    { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
    { name: `Khu vực ${area.city}`, path: `/tu-locker-thong-minh/khu-vuc/${area.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Smart locker tại ${area.cityFull}`,
          description: area.metaDescription,
          path: `/tu-locker-thong-minh/khu-vuc/${area.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
          { name: `Khu vực ${area.city}`, path: `/tu-locker-thong-minh/khu-vuc/${area.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={`Smart locker ${area.city}`}
        title={area.h1}
        description={area.metaDescription}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <QuickAnswer>{area.quickAnswer}</QuickAnswer>

          <div className="prose prose-slate mt-8 max-w-none prose-a:text-brand-600">
            {area.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <h2 className="mb-5 mt-10 text-xl font-extrabold text-slate-900">
            Ứng dụng smart locker phổ biến tại {area.city}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {area.useCases.map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <p className="text-sm font-bold text-brand-700">{u.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{u.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">Cần lắp smart locker tại {area.city}?</p>
            <p className="mt-2 text-sm text-slate-600">Kỹ thuật viên TSE thường trú — khảo sát và báo giá miễn phí.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">
                Gọi {siteConfig.phoneDisplay}
              </a>
              <Link href="/lien-he" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Tìm hiểu thêm: <Link href="/tu-locker-thong-minh" className="font-semibold text-brand-600 hover:underline">smart locker (tủ locker thông minh)</Link>{" "}
            · <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">smart locker là gì</Link>{" "}
            · <Link href="/tu-locker-thong-minh/bang-gia" className="font-semibold text-brand-600 hover:underline">bảng giá</Link>.
          </p>

          {/* Các khu vực khác */}
          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Khu vực khác</p>
            <div className="flex flex-wrap gap-2">
              {lockerAreas.filter((a) => a.slug !== area.slug).map((a) => (
                <Link key={a.slug} href={`/tu-locker-thong-minh/khu-vuc/${a.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 hover:bg-slate-50">
                  Smart locker {a.city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={area.faqs} title={`Câu hỏi về smart locker tại ${area.city}`} />
      <Cta />
    </>
  );
}
