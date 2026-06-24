import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Smart Locker Là Gì? Tủ Locker Thông Minh A-Z | TSE Vending",
  description:
    "Smart locker (tủ locker thông minh) là gì? Cơ chế mở khóa QR/PIN/RFID/vân tay, phân loại, so sánh với tủ khóa cơ và ứng dụng thực tế. Giải thích đầy đủ từ TSE Vending.",
  path: "/tu-locker-thong-minh/smart-locker-la-gi",
  type: "article",
  datePublished: "2026-06-15",
});

const breadcrumbs = [
  { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
  { name: "Smart locker là gì", path: "/tu-locker-thong-minh/smart-locker-la-gi" },
];

const toc = [
  { id: "dinh-nghia", label: "Smart locker là gì?" },
  { id: "co-che", label: "Cơ chế hoạt động (QR / PIN / RFID / vân tay)" },
  { id: "phan-loai", label: "Phân loại tủ locker thông minh" },
  { id: "so-sanh", label: "So sánh với tủ khóa cơ truyền thống" },
  { id: "ung-dung", label: "Ứng dụng thực tế" },
  { id: "faq", label: "Câu hỏi thường gặp" },
];

const faqs = [
  {
    q: "Smart locker là gì?",
    a: "Smart locker (tủ locker thông minh) là hệ thống tủ lưu trữ điện tử dùng công nghệ số để xác thực quyền truy cập — thay chìa khóa cơ bằng mã QR, mã PIN, thẻ RFID, vân tay hoặc nhận diện khuôn mặt. Toàn bộ lịch sử mở/đóng được ghi nhận và quản lý tập trung qua phần mềm.",
  },
  {
    q: "Smart locker khác gì tủ khóa cơ truyền thống?",
    a: "Tủ khóa cơ dùng chìa vật lý — dễ mất chìa, sao chép, không có lịch sử truy cập. Smart locker mở bằng phương thức điện tử, ghi log mọi lần mở/đóng, quản trị viên mở từ xa khi cần và phân quyền linh hoạt theo người dùng, ca làm hoặc thời hạn.",
  },
  {
    q: "Smart locker mở khóa bằng những cách nào?",
    a: "Phổ biến gồm: mã PIN nhập trên bàn phím, mã QR quét bằng điện thoại, thẻ RFID (tích hợp thẻ nhân viên/học sinh sẵn có), vân tay và nhận diện khuôn mặt. Một hệ thống có thể dùng đồng thời nhiều phương thức cho các nhóm người dùng khác nhau.",
  },
  {
    q: "Smart locker dùng được ở đâu?",
    a: "Chung cư (nhận hàng hộ cư dân), văn phòng và khu công nghiệp (đồ cá nhân, bảo hộ lao động), trường học, gym và hồ bơi (gửi đồ), bệnh viện, siêu thị/TTTM, và điểm giao nhận hàng logistics.",
  },
];

export default function SmartLockerLaGiPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: "Smart Locker (Tủ Locker Thông Minh) Là Gì? Giải Thích A-Z",
          description:
            "Giải thích smart locker là gì, cơ chế mở khóa, phân loại, so sánh với tủ khóa cơ và ứng dụng thực tế.",
          path: "/tu-locker-thong-minh/smart-locker-la-gi",
          datePublished: "2026-06-15",
          articleSection: "Kiến thức tủ locker thông minh",
        })}
      />
      <PageHeader
        eyebrow="Kiến thức smart locker"
        title="Smart Locker (Tủ Locker Thông Minh) Là Gì?"
        description="Tất tần tật về smart locker: định nghĩa, cơ chế hoạt động, phân loại, so sánh với tủ khóa cơ và ứng dụng thực tế tại Việt Nam."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Mục lục</p>
            <ul className="space-y-2 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-brand-700 hover:underline">{t.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600">
            <p className="lead text-lg">
              <strong>Smart locker (tủ locker thông minh)</strong> là hệ thống tủ lưu trữ điện tử sử dụng
              công nghệ số để xác thực quyền truy cập — thay thế hoàn toàn chìa khóa cơ bằng mã QR, mã PIN,
              thẻ RFID, vân tay hoặc nhận diện khuôn mặt, và được quản lý tập trung qua phần mềm.
            </p>

            <h2 id="dinh-nghia">Smart locker là gì?</h2>
            <p>
              Smart locker là phiên bản hiện đại của tủ khóa truyền thống. Thay vì dùng ổ khóa và chìa cơ,
              mỗi ô tủ được trang bị khóa điện từ điều khiển bằng bộ xử lý trung tâm. Người dùng mở tủ bằng
              phương thức xác thực điện tử, còn quản trị viên theo dõi và điều hành toàn bộ hệ thống từ xa
              qua dashboard web hoặc app. Mọi lần mở/đóng đều được ghi log kèm thời gian và danh tính người
              thao tác, tạo nên tính minh bạch mà tủ cơ không thể có.
            </p>
            <p>
              Tại Việt Nam, smart locker còn được gọi là tủ locker thông minh, tủ khóa điện tử hay tủ gửi đồ
              thông minh. Tìm hiểu tổng quan tại trang{" "}
              <Link href="/tu-locker-thong-minh">tủ locker thông minh</Link> của TSE Vending.
            </p>

            <h2 id="co-che">Cơ chế hoạt động: QR, PIN, RFID, vân tay</h2>
            <p>Smart locker hỗ trợ nhiều phương thức mở khóa, có thể dùng đồng thời cho các nhóm người dùng khác nhau:</p>
            <ul>
              <li><strong>Mã PIN:</strong> người dùng nhập dãy số trên bàn phím cảm ứng — đơn giản, không cần thiết bị phụ.</li>
              <li><strong>Mã QR:</strong> hệ thống cấp mã QR qua màn hình hoặc SMS/app, người dùng quét bằng điện thoại để mở ô — phù hợp gửi/nhận hàng.</li>
              <li><strong>Thẻ RFID:</strong> tích hợp thẻ nhân viên hoặc thẻ học sinh sẵn có — một thẻ cho nhiều mục đích (ra vào, chấm công, mở tủ). Xem ứng dụng tại{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-van-phong">tủ locker văn phòng</Link>.</li>
              <li><strong>Vân tay / khuôn mặt:</strong> xác thực sinh trắc học, không thể quên hay mất — phù hợp môi trường yêu cầu bảo mật cao.</li>
            </ul>
            <p>
              Hệ thống kết nối Wi-Fi hoặc 4G để đồng bộ dữ liệu lên cloud. Khi mất mạng tạm thời, tủ vẫn ghi
              nhận lịch sử cục bộ và đồng bộ lại khi có kết nối — đảm bảo hoạt động liên tục.
            </p>

            <h2 id="phan-loai">Phân loại tủ locker thông minh</h2>
            <p>Tùy mục đích sử dụng, smart locker được chia thành các nhóm chính:</p>
            <ul>
              <li><strong>Tủ nhận/giao hàng (parcel locker):</strong> cho chung cư và logistics — xem{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-giao-nhan-hang">tủ locker giao nhận hàng</Link> và{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-chung-cu">tủ locker chung cư</Link>.</li>
              <li><strong>Tủ cá nhân cố định:</strong> phân quyền theo người dùng — phù hợp{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-van-phong">văn phòng, khu công nghiệp</Link> và{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc">trường học, đại học</Link>.</li>
              <li><strong>Tủ gửi đồ tạm thời (self-service):</strong> dùng một lần theo lượt — cho{" "}
                <Link href="/tu-locker-thong-minh/tu-gui-do-thong-minh">gym, TTTM, hồ bơi</Link> và{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-sieu-thi-ban-le">siêu thị</Link>.</li>
              <li><strong>Tủ chuyên dụng:</strong> như tủ kháng khuẩn cho{" "}
                <Link href="/tu-locker-thong-minh/tu-locker-benh-vien-y-te">bệnh viện, cơ sở y tế</Link>.</li>
            </ul>

            <h2 id="so-sanh">So sánh smart locker với tủ khóa cơ truyền thống</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr><th>Tiêu chí</th><th>Tủ khóa cơ</th><th>Smart locker</th></tr>
                </thead>
                <tbody>
                  <tr><td>Mở khóa</td><td>Chìa vật lý</td><td>QR / PIN / RFID / vân tay</td></tr>
                  <tr><td>Mất chìa</td><td>Phải thay ổ khóa</td><td>Cấp lại mã từ xa, không tốn chi phí</td></tr>
                  <tr><td>Lịch sử truy cập</td><td>Không có</td><td>Ghi log đầy đủ kèm thời gian</td></tr>
                  <tr><td>Quản lý từ xa</td><td>Không</td><td>Mở/giám sát qua dashboard</td></tr>
                  <tr><td>Phân quyền</td><td>Cố định, thủ công</td><td>Linh hoạt theo người/ca/thời hạn</td></tr>
                  <tr><td>Vận hành</td><td>Cần người trông coi</td><td>Tự phục vụ 24/7</td></tr>
                </tbody>
              </table>
            </div>

            <h2 id="ung-dung">Ứng dụng thực tế của smart locker</h2>
            <p>
              Smart locker đang được triển khai rộng rãi: nhận hàng hộ cư dân tại chung cư, lưu đồ cá nhân và
              bảo hộ lao động trong nhà máy, gửi đồ học sinh tại trường học, gửi đồ khách tại gym và trung tâm
              thương mại, bảo quản tài sản tại bệnh viện, và làm điểm giao nhận hàng cho shipper. Mỗi môi
              trường có cấu hình ô tủ và phương thức xác thực riêng để tối ưu trải nghiệm.
            </p>
            <p>
              Bạn muốn biết chi phí đầu tư? Xem ngay{" "}
              <Link href="/tu-locker-thong-minh/bang-gia">bảng giá tủ locker thông minh</Link>, hoặc quay lại
              trang tổng quan <Link href="/tu-locker-thong-minh">smart locker</Link> để chọn giải pháp phù hợp.
            </p>
          </article>
        </div>
      </section>

      <div id="faq" />
      <FaqSection faqs={faqs} title="Câu hỏi thường gặp về smart locker" />
      <Cta />
    </>
  );
}
