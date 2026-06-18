import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { mainAuthor } from "@/content/authors";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: `Giới thiệu ${siteConfig.name}`,
  description: `Thông tin về ${siteConfig.legalName} - nhà sản xuất và cung cấp máy bán hàng tự động, tủ locker thông minh tại Việt Nam.`,
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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={authorJsonLd} />
      <PageHeader
        eyebrow="Về chúng tôi"
        title={`Giới thiệu ${siteConfig.name}`}
        description={`${siteConfig.legalName} là đơn vị chuyên sản xuất, cung cấp và vận hành máy bán hàng tự động & tủ locker thông minh tại Việt Nam.`}
        breadcrumbs={[{ name: "Giới thiệu", path: "/gioi-thieu" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">
            <h2>Hành trình của TSE Vending</h2>
            <p>
              {siteConfig.name} ({siteConfig.legalName}) ra đời với mục tiêu mang giải pháp tự động hóa
              bán lẻ và lưu trữ thông minh đến gần hơn với người Việt - từ máy bán hàng tự động cho
              văn phòng, trường học, đến tủ locker thông minh cho chung cư và khu công nghiệp.
            </p>
            <p>
              Chúng tôi tin rằng tự động hóa không chỉ giúp doanh nghiệp tối ưu chi phí vận hành mà còn
              nâng cao trải nghiệm cho người dùng cuối - mua hàng nhanh chóng, gửi/nhận đồ tiện lợi,
              hoạt động liên tục 24/7 không cần nhân sự trông coi.
            </p>

            <h2>Giá trị cốt lõi</h2>
            <ul>
              <li>
                <strong>Chất lượng:</strong> Thiết bị được sản xuất và kiểm định theo quy trình nghiêm
                ngặt, đảm bảo độ bền và an toàn khi vận hành liên tục.
              </li>
              <li>
                <strong>Đồng hành dài hạn:</strong> Không chỉ bán thiết bị, TSE Vending tư vấn vị trí,
                mô hình kinh doanh và hỗ trợ vận hành - bảo trì xuyên suốt quá trình sử dụng.
              </li>
              <li>
                <strong>Công nghệ mở:</strong> Hệ thống quản lý tích hợp đa phương thức thanh toán và
                có thể kết nối API với đối tác logistics, sàn thương mại điện tử.
              </li>
            </ul>

            <h2>Khu vực hoạt động</h2>
            <p>
              TSE Vending hiện cung cấp thiết bị và dịch vụ kỹ thuật tại{" "}
              {siteConfig.areasServed.slice(0, -1).join(", ")} và đang tiếp tục mở rộng mạng lưới đối
              tác trên toàn quốc.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50" id="nguyen-do-tung">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Đội ngũ chuyên gia</h2>
          <div className="flex gap-6 items-start bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-700 flex items-center justify-center text-white text-2xl font-bold">
              {mainAuthor.name.split(" ").pop()?.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{mainAuthor.name}</h3>
              <p className="text-sm text-brand-700 font-medium mb-2">{mainAuthor.jobTitle}</p>
              <p className="text-sm text-slate-600 mb-3">{mainAuthor.description}</p>
              <div className="flex flex-wrap gap-2">
                {mainAuthor.expertise.map((skill) => (
                  <span key={skill} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
