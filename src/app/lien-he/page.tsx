import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: `Liên hệ ${siteConfig.name}`,
  description: `Liên hệ ${siteConfig.name} để được tư vấn miễn phí về máy bán hàng tự động và tủ locker thông minh. Hotline: ${siteConfig.phoneDisplay}.`,
  path: "/lien-he",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Liên hệ"
        title="Liên hệ TSE Vending"
        description="Để lại thông tin, đội ngũ TSE Vending sẽ liên hệ tư vấn giải pháp phù hợp với mặt bằng và nhu cầu của bạn trong thời gian sớm nhất."
        breadcrumbs={[{ name: "Liên hệ", path: "/lien-he" }]}
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Thông tin liên hệ</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <span>🏢</span>
                <span>{siteConfig.legalName}</span>
              </li>
              <li className="flex gap-2">
                <span>📍</span>
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href={`tel:${siteConfig.phone}`} className="text-brand-600 hover:underline">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-2">
                <span>👥</span>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Fanpage Facebook
                </a>
              </li>
              <li className="flex gap-2">
                <span>🗺️</span>
                <span>Khu vực phục vụ: {siteConfig.areasServed.slice(0, -1).join(", ")} và toàn quốc.</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
