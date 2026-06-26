# BÁO CÁO AUDIT KHẢ NĂNG INDEX — tsevending.com

Ngày: 2026-06-26 · Phạm vi: toàn site · Trạng thái: **✅ ĐÃ SỬA TOÀN BỘ (2026-06-26)**

## ✅ ĐÃ SỬA (đã deploy + verify live)
| # | Vấn đề | Cách sửa | Kết quả verify |
|---|---|---|---|
| 1 | `/chinh-sach-bao-mat` bị legacy redirect che | Gỡ entry `/chinh-sach-bao-mat` khỏi `legacy-redirects.json` | `200`, 0 hop (hết redirect) ✅ |
| 2 | `/video`, `/bao-chi` mồ côi | Thêm link footer (sitewide) | Footer trỏ tới cả 2 → hết mồ côi ✅ |
| 3 | 10 trang thiếu sitemap | Thêm 4 policy + `/tin-tuc/the-gioi` + 5 category (tự sinh từ `CATEGORY_META`, loại "tin-tuc") vào `sitemap.ts` | 10/10 URL có trong sitemap.xml ✅ |
| 4 | `/kien-thuc-ky-thuat` link mỏng | Thêm link footer | Có trong footer sitewide ✅ |
| 5 | (tùy chọn) phủ link `/khach-hang`, `/bao-cao` | Thêm link footer | Đã thêm ✅ |

> Phần dưới là báo cáo audit gốc (giữ để tham chiếu).

---


## Nền tảng (đã kiểm chứng)
- **Next.js 16.2.9** (App Router) + React 19.2.4, deploy **Cloudflare Workers** qua `@opennextjs/cloudflare`.
- **100% React Server Components** (0 file `"use client"` trong `src/app/`) → render phía server.
- **SSG** (route động đều có `generateStaticParams`; không `dynamic`/`revalidate` trừ `feed.xml`).
- Nội dung chính nằm sẵn trong HTML (không cần JS client). FAQ dùng `<details>` HTML → nội dung trong DOM.
- → Rendering KHÔNG phải nguồn rủi ro index. Vấn đề nằm ở logic redirect/sitemap/internal-link.

---

## TÓM TẮT MỨC ĐỘ
| # | Vấn đề | Mức độ |
|---|---|---|
| 1 | `/chinh-sach-bao-mat` bị legacy redirect che → không index được | 🔴 CAO |
| 2 | 2 trang mồ côi: `/video`, `/bao-chi` (0 link nội bộ trỏ vào) | 🟠 TRUNG-CAO |
| 3 | 10 trang indexable thiếu trong sitemap (4 chính sách + 5 category + the-gioi) | 🟠 TRUNG |
| 4 | `/kien-thuc-ky-thuat` chỉ 1 inbound link (link mỏng) | 🟡 THẤP |
| — | Rendering, canonical, robots, redirect chain, trailing slash, www | ✅ ĐẠT |

---

## 1. SITEMAP
**Cơ chế:** `src/app/sitemap.ts` (động). Tự sinh cho: blog posts (lọc `indexable`), case studies, locker areas, silos + subcategories, province routes, + danh sách trang tĩnh khai báo tay.
- ✅ Khai báo trong `robots.txt`: có (`sitemap: https://tsevending.com/sitemap.xml`).
- ✅ Tự cập nhật: blog/case-study/locker-area/silo tự thêm khi có dữ liệu mới. **Trang tĩnh mới phải thêm tay** vào mảng `staticRoutes`.
- ✅ `lastmod`: phần lớn dùng ngày cố định hợp lý; `/tin-tuc` dùng `new Date()` (đổi mỗi build — chấp nhận được vì changeFrequency daily).
- ❌ **THIẾU trong sitemap** (trang 200, indexable, KHÔNG noindex, nhưng không được liệt kê):
  - **Chính sách/điều khoản (4):** `/chinh-sach-bao-mat`*, `/chinh-sach-thanh-toan`, `/chinh-sach-van-chuyen`, `/dieu-khoan-su-dung` (*riêng bao-mat còn dính bug mục 6).
  - **Category blog (5):** `/tin-tuc/du-an`, `/tin-tuc/huong-dan`, `/tin-tuc/kien-thuc`, `/tin-tuc/so-sanh`, `/tin-tuc/xu-huong`.
  - **Index tin thế giới (1):** `/tin-tuc/the-gioi`.
  > Hệ quả: Google vẫn có thể tìm qua internal link, nhưng thiếu sitemap làm chậm phát hiện & yếu tín hiệu ưu tiên. Nên bổ sung.

---

## 2. ROBOTS & NOINDEX
- ✅ `src/app/robots.ts`: `allow: "/"` — **không chặn nhầm** trang nào.
- ✅ Các trang `noindex` đều **cố ý & hợp lý**:
  | Trang | Lý do |
  |---|---|
  | `/cong-cu/tim-anh` | Công cụ nội bộ |
  | `/tin-tuc/the-gioi/[slug]` | Tin tổng hợp nguồn ngoài (tránh thin/duplicate) |
  | `/tin-tuc/[slug]` khi < 600 từ | Chống thin content (Scaled Content Abuse) |
  | `/[silo]/tinh-thanh/[tinh]` tỉnh ngoài 4 ưu tiên | Tránh trang địa phương mỏng |
- ✅ **Không phát hiện noindex nhầm** trên trang cần index.

---

