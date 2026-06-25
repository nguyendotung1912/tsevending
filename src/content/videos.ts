// Video library — single source of truth for the /video page, on-page embeds
// and VideoObject schema.
//
// HOW IT WORKS
// - Each entry is one planned video. While `id` is undefined the page renders a
//   styled "coming soon" placeholder slot and emits NO schema (we never ship
//   fake/placeholder VideoObject markup to Google).
// - When a video is published on YouTube, fill `id`, `uploadDate` and `duration`
//   ([ĐIỀN SAU KHI CÓ VIDEO]). The embed goes live, VideoObject schema is emitted
//   and a <video> entry appears in the sitemap automatically.
// - `pages` lists the page paths where the video should embed (pillar / 8 niches
//   / "smart locker là gì").

export type VideoGroup = "demo" | "nganh" | "case-study";

export const GROUP_LABELS: Record<VideoGroup, string> = {
  demo: "Demo sản phẩm",
  nganh: "Theo ngành",
  "case-study": "Case study & tin tưởng",
};

export const GROUP_ORDER: VideoGroup[] = ["demo", "nganh", "case-study"];

export interface VideoItem {
  /** Stable slug — used as React key and anchor. */
  key: string;
  title: string;
  description: string;
  group: VideoGroup;
  /** YouTube video id. undefined = placeholder. [ĐIỀN SAU KHI CÓ VIDEO] */
  id?: string;
  /** ISO date published, e.g. "2026-07-01". [ĐIỀN SAU KHI CÓ VIDEO] */
  uploadDate?: string;
  /** ISO 8601 duration, e.g. "PT2M30S". [ĐIỀN SAU KHI CÓ VIDEO] */
  duration?: string;
  /** Page paths where this video should embed. */
  pages?: string[];
}

const LOCKER = "/tu-locker-thong-minh";

// 10 planned videos (see SEO-VIDEO-CHANGELOG.md / production brief Part II).
// id/uploadDate/duration intentionally left undefined → [ĐIỀN SAU KHI CÓ VIDEO].
export const videos: VideoItem[] = [
  // ── Nhóm A — Demo sản phẩm ──────────────────────────────────────
  {
    key: "smart-locker-hoat-dong",
    title: "Smart locker hoạt động như thế nào?",
    description: "Demo đầy đủ quy trình gửi và nhận đồ qua tủ locker thông minh TSE Vending.",
    group: "demo",
    pages: [
      LOCKER,
      `${LOCKER}/smart-locker-la-gi`,
      `${LOCKER}/tu-locker-van-phong`,
      `${LOCKER}/tu-gui-do-thong-minh`,
      `${LOCKER}/tu-locker-khach-san-resort`,
      `${LOCKER}/tu-locker-sieu-thi-ban-le`,
    ],
  },
  {
    key: "5-cach-mo-khoa",
    title: "5 cách mở khóa smart locker: QR, PIN, RFID, vân tay, Face ID",
    description: "So sánh 5 phương thức mở khóa tủ locker thông minh và trường hợp dùng phù hợp.",
    group: "demo",
    pages: [`${LOCKER}/smart-locker-la-gi`],
  },
  {
    key: "tour-phan-mem",
    title: "Tour phần mềm quản lý smart locker",
    description: "Khám phá dashboard giám sát từ xa, phân quyền và báo cáo của hệ thống smart locker TSE.",
    group: "demo",
    pages: [LOCKER],
  },
  // ── Nhóm B — Theo ngành ─────────────────────────────────────────
  {
    key: "locker-chung-cu",
    title: "Smart locker chung cư — nhận hàng TMĐT 24/7",
    description: "Demo cư dân nhận bưu phẩm thương mại điện tử tự động 24/7 tại sảnh chung cư.",
    group: "nganh",
    pages: [`${LOCKER}/tu-locker-chung-cu`],
  },
  {
    key: "locker-logistics",
    title: "Smart locker logistics — shipper gửi hàng vào tủ",
    description: "Shipper giao hàng vào tủ locker, tích hợp API đơn vị vận chuyển, giao thành công gần 100%.",
    group: "nganh",
    pages: [`${LOCKER}/tu-locker-giao-nhan-hang`],
  },
  {
    key: "locker-truong-hoc-benh-vien",
    title: "Smart locker trường học & bệnh viện",
    description: "Ứng dụng tủ locker thông minh trong môi trường giáo dục và y tế, xác thực RFID/không chạm.",
    group: "nganh",
    pages: [
      `${LOCKER}/tu-locker-truong-hoc-dai-hoc`,
      `${LOCKER}/tu-locker-benh-vien-y-te`,
    ],
  },
  // ── Nhóm C — Case study & tin tưởng ─────────────────────────────
  {
    key: "case-vinhomes-grand-park",
    title: "Case study: tủ locker chung cư Vinhomes Grand Park",
    description: "Dự án thực tế tủ locker nhận hàng 24/7 tại chung cư Vinhomes Grand Park, TP. Thủ Đức.",
    group: "case-study",
    pages: [`${LOCKER}/tu-locker-chung-cu`, "/case-study/smart-locker-vinhomes-grand-park"],
  },
  {
    key: "vi-sao-chon-tse",
    title: "Vì sao chọn smart locker TSE Vending? 5 lợi thế",
    description: "5 lợi thế cạnh tranh của giải pháp smart locker trọn gói TSE Vending.",
    group: "case-study",
    pages: [LOCKER],
  },
  {
    key: "so-sanh-locker-vs-tu-khoa-co",
    title: "So sánh smart locker và tủ khóa cơ truyền thống",
    description: "Phân tích ưu nhược điểm giữa tủ locker thông minh và tủ khóa cơ về bảo mật, quản lý, chi phí.",
    group: "case-study",
    pages: [`${LOCKER}/smart-locker-la-gi`],
  },
  {
    key: "quy-trinh-lap-dat-bao-tri",
    title: "Quy trình lắp đặt & bảo trì smart locker TSE",
    description: "Từ khảo sát, thiết kế, lắp đặt đến bảo trì định kỳ — quy trình trọn gói của TSE Vending.",
    group: "case-study",
    pages: [LOCKER],
  },
];

/** Videos to embed on a given page path (ready or placeholder). */
export function videosForPage(path: string): VideoItem[] {
  return videos.filter((v) => v.pages?.includes(path));
}

/** Only videos that have a real YouTube id (live + schema + sitemap). */
export function readyVideos(): VideoItem[] {
  return videos.filter((v) => Boolean(v.id));
}

export function isReady(v: VideoItem): boolean {
  return Boolean(v.id);
}
