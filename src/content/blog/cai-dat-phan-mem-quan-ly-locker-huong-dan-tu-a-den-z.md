---
title: "Cài Đặt Phần Mềm Quản Lý Locker: Hướng Dẫn Từ A Đến Z Cho Quản Trị Viên"
description: "Hướng dẫn đầy đủ cài đặt và cấu hình phần mềm quản lý tủ locker thông minh: từ yêu cầu hệ thống, kết nối thiết bị đến cấu hình người dùng và tích hợp API thanh toán."
date: "2026-07-21"
silo: "tu-locker-thong-minh"
sub: "huong-dan-su-dung"
keywords: ["cài đặt phần mềm quản lý locker", "setup hệ thống locker", "cấu hình locker thông minh"]
image: "/images/articles/cai-dat-phan-mem-quan-ly-locker-huong-dan-tu-a-den-z.jpg"
imageAlt: "Quản trị viên đang cài đặt và cấu hình phần mềm quản lý locker thông minh trên máy tính"
imageCredit: "Photo by Atlantic Ambience on Pexels"
faqs:
  - q: "Phần mềm quản lý locker cần server riêng không hay dùng cloud?"
    a: "Hai lựa chọn: Cloud (SaaS) — không cần server, nhà cung cấp lo hạ tầng, truy cập từ bất kỳ đâu, phí hàng tháng. On-premise — cài trên server riêng, kiểm soát dữ liệu hoàn toàn, chi phí ban đầu cao hơn, cần IT nội bộ quản lý. Hầu hết SME chọn cloud, tổ chức yêu cầu bảo mật cao chọn on-premise."
  - q: "Cài đặt xong bao lâu thì locker sẵn sàng vận hành?"
    a: "Phần mềm cloud: cài đặt và cấu hình cơ bản 1–2 giờ. Kết nối và kiểm tra locker vật lý: 30–60 phút/cabinet. Cấu hình đầy đủ (thanh toán, thông báo, người dùng, báo cáo): 4–8 giờ tổng cộng. Đào tạo nhân viên thêm 2–4 giờ. Tổng: 1–2 ngày làm việc cho hệ thống vừa."
  - q: "Phần mềm quản lý locker có tích hợp được với phần mềm khác không?"
    a: "Có — qua REST API hoặc webhook. Tích hợp phổ biến: WMS/ERP (quản lý kho), CRM (thông tin khách hàng), phần mềm quản lý tòa nhà (BMS), hệ thống quản lý thành viên gym/spa, và cổng thanh toán (VNPay, Momo...). Yêu cầu tài liệu API trước khi mua."
---

**Phần mềm quản lý locker là "não" của hệ thống — cấu hình sai hoặc cài đặt thiếu có thể làm locker hoạt động không đúng, gây bất tiện cho người dùng và đau đầu cho quản trị viên. Hướng dẫn này giúp bạn cài đặt đúng ngay từ lần đầu.**

Dù bạn đang triển khai hệ thống mới hay tiếp quản quản lý từ người khác, bài viết cung cấp quy trình đầy đủ để thiết lập [tủ locker thông minh](/tu-locker-thong-minh) hoạt động ổn định từ ngày đầu.

## Bước 1: Chuẩn Bị Hạ Tầng

### Yêu Cầu Mạng

- Kết nối Internet cho locker: LAN ổn định (khuyến nghị) hoặc 4G SIM
- Tốc độ tối thiểu: 1 Mbps download, 512 Kbps upload/cabinet
- IP tĩnh hoặc DDNS nếu dùng on-premise server

### Yêu Cầu Phần Cứng Server (On-premise)

- CPU: 4 core trở lên, RAM: 8GB trở lên
- Ổ cứng: SSD 100GB trở lên (dữ liệu log tăng theo thời gian)
- OS: Ubuntu 22.04 LTS hoặc Windows Server 2022 (tùy phần mềm)
- Backup điện UPS cho server

### Cho Hệ Thống Cloud

Không cần server riêng — chỉ cần:
- Tài khoản đăng ký với nhà cung cấp phần mềm
- Trình duyệt Chrome/Edge phiên bản mới nhất cho dashboard admin
- Thiết bị mobile (iOS/Android) cho app quản lý

