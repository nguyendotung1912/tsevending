import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { mainAuthor } from "@/content/authors";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: `Giới thiệu ${siteConfig.name} — Nhà cung cấp máy bán hàng tự động & tủ locker`,
  description: `${siteConfig.legalName} — hơn 10 năm kinh nghiệm sản xuất và triển khai máy bán hàng tự động, tủ locker thông minh tại Việt Nam. Đội kỹ thuật thường trú tại TP.HCM, Hà Nội, Đà Nẵng, Bình Dương.`,
  path: "/gioi-thieu",
});

const authorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": mainAuthor.url,
  name: mainAuthor.name,
  jobTitle: mainAuthor.jobTitle,
  description: mainAuthor.description,
  url: mainAuthor.url,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  knowsAbout: mainAuthor.expertise,
};

const stats = [
  { value: "500+", label: "Thiết bị đang vận hành", icon: "🖥️" },
  { value: "10+", label: "Năm kinh nghiệm", icon: "📅" },
  { value: "50+", label: "Đối tác doanh nghiệp", icon: "🤝" },
  { value: "4", label: "Tỉnh có kỹ thuật viên", icon: "📍" },
];

const industries = [
  { icon: "🏢", label: "Chung cư" },
  { icon: "🏭", label: "Khu công nghiệp" },
  { icon: "🏢", label: "Văn phòng" },
  { icon: "🏫", label: "Trường học" },
  { icon: "🏨", label: "Khách sạn" },
  { icon: "🏥", label: "Bệnh viện" },
  { icon: "🛒", label: "Siêu thị" },
  { icon: "📦", label: "Logistics" },
  { icon: "🏋️", label: "Thể thao & Gym" },
  { icon: "✈️", label: "Sân bay" },
  { icon: "🏛️", label: "Cơ quan nhà nước" },
  { icon: "🍽️", label: "F&B, Căng-tin" },
];

const values = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    title: "Chất lượng thiết bị",
    body: "Thiết bị được sản xuất và kiểm định theo quy trình nghiêm ngặt, đảm bảo độ bền và an toàn khi vận hành liên tục 24/7.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    title: "Đồng hành dài hạn",
    body: "TSE Vending tư vấn vị trí, đề xuất mô hình hợp tác và hỗ trợ vận hành, bảo trì xuyên suốt vòng đời dự án.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    title: "Hệ thống mở",
    body: "Quản lý tích hợp đa phương thức thanh toán và có thể kết nối API với đối tác logistics, sàn thương mại điện tử.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-rose-400",
    bg: "bg-rose-500/15",
    title: "Kỹ thuật tại chỗ",
    body: `Đội kỹ thuật thường trú tại ${siteConfig.areasServed.slice(0, 4).join(", ")} — phản hồi nhanh, giảm thời gian ngừng máy.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={authorJsonLd} />
      <PageHeader
        eyebrow="Về chúng tôi"
        title={`Giới thiệu ${siteConfig.name}`}
        description={`${siteConfig.legalName} — thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker thông minh tại Việt Nam từ năm 2014.`}
        breadcrumbs={[{ name: "Giới thiệu", path: "/gioi-thieu" }]}
      />

      {/* Stats bar */}
      <section className="border-b border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">{s.icon}</span>
                <div className="text-2xl font-extrabold text-brand-700">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company story + Map */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Hành trình</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">TSE Vending là ai?</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <p>
                  {siteConfig.name} ({siteConfig.legalName}) thành lập năm 2014, chuyên thiết kế, sản xuất và phân phối máy bán hàng tự động (vending machine) và tủ locker thông minh (smart locker) tại Việt Nam.
                </p>
                <p>
                  Điểm khác biệt của TSE Vending là sản xuất thiết bị trong nước: linh kiện thay thế luôn sẵn có, thời gian bảo trì ngắn và chi phí không phụ thuộc biến động nhập khẩu.
                </p>
                <p>
                  TSE Vending hiện có đội kỹ thuật thường trú tại {siteConfig.areasServed.slice(0, 4).join(", ")} — lắp đặt và bảo trì trong ngày tại các tỉnh thành này, và mở rộng mạng lưới đối tác trên toàn quốc.
                </p>
                <p>
                  Đến nay, hơn 500 thiết bị đang vận hành tại chung cư, khu công nghiệp, văn phòng, trường học, bệnh viện và khách sạn.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/du-an"
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
                >
                  Xem công trình thực tế →
                </Link>
                <Link
                  href="/lien-he"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Địa chỉ TSE Vending"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.street + ", " + siteConfig.address.city)}&z=15&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
                <p className="text-xs font-semibold text-slate-700">{siteConfig.name}</p>
                <p className="text-xs text-slate-500">{siteConfig.address.street}</p>
                <p className="text-xs text-slate-500">{siteConfig.address.city}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-700 hover:underline">
                    📞 {siteConfig.phoneDisplay}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-700 hover:underline">
                    ✉️ {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Ngành nghề</p>
          <h2 className="mt-1 mb-6 text-xl font-extrabold text-slate-900">
            TSE Vending phục vụ các ngành
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <span className="text-2xl">{ind.icon}</span>
                <span className="text-xs font-medium text-slate-600">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values: dark */}
      <section className="relative overflow-hidden bg-slate-900 py-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">Nguyên tắc vận hành</p>
          <h2 className="mt-2 mb-8 text-2xl font-extrabold text-white">Định hướng kỹ thuật của TSE Vending</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${v.bg} ${v.color}`}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14" id="nguyen-do-tung">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Con người</p>
          <h2 className="mt-2 mb-6 text-2xl font-extrabold text-slate-900">Đội ngũ chuyên gia</h2>
          <div className="max-w-2xl">
            <div className="flex gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white">
                {mainAuthor.name.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{mainAuthor.name}</h3>
                <p className="text-sm font-medium text-brand-700">{mainAuthor.jobTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{mainAuthor.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mainAuthor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link to projects */}
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-brand-900">Xem công trình thực tế của TSE Vending</p>
                <p className="text-xs text-brand-700 mt-0.5">8 dự án tại TP.HCM, Bình Dương, Hà Nội, Đà Nẵng</p>
              </div>
              <Link
                href="/du-an"
                className="ml-4 flex-none rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Xem →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service coverage */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Khu vực phục vụ</p>
          <h2 className="mt-1 mb-6 text-xl font-extrabold text-slate-900">
            Kỹ thuật viên thường trú — lắp đặt trong ngày
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { city: "TP. Hồ Chí Minh", note: "Trụ sở chính, kho linh kiện lớn nhất", sla: "Trong ngày", slug: "ho-chi-minh" },
              { city: "Hà Nội", note: "Đội kỹ thuật + kho linh kiện tại Hà Nội", sla: "1–2 ngày", slug: "ha-noi" },
              { city: "Bình Dương", note: "Phủ toàn bộ các KCN trong vòng 4 giờ", sla: "Trong ngày", slug: "binh-duong" },
              { city: "Đà Nẵng", note: "Trung tâm khu vực miền Trung", sla: "2–3 ngày", slug: "da-nang" },
            ].map((loc) => (
              <div key={loc.city} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <h3 className="text-sm font-bold text-slate-900">{loc.city}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{loc.note}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    {loc.sla}
                  </span>
                  <Link
                    href={`/may-ban-hang-tu-dong/tinh-thanh/${loc.slug}`}
                    className="text-xs font-semibold text-brand-700 hover:underline"
                  >
                    Chi tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
