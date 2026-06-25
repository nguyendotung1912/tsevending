import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, absoluteUrl } from "@/lib/seo";
import { caseStudies } from "@/content/case-studies";
import { reviews } from "@/content/reviews";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Khách Hàng & Dự Án Smart Locker | TSE Vending",
  description:
    "Khách hàng và dự án tiêu biểu của TSE Vending: tủ locker thông minh tại chung cư, trường đại học, bệnh viện — kèm case study chi tiết và đánh giá thực tế.",
  path: "/khach-hang",
});

const breadcrumbs = [{ name: "Khách hàng & dự án", path: "/khach-hang" }];

const trust = [
  { value: "500+", label: "Thiết bị đang vận hành" },
  { value: "50+", label: "Đối tác doanh nghiệp" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "4", label: "Tỉnh thành có kỹ thuật viên" },
];

// Text logo tiles. ⚠ [CẦN QUYỀN LOGO] — thay bằng logo thật sau khi có chấp thuận.
const logos = [
  ...caseStudies.map((c) => c.logoText),
  ...reviews.map((r) => r.company),
];

export default function KhachHangPage() {
  const uniqueLogos = Array.from(new Set(logos));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />
      <JsonLd
        data={itemListJsonLd({
          name: "Case study & dự án TSE Vending",
          description: "Danh sách case study smart locker tiêu biểu của TSE Vending.",
          path: "/khach-hang",
          items: caseStudies.map((c, i) => ({
            name: `Smart Locker tại ${c.clientShort}`,
            url: absoluteUrl(`/case-study/${c.slug}`),
            description: c.summary,
            position: i + 1,
          })),
        })}
      />

      <PageHeader
        eyebrow="Khách hàng & dự án"
        title="Khách hàng tin dùng smart locker TSE Vending"
        description="Các dự án tủ locker thông minh tiêu biểu tại chung cư, trường đại học và bệnh viện — kèm case study chi tiết và đánh giá thực tế từ khách hàng."
        breadcrumbs={breadcrumbs}
      />

      {/* Trust stats */}
      <section className="border-b border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trust.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-brand-700">{s.value}</div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo wall (text placeholders) */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Đơn vị đã tin dùng</p>
          <h2 className="mt-1 mb-6 text-2xl font-extrabold text-slate-900">Khách hàng tiêu biểu</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {uniqueLogos.map((name) => (
              <div key={name} className="flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-center">
                <span className="text-sm font-bold text-slate-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Case study chi tiết</p>
          <h2 className="mt-1 mb-6 text-2xl font-extrabold text-slate-900">Dự án smart locker tiêu biểu</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/case-study/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-brand-600">{c.industry}</span>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:text-brand-700">{c.clientShort}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.summary}</p>
                <span className="mt-4 text-sm font-bold text-brand-600">Đọc case study →</span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/du-an" className="text-sm font-semibold text-brand-600 hover:underline">
              → Xem thêm hình ảnh các công trình thực tế tại trang dự án
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
