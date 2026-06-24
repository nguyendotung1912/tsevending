# SEO Changelog — tsevending.com

Thực hiện: 2026-06-24 · Stack: Next.js 16 + OpenNext + Cloudflare Workers · Không đổi framework/thư viện.

---

## 1. File đã sửa (tóm tắt thay đổi)

| File | Thay đổi |
|---|---|
| `scripts/fix-future-dates.mjs` (mới) | Dời 451 bài có ngày tương lai (tới 2027) về 2026-01..06 |
| 451× `src/content/blog/*.md` | Sửa frontmatter `date` về quá khứ gần |
| `src/lib/seo.ts` | `title.absolute` (chặn double-brand); truncate title 55→60 |
| `src/app/page.tsx` | Title trang chủ ngắn gọn, từ khóa lên trước |
| `src/content/categories.ts` | Pillar locker +"(Smart Locker)"; rút gọn 5 metaTitle >60 |
| `src/app/du-an/page.tsx` | Rút gọn title; thêm gallery ảnh thật (12 ảnh) |
| `src/app/may-ban-hang-tu-dong/bang-gia/page.tsx` | Rút gọn title |
| `src/app/tu-locker-thong-minh/cho-thue/page.tsx` | Rút gọn title |
| `src/app/[silo]/page.tsx` | Internal link pillar → trang mới (locker & vending) |
| `src/app/sitemap.ts` | Thêm 3 URL static mới (smart-locker-la-gi, 2× bang-gia/thue-may) |
| `src/lib/content.ts` | Phục vụ ảnh WebP + `loading="lazy"` cho ảnh thân bài (CWV) |
| `src/components/ProductGallery.tsx` | Cache-bust `?v=2` ảnh sản phẩm |
| `src/data/legacy-redirects.json` | **Xóa** redirect sai `/du-an → /tin-tuc` |
| `public/_headers` | Cache `/images/*` 30 ngày |

## 2. Trang/URL mới tạo

| URL | Loại | Từ khóa chính |
|---|---|---|
| `/tu-locker-thong-minh/smart-locker-la-gi` | Informational (mục lục, Article schema) | smart locker là gì |
| `/tu-locker-thong-minh/bang-gia` | Pricing (3 bậc, 3 mô hình, Service schema) | giá tủ locker thông minh |
| `/may-ban-hang-tu-dong/thue-may` | Landing thuê máy (Service schema) | thuê máy bán hàng tự động |
| `/tin-tuc/kinh-doanh-may-ban-hang-tu-dong-co-lai-khong` | Bài ROI (số liệu thật) | kinh doanh máy bán hàng tự động có lãi không |
| `/tin-tuc/mua-may-ban-hang-tu-dong-cu-thanh-ly-co-nen-khong` | Bài long-tail | máy bán hàng tự động cũ / thanh lý |
| + 12 bài case-study ảnh thật (đợt trước) | Dự án thực tế | long-tail theo địa điểm |

## 3. Keyword map
Xem file riêng [`keyword-map.md`](./keyword-map.md) — mỗi URL ↔ 1 từ khóa chính duy nhất, không trùng.

## 4. Redirect 301
- **KHÔNG có URL nào bị đổi/gộp** trong quá trình tối ưu → không cần tạo 301 mới. (Sửa ngày bài viết chỉ đổi `date`, KHÔNG đổi slug/URL.)
- **Đã XÓA 1 redirect sai:** `/du-an → /tin-tuc` trong `legacy-redirects.json` — redirect này che mất trang `/du-an` thật (trang dự án nằm trong sitemap nhưng bị 308 đi nơi khác). Sau khi xóa, `/du-an` trả 200 đúng nội dung.
- Redirect hệ thống giữ nguyên: `/en/:path* → /` (xem mục 5), `/giao-thong-thong-minh → /`, 637 legacy redirect từ site cũ.

## 5. Vấn đề CHƯA xử lý / cần người quyết định

