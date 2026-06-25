import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, absoluteUrl, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getSiloBySlug } from "@/content/categories";
import { PROVINCES, getProvince } from "@/content/provinces";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import FaqSection from "@/components/Faq";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

// Provinces where TSE Vending has resident technicians — index these, noindex the rest
const INDEXED_PROVINCES = new Set(["ho-chi-minh", "ha-noi", "da-nang", "binh-duong"]);

export function generateStaticParams() {
  return PROVINCES.map((p) => ({
    silo: "may-ban-hang-tu-dong",
    tinh: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string; tinh: string }>;
}): Promise<Metadata> {
  const { tinh } = await params;
  const province = getProvince(tinh);
  if (!province) return {};
  const meta = buildMetadata({
    title: `Máy Bán Hàng Tự Động tại ${province.name} | TSE Vending`,
    description: `Cung cấp, lắp đặt máy bán hàng tự động tại ${province.name}. ${province.marketContext.slice(0, 120)}... Tư vấn miễn phí — Hotline: ${siteConfig.phoneDisplay}.`,
    path: `/may-ban-hang-tu-dong/tinh-thanh/${tinh}`,
  });
  if (!INDEXED_PROVINCES.has(tinh)) {
    return { ...meta, robots: { index: false, follow: false } };
  }
  return meta;
}

const regionLabel: Record<string, string> = {
  north: "Miền Bắc",
  central: "Miền Trung",
  south: "Miền Nam",
};

const demandLabel: Record<string, { label: string; color: string }> = {
  high:   { label: "Nhu cầu cao",    color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  medium: { label: "Nhu cầu trung bình", color: "text-amber-700 bg-amber-50 border-amber-200" },
  low:    { label: "Nhu cầu đang hình thành", color: "text-slate-700 bg-slate-50 border-slate-200" },
};

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ silo: string; tinh: string }>;
}) {
  const { tinh } = await params;
  const province = getProvince(tinh);
  if (!province) notFound();

  const silo = getSiloBySlug("may-ban-hang-tu-dong");
  if (!silo) notFound();

  const demand = demandLabel[province.demandLevel];

  const faqs = [
    {
      q: `Máy bán hàng tự động tại ${province.name} đặt ở đâu hiệu quả nhất?`,
      a: `Tại ${province.name}, vị trí hiệu quả nhất gồm: ${province.notableAreas.slice(0, 3).join(", ")} và các khu vực tập trung đông người lao động, học sinh, sinh viên. ${province.industrialZones.length > 0 ? `Các khu công nghiệp như ${province.industrialZones.slice(0, 2).join(", ")} cũng là địa điểm lý tưởng phục vụ công nhân ca đêm.` : ""}`,
    },
    {
      q: `TSE Vending có hỗ trợ lắp đặt tại ${province.name} không?`,
      a: `Có. ${province.deliveryNote} TSE Vending tư vấn vị trí, lắp đặt và bảo trì máy bán hàng tự động trên toàn tỉnh ${province.name}. Liên hệ Hotline ${siteConfig.phoneDisplay} để được tư vấn miễn phí.`,
    },
    {
      q: `Chi phí lắp đặt máy bán hàng tự động tại ${province.name} là bao nhiêu?`,
      a: `Chi phí lắp đặt máy bán hàng tự động tại ${province.name} phụ thuộc vào dòng máy, khoảng cách vận chuyển và yêu cầu kỹ thuật tại vị trí. TSE Vending báo giá trọn gói bao gồm vận chuyển, lắp đặt và đào tạo vận hành — không phát sinh phí ẩn. Liên hệ để nhận báo giá cụ thể.`,
    },
    {
      q: `Ngành nào tại ${province.name} phù hợp đầu tư máy bán hàng tự động?`,
      a: `Tại ${province.name}, các ngành có nhu cầu cao nhất gồm: ${province.keyIndustries.slice(0, 3).join(", ")}. Đặc biệt, các doanh nghiệp trong lĩnh vực này thường có lực lượng lao động đông, giờ làm việc kéo dài và không gian căng tin hạn chế — phù hợp hoàn toàn với giải pháp máy bán hàng tự động.`,
    },
    ...(province.faqExtra ? [province.faqExtra] : []),
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `TSE Vending — Máy bán hàng tự động tại ${province.name}`,
    image: absoluteUrl("/logo.svg"),
    url: absoluteUrl(`/may-ban-hang-tu-dong/tinh-thanh/${tinh}`),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: "VN",
    },
    areaServed: {
      "@type": "State",
      name: province.name,
      containedInPlace: { "@type": "Country", name: "Vietnam" },
    },
    description: `Cung cấp và lắp đặt máy bán hàng tự động tại ${province.name}. ${province.marketContext.slice(0, 200)}`,
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Máy bán hàng tự động", path: "/may-ban-hang-tu-dong" },
        { name: `Tỉnh thành`, path: "/may-ban-hang-tu-dong/tinh-thanh" },
        { name: province.name, path: `/may-ban-hang-tu-dong/tinh-thanh/${tinh}` },
      ])} />

      <PageHeader
        eyebrow="Máy bán hàng tự động"
        title={`Máy bán hàng tự động tại ${province.name}`}
        description={`TSE Vending cung cấp, lắp đặt và bảo trì máy bán hàng tự động tại ${province.name}. ${province.deliveryNote}`}
        breadcrumbs={[
          { name: "Máy bán hàng tự động", path: "/may-ban-hang-tu-dong" },
          { name: province.name, path: `/may-ban-hang-tu-dong/tinh-thanh/${tinh}` },
        ]}
      />

      {/* Snippet-ready direct answer + E-E-A-T byline */}
      {faqs[0] && (
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <QuickAnswer>{faqs[0].a}</QuickAnswer>
          <div className="mt-3">
            <AuthorByline />
          </div>
        </div>
      )}

      {/* ── PROVINCE OVERVIEW ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                  Thị trường máy bán hàng tự động tại {province.name}
                </h2>
                <p className="text-slate-700 leading-relaxed">{province.marketContext}</p>
              </div>

              {/* Industrial zones */}
              {province.industrialZones.length > 0 && (
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                    Khu công nghiệp & khu kinh tế tại {province.name}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">
                    Các khu công nghiệp tập trung đông lao động là địa điểm lý tưởng để đặt máy bán hàng tự động — đặc biệt phục vụ ca đêm và giờ nghỉ giải lao khi căng tin đóng cửa.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {province.industrialZones.map((zone) => (
                      <div key={zone} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-100">
                          <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{zone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable areas */}
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                  Khu vực tiềm năng đặt máy tại {province.name}
                </h2>
                <p className="text-slate-600 text-sm mb-4">
                  TSE Vending khảo sát và tư vấn vị trí đặt máy miễn phí trên toàn tỉnh, đặc biệt tại các khu vực đông dân và có nhu cầu cao.
                </p>
                <div className="flex flex-wrap gap-2">
                  {province.notableAreas.map((area) => (
                    <span key={area} className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 border border-brand-200">
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key industries */}
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                  Ngành kinh tế chủ lực của {province.name}
                </h2>
                <p className="text-slate-600 text-sm mb-4">
                  Nhu cầu máy bán hàng tự động tập trung cao nhất tại các doanh nghiệp thuộc các ngành sau:
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {province.keyIndustries.map((industry) => (
                    <li key={industry} className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="h-4 w-4 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Locker section */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Tủ locker thông minh tại {province.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">{province.lockerContext}</p>
                <Link
                  href="/tu-locker-thong-minh"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600 hover:underline"
                >
                  Tìm hiểu thêm về tủ locker thông minh →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Province stats */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">{province.name}</p>
                <dl className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">Vùng miền</dt>
                    <dd className="font-semibold text-slate-900">{regionLabel[province.region]}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">Dân số</dt>
                    <dd className="font-semibold text-slate-900">{province.population}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">KCN / KKT</dt>
                    <dd className="font-semibold text-slate-900">{province.industrialZones.length > 0 ? `${province.industrialZones.length} khu` : "Đang phát triển"}</dd>
                  </div>
                </dl>
                <div className={`mt-4 rounded-xl border px-3 py-2 text-center text-xs font-bold ${demand.color}`}>
                  {demand.label}
                </div>
              </div>

              {/* Delivery note */}
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">Thời gian lắp đặt</p>
                <p className="text-sm text-slate-700 leading-relaxed">{province.deliveryNote}</p>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <p className="text-sm font-bold text-accent-900">Tư vấn miễn phí tại {province.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-accent-800">
                  Đội tư vấn TSE Vending sẽ phân tích vị trí đặt máy và đề xuất giải pháp phù hợp nhất với đặc thù kinh tế tại {province.name}.
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-4 block rounded-xl bg-accent-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-accent-600"
                >
                  Gọi {siteConfig.phoneDisplay} →
                </a>
                <Link
                  href="/lien-he"
                  className="mt-2 block rounded-xl border border-accent-300 px-4 py-2.5 text-center text-sm font-semibold text-accent-700 transition hover:bg-accent-100"
                >
                  Gửi yêu cầu tư vấn
                </Link>
              </div>

              {/* Links to priority provinces with resident technicians */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Có kỹ thuật viên thường trú</p>
                <p className="text-xs text-slate-400 mb-3">Lắp đặt và bảo trì trong ngày</p>
                <ul className="space-y-2">
                  {[
                    { slug: "ho-chi-minh", name: "TP. Hồ Chí Minh" },
                    { slug: "ha-noi", name: "Hà Nội" },
                    { slug: "da-nang", name: "Đà Nẵng" },
                    { slug: "binh-duong", name: "Bình Dương" },
                  ].filter((p) => p.slug !== tinh).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/may-ban-hang-tu-dong/tinh-thanh/${p.slug}`}
                        className="text-sm text-brand-700 hover:underline"
                      >
                        {p.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── WHY TSE ── */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            Tại sao chọn TSE Vending tại {province.name}?
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏭", title: "Sản xuất nội địa", desc: "Linh kiện thay thế luôn sẵn có tại Việt Nam, không phải chờ nhập khẩu." },
              { icon: "📡", title: "IoT giám sát từ xa", desc: `Quản lý máy tại ${province.name} từ xa 24/7 qua app, cảnh báo tự động.` },
              { icon: "🔧", title: "Bảo trì đúng hẹn", desc: `${province.deliveryNote.split(".")[0]}.` },
              { icon: "📋", title: "Hợp đồng rõ ràng", desc: "Bảo hành, phạm vi bảo trì ghi rõ trong hợp đồng — không phát sinh phí ẩn." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title={`Câu hỏi thường gặp về máy bán hàng tự động tại ${province.name}`} />

      {/* ── RELATED SILOS ── */}
      <section className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {silo.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/may-ban-hang-tu-dong/${sub.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700 shadow-sm"
              >
                <span>{sub.icon}</span>
                <span>{sub.shortTitle}</span>
              </Link>
            ))}
            <Link
              href="/may-ban-hang-tu-dong"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
            >
              Xem tất cả máy bán hàng tự động →
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
