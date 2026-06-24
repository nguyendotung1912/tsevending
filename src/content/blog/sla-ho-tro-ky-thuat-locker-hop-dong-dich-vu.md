---
title: "SLA Và Hỗ Trợ Kỹ Thuật Locker: Những Điều Phải Có Trong Hợp Đồng Dịch Vụ"
description: "Hướng dẫn đàm phán SLA cho hệ thống locker thông minh: uptime cam kết, thời gian phản hồi, penalty vi phạm và các điều khoản bảo trì phải có trong hợp đồng."
date: "2026-04-07"
silo: "tu-locker-thong-minh"
sub: "giai-phap-kinh-doanh"
keywords: ["SLA locker thông minh", "hỗ trợ kỹ thuật locker", "hợp đồng dịch vụ locker"]
image: "/images/articles/sla-ho-tro-ky-thuat-locker-hop-dong-dich-vu.jpg"
imageAlt: "Hợp đồng dịch vụ SLA locker thông minh với các điều khoản kỹ thuật rõ ràng"
imageCredit: "Photo by Trinh Trần on Pexels"
faqs:
  - q: "Uptime locker thông minh nên cam kết bao nhiêu phần trăm?"
    a: "Tiêu chuẩn thị trường 2026: Locker thông thường (chung cư, văn phòng): 99%+ (tối đa 87.6 giờ downtime/năm). Locker giao nhận 24/7 (tòa nhà lớn, KCN): 99.5%+ (tối đa 43.8 giờ). Locker bệnh viện và phân phối dược phẩm: 99.9%+ (tối đa 8.76 giờ). Đọc kỹ định nghĩa 'downtime': một số nhà cung cấp chỉ tính downtime toàn bộ hệ thống — 1 ô hỏng không tính downtime mặc dù người dùng bị ảnh hưởng."
  - q: "Penalty khi nhà cung cấp vi phạm SLA là bao nhiêu?"
    a: "Cơ cấu penalty phổ biến: Vượt downtime cam kết 1–8 giờ: hoàn 5–10% phí dịch vụ tháng đó. Vượt 8–24 giờ: hoàn 20–30%. Vượt 24–72 giờ: hoàn 50%. Vượt 72 giờ: hoàn 100% tháng đó + quyền chấm dứt hợp đồng. Lưu ý: penalty chỉ có ý nghĩa nếu được ghi trong hợp đồng và có cơ chế theo dõi uptime minh bạch (log tự động, không chỉ nhà cung cấp tự báo cáo)."
  - q: "Bảo trì phòng ngừa locker nên thực hiện bao lâu một lần?"
    a: "Khuyến nghị: Hàng tuần: kiểm tra remote (ping thiết bị, check log lỗi, xem báo cáo pin) — có thể tự động. Hàng tháng: kiểm tra hiện trường (vệ sinh màn hình và cảm biến, test tất cả các ô, kiểm tra bản lề và cơ cấu đóng mở). Hàng quý: bôi trơn bản lề và khóa, kiểm tra dây điện và kết nối, firmware update nếu có. Hàng năm: đánh giá toàn diện, thay linh kiện hao mòn, kiểm tra cảm biến và màn hình."
---

**Hợp đồng mua locker ký xong là bắt đầu phần quan trọng hơn: hợp đồng dịch vụ và bảo trì. Locker hỏng một ngày trong lúc người dùng cần nhất là thảm họa — SLA rõ ràng là bảo vệ đầu tư của bạn.**

[Tủ locker thông minh](/tu-locker-thong-minh) chỉ tạo giá trị khi hoạt động ổn định. SLA không tốt đồng nghĩa với thiết bị tốt nhưng dịch vụ kém — kết quả vẫn là người dùng không hài lòng.

## Cấu Trúc SLA Chuẩn Cho Locker

### 1. Định Nghĩa Uptime Và Downtime

**Cần làm rõ trong hợp đồng**:

*Downtime toàn hệ thống*: Khi tất cả ô không thể truy cập (server down, mất kết nối hoàn toàn).

