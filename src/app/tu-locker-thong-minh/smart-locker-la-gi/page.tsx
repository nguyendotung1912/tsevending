import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, articleJsonLd, howToJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Smart Locker Là Gì? Tủ Locker Thông Minh A-Z | TSE Vending",
  description:
    "Smart locker (tủ locker thông minh) là gì? Cấu tạo, cơ chế hoạt động QR/PIN/RFID/vân tay, phân loại, so sánh tủ khóa cơ, lợi ích và ứng dụng. Giải thích đầy đủ từ TSE Vending.",
  path: "/tu-locker-thong-minh/smart-locker-la-gi",
  type: "article",
  datePublished: "2026-06-15",
});

const breadcrumbs = [
  { name: "Tủ locker thông minh", path: "/tu-locker-thong-minh" },
  { name: "Smart locker là gì", path: "/tu-locker-thong-minh/smart-locker-la-gi" },
];

const toc = [
  { id: "dinh-nghia", label: "Smart locker là gì? (tiếng Việt)" },
  { id: "cau-tao", label: "Cấu tạo smart locker — 3 thành phần" },
  { id: "hoat-dong", label: "Smart locker hoạt động như thế nào?" },
  { id: "phan-loai", label: "Các loại smart locker" },
  { id: "so-sanh", label: "Smart locker vs tủ khóa cơ" },
  { id: "loi-ich", label: "Lợi ích của smart locker" },
  { id: "ung-dung", label: "Smart locker ứng dụng ở đâu?" },
  { id: "faq", label: "Câu hỏi thường gặp" },
];

const faqs = [
  {
    q: "Smart locker là gì?",
    a: "Smart locker (tủ locker thông minh) là hệ thống tủ lưu trữ điện tử dùng công nghệ số để xác thực quyền truy cập — thay chìa khóa cơ bằng mã QR, mã PIN, thẻ RFID, vân tay hoặc nhận diện khuôn mặt. Mọi lần mở/đóng được ghi log và quản lý tập trung qua phần mềm.",
  },
  {
    q: "Smart locker tiếng Việt gọi là gì?",
    a: "Smart locker trong tiếng Việt thường gọi là tủ locker thông minh, tủ khóa thông minh, tủ locker điện tử hoặc tủ gửi đồ thông minh — đều chỉ cùng một loại thiết bị lưu trữ xác thực điện tử.",
  },
  {
    q: "Smart locker khác gì tủ khóa cơ truyền thống?",
    a: "Tủ khóa cơ dùng chìa vật lý — dễ mất chìa, không có lịch sử truy cập. Smart locker mở bằng phương thức điện tử, ghi log mọi lần mở/đóng, quản trị viên mở từ xa và phân quyền linh hoạt theo người dùng, ca làm hoặc thời hạn.",
  },
  {
    q: "Smart locker mở khóa bằng những cách nào?",
    a: "Phổ biến gồm: mã PIN, mã QR (quét bằng điện thoại), thẻ RFID (tích hợp thẻ nhân viên/học sinh sẵn có), vân tay và nhận diện khuôn mặt. Một hệ thống có thể dùng đồng thời nhiều phương thức cho các nhóm người dùng khác nhau.",
  },
  {
    q: "Smart locker dùng được ở đâu?",
    a: "Chung cư, văn phòng và khu công nghiệp, trường học, gym và hồ bơi, bệnh viện, khách sạn, siêu thị/TTTM, và điểm giao nhận hàng logistics — mỗi môi trường có cấu hình ô tủ và phương thức xác thực riêng.",
  },
];

