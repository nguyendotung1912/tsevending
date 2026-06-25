import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import QuickAnswer from "@/components/QuickAnswer";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Bảng Giá Tủ Locker Thông Minh 2026 | TSE Vending",
  description:
    "Bảng giá tủ locker thông minh (smart locker) 2026 theo số ô, kích thước, vật liệu và công nghệ. 3 mô hình: mua, thuê, chia sẻ doanh thu. Liên hệ báo giá chính xác.",
  path: "/tu-locker-thong-minh/bang-gia",
});

const breadcrumbs = [
  { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
  { name: "Bảng giá", path: "/tu-locker-thong-minh/bang-gia" },
];

const tiers = [
  {
    name: "Cụm nhỏ (4–12 ô)",
    range: "15 – 40 triệu",
    desc: "Phù hợp văn phòng nhỏ, phòng gym, cửa hàng — mở khóa PIN/QR, vỏ thép sơn tĩnh điện.",
    for: "Văn phòng nhỏ, gym, shop",
  },
  {
    name: "Cụm vừa (16–40 ô)",
    range: "40 – 120 triệu",
    desc: "Cho sảnh chung cư, trường học, siêu thị — phân quyền RFID/app, ô đa kích thước S/M/L.",
    for: "Chung cư, trường học, siêu thị",
  },
  {
    name: "Cụm lớn (40–100+ ô)",
    range: "120 – 400 triệu",
    desc: "Hệ thống giao nhận hàng, khu công nghiệp — tích hợp API logistics, vân tay, nhiều module.",
    for: "Logistics, KCN, chuỗi",
  },
];

const factors = [
  { k: "Số lượng ô", v: "Càng nhiều ô, tổng chi phí càng cao nhưng đơn giá/ô giảm." },
  { k: "Kích thước ô", v: "Ô S/M/L/XL cho hành lý lớn làm tăng chi phí vật liệu và khung." },
  { k: "Vật liệu", v: "Thép sơn tĩnh điện tiêu chuẩn; inox/kháng khuẩn (y tế) cao hơn." },
  { k: "Công nghệ xác thực", v: "PIN/QR cơ bản → RFID → vân tay → nhận diện khuôn mặt tăng dần." },
  { k: "Tích hợp phần mềm", v: "Dashboard cơ bản hay tích hợp API (logistics, PMS, HRM) ảnh hưởng giá." },
  { k: "Lắp đặt thực địa", v: "Đi dây điện, gắn tường, kết nối mạng tùy hiện trạng mặt bằng." },
];

const models = [
  {
    title: "Mua trọn gói (CAPEX)",
    desc: "Sở hữu hoàn toàn hệ thống, chủ động vận hành lâu dài. Tối ưu chi phí theo thời gian, phù hợp đơn vị muốn làm chủ tài sản.",
    icon: "🏷️",
  },
  {
    title: "Thuê dịch vụ (OPEX)",
    desc: "Không cần đầu tư vốn ban đầu — trả phí hàng tháng, TSE Vending lắp đặt và bảo trì. Xem chi tiết tại trang cho thuê.",
    icon: "🔄",
    href: "/tu-locker-thong-minh/cho-thue",
  },
  {
    title: "Chia sẻ doanh thu",
    desc: "Hợp tác đặt tủ thu phí (gửi đồ/giao nhận), chia sẻ doanh thu với chủ mặt bằng — không cần bỏ vốn thiết bị.",
    icon: "🤝",
    href: "/giai-phap-kinh-doanh",
  },
];

const faqs = [
  {
    q: "Tủ locker thông minh giá bao nhiêu?",
    a: "Giá phụ thuộc số ô, kích thước ô, vật liệu, công nghệ xác thực và mức tích hợp phần mềm. Cụm nhỏ 4–12 ô khoảng 15–40 triệu; cụm vừa 16–40 ô khoảng 40–120 triệu; cụm lớn 40–100+ ô từ 120 triệu trở lên. Đây là khoảng tham khảo — TSE Vending khảo sát thực tế và báo giá chính xác miễn phí.",
  },
  {
    q: "Thuê tủ locker thông minh có được không?",
    a: "Có. TSE Vending cung cấp mô hình thuê trọn gói (OPEX): không cần đầu tư vốn, trả phí hàng tháng, được lắp đặt và bảo trì đầy đủ. Phù hợp đơn vị muốn thử nghiệm hoặc hạn chế vốn ban đầu.",
  },
  {
    q: "Yếu tố nào ảnh hưởng giá tủ locker thông minh nhiều nhất?",
    a: "Số lượng ô và công nghệ xác thực là hai yếu tố ảnh hưởng lớn nhất. Hệ thống nhiều ô với vân tay/nhận diện khuôn mặt và tích hợp API sẽ cao hơn đáng kể so với cụm nhỏ mở khóa PIN/QR cơ bản.",
  },
];

export default function SmartLockerPricingPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tủ locker thông minh (Smart Locker)",
          description: "Cung cấp, lắp đặt và cho thuê tủ locker thông minh theo nhiều cấu hình và mô hình đầu tư.",
          path: "/tu-locker-thong-minh/bang-gia",
        })}
      />
      <PageHeader
        eyebrow="Bảng giá tham khảo"
        title="Bảng Giá Tủ Locker Thông Minh 2026"
        description="Khoảng giá smart locker theo số ô, kích thước, vật liệu và công nghệ — kèm 3 mô hình mua, thuê và chia sẻ doanh thu. Liên hệ để nhận báo giá chính xác miễn phí."
        breadcrumbs={breadcrumbs}
      />

      {/* Pricing tiers */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <QuickAnswer>
              Giá tủ locker thông minh (smart locker) tham khảo trên thị trường khoảng <strong>2 – 5 triệu đồng/ô</strong>;
              cụm nhỏ 4–12 ô khoảng <strong>15 – 40 triệu</strong>, cụm vừa 16–40 ô <strong>40 – 120 triệu</strong>,
              cụm lớn 40–100+ ô <strong>từ 120 triệu</strong>. Giá phụ thuộc số ô, vật liệu và công nghệ mở khóa —
              liên hệ TSE Vending để nhận báo giá chính xác miễn phí.
            </QuickAnswer>
          </div>
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Khoảng giá theo quy mô</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <p className="mt-2 text-2xl font-extrabold text-brand-700">{t.range}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                <p className="mt-3 text-xs font-medium text-slate-400">Phù hợp: {t.for}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Tính theo từng ô, smart locker trên thị trường thường khoảng <strong>2 – 5 triệu đồng/ô</strong> tùy kích thước ô, vật liệu và công nghệ mở khóa (PIN/QR rẻ hơn, vân tay/khuôn mặt cao hơn).
          </p>
          <p className="mt-2 text-sm text-slate-500">
            * Khoảng giá tham khảo thị trường, chưa gồm VAT và lắp đặt thực địa. Giá chính xác phụ thuộc cấu hình cụ thể —{" "}
            <Link href="/lien-he" className="font-semibold text-brand-600 hover:underline">liên hệ để nhận báo giá miễn phí</Link>.
          </p>
        </div>
      </section>

      {/* Factors */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Yếu tố ảnh hưởng đến giá</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {factors.map((f) => (
              <div key={f.k} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-brand-500" />
                <p className="text-sm text-slate-600"><strong className="text-slate-900">{f.k}:</strong> {f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">3 mô hình đầu tư linh hoạt</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {models.map((m) => (
              <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-3xl">{m.icon}</div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.desc}</p>
                {m.href && (
                  <Link href={m.href} className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline">
                    Tìm hiểu thêm →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">Cần báo giá chính xác cho dự án của bạn?</p>
            <p className="mt-2 text-sm text-slate-600">TSE Vending khảo sát vị trí và tư vấn cấu hình miễn phí.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">
                Gọi {siteConfig.phoneDisplay}
              </a>
              <Link href="/lien-he" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Gửi yêu cầu báo giá
              </Link>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Chưa rõ smart locker phù hợp loại nào? Đọc{" "}
            <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">smart locker là gì</Link>{" "}
            hoặc xem tổng quan{" "}
            <Link href="/tu-locker-thong-minh" className="font-semibold text-brand-600 hover:underline">tủ locker thông minh</Link>.
          </p>
        </div>
      </section>

      {/* Operating cost */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-extrabold text-slate-900">Chi phí vận hành &amp; bảo trì</h2>
          <p className="mb-4 max-w-3xl text-sm text-slate-600">
            Ngoài chi phí đầu tư ban đầu, smart locker có chi phí vận hành thấp và dễ dự toán:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Điện năng", "Khóa điện tử và bộ điều khiển tiêu thụ rất thấp; chi phí điện hàng tháng không đáng kể."],
              ["Kết nối", "Phí internet/4G cho đồng bộ dữ liệu — thường gộp sẵn trong gói vận hành."],
              ["Bảo trì định kỳ", "Kiểm tra khóa, cảm biến, vệ sinh tiếp điểm 6 tháng/lần; firmware cập nhật tự động."],
              ["Phần mềm", "Mua đứt thường gồm sẵn phần mềm quản lý cơ bản; mô hình thuê SaaS khoảng 200.000–500.000đ/tháng tùy số ô và tính năng (giá tham khảo)."],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-brand-500" />
                <span><strong className="text-slate-900">{k}:</strong> {v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            So với tủ khóa cơ, smart locker tiết kiệm đáng kể chi phí nhân sự trông coi và chi phí thay ổ khóa khi mất chìa.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Câu hỏi thường gặp về giá tủ locker thông minh" />
      <Cta />
    </>
  );
}
