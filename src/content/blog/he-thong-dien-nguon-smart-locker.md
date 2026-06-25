---
title: "Hệ thống điện & nguồn của smart locker"
description: "Nguyên lý hệ thống điện smart locker: nguồn lưới, bộ nguồn (PSU), phân phối tới bo điều khiển và khóa, pin/UPS dự phòng và an toàn điện — kèm sơ đồ cấp nguồn."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "hệ thống điện smart locker"
  - "nguồn điện tủ locker"
  - "ups dự phòng smart locker"
  - "tủ locker tiêu thụ điện"
faqs:
  - q: "Smart locker dùng nguồn điện gì?"
    a: "Smart locker dùng nguồn điện lưới dân dụng (thường 220V AC ở Việt Nam) qua bộ nguồn (PSU/adapter) hạ xuống điện áp một chiều cấp cho bo điều khiển và khóa (thường 12V hoặc 24V DC). Thông số điện áp/dòng cụ thể tùy dòng máy cần kỹ sư xác nhận."
  - q: "Smart locker tiêu thụ bao nhiêu điện?"
    a: "Rất ít vì phần lớn thời gian ở chế độ chờ — chỉ cấp điện cho bo điều khiển, màn hình và xung mở khóa. Một cụm tủ thường chỉ cần ổ cắm dân dụng 220V tiêu chuẩn, không cần đường điện riêng. Mức tiêu thụ cụ thể cần đo theo cấu hình thực tế."
  - q: "Mất điện smart locker có hoạt động không?"
    a: "Có nếu trang bị pin/UPS dự phòng: hệ thống vẫn xác thực và nhả khóa trong thời gian dự phòng, đồng thời có cơ chế mở cơ khẩn cấp cho quản trị viên. Dữ liệu giao dịch được lưu và đồng bộ khi có điện trở lại."
---

Hệ thống điện smart locker đi từ **nguồn lưới (220V AC)** qua **bộ nguồn (PSU)** hạ xuống điện áp một chiều, rồi **phân phối** tới bo điều khiển, màn hình và các khóa. Một khối **pin/UPS dự phòng** đảm bảo tủ vẫn hoạt động khi mất điện. Tổng mức tiêu thụ thấp vì hệ thống chủ yếu ở chế độ chờ, chỉ tốn điện khi xác thực và nhả khóa.

> *Sơ đồ dưới là **nguyên lý cấp nguồn** (luồng năng lượng giữa các khối), không phải sơ đồ mạch điện chi tiết hay bản vẽ kỹ thuật.*

## Mục lục

