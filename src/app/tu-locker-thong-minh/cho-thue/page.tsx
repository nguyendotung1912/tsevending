import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Cho Thuê Tủ Locker Thông Minh Trọn Gói | TSE Vending",
  description:
    "Cho thuê tủ locker thông minh trọn gói (OPEX): không cần đầu tư vốn, TSE Vending cài đặt và bảo trì — bạn chỉ trả phí dịch vụ hàng tháng. Phù hợp chung cư, văn phòng, siêu thị.",
  path: "/tu-locker-thong-minh/cho-thue",
});

const models = [
  {
    id: "opex",
    icon: "📋",
    name: "Thuê dịch vụ trọn gói (OPEX)",
    badge: "Không cần vốn",
    badgeColor: "bg-emerald-600 text-white",
    highlight: true,
    desc: "TSE Vending cung cấp, lắp đặt và bảo trì toàn bộ hệ thống tủ locker. Bạn trả phí dịch vụ hàng tháng — không đầu tư vốn ban đầu, không lo hao mòn thiết bị.",
    includes: [
      "Cung cấp và lắp đặt tủ locker",
      "Phần mềm quản lý dashboard + app",
      "Bảo trì định kỳ, sửa chữa trong hợp đồng",
      "Cập nhật firmware tự động",
      "Hỗ trợ kỹ thuật 24/7",
    ],
    ideal: "Phù hợp nhất với: chung cư, tòa nhà văn phòng, siêu thị chuỗi muốn triển khai nhanh, không muốn gánh vốn đầu tư.",
    cta: "Đăng ký gói thuê",
  },
  {
    id: "capex",
    icon: "🏗️",
    name: "Mua sở hữu (CAPEX)",
    badge: "Tối ưu chi phí dài hạn",
    badgeColor: "bg-brand-600 text-white",
    highlight: false,
    desc: "Mua đứt hệ thống tủ locker — sở hữu toàn bộ phần cứng. Phù hợp khi bạn muốn vận hành lâu dài (3–5 năm+) và tối ưu chi phí tổng thể.",
    includes: [
      "Sở hữu toàn bộ phần cứng tủ locker",
      "Bảo hành thiết bị theo hãng",
      "Phần mềm quản lý (có thể mua license hoặc thuê tháng)",
      "Đào tạo vận hành cho nhân viên",
      "Hỗ trợ bảo trì theo gói riêng",
    ],
    ideal: "Phù hợp nhất với: doanh nghiệp lớn, bệnh viện, trường đại học, chủ tòa nhà muốn kiểm soát hoàn toàn hệ thống.",
    cta: "Nhận báo giá mua",
  },
  {
    id: "revenue-share",
    icon: "🤝",
    name: "Hợp tác chia sẻ doanh thu",
    badge: "Không chi phí ban đầu",
    badgeColor: "bg-accent-500 text-white",
    highlight: false,
    desc: "TSE Vending đầu tư toàn bộ thiết bị và vận hành. Bạn cung cấp mặt bằng và nhận tỷ lệ % doanh thu từ phí gửi đồ — hoặc nhận máy lắp miễn phí như một tiện ích cho khách hàng/cư dân.",
    includes: [
      "TSE Vending đầu tư và vận hành toàn bộ",
      "Bạn cung cấp mặt bằng (sảnh, hành lang, kho nhỏ)",
      "Chia sẻ doanh thu theo tỷ lệ thỏa thuận",
      "Hoặc nhận máy miễn phí như tiện ích dịch vụ",
      "Hợp đồng linh hoạt 1–3 năm",
    ],
    ideal: "Phù hợp nhất với: chủ tòa nhà, ban quản lý chung cư, siêu thị muốn thêm tiện ích mà không bỏ vốn.",
    cta: "Hỏi về hợp tác",
  },
];

const compareTable = [
  { criteria: "Vốn đầu tư ban đầu", opex: "Không", capex: "Có (toàn bộ giá máy)", revShare: "Không" },
  { criteria: "Quyền sở hữu thiết bị", opex: "TSE Vending", capex: "Bạn", revShare: "TSE Vending" },
  { criteria: "Chi phí hàng tháng", opex: "Phí dịch vụ cố định", capex: "Bảo trì, phần mềm", revShare: "Không (nhận doanh thu)" },
  { criteria: "Rủi ro hao mòn thiết bị", opex: "TSE Vending chịu", capex: "Bạn chịu", revShare: "TSE Vending chịu" },
  { criteria: "Linh hoạt khi thay đổi nhu cầu", opex: "Cao", capex: "Thấp", revShare: "Trung bình" },
  { criteria: "Phù hợp khi vận hành dài hạn", opex: "Trung bình", capex: "Tốt nhất", revShare: "Tốt" },
];

