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
  title: `${siteConfig.name} - Máy Bán Hàng Tự Động & Tủ Locker Thông Minh`,
  description:
    "TSE Vending thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker thông minh tại Việt Nam. Tích hợp IoT, thanh toán không tiền mặt, hỗ trợ kỹ thuật 24/7.",
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
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    title: "Tự thiết kế & sản xuất — linh kiện dự phòng sẵn có",
    body: "TSE Vending tự thiết kế và sản xuất thiết bị trong nước. Linh kiện thay thế tồn kho tại chỗ, không phụ thuộc nhập khẩu — rút ngắn thời gian sửa chữa và giảm chi phí bảo trì.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    title: "Module IoT tích hợp trên toàn bộ thiết bị",
    body: "Mỗi thiết bị kết nối qua module IoT, gửi dữ liệu tồn kho, doanh thu và trạng thái kỹ thuật về dashboard theo thời gian thực. Cảnh báo tự động qua app khi tồn kho thấp hoặc phát sinh lỗi.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "text-orange-400",
    bg: "bg-orange-500/15",
    title: "Kỹ thuật viên thường trú tại 4 tỉnh thành",
    body: "Đội ngũ kỹ thuật đặt tại TP.HCM, Hà Nội, Đà Nẵng và Bình Dương. Phần lớn sự cố được xử lý từ xa; trường hợp cần can thiệp tại chỗ phản hồi trong vòng 24 giờ.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "text-purple-400",
    bg: "bg-purple-500/15",
    title: "Ba cấu trúc hợp đồng: mua, thuê hoặc chia sẻ doanh thu",
    body: "Mua đứt thiết bị, thuê theo tháng (phí cố định bao gồm bảo trì), hoặc ký hợp đồng chia sẻ doanh thu — TSE đầu tư thiết bị, đối tác đóng góp vị trí. Mỗi mô hình có điều khoản rõ ràng theo hợp đồng.",
  },
];

const industries = [
  { icon: "🏢", name: "Văn phòng & Tòa nhà", desc: "Máy bán nước, snack tại sảnh; tủ locker quản lý đồ nhân viên, nâng cao phúc lợi." },
  { icon: "🏭", name: "Khu công nghiệp", desc: "Đảm bảo công nhân có đồ ăn và nước uống ngay cả ca đêm ngoài giờ hành chính." },
  { icon: "🏠", name: "Chung cư & Khu dân cư", desc: "Tủ locker nhận bưu phẩm 24/7, giảm tải bảo vệ. Máy bán đồ tiêu dùng tại sảnh." },
  { icon: "🎓", name: "Trường học & Đại học", desc: "Máy bán snack tại căng-tin, ký túc xá. Tủ gửi đồ thông minh thay tủ khóa cơ." },
  { icon: "🏥", name: "Y tế & Bệnh viện", desc: "Máy bán đồ ăn trong khu vực chờ, giảm tải căng-tin giờ cao điểm an toàn hiệu quả." },
  { icon: "📦", name: "Logistics & TMĐT", desc: "Tủ giao nhận tích hợp API vận đơn, shipper giao/nhận 24/7 không cần gặp mặt." },
];

const howItWorks = [
  {
    step: "01",
    title: "Tư vấn & khảo sát vị trí",
    desc: "Phân tích lưu lượng, tiềm năng doanh thu và đề xuất cấu hình tối ưu cho từng địa điểm.",
  },
  {
    step: "02",
    title: "Thiết kế & cấu hình thiết bị",
    desc: "Chọn dòng máy, danh mục sản phẩm và công nghệ thanh toán phù hợp với môi trường sử dụng.",
  },
  {
    step: "03",
    title: "Lắp đặt & vận hành thử",
    desc: "Lắp đặt, đào tạo nhân sự và kiểm tra toàn bộ hệ thống từ thanh toán đến IoT trước bàn giao.",
  },
  {
    step: "04",
    title: "Bảo trì & hỗ trợ dài hạn",
    desc: "Bảo trì định kỳ, cập nhật firmware và hỗ trợ kỹ thuật 24/7 theo hợp đồng dịch vụ.",
  },
];

const techFeatures = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "text-sky-400",
    bg: "bg-sky-500/15",
    title: "Thanh toán đa kênh",
    desc: "Tiền mặt, thẻ chip/NFC, QR code VNPay, MoMo, ZaloPay — mọi phương thức trên một máy.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    title: "Dashboard quản lý",
    desc: "Theo dõi tồn kho, doanh thu và kỹ thuật tất cả thiết bị theo thời gian thực trên điện thoại.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    title: "Phân tích AI",
    desc: "Phân tích xu hướng tiêu thụ theo mùa, dự báo nhu cầu nhập hàng cho từng vị trí.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "text-rose-400",
    bg: "bg-rose-500/15",
    title: "Bảo mật & Giám sát",
    desc: "Camera tích hợp, log giao dịch đầy đủ và cảnh báo phá khóa tức thì cho tủ locker.",
  },
];

