# SEO-VIDEO-CHANGELOG — Hệ thống Video Smart Locker

Ngày: 2026-06-25 · Thực hiện: TSE Vending

## Mục tiêu
Dựng hạ tầng video sẵn sàng nhúng, tối ưu để video xuất hiện trên Google (video result).

## Kiến trúc (tái dùng tối đa)
- **Nguồn dữ liệu duy nhất:** `src/content/videos.ts` — 10 video kế hoạch, nhóm `demo`/`nganh`/`case-study`, mapping `pages[]`.
- **Cơ chế placeholder an toàn:** khi `id` chưa có → render slot "Video sắp ra mắt" + **KHÔNG xuất schema** (không bao giờ ship VideoObject giả). Khi điền `id` → embed live + schema + sitemap tự bật.

## File tạo / sửa
| File | Việc |
|---|---|
| `src/content/videos.ts` | **Viết lại** — 10 video + nhóm + helper `videosForPage`/`readyVideos`/`isReady`. |
| `src/lib/seo.ts` | **MỚI** `videoObjectJsonLd()` (name, description, thumbnailUrl, uploadDate, duration, embedUrl, contentUrl, publisher). |
| `src/components/VideoEmbed.tsx` | Hỗ trợ 2 trạng thái: ready (iframe + schema) / placeholder (slot, không schema). |
| `src/components/VideoSection.tsx` | **MỚI** — slot video cho trang ngách/informational; null nếu trang không có video map. |
| `src/app/video/page.tsx` | **Viết lại** — thư viện grid nhóm theo Demo / Theo ngành / Case study. |
| `src/app/[silo]/[sub]/page.tsx` | Chèn `<VideoSection>` (phủ 8 ngách). |
| `src/app/[silo]/page.tsx` | Chèn `<VideoSection>` cho pillar. |
| `src/app/tu-locker-thong-minh/smart-locker-la-gi/page.tsx` | Đã sẵn render `videosForPage(...)` — tương thích VideoEmbed mới. |
| `src/app/sitemap.ts` | Video sitemap extension trên `/video` (chỉ xuất khi `readyVideos().length`). |

## Schema VideoObject (BẮT BUỘC)
- Helper `videoObjectJsonLd` xuất: name, description, thumbnailUrl, uploadDate, **duration**, embedUrl, contentUrl, publisher (Organization).
- Chỉ render khi video có `id` thật → tránh structured-data spam.

## Mapping video → trang (8 ngách + là gì + pillar)
| Trang | Video |
|---|---|
| pillar `/tu-locker-thong-minh` | #1 hoạt động, #3 tour phần mềm, #8 vì sao chọn, #10 lắp đặt-bảo trì |
| smart-locker-la-gi | #1 hoạt động, #2 5 cách mở khóa, #9 so sánh |
| tu-locker-chung-cu | #4 locker chung cư, #7 case Vinhomes |
| tu-locker-giao-nhan-hang | #5 logistics |
| tu-locker-truong-hoc-dai-hoc | #6 trường học & bệnh viện |
| tu-locker-benh-vien-y-te | #6 trường học & bệnh viện |
| tu-locker-van-phong, tu-gui-do-thong-minh, tu-locker-khach-san-resort, tu-locker-sieu-thi-ban-le | #1 hoạt động (demo chung) |

## ⚠ Chỗ [ĐIỀN SAU KHI CÓ VIDEO]
Với **mỗi** video trong `src/content/videos.ts`, sau khi đăng YouTube cần điền:
- `id` — YouTube video id (vd "dQw4w9WgXcQ").
- `uploadDate` — ngày đăng ISO (vd "2026-07-15").
- `duration` — ISO 8601 (vd "PT2M30S").

→ Điền xong: embed tự live, VideoObject schema tự xuất, `/video` chuyển placeholder→player, video sitemap tự thêm entry. KHÔNG cần sửa code.

## Output đã làm
- `/video` đã có trong sitemap (priority 0.5) + video sitemap extension chờ sẵn.
- Kịch bản 10 video + YouTube SEO: xem `VIDEO-PRODUCTION-BRIEF.md` (Phần II — cho đội sản xuất).

## Quy trình điền video (cho lần sau)
1. Đội sản xuất quay + đăng YouTube (theo `VIDEO-PRODUCTION-BRIEF.md`).
2. Gửi Claude Code: key video + YouTube id + uploadDate + duration.
3. Sửa entry tương ứng trong `src/content/videos.ts` → deploy. Hết.
