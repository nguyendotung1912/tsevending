---
title: "Cấu tạo smart locker: giải phẫu một tủ locker thông minh"
description: "Giải phẫu cấu tạo smart locker: thân tủ, các ô, cụm khóa điện tử, bo điều khiển, màn hình, nguồn điện, module kết nối và cảm biến — kèm sơ đồ khối nguyên lý."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "cấu tạo smart locker"
  - "cấu tạo tủ locker thông minh"
  - "thành phần smart locker"
  - "bo điều khiển smart locker"
faqs:
  - q: "Smart locker gồm những bộ phận chính nào?"
    a: "Một smart locker gồm: thân tủ/khung, các ô chứa (compartment), cụm khóa điện tử ở mỗi ô, bo điều khiển trung tâm, màn hình/bàn phím tương tác, bộ nguồn (kèm pin/UPS dự phòng), module kết nối mạng và các cảm biến (cửa, hàng). Bo điều khiển là 'bộ não' liên kết toàn bộ."
  - q: "Bo điều khiển trung tâm trong smart locker làm gì?"
    a: "Bo điều khiển trung tâm xử lý xác thực người dùng (QR/PIN/RFID/vân tay), ra lệnh nhả khóa đúng ô, đọc trạng thái cảm biến, ghi log giao dịch và đồng bộ dữ liệu lên hệ thống quản lý qua module kết nối."
  - q: "Thân tủ smart locker làm bằng vật liệu gì?"
    a: "Phổ biến là thép tấm sơn tĩnh điện cho độ bền và chống gỉ; môi trường y tế dùng thêm lớp/vật liệu kháng khuẩn; bản ngoài trời cần vật liệu và lớp phủ chịu thời tiết. Thông số vật liệu cụ thể theo từng dòng máy cần kỹ sư TSE xác nhận."
---

Smart locker là hệ thống gồm bảy khối chính: **thân tủ & các ô chứa, cụm khóa điện tử, bo điều khiển trung tâm, màn hình/bàn phím, bộ nguồn (kèm pin dự phòng), module kết nối và cảm biến**. Bo điều khiển đóng vai trò "bộ não", liên kết và điều phối tất cả các khối còn lại để gửi — xác thực — nhả khóa — ghi log.

> *Lưu ý: Sơ đồ trong bài là **sơ đồ nguyên lý/khối** mô tả đúng logic hoạt động và quan hệ giữa các thành phần, không phải bản vẽ kỹ thuật cơ khí (không thể hiện kích thước, dung sai hay thông số sản xuất).*

## Mục lục

