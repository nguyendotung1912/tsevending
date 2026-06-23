import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: `Liên hệ ${siteConfig.name}`,
  description: `Liên hệ ${siteConfig.name} để được tư vấn về máy bán hàng tự động và tủ locker thông minh. Hotline: ${siteConfig.phoneDisplay}.`,
  path: "/lien-he",
});

const contactItems = [
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "Công ty",
    value: siteConfig.legalName,
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Địa chỉ",
    value: `${siteConfig.address.street}, ${siteConfig.address.city}`,
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Hotline",
    href: `tel:${siteConfig.phone}`,
    value: siteConfig.phoneDisplay,
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    label: "Facebook",
    href: siteConfig.social.facebook,
    value: "Fanpage Facebook",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Liên hệ"
        title="Liên hệ TSE Vending"
        description="Để lại thông tin, đội kỹ thuật TSE Vending sẽ liên hệ tư vấn giải pháp phù hợp với mặt bằng và nhu cầu của bạn."
        breadcrumbs={[{ name: "Liên hệ", path: "/lien-he" }]}
      />

      <section className="py-0">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5">

            {/* Left: dark info panel */}
            <div className="relative overflow-hidden bg-slate-900 lg:col-span-2">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-600/15 blur-3xl" />
              <div className="relative p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">Thông tin liên hệ</p>
                <h2 className="mt-2 text-lg font-extrabold text-white">Liên hệ trực tiếp</h2>
                <ul className="mt-6 space-y-4">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/10 text-slate-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-slate-200">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-bold text-white">Khu vực phục vụ</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {siteConfig.areasServed.slice(0, -1).join(", ")} với đội kỹ thuật thường trú. Các tỉnh thành khác qua mạng lưới đối tác toàn quốc.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-8 sm:p-10 lg:col-span-3 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Gửi yêu cầu</p>
              <h2 className="mt-2 mb-6 text-lg font-extrabold text-slate-900">
                Mô tả nhu cầu để được tư vấn chính xác
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
