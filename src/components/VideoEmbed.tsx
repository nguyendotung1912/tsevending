import JsonLd from "./JsonLd";
import type { VideoItem } from "@/content/videos";

// Renders a lazy YouTube embed + valid VideoObject schema. Only ever called with
// a real VideoItem (see videos.ts), so the schema is never fabricated.
export default function VideoEmbed({ video }: { video: VideoItem }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}`;
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: video.title,
          description: video.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploadDate: video.uploadDate,
          embedUrl,
          contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
        }}
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
      <figcaption className="px-4 py-3 text-sm font-medium text-slate-700">{video.title}</figcaption>
    </figure>
  );
}