- [Sơ đồ khối cấu tạo smart locker](#so-do-khoi)
- [Thân tủ và các ô chứa](#than-tu)
- [Cụm khóa điện tử](#cum-khoa)
- [Bo điều khiển trung tâm](#bo-dieu-khien)
- [Màn hình, nguồn, kết nối và cảm biến](#ngoai-vi)
- [Bảng vật liệu thân tủ](#vat-lieu)

<h2 id="so-do-khoi">Sơ đồ khối cấu tạo smart locker</h2>

<figure role="img" aria-label="Sơ đồ khối cấu tạo smart locker thể hiện quan hệ giữa thân tủ, cụm khóa điện tử, bo điều khiển trung tâm, màn hình, nguồn điện, module kết nối và cảm biến">
<svg viewBox="0 0 820 470" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Sơ đồ khối cấu tạo smart locker</title>
  <rect x="0" y="0" width="820" height="470" fill="#f8fafc" rx="12"/>
  <!-- Cabinet -->
  <rect x="30" y="60" width="210" height="380" rx="10" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
  <text x="135" y="48" text-anchor="middle" fill="#1e293b" font-size="15" font-weight="700">Thân tủ &amp; các ô (compartment)</text>
  <!-- compartments 2x4 -->
  <g fill="#eef2ff" stroke="#94a3b8" stroke-width="1.5">
    <rect x="48" y="78" width="86" height="82" rx="4"/><rect x="142" y="78" width="86" height="82" rx="4"/>
    <rect x="48" y="170" width="86" height="82" rx="4"/><rect x="142" y="170" width="86" height="82" rx="4"/>
    <rect x="48" y="262" width="86" height="82" rx="4"/><rect x="142" y="262" width="86" height="82" rx="4"/>
    <rect x="48" y="354" width="86" height="78" rx="4"/><rect x="142" y="354" width="86" height="78" rx="4"/>
  </g>
  <!-- lock dots on each compartment -->
  <g fill="#f97316"><circle cx="126" cy="119" r="5"/><circle cx="220" cy="119" r="5"/><circle cx="126" cy="211" r="5"/><circle cx="220" cy="211" r="5"/><circle cx="126" cy="303" r="5"/><circle cx="220" cy="303" r="5"/><circle cx="126" cy="393" r="5"/><circle cx="220" cy="393" r="5"/></g>
  <text x="135" y="250" text-anchor="middle" fill="#64748b" font-size="12">● = cụm khóa điện tử / ô</text>
  <!-- Controller -->
  <rect x="470" y="208" width="180" height="74" rx="10" fill="#1d4ed8"/>
  <text x="560" y="240" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">Bo điều khiển</text>
  <text x="560" y="260" text-anchor="middle" fill="#dbeafe" font-size="13">trung tâm (MCU)</text>
  <!-- Bus from cabinet to controller -->
  <line x1="240" y1="245" x2="470" y2="245" stroke="#1e3a8a" stroke-width="2"/>
  <text x="355" y="236" text-anchor="middle" fill="#475569" font-size="12">bus điều khiển khóa</text>
  <!-- Screen top -->
  <rect x="470" y="70" width="180" height="56" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="560" y="103" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Màn hình &amp; bàn phím</text>
  <line x1="560" y1="126" x2="560" y2="208" stroke="#94a3b8" stroke-width="2"/>
  <!-- Connectivity right-top -->
  <rect x="680" y="120" width="120" height="70" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="740" y="150" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Module</text>
  <text x="740" y="168" text-anchor="middle" fill="#475569" font-size="12">WiFi/4G/LAN</text>
  <line x1="650" y1="230" x2="680" y2="160" stroke="#94a3b8" stroke-width="2"/>
  <!-- Sensors right-bottom -->
  <rect x="680" y="300" width="120" height="70" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="740" y="330" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Cảm biến</text>
  <text x="740" y="348" text-anchor="middle" fill="#475569" font-size="12">cửa &amp; hàng</text>
  <line x1="650" y1="262" x2="680" y2="332" stroke="#94a3b8" stroke-width="2"/>
  <!-- Power bottom -->
  <rect x="470" y="360" width="180" height="64" rx="8" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
  <text x="560" y="388" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">Nguồn điện</text>
  <text x="560" y="406" text-anchor="middle" fill="#475569" font-size="12">+ pin/UPS dự phòng</text>
  <line x1="560" y1="282" x2="560" y2="360" stroke="#f97316" stroke-width="2"/>
</svg>
<figcaption>Sơ đồ khối nguyên lý cấu tạo smart locker — bo điều khiển trung tâm liên kết các ô khóa, màn hình, nguồn, module kết nối và cảm biến. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="than-tu">Thân tủ và các ô chứa</h2>

Thân tủ là khung cơ khí chịu lực, chia thành nhiều **ô chứa (compartment)** với kích thước khác nhau (thường ký hiệu S/M/L/XL) để phù hợp nhiều loại đồ vật và bưu phẩm. Số ô và tỷ lệ kích thước được cấu hình theo nhu cầu thực tế của từng vị trí lắp đặt.

Mỗi ô là một không gian độc lập, có cửa riêng và một cụm khóa riêng — cho phép nhiều người dùng gửi/nhận song song mà không ảnh hưởng lẫn nhau. Thiết kế dạng **module** cho phép ghép thêm tủ phụ để mở rộng số ô khi nhu cầu tăng.

<h2 id="cum-khoa">Cụm khóa điện tử</h2>

Mỗi ô được trang bị một **khóa điện tử** điều khiển bằng tín hiệu điện thay cho chìa cơ. Khi người dùng xác thực thành công, bo điều khiển gửi xung điện mở đúng ô tương ứng. Chi tiết hai loại khóa phổ biến (solenoid và motor) cùng cơ chế an toàn khi mất điện được phân tích trong bài [Cơ cấu khóa điện tử trong smart locker](/tin-tuc/co-cau-khoa-dien-tu-smart-locker).

<h2 id="bo-dieu-khien">Bo điều khiển trung tâm</h2>

Bo điều khiển (MCU board) là "bộ não" của hệ thống. Nhiệm vụ chính:

- Nhận và xử lý thông tin xác thực từ màn hình, đầu đọc thẻ, cảm biến vân tay/khuôn mặt.
- Ra lệnh nhả khóa **đúng ô** qua bus điều khiển.
- Đọc trạng thái cảm biến (cửa đóng/mở, có hàng/không) để xác nhận thao tác.
- Ghi log mọi giao dịch kèm thời gian và đồng bộ lên hệ thống quản lý qua module kết nối.

<h2 id="ngoai-vi">Màn hình, nguồn, kết nối và cảm biến</h2>

- **Màn hình & bàn phím:** giao diện người dùng để chọn ô, nhập mã, hiển thị hướng dẫn.
- **Bộ nguồn:** chuyển nguồn điện lưới thành điện áp cấp cho bo điều khiển và khóa; **pin/UPS dự phòng** giúp hệ thống vẫn hoạt động khi mất điện. Xem chi tiết ở bài [Hệ thống điện & nguồn của smart locker](/tin-tuc/he-thong-dien-nguon-smart-locker).
- **Module kết nối:** WiFi, LAN hoặc 4G/5G để đồng bộ dữ liệu và quản lý từ xa.
- **Cảm biến:** cảm biến cửa và cảm biến hàng xác nhận trạng thái thực tế của ô, tăng độ tin cậy cho mỗi giao dịch.

<h2 id="vat-lieu">Bảng vật liệu thân tủ (tham khảo)</h2>

| Bộ phận | Vật liệu phổ biến | Mục đích |
|---|---|---|
| Khung & vỏ tủ | Thép tấm sơn tĩnh điện | Độ bền, chống gỉ, chi phí hợp lý |
| Tủ môi trường y tế | Bề mặt/lớp phủ kháng khuẩn | Chịu vệ sinh khử khuẩn, giảm vi khuẩn |
| Tủ ngoài trời | Vật liệu + lớp phủ chịu thời tiết | Chống nước, chống tia UV |
| Khóa, bản lề | Hợp kim/inox | Chịu lực, chống ăn mòn |

> **[CẦN KỸ SƯ TSE XÁC NHẬN]** Độ dày tôn, mã thép/inox cụ thể, loại sơn tĩnh điện, chuẩn kháng khuẩn và lớp phủ chịu thời tiết theo từng dòng máy TSE — điền số liệu chính xác trước khi xuất bản.

## Tìm hiểu thêm

- Tổng quan: [tủ locker thông minh](/tu-locker-thong-minh) · [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
- Cùng cụm kỹ thuật: [cơ cấu khóa điện tử](/tin-tuc/co-cau-khoa-dien-tu-smart-locker) · [hệ thống điện & nguồn](/tin-tuc/he-thong-dien-nguon-smart-locker)
- Số liệu thị trường: [Báo cáo thị trường smart locker Việt Nam 2026](/bao-cao-thi-truong-smart-locker-viet-nam)
