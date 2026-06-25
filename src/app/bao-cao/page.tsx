import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Báo Cáo Thị Trường Smart Locker Việt Nam 2026 | TSE Vending",
  description:
    "Báo cáo thị trường smart locker (tủ locker thông minh) Việt Nam 2026: quy mô, động lực tăng trưởng, phân khúc, xu hướng công nghệ và dự báo — tải PDF miễn phí.",
  path: "/bao-cao",
});

const breadcrumbs = [{ name: "Báo cáo thị trường", path: "/bao-cao" }];

const stats = [
  { num: "~1,08 tỷ USD", lbl: "Quy mô smart parcel locker VN 2025 (ước tính)" },
  { num: "16,5%", lbl: "CAGR thị trường VN 2025–2031" },
  { num: "27,73 tỷ USD", lbl: "Quy mô TMĐT Việt Nam 2025 (+19,4% YoY)" },
  { num: "2.000+", lbl: "Tủ thông minh ViettelPost đã triển khai" },
];

export default function BaoCaoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Báo cáo ngành"
        title="Báo Cáo Thị Trường Smart Locker Việt Nam 2026"
        description="Quy mô, động lực tăng trưởng, phân khúc ứng dụng, xu hướng công nghệ và dự báo 2026–2031 — tổng hợp từ các nguồn nghiên cứu quốc tế, kèm trích dẫn nguồn."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.lbl} className="rounded-2xl border border-slate-200 border-t-4 border-t-brand-600 bg-white p-5">
                <p className="text-2xl font-extrabold text-brand-700">{s.num}</p>
                <p className="mt-1 text-xs text-slate-500">{s.lbl}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.pdf"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
              download
            >
              ↓ Tải báo cáo đầy đủ (PDF)
            </a>
            <a
              href="/reports/smart-locker-viet-nam-2026-key-statistics.pdf"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              download
            >
              ↓ Key statistics (1 trang, cho PR)
            </a>
            <a
              href="/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.html"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Xem bản web
            </a>
          </div>

          <div className="prose prose-slate mt-10 max-w-none prose-a:text-brand-600">
            <h2>Nội dung báo cáo</h2>
            <ol>
              <li>Tóm tắt điều hành (key findings)</li>
              <li>Tổng quan thị trường &amp; quy mô</li>
              <li>Động lực tăng trưởng (TMĐT, đô thị hóa, chi phí nhân công, không tiếp xúc)</li>
              <li>Phân tích theo phân khúc ứng dụng</li>
              <li>Xu hướng công nghệ (sinh trắc học, IoT/AI, đám mây)</li>
              <li>Thách thức &amp; cơ hội</li>
              <li>Dự báo 2026–2031</li>
              <li>Kết luận &amp; khuyến nghị cho doanh nghiệp</li>
              <li>Phụ lục: nguồn dữ liệu &amp; phương pháp</li>
            </ol>
            <p className="text-sm text-slate-500">
              Báo cáo tổng hợp từ các hãng nghiên cứu quốc tế (Mobility Foresights, Mordor Intelligence,
              Fortune Business Insights, Arizton, 360iResearch...) và tài liệu học thuật; mọi số liệu kèm nguồn.
              Số liệu riêng cho Việt Nam là ước tính. Trích dẫn vui lòng ghi nguồn
              "Báo cáo Thị trường Smart Locker Việt Nam 2026 — TSE Vending".
            </p>
            <p>
              Tìm hiểu thêm về giải pháp:{" "}
              <Link href="/tu-locker-thong-minh">smart locker (tủ locker thông minh)</Link> ·{" "}
              <Link href="/tu-locker-thong-minh/smart-locker-la-gi">smart locker là gì</Link>.
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
