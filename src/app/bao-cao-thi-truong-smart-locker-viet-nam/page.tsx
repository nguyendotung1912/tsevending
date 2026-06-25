import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, absoluteUrl, articleJsonLd, organizationJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";

const PATH = "/bao-cao-thi-truong-smart-locker-viet-nam";
const PUBLISHED = "2026-06-25";
const PDF = "/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.pdf";
const REPORT_URL = absoluteUrl(PATH);

export const metadata: Metadata = buildMetadata({
  title: "Báo Cáo Thị Trường Smart Locker Việt Nam 2026",
  description:
    "Báo cáo thị trường smart locker (tủ locker thông minh) Việt Nam 2026: quy mô & dự báo CAGR, động lực TMĐT và last-mile, phân khúc, xu hướng công nghệ, thách thức và khuyến nghị — kèm nguồn.",
  path: PATH,
  type: "article",
  datePublished: PUBLISHED,
});

const breadcrumbs = [{ name: "Báo cáo thị trường smart locker Việt Nam", path: PATH }];

/* ── Mục lục ─────────────────────────────────────────────── */
const TOC = [
  { id: "tom-tat", label: "1. Tóm tắt điều hành" },
  { id: "quy-mo", label: "2. Quy mô & dự báo thị trường" },
  { id: "dong-luc", label: "3. Động lực tăng trưởng" },
  { id: "phan-khuc", label: "4. Phân tích theo phân khúc" },
  { id: "cong-nghe", label: "5. Xu hướng công nghệ" },
  { id: "thach-thuc", label: "6. Thách thức & rào cản" },
  { id: "du-bao", label: "7. Dự báo & triển vọng" },
  { id: "khuyen-nghi", label: "8. Khuyến nghị cho doanh nghiệp" },
  { id: "ve-tse", label: "9. Về TSE Vending & nguồn dữ liệu" },
];

/* ── Helpers trình bày ───────────────────────────────────── */
function Src({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
      Nguồn: {children}
    </span>
  );
}

function TseNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border-l-4 border-accent-500 bg-accent-50/60 px-5 py-4">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-700">Nhận định của TSE Vending</p>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

function ChartCaption({ children, source }: { children: React.ReactNode; source: string }) {
  return (
    <p className="mt-2 text-xs text-slate-500">
      <span className="font-semibold text-slate-600">Hình:</span> {children} <span className="text-slate-400">— Nguồn: {source}.</span>
    </p>
  );
}

type Bar = { label: string; value: number; display: string; highlight?: boolean };
function BarChart({ bars, max, unit }: { bars: Bar[]; max: number; unit?: string }) {
  return (
    <div className="space-y-2.5">
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-3 text-sm">
          <div className="w-28 shrink-0 text-slate-600">{b.label}</div>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
            <div
              className={`h-6 rounded-md ${b.highlight ? "bg-gradient-to-r from-accent-500 to-accent-600" : "bg-gradient-to-r from-brand-600 to-brand-800"}`}
              style={{ width: `${Math.max(6, (b.value / max) * 100)}%` }}
            />
          </div>
          <div className="w-24 shrink-0 text-right font-bold text-brand-800">{b.display}</div>
        </div>
      ))}
      {unit && <p className="pt-1 text-right text-[11px] text-slate-400">Đơn vị: {unit}</p>}
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b-2 border-slate-200 pb-2 text-2xl font-extrabold text-slate-900">
      {children}
    </h2>
  );
}

/* ── Key statistics (tài sản PR) ─────────────────────────── */
const KEY_STATS = [
  { num: "1,08 → 2,87 tỷ USD", lbl: "Thị trường smart parcel locker Việt Nam (2025→2031), CAGR 16,5%", src: "Mobility Foresights" },
  { num: "12,3 → 36,1 triệu USD", lbl: "Thị trường smart lock Việt Nam (2025→2034), CAGR 12,77%", src: "IMARC Group" },
  { num: "10,1 triệu USD", lbl: "Doanh thu smart lock Việt Nam năm 2025, CAGR 11,5% (2025–2029)", src: "Statista" },
  { num: "2,3 → 7,2 triệu USD", lbl: "Doanh thu smart lock VN (2019→2023), tăng ~28%/năm", src: "B&Company" },
  { num: "27,7 → 62,51 tỷ USD", lbl: "Thương mại điện tử Việt Nam (2025→2030), CAGR 21,65%", src: "B&Company" },
  { num: "2,2 – 2,4 tỷ", lbl: "Bưu kiện/năm tại Việt Nam (2024), tăng hơn 25%/năm", src: "Mordor Intelligence, IMARC" },
  { num: "~60%", lbl: "Smart lock dự báo tích hợp sinh trắc học", src: "Ken Research" },
  { num: "~48,9%", lbl: "Tỷ trọng e-logistics của miền Nam; TP.HCM tạo ~70% mua sắm online vùng", src: "IMARC Group" },
];

