import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Báo Chí Nói Về TSE Vending | Smart Locker & Vending",
  description:
    "Tổng hợp bài viết, phỏng vấn và đề cập của báo chí về TSE Vending — đơn vị giải pháp smart locker và máy bán hàng tự động tại Việt Nam.",
  path: "/bao-chi",
});

const breadcrumbs = [{ name: "Báo chí", path: "/bao-chi" }];

// ⚠ [ĐIỀN LINK PR] — thêm bài báo thật khi có (giữ outbound link tới nguồn gốc).
interface PressItem {
  outlet: string;
  title: string;
  url: string;
  date: string;
}
const press: PressItem[] = [];

export default function BaoChiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />

      <PageHeader
        eyebrow="Báo chí"
        title="Báo chí nói về TSE Vending"
        description="Nơi tổng hợp các bài viết, phỏng vấn và đề cập của báo chí, đối tác về giải pháp smart locker và máy bán hàng tự động của TSE Vending."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {press.length > 0 ? (
            <ul className="space-y-4">
              {press.map((p) => (
                <li key={p.url} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">{p.outlet}</span>
                    <span>{p.date}</span>
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-base font-bold text-slate-900 hover:text-brand-700">
                    {p.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-bold text-slate-900">Đang cập nhật</p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
                Chúng tôi đang tổng hợp các bài viết của báo chí và đối tác về TSE Vending. Trong lúc chờ, mời bạn xem{" "}
                <Link href="/khach-hang" className="font-semibold text-brand-600 hover:underline">khách hàng &amp; dự án tiêu biểu</Link>{" "}
                hoặc{" "}
                <Link href="/bao-cao-thi-truong-smart-locker-viet-nam" className="font-semibold text-brand-600 hover:underline">báo cáo thị trường smart locker Việt Nam 2026</Link>.
              </p>
            </div>
          )}

          {/* Media kit / liên hệ báo chí */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-slate-900">Liên hệ báo chí &amp; hợp tác nội dung</h2>
            <p className="mt-2 text-sm text-slate-600">
              Nhà báo, biên tập viên hoặc đối tác cần thông tin, số liệu ngành, hình ảnh hoặc phỏng vấn chuyên gia về smart locker
              vui lòng liên hệ TSE Vending.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white hover:bg-brand-700">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="rounded-xl border border-slate-200 px-5 py-2.5 font-bold text-slate-700 hover:bg-slate-50">
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