1. **LocalBusiness chỉ 1 địa chỉ (HCM).** Brief muốn 3 chi nhánh HCM/HN/ĐN nhưng `site.ts` chỉ có địa chỉ HCM thật. **Không bịa địa chỉ** (Google phạt NAP sai). → Cần cung cấp địa chỉ + SĐT thật của chi nhánh HN/ĐN để thêm.
2. **Hreflang vi↔en: KHÔNG áp dụng.** Site KHÔNG có bản tiếng Anh thật — `/en/*` chỉ là 301 về trang chủ. Thêm hreflang sẽ sai (trỏ tới trang redirect). Canonical mỗi trang vi đã tự trỏ về chính nó (đúng). → Nếu sau này làm bản /en thật mới cần khai báo hreflang.
3. **Số liệu giá/ROI là khoảng tham khảo.** Các trang giá/ROI ghi rõ "liên hệ báo giá chính xác". → Nếu có bảng giá thật chốt được, nên thay số cụ thể để tăng độ tin cậy & cơ hội featured snippet.
4. **Title trang chủ vs Phần 6 (cannibalization).** Title trang chủ "Máy Bán Hàng Tự Động & Tủ Locker Thông Minh | TSE Vending" (theo Phần 1.2) có chứa 2 từ khóa pillar. Hiện framing dạng tổng quan + thương hiệu (H1 trang chủ là "Thiết kế, sản xuất & vận hành..."), 2 pillar mới là trang tối ưu chính cho 2 từ khóa. → Nếu muốn tách tuyệt đối theo Phần 6, có thể đổi title trang chủ sang dạng thương hiệu thuần ("TSE Vending — Giải pháp bán lẻ tự động & locker thông minh"). Cần bạn quyết.
5. **Sitemap chưa tách pages/blog.** Hiện 1 sitemap.xml (~735 URL, dưới ngưỡng 50.000 của Google) — chưa cần tách. lastmod chính xác theo `date` từng bài. → Có thể tách `sitemap-pages`/`sitemap-blog` sau nếu muốn theo dõi index theo nhóm trong GSC.

## 6. Checklist việc NGƯỜI cần làm tiếp (không phải code)

- [ ] **Google Search Console:** submit lại `https://tsevending.com/sitemap.xml`; dùng URL Inspection "Request indexing" cho các trang mới quan trọng (2 pillar, smart-locker-la-gi, 2 bang-gia, thue-may, bài ROI).
- [ ] **Theo dõi GSC 2–4 tuần:** thứ hạng cụm "smart locker", "tủ locker thông minh", "giá máy bán hàng tự động", "thuê máy bán hàng tự động".
- [ ] **Google Business Profile:** tạo/cập nhật hồ sơ doanh nghiệp (HCM, và HN/ĐN nếu có chi nhánh) — tăng local SEO mạnh.
- [ ] **Cung cấp địa chỉ HN/ĐN thật** (nếu có) để bổ sung LocalBusiness schema.
- [ ] **Backlink:** xây liên kết từ báo ngành, directory doanh nghiệp, đối tác — quan trọng nhất để vượt đối thủ (Kootoro, Dropfoods...).
- [ ] **Khi bật lại pipeline sinh bài:** sửa logic lịch ngày kẻo lại sinh ngày tương lai (đã từng có 451 bài 2027).
- [ ] (Tùy chọn) Bật **Cloudflare Polish** nếu nâng gói Pro để nén ảnh edge thêm.

---

## Phụ lục — Tình trạng kỹ thuật SEO (đã rà)

- ✅ Schema: Organization, LocalBusiness, WebSite, Product, FAQPage, BreadcrumbList, Article, Service, ItemList.
- ✅ Title: mọi trang ≤60 ký tự, 1 H1/trang, hết double-brand.
- ✅ Canonical: self-referential mọi trang indexable (trang tool noindex).
- ✅ robots.txt + sitemap.xml OK; ảnh có alt mô tả; ảnh WebP + lazy-load thân bài.
- ✅ Core Web Vitals: hero dùng next/image priority; body img lazy; font next/font tự preload; TTFB ~0.3s từ edge Cloudflare.
- ✅ noindex đúng chỗ: trang công cụ, bài thin <600 từ, tỉnh không có kỹ thuật viên, tin thế giới tổng hợp.
