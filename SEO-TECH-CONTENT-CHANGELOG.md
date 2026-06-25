# SEO-TECH-CONTENT-CHANGELOG — Loạt bài kỹ thuật chuyên sâu Smart Locker

Ngày: 2026-06-24/25 · Phạm vi: cụm nội dung kỹ thuật smart locker (E-E-A-T / original expertise).

## Kiến trúc (chốt)
- **Tái dùng infra blog** dưới `/tin-tuc/[slug]` (Article + FAQPage schema, author byline, related posts, sidebar internal-link — đã có sẵn).
- **Bật `sanitize:false`** trong `src/lib/content.ts` (remark-html) → cho phép **SVG inline + HTML ngữ nghĩa** trong markdown. An toàn vì 100% markdown là first-party (đã kiểm: 711 bài, không bài nào chứa HTML thô → không phá vỡ bài cũ).
- Bài kỹ thuật: `silo: tu-locker-thong-minh`, `category: kien-thuc`. SVG nguyên lý themed theo brand hex, responsive (`viewBox` + `width:100%`), có `role/aria-label/title` (alt) + `<figcaption>`. TOC = `<h2 id>` + anchor.

## Tiến độ theo cụm
| Cụm | Bài | Trạng thái |
|---|---|---|
| **A — Cấu tạo & vật liệu** | A1, A2, A3 | ✅ ĐÃ TẠO |
| **B — Công nghệ mở khóa** | B1–B5 | ✅ ĐÃ TẠO |
| **C — Phân loại theo ứng dụng** | C1–C3 | ✅ ĐÃ TẠO |
| D — Kiến trúc & sản xuất | D1–D3 | ⏳ kế tiếp |

## Bài đã tạo (Cụm A) + sơ đồ SVG
| URL | Sơ đồ SVG (inline) |
|---|---|
| `/tin-tuc/cau-tao-smart-locker-giai-phau-tu-locker-thong-minh` | Sơ đồ khối giải phẫu (7 khối + quan hệ) |
| `/tin-tuc/co-cau-khoa-dien-tu-smart-locker` | Nguyên lý khóa solenoid vs motor |
| `/tin-tuc/he-thong-dien-nguon-smart-locker` | Sơ đồ cấp nguồn + UPS dự phòng |

## Bài đã tạo (Cụm B — công nghệ mở khóa) + sơ đồ luồng xác thực
| URL | Sơ đồ SVG |
|---|---|
| `/tin-tuc/smart-locker-mo-khoa-qr-pin-otp` | Luồng xác thực QR/PIN |
| `/tin-tuc/smart-locker-mo-khoa-rfid-nfc` | Luồng xác thực RFID/NFC |
| `/tin-tuc/smart-locker-mo-khoa-van-tay` | Luồng xác thực vân tay |
| `/tin-tuc/smart-locker-mo-khoa-nhan-dien-khuon-mat` | Luồng xác thực khuôn mặt + liveness |
| `/tin-tuc/smart-locker-mo-khoa-app-bluetooth-cloud` | Kiến trúc app ↔ cloud ↔ tủ + Bluetooth |

Mỗi bài B: bảng đánh giá, FAQ (FAQPage), link chéo trong cụm B + sang cụm A + ngách dùng công nghệ (giao nhận/văn phòng/trường học/y tế). Thông số/chuẩn/giao thức cụ thể → [CẦN KIỂM CHỨNG].

## Bài đã tạo (Cụm C — phân loại theo ứng dụng) + sơ đồ
| URL | Sơ đồ SVG |
|---|---|
| `/tin-tuc/cac-loai-smart-locker-phan-loai-toan-dien` | Cây phân loại 3 trục (ứng dụng/môi trường/cơ chế) |
| `/tin-tuc/smart-locker-lanh-kiem-soat-nhiet-do` | Nguyên lý kiểm soát nhiệt độ (vòng điều khiển) |
| `/tin-tuc/smart-locker-ngoai-troi-chong-nuoc-bui-pha` | Giải thích mã IP (chống bụi/nước) |

## Schema
- ✅ **Article (BlogPosting)** + author Person (mainAuthor) — tự động qua trang [slug].
- ✅ **FAQPage** — từ `faqs` frontmatter (mỗi bài 3 FAQ).
- ✅ **BreadcrumbList** — qua PageHeader/breadcrumbs.
- ⚠ **ImageObject cho sơ đồ:** SVG nhúng inline không có URL file riêng → không gắn ImageObject cho từng sơ đồ (sẽ dùng Article schema). Nếu cần ImageObject + lọt Google Images, cân nhắc xuất sơ đồ ra file `/public/images/ky-thuat/*.svg` và nhúng `<img>` (đánh đổi: mất theming CSS). Đang ưu tiên inline theo brief.
- Validate: chạy Rich Results Test cho 3 URL (schema sinh từ helper typed → hợp lệ cú pháp).

## Internal link đã gắn (2 chiều)
- A1 ↔ A2 ↔ A3 (liên kết chéo trong cụm).
- Mỗi bài → pillar `/tu-locker-thong-minh`, `/tu-locker-thong-minh/smart-locker-la-gi`, và [báo cáo thị trường](/bao-cao-thi-truong-smart-locker-viet-nam).
- (Khi có B/C/D sẽ bổ sung link sang trang ngách dùng công nghệ tương ứng.)

## ⚠ BẢNG [CẦN KỸ SƯ TSE XÁC NHẬN] / [CẦN KIỂM CHỨNG] — rà trước khi xuất bản
| Bài | Cần xác nhận |
|---|---|
| A1 Cấu tạo | Độ dày tôn, mã thép/inox, loại sơn tĩnh điện, chuẩn kháng khuẩn, lớp phủ chịu thời tiết theo từng dòng máy TSE |
| A2 Khóa | Lực giữ (N/kgf), điện áp/dòng khóa, tuổi thọ chu kỳ đóng-mở, loại khóa TSE dùng, cấu hình fail-safe/fail-secure mặc định |
| A3 Điện/nguồn | Điện áp/dòng DC, công suất PSU, dung lượng & thời gian dự phòng pin/UPS, mức tiêu thụ điện đo thực tế, tiêu chuẩn an toàn điện (TCVN/IEC) |

→ Toàn bộ con số chính xác hiện **để trống có chủ đích** (không bịa) — kỹ sư TSE điền trước khi coi là "đã kiểm".

## Sitemap
- 3 bài tự vào sitemap qua `getAllPostsMeta().filter(indexable)` (mỗi bài > 600 từ → indexable). Không cần sửa sitemap.ts.

## Nguyên tắc đã tuân thủ
- Sơ đồ = nguyên lý/khối/luồng, đúng logic, KHÔNG giả danh bản vẽ chính xác (có ghi chú rõ trong mỗi bài).
- KHÔNG bịa thông số/chuẩn/hãng — đánh dấu [CẦN XÁC NHẬN].
- Mỗi bài: snippet-ready intro, TOC, bảng so sánh, FAQ, nội dung riêng không trùng.
