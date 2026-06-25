// Video library. VideoObject schema is emitted ONLY for entries that exist here,
// so we never ship invalid/fake video schema. To add a video: push an entry with
// the real YouTube id, and list the page slugs where it should embed.
//
// [CẦN VIDEO THẬT] — điền video YouTube thật vào mảng dưới (để trống = không nhúng).
export interface VideoItem {
  /** YouTube video id, e.g. "dQw4w9WgXcQ" */
  id: string;
  title: string;
  description: string;
  /** ISO date the video was published, e.g. "2026-06-20" */
  uploadDate: string;
  /** Page paths where this video should embed (pillar/niche/"là gì"). */
  pages?: string[];
}

export const videos: VideoItem[] = [
  // Ví dụ (bỏ comment + thay id thật khi có video):
  // {
  //   id: "YOUTUBE_ID",
  //   title: "Smart locker TSE Vending hoạt động như thế nào?",
  //   description: "Video demo quy trình gửi/nhận đồ qua tủ locker thông minh TSE Vending.",
  //   uploadDate: "2026-06-20",
  //   pages: ["/tu-locker-thong-minh", "/tu-locker-thong-minh/smart-locker-la-gi"],
  // },
];

export function videosForPage(path: string): VideoItem[] {
  return videos.filter((v) => v.pages?.includes(path));
}
