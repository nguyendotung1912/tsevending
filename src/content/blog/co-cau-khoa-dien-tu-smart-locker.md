---
title: "Cơ cấu khóa điện tử trong smart locker hoạt động thế nào?"
description: "Nguyên lý khóa điện tử smart locker: khóa solenoid và khóa motor, trạng thái thường đóng/thường mở, cơ chế nhả khẩn cấp và an toàn khi mất điện (fail-safe vs fail-secure)."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "khóa điện tử smart locker"
  - "khóa solenoid"
  - "fail-safe fail-secure"
  - "cơ cấu khóa tủ locker"
faqs:
  - q: "Khóa solenoid và khóa motor khác nhau thế nào?"
    a: "Khóa solenoid dùng cuộn từ đẩy/rút chốt khi cấp điện — đóng/mở nhanh, cấu tạo đơn giản. Khóa motor (motorized/EM) dùng động cơ xoay chốt — lực giữ lớn hơn, phù hợp ô lớn hoặc môi trường cần độ bền cao. Lựa chọn tùy kích thước ô, tần suất dùng và yêu cầu lực giữ."
  - q: "Mất điện thì khóa smart locker mở hay đóng?"
    a: "Tùy thiết kế. Khóa fail-safe sẽ mở khi mất điện (ưu tiên thoát/lấy đồ), khóa fail-secure vẫn đóng khi mất điện (ưu tiên bảo mật). Nhiều smart locker dùng fail-secure kèm pin dự phòng và cơ chế mở cơ khẩn cấp cho quản trị viên."
  - q: "Smart locker có mở được khi cúp điện không?"
    a: "Có. Hệ thống thường có pin/UPS dự phòng để vẫn xác thực và nhả khóa; đồng thời trang bị cơ chế mở cơ khẩn cấp (khóa master cơ) cho quản trị viên trong tình huống đặc biệt."
---

Khóa điện tử là bộ phận quyết định smart locker mở/đóng ra sao. Có hai loại phổ biến: **khóa solenoid** (cuộn từ đẩy chốt) và **khóa motor** (động cơ xoay chốt). Khi người dùng xác thực thành công, bo điều khiển cấp xung điện để nhả đúng ô. Yếu tố an toàn quan trọng nhất là hành vi khi **mất điện**: fail-safe (mở) hay fail-secure (đóng).

> *Sơ đồ dưới là **nguyên lý hoạt động** (trạng thái logic của chốt khóa), không phải bản vẽ cơ khí chính xác.*

## Mục lục

