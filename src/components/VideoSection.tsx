import { videosForPage } from "@/content/videos";
import VideoEmbed from "./VideoEmbed";

// On-page video slot for niche / informational pages. Renders the video(s)
// mapped to `path` in content/videos.ts (live embed or "coming soon" placeholder).
// Returns null when no video is mapped to the page, so it stays invisible there.
export default function VideoSection({ path, title = "Video minh họa" }: { path: string; title?: string }) {
  const items = videosForPage(path);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-slate-100 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-6 w-1.5 rounded-full bg-brand-700" />
          <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
        </div>
        <div className={`grid gap-6 ${items.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
          {items.map((v) => (
            <VideoEmbed key={v.key} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
