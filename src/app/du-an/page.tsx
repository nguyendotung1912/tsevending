import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Công trình thực tế — Dự án lắp đặt máy bán hàng & tủ locker | TSE Vending",
  description:
    "Danh sách công trình TSE Vending đã triển khai thực tế: máy bán hàng tự động và tủ locker thông minh tại chung cư, khu công nghiệp, trường học, khách sạn, bệnh viện trên toàn quốc.",
  path: "/du-an",
});

interface Project {
  id: number;
  icon: string;
  category: string;
  title: string;
  client: string;
  year: string;
  quarter: string;
  specs: string[];
  outcome: string;
  region: string;
  tag: string;
}

const projects: Project[] = [
  {
    id: 1,
    icon: "🔐",
    category: "Tủ locker thông minh",
    title: "24 tủ locker nhận hàng tự động 24/7",
    client: "Chung cư cao tầng — TP. Thủ Đức, TP.HCM",
    year: "2024",
    quarter: "Q4",
    specs: [
      "24 ô tủ kích thước S/M/L",
      "Mở khóa QR code & mã PIN qua app",
      "Tích hợp API GHN, GHTK, Shopee Express",
      "Thông báo Zalo/SMS tự động khi có hàng",
    ],
    outcome:
      "Giảm 80% khối lượng nhận hàng của bảo vệ. Cư dân tự lấy hàng 24/7 không phụ thuộc giờ làm việc.",
    region: "TP.HCM",
    tag: "Chung cư",
  },
  {
    id: 2,
    icon: "🥤",
    category: "Máy bán hàng tự động",
    title: "6 máy bán nước phục vụ ca đêm KCN",
    client: "Khu công nghiệp lớn — Bình Dương",
    year: "2024",
    quarter: "Q3",
    specs: [
      "6 máy bán nước giải khát loại lớn (400 lon/máy)",
      "Vận hành liên tục 24/7, ca đêm 22h–6h",
      "Thanh toán QR Pay + tiền mặt",
      "Dashboard quản lý từ xa theo thời gian thực",
    ],
    outcome:
      "Doanh thu trung bình 15–20 triệu/máy/tháng. Hoàn vốn đầu tư trong 14 tháng vận hành.",
    region: "Bình Dương",
    tag: "Khu công nghiệp",
  },
  {
    id: 3,
    icon: "🎓",
    category: "Tủ locker thông minh",
    title: "40 tủ locker sinh viên — Thẻ RFID",
    client: "Trường đại học — TP.HCM",
    year: "2024",
    quarter: "Q1",
    specs: [
      "40 ô tủ dạng module mở rộng",
      "Mở khóa bằng thẻ sinh viên RFID có sẵn",
      "Phân quyền theo lớp, khoa, học kỳ",
      "Reset tự động cuối mỗi học kỳ",
    ],
    outcome:
      "Loại bỏ hoàn toàn tủ chìa khóa cơ. Nhà trường chấm dứt xử lý sự cố mất chìa và trùng khóa.",
    region: "TP.HCM",
    tag: "Giáo dục",
  },
  {
    id: 4,
    icon: "🍪",
    category: "Máy bán hàng tự động",
    title: "4 máy vending đa sản phẩm — Tòa văn phòng Grade A",
    client: "Tòa nhà văn phòng — Hà Nội",
    year: "2025",
    quarter: "Q1",
    specs: [
      "4 máy combo nước + snack hỗn hợp",
      "Trên 2.000 giao dịch/tháng",
      "Mở khóa thẻ nhân viên RFID",
      "Báo cáo doanh thu tập trung cho chủ tòa nhà",
    ],
    outcome:
      "Giải phóng không gian căng tin. Tiết kiệm chi phí nhân sự bữa phụ cho hơn 1.200 nhân viên làm việc.",
    region: "Hà Nội",
    tag: "Văn phòng",
  },
  {
    id: 5,
    icon: "🏨",
    category: "Tủ locker thông minh",
    title: "12 tủ gửi hành lý tự phục vụ — Resort",
    client: "Resort 4 sao — Đà Nẵng",
    year: "2024",
    quarter: "Q4",
    specs: [
      "12 ô tủ đa kích thước (vừa vali 28\")",
      "Mã OTP dùng một lần, gửi qua SMS/email",
      "Giao diện đa ngôn ngữ Việt/Anh",
      "Tích hợp PMS khách sạn — cấp quyền tự động khi check-in",
    ],
    outcome:
      "Khách tự gửi/lấy hành lý sau check-out không cần nhờ lễ tân. NPS dịch vụ tăng đáng kể.",
    region: "Đà Nẵng",
    tag: "Khách sạn",
  },
  {
    id: 6,
    icon: "🛒",
    category: "Tủ locker thông minh",
    title: "Hệ thống tủ gửi đồ chuỗi 3 siêu thị",
    client: "Chuỗi siêu thị — TP.HCM",
    year: "2025",
    quarter: "Q1",
    specs: [
      "15 tủ × 3 chi nhánh — quản lý trên một dashboard",
      "Khách gửi đồ tự phục vụ trong dưới 30 giây",
      "Thu phí tự động qua MoMo / VietQR",
      "Lịch sử giao dịch đầy đủ, giảm tranh chấp mất đồ",
    ],
    outcome:
      "Giảm 60% thời gian chờ gửi đồ. Doanh thu phí gửi đồ bù đắp chi phí vận hành sau 6 tháng.",
    region: "TP.HCM",
    tag: "Bán lẻ",
  },
  {
    id: 7,
    icon: "🧊",
    category: "Máy bán hàng tự động",
    title: "3 máy bán thực phẩm lạnh ca đêm",
    client: "Cơ sở y tế — TP.HCM",
    year: "2025",
    quarter: "Q2",
    specs: [
      "3 máy giữ lạnh 2–8°C, đông lạnh –18°C",
      "Suất ăn chế biến sẵn phục vụ ca đêm 24/7",
      "Thanh toán thẻ nội bộ + QR Pay",
      "Cảm biến nhiệt độ giám sát liên tục",
    ],
    outcome:
      "Giải quyết nhu cầu ăn uống ca đêm cho 800+ nhân viên. Không còn tình trạng thiếu đồ ăn ngoài giờ hành chính.",
    region: "TP.HCM",
    tag: "Y tế",
  },
  {
    id: 8,
    icon: "📦",
    category: "Tủ locker thông minh",
    title: "50 ô locker giao nhận hàng 24/7",
    client: "Khu dân cư — Bình Dương",
    year: "2025",
    quarter: "Q2",
    specs: [
      "50 ô tủ phân loại S/M/L cho nhiều cỡ bưu phẩm",
      "Tích hợp API GHN + GHTK + Shopee Express",
      "Shipper gửi hàng không cần gặp người nhận",
      "Thông báo Zalo tự động khi hàng đến",
    ],
    outcome:
      "Phục vụ 200+ hộ gia đình. Tỷ lệ giao thành công tăng 95%, gần như loại bỏ hoàn hàng do thiếu người nhận.",
    region: "Bình Dương",
    tag: "Logistics",
  },
];

