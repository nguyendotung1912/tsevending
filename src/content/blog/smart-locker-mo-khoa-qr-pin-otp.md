---
title: "Mở khóa smart locker bằng mã QR & PIN/OTP hoạt động thế nào?"
description: "Nguyên lý mở khóa smart locker bằng mã QR và PIN/OTP: luồng tạo mã, kiểm tra, nhả ô và ghi log. Ưu nhược điểm, bảo mật và ứng dụng thực tế."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "mở khóa smart locker bằng qr"
  - "mã pin otp locker"
  - "smart locker mã qr"
  - "luồng xác thực locker"
faqs:
  - q: "Mã QR mở smart locker được tạo thế nào?"
    a: "Khi gửi đồ, hệ thống sinh một mã (QR hoặc PIN) gắn với đúng ô và thời hạn, lưu trên server và gửi cho người nhận qua SMS/Zalo/app. Khi quét/nhập, bo điều khiển đối chiếu mã hợp lệ rồi nhả đúng ô."
  - q: "Mã PIN/OTP smart locker có an toàn không?"
    a: "Có. Mã thường dùng một lần (OTP) hoặc có thời hạn, hết hạn sau khi lấy đồ hoặc sau khoảng thời gian cài đặt. Mỗi giao dịch được ghi log kèm thời gian nên có thể truy vết. Mã dùng một lần giảm rủi ro chia sẻ lại."
  - q: "Mất sóng điện thoại có mở được mã QR không?"
    a: "Mã QR/PIN đã nhận có thể dùng offline tại tủ vì việc đối chiếu diễn ra ở bo điều khiển/hệ thống tủ; chỉ bước nhận mã ban đầu cần kết nối. Nếu tủ mất mạng tạm thời, mã hợp lệ đã đồng bộ vẫn mở được tùy cấu hình."
---

Mở khóa bằng **mã QR và PIN/OTP** là phương thức phổ biến nhất của smart locker vì không cần phần cứng riêng cho người dùng — chỉ cần điện thoại. Luồng hoạt động gồm bốn bước: **tạo mã gắn với ô → gửi cho người nhận → quét/nhập mã → bo điều khiển đối chiếu và nhả ô**, đồng thời ghi log mọi giao dịch.

> *Sơ đồ dưới là **luồng xác thực nguyên lý**, không phải sơ đồ kỹ thuật chi tiết.*

## Mục lục

