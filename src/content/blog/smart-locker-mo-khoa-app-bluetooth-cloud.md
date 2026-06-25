---
title: "Mở khóa smart locker qua App, Bluetooth & đám mây"
description: "Nguyên lý mở khóa smart locker qua ứng dụng di động, Bluetooth và đám mây: kiến trúc app ↔ cloud ↔ tủ, luồng cấp quyền từ xa, bảo mật truyền tin và ứng dụng."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "mở khóa smart locker bằng app"
  - "smart locker bluetooth"
  - "smart locker cloud"
  - "cấp quyền từ xa locker"
faqs:
  - q: "Mở khóa smart locker bằng app hoạt động thế nào?"
    a: "Người dùng đăng nhập app, app xác thực với cloud; cloud kiểm tra quyền và gửi lệnh mở tới tủ qua internet (hoặc app gửi trực tiếp tới tủ qua Bluetooth khi ở gần). Bo điều khiển trong tủ nhận lệnh hợp lệ và nhả đúng ô."
  - q: "Bluetooth và mở qua đám mây khác nhau thế nào?"
    a: "Bluetooth mở trực tiếp khi điện thoại ở gần tủ (hoạt động cả khi tủ không có internet ổn định). Mở qua đám mây cho phép cấp quyền và mở từ xa qua internet, phù hợp quản lý nhiều điểm. Nhiều hệ thống hỗ trợ cả hai."
  - q: "Mở khóa qua app có an toàn không?"
    a: "An toàn nếu dùng kênh mã hóa (HTTPS/TLS), xác thực người dùng, lệnh mở có chữ ký/thời hạn và ghi log đầy đủ. Cần cập nhật bảo mật firmware và app thường xuyên. Bảo mật truyền tin là yếu tố then chốt."
---

Mở khóa qua **App, Bluetooth và đám mây** đưa smart locker vào hệ sinh thái số: người dùng thao tác trên điện thoại, quản trị viên cấp quyền và giám sát từ xa. Kiến trúc gồm ba lớp: **App người dùng ↔ Cloud/Server ↔ Tủ (edge)**. Lệnh mở có thể đi qua internet (đám mây) hoặc trực tiếp qua **Bluetooth** khi điện thoại ở gần tủ.

> *Sơ đồ dưới là **kiến trúc nguyên lý** mô tả luồng dữ liệu/lệnh, không phải sơ đồ kỹ thuật chi tiết.*

## Mục lục

