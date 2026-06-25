# SEO-OFFPAGE-CHANGELOG — Linkable assets (Phần I)

Ngày: 2026-06-25 · Thực hiện: TSE Vending

## Mục tiêu
Tạo nội dung trên web để THU HÚT backlink tự nhiên (linkable assets) + tăng trust.

## File tạo / sửa
| File | Việc |
|---|---|
| `src/content/case-studies.ts` | **MỚI** — 3 case study từ dữ liệu thật (reviews.ts + /du-an). |
| `src/app/case-study/[slug]/page.tsx` | **MỚI** — route chi tiết case study (bối cảnh→vấn đề→giải pháp→kết quả→testimonial→link). |
| `src/app/khach-hang/page.tsx` | **MỚI** — trust stats + tường logo + grid case study card. |
| `src/app/bao-chi/page.tsx` | **MỚI** — trang "Báo chí nói về TSE" (empty-state + media kit) chờ điền link PR. |
| `src/app/du-an/page.tsx` | Thêm link → /khach-hang (case study chi tiết). |
| `src/content/videos.ts` | Map video case Vinhomes vào trang case-study tương ứng. |
| `src/app/sitemap.ts` | Thêm /khach-hang, /bao-chi, 3 URL case-study. |

## 3 Case study (URL)
- `/case-study/smart-locker-vinhomes-grand-park` — chung cư, 24 ô tủ, giảm ~80% tải bảo vệ.
- `/case-study/smart-locker-dai-hoc-kinh-te-tphcm` — 40 ô RFID khu thể thao UEH.
- `/case-study/smart-locker-benh-vien-tphcm` — tủ kháng khuẩn khu nhân viên y tế.

## Schema (hợp lệ)
- Case study: **Article (BlogPosting)** + **Organization** + **BreadcrumbList**.
- /khach-hang: **ItemList** (3 case study) + **BreadcrumbList**.
- /bao-chi: **BreadcrumbList**.

## ⚠ Chỗ [CẦN XÁC NHẬN QUYỀN DÙNG TÊN/LOGO]
Tên khách hàng (Vinhomes Grand Park, ĐH Kinh tế TP.HCM, bệnh viện) đã xuất hiện sẵn trên
site (reviews.ts, các section "Dự án thực tế"). **Trước khi đẩy PR/booking báo chí**, cần
xác nhận quyền dùng tên + logo chính thức. Logo hiện là **tile chữ** ([CẦN QUYỀN LOGO]).

## ⚠ Chỗ [CẦN SỐ THẬT] (badge amber trên trang case study)
- Vinhomes: số lượt gửi/nhận trung bình mỗi tháng.
- UEH: số sinh viên sử dụng mỗi ngày.
- Bệnh viện: số ô tủ đã lắp đặt; số nhân viên y tế sử dụng theo ca.
- Bệnh viện: xác nhận có được nêu đích danh tên bệnh viện không.

## ⚠ Chỗ [ĐIỀN LINK PR]
- `/bao-chi`: mảng `press[]` trong page.tsx — thêm {outlet, title, url, date} khi có bài thật.

## Việc tay (Phần II)
Xem `OFFPAGE-EXECUTION-PLAYBOOK.md` — NAP/danh bạ, guest post & PR, digital PR listicle, brand mention.