- [Sơ đồ luồng xác thực bằng QR/PIN](#so-do-luong)
- [Cách tạo và kiểm tra mã](#tao-ma)
- [QR khác PIN/OTP thế nào](#qr-vs-pin)
- [Bảo mật và lưu ý](#bao-mat)
- [Bảng đánh giá nhanh](#danh-gia)

<h2 id="so-do-luong">Sơ đồ luồng xác thực bằng mã QR / PIN</h2>

<figure role="img" aria-label="Sơ đồ luồng xác thực mở khóa smart locker bằng mã QR hoặc PIN: người dùng nhập mã, bo điều khiển đối chiếu, nhả ô và ghi log">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Luồng xác thực mở khóa bằng QR/PIN</title>
  <rect x="0" y="0" width="820" height="180" fill="#f8fafc" rx="12"/>
  <g font-size="13" font-weight="600" text-anchor="middle">
    <rect x="8" y="60" width="150" height="64" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="83" y="88" fill="#1e293b">Người dùng</text><text x="83" y="106" fill="#64748b" font-weight="400" font-size="12">quét QR / nhập PIN</text>
    <rect x="172" y="60" width="150" height="64" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="247" y="88" fill="#1e3a8a">Mã QR/PIN</text><text x="247" y="106" fill="#475569" font-weight="400" font-size="12">gắn ô + thời hạn</text>
    <rect x="336" y="60" width="150" height="64" rx="8" fill="#1d4ed8"/>
    <text x="411" y="88" fill="#ffffff">Bo điều khiển</text><text x="411" y="106" fill="#dbeafe" font-weight="400" font-size="12">đối chiếu mã</text>
    <rect x="500" y="60" width="150" height="64" rx="8" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
    <text x="575" y="88" fill="#9a3412">Nhả đúng ô</text><text x="575" y="106" fill="#475569" font-weight="400" font-size="12">khóa mở</text>
    <rect x="664" y="60" width="148" height="64" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
    <text x="738" y="88" fill="#1e293b">Ghi log</text><text x="738" y="106" fill="#475569" font-weight="400" font-size="12">&amp; đồng bộ</text>
  </g>
  <g stroke="#475569" stroke-width="2" marker-end="url(#ar)">
    <line x1="158" y1="92" x2="172" y2="92"/><line x1="322" y1="92" x2="336" y2="92"/>
    <line x1="486" y1="92" x2="500" y2="92"/><line x1="650" y1="92" x2="664" y2="92"/>
  </g>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#475569"/></marker></defs>
</svg>
<figcaption>Luồng xác thực nguyên lý khi mở smart locker bằng mã QR hoặc PIN/OTP. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="tao-ma">Cách tạo và kiểm tra mã</h2>

Khi một ô được gán (ví dụ shipper gửi hàng, hoặc người dùng chọn ô gửi đồ), hệ thống **sinh một mã** gắn với đúng ô đó kèm **thời hạn hiệu lực**. Mã được lưu ở hệ thống và gửi cho người nhận qua SMS, Zalo hoặc ứng dụng. Khi người nhận **quét QR hoặc nhập PIN** tại màn hình, bo điều khiển đối chiếu mã: nếu hợp lệ và còn hạn, nó nhả đúng ô và ghi nhận giao dịch.

<h2 id="qr-vs-pin">QR khác PIN/OTP thế nào?</h2>

- **Mã QR:** quét bằng camera điện thoại — nhanh, ít sai sót, phù hợp giao nhận hàng (shipper/người nhận).
- **Mã PIN/OTP:** dãy số nhập tay — không cần camera, dùng được cả khi in ra giấy hoặc đọc qua điện thoại; OTP (dùng một lần) tăng bảo mật.

Nhiều hệ thống hỗ trợ **cả hai** để linh hoạt cho mọi nhóm người dùng. Phương thức này đặc biệt phù hợp [tủ locker giao nhận hàng](/tu-locker-thong-minh/tu-locker-giao-nhan-hang) và [tủ locker chung cư](/tu-locker-thong-minh/tu-locker-chung-cu).

<h2 id="bao-mat">Bảo mật và lưu ý</h2>

- **Mã dùng một lần / có thời hạn:** giảm rủi ro mã bị chia sẻ lại sau khi đã lấy đồ.
- **Ghi log đầy đủ:** mỗi lần mở gắn với mã, ô và thời gian → truy vết được.
- **Lưu ý:** mã gửi qua tin nhắn cần kênh tin cậy; với hàng giá trị cao có thể kết hợp thêm phương thức khác (thẻ, sinh trắc).

<h2 id="kich-ban">Kịch bản sử dụng thực tế</h2>

Mã QR/PIN linh hoạt cho nhiều tình huống khác nhau:

- **Giao nhận bưu phẩm:** shipper quét mã đơn để chọn ô, hệ thống tự gửi mã nhận cho cư dân — không cần shipper biết trước người nhận là ai. Đây là kịch bản phổ biến nhất tại chung cư và điểm last-mile.
- **Gửi đồ tạm thời:** khách tại siêu thị, thư viện hay khu vui chơi chọn ô trống, nhận mã ngay trên màn hình hoặc qua SMS, lấy lại bằng cùng mã đó.
- **Cấp quyền tạm cho khách:** quản trị viên tạo mã có thời hạn cho khách vãng lai mà không cần phát thẻ vật lý.

Khi triển khai, nên cấu hình **thời hạn mã hợp lý** (đủ để người nhận đến lấy nhưng không kéo dài gây chiếm ô), bật **thông báo nhắc** khi sắp hết hạn, và luôn để **phương thức dự phòng** cho người dùng không có điện thoại thông minh. Mã dùng một lần nên được ưu tiên cho hàng giá trị cao để tránh tái sử dụng ngoài ý muốn.

<h2 id="danh-gia">Bảng đánh giá nhanh</h2>

| Tiêu chí | Mã QR | PIN/OTP |
|---|---|---|
| Cần thiết bị người dùng | Điện thoại (camera) | Không bắt buộc |
| Tốc độ | Rất nhanh | Nhanh |
| Bảo mật | Cao (có hạn/1 lần) | Cao (OTP) |
| Chi phí triển khai | Thấp | Thấp |
| Phù hợp | Giao nhận hàng, chung cư | Mọi đối tượng, kể cả không rành công nghệ |

> **[CẦN KIỂM CHỨNG]** Độ dài mã, thuật toán sinh mã, thời hạn mặc định và chính sách OTP cụ thể TSE áp dụng — kỹ sư xác nhận trước khi xuất bản.

## Tìm hiểu thêm

- Cùng cụm công nghệ: [RFID/NFC](/tin-tuc/smart-locker-mo-khoa-rfid-nfc) · [vân tay](/tin-tuc/smart-locker-mo-khoa-van-tay) · [Face ID](/tin-tuc/smart-locker-mo-khoa-nhan-dien-khuon-mat) · [App/Bluetooth](/tin-tuc/smart-locker-mo-khoa-app-bluetooth-cloud)
- [Cơ cấu khóa điện tử trong smart locker](/tin-tuc/co-cau-khoa-dien-tu-smart-locker)
- Tổng quan: [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
