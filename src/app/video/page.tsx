import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { videos } from "@/content/videos";
import PageHeader from "@/components/PageHeader";
import VideoEmbed from "@/components/VideoEmbed";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Video Smart Locker & Máy Bán Hàng Tự Động | TSE Vending",
  description:
    "Thư viện video TSE Vending: demo smart locker (tủ locker thông minh) và máy bán hàng tự động — quy trình hoạt động, lắp đặt và dự án thực tế.",
  path: "/video",
});

const breadcrumbs = [{ name: "Video", path: "/video" }];

export default function VideoLibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thư viện video"
        title="Video Smart Locker & Máy Bán Hàng Tự Động"
        description="Demo quy trình hoạt động, lắp đặt và dự án thực tế của tủ locker thông minh và máy bán hàng tự động TSE Vending."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {videos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((v) => (
                <VideoEmbed key={v.id} video={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-bold text-slate-900">Video đang được cập nhật</p>
              <p className="mt-2 text-sm text-slate-600">
                Chúng tôi đang chuẩn bị các video demo smart locker và máy bán hàng tự động.
                Trong lúc chờ, bạn có thể{" "}
                <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">
                  tìm hiểu smart locker là gì
                </Link>{" "}
                hoặc xem{" "}
                <Link href="/du-an" className="font-semibold text-brand-600 hover:underline">hình ảnh dự án thực tế</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      <Cta />
    </>
  );
}