export default function ReportPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: "Báo Cáo Thị Trường Smart Locker (Tủ Locker Thông Minh) Việt Nam 2026",
          description:
            "Báo cáo tổng hợp quy mô, dự báo, động lực, phân khúc, công nghệ, thách thức và khuyến nghị cho thị trường smart locker Việt Nam, kèm nguồn dữ liệu thứ cấp.",
          path: PATH,
          datePublished: PUBLISHED,
          keywords: [
            "thị trường smart locker việt nam",
            "báo cáo smart locker",
            "thị trường tủ locker thông minh",
            "smart parcel locker",
          ],
          articleSection: "Báo cáo thị trường",
        })}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />

      <PageHeader
        eyebrow="Báo cáo ngành · 2026"
        title="Báo Cáo Thị Trường Smart Locker (Tủ Locker Thông Minh) Việt Nam 2026"
        description="Quy mô & dự báo, động lực tăng trưởng, phân khúc ứng dụng, xu hướng công nghệ, thách thức và khuyến nghị — tổng hợp từ các nguồn nghiên cứu thị trường công khai, kèm trích dẫn nguồn cho từng số liệu."
        breadcrumbs={breadcrumbs}
      />

      {/* Thanh meta: ngày, tác giả, tải PDF, chia sẻ */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="text-sm text-slate-500">
            Xuất bản: <time dateTime={PUBLISHED}>tháng 6/2026</time> · Thực hiện bởi{" "}
            <span className="font-semibold text-slate-700">TSE Vending</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={PDF}
              download
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
            >
              ↓ Tải PDF
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(REPORT_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Chia sẻ Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(REPORT_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Mục lục */}
        <nav aria-label="Mục lục" className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">Nội dung báo cáo</p>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-sm font-medium text-brand-700 hover:underline">
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 text-[15px] leading-relaxed text-slate-700">

          {/* 1. TÓM TẮT */}
          <section className="space-y-4">
            <H2 id="tom-tat">1. Tóm tắt điều hành</H2>
            <ul className="space-y-2.5">
              <li>
                <strong>Thị trường smart parcel locker Việt Nam được dự báo tăng từ 1,08 tỷ USD (2025) lên 2,87 tỷ USD (2031), tương ứng CAGR 16,5%.</strong>
                <Src>Mobility Foresights</Src>
              </li>
              <li>
                <strong>Thị trường khóa thông minh (smart lock) Việt Nam được dự báo đạt 36,1 triệu USD vào năm 2034, từ mức 12,3 triệu USD năm 2025 (CAGR 12,77%).</strong>
                <Src>IMARC Group</Src>
              </li>
              <li>
                <strong>Thương mại điện tử là động lực cốt lõi: quy mô TMĐT Việt Nam ước đạt 27,7 tỷ USD năm 2025 và hướng tới 62,51 tỷ USD vào 2030 (CAGR 21,65%).</strong>
                <Src>B&amp;Company</Src>
              </li>
              <li>
                <strong>Việt Nam xử lý khoảng 2,2–2,4 tỷ bưu kiện mỗi năm (2024) với tốc độ tăng hơn 25%/năm — tạo áp lực trực tiếp lên khâu giao nhận chặng cuối (last-mile).</strong>
                <Src>Mordor Intelligence, IMARC</Src>
              </li>
              <li>
                <strong>Phân khúc tủ nhận hàng tại chung cư và last-mile được đánh giá tăng nhanh nhất, dẫn dắt bởi đô thị hóa và nhu cầu giao nhận không tiếp xúc.</strong>
              </li>
            </ul>
          </section>

          {/* 2. QUY MÔ */}
          <section className="space-y-4">
            <H2 id="quy-mo">2. Quy mô &amp; dự báo thị trường</H2>
            <p>
              Các nguồn nghiên cứu sử dụng phạm vi định nghĩa khác nhau — <em>smart lock</em> (khóa thông minh) khác với
              <em> smart parcel locker</em> (tủ nhận hàng thông minh). Báo cáo trình bày tách bạch từng phạm vi, không gộp thành một con số duy nhất.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-3 py-2 text-left">Phạm vi thị trường</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">Quy mô gốc</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">Dự báo</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">CAGR</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">Nguồn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Smart parcel locker VN</td>
                    <td className="border border-slate-200 px-3 py-2">1,08 tỷ USD (2025)</td>
                    <td className="border border-slate-200 px-3 py-2">2,87 tỷ USD (2031)</td>
                    <td className="border border-slate-200 px-3 py-2">16,5%</td>
                    <td className="border border-slate-200 px-3 py-2">Mobility Foresights</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Smart lock VN</td>
                    <td className="border border-slate-200 px-3 py-2">12,3 triệu USD (2025)</td>
                    <td className="border border-slate-200 px-3 py-2">36,1 triệu USD (2034)</td>
                    <td className="border border-slate-200 px-3 py-2">12,77%</td>
                    <td className="border border-slate-200 px-3 py-2">IMARC Group</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Doanh thu smart lock VN</td>
                    <td className="border border-slate-200 px-3 py-2">10,1 triệu USD (2025)</td>
                    <td className="border border-slate-200 px-3 py-2">— (CAGR 2025–2029)</td>
                    <td className="border border-slate-200 px-3 py-2">11,5%</td>
                    <td className="border border-slate-200 px-3 py-2">Statista</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Smart lock VN (lịch sử)</td>
                    <td className="border border-slate-200 px-3 py-2">2,3 triệu USD (2019)</td>
                    <td className="border border-slate-200 px-3 py-2">7,2 triệu USD (2023)</td>
                    <td className="border border-slate-200 px-3 py-2">~28%/năm</td>
                    <td className="border border-slate-200 px-3 py-2">B&amp;Company</td>
                  </tr>
                </tbody>
              </table>
              <ChartCaption source="Mobility Foresights, IMARC Group, Statista, B&Company">
                Bảng tổng hợp quy mô thị trường theo từng phạm vi định nghĩa
              </ChartCaption>
            </div>

            <p className="pt-2">
              <strong>Doanh thu smart lock Việt Nam đã tăng từ 2,3 triệu USD (2019) lên 7,2 triệu USD (2023)</strong>, tương ứng tốc độ tăng bình quân khoảng 28%/năm.
              <Src>B&amp;Company</Src>
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <BarChart
                max={7.2}
                unit="triệu USD"
                bars={[
                  { label: "2019", value: 2.3, display: "2,3" },
                  { label: "2023", value: 7.2, display: "7,2", highlight: true },
                ]}
              />
              <ChartCaption source="B&Company">Tăng trưởng doanh thu smart lock Việt Nam 2019–2023</ChartCaption>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <BarChart
                max={2.87}
                unit="tỷ USD"
                bars={[
                  { label: "2025", value: 1.08, display: "1,08" },
                  { label: "2031", value: 2.87, display: "2,87", highlight: true },
                ]}
              />
              <ChartCaption source="Mobility Foresights">
                Dự báo thị trường smart parcel locker Việt Nam 2025–2031 (CAGR 16,5%)
              </ChartCaption>
            </div>

            <TseNote>
              Khoảng cách lớn giữa con số "smart parcel locker" (tỷ USD) và "smart lock" (triệu USD) phản ánh khác biệt phạm vi
              định nghĩa và phương pháp của từng đơn vị nghiên cứu — không nên cộng gộp. Khi trích dẫn, cần nêu rõ phạm vi kèm nguồn.
            </TseNote>
          </section>

          {/* 3. ĐỘNG LỰC */}
          <section className="space-y-4">
            <H2 id="dong-luc">3. Động lực tăng trưởng</H2>
            <p>
              <strong>Quy mô thương mại điện tử Việt Nam được dự báo đạt khoảng 27,7 tỷ USD năm 2025 và tăng lên 62,51 tỷ USD vào năm 2030, tương ứng CAGR 21,65%.</strong>
              <Src>B&amp;Company / Vietnam E-commerce Forecast</Src>
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <BarChart
                max={62.51}
                unit="tỷ USD"
                bars={[
                  { label: "2025", value: 27.7, display: "27,7" },
                  { label: "2030", value: 62.51, display: "62,51", highlight: true },
                ]}
              />
              <ChartCaption source="B&Company / Vietnam E-commerce Forecast">
                Dự báo quy mô thương mại điện tử Việt Nam 2025–2030 (CAGR 21,65%)
              </ChartCaption>
            </div>

            <p>
              <strong>Việt Nam xử lý khoảng 2,2–2,4 tỷ bưu kiện mỗi năm (2024), với tốc độ tăng trưởng hơn 25%/năm.</strong>
              <Src>Mordor Intelligence, IMARC</Src> Sản lượng bưu kiện lớn và tăng nhanh là nền tảng nhu cầu cho hạ tầng nhận hàng tự động.
            </p>

            <h3 className="text-lg font-bold text-slate-900">Các động lực chính</h3>
            <ul className="space-y-2">
              <li><strong>Bùng nổ TMĐT &amp; last-mile:</strong> đơn hàng nhỏ lẻ đổ về đô thị tạo áp lực giao nhận chặng cuối.</li>
              <li><strong>Đô thị hóa &amp; mật độ chung cư:</strong> nhu cầu điểm nhận hàng tập trung, hoạt động 24/7.</li>
              <li><strong>Giao nhận không tiếp xúc &amp; chi phí nhân công tăng:</strong> thúc đẩy tự động hóa khâu giao nhận.</li>
              <li><strong>Mô hình Locker-as-a-Service &amp; hạ tầng chia sẻ:</strong> hạ rào cản đầu tư ban đầu cho đơn vị triển khai.</li>
              <li><strong>Thanh toán điện tử (MoMo, ZaloPay, VNPay):</strong> hoàn thiện quy trình giao – nhận – thanh toán không tiếp xúc.</li>
              <li><strong>Tỷ lệ dùng internet trên 77% &amp; dân số trẻ, mobile-first:</strong> nền tảng người dùng sẵn sàng cho dịch vụ số.</li>
            </ul>
          </section>

          {/* 4. PHÂN KHÚC */}
          <section className="space-y-4">
            <H2 id="phan-khuc">4. Phân tích theo phân khúc ứng dụng</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-3 py-2 text-left">Phân khúc</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">Đặc điểm nhu cầu</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">Triển vọng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Chung cư / Dân cư</td><td className="border border-slate-200 px-3 py-2">Tủ nhận hàng hộ cư dân, hoạt động 24/7, tích hợp hệ thống tòa nhà</td><td className="border border-slate-200 px-3 py-2">Dẫn đầu &amp; tăng nhanh</td></tr>
                  <tr className="bg-slate-50/60"><td className="border border-slate-200 px-3 py-2 font-semibold">Logistics / Last-mile</td><td className="border border-slate-200 px-3 py-2">Điểm gom &amp; trả hàng tự động, tích hợp API đơn vị vận chuyển</td><td className="border border-slate-200 px-3 py-2">Tăng nhanh</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Bán lẻ &amp; TTTM</td><td className="border border-slate-200 px-3 py-2">Click-and-collect, gửi đồ tự phục vụ</td><td className="border border-slate-200 px-3 py-2">Ổn định</td></tr>
                  <tr className="bg-slate-50/60"><td className="border border-slate-200 px-3 py-2 font-semibold">Văn phòng / Thương mại</td><td className="border border-slate-200 px-3 py-2">Giao nhận nội bộ, lưu đồ cá nhân</td><td className="border border-slate-200 px-3 py-2">Ổn định</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Khách sạn</td><td className="border border-slate-200 px-3 py-2">Tủ gửi đồ khách, giao nhận không tiếp xúc</td><td className="border border-slate-200 px-3 py-2">Ngách</td></tr>
                  <tr className="bg-slate-50/60"><td className="border border-slate-200 px-3 py-2 font-semibold">Trường học / Đại học</td><td className="border border-slate-200 px-3 py-2">Tủ học sinh/sinh viên, quản lý theo lớp/khoa</td><td className="border border-slate-200 px-3 py-2">Tiềm năng</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Y tế</td><td className="border border-slate-200 px-3 py-2">Tủ kháng khuẩn, mở khóa không chạm, quản lý theo ca</td><td className="border border-slate-200 px-3 py-2">Ngách giá trị cao</td></tr>
                </tbody>
              </table>
              <ChartCaption source="Tổng hợp & nhận định của TSE Vending từ dữ liệu thị trường">
                Phân khúc ứng dụng smart locker tại Việt Nam
              </ChartCaption>
            </div>

            <p>
              Về địa lý, <strong>miền Nam chiếm khoảng 48,9% thị trường e-logistics, trong đó TP.HCM tạo ra khoảng 70% lượng mua sắm online của vùng.</strong>
              <Src>IMARC Group</Src>
            </p>
            <TseNote>
              Phân khúc <strong>tủ nhận hàng chung cư và last-mile</strong> được đánh giá tăng nhanh nhất nhờ mật độ căn hộ cao và áp lực giao
              chặng cuối tại các đô thị lớn. Các phân khúc văn phòng, trường học, y tế mở rộng sau khi nhận thức người dùng tăng và mô hình
              vận hành được chuẩn hóa. (Phần đánh dấu "triển vọng" trong bảng là nhận định, không phải số liệu có nguồn.)
            </TseNote>
          </section>

          {/* 5. CÔNG NGHỆ */}
          <section className="space-y-4">
            <H2 id="cong-nghe">5. Xu hướng công nghệ</H2>
            <ul className="space-y-2">
              <li><strong>Mở khóa đa phương thức:</strong> QR code, OTP, RFID, vân tay và nhận diện khuôn mặt (Face ID).</li>
              <li><strong>IoT &amp; cloud analytics:</strong> giám sát thời gian thực, bảo trì dự đoán, tối ưu vận hành từ xa.</li>
              <li><strong>Tích hợp ứng dụng:</strong> thông báo real-time, mã truy cập dùng một lần, lịch sử đóng/mở.</li>
              <li><strong>Kết nối linh hoạt:</strong> LAN/WiFi/4G–5G, quản lý tập trung nhiều điểm.</li>
            </ul>
            <p>
              <strong>Khoảng 60% smart lock được dự báo sẽ tích hợp công nghệ sinh trắc học.</strong>
              <Src>Ken Research</Src>
            </p>
          </section>

          {/* 6. THÁCH THỨC */}
          <section className="space-y-4">
            <H2 id="thach-thuc">6. Thách thức &amp; rào cản</H2>
            <ul className="space-y-2">
              <li>
                <strong>Chi phí đầu tư ban đầu cao:</strong> smart lock tại Việt Nam dao động khoảng 3–10 triệu VND/bộ;
                khoảng 40% người mua tiềm năng coi giá là rào cản chính.
                <Src>Ken Research</Src>
              </li>
              <li>
                <strong>Nhận thức thị trường còn hạn chế:</strong> khoảng 55% người tiêu dùng có hiểu biết hạn chế về chức năng sản phẩm.
                <Src>Ken Research</Src>
              </li>
              <li><strong>Tập trung địa lý:</strong> thị trường chủ yếu ở Hà Nội và TP.HCM, độ phủ tỉnh còn yếu.</li>
              <li><strong>Lo ngại bảo mật/an ninh mạng và tương thích hạ tầng:</strong> rào cản với chủ đầu tư khi tích hợp hệ thống tòa nhà.</li>
            </ul>
          </section>

          {/* 7. DỰ BÁO */}
          <section className="space-y-4">
            <H2 id="du-bao">7. Dự báo &amp; triển vọng (3–5 năm tới)</H2>
            <p>
              Trên cơ sở các tốc độ tăng trưởng nêu ở Mục 2 (smart parcel locker CAGR 16,5%; smart lock CAGR 12,77%) và động lực TMĐT
              (CAGR 21,65%), một số xu hướng định hình thị trường giai đoạn tới:
            </p>
            <ul className="space-y-2">
              <li><strong>Mạng lưới locker liên thông đa nhà cung cấp:</strong> chuẩn hóa giao tiếp giữa sàn TMĐT, bưu chính và tủ.</li>
              <li><strong>Tích hợp smart city &amp; micro-fulfillment:</strong> locker trở thành điểm gom hàng cấp khu vực.</li>
              <li><strong>Mô hình thuê bao/tài trợ locker:</strong> Locker-as-a-Service và chia sẻ doanh thu hạ rào cản đầu tư.</li>
              <li><strong>Bền vững:</strong> gom giao nhận giúp giảm số chuyến và phát thải chặng cuối.</li>
            </ul>
            <TseNote>
              Đây là phần nhận định xu hướng dựa trên dữ liệu CAGR có nguồn, không phải dự báo định lượng mới. Các con số tuyệt đối vui lòng
              tham chiếu trực tiếp nguồn gốc ở Mục 2 và Mục 3.
            </TseNote>
          </section>

          {/* 8. KHUYẾN NGHỊ */}
          <section className="space-y-4">
            <H2 id="khuyen-nghi">8. Khuyến nghị cho doanh nghiệp</H2>
            <TseNote>
              <ol className="ml-4 list-decimal space-y-2">
                <li><strong>Ưu tiên vị trí mật độ giao dịch cao:</strong> chung cư đông dân, điểm logistics, tòa văn phòng — nơi bài toán chặng cuối/lưu trữ rõ rệt nhất.</li>
                <li><strong>Chọn giải pháp có nền tảng phần mềm IoT mạnh:</strong> giá trị dài hạn nằm ở quản lý từ xa, phân tích và tích hợp, không chỉ ở phần cứng.</li>
                <li><strong>Cân nhắc mô hình linh hoạt:</strong> mua, thuê (locker-as-a-service) hoặc chia sẻ doanh thu để tối ưu vốn và rủi ro.</li>
                <li><strong>Đầu tư cho trải nghiệm &amp; nhận thức người dùng:</strong> sự tiện lợi, an toàn và độ tin cậy quyết định mức độ chấp nhận.</li>
                <li><strong>Chọn đối tác năng lực trọn gói:</strong> từ thiết kế, sản xuất, IoT đến lắp đặt và bảo trì — giảm rủi ro vận hành.</li>
              </ol>
            </TseNote>
          </section>

          {/* 9. VỀ TSE + NGUỒN */}
          <section className="space-y-4">
            <H2 id="ve-tse">9. Về TSE Vending &amp; nguồn dữ liệu</H2>
            <p>
              <strong>TSE Vending (Công ty Cổ phần Công nghệ TSE)</strong> là đơn vị cung cấp giải pháp smart locker và máy bán hàng tự động
              trọn gói tại Việt Nam — từ tư vấn, thiết kế, sản xuất, tích hợp IoT đến lắp đặt và bảo trì.
              {" "}<span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700">[CẦN SỐ THẬT: số dự án đã triển khai, số tỉnh/thành phục vụ]</span>
            </p>

            <h3 className="text-lg font-bold text-slate-900">Nguồn dữ liệu</h3>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>Mobility Foresights</strong> — Vietnam Smart Parcel Locker Market (2025).</li>
              <li>• <strong>IMARC Group</strong> — Vietnam Smart Lock Market / Vietnam E-logistics (2025).</li>
              <li>• <strong>Statista</strong> — Smart Lock Vietnam, Revenue &amp; Forecast (2025).</li>
              <li>• <strong>Ken Research</strong> — Vietnam Smart Lock Market Outlook (2025).</li>
              <li>• <strong>B&amp;Company</strong> — Vietnam Smart Lock &amp; E-commerce Forecast (2024–2025).</li>
              <li>• <strong>Mordor Intelligence</strong> — Vietnam Courier, Express &amp; Parcel (CEP) Market (2024).</li>
            </ul>

            <p className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
              <strong>Ghi chú phương pháp:</strong> Báo cáo được tổng hợp từ các nguồn thứ cấp công khai. Số liệu giữa các nguồn có phạm vi
              định nghĩa và phương pháp khác nhau (smart lock vs smart parcel locker), do đó được trình bày tách bạch theo từng phạm vi và
              không cộng gộp. Khi trích dẫn, vui lòng ghi nguồn: "Báo cáo Thị trường Smart Locker Việt Nam 2026 — TSE Vending".
            </p>
          </section>

          {/* KEY STATISTICS — tài sản PR */}
          <section className="space-y-4">
            <h2 className="border-b-2 border-brand-200 pb-2 text-2xl font-extrabold text-brand-800">Key Statistics — số liệu nổi bật</h2>
            <p className="text-sm text-slate-500">Dành cho báo chí, infographic &amp; trích dẫn nhanh. Mỗi số liệu là một câu độc lập kèm nguồn.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {KEY_STATS.map((s) => (
                <div key={s.lbl} className="rounded-2xl border border-slate-200 border-t-4 border-t-brand-600 bg-white p-5">
                  <p className="text-xl font-extrabold text-brand-700">{s.num}</p>
                  <p className="mt-1 text-sm text-slate-600">{s.lbl}</p>
                  <p className="mt-2 text-[11px] font-medium text-slate-400">Nguồn: {s.src}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={PDF} download className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">
                ↓ Tải báo cáo đầy đủ (PDF)
              </a>
              <Link href="/tu-locker-thong-minh" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Xem giải pháp tủ locker thông minh →
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Cta />
    </>
  );
}
