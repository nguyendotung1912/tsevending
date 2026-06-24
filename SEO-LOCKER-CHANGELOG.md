# SEO Changelog — Mảng Smart Locker (tsevending.com)

Thực hiện: 2026-06-24 · Next.js 16 + OpenNext + Cloudflare Workers · Không đổi framework.

---

## 1. File đã sửa (tóm tắt)

| File | Thay đổi |
|---|---|
| `src/content/categories.ts` | Pillar locker: title dẫn "Smart Locker", H1 "Giải Pháp Trọn Gói", meta nhấn IoT/trọn gói/4 tỉnh + CTA |
| `src/app/[silo]/page.tsx` | Pillar locker: thêm bảng "Smart Locker vs tủ khóa cơ" + 6 phương thức mở khóa; thêm BreadcrumbList JSON-LD |
| `src/app/[silo]/[sub]/page.tsx` | Thêm BreadcrumbList JSON-LD cho mọi trang con; thêm 3 case study thật (Vinhomes / ĐH Kinh tế / bệnh viện) |
| `src/content/blog/chung-nhan-tu-locker-...iso-ce-va-tcvn.md` | Thêm internal link về pillar (anchor "tủ locker thông minh") |
| `src/content/blog/phan-tich-roi-dau-tu-tu-locker-...chung-cu.md` | Thêm internal link về pillar |
| `keyword-map-locker.md` (mới) | Bảng keyword-map mảng locker |
| `SEO-LOCKER-CHANGELOG.md` (mới) | File này |

## 2. URL mới tạo (trong brief locker này)
- **KHÔNG tạo URL mới.** 2 trang informational (`/tu-locker-thong-minh/smart-locker-la-gi`, `/tu-locker-thong-minh/bang-gia`) đã tạo ở brief SEO trước. 4 chủ đề blog (ISO, so sánh mở khóa, cách chọn, ROI chung cư) ĐÃ TỒN TẠI sẵn → KHÔNG tạo trùng (tránh cannibalization theo Phần C). Chỉ tối ưu nội dung/schema/internal link các trang sẵn có.

## 3. Keyword map
Xem file riêng [`keyword-map-locker.md`](./keyword-map-locker.md) — pillar (từ rộng) + 2 informational + 8 ngách + 4 blog, mỗi URL 1 từ khóa chính không trùng.

## 4. Redirect 301
- **KHÔNG có** — không đổi/gộp URL nào trong brief này. Mọi trang giữ nguyên slug.

## 5. Chỗ [CẦN GIÁ THẬT] — cần người điền số

| Vị trí | Hiện tại | Cần |
|---|---|---|
| `/tu-locker-thong-minh/bang-gia` — 3 bậc giá | Khoảng **ước tính** 15-40tr / 40-120tr / 120-400tr (ghi rõ "khoảng tham khảo, liên hệ báo giá chính xác") | **[CẦN GIÁ THẬT]** Thay bằng khoảng giá thật theo cấu hình thực tế của TSE |
| `/tu-locker-thong-minh/bang-gia` — FAQ giá | Dùng lại các khoảng trên | Cập nhật theo số thật |
| Pillar & các trang ngách | Không nêu số giá cụ thể (đúng) | — |

> Lưu ý: TẤT CẢ số trên là khoảng tham khảo do AI ước tính, KHÔNG phải giá chính thức. Cần đội ngũ TSE xác nhận trước khi coi là số liệu chốt.

## 6. Việc NGƯỜI cần làm tiếp (không phải code)

- [ ] **Search Console:** submit lại sitemap; Request indexing cho pillar locker, smart-locker-la-gi, bang-gia, 8 trang ngách.
- [ ] **Điền giá thật** vào trang `/tu-locker-thong-minh/bang-gia` (mục 5).
- [ ] **Google Business Profile** + (nếu có) địa chỉ chi nhánh HN/ĐN để thêm LocalBusiness.
- [ ] **Backlink mảng locker:** PR/báo ngành bất động sản, proptech, logistics; directory; bài đối tác (Lotte/AEON-style). Đây là yếu tố vượt VF&T/SantaPocket.
- [ ] **Theo dõi GSC 4-6 tuần:** "smart locker", "tủ locker thông minh", + 8 từ ngách.
- [ ] (Tùy chọn) Gộp/canonical các bài ROI locker trùng chủ đề (có 3 biến thể) để dồn sức mạnh.

---

## Phụ lục — Tình trạng mảng locker sau tối ưu
- ✅ Pillar: "Smart Locker" trong title/H1/meta/nội dung; bảng so sánh + phương thức mở khóa; FAQPage + BreadcrumbList + Service + ItemList schema; link xuống 8 ngách + 2 informational.
- ✅ 8 trang ngách: từ khóa chính riêng (không trùng), nội dung ngách riêng, 3 case study thật, FAQ + Service + Product + BreadcrumbList schema, CTA, link ngược pillar.
- ✅ 2 informational: định nghĩa snippet-friendly, TOC, bảng so sánh, FAQ schema, internal link.
- ✅ Blog hỗ trợ: 4 chủ đề trụ cột đã có, đều link về pillar.
- ✅ Tất cả ngày đăng hợp lệ (đã sửa lỗi ngày 2027 ở brief trước).
- ✅ Chống cannibalization: xem keyword-map-locker.md.
