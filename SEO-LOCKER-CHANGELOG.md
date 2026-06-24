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

---

## Phần F — Chuẩn nội dung & Self-check (2026-06-25)

**Đã nâng cấp theo chuẩn F:**
- **F.1 Pillar:** thêm khối "Vì sao chọn smart locker TSE" (6 thẻ — 5 lợi thế cạnh tranh + sản xuất trong nước); đã có sẵn bảng so sánh, phương thức mở khóa, link 8 ngách, quy trình, FAQ.
- **F.2 smart-locker-la-gi:** viết lại đầy đủ (~1700 từ) — thêm cấu tạo 3 thành phần (thân tủ / khóa solenoid-motor / bộ điều khiển + phần mềm), hoạt động từng bước + kết nối LAN/WiFi/4G, lợi ích có số liệu, link đủ 8 ngách, TOC 8 mục.
- **F.3 bang-gia locker:** thêm mục "Chi phí vận hành & bảo trì"; giữ [CẦN GIÁ THẬT] ở bảng giá + phí phần mềm.
- **Dedup (theo yêu cầu trước):** "Ai nên đầu tư" → whyInvest riêng từng ngách; "Quy trình" → theo silo + heading theo sản phẩm.

**Self-check (□=đạt) — các trang trọng tâm:**

| Tiêu chí | Pillar | smart-locker-la-gi | bang-gia | 8 ngách |
|---|---|---|---|---|
| Từ khóa ở H1/100 từ đầu/H2/kết/meta | ✅ | ✅ | ✅ | ✅ |
| Đoạn đầu snippet-ready | ✅ | ✅ | ✅ | ✅ |
| Nội dung khác biệt (không trùng) | ✅ | ✅ | ✅ | ✅ (sau dedup) |
| ≥1 bảng/list cấu trúc | ✅ | ✅ | ✅ | ✅ |
| Internal link 3-6, anchor đa dạng | ✅ | ✅ (8 ngách+pillar) | ✅ | ✅ |
| Schema đúng loại | ✅ Service/ItemList/FAQ/Breadcrumb | ✅ Article/FAQ/Breadcrumb | ✅ Service/FAQ/Breadcrumb | ✅ Service/Product/FAQ/Breadcrumb |
| Title <60, 1 H1 | ✅ | ✅ | ✅ | ✅ |
| 5 lợi thế TSE thể hiện | ✅ (khối riêng) | ✅ (nhắc trọn gói/IoT) | ✅ (3 mô hình) | ✅ (theo ngách) |
| CTA đầu + cuối | ✅ | ✅ (TOC CTA + cuối) | ✅ (giữa + cuối) | ✅ (hero + cuối) |
| Đánh dấu [CẦN GIÁ THẬT] | — | — | ✅ | — |

**Còn lại cần người:** điền số thật vào các vị trí [CẦN GIÁ THẬT] trên `/tu-locker-thong-minh/bang-gia` (3 bậc giá + phí phần mềm vận hành).