- [Sơ đồ nguyên lý cấp nguồn](#so-do-nguon)
- [Từ nguồn lưới tới bộ nguồn](#nguon-luoi)
- [Phân phối điện trong tủ](#phan-phoi)
- [Pin/UPS dự phòng](#ups)
- [An toàn điện](#an-toan)

<h2 id="so-do-nguon">Sơ đồ nguyên lý cấp nguồn smart locker</h2>

<figure role="img" aria-label="Sơ đồ nguyên lý cấp nguồn smart locker từ nguồn lưới qua bộ nguồn, pin UPS dự phòng, phân phối tới bo điều khiển và các khóa">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Sơ đồ nguyên lý cấp nguồn smart locker</title>
  <rect x="0" y="0" width="820" height="320" fill="#f8fafc" rx="12"/>
  <!-- AC -->
  <rect x="30" y="120" width="120" height="70" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
  <text x="90" y="150" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Nguồn lưới</text>
  <text x="90" y="170" text-anchor="middle" fill="#475569" font-size="12">220V AC</text>
  <!-- PSU -->
  <rect x="210" y="120" width="130" height="70" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="275" y="150" text-anchor="middle" fill="#1e3a8a" font-size="13" font-weight="700">Bộ nguồn (PSU)</text>
  <text x="275" y="170" text-anchor="middle" fill="#475569" font-size="12">AC → DC 12/24V</text>
  <line x1="150" y1="155" x2="210" y2="155" stroke="#1e293b" stroke-width="2" marker-end="url(#a)"/>
  <!-- Distribution node -->
  <rect x="400" y="120" width="130" height="70" rx="8" fill="#1d4ed8"/>
  <text x="465" y="150" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">Phân phối</text>
  <text x="465" y="170" text-anchor="middle" fill="#dbeafe" font-size="12">điện DC</text>
  <line x1="340" y1="155" x2="400" y2="155" stroke="#1e293b" stroke-width="2" marker-end="url(#a)"/>
  <!-- UPS below PSU/dist -->
  <rect x="335" y="240" width="130" height="60" rx="8" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
  <text x="400" y="266" text-anchor="middle" fill="#9a3412" font-size="13" font-weight="700">Pin / UPS</text>
  <text x="400" y="284" text-anchor="middle" fill="#9a3412" font-size="12">dự phòng</text>
  <line x1="400" y1="240" x2="430" y2="190" stroke="#f97316" stroke-width="2"/>
  <!-- Loads -->
  <rect x="600" y="40" width="180" height="56" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="690" y="73" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Bo điều khiển + màn hình</text>
  <rect x="600" y="130" width="180" height="50" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="690" y="160" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Các khóa điện tử</text>
  <rect x="600" y="214" width="180" height="50" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="690" y="244" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Cảm biến &amp; module mạng</text>
  <line x1="530" y1="150" x2="600" y2="68" stroke="#94a3b8" stroke-width="2" marker-end="url(#a)"/>
  <line x1="530" y1="155" x2="600" y2="155" stroke="#94a3b8" stroke-width="2" marker-end="url(#a)"/>
  <line x1="530" y1="160" x2="600" y2="239" stroke="#94a3b8" stroke-width="2" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#475569"/></marker></defs>
</svg>
<figcaption>Nguyên lý cấp nguồn: nguồn lưới → bộ nguồn (AC→DC) → phân phối tới bo điều khiển, khóa, cảm biến; pin/UPS dự phòng duy trì khi mất điện. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="nguon-luoi">Từ nguồn lưới tới bộ nguồn</h2>

Smart locker lấy điện từ **ổ cắm dân dụng 220V AC** thông thường, không cần đường điện riêng cho hầu hết cấu hình. **Bộ nguồn (PSU/adapter)** chuyển AC thành điện một chiều (DC) ở mức điện áp mà bo điều khiển và khóa sử dụng — thường là 12V hoặc 24V DC. Bộ nguồn cũng đóng vai trò ổn áp, bảo vệ thiết bị khỏi dao động điện.

<h2 id="phan-phoi">Phân phối điện trong tủ</h2>

Từ bộ nguồn, điện DC được **phân phối** tới ba nhóm tải chính:

1. **Bo điều khiển + màn hình** — hoạt động liên tục nhưng công suất nhỏ.
2. **Các khóa điện tử** — chỉ tiêu thụ trong khoảnh khắc nhả khóa (xung).
3. **Cảm biến & module mạng** — công suất rất nhỏ, gần như không đáng kể.

Vì phần lớn thời gian hệ thống ở chế độ chờ, **tổng mức tiêu thụ điện thấp** — tương đương vài thiết bị điện tử nhỏ trong nhà.

<h2 id="ups">Pin/UPS dự phòng</h2>

Khối **pin hoặc UPS dự phòng** giúp tủ tiếp tục xác thực và nhả khóa khi mất điện lưới, tránh tình huống người dùng không lấy được đồ. Khi có điện trở lại, hệ thống tự sạc và đồng bộ log giao dịch đã lưu. Kết hợp với **cơ chế mở cơ khẩn cấp** cho quản trị viên, đây là lớp an toàn kép. Quan hệ giữa nguồn dự phòng và hành vi khóa (fail-safe/fail-secure) được phân tích ở bài [cơ cấu khóa điện tử](/tin-tuc/co-cau-khoa-dien-tu-smart-locker).

<h2 id="an-toan">An toàn điện</h2>

Hệ thống điện smart locker cần đảm bảo: nối đất an toàn, bảo vệ quá dòng/ngắn mạch, cách điện đúng chuẩn và chống giật cho người dùng. Với tủ ngoài trời, yêu cầu kín nước cho khu vực điện càng quan trọng (xem thêm về [chuẩn IP cho locker ngoài trời] — bài thuộc cụm phân loại, đang cập nhật).

> **[CẦN KỸ SƯ TSE XÁC NHẬN]** Điện áp/dòng DC làm việc, công suất bộ nguồn, dung lượng & thời gian dự phòng của pin/UPS, mức tiêu thụ điện đo thực tế, và các tiêu chuẩn an toàn điện áp dụng (vd TCVN/IEC liên quan) — điền số liệu chính xác trước khi xuất bản.

## Tìm hiểu thêm

- [Cấu tạo smart locker: giải phẫu một tủ locker thông minh](/tin-tuc/cau-tao-smart-locker-giai-phau-tu-locker-thong-minh)
- [Cơ cấu khóa điện tử trong smart locker](/tin-tuc/co-cau-khoa-dien-tu-smart-locker)
- Tổng quan: [tủ locker thông minh](/tu-locker-thong-minh) · [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
