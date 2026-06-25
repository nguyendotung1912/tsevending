import JsonLd from "./JsonLd";
import { videoObjectJsonLd } from "@/lib/seo";
import { isReady, type VideoItem } from "@/content/videos";

// Renders a lazy YouTube embed + VideoObject schema when the video is published.
// While the video has no id yet it renders a "coming soon" placeholder slot and
// emits NO schema (we never ship fabricated VideoObject markup).
export default function VideoEmbed({ video }: { video: VideoItem }) {
  if (!isReady(video) || !video.id) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-xl text-brand-600 shadow-sm">▶</div>
            <p className="text-sm font-bold text-slate-700">Video sắp ra mắt</p>
            <p className="mt-0.5 text-xs text-slate-400">{/* [ĐIỀN SAU KHI CÓ VIDEO] */}Đang sản xuất</p>
          </div>
        </div>
        <figcaption className="px-4 py-3">
          <p className="text-sm font-semibold text-slate-700">{video.title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{video.description}</p>
        </figcaption>
      </figure>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}`;
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <JsonLd
        data={videoObjectJsonLd({
          id: video.id,
          name: video.title,
          description: video.description,
          uploadDate: video.uploadDate ?? "",
          duration: video.duration,
        })}
      />
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="px-4 py-3">
        <p className="text-sm font-semibold text-slate-700">{video.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{video.description}</p>
      </figcaption>
    </figure>
  );
}
