# SEO-MAXIMIZE-CHANGELOG — Cụm Smart Locker (Technical + Content + E-E-A-T)

Ngày: 2026-06-25 · Phạm vi: pillar `/tu-locker-thong-minh`, 2 informational, 8 ngách, local, blog.
Triết lý: web mới authority yếu → **không đua head-term bằng technical**; dồn technical hoàn hảo + content sâu + E-E-A-T để thắng **ngách/long-tail/informational** và chiếm rich result/snippet.

---

## THAY ĐỔI TRONG ĐỢT NÀY (code)
| File | Việc |
|---|---|
| `src/components/AuthorByline.tsx` | **MỚI** — byline chuyên gia (E-E-A-T), link `/gioi-thieu#nguyen-do-tung`. |
| `src/components/QuickAnswer.tsx` | (đã có) callout "Trả lời nhanh" 40–60 từ, tối ưu featured snippet/AI Overview. |
| `src/app/[silo]/[sub]/page.tsx` | Thêm QuickAnswer (lấy `faqs[0].a`) + AuthorByline ở đầu cột nội dung → **phủ 8 ngách**. |
| `src/app/[silo]/page.tsx` | Thêm QuickAnswer (`silo.faqs[0].a`) + AuthorByline → pillar. |
| `src/app/tu-locker-thong-minh/smart-locker-la-gi/page.tsx` | Thêm QuickAnswer (định nghĩa 40–60 từ) + AuthorByline. |

→ Trước đợt này QuickAnswer chỉ có ở 2 trang (khu-vuc, bang-gia). Nay **mọi trang cụm smart locker** có đoạn trả lời thẳng truy vấn → tăng cửa chiếm "ô số 0".

---

## TRỤ 1 — TECHNICAL

### 1.1 Core Web Vitals
⚠ **Không bịa điểm.** PageSpeed Insights keyless đã hết quota hôm nay (HTTP 429); Lighthouse không cài trong project. Cần đo bằng field data thật:
```
# PSI (cần API key để tránh 429) — mobile:
https://pagespeed.web.dev/analysis?url=https://tsevending.com/tu-locker-thong-minh
# hoặc GSC → Core Web Vitals (field/CrUX) khi đủ traffic.
```
**Tối ưu CWV đã xác minh ở code (kiểm soát 100%):**
- Font: `next/font` (Inter + Be_Vietnam_Pro) với `display: swap`, self-host, subset `vietnamese` → không FOIT, không request bên thứ ba.
- LCP: ảnh đầu `ProductGallery` có `priority` + `sizes` đúng; hero pillar/ngách là gradient CSS (không tải ảnh nặng) → LCP nhẹ.
- Ảnh: phục vụ WebP pre-sized (`unoptimized` trên Cloudflare nhưng ảnh đã nén/đúng kích thước), `fill` + `sizes` responsive, lazy-load dưới fold.
- CLS: ảnh có khung `aspect`/`fill` cố định; không chèn nội dung đẩy layout.
- JS: GA `afterInteractive`; không thư viện nặng client; trang SSG tĩnh phục vụ từ edge Cloudflare.
- Network: `preconnect`/`dns-prefetch` cho ảnh CDN + GTM.
→ **Khuyến nghị:** chạy PSI có key để chốt LCP/INP/CLS thực địa; đây là trục cần theo dõi định kỳ.

### 1.2 Crawl & Index
- ✅ Mọi trang cụm smart locker index được; thin content + tỉnh không ưu tiên + trang công cụ đã `noindex` đúng chủ đích (không index nhầm).
- ✅ Canonical per-page (`buildMetadata`). Không duplicate (đã dedup ở brief trước). Redirect `/bao-cao` → URL keyword (1 hop, không chain).
- ✅ Sitemap động + lastmod cố định cho trang ổn định; image + video sitemap extension.
- ✅ Internal mesh: pillar ↔ 8 ngách ↔ blog ↔ case study ↔ local; thêm QuickAnswer/byline không phá link.

