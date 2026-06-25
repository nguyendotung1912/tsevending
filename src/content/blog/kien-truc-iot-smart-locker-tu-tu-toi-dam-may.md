---
title: "Kiến trúc IoT của smart locker: từ tủ tới đám mây"
description: "Kiến trúc IoT smart locker: lớp tủ (edge), kết nối LAN/WiFi/4G-5G, server/cloud và app người dùng + dashboard quản trị. Luồng dữ liệu, giám sát từ xa và bảo mật truyền tin."
date: "2026-06-22"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "kiến trúc iot smart locker"
  - "smart locker cloud"
  - "giám sát locker từ xa"
  - "bảo trì dự đoán locker"
faqs:
  - q: "Kiến trúc IoT của smart locker gồm những lớp nào?"
    a: "Bốn lớp: lớp tủ (edge — bo điều khiển, khóa, cảm biến), lớp kết nối (LAN/WiFi/4G-5G), lớp server/cloud (lưu trữ, xử lý, phân quyền), và lớp ứng dụng (app người dùng + dashboard quản trị). Dữ liệu đi hai chiều giữa các lớp qua kênh mã hóa."
  - q: "Giám sát smart locker từ xa hoạt động thế nào?"
    a: "Tủ liên tục gửi trạng thái (ô trống/đầy, đóng/mở, lỗi, nhật ký) lên cloud qua kết nối mạng. Quản trị viên xem theo thời gian thực trên dashboard, cấp/thu quyền, mở ô từ xa và nhận cảnh báo sự cố — không cần đến tận nơi."
  - q: "Bảo trì dự đoán cho smart locker là gì?"
    a: "Là việc phân tích dữ liệu vận hành (số chu kỳ đóng-mở, lỗi lặp, tín hiệu bất thường) để dự đoán linh kiện sắp hỏng và bảo trì trước khi tủ ngừng hoạt động — giảm thời gian downtime so với chỉ sửa khi đã hỏng."
---

Smart locker hiện đại là một **thiết bị IoT**: không chỉ là tủ khóa mà là một nút trong hệ thống kết nối. Kiến trúc gồm **bốn lớp** — **tủ (edge) → kết nối (LAN/WiFi/4G-5G) → server/cloud → app người dùng & dashboard quản trị** — với dữ liệu đi hai chiều qua kênh mã hóa. Nhờ đó, một người quản trị có thể giám sát và vận hành hàng trăm tủ ở nhiều nơi từ một màn hình.

> *Sơ đồ dưới là **kiến trúc hệ thống nguyên lý** mô tả luồng dữ liệu, không phải sơ đồ hạ tầng chi tiết.*

## Mục lục

