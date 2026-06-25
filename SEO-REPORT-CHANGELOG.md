# SEO-REPORT-CHANGELOG — Báo cáo Thị trường Smart Locker Việt Nam 2026

Ngày: 2026-06-25 · Thực hiện: TSE Vending

## Mục tiêu
Dựng trang báo cáo thị trường long-form làm **nguồn trích dẫn ngành** (entity + backlink tự nhiên).

## File tạo / sửa
| File | Việc |
|---|---|
| `src/app/bao-cao-thi-truong-smart-locker-viet-nam/page.tsx` | **MỚI** — trang report long-form (server component), 9 mục + Key Statistics + nút tải PDF + chia sẻ FB/LinkedIn. |
| `public/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.html` + `.pdf` | Cập nhật theo bộ số liệu mới (IMARC/Statista/Ken/B&Company); re-render PDF. |
| `public/reports/smart-locker-viet-nam-2026-key-statistics.html` + `.pdf` | Cập nhật key-stats theo số liệu mới. |
| `scripts/render-report-pdf.mjs` | Script render HTML→PDF (Playwright). |
| `next.config.ts` | 301 redirect `/bao-cao` → `/bao-cao-thi-truong-smart-locker-viet-nam`. |
| `src/app/bao-cao/page.tsx` | **XÓA** — landing ngắn cũ (gộp vào URL keyword, tránh trùng). |
| `src/app/sitemap.ts` | Đổi entry `/bao-cao` → URL keyword mới (priority 0.8). |
| `src/app/tin-tuc/page.tsx` | Banner báo cáo trỏ URL keyword mới. |

## Schema
- **BlogPosting (Article)** — `articleJsonLd`, author Person (worksFor TSE) + publisher Organization.
- **Organization** — `organizationJsonLd` (tác giả TSE).
- **BreadcrumbList** — Trang chủ → Báo cáo.

## SEO
- URL: `/bao-cao-thi-truong-smart-locker-viet-nam`
- Title 45 ký tự (<60). Meta ~155 ký tự. 1 H1 (PageHeader). TOC anchor link 9 mục (scroll-mt).
- Target kw: "thị trường smart locker việt nam", "báo cáo smart locker", "thị trường tủ locker thông minh".
- Mỗi số liệu là câu khẳng định độc lập + badge nguồn (dễ trích dẫn).

## Phân biệt nguồn vs nhận định
- Số liệu có nguồn: badge `Nguồn: …`.
- Nhận định TSE: callout `TseNote` (viền cam) — Mục 4, 7, 8.

## ⚠ Chỗ [CẦN SỐ THẬT] — cần điền dữ liệu thật
- **Mục 9 (Về TSE):** số dự án đã triển khai, số tỉnh/thành phục vụ. (Hiện đánh dấu badge amber trên trang + ghi chú trong PDF.)

## ⚠ Biểu đồ cần kiểm tra dữ liệu (bar-chart CSS, width tính theo tỷ lệ thủ công)
- Mục 2: smart lock VN 2,3→7,2 triệu USD (2019–2023) — B&Company.
- Mục 2: smart parcel locker VN 1,08→2,87 tỷ USD (2025–2031) — Mobility Foresights.
- Mục 3: TMĐT VN 27,7→62,51 tỷ USD (2025–2030) — B&Company.

## Nguyên tắc đã tuân thủ
- KHÔNG bịa số mới; giữ nguyên số liệu & nguồn theo brief.
- Phạm vi smart lock vs smart parcel locker trình bày tách bạch, không cộng gộp.
- Giọng khách quan; chỉ Mục 8–9 thể hiện chuyên môn TSE (không quảng cáo lộ liễu).