### 1.3 Schema (đòn bẩy rich result)
| Schema | Ở đâu | Trạng thái |
|---|---|---|
| Organization + AggregateRating | layout (mọi trang) | ✅ rating 4.9/38 từ reviews.ts |
| LocalBusiness | layout | ⚠ **chỉ 1 cơ sở (HCM)** — [CẦN ĐỊA CHỈ THẬT HN & ĐN] để đủ 3 cơ sở |
| WebSite (+SearchAction) | layout | ✅ |
| Service | pillar + 8 ngách | ✅ |
| Product (+AggregateOffer) | 8 ngách | ✅ (giá tham khảo) |
| FAQPage | ngách + pillar + la-gi | ✅ |
| HowTo | smart-locker-la-gi | ✅ |
| BreadcrumbList | toàn bộ | ✅ |
| Article/BlogPosting (author Person) | blog + la-gi + case study + báo cáo | ✅ |
| ItemList | pillar + khach-hang | ✅ |
| VideoObject | khi có video id thật | ⏳ chờ video (hạ tầng sẵn) |
→ **Validate:** chạy Rich Results Test (search.google.com/test/rich-results) cho từng URL khi cần chốt; schema sinh từ helper typed nên JSON-LD hợp lệ cú pháp.

### 1.4 Mobile/UX
- ✅ Responsive (Tailwind), tap target ≥ nút chuẩn, MobileBottomBar. HTTPS toàn site, không mixed content (ảnh self/CDN https). GA qua next/script.

---

## TRỤ 2 — CONTENT (bảng từng trang)
Legend: Depth = độ sâu/sub-intent · Snippet = có đoạn trả lời thẳng (QuickAnswer/H2-Q&A) · E-E-A-T = tín hiệu hiện diện.

| Trang | Depth | Snippet-ready | E-E-A-T signal |
|---|---|---|---|
| `/tu-locker-thong-minh` (pillar) | Cao — danh mục + intro + FAQ + so sánh | ✅ QuickAnswer (mới) + FAQ | byline (mới), ItemList, link case study |
| `/.../smart-locker-la-gi` | Rất cao — định nghĩa→cấu tạo→cơ chế→phân loại→so sánh→FAQ + HowTo | ✅ QuickAnswer (mới) + H2 Q&A + HowTo | byline (mới), Article author |
| `/.../bang-gia` | Cao — khoảng giá + yếu tố giá + FAQ | ✅ QuickAnswer (sẵn) | giá tham khảo [CẦN GIÁ THẬT] |
| `/.../cho-thue` | Trung-cao — mô hình thuê + FAQ | ⚠ chưa QuickAnswer riêng (FAQ có) | — |
| 8 ngách (`tu-locker-chung-cu`…) | Cao — nội dung RIÊNG từng ngành (không generic), "Dự án thực tế" mỗi ngách | ✅ QuickAnswer (mới, từ FAQ) + H2/H3 + ul | byline (mới), Service+Product, testimonial nhúng |
| `/.../khu-vuc/[tinh]` ×3 | Trung — dữ liệu local riêng | ✅ QuickAnswer (sẵn) | LocalBusiness, dữ liệu vùng |
| Blog cụm locker | Cao — chuyên sâu, ảnh thật | một phần (tùy bài) | Article author, ảnh thật hiện trường |

**Nhận xét:** 8 ngách đã viết riêng theo đặc thù ngành (đã dedup ở brief trước) — không trùng, không generic. Đoạn QuickAnswer mới đưa câu trả lời 40–60 từ lên đầu → tăng khả năng trích cho snippet/AI Overview.

**Sub-intent còn có thể bổ sung (gợi ý vòng sau, từ PAA):**
- "smart locker giá bao nhiêu" → đã có /bang-gia; cân nhắc bảng giá theo số ô.
- "lắp smart locker chung cư cần xin phép gì" → có thể thêm mục ở ngách chung cư.
- "smart locker dùng điện bao nhiêu / mất điện có mở được không" → thêm FAQ kỹ thuật.

### 2.4 Freshness
- ✅ Ngày đăng/cập nhật hợp lệ (đã sửa lỗi ngày tương lai ở brief trước). la-gi byline "Cập nhật tháng 6/2026".

---