const faqs = [
  {
    q: "Thuê tủ locker thông minh có những chi phí nào?",
    a: "Gói OPEX (thuê dịch vụ trọn gói) bao gồm phí cài đặt ban đầu (1 lần) và phí dịch vụ hàng tháng. Phí hàng tháng bao gồm toàn bộ: phần mềm quản lý, bảo trì định kỳ, linh kiện thay thế trong phạm vi hao mòn bình thường và hỗ trợ kỹ thuật. Chi phí điện tại vị trí lắp đặt do khách hàng chịu.",
  },
  {
    q: "Hợp đồng thuê tối thiểu bao lâu?",
    a: "Hợp đồng thuê dịch vụ tối thiểu 12 tháng. Có thể gia hạn hàng năm hoặc chuyển sang sở hữu sau khi hết hạn hợp đồng đầu tiên với giá ưu đãi. TSE Vending không áp hợp đồng dài hạn bắt buộc cho hầu hết các gói.",
  },
  {
    q: "Nếu tủ locker hỏng, ai chịu chi phí sửa chữa?",
    a: "Trong gói OPEX và mô hình hợp tác chia sẻ doanh thu, TSE Vending chịu toàn bộ chi phí sửa chữa và thay linh kiện do hao mòn bình thường. Hư hỏng do cố tình phá hoại hoặc tai nạn bên ngoài (ví dụ: ngập nước, cháy) thuộc trách nhiệm chủ mặt bằng và bảo hiểm tài sản.",
  },
  {
    q: "Mô hình chia sẻ doanh thu — tỷ lệ chia như thế nào?",
    a: "Tỷ lệ chia doanh thu phụ thuộc vào vị trí đặt tủ, lưu lượng người dùng và số ô tủ. Điển hình: chủ mặt bằng nhận 20–40% doanh thu từ phí gửi đồ. Một số vị trí phù hợp sẽ được hưởng tủ locker hoàn toàn miễn phí như tiện ích dịch vụ (không có phí gửi đồ). Liên hệ để thảo luận cụ thể.",
  },
  {
    q: "Có thể chuyển từ thuê sang mua không?",
    a: "Có. Sau hết hạn hợp đồng thuê, khách hàng có thể mua lại thiết bị với giá đã khấu trừ giá trị hao mòn. Chi tiết ghi rõ trong phụ lục hợp đồng thuê ban đầu.",
  },
];

export default function ChoThueTuLockerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
          { name: "Cho thuê & hợp tác", path: "/tu-locker-thong-minh/cho-thue" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        eyebrow="Tủ locker thông minh"
        title="Cho thuê & hợp tác tủ locker thông minh"
        description="3 mô hình linh hoạt: thuê dịch vụ trọn gói (không cần vốn), mua sở hữu, hoặc hợp tác chia sẻ doanh thu. TSE Vending tư vấn mô hình phù hợp nhất với không gian của bạn."
        breadcrumbs={[
          { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
          { name: "Cho thuê & hợp tác", path: "/tu-locker-thong-minh/cho-thue" },
        ]}
      />

      {/* Model cards */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            3 mô hình triển khai
          </p>
          <h2 className="mt-1 mb-8 text-2xl font-extrabold text-slate-900">
            Chọn mô hình phù hợp với nhu cầu
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {models.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col overflow-hidden rounded-2xl border shadow-sm ${
                  m.highlight
                    ? "border-brand-300 ring-2 ring-brand-200"
                    : "border-slate-200"
                } bg-white`}
              >
                <div
                  className={`border-b px-6 py-5 ${
                    m.highlight ? "border-brand-200 bg-brand-50" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{m.icon}</span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${m.badgeColor}`}>
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.desc}</p>
                </div>

                <div className="flex flex-1 flex-col px-6 py-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Bao gồm
                  </p>
                  <ul className="flex-1 space-y-2">
                    {m.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-none text-emerald-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                    {m.ideal}
                  </div>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className={`mt-4 block rounded-xl px-4 py-2.5 text-center text-sm font-bold transition ${
                      m.highlight
                        ? "bg-brand-600 text-white hover:bg-brand-700"
                        : "border border-brand-200 text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    {m.cta} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
            So sánh chi tiết
          </p>
          <h2 className="mt-1 mb-6 text-2xl font-extrabold text-slate-900">
            OPEX vs CAPEX vs Chia sẻ doanh thu
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-bold">Tiêu chí</th>
                  <th className="px-4 py-3 font-bold text-emerald-700">Thuê trọn gói</th>
                  <th className="px-4 py-3 font-bold text-brand-700">Mua sở hữu</th>
                  <th className="px-4 py-3 font-bold text-accent-700">Chia sẻ DT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {compareTable.map((row) => (
                  <tr key={row.criteria}>
                    <td className="px-4 py-3 font-medium text-slate-700">{row.criteria}</td>
                    <td className="px-4 py-3 text-slate-600">{row.opex}</td>
                    <td className="px-4 py-3 text-slate-600">{row.capex}</td>
                    <td className="px-4 py-3 text-slate-600">{row.revShare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Links to related pages */}
      <section className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tu-locker-thong-minh"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              Tủ locker thông minh — tổng quan
            </Link>
            <Link
              href="/tu-locker-thong-minh/tu-locker-chung-cu"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              Locker chung cư
            </Link>
            <Link
              href="/tu-locker-thong-minh/tu-locker-van-phong"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              Locker văn phòng
            </Link>
            <Link
              href="/du-an"
              className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
            >
              Xem công trình thực tế →
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={faqs}
        title="Câu hỏi thường gặp về cho thuê tủ locker thông minh"
      />

      <Cta />
    </>
  );
}
