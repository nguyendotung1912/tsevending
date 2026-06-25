import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { videos, GROUP_ORDER, GROUP_LABELS, type VideoGroup } from "@/content/videos";
import PageHeader from "@/components/PageHeader";
import VideoEmbed from "@/components/VideoEmbed";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Thư Viện Video Smart Locker & Vending | TSE Vending",
  description:
    "Thư viện video TSE Vending: demo smart locker (tủ locker thông minh) và máy bán hàng tự động — cách hoạt động, ứng dụng theo ngành và case study dự án thực tế.",
  path: "/video",
});

const breadcrumbs = [{ name: "Thư viện video", path: "/video" }];

export default function VideoLibraryPage() {
  const groups = GROUP_ORDER.map((g) => ({
    group: g as VideoGroup,
    label: GROUP_LABELS[g],
    items: videos.filter((v) => v.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />

      <PageHeader
        eyebrow="Thư viện video"
        title="Video Smart Locker & Máy Bán Hàng Tự Động"
        description="Demo cách hoạt động, ứng dụng theo ngành và dự án thực tế của tủ locker thông minh và máy bán hàng tự động TSE Vending."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6">
          {groups.map((g) => (
            <div key={g.group}>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-6 w-1.5 rounded-full bg-brand-700" />
                <h2 className="text-2xl font-extrabold text-slate-900">{g.label}</h2>
                <span className="text-sm text-slate-400">{g.items.length} video</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((v) => (
                  <VideoEmbed key={v.key} video={v} />
                ))}
              </div>
            </div>
          ))}

          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            Các video đang được sản xuất và sẽ cập nhật dần. Trong lúc chờ, bạn có thể{" "}
            <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">
              tìm hiểu smart locker là gì
            </Link>{" "}
            hoặc xem{" "}
            <Link href="/du-an" className="font-semibold text-brand-600 hover:underline">hình ảnh dự án thực tế</Link>.
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