## TRỤ 3 — E-E-A-T
- **Experience/Expertise:** case study thật (`/case-study/*`), ảnh thật `/du-an`, byline chuyên gia (`AuthorByline` → Person schema qua `mainAuthor`).
- **Authoritativeness:** `/khach-hang` (logo + case study + khách hàng y tế thật), báo cáo thị trường `/bao-cao-thi-truong-smart-locker-viet-nam` (tài sản chuyên môn), trang `/gioi-thieu`.
- **Trustworthiness:** NAP nhất quán (LocalBusiness), reviews thật + AggregateRating, `/lien-he`, giá khoảng minh bạch.

---

## ⚠ CHỖ CẦN DỮ LIỆU THẬT
- `[CẦN ĐỊA CHỈ THẬT HN & ĐN]` → bật LocalBusiness 3 cơ sở (hiện chỉ HCM).
- `[CẦN SỐ THẬT]` → số lượt dùng/tháng ở case study (badge amber).
- `[CẦN QUYỀN LOGO]` → logo khách hàng thật trên /khach-hang (đang tile chữ).
- `[CẦN GIÁ THẬT]` → xác nhận khoảng giá tham khảo /bang-gia.
- `[CẦN REVIEW THẬT]` / `[CẦN RATING THẬT]` → reviews.ts đang dùng 5 review + 4.9/38; xác nhận khớp nguồn thật (GBP).

---

## KHUYẾN NGHỊ TỪ KHÓA (kỳ vọng thực tế)

### Có cửa thắng bằng prompt này (technical+content+E-E-A-T, KHÔNG cần nhiều backlink)
- Informational/long-tail: "smart locker là gì", "smart locker hoạt động thế nào", "smart locker vs tủ khóa cơ", "tủ locker chung cư là gì", "cách mở khóa smart locker".
- Ngách theo ngành: "tủ locker chung cư", "tủ locker bệnh viện", "tủ locker trường học", "tủ locker giao nhận hàng", "tủ gửi đồ thông minh siêu thị" + biến thể địa phương ("… TP.HCM/Hà Nội/Đà Nẵng").
- Truy vấn có ý định cụ thể: "smart locker tích hợp GHN/GHTK", "tủ locker mở khóa vân tay", "locker kháng khuẩn bệnh viện".
- Cơ hội snippet/AI Overview: các câu hỏi "là gì/bao nhiêu/khác gì" — đã đặt QuickAnswer + FAQ + HowTo.

### BẮT BUỘC cần off-page mới thắng (đầu phễu, cạnh tranh cao — ngoài phạm vi prompt này)
- Head-term thương mại: "smart locker", "tủ locker thông minh", "tủ locker thông minh giá rẻ", "công ty smart locker uy tín".
→ Cần backlink/PR (xem `OFFPAGE-EXECUTION-PLAYBOOK.md`): danh bạ NAP, guest post, digital PR listicle, brand mention.

## MỞ RỘNG SANG CỤM MÁY BÁN HÀNG TỰ ĐỘNG (2026-06-25)
Áp dụng cùng pattern QuickAnswer + AuthorByline cho toàn cụm vending:
- Pillar `/may-ban-hang-tu-dong` + 5 ngách: tự có sẵn (dùng chung route `[silo]` / `[silo]/[sub]`).
- Standalone đã thêm: `/may-ban-hang-tu-dong/bang-gia`, `/may-ban-hang-tu-dong/thue-may`, `/giai-phap-kinh-doanh`, và route tỉnh-thành vending `[silo]/tinh-thanh/[tinh]`.
→ Toàn bộ cụm vending giờ có đoạn trả lời thẳng (snippet/AI Overview) + byline E-E-A-T. Đã verify live.

## VIỆC NÊN LÀM TIẾP
- ✅ (đã làm) QuickAnswer + byline cho `/cho-thue`.
- ✅ (đã làm) 3 FAQ kỹ thuật (điện/mất điện/bảo trì) thêm vào `smart-locker-la-gi` — đặt 1 chỗ (hub informational) thay vì nhân bản ra 8 ngách để **tránh duplicate content**; tự vào FAQPage schema qua FaqSection.
- ⏳ QuickAnswer cho một số blog trụ (tùy bài).
- ⏳ Khi có địa chỉ HN/ĐN → bật LocalBusiness 3 cơ sở (tăng local + trust).
- ⏳ Khi có video → điền id (hạ tầng VideoObject sẵn) để chiếm video result.