## Bước 2: Đăng Ký Và Tạo Tài Khoản Admin

1. Nhận email mời từ nhà cung cấp locker kèm link đăng ký
2. Tạo tài khoản Super Admin với email doanh nghiệp (không dùng email cá nhân)
3. Kích hoạt 2FA (xác thực 2 lớp) ngay — bảo mật tài khoản admin là tối quan trọng
4. Đặt mật khẩu mạnh (ít nhất 12 ký tự, bao gồm chữ hoa, số, ký tự đặc biệt)

## Bước 3: Kết Nối Locker Với Hệ Thống

### Qua LAN

1. Cắm cáp LAN vào cổng Ethernet sau cabinet locker
2. Vào phần cấu hình mạng trên màn hình locker, nhập IP tĩnh hoặc bật DHCP
3. Trên dashboard admin: "Add Device" → nhập serial number locker (dán sau máy)
4. Hệ thống tự kết nối và hiển thị locker "Online" trong 1–2 phút

### Qua SIM 4G

1. Lắp SIM 4G vào khe SIM bên trong cabinet (cần tháo nắp kỹ thuật)
2. Cấu hình APN theo nhà mạng (Viettel: v-internet; Mobifone: m-wap; Vinaphone: m3-world)
3. Thêm serial number vào dashboard như quy trình LAN

## Bước 4: Cấu Hình Cơ Bản

### Cài Đặt Tên Và Vị Trí

- Đặt tên locker rõ ràng: "LOC-VINCOM-B1-01" thay vì chỉ số serial
- Nhập địa chỉ và tọa độ GPS (dùng cho bản đồ tìm điểm pickup)
- Gán locker vào "Site" hoặc "Zone" (văn phòng A, khu dân cư B...)

### Cấu Hình Ô Locker

- Đặt tên ô: A1, A2... B1, B2... (hàng × cột)
- Khai báo kích thước từng ô (S/M/L/XL) — ảnh hưởng đến phân bổ tự động
- Đánh dấu ô nào đang Out of Service nếu có

### Cấu Hình Thời Gian

- Múi giờ: GMT+7 (Việt Nam)
- Thời gian lưu trữ tối đa cho mỗi ô (24h, 48h, 72h...)
- Thời gian cảnh báo trước khi hết hạn (gửi thông báo trước 6 giờ)

## Bước 5: Tích Hợp Thanh Toán

1. Đăng ký merchant account với VNPay, Momo, ZaloPay (nếu chưa có)
2. Nhập Merchant ID và Secret Key vào phần cài đặt thanh toán của dashboard
3. Test giao dịch thực với số tiền nhỏ (1.000–5.000 đ) để xác nhận
4. Cấu hình tỷ lệ chiết khấu giao dịch với từng cổng thanh toán

## Bước 6: Cấu Hình Thông Báo

- SMS: Kết nối SMS gateway (SpeedSMS, VMG, VNPT BrandName)
- Push notification: Tích hợp với app mobile nếu có
- Email: Cấu hình SMTP server để gửi thông báo email
- Zalo OA: Nếu có tài khoản Zalo Official Account, tích hợp gửi thông báo qua Zalo

## Bước 7: Tạo Tài Khoản Người Dùng

- **Super Admin**: 1–2 người (toàn quyền)
- **Admin**: Quản lý viên từng địa điểm (quản lý locker theo vị trí được gán)
- **Operator**: Nhân viên vận hành (xem báo cáo, xử lý sự cố cơ bản, không thay đổi cấu hình)
- **Viewer**: Xem báo cáo readonly (cho sếp hoặc đối tác)

## Bước 8: Test Toàn Hệ Thống

Trước khi đưa vào sử dụng thực tế, test đủ các kịch bản:
- Gửi đồ vào ô và nhận OTP SMS
- Lấy đồ bằng OTP
- Thanh toán QR thành công
- Thông báo khi hết thời gian lưu trữ
- Cảnh báo ô hỏng lên dashboard
- Mất điện và UPS kích hoạt

[Liên hệ TSE Vending](/lien-he) để được hỗ trợ cài đặt và cấu hình hệ thống locker — đội kỹ thuật có thể hướng dẫn từ xa hoặc đến tại chỗ tùy yêu cầu.
