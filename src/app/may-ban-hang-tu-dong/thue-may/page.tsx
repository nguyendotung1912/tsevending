import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Cho Thuê Máy Bán Hàng Tự Động | TSE Vending",
  description:
    "Cho thuê máy bán hàng tự động (vending machine) trọn gói: không cần đầu tư vốn, TSE Vending lắp đặt, bảo trì và hỗ trợ vận hành. Phù hợp văn phòng, nhà máy, trường học.",
  path: "/may-ban-hang-tu-dong/thue-may",
});

const breadcrumbs = [
  { name: "Máy bán hàng tự động", path: "/may-ban-hang-tu-dong" },
  { name: "Thuê máy", path: "/may-ban-hang-tu-dong/thue-may" },
];

const benefits = [
  { icon: "💸", title: "Không cần vốn đầu tư", desc: "Không phải bỏ 25-50 triệu mua máy — chỉ trả phí dịch vụ theo tháng, giải phóng dòng tiền." },
  { icon: "🛠️", title: "Bảo trì trọn gói", desc: "TSE Vending lo lắp đặt, bảo trì, sửa chữa và cập nhật phần mềm — bạn không lo kỹ thuật." },
  { icon: "🔄", title: "Linh hoạt đổi/trả", desc: "Đổi dòng máy hoặc dừng dịch vụ theo điều khoản hợp đồng — phù hợp thử nghiệm vị trí mới." },
  { icon: "📊", title: "Theo dõi từ xa", desc: "Dashboard giám sát doanh thu, tồn kho và tình trạng máy theo thời gian thực." },
];

const whoFor = [
  "Doanh nghiệp muốn thêm tiện ích cho nhân viên mà không đầu tư tài sản cố định",
  "Chủ mặt bằng muốn thử nghiệm vị trí trước khi quyết định mua máy",
  "Trường học, phòng gym, văn phòng cần giải pháp nhanh, gọn, không phát sinh vốn",
  "Đơn vị cần triển khai ngắn hạn theo sự kiện, dự án hoặc mùa vụ",
];

const faqs = [
  {
    q: "Thuê máy bán hàng tự động giá bao nhiêu?",
    a: "Phí thuê phụ thuộc dòng máy, cấu hình và thời hạn hợp đồng. Mô hình thuê giúp bạn không phải bỏ vốn mua máy (25-50 triệu) mà trả phí dịch vụ hàng tháng. Liên hệ TSE Vending để nhận báo giá thuê chính xác theo nhu cầu.",
  },
  {
    q: "Thuê máy bán hàng tự động khác gì mua máy?",
    a: "Mua máy: sở hữu tài sản, tối ưu chi phí dài hạn, tự vận hành. Thuê máy: không cần vốn ban đầu, TSE Vending lo bảo trì, linh hoạt dừng/đổi — phù hợp thử nghiệm hoặc hạn chế vốn. Xem thêm bảng giá mua máy để so sánh.",
  },
  {
    q: "Có mô hình nào không cần trả phí thuê không?",
    a: "Có — mô hình hợp tác chia sẻ doanh thu: TSE Vending đặt máy tại mặt bằng của bạn và chia sẻ doanh thu, bạn không trả phí thuê cũng không cần đầu tư. Phù hợp vị trí có lưu lượng tốt.",
  },
];

export default function ThueMayPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Cho thuê máy bán hàng tự động",
          description: "Dịch vụ cho thuê máy bán hàng tự động trọn gói: lắp đặt, bảo trì, hỗ trợ vận hành — không cần đầu tư vốn thiết bị.",
          path: "/may-ban-hang-tu-dong/thue-may",
        })}
      />
      <PageHeader
        eyebrow="Dịch vụ cho thuê"
        title="Cho Thuê Máy Bán Hàng Tự Động"
        description="Triển khai máy bán hàng tự động mà không cần đầu tư vốn — TSE Vending lắp đặt, bảo trì và hỗ trợ vận hành, bạn chỉ trả phí dịch vụ theo tháng."
        breadcrumbs={breadcrumbs}
      />

      {/* Benefits */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Vì sao chọn thuê máy?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who for */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Ai nên thuê máy bán hàng tự động?</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whoFor.map((w) => (
              <li key={w} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Compare buy vs rent vs revenue-share */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Thuê, mua hay chia sẻ doanh thu?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="border border-slate-200 p-3">Tiêu chí</th>
                  <th className="border border-slate-200 p-3">Mua máy</th>
                  <th className="border border-slate-200 p-3">Thuê máy</th>
                  <th className="border border-slate-200 p-3">Chia sẻ doanh thu</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr><td className="border border-slate-200 p-3 font-medium">Vốn ban đầu</td><td className="border border-slate-200 p-3">25-50 triệu/máy</td><td className="border border-slate-200 p-3">Không</td><td className="border border-slate-200 p-3">Không</td></tr>
                <tr><td className="border border-slate-200 p-3 font-medium">Bảo trì</td><td className="border border-slate-200 p-3">Tự lo / theo hợp đồng</td><td className="border border-slate-200 p-3">TSE lo trọn gói</td><td className="border border-slate-200 p-3">TSE lo trọn gói</td></tr>
                <tr><td className="border border-slate-200 p-3 font-medium">Doanh thu</td><td className="border border-slate-200 p-3">Hưởng toàn bộ</td><td className="border border-slate-200 p-3">Hưởng toàn bộ</td><td className="border border-slate-200 p-3">Chia sẻ theo tỷ lệ</td></tr>
                <tr><td className="border border-slate-200 p-3 font-medium">Phù hợp</td><td className="border border-slate-200 p-3">Dài hạn, làm chủ</td><td className="border border-slate-200 p-3">Thử nghiệm, ít vốn</td><td className="border border-slate-200 p-3">Có mặt bằng tốt</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Muốn so sánh chi phí mua? Xem{" "}
            <Link href="/may-ban-hang-tu-dong/bang-gia" className="font-semibold text-brand-600 hover:underline">bảng giá máy bán hàng tự động</Link>{" "}
            hoặc cân nhắc{" "}
            <Link href="/tin-tuc/kinh-doanh-may-ban-hang-tu-dong-co-lai-khong" className="font-semibold text-brand-600 hover:underline">kinh doanh máy bán hàng tự động có lãi không</Link>.
          </p>

          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">Nhận báo giá thuê máy theo nhu cầu</p>
            <p className="mt-2 text-sm text-slate-600">TSE Vending khảo sát vị trí và tư vấn cấu hình miễn phí.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">
                Gọi {siteConfig.phoneDisplay}
              </a>
              <Link href="/lien-he" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Gửi yêu cầu thuê máy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Câu hỏi thường gặp về thuê máy bán hàng tự động" />
      <Cta />
    </>
  );
}
