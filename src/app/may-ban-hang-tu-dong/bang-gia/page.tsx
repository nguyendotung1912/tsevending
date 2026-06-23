import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Bảng Giá Máy Bán Hàng Tự Động 2026 — Tham Khảo Chi Tiết | TSE Vending",
  description:
    "Bảng giá tham khảo máy bán hàng tự động (vending machine) 2026: máy bán nước, snack, hàng lạnh, gas. Mức đầu tư, chi phí lắp đặt, ROI và so sánh mua vs thuê.",
  path: "/may-ban-hang-tu-dong/bang-gia",
});

const pricingTiers = [
  {
    icon: "🥤",
    name: "Máy bán nước giải khát",
    slug: "may-ban-nuoc-giai-khat",
    range: "40 – 120 triệu VND",
    tier: "Phổ biến nhất",
    tierColor: "bg-brand-600 text-white",
    factors: [
      "Sức chứa (200–600 lon/chai)",
      "Hệ thống làm lạnh (máy nén 1 hoặc 2 block)",
      "Màn hình hiển thị (LED đơn sắc hoặc LCD màu)",
      "Tích hợp thanh toán (tiền mặt, QR, NFC)",
    ],
    note: "Phù hợp văn phòng 100–300 người, chung cư 200–500 căn, trường học.",
  },
  {
    icon: "🍪",
    name: "Máy bán snack, đồ ăn vặt",
    slug: "may-ban-do-an-vat",
    range: "60 – 150 triệu VND",
    tier: "Bán chạy",
    tierColor: "bg-accent-500 text-white",
    factors: [
      "Số lượng cột hàng (10–20 cột)",
      "Hệ thống khay xoắn chống kẹt hàng",
      "Màn hình cảm ứng hiển thị sản phẩm",
      "Tích hợp camera kiểm tra xuất hàng",
    ],
    note: "Phổ biến tại căng-tin trường học, pantry văn phòng, khu nghỉ ca nhà máy.",
  },
  {
    icon: "🧊",
    name: "Máy bán hàng lạnh, đông lạnh",
    slug: "may-ban-hang-lanh",
    range: "80 – 200 triệu VND",
    tier: "Cao cấp",
    tierColor: "bg-slate-700 text-white",
    factors: [
      "Dải nhiệt độ (lạnh 2–8°C hay đông lạnh –18°C)",
      "Kích thước khoang chứa",
      "Hệ thống cách nhiệt và bảo toàn nhiệt khi mất điện",
      "Cảm biến nhiệt độ giám sát liên tục",
    ],
    note: "Triển khai tại bệnh viện, siêu thị mini, khu công nghiệp có suất ăn CN.",
  },
  {
    icon: "🔥",
    name: "Máy bán gas, bình gas tự động",
    slug: "may-ban-gas",
    range: "Báo giá theo yêu cầu",
    tier: "Chuyên biệt",
    tierColor: "bg-rose-600 text-white",
    factors: [
      "Quy chuẩn an toàn PCCC áp dụng",
      "Dung tích khoang chứa và loại bình gas",
      "Hệ thống giám sát tồn kho và cảnh báo",
      "Vị trí lắp đặt và yêu cầu thông gió",
    ],
    note: "Khu dân cư, chung cư, cửa hàng tiện lợi — tư vấn thiết kế theo quy định địa phương.",
  },
  {
    icon: "🔧",
    name: "Linh kiện & phụ tùng thay thế",
    slug: "linh-kien-phu-tung",
    range: "500.000 – 5.000.000 VND/linh kiện",
    tier: "Dịch vụ",
    tierColor: "bg-slate-500 text-white",
    factors: [
      "Bo mạch điều khiển chính",
      "Đầu đọc thẻ / QR scanner",
      "Motor khay xoắn và khay cấp hàng",
      "Block máy nén lạnh (compressor)",
    ],
    note: "Ưu tiên cung cấp nhanh cho đối tác đang vận hành chuỗi máy TSE Vending.",
  },
];

const costFactors = [
  {
    icon: "📦",
    title: "Vận chuyển & lắp đặt",
    desc: "Chi phí vận chuyển phụ thuộc vào khoảng cách từ kho TSE đến vị trí lắp đặt. Lắp đặt tại TP.HCM, Bình Dương được tính trong giá. Các tỉnh khác có phụ phí vận chuyển.",
  },
  {
    icon: "⚡",
    title: "Điện & hạ tầng kỹ thuật",
    desc: "Máy bán hàng tự động cần ổ điện 220V/10A riêng biệt. Chi phí kéo điện (nếu chưa có) do chủ mặt bằng hoặc đối tác chịu — TSE Vending hỗ trợ tư vấn yêu cầu kỹ thuật miễn phí.",
  },
  {
    icon: "📡",
    title: "Kết nối IoT & phần mềm",
    desc: "Gói quản lý từ xa (dashboard, cảnh báo, báo cáo) có thể tính phí theo tháng hoặc tích hợp vào giá máy tùy gói dịch vụ. Chi tiết trong hợp đồng.",
  },
  {
    icon: "🛡️",
    title: "Bảo hành & bảo trì",
    desc: "Bảo hành thiết bị theo hãng sản xuất (thường 12–24 tháng). Gói bảo trì định kỳ hàng năm tính theo số lượng máy và khoảng cách địa lý.",
  },
];