- [Sơ đồ kiến trúc app ↔ cloud ↔ tủ](#so-do-kien-truc)
- [Mở qua đám mây (từ xa)](#cloud)
- [Mở qua Bluetooth (tại chỗ)](#bluetooth)
- [Bảo mật truyền tin](#bao-mat)
- [Bảng đánh giá nhanh](#danh-gia)

<h2 id="so-do-kien-truc">Sơ đồ kiến trúc app ↔ cloud ↔ tủ</h2>

<figure role="img" aria-label="Sơ đồ kiến trúc mở khóa smart locker qua app và đám mây: app người dùng kết nối cloud server, cloud gửi lệnh tới tủ, app cũng có thể mở trực tiếp qua Bluetooth">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Kiến trúc mở khóa qua app, cloud và Bluetooth</title>
  <rect x="0" y="0" width="820" height="260" fill="#f8fafc" rx="12"/>
  <!-- App -->
  <rect x="40" y="95" width="160" height="74" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="120" y="126" text-anchor="middle" fill="#1e293b" font-size="14" font-weight="700">App người dùng</text>
  <text x="120" y="146" text-anchor="middle" fill="#64748b" font-size="12">đăng nhập &amp; yêu cầu mở</text>
  <!-- Cloud -->
  <rect x="330" y="40" width="160" height="74" rx="10" fill="#1d4ed8"/>
  <text x="410" y="71" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">Cloud / Server</text>
  <text x="410" y="91" text-anchor="middle" fill="#dbeafe" font-size="12">kiểm tra quyền</text>
  <!-- Locker -->
  <rect x="620" y="95" width="160" height="74" rx="10" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
  <text x="700" y="126" text-anchor="middle" fill="#9a3412" font-size="14" font-weight="700">Tủ (edge)</text>
  <text x="700" y="146" text-anchor="middle" fill="#475569" font-size="12">bo điều khiển → nhả ô</text>
  <!-- App-Cloud -->
  <line x1="200" y1="120" x2="330" y2="80" stroke="#1d4ed8" stroke-width="2" marker-end="url(#ar2)"/>
  <text x="255" y="92" text-anchor="middle" fill="#475569" font-size="12">HTTPS/TLS</text>
  <!-- Cloud-Locker -->
  <line x1="490" y1="80" x2="620" y2="120" stroke="#1d4ed8" stroke-width="2" marker-end="url(#ar2)"/>
  <text x="565" y="92" text-anchor="middle" fill="#475569" font-size="12">lệnh mở (internet)</text>
  <!-- App-Locker Bluetooth direct -->
  <line x1="200" y1="150" x2="620" y2="150" stroke="#f97316" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ar3)"/>
  <text x="410" y="172" text-anchor="middle" fill="#9a3412" font-size="12" font-weight="600">Bluetooth trực tiếp (khi ở gần tủ)</text>
  <!-- Admin note -->
  <rect x="330" y="200" width="160" height="44" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
  <text x="410" y="227" text-anchor="middle" fill="#1e293b" font-size="12">Dashboard quản trị: cấp quyền từ xa</text>
  <line x1="410" y1="114" x2="410" y2="200" stroke="#94a3b8" stroke-width="1.5"/>
  <defs>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
    <marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f97316"/></marker>
  </defs>
</svg>
<figcaption>Kiến trúc nguyên lý mở khóa qua app: đường liền qua cloud (từ xa), đường nét đứt là Bluetooth trực tiếp khi ở gần tủ. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="cloud">Mở qua đám mây (từ xa)</h2>

App đăng nhập và xác thực với **cloud/server**; cloud kiểm tra quyền của người dùng với ô tương ứng rồi **gửi lệnh mở tới tủ qua internet**. Bo điều khiển trong tủ nhận lệnh hợp lệ và nhả ô. Mô hình này cho phép **cấp quyền và mở từ xa**, quản lý nhiều điểm trên một dashboard — rất phù hợp chuỗi hoặc [tủ locker giao nhận hàng](/tu-locker-thong-minh/tu-locker-giao-nhan-hang) và [tủ locker chung cư](/tu-locker-thong-minh/tu-locker-chung-cu).

<h2 id="bluetooth">Mở qua Bluetooth (tại chỗ)</h2>

Khi điện thoại ở **gần tủ**, app có thể gửi lệnh mở **trực tiếp qua Bluetooth** mà không phụ thuộc internet của tủ — hữu ích ở nơi sóng yếu hoặc cần độ trễ thấp. Quyền vẫn được kiểm soát qua app/cloud trước đó. Nhiều hệ thống kết hợp cả hai: Bluetooth khi ở gần, cloud khi từ xa.

<h2 id="bao-mat">Bảo mật truyền tin</h2>

Vì lệnh mở đi qua mạng, **bảo mật truyền tin** là then chốt:

- Kênh mã hóa **HTTPS/TLS** giữa app — cloud — tủ.
- Lệnh mở có **chữ ký/thời hạn** để chống phát lại (replay).
- Xác thực người dùng và phân quyền chặt; ghi log đầy đủ.
- Cập nhật **firmware/app** thường xuyên để vá lỗ hổng.

Kiến trúc IoT tổng thể (kết nối, giám sát, bảo mật) được phân tích sâu hơn trong bài "Kiến trúc IoT của smart locker" (thuộc cụm kiến trúc hệ thống, đang cập nhật).

<h2 id="chon-mo-hinh">Chọn cloud hay Bluetooth, và quản lý đa điểm</h2>

Việc chọn giữa mở qua đám mây hay Bluetooth phụ thuộc bài toán vận hành:

- **Ưu tiên đám mây** khi cần **cấp quyền và mở từ xa**, quản lý nhiều điểm tập trung, hoặc tích hợp với hệ thống khác (bưu chính, sàn TMĐT, PMS). Yêu cầu tủ có kết nối internet ổn định.
- **Ưu tiên Bluetooth** khi vị trí **sóng yếu**, cần độ trễ thấp hoặc muốn mở được ngay cả khi tủ tạm mất internet. Quyền vẫn được kiểm soát qua app/cloud trước đó.
- **Kết hợp cả hai** là lựa chọn phổ biến: Bluetooth khi người dùng ở gần, cloud cho quản trị và tình huống từ xa.

Với **chuỗi nhiều điểm**, kiến trúc đám mây cho phép một dashboard quản trị toàn hệ thống: theo dõi trạng thái ô theo thời gian thực, cấp/thu quyền hàng loạt, xem log và nhận cảnh báo sự cố từ xa — giảm mạnh nhu cầu cử người đến tận nơi. Đây chính là nền tảng cho bảo trì dự đoán và vận hành tinh gọn khi quy mô tăng lên hàng chục, hàng trăm tủ.

<h2 id="danh-gia">Bảng đánh giá nhanh</h2>

| Tiêu chí | Qua đám mây | Qua Bluetooth |
|---|---|---|
| Phạm vi | Từ xa (internet) | Tại chỗ (ở gần tủ) |
| Phụ thuộc internet của tủ | Có | Không bắt buộc |
| Cấp quyền từ xa | Có | Cần đồng bộ trước |
| Quản lý nhiều điểm | Rất tốt | Hạn chế |
| Điểm then chốt | Bảo mật truyền tin (TLS) | Ghép nối an toàn |

> **[CẦN KIỂM CHỨNG]** Giao thức/cơ chế mã hóa TSE dùng, phiên bản Bluetooth, kiến trúc cloud và chính sách bảo mật/cập nhật — kỹ sư xác nhận trước khi xuất bản.

## Tìm hiểu thêm

- Cùng cụm công nghệ: [QR & PIN/OTP](/tin-tuc/smart-locker-mo-khoa-qr-pin-otp) · [RFID/NFC](/tin-tuc/smart-locker-mo-khoa-rfid-nfc) · [vân tay](/tin-tuc/smart-locker-mo-khoa-van-tay) · [Face ID](/tin-tuc/smart-locker-mo-khoa-nhan-dien-khuon-mat)
- [Hệ thống điện & nguồn của smart locker](/tin-tuc/he-thong-dien-nguon-smart-locker)
- Tổng quan: [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