const tagColor: Record<string, string> = {
  "Chung cư": "bg-blue-50 text-blue-700 border-blue-200",
  "Khu công nghiệp": "bg-amber-50 text-amber-700 border-amber-200",
  "Giáo dục": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Văn phòng": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Khách sạn": "bg-rose-50 text-rose-700 border-rose-200",
  "Bán lẻ": "bg-orange-50 text-orange-700 border-orange-200",
  "Y tế": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Logistics": "bg-purple-50 text-purple-700 border-purple-200",
};

const stats = [
  { value: "500+", label: "Thiết bị đang vận hành" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "50+", label: "Đối tác doanh nghiệp" },
  { value: "4", label: "Tỉnh thành có kỹ thuật viên" },
];

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Công trình thực tế", path: "/du-an" }])}
      />
      <PageHeader
        eyebrow="Công trình thực tế"
        title="Dự án máy bán hàng tự động & tủ locker thông minh"
        description="Các công trình TSE Vending đã triển khai tại chung cư, khu công nghiệp, trường học, khách sạn và cơ sở y tế trên toàn quốc — số liệu thực tế từ hiện trường."
        breadcrumbs={[{ name: "Công trình thực tế", path: "/du-an" }]}
      />

      {/* Stats */}
      <section className="border-b border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-brand-700">{s.value}</div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Danh sách công trình</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                {projects.length} dự án đã hoàn thành
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                        {p.category}
                      </p>
                      <p className="text-xs text-slate-400">
                        {p.quarter}/{p.year} · {p.region}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tagColor[p.tag] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="px-6 py-5">
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{p.client}</p>

                  <ul className="mt-4 space-y-1.5">
                    {p.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-none text-brand-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                      Kết quả
                    </p>
                    <p className="text-sm leading-relaxed text-emerald-800">{p.outcome}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Ngành nghề</p>
          <h2 className="mt-1 mb-6 text-xl font-extrabold text-slate-900">
            TSE Vending phục vụ các ngành
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { icon: "🏢", label: "Chung cư" },
              { icon: "🏭", label: "Khu công nghiệp" },
              { icon: "🏫", label: "Trường học" },
              { icon: "🏨", label: "Khách sạn" },
              { icon: "🛒", label: "Bán lẻ" },
              { icon: "🏥", label: "Y tế" },
              { icon: "📦", label: "Logistics" },
              { icon: "🏋️", label: "Thể thao & Gym" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Bạn đang có nhu cầu tương tự?
          </h2>
          <p className="mt-3 text-slate-600">
            TSE Vending tư vấn, khảo sát vị trí và báo giá miễn phí. Đội kỹ thuật sẵn sàng
            triển khai tại TP.HCM, Hà Nội, Đà Nẵng và Bình Dương.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              Gọi ngay {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/lien-he"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Gửi yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