export default function SmartLockerLaGiPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: "Smart Locker (Tủ Locker Thông Minh) Là Gì? Giải Thích A-Z",
          description:
            "Giải thích smart locker là gì, cấu tạo, cơ chế hoạt động, phân loại, so sánh với tủ khóa cơ, lợi ích và ứng dụng thực tế.",
          path: "/tu-locker-thong-minh/smart-locker-la-gi",
          datePublished: "2026-06-15",
          articleSection: "Kiến thức tủ locker thông minh",
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Cách gửi và nhận đồ qua smart locker",
          description: "Quy trình gửi và nhận đồ qua tủ locker thông minh trong vài bước.",
          steps: [
            { name: "Gửi đồ", text: "Chọn ô trống trên màn hình (hoặc shipper quét mã đơn), đặt đồ vào và đóng cửa — hệ thống tự khóa." },
            { name: "Cấp mã", text: "Hệ thống sinh mã QR/PIN một lần và gửi cho người nhận qua màn hình, SMS hoặc app." },
            { name: "Nhận đồ", text: "Người nhận quét QR, nhập PIN, quẹt thẻ hoặc vân tay — khóa điện tử nhả và mở ô để lấy đồ." },
            { name: "Ghi nhận", text: "Mỗi thao tác được lưu log kèm thời gian, ô và người dùng, đồng bộ lên hệ thống quản lý." },
          ],
        })}
      />
      <PageHeader
        eyebrow="Kiến thức smart locker"
        title="Smart Locker (Tủ Locker Thông Minh) Là Gì?"
        description="Tất tần tật về smart locker: định nghĩa, cấu tạo, cơ chế hoạt động, phân loại, so sánh với tủ khóa cơ, lợi ích và ứng dụng thực tế tại Việt Nam."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[230px_1fr]">
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
            <Link href="/lien-he" className="mt-6 hidden rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-700 lg:block">
              Nhận tư vấn miễn phí →
            </Link>
          </aside>

          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600">
            <p className="lead text-lg">
              <strong>Smart locker (tủ locker thông minh)</strong> là hệ thống tủ lưu trữ điện tử sử dụng
              công nghệ số để xác thực quyền truy cập — thay thế hoàn toàn chìa khóa cơ bằng mã QR, mã PIN,
              thẻ RFID, vân tay hoặc nhận diện khuôn mặt, và được quản lý tập trung qua phần mềm. Mọi lần
              mở/đóng tủ đều được ghi nhận kèm thời gian và danh tính người dùng.
            </p>

            <h2 id="dinh-nghia">Smart locker là gì? (tiếng Việt)</h2>
            <p>
              Trong tiếng Việt, smart locker được gọi là <strong>tủ locker thông minh</strong>, tủ khóa thông
              minh, <strong>tủ locker điện tử</strong> hoặc tủ gửi đồ thông minh — tất cả đều chỉ cùng một loại
              thiết bị. Khác với tủ khóa truyền thống dùng ổ khóa và chìa cơ, mỗi ô của smart locker được điều
              khiển bằng khóa điện tử và một bộ xử lý trung tâm, cho phép mở khóa không cần chìa và quản lý từ xa.
            </p>
            <p>
              Xem tổng quan giải pháp tại trang <Link href="/tu-locker-thong-minh">tủ locker thông minh</Link> của
              TSE Vending — đơn vị thiết kế, sản xuất và vận hành smart locker trọn gói tại Việt Nam.
            </p>

            <h2 id="cau-tao">Cấu tạo smart locker gồm những gì?</h2>
            <p>Một hệ thống smart locker gồm <strong>3 thành phần chính</strong>:</p>
            <ul>
              <li><strong>Thân tủ (khung & ô tủ):</strong> khung thép sơn tĩnh điện chống ẩm, chia thành nhiều ô kích thước S/M/L/XL. Tùy môi trường có thể dùng inox hoặc bề mặt kháng khuẩn (y tế).</li>
              <li><strong>Khóa điện tử (solenoid/motor):</strong> mỗi ô gắn một khóa chốt điện từ (solenoid) hoặc khóa motor, đóng/mở theo lệnh từ bộ điều khiển — đây là bộ phận thay thế cho ổ khóa cơ.</li>
              <li><strong>Bộ điều khiển + phần mềm:</strong> bo mạch trung tâm kết nối màn hình, bộ đọc mã/thẻ/vân tay và toàn bộ khóa ô; chạy phần mềm quản lý xác thực, ghi log và đồng bộ dữ liệu lên cloud.</li>
            </ul>
            <p>
              Chính bộ điều khiển + phần mềm là phần "thông minh" giúp smart locker khác biệt hoàn toàn với tủ cơ:
              nó quyết định ai được mở ô nào, khi nào, và lưu lại toàn bộ lịch sử.
            </p>

            <h2 id="hoat-dong">Smart locker hoạt động như thế nào?</h2>
            <p>Quy trình gửi và nhận đồ qua smart locker diễn ra trong vài bước đơn giản:</p>
            <ol>
              <li><strong>Gửi đồ:</strong> người gửi chọn ô trống trên màn hình (hoặc shipper quét mã đơn) → đặt đồ vào → đóng cửa, hệ thống tự khóa.</li>
              <li><strong>Cấp mã:</strong> hệ thống sinh mã QR/PIN một lần và gửi cho người nhận qua màn hình, SMS hoặc app.</li>
              <li><strong>Nhận đồ:</strong> người nhận quét QR / nhập PIN / quẹt thẻ / vân tay → khóa điện tử nhả → mở ô lấy đồ.</li>
              <li><strong>Ghi nhận:</strong> mỗi thao tác được lưu log (thời gian, ô, người dùng) và đồng bộ lên hệ thống quản lý.</li>
            </ol>
            <p>
              Bộ điều khiển kết nối internet qua <strong>LAN, Wi-Fi hoặc 4G</strong> để đồng bộ dữ liệu theo thời
              gian thực. Khi mất mạng tạm thời, tủ vẫn ghi nhận cục bộ và đồng bộ lại khi có kết nối — đảm bảo
              hoạt động liên tục. Quản trị viên theo dõi tình trạng từng ô, mở ô từ xa và xuất báo cáo qua
              dashboard web/app mà không cần đến tận nơi.
            </p>

            <h2 id="phan-loai">Có những loại smart locker nào?</h2>
            <p><strong>Theo phương thức mở khóa:</strong> locker mã PIN, locker mã QR, locker thẻ RFID, locker vân tay, locker nhận diện khuôn mặt — hoặc kết hợp nhiều phương thức.</p>
            <p><strong>Theo ứng dụng</strong> — mỗi môi trường có một dòng tủ tối ưu riêng:</p>
            <ul>
              <li><Link href="/tu-locker-thong-minh/tu-locker-chung-cu">Tủ locker chung cư</Link> — nhận hàng hộ cư dân 24/7.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-van-phong">Tủ locker văn phòng, KCN</Link> — đồ cá nhân nhân viên, thẻ RFID.</li>
              <li><Link href="/tu-locker-thong-minh/tu-gui-do-thong-minh">Tủ gửi đồ thông minh</Link> — gym, hồ bơi, trường học, TTTM.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-giao-nhan-hang">Tủ locker giao nhận hàng</Link> — logistics, shipper, API sàn TMĐT.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc">Tủ locker trường học, đại học</Link> — thẻ học sinh, theo lớp/khoa.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-khach-san-resort">Tủ locker khách sạn, resort</Link> — gửi hành lý sau check-out.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-sieu-thi-ban-le">Tủ gửi đồ siêu thị, TTTM</Link> — tự phục vụ trong 30 giây.</li>
              <li><Link href="/tu-locker-thong-minh/tu-locker-benh-vien-y-te">Tủ locker bệnh viện</Link> — kháng khuẩn, mở khóa không chạm.</li>
            </ul>

            <h2 id="so-sanh">Smart locker khác gì tủ khóa cơ?</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr><th>Tiêu chí</th><th>Tủ khóa cơ</th><th>Smart locker</th></tr>
                </thead>
                <tbody>
                  <tr><td>Mở khóa</td><td>Chìa vật lý</td><td>QR / PIN / RFID / vân tay / Face ID</td></tr>
                  <tr><td>Mất chìa</td><td>Phải thay ổ khóa</td><td>Cấp lại mã từ xa, không tốn phí</td></tr>
                  <tr><td>Lịch sử truy cập</td><td>Không có</td><td>Ghi log đầy đủ kèm thời gian</td></tr>
                  <tr><td>Quản lý từ xa</td><td>Không</td><td>Mở & giám sát qua dashboard</td></tr>
                  <tr><td>Phân quyền</td><td>Cố định, thủ công</td><td>Linh hoạt theo người/ca/thời hạn</td></tr>
                  <tr><td>Vận hành</td><td>Cần người trông coi</td><td>Tự phục vụ 24/7</td></tr>
                </tbody>
              </table>
            </div>

            <h2 id="loi-ich">Lợi ích của smart locker</h2>
            <ul>
              <li><strong>Giảm tải nhân sự:</strong> ví dụ tại chung cư 300 căn nhận 80–100 kiện/ngày, locker giúp bảo vệ tiết kiệm 2–3 giờ công mỗi ngày nhờ không phải ký nhận và bảo quản hộ.</li>
              <li><strong>Phục vụ 24/7:</strong> người dùng gửi/nhận bất kỳ lúc nào, hoàn tất thao tác trong dưới 30 giây — không phụ thuộc giờ hành chính.</li>
              <li><strong>Bảo mật & minh bạch:</strong> mọi lần mở/đóng có nhật ký kèm danh tính và thời gian, gần như loại bỏ tranh chấp thất lạc.</li>
              <li><strong>Tiết kiệm chi phí vận hành:</strong> không cần người trực, không chi phí thay ổ khóa khi mất chìa; phân quyền và mở ô từ xa.</li>
              <li><strong>Linh hoạt mở rộng:</strong> thiết kế module — bắt đầu với cụm nhỏ và thêm ô khi nhu cầu tăng mà không thay toàn bộ hệ thống.</li>
            </ul>

            <h2 id="ung-dung">Smart locker ứng dụng ở đâu?</h2>
            <p>
              Smart locker đang được triển khai rộng rãi trên 8 nhóm môi trường nêu ở phần phân loại — từ nhận
              hàng chung cư, lưu đồ nhân viên nhà máy, gửi đồ học sinh/khách gym, đến điểm giao nhận logistics
              và bảo quản tài sản trong bệnh viện. Mỗi môi trường có pain point riêng nên cần cấu hình ô tủ và
              phương thức xác thực phù hợp.
            </p>
            <p>
              Muốn biết chi phí đầu tư? Xem <Link href="/tu-locker-thong-minh/bang-gia">bảng giá tủ locker thông minh</Link>,
              hoặc quay lại trang tổng quan <Link href="/tu-locker-thong-minh">smart locker</Link> để chọn giải pháp phù hợp.
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