const businessModels = [
  {
    badge: "Sở hữu hoàn toàn",
    title: "Mua thiết bị",
    desc: "Đối tác mua và sở hữu thiết bị. TSE Vending cung cấp máy, lắp đặt và đào tạo vận hành. Toàn bộ doanh thu thuộc về chủ thiết bị.",
    highlight: false,
  },
  {
    badge: "Không cần vốn thiết bị",
    title: "Chia sẻ doanh thu",
    desc: "TSE Vending đầu tư thiết bị, lắp đặt và bảo trì. Đối tác cung cấp vị trí và nhận tỷ lệ doanh thu theo hợp đồng.",
    highlight: true,
  },
  {
    badge: "Chi phí cố định",
    title: "Thuê thiết bị",
    desc: "Phí thuê hàng tháng cố định, bao gồm thiết bị, bảo trì định kỳ và hỗ trợ kỹ thuật. Phù hợp khi không muốn đầu tư vốn ban đầu lớn.",
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
    a: "Tủ locker thông minh xác thực qua mã PIN, QR code, thẻ RFID hoặc sinh trắc học — không cần chìa khóa vật lý. Mọi lần mở/đóng đều được ghi lại với thông tin người dùng và thời gian, hỗ trợ tra cứu khi có sự cố. Quản trị viên theo dõi toàn bộ hệ thống từ xa qua phần mềm.",
  },
  {
    q: "Cần đầu tư bao nhiêu để bắt đầu kinh doanh máy bán hàng tự động?",
    a: "Chi phí dao động từ 8 triệu đồng (máy mini để bàn) đến hơn 250 triệu đồng (máy bán hàng lạnh chuyên dụng). Với mô hình hợp tác chia sẻ doanh thu hoặc thuê máy theo tháng, bạn có thể bắt đầu mà không cần vốn thiết bị. TSE Vending tư vấn miễn phí để chọn mô hình phù hợp.",
  },
  {
    q: "TSE Vending hỗ trợ bảo hành và bảo trì như thế nào?",
    a: "Mỗi thiết bị đi kèm bảo hành 12-24 tháng. Gói bảo trì bao gồm: vệ sinh thiết bị, kiểm tra linh kiện, cập nhật phần mềm và hỗ trợ từ xa 24/7. Hệ thống IoT phát hiện và xử lý nhiều sự cố từ xa trước khi ảnh hưởng đến bán hàng.",
  },
  {
    q: "Máy có hỗ trợ thanh toán QR, ví điện tử MoMo và ZaloPay không?",
    a: "Có. Tất cả dòng máy mới tích hợp đầy đủ: QR code (VNPay, MoMo, ZaloPay), thẻ ngân hàng nội địa và quốc tế (chip và NFC), cùng tùy chọn tiền mặt. Giao diện cảm ứng rõ ràng, phù hợp mọi độ tuổi.",
  },
  {
    q: "TSE Vending phục vụ địa bàn nào trên toàn quốc?",
    a: `TSE Vending phục vụ trực tiếp tại ${siteConfig.areasServed.slice(0, -1).join(", ")} với đội kỹ thuật thường trú. Các tỉnh thành khác triển khai qua mạng lưới đối tác được đào tạo. Liên hệ để xác nhận khả năng phục vụ tại địa bàn của bạn.`,
  },
];

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0d1832]">
        {/* Large branded glow — visible, not just a hint */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[560px] w-[560px] rounded-full bg-brand-600/35 blur-[110px]" />
        {/* Subtle counter-glow bottom-left for depth */}
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-800/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
            {/* Left 3/5 */}
            <div className="lg:col-span-3">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/15 px-4 py-1.5 text-xs font-semibold text-brand-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                Thiết kế & sản xuất tại Việt Nam
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Thiết kế, sản xuất &{" "}
                <span className="text-brand-400">vận hành</span>{" "}
                Máy Bán Hàng Tự Động & Tủ Locker Thông Minh
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300/80 sm:text-base sm:mt-5">
                TSE Vending thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker thông minh tại Việt Nam. Tích hợp IoT, thanh toán không tiền mặt (QR, NFC, thẻ), hỗ trợ kỹ thuật 24/7.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 sm:py-3"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Gọi tư vấn: {siteConfig.phoneDisplay}
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:py-3"
                >
                  Nhận báo giá →
                </Link>
              </div>
            </div>

            {/* Right 2/5: stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/[0.12] bg-white/[0.08] p-5 text-center"
                >
                  <div className="text-3xl font-extrabold text-brand-300">{s.value}</div>
                  <div className="mt-1.5 text-xs font-medium text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.03] to-transparent" />
      </section>

      {/* ── TWO PRODUCT LINES ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Hai dòng sản phẩm</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Máy bán hàng tự động & tủ locker thông minh
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              TSE Vending sản xuất hai dòng thiết bị có thể triển khai độc lập hoặc kết hợp tại cùng một địa điểm, tuỳ theo nhu cầu thực tế của từng dự án.
            </p>
          </div>

          {SILOS.map((silo, idx) => (
            <div
              key={silo.slug}
              className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-start last:mb-0"
            >
              {/* Text column */}
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
                  {silo.icon} {silo.title}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{silo.h1}</h2>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  {silo.intro.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <ul className="mt-4 space-y-1.5">
                  {silo.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg className="mt-0.5 h-4 w-4 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link
                    href={`/${silo.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Xem tất cả {silo.title} →
                  </Link>
                </div>
              </div>

              {/* Cards column */}
              <div className={`grid gap-2.5 sm:grid-cols-2 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                {silo.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-brand-300 hover:bg-white hover:shadow-md"
                  >
                    <span className="mt-0.5 text-2xl leading-none">{sub.icon}</span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700">
                        {sub.shortTitle}
                      </h3>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {sub.metaDescription}
                      </p>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                        Tìm hiểu thêm
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY TSE: dark ── */}
      <section className="relative overflow-hidden bg-slate-900 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">Năng lực kỹ thuật</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Khả năng triển khai và vận hành của TSE Vending
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
              Từ sản xuất thiết bị đến tích hợp phần mềm, lắp đặt và bảo trì — TSE Vending xử lý toàn bộ vòng đời dự án.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES: compact accent ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Phạm vi triển khai</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Các môi trường đã triển khai
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
              TSE Vending đã lắp đặt tại nhiều loại địa điểm khác nhau — mỗi môi trường có yêu cầu kỹ thuật và cấu hình thiết bị riêng.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="flex items-start gap-4 rounded-xl border border-slate-100 border-l-4 border-l-brand-500 bg-white p-5 shadow-sm"
              >
                <span className="text-2xl leading-none">{ind.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ind.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS: brand ── */}
      <section className="relative overflow-hidden bg-brand-700 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Quy trình triển khai</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              4 giai đoạn từ khảo sát đến vận hành
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-brand-200">
              TSE Vending đảm nhận toàn bộ các giai đoạn: khảo sát kỹ thuật, sản xuất/cấu hình, lắp đặt và bảo trì định kỳ.
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* connecting line on desktop */}
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-white/15 lg:block" />
            {howItWorks.map((step) => (
              <div key={step.step} className="relative flex flex-col items-start">
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-brand-600 text-base font-extrabold shadow-lg shadow-black/20">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-200">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/30 transition-all hover:bg-accent-600"
            >
              Bắt đầu khảo sát miễn phí →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY: dark slate ── */}
      <section className="relative overflow-hidden bg-slate-950 py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,#1d4ed825,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">Tính năng kỹ thuật</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Các tính năng tích hợp sẵn trong thiết bị
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
              Thanh toán đa kênh, giám sát từ xa qua IoT, phân tích tiêu thụ và bảo mật vật lý — tất cả được tích hợp trong phần cứng và phần mềm của TSE Vending.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${f.bg} ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODELS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Cấu trúc hợp đồng</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ba hình thức hợp tác
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
              TSE Vending cung cấp ba hình thức hợp đồng tùy theo mức độ đầu tư và kỳ vọng vận hành của từng đối tác.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {businessModels.map((m) => (
              <div
                key={m.title}
                className={`relative rounded-2xl border p-5 sm:p-7 transition-shadow ${
                  m.highlight
                    ? "border-brand-500 bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-2xl shadow-brand-900/40 lg:scale-105"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {m.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                      ⭐ {m.badge}
                    </span>
                  </div>
                )}
                {!m.highlight && (
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-accent-600">{m.badge}</div>
                )}
                <h3 className={`text-lg font-extrabold ${m.highlight ? "text-white" : "text-slate-900"}`}>
                  {m.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${m.highlight ? "text-brand-100" : "text-slate-600"}`}>
                  {m.desc}
                </p>
                <Link
                  href={`/${SOLUTIONS_SILO.slug}`}
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${
                    m.highlight ? "text-white hover:text-brand-200" : "text-brand-600 hover:text-brand-800"
                  }`}
                >
                  Tìm hiểu thêm →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Cần thêm thông tin về điều khoản hợp đồng?{" "}
            <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 hover:underline">
              Gọi {siteConfig.phoneDisplay}
            </a>{" "}
            hoặc{" "}
            <Link href="/lien-he" className="font-semibold text-brand-600 hover:underline">
              gửi yêu cầu tư vấn
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── LATEST ARTICLES ── */}
      {latestPosts.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Tài liệu & Tin tức</p>
                <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">Bài viết gần đây</h2>
              </div>
              <Link
                href="/tin-tuc"
                className="hidden whitespace-nowrap text-sm font-semibold text-brand-600 hover:underline sm:inline"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