- [Sơ đồ nguyên lý: solenoid vs motor](#so-do-khoa)
- [Khóa solenoid](#solenoid)
- [Khóa motor](#motor)
- [Fail-safe vs fail-secure](#fail)
- [Bảng so sánh các loại khóa](#so-sanh)

<h2 id="so-do-khoa">Sơ đồ nguyên lý: khóa solenoid vs khóa motor</h2>

<figure role="img" aria-label="Sơ đồ nguyên lý khóa điện tử smart locker so sánh khóa solenoid và khóa motor ở trạng thái khóa và mở">
<svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Nguyên lý khóa solenoid và khóa motor</title>
  <rect x="0" y="0" width="820" height="380" fill="#f8fafc" rx="12"/>
  <!-- Solenoid panel -->
  <rect x="30" y="50" width="360" height="300" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#1e3a8a" font-size="16" font-weight="700">Khóa solenoid</text>
  <!-- coil -->
  <rect x="70" y="150" width="90" height="60" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="115" y="135" text-anchor="middle" fill="#475569" font-size="12">cuộn từ</text>
  <!-- bolt locked -->
  <rect x="160" y="170" width="120" height="20" fill="#1d4ed8"/>
  <rect x="280" y="160" width="20" height="40" fill="#94a3b8"/>
  <text x="115" y="245" text-anchor="middle" fill="#1e293b" font-size="12" font-weight="600">Cấp điện →</text>
  <text x="210" y="245" text-anchor="middle" fill="#1e293b" font-size="12">cuộn từ rút chốt → MỞ</text>
  <text x="210" y="270" text-anchor="middle" fill="#64748b" font-size="12">Nhanh · cấu tạo đơn giản</text>
  <text x="210" y="292" text-anchor="middle" fill="#64748b" font-size="12">Phù hợp ô vừa &amp; nhỏ</text>
  <!-- Motor panel -->
  <rect x="430" y="50" width="360" height="300" rx="10" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
  <text x="610" y="80" text-anchor="middle" fill="#9a3412" font-size="16" font-weight="700">Khóa motor</text>
  <circle cx="510" cy="180" r="34" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
  <text x="510" y="185" text-anchor="middle" fill="#9a3412" font-size="12">motor</text>
  <rect x="544" y="170" width="120" height="20" fill="#f97316"/>
  <rect x="664" y="160" width="20" height="40" fill="#94a3b8"/>
  <text x="610" y="245" text-anchor="middle" fill="#1e293b" font-size="12" font-weight="600">Cấp điện →</text>
  <text x="610" y="245" text-anchor="middle" fill="#1e293b" font-size="12" dy="0"></text>
  <text x="610" y="268" text-anchor="middle" fill="#1e293b" font-size="12">động cơ xoay chốt → MỞ</text>
  <text x="610" y="292" text-anchor="middle" fill="#64748b" font-size="12">Lực giữ lớn · bền · ô lớn</text>
</svg>
<figcaption>Nguyên lý hai loại khóa điện tử: solenoid (cuộn từ rút chốt) và motor (động cơ xoay chốt). Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="solenoid">Khóa solenoid</h2>

Khóa solenoid dùng một **cuộn từ (solenoid)**: khi có dòng điện, từ trường sinh ra đẩy hoặc rút chốt khóa. Ưu điểm là **đóng/mở nhanh, cấu tạo đơn giản, chi phí hợp lý**, phù hợp các ô kích thước vừa và nhỏ với tần suất sử dụng cao. Hầu hết solenoid chỉ cần cấp điện trong khoảnh khắc nhả khóa (xung), sau đó chốt trở về trạng thái ban đầu.

<h2 id="motor">Khóa motor</h2>

Khóa motor (motorized lock) dùng **động cơ điện xoay chốt** để khóa/mở. Ưu điểm là **lực giữ lớn hơn**, phù hợp ô lớn, tủ ngoài trời hoặc nơi cần độ bền và chống cạy cao. Cơ cấu cơ khí xoay thường cho cảm giác chắc chắn và có thể tích hợp phản hồi trạng thái chốt.

<h2 id="fail">Cơ chế an toàn khi mất điện: fail-safe vs fail-secure</h2>

Đây là đặc tính an toàn quan trọng nhất:

- **Fail-safe (an toàn khi sự cố):** mất điện → khóa **mở**. Ưu tiên cho lối thoát hiểm hoặc khi cần lấy đồ ngay.
- **Fail-secure (bảo mật khi sự cố):** mất điện → khóa **vẫn đóng**. Ưu tiên bảo vệ tài sản bên trong.

Nhiều smart locker chọn **fail-secure** (giữ an toàn tài sản) kết hợp **pin/UPS dự phòng** để vẫn vận hành khi mất điện, cùng **cơ chế mở cơ khẩn cấp** (khóa master cơ) dành cho quản trị viên. Chi tiết nguồn điện dự phòng xem bài [Hệ thống điện & nguồn của smart locker](/tin-tuc/he-thong-dien-nguon-smart-locker).

<h2 id="so-sanh">Bảng so sánh các loại khóa</h2>

| Tiêu chí | Khóa solenoid | Khóa motor |
|---|---|---|
| Cơ chế | Cuộn từ đẩy/rút chốt | Động cơ xoay chốt |
| Tốc độ mở | Rất nhanh | Nhanh |
| Lực giữ | Trung bình | Lớn |
| Độ bền cơ khí | Tốt | Rất tốt |
| Tiêu thụ điện | Xung ngắn khi nhả | Khi động cơ chạy |
| Phù hợp | Ô vừa &amp; nhỏ, tần suất cao | Ô lớn, ngoài trời, chống cạy |

> **[CẦN KỸ SƯ TSE XÁC NHẬN]** Lực giữ (N/kgf), điện áp/dòng làm việc, tuổi thọ chu kỳ đóng-mở, loại khóa TSE dùng cho từng dòng tủ, và cấu hình fail-safe/fail-secure mặc định — điền số liệu chính xác trước khi xuất bản.

## Tìm hiểu thêm

- [Cấu tạo smart locker: giải phẫu một tủ locker thông minh](/tin-tuc/cau-tao-smart-locker-giai-phau-tu-locker-thong-minh)
- [Hệ thống điện & nguồn của smart locker](/tin-tuc/he-thong-dien-nguon-smart-locker)
- Tổng quan: [tủ locker thông minh](/tu-locker-thong-minh) · [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
