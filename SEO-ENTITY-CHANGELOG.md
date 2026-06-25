# SEO Entity & Schema Changelog — tsevending.com

Thực hiện: 2026-06-25 · Next.js 16 + OpenNext + Cloudflare · Không đổi framework.

---

## 1. File đã sửa + Schema đã thêm

| File | Thay đổi |
|---|---|
| `src/lib/seo.ts` | Organization +`aggregateRating` (4.9/38 thật); thêm hàm `howToJsonLd()` |
| `src/app/tu-locker-thong-minh/smart-locker-la-gi/page.tsx` | Emit **HowTo schema** (4 bước gửi/nhận); thêm slot video; thêm synonyms (parcel/delivery locker, locker tự động) |
| `src/components/QuickAnswer.tsx` (mới) | Khối "Trả lời nhanh" cho featured snippet/AI Overview |
| `src/app/tu-locker-thong-minh/bang-gia/page.tsx` | Thêm QuickAnswer (trả lời "giá bao nhiêu") |
| `src/content/videos.ts` (mới) | Data video — VideoObject chỉ emit khi có video thật |
| `src/components/VideoEmbed.tsx` (mới) | Nhúng YouTube lazy + VideoObject schema |
| `src/app/video/page.tsx` (mới) | Thư viện video (empty-state cho tới khi có video) |
| `src/app/sitemap.ts` | Image sitemap (1442 ảnh: hero bài + ảnh sản phẩm); thêm /video |
| `src/content/blog/tieu-chi-chon-don-vi-cung-cap-smart-locker.md` (mới) | Bài "tiêu chí chọn đơn vị smart locker" (khách quan) |

### Schema theo loại (đã có / mới thêm)
- **WebSite, Organization, LocalBusiness/ProfessionalService** — layout (mọi trang). Organization **+aggregateRating mới**.
- **BreadcrumbList** — mọi pillar/sub/bài/trang tĩnh.
- **Service + Product** — trang con ngách. **ItemList** — pillar.
- **FAQPage** — mọi trang có FAQ. **Review** — trang chủ (review thật).
- **Article (BlogPosting)** — bài blog. **HowTo** — mới, trên smart-locker-la-gi.
- **VideoObject** — sẵn sàng, emit khi có video thật (videos.ts).

## 2. URL mới
| URL | Loại |
|---|---|
| `/video` | Thư viện video (hạ tầng, empty-state) |
| `/tin-tuc/tieu-chi-chon-don-vi-cung-cap-smart-locker` | Bài commercial-investigation (679 từ) |
| `/tu-locker-thong-minh/khu-vuc/ho-chi-minh` | Local landing — Smart Locker TP.HCM |
| `/tu-locker-thong-minh/khu-vuc/ha-noi` | Local landing — Smart Locker Hà Nội |
| `/tu-locker-thong-minh/khu-vuc/da-nang` | Local landing — Smart Locker Đà Nẵng |

## 3. Chỗ [CẦN DỮ LIỆU THẬT]

| Mục | Hiện tại | Cần |
|---|---|---|
| LocalBusiness 3 cơ sở (HCM/HN/ĐN) | Chỉ HCM (địa chỉ + geo thật) | Địa chỉ + SĐT + toạ độ thật của chi nhánh HN/ĐN |
| Organization `sameAs` | Facebook ×2 | Link LinkedIn / YouTube / Zalo OA nếu có |
| aggregateRating per-Product (trang ngách) | Chưa thêm (chỉ company-wide trên Organization/LocalBusiness) | Review riêng theo từng dòng sản phẩm mới nên thêm — không dùng rating chung cho từng Product (tránh spam) |
| VideoObject | videos.ts trống | Điền id YouTube thật + uploadDate → schema tự emit |
| Giá smart locker | Giá tham khảo thị trường (brief trước) | TSE xác nhận giá thật |

## 4. Việc NGƯỜI cần làm tiếp
- [ ] Search Console: submit lại sitemap (đã gồm image sitemap); Request indexing /video, bài tiêu chí, smart-locker-la-gi.
- [ ] Quay/đăng video YouTube (demo hoạt động, lắp đặt) → điền vào `videos.ts` (id + uploadDate + pages) → tự nhúng + VideoObject schema.
- [ ] Cung cấp địa chỉ HN/ĐN thật → bật LocalBusiness 3 cơ sở.
- [ ] Bổ sung link mạng xã hội (LinkedIn/YouTube/Zalo OA) vào `site.ts` → tăng entity sameAs.
- [ ] Tạo/cập nhật Google Business Profile cho từng cơ sở (rất quan trọng cho local SEO).
- [x] **Landing local "smart locker tphcm/hà nội/đà nẵng" — ĐÃ TẠO** (2026-06-25): 3 trang `/tu-locker-thong-minh/khu-vuc/{ho-chi-minh,ha-noi,da-nang}` với nội dung RIÊNG từng thành phố (dựa trên kỹ thuật viên thường trú THẬT, không bịa địa chỉ). Mỗi trang: QuickAnswer + use-case theo thành phố + Service/Breadcrumb/FAQPage schema + internal link. → **Cần người:** tạo Google Business Profile từng thành phố và (nếu có) gắn địa chỉ thật để mạnh hơn.

## 5. Kết quả validate schema (parse JSON-LD thực tế, 2026-06-25)
| Trang | Schema |
|---|---|
| `/` (home) | WebSite, Organization, LocalBusiness, 4× Review, FAQPage |
| `/tu-locker-thong-minh` | WebSite, Organization, LocalBusiness, Service, ItemList, BreadcrumbList, FAQPage |
| `/tu-locker-thong-minh/smart-locker-la-gi` | WebSite, Organization, LocalBusiness, BlogPosting, **HowTo**, BreadcrumbList, FAQPage |
| `/tu-locker-thong-minh/bang-gia` | WebSite, Organization, LocalBusiness, Service, BreadcrumbList, FAQPage |
| `/tu-locker-thong-minh/tu-locker-chung-cu` | WebSite, Organization, LocalBusiness, Service, BreadcrumbList, Product, FAQPage |

✅ **Tất cả JSON-LD parse hợp lệ** (không lỗi cú pháp). Khuyến nghị kiểm tra thêm bằng Google Rich Results Test sau khi Google crawl.

## 6. Tóm tắt theo phần
- **P1 Entity/Schema:** Organization +aggregateRating; HowTo mới; FAQPage/Breadcrumb/Product/Service đã đủ. (3-address & extra sameAs cần dữ liệu thật.)
- **P2 AI Overview:** QuickAnswer (giá), đoạn mở đầu trả lời thẳng, Q&A (H2 câu hỏi), bảng dữ liệu — sẵn cho snippet/AI.
- **P3 Image SEO:** image sitemap 1442 ảnh; alt mô tả + WebP + lazy đã có.
- **P4 Video:** hạ tầng đầy đủ (component + data + /video + slot), emit schema khi có video thật.
- **P5 Từ khóa:** bài "tiêu chí chọn đơn vị"; synonyms parcel/delivery locker, tủ khóa điện tử, locker tự động. (Local pages defer — cần dữ liệu thật.)
- **P6:** sitemap image+video, hreflang N/A (không có /en thật), schema validated, changelog này.

## Phụ lục — hreflang
Site KHÔNG có bản tiếng Anh thật (`/en/*` chỉ 301 về trang chủ) → hreflang không áp dụng; canonical self-referential đã đúng.
