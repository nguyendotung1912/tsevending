import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { SILOS, SOLUTIONS_SILO } from "@/content/categories";
import { getAllPostsMeta } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import Cta from "@/components/Cta";
import FaqSection from "@/components/Faq";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} - Máy Bán Hàng Tự Động & Tủ Locker Thông Minh Hàng Đầu Việt Nam`,
  description:
    "TSE Vending thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker thông minh tại Việt Nam. Giải pháp trọn gói: tư vấn, lắp đặt, IoT, thanh toán không tiền mặt, bảo trì 24/7.",
  path: "/",
});

const stats = [
  { value: "500+", label: "Vị trí triển khai" },
  { value: "5", label: "Tỉnh thành phục vụ" },
  { value: "24/7", label: "Vận hành tự động" },
  { value: "10+", label: "Năm kinh nghiệm" },
];

const whyChoose = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sản xuất nội địa — linh kiện sẵn có",
    body: "TSE Vending là một trong số ít đơn vị tại Việt Nam vừa thiết kế vừa sản xuất máy bán hàng tự động và tủ locker nội địa. Linh kiện thay thế luôn có sẵn trong nước, thời gian bảo trì ngắn hơn và chi phí sửa chữa thấp hơn so với thiết bị nhập khẩu nguyên chiếc. Khi máy gặp sự cố, bạn không phải chờ hàng tuần để nhập linh kiện từ nước ngoài.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: "Hệ sinh thái IoT tích hợp hoàn toàn",
    body: "Toàn bộ thiết bị TSE Vending tích hợp module IoT, cho phép theo dõi tồn kho, doanh thu và tình trạng kỹ thuật theo thời gian thực từ bất kỳ đâu qua điện thoại hoặc máy tính. Khi tồn kho sắp hết, hệ thống tự gửi cảnh báo. Khi máy gặp lỗi, kỹ thuật viên được thông báo ngay. Vận hành hàng chục máy tại nhiều vị trí trở nên đơn giản và hiệu quả hơn đáng kể.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Hỗ trợ kỹ thuật tận nơi trong 24 giờ",
    body: "Đội ngũ kỹ thuật TSE Vending trực sẵn hỗ trợ từ xa và xử lý tại chỗ trong vòng 24 giờ. Với mạng lưới đối tác bảo trì tại TP. Hồ Chí Minh, Hà Nội, Đà Nẵng và Bình Dương, thời gian máy ngừng hoạt động được giảm thiểu tối đa. Mỗi thiết bị đi kèm chính sách bảo hành rõ ràng và gói bảo trì định kỳ theo hợp đồng.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Mô hình hợp tác linh hoạt, phù hợp mọi ngân sách",
    body: "Không phải ai cũng có ngân sách để mua trọn bộ thiết bị ngay. TSE Vending cung cấp ba mô hình: mua đứt — sở hữu toàn bộ lợi nhuận; thuê theo tháng — không cần vốn lớn; và hợp tác chia sẻ doanh thu — TSE đầu tư thiết bị, bạn đóng góp vị trí. Đây là cách nhiều chủ tòa nhà, ban quản lý chung cư và trường học tham gia mô hình vending không cần rủi ro tài chính.",
  },
];

const industries = [
  {
    icon: "🏢",
    name: "Tòa nhà văn phòng",
    desc: "Máy bán nước và snack tại sảnh, căng-tin; tủ locker quản lý đồ cá nhân nhân viên. Nâng cao phúc lợi, giảm chi phí dịch vụ và tăng năng suất làm việc.",
  },
  {
    icon: "🏭",
    name: "Khu công nghiệp & nhà máy",
    desc: "Đảm bảo công nhân luôn có đồ ăn vặt và nước uống dù ca đêm hay ngoài giờ hành chính. Máy snack và nước đặt tại khu nghỉ và nhà ăn giảm tải cho căng-tin.",
  },
  {
    icon: "🏠",
    name: "Chung cư & khu dân cư",
    desc: "Tủ locker thông minh nhận bưu phẩm hộ cư dân 24/7, giảm tải cho bảo vệ. Máy bán gas mini, nước uống đặt tại sảnh phục vụ nhu cầu hàng ngày tiện lợi.",
  },
  {
    icon: "🎓",
    name: "Trường học & đại học",
    desc: "Máy bán snack, nước tại căng-tin và ký túc xá giảm áp lực bán hàng thủ công. Tủ gửi đồ thông minh thay thế tủ khóa cơ tại khu thể thao và phòng thí nghiệm.",
  },
  {
    icon: "🏥",
    name: "Y tế & bệnh viện",
    desc: "Máy bán thực phẩm và đồ uống trong khu vực chờ giảm áp lực cho căng-tin vào giờ cao điểm. Tủ locker an toàn cho nhân viên y tế và bệnh nhân nội trú.",
  },
  {
    icon: "📦",
    name: "Logistics & TMĐT",
    desc: "Tủ locker giao nhận tích hợp API vận đơn, shipper giao/nhận hàng 24/7 không cần gặp mặt, giảm tỷ lệ giao hàng thất bại tại khu dân cư và chung cư đô thị.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Tư vấn & khảo sát vị trí",
    desc: "Chúng tôi lắng nghe nhu cầu và khảo sát vị trí thực tế. Phân tích lưu lượng người qua lại, tiện nghi xung quanh và tiềm năng doanh thu trước khi đề xuất cấu hình phù hợp nhất cho từng địa điểm cụ thể.",
  },
  {
    step: "02",
    title: "Thiết kế & cấu hình thiết bị",
    desc: "Lựa chọn dòng máy, danh mục sản phẩm và công nghệ thanh toán tối ưu. Với tủ locker, xác định số ô, kích thước ô và công nghệ mở khóa (PIN, QR, RFID, vân tay) phù hợp với môi trường sử dụng.",
  },
  {
    step: "03",
    title: "Lắp đặt & vận hành thử",
    desc: "Đội kỹ thuật TSE Vending lắp đặt và cấu hình thiết bị tại chỗ, đào tạo nhân sự vận hành cơ bản và chạy thử toàn bộ tính năng — từ thanh toán đến hệ thống IoT — trước khi bàn giao chính thức.",
  },
  {
    step: "04",
    title: "Hỗ trợ bảo trì dài hạn",
    desc: "Bảo trì định kỳ theo lịch, cập nhật phần mềm firmware và hỗ trợ kỹ thuật 24/7 theo hợp đồng dịch vụ. Hệ thống IoT liên tục giám sát và cảnh báo sớm để hạn chế tối đa thời gian máy ngừng hoạt động.",
  },
];

const techFeatures = [
  {
    icon: (
      <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Thanh toán đa kênh",
    desc: "Hỗ trợ đầy đủ: tiền mặt, thẻ ngân hàng (chip/NFC), QR code (VNPay, MoMo, ZaloPay) và ví điện tử. Mọi khách hàng đều có thể giao dịch dễ dàng theo phương thức ưa thích.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Dashboard quản lý từ xa",
    desc: "Theo dõi tồn kho, doanh thu và tình trạng kỹ thuật mọi thiết bị tại mọi vị trí theo thời gian thực. Nhận cảnh báo ngay trên điện thoại khi tồn kho thấp hoặc máy gặp lỗi.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Phân tích dữ liệu AI",
    desc: "Phân tích xu hướng tiêu thụ theo thời gian, ngày trong tuần và mùa vụ. Gợi ý tối ưu danh mục sản phẩm và dự báo nhu cầu nhập hàng cho từng vị trí cụ thể.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Bảo mật & giám sát",
    desc: "Camera tích hợp, log lịch sử giao dịch và truy cập đầy đủ. Mã hóa dữ liệu thanh toán chuẩn bảo mật và cảnh báo phá khóa tức thì cho tủ locker thông minh.",
  },
];

const businessModels = [
  {
    badge: "Phổ biến nhất",
    title: "Hợp tác chia sẻ doanh thu",
    desc: "TSE Vending đầu tư 100% thiết bị. Bạn đóng góp vị trí đặt máy và nhận phần trăm doanh thu hàng tháng. Không cần vốn, không cần kỹ thuật, không lo bảo trì.",
    highlight: true,
  },
  {
    badge: "Kiểm soát hoàn toàn",
    title: "Mua trọn gói",
    desc: "Sở hữu thiết bị hoàn toàn và nhận 100% doanh thu. Phù hợp nhà đầu tư dài hạn muốn tối đa hóa lợi nhuận. TSE cung cấp máy, lắp đặt và đào tạo vận hành.",
    highlight: false,
  },
  {
    badge: "Linh hoạt, ít rủi ro",
    title: "Thuê thiết bị theo tháng",
    desc: "Không cần vốn lớn, không lo hỏng hóc. Phí thuê cố định hàng tháng bao gồm thiết bị, bảo trì và hỗ trợ kỹ thuật 24/7. Phù hợp doanh nghiệp muốn thêm tiện ích nhanh chóng.",
    highlight: false,
  },
];

const homeFaqs = [
  {
    q: "Máy bán hàng tự động có phù hợp với chung cư và tòa nhà không?",
    a: "Rất phù hợp. Chung cư và tòa nhà văn phòng là các vị trí có lưu lượng người ổn định và nhu cầu tiêu thụ nước uống, snack cao. TSE Vending đã triển khai thành công tại hàng trăm chung cư và tòa nhà văn phòng trên toàn quốc. Với mô hình hợp tác chia sẻ doanh thu, ban quản lý tòa nhà không cần bỏ vốn mà vẫn có thêm tiện ích cho cư dân/nhân viên.",
  },
  {
    q: "Tủ locker thông minh khác gì tủ khóa cơ truyền thống?",
    a: "Tủ locker thông minh xác thực qua mã PIN, QR code, thẻ RFID hoặc sinh trắc học — không cần chìa khóa vật lý. Mọi lần mở/đóng đều được ghi lại với thông tin người dùng và thời gian, hỗ trợ tra cứu khi có sự cố. Quản trị viên theo dõi toàn bộ hệ thống từ xa qua phần mềm, không cần quản lý chìa khóa thủ công.",
  },
  {
    q: "Cần đầu tư bao nhiêu để bắt đầu kinh doanh máy bán hàng tự động?",
    a: "Chi phí đầu tư dao động từ 8 triệu đồng (máy mini để bàn) đến hơn 250 triệu đồng (máy bán hàng lạnh chuyên dụng), tùy dòng máy và tính năng. Tuy nhiên, với mô hình hợp tác chia sẻ doanh thu hoặc thuê máy theo tháng, bạn có thể bắt đầu mà không cần vốn đầu tư thiết bị. TSE Vending tư vấn miễn phí để chọn mô hình phù hợp với ngân sách thực tế.",
  },
  {
    q: "TSE Vending hỗ trợ bảo hành và bảo trì như thế nào?",
    a: "Mỗi thiết bị đi kèm chính sách bảo hành 12-24 tháng tùy dòng sản phẩm. Gói bảo trì định kỳ bao gồm: vệ sinh thiết bị, kiểm tra linh kiện, cập nhật phần mềm và hỗ trợ kỹ thuật từ xa 24/7. Với hệ thống IoT giám sát liên tục, nhiều sự cố được phát hiện và xử lý từ xa trước khi ảnh hưởng đến hoạt động bán hàng.",
  },
  {
    q: "Máy có hỗ trợ thanh toán QR, ví điện tử MoMo và ZaloPay không?",
    a: "Có. Tất cả dòng máy mới của TSE Vending tích hợp module thanh toán không tiền mặt đầy đủ: QR code (VNPay, MoMo, ZaloPay), thẻ ngân hàng nội địa và quốc tế (chip và NFC), cùng với tùy chọn nhận tiền mặt. Giao diện thanh toán hiển thị rõ ràng trên màn hình cảm ứng, giúp khách hàng ở mọi độ tuổi dễ dàng sử dụng.",
  },
  {
    q: "Thời gian lắp đặt một máy bán hàng tự động mất bao lâu?",
    a: "Thông thường từ 1-3 ngày tùy phạm vi dự án: lắp đặt đơn lẻ có thể hoàn thành trong một ngày, trong khi triển khai hệ thống nhiều tủ locker với tích hợp phần mềm cần 3-7 ngày. Đội kỹ thuật TSE sẽ xác nhận lịch lắp đặt cụ thể sau khi khảo sát vị trí và ký hợp đồng.",
  },
  {
    q: "TSE Vending phục vụ địa bàn nào trên toàn quốc?",
    a: `TSE Vending hiện phục vụ trực tiếp tại ${siteConfig.areasServed.slice(0, -1).join(", ")} với đội ngũ kỹ thuật thường trú. Đối với các tỉnh thành khác, chúng tôi triển khai qua mạng lưới đối tác được đào tạo trên toàn quốc. Liên hệ trực tiếp để được xác nhận khả năng phục vụ tại địa bàn cụ thể của bạn.`,
  },
];

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Sản xuất tại Việt Nam — Chuẩn công nghệ quốc tế
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
                Máy Bán Hàng Tự Động &{" "}
                <span className="text-brand-600">Tủ Locker Thông Minh</span>{" "}
                Hàng Đầu Việt Nam
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Công ty Cổ phần Công nghệ TSE thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker thông minh cho doanh nghiệp, chung cư, trường học và khu công nghiệp trên toàn quốc. Tích hợp thanh toán không tiền mặt, quản lý từ xa IoT và hỗ trợ kỹ thuật 24/7 — giúp bạn tối ưu doanh thu mà không cần nhân sự trông coi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-accent-600 hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Gọi tư vấn miễn phí: {siteConfig.phoneDisplay}
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-6 py-3 text-sm font-bold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                >
                  Nhận báo giá ngay
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-brand-700">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO PRODUCT LINES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Hai nền tảng giải pháp</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Tự động hóa mọi không gian bán lẻ & lưu trữ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              TSE Vending cung cấp hai dòng sản phẩm bổ trợ lẫn nhau, cho phép doanh nghiệp và tổ chức xây dựng hệ sinh thái dịch vụ tự phục vụ hoàn chỉnh trong một địa điểm.
            </p>
          </div>

          {SILOS.map((silo, idx) => (
            <div
              key={silo.slug}
              className={`mb-16 grid gap-10 lg:grid-cols-2 lg:items-start ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {silo.icon} {silo.title}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{silo.h1}</h2>
                <div className="mt-4 space-y-3 text-slate-600">
                  {silo.intro.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2">
                  {silo.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${silo.slug}`}
                    className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Xem tất cả {silo.title} →
                  </Link>
                </div>
              </div>
              <div className={`grid gap-3 sm:grid-cols-2 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                {silo.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
                  >
                    <div className="text-3xl">{sub.icon}</div>
                    <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-700">
                      {sub.shortTitle}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{sub.metaDescription}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600">
                      Tìm hiểu thêm
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY TSE VENDING ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Lý do tin chọn TSE</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Vì sao hơn 500 vị trí trên toàn quốc chọn TSE Vending?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Chúng tôi không chỉ bán thiết bị — chúng tôi là đối tác vận hành dài hạn, đồng hành từ khảo sát ban đầu đến bảo trì sau nhiều năm sử dụng.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Ứng dụng đa ngành</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Giải pháp phù hợp cho mọi môi trường
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Từ tòa nhà văn phòng đến khu công nghiệp, từ chung cư đến bệnh viện — mỗi môi trường có đặc thù riêng và TSE Vending có giải pháp được thiết kế phù hợp.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-3xl">{ind.icon}</div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-brand-700 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">Quy trình 4 bước</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Triển khai đơn giản, trọn gói từ A đến Z
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-200">
              Bạn không cần biết gì về kỹ thuật. TSE Vending lo toàn bộ từ khảo sát, lắp đặt đến vận hành — bạn chỉ cần tập trung kinh doanh.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-xl font-extrabold text-brand-100">
                  {step.step}
                </div>
                <h3 className="text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-600"
            >
              Bắt đầu khảo sát miễn phí →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Công nghệ tích hợp</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Vận hành thông minh, doanh thu minh bạch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Mỗi thiết bị TSE Vending là một điểm bán hàng thông minh: thu thập dữ liệu, xử lý thanh toán và tự báo cáo về trung tâm quản lý — không cần nhân viên can thiệp.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODELS ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Mô hình hợp tác</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Chọn mô hình phù hợp với bạn
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Dù bạn muốn sở hữu hoàn toàn, thuê thiết bị hay đơn giản chỉ cho thuê vị trí — TSE Vending đều có mô hình phù hợp để bạn bắt đầu ngay hôm nay.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {businessModels.map((m) => (
              <div
                key={m.title}
                className={`relative rounded-2xl border p-8 shadow-sm ${
                  m.highlight
                    ? "border-brand-500 bg-brand-600 text-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                {m.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-white shadow">
                      ⭐ {m.badge}
                    </span>
                  </div>
                )}
                {!m.highlight && (
                  <div className="mb-2 text-xs font-semibold text-accent-600">{m.badge}</div>
                )}
                <h3 className={`text-lg font-extrabold ${m.highlight ? "text-white" : "text-slate-900"}`}>
                  {m.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${m.highlight ? "text-brand-100" : "text-slate-600"}`}>
                  {m.desc}
                </p>
                <Link
                  href={`/${SOLUTIONS_SILO.slug}`}
                  className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${
                    m.highlight ? "text-brand-100 hover:text-white" : "text-brand-600 hover:text-brand-800"
                  }`}
                >
                  Tìm hiểu thêm →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Chưa chắc mô hình nào phù hợp?{" "}
            <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 hover:underline">
              Gọi {siteConfig.phoneDisplay}
            </a>{" "}
            để được tư vấn miễn phí.
          </p>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <ReviewsSection />

      {/* ── LATEST ARTICLES ── */}
      {latestPosts.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Kiến thức & Tin tức</p>
                <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">Bài viết mới nhất</h2>
              </div>
              <Link href="/tin-tuc" className="hidden whitespace-nowrap text-sm font-semibold text-brand-600 hover:underline sm:inline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/tin-tuc" className="text-sm font-semibold text-brand-600 hover:underline">
                Xem tất cả bài viết →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <FaqSection faqs={homeFaqs} />

      <Cta />
    </>
  );
}