## 3. INTERNAL LINK & TRANG MỒ CÔI
- ❌ **Trang mồ côi (0 link nội bộ trỏ vào)** — dù indexable & có trong sitemap:
  - **`/video`** — không có link từ header/footer/trang nào (chỉ link ra). 
  - **`/bao-chi`** — tương tự, không có inbound link.
  > Orphan = Google khó phát hiện qua crawl + không nhận link equity nội bộ → khả năng index/xếp hạng yếu.
- 🟡 **Link mỏng:** `/kien-thuc-ky-thuat` chỉ 1 inbound (từ pillar locker). Nên thêm link (footer/tin-tuc).
- ℹ️ `/cong-cu/tim-anh` cũng 0 inbound nhưng **noindex** → không tính là vấn đề.
- **Độ sâu click từ trang chủ:**
  - Header nav (NAV_LINKS): `/may-ban-hang-tu-dong`, `/tu-locker-thong-minh`, `/giai-phap-kinh-doanh`, `/tin-tuc`, `/gioi-thieu`, `/lien-he` → **1 click**.
  - Trang con sản phẩm/ngách, bài viết → **2 click**. Bài kỹ thuật qua hub/category → **3 click**. (≤3, đạt.)
  - Footer phủ thêm: silo links, bảng giá, cho thuê, du-an, 4 policy. **Không phủ** `/video`, `/bao-chi`, `/khach-hang`, `/bao-cao-thi-truong...`, `/kien-thuc-ky-thuat` ở nav chính (một số có link theo ngữ cảnh, riêng video & bao-chi = mồ côi).

---

## 4. CANONICAL & TRÙNG LẶP
- ✅ **Canonical:** mọi trang qua `buildMetadata` → `alternates.canonical = absoluteUrl(path)`. Đã xác nhận cả category & policy pages có canonical (buildMetadata:2).
- ✅ **www → apex:** redirect 308 (`next.config.ts`, rule `host = www.tsevending.com`).
- ✅ **Trailing slash:** `/video/` → `/video` (308, 1 hop). Không tạo URL trùng.
- ✅ **Tham số (param):** canonical luôn trỏ path sạch → biến thể `?q=`, `?z=` không gây trùng index.
- ✅ **Không phát hiện nội dung trùng** ở cấp URL.

---

## 5. RENDERING (theo nền tảng Next.js SSG đã nhận diện)
- ✅ Nội dung chính hiển thị **KHÔNG cần JS client** (server components + SSG; đã verify nhiều lần bằng curl: HTML chứa đủ nội dung + JSON-LD).
- ✅ Blog: markdown → HTML lúc build (remark), nhúng sẵn vào HTML.
- ✅ FAQ/accordion: dùng `<details>` HTML thuần → nội dung **nằm trong DOM**, chỉ thu gọn bằng CSS, **không** bị giấu sau sự kiện click JS → crawlable.
- ✅ **Không** có nội dung quan trọng nào chỉ render khi tương tác client.

---

## 6. STATUS CODE & REDIRECT
- ✅ Phần lớn trang trả **200**.
- 🔴 **BUG nghiêm trọng — collision page vs legacy redirect:**
  - **`/chinh-sach-bao-mat` → 308 → `/gioi-thieu`** (1 hop).
  - Nguyên nhân: `src/data/legacy-redirects.json` có `"source": "/chinh-sach-bao-mat"` (URL site cũ) **trùng với route trang chính sách bảo mật hiện tại** (`src/app/chinh-sach-bao-mat/page.tsx`). Redirect chạy trước → trang thật **không bao giờ được phục vụ/index**, và **link footer trỏ tới /chinh-sach-bao-mat bị đẩy sang /gioi-thieu** (sai đích).
  - Đã **đối chiếu toàn bộ route hiện tại với 637 legacy redirects** → **chỉ duy nhất** collision này. Các route khác không bị che.
- ✅ **Redirect chain:** không có vòng lặp. `/bao-cao` → `/bao-cao-thi-truong-smart-locker-viet-nam` (1 hop, sạch); `/video/` → `/video` (1 hop); www→apex (1 hop).
- ✅ **404:** xử lý bằng `notFound()` ở route động khi slug không tồn tại (đúng chuẩn).

---

## ĐỀ XUẤT SỬA (chờ duyệt — chưa thực hiện)
1. 🔴 **Gỡ `/chinh-sach-bao-mat` khỏi `legacy-redirects.json`** (hoặc loại trừ collision) → trả lại 200 cho trang chính sách bảo mật. *(Ưu tiên 1)*
2. 🟠 **Thêm link nội bộ cho `/video` và `/bao-chi`** (vd: footer mục "Trang", hoặc trong /tin-tuc, /khach-hang) → gỡ mồ côi.
3. 🟠 **Bổ sung 10 URL vào `sitemap.ts`:** 4 trang chính sách + 5 category blog + `/tin-tuc/the-gioi`. (Cân nhắc tự sinh category từ `CATEGORIES` để khỏi sót về sau.)
4. 🟡 **Thêm inbound link cho `/kien-thuc-ky-thuat`** (footer hoặc khối trong /tin-tuc).
5. 💡 (Tùy chọn) Thêm `/khach-hang`, `/bao-cao-thi-truong...` vào footer để tăng độ phủ link nội bộ.

> Nói "sửa" + chọn mục là tôi thực hiện. Khuyến nghị làm mục 1 trước (ảnh hưởng index trực tiếp).