- [Sơ đồ kiến trúc IoT 4 lớp](#so-do-iot)
- [Lớp tủ (edge)](#lop-tu)
- [Lớp kết nối](#lop-ket-noi)
- [Lớp server/cloud & ứng dụng](#lop-cloud)
- [Giám sát, bảo trì dự đoán & bảo mật](#giam-sat)

<h2 id="so-do-iot">Sơ đồ kiến trúc IoT 4 lớp</h2>

<figure role="img" aria-label="Sơ đồ kiến trúc IoT smart locker bốn lớp: tủ edge, kết nối mạng, server cloud, và app người dùng cùng dashboard quản trị">
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Kiến trúc IoT smart locker bốn lớp</title>
  <rect x="0" y="0" width="820" height="250" fill="#f8fafc" rx="12"/>
  <g text-anchor="middle">
    <!-- edge -->
    <rect x="20" y="90" width="160" height="74" rx="10" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
    <text x="100" y="120" fill="#9a3412" font-size="14" font-weight="700">Tủ (edge)</text>
    <text x="100" y="140" fill="#475569" font-size="11.5">bo điều khiển · khóa · cảm biến</text>
    <!-- connectivity -->
    <rect x="225" y="90" width="160" height="74" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="305" y="120" fill="#1e3a8a" font-size="14" font-weight="700">Kết nối</text>
    <text x="305" y="140" fill="#475569" font-size="11.5">LAN / WiFi / 4G-5G</text>
    <!-- cloud -->
    <rect x="430" y="90" width="160" height="74" rx="10" fill="#1d4ed8"/>
    <text x="510" y="120" fill="#ffffff" font-size="14" font-weight="700">Server / Cloud</text>
    <text x="510" y="140" fill="#dbeafe" font-size="11.5">lưu trữ · phân quyền</text>
    <!-- apps -->
    <rect x="635" y="50" width="160" height="60" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="715" y="76" fill="#1e293b" font-size="13" font-weight="600">App người dùng</text>
    <text x="715" y="95" fill="#475569" font-size="11.5">mở ô · nhận mã</text>
    <rect x="635" y="142" width="160" height="60" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="715" y="168" fill="#1e293b" font-size="13" font-weight="600">Dashboard quản trị</text>
    <text x="715" y="187" fill="#475569" font-size="11.5">giám sát · cảnh báo</text>
  </g>
  <g stroke="#475569" stroke-width="2" marker-end="url(#ari)">
    <line x1="180" y1="127" x2="225" y2="127"/><line x1="385" y1="127" x2="430" y2="127"/>
    <line x1="590" y1="115" x2="635" y2="85"/><line x1="590" y1="140" x2="635" y2="170"/>
  </g>
  <text x="305" y="195" text-anchor="middle" fill="#64748b" font-size="11">↔ dữ liệu hai chiều, kênh mã hóa (TLS)</text>
  <defs><marker id="ari" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#475569"/></marker></defs>
</svg>
<figcaption>Kiến trúc IoT nguyên lý: dữ liệu đi hai chiều từ tủ qua kết nối tới cloud, phục vụ app người dùng và dashboard quản trị. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="lop-tu">Lớp tủ (edge)</h2>

Tại tủ, **bo điều khiển** xử lý xác thực, điều khiển khóa và đọc cảm biến (xem [cấu tạo smart locker](/tin-tuc/cau-tao-smart-locker-giai-phau-tu-locker-thong-minh)). Đây là "edge" — xử lý cục bộ để vẫn hoạt động nhanh và chịu được gián đoạn mạng tạm thời, đồng thời đóng gói dữ liệu trạng thái/log để gửi lên trên.

<h2 id="lop-ket-noi">Lớp kết nối</h2>

Tủ kết nối lên hệ thống qua **LAN, WiFi hoặc 4G/5G** tùy hạ tầng vị trí. LAN/WiFi phù hợp trong tòa nhà có mạng sẵn; 4G/5G linh hoạt cho điểm ngoài trời hoặc nơi không tiện kéo dây. Kết nối cần ổn định cho giám sát thời gian thực, nhưng nhờ xử lý edge, tủ vẫn mở được khi mạng chập chờn.

<h2 id="lop-cloud">Lớp server/cloud & ứng dụng</h2>

**Server/cloud** lưu trữ dữ liệu, xử lý nghiệp vụ, quản lý người dùng và phân quyền tập trung. Trên cùng là hai nhóm ứng dụng:

- **App người dùng:** nhận mã, mở ô, xem lịch sử (xem [mở khóa qua app/cloud](/tin-tuc/smart-locker-mo-khoa-app-bluetooth-cloud)).
- **Dashboard quản trị:** giám sát trạng thái, cấp/thu quyền, xem log, nhận cảnh báo — quản lý nhiều điểm trên một màn hình.

<h2 id="giam-sat">Giám sát, bảo trì dự đoán & bảo mật</h2>

- **Giám sát thời gian thực:** trạng thái ô, đóng/mở, lỗi, tỷ lệ lấp đầy — hiển thị tức thì.
- **Bảo trì dự đoán:** phân tích số chu kỳ đóng-mở và lỗi lặp để dự đoán linh kiện sắp hỏng, bảo trì trước khi tủ ngừng — giảm downtime.
- **Bảo mật truyền tin:** kênh mã hóa (TLS), xác thực thiết bị, lệnh có thời hạn/chữ ký chống phát lại, cập nhật firmware định kỳ.

Đây là nền tảng giúp TSE Vending vận hành dịch vụ trọn gói và hỗ trợ kỹ thuật từ xa hiệu quả.

> **[CẦN KỸ SƯ TSE XÁC NHẬN]** Nền tảng cloud, giao thức kết nối/giao tiếp, cơ chế mã hóa, chu kỳ cập nhật firmware và các chỉ số bảo trì dự đoán cụ thể của hệ thống TSE — điền trước khi xuất bản.

## Tìm hiểu thêm

- Cùng cụm: [quy trình sản xuất smart locker](/tin-tuc/quy-trinh-san-xuat-smart-locker) · [tiêu chuẩn & chứng nhận](/tin-tuc/tieu-chuan-chung-nhan-smart-locker)
- Liên quan: [mở khóa qua app/cloud](/tin-tuc/smart-locker-mo-khoa-app-bluetooth-cloud) · [hệ thống điện & nguồn](/tin-tuc/he-thong-dien-nguon-smart-locker)
- Tổng quan: [tủ locker thông minh](/tu-locker-thong-minh)