const faqs = [
  {
    q: "Mua máy bán hàng tự động hay thuê — cái nào có lợi hơn?",
    a: "Mua máy phù hợp khi bạn vận hành lâu dài (3–5 năm+) và muốn tối ưu chi phí theo thời gian. Thuê/hợp tác doanh thu phù hợp khi muốn thử nghiệm mà không đầu tư vốn ban đầu. TSE Vending có cả 3 mô hình: mua sở hữu, thuê vận hành và hợp tác chia sẻ doanh thu với chủ mặt bằng.",
  },
  {
    q: "Chi phí bảo trì hàng tháng là bao nhiêu?",
    a: "Chi phí vận hành hàng tháng gồm: điện (tương đương tủ lạnh thương mại cỡ vừa), nhập hàng hóa và phí bảo trì định kỳ theo hợp đồng. TSE Vending báo giá bảo trì theo số lượng máy và địa điểm — đội kỹ thuật thường trú tại TP.HCM, Bình Dương, Hà Nội, Đà Nẵng nên chi phí di chuyển thấp nhất tại 4 tỉnh này.",
  },
  {
    q: "Bao lâu thì hoàn vốn đầu tư máy bán hàng tự động?",
    a: "Thời gian hoàn vốn phụ thuộc vào vị trí đặt máy, lượng giao dịch và giá sản phẩm. Theo kinh nghiệm thực tế của TSE Vending, máy đặt tại khu công nghiệp ca đêm hoặc tòa nhà văn phòng đông người thường hoàn vốn trong 12–18 tháng. Dùng ROI Calculator trên trang sản phẩm để ước tính cho vị trí cụ thể của bạn.",
  },
  {
    q: "Có hỗ trợ trả góp hoặc thuê tài chính không?",
    a: "TSE Vending hỗ trợ tư vấn kết nối với các tổ chức tín dụng cho vay mua thiết bị sản xuất — kinh doanh. Ngoài ra, mô hình hợp tác chia sẻ doanh thu là giải pháp không cần vốn đầu tư ban đầu dành cho chủ mặt bằng.",
  },
  {
    q: "Giá có bao gồm phần mềm quản lý từ xa không?",
    a: "Tùy gói. Các dòng máy cơ bản có dashboard đơn giản theo dõi doanh thu. Gói IoT đầy đủ (cảnh báo hết hàng, nhiệt độ, lỗi máy — quản lý chuỗi nhiều điểm) được tính riêng theo tháng. Chi tiết ghi trong hợp đồng mua bán.",
  },
];

export default function BangGiaMayBanHangPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Máy bán hàng tự động", path: "/may-ban-hang-tu-dong" },
          { name: "Bảng giá", path: "/may-ban-hang-tu-dong/bang-gia" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        eyebrow="Máy bán hàng tự động"
        title="Bảng giá máy bán hàng tự động 2026"
        description="Mức đầu tư tham khảo cho từng dòng máy bán hàng tự động — cập nhật Q2/2026. Giá thực tế phụ thuộc cấu hình, số lượng và vị trí lắp đặt."
        breadcrumbs={[
          { name: "Máy bán hàng tự động", path: "/may-ban-hang-tu-dong" },
          { name: "Bảng giá", path: "/may-ban-hang-tu-dong/bang-gia" },
        ]}
      />

      {/* Pricing disclaimer */}
      <div className="border-b border-amber-200 bg-amber-50 py-3">
        <p className="mx-auto max-w-6xl px-4 text-sm text-amber-800 sm:px-6">
          <strong>Lưu ý:</strong> Giá dưới đây là mức tham khảo chưa bao gồm VAT, chi phí
          vận chuyển và lắp đặt. Liên hệ TSE Vending để nhận báo giá chính xác theo nhu
          cầu cụ thể của bạn.
        </p>
      </div>

      {/* Pricing cards */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold ${item.tierColor}`}
                    >
                      {item.tier}
                    </span>
                  </div>
                  <h2 className="mt-3 text-base font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-xl font-extrabold text-brand-700">{item.range}</p>
                </div>

                <div className="flex flex-1 flex-col px-6 py-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Yếu tố ảnh hưởng giá
                  </p>
                  <ul className="flex-1 space-y-2">
                    {item.factors.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-none text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
                    {item.note}
                  </div>
                  <Link
                    href={`/may-ban-hang-tu-dong/${item.slug}`}
                    className="mt-4 block rounded-xl border border-brand-200 px-4 py-2.5 text-center text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                  >
                    Xem chi tiết dòng máy →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost factors */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
            Chi phí đầy đủ
          </p>
          <h2 className="mt-1 mb-8 text-2xl font-extrabold text-slate-900">
            Ngoài giá máy, cần tính thêm
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {costFactors.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-2xl">{c.icon}</div>
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI teaser */}
      <section className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            Tính toán đầu tư
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Ước tính ROI cho vị trí của bạn
          </h2>
          <p className="mt-3 text-slate-600">
            Dùng công cụ tính ROI tương tác của TSE Vending để ước tính doanh thu và thời
            gian hoàn vốn dựa trên số lượng máy, loại vị trí và lượng giao dịch dự kiến.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/may-ban-hang-tu-dong#roi-calculator"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              Tính ROI ngay
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Gọi {siteConfig.phoneDisplay} để tư vấn
            </a>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={faqs}
        title="Câu hỏi thường gặp về giá máy bán hàng tự động"
      />

      <Cta />
    </>
  );
}