*Partial downtime*: Khi một phần ô không hoạt động. Ví dụ: 3/12 ô hỏng = 25% downtime hay không?

*Maintenance window*: Bảo trì theo lịch đã thông báo trước → không tính vào downtime.

*Excluded events*: Mất điện lưới, thiên tai, hành động phá hoại của bên thứ ba → thường được miễn trừ.

**Điều khoản mẫu**:
> "Nhà cung cấp cam kết uptime tối thiểu 99.5% cho toàn bộ hệ thống (tính theo tháng), được đo bằng hệ thống monitoring tự động. Partial downtime (>30% ô không hoạt động) được tính là 50% downtime. Bảo trì định kỳ được thông báo trước 48 giờ sẽ không tính vào downtime."

### 2. Thời Gian Phản Hồi Và Khắc Phục

| Mức độ sự cố | Phản hồi | Khắc phục |
|---|---|---|
| **P1** — Toàn hệ thống down | 1 giờ | 4 giờ |
| **P2** — >50% ô không hoạt động | 2 giờ | 8 giờ |
| **P3** — 1–2 ô hỏng | 4 giờ làm việc | 24 giờ làm việc |
| **P4** — Sự cố phần mềm, UI lỗi | 8 giờ làm việc | 3 ngày làm việc |

*"Giờ làm việc" cần định nghĩa rõ: thứ 2–6, 8h–18h, không tính lễ? Hay 24/7?*

### 3. Monitoring Và Báo Cáo

**Monitoring tự động**: Hệ thống locker tự gửi heartbeat mỗi 5 phút. Nếu mất liên lạc → cảnh báo tự động gửi đội kỹ thuật và khách hàng.

**Dashboard realtime**: Khách hàng thấy được trạng thái tất cả ô trong thời gian thực — không cần gọi nhà cung cấp để biết có sự cố.

**Báo cáo hàng tháng**:
- Uptime thực tế vs cam kết
- Số sự cố theo loại (P1/P2/P3/P4)
- Thời gian phản hồi và khắc phục thực tế
- Tỷ lệ sử dụng ô theo tầng, khu vực

### 4. Điều Khoản Linh Kiện Và Thay Thế

**Phải có trong hợp đồng**:
- Cam kết có linh kiện thay thế tại Việt Nam (không phải đặt hàng từ nước ngoài)
- Thời gian đảm bảo linh kiện: ít nhất 7 năm sau ngày mua
- Linh kiện tồn kho tại chỗ (on-site spare parts) cho hệ thống lớn (100+ ô)

### 5. Hỗ Trợ Phần Mềm Dài Hạn

**Rủi ro lớn nhất**: Nhà cung cấp ngừng phát triển phần mềm sau 2–3 năm, app không tương thích iOS/Android mới, lỗ hổng bảo mật không được vá.

**Điều khoản cần yêu cầu**:
- Cam kết hỗ trợ phần mềm tối thiểu 10 năm
- Cập nhật bảo mật trong 30 ngày sau khi phát hiện lỗ hổng
- Nếu nhà cung cấp ngừng hoạt động: source code escrow để bên thứ ba có thể tiếp nhận

## Checklist Đàm Phán SLA

- [ ] Uptime cam kết (%) và cách đo
- [ ] Định nghĩa downtime (toàn bộ vs một phần)
- [ ] Maintenance window được miễn trừ
- [ ] Thời gian phản hồi và khắc phục theo mức độ sự cố
- [ ] Penalty và cơ chế bồi thường khi vi phạm SLA
- [ ] Dashboard monitoring mà khách hàng truy cập được
- [ ] Báo cáo uptime hàng tháng tự động
- [ ] Cam kết linh kiện thay thế (số năm, thời gian giao hàng)
- [ ] Cam kết hỗ trợ phần mềm (số năm, tần suất cập nhật)
- [ ] Điều khoản chấm dứt hợp đồng và chuyển đổi nhà cung cấp

[Liên hệ TSE Vending](/lien-he) để nhận template hợp đồng SLA mẫu và tư vấn đàm phán điều khoản dịch vụ locker phù hợp với yêu cầu tổ chức của bạn.
