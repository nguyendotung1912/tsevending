# Bài đăng Viblo.asia — Sẵn sàng copy-paste

> **Hướng dẫn đăng:**
> 1. Vào viblo.asia → Đăng nhập / Tạo tài khoản
> 2. Click "Viết bài" → chọn tag: `iot`, `hardware`, `vietnam`, `technology`
> 3. Copy toàn bộ nội dung bên dưới
> 4. Đăng bình thường — link tsevending.com xuất hiện tự nhiên trong bài

---

# Kiến trúc IoT cho Smart Locker: Bài học từ 10 năm triển khai thực tế tại Việt Nam

Khi nói đến smart locker, hầu hết các bài viết kỹ thuật đều tập trung vào phần cứng hoặc giao diện người dùng. Nhưng điểm khó nhất — và ít được bàn đến nhất — là **làm sao để hàng trăm tủ locker phân tán trên toàn quốc hoạt động đồng bộ, ổn định 24/7 mà không cần kỹ thuật viên đến tận nơi mỗi khi có sự cố**.

Bài viết này chia sẻ kiến trúc IoT thực tế chúng tôi đang dùng tại [TSE Vending](https://tsevending.com), sau nhiều lần thử sai từ 2014 đến nay.

## Vấn đề thực tế: Tủ ở chung cư, người quản lý ở văn phòng

Hãy tưởng tượng bạn có 50 tủ locker tại 20 tòa chung cư khác nhau ở TP.HCM. Mỗi ngày có hàng trăm giao dịch: mở ô, giao hàng, nhận hàng, thanh toán. Câu hỏi đặt ra:

- Làm sao biết ô nào đang bị kẹt mà không cần gọi bảo vệ?
- Làm sao update firmware cho 50 thiết bị cùng lúc mà không mất dữ liệu?
- Khi mất điện, trạng thái ô có được lưu lại không?
- Delay thanh toán tối đa bao nhiêu ms là chấp nhận được cho UX?

Đây là những câu hỏi **kỹ thuật thực tế** mà spec sheet của nhà sản xuất phần cứng không trả lời.

## Kiến trúc 3 tầng chúng tôi đang dùng

```
[Thiết bị - Edge]          [Gateway]           [Cloud]
Tủ locker + MCU    ←→    Raspberry Pi     ←→   Backend API
(ESP32/STM32)            hoặc 4G Router         + Dashboard
     ↕                        ↕                     ↕
Sensor cảm biến          MQTT Broker           PostgreSQL
(lock, door, PIR)        local buffer          + TimeSeries DB
```

### Tầng 1: Edge device (trong tủ locker)

Mỗi ô locker có một **module khóa điện từ** + **MCU** (chúng tôi dùng ESP32-S3). MCU này xử lý:
- Đọc trạng thái khóa (Hall sensor)
- Nhận lệnh mở từ Gateway qua MQTT
- Gửi heartbeat mỗi 30 giây
- Lưu log local nếu mất kết nối

Điểm quan trọng: **MCU phải có bộ nhớ flash đủ lớn** để buffer event khi offline. Chúng tôi đã mất 2 lần dữ liệu giao dịch trước khi hiểu ra điều này.

### Tầng 2: Gateway (cấp tòa nhà)

Mỗi tòa chung cư có 1 gateway — Raspberry Pi 4 hoặc industrial router 4G/LTE. Gateway này:
- Chạy MQTT broker local (Mosquitto)
- Buffer tối đa 72 giờ event nếu cloud down
- Sync lên cloud khi kết nối trở lại
- Thực thi command ngay cả khi mất internet (mode offline)

**Vì sao cần gateway thay vì kết nối thẳng lên cloud?** Kinh nghiệm thực tế: SIM 4G ở một số tòa chung cư tín hiệu không ổn định. Nếu mỗi ô kết nối thẳng lên cloud, 1 ô mất sóng = 1 khiếu nại. Gateway giải quyết vấn đề này.

### Tầng 3: Cloud backend

Stack hiện tại:
- **API:** Node.js + Express (REST + WebSocket)
- **DB chính:** PostgreSQL (transactions, users, devices)
- **Time-series:** InfluxDB (sensor data, door events)
- **Queue:** Redis pub/sub cho real-time notification
- **Dashboard:** React + Recharts

**Bài học đắt giá:** Đừng lưu sensor data vào PostgreSQL. Chúng tôi đã làm vậy 2 năm đầu — đến khi có 5 triệu record thì query báo cáo chậm không chịu nổi. InfluxDB giải quyết hoàn toàn.

## Remote firmware update — vấn đề khó nhất

OTA (Over-The-Air) update cho thiết bị nhúng tưởng đơn giản nhưng rất dễ brick thiết bị nếu làm sai. Quy trình chúng tôi đang dùng:

```
1. Build firmware mới → upload lên S3
2. Dashboard: chọn nhóm thiết bị target (theo tòa nhà / batch)
3. Gateway nhận lệnh update → download firmware về local trước
4. Gửi firmware từng ô một (không đồng loạt — tránh quá tải wifi)
5. MCU verify checksum trước khi flash
6. Nếu boot fail sau 3 lần → auto rollback firmware cũ
7. Report status về cloud
```

Bước 6 (auto rollback) là **bắt buộc**. Một lần chúng tôi push firmware có bug lên 12 thiết bị — nhờ auto rollback không có ô nào bị brick.

## Thanh toán: độ trễ và tính nhất quán

Smart locker ở Việt Nam cần hỗ trợ: VNPay QR, Momo, ZaloPay, thẻ ngân hàng, và đôi khi vẫn cần tiền mặt (cho một số khu vực).

Vấn đề kỹ thuật: thanh toán thành công nhưng ô không mở → người dùng khiếu nại, hoàn tiền phức tạp. Giải pháp:

```
1. User quét QR thanh toán
2. Payment gateway callback → backend nhận
3. Backend ghi DB transaction (status: PAID)
4. Backend gửi lệnh mở ô → MQTT
5. Gateway relay xuống MCU
6. MCU mở khóa → confirm lên
7. Backend update status: OPENED
8. Timeout 10s không confirm → retry 3 lần → alert kỹ thuật viên
```

Độ trễ chấp nhận được: **dưới 3 giây từ lúc thanh toán đến lúc ô mở**. Nếu trên 5 giây, tỷ lệ khiếu nại tăng rõ rệt.

## Monitoring và alerting

Dashboard real-time quan trọng hơn bạn nghĩ. Các metric chúng tôi theo dõi:

- **Device uptime** theo tòa nhà (alert nếu < 95%)
- **Door open success rate** (alert nếu < 98%)
- **Payment-to-open latency** (alert nếu > 5s)
- **Battery/power status** (đối với locker di động)
- **Ô chiếm dụng quá 48h** (hàng không được nhận)

Alerting qua Telegram Bot — đơn giản, free, team nhận ngay trên điện thoại.

## Kết luận

Smart locker nghe có vẻ là phần cứng đơn giản, nhưng để vận hành ổn định ở quy mô hàng trăm thiết bị, phần mềm và kiến trúc IoT quan trọng không kém phần cứng.

Nếu bạn đang xây dựng hệ thống tương tự hoặc muốn tìm hiểu về giải pháp [tủ locker thông minh](https://tsevending.com/tu-locker-thong-minh) cho doanh nghiệp, hãy liên hệ team TSE Vending — chúng tôi happy to share thêm kinh nghiệm thực chiến.

---

*Tác giả: Nguyễn Đỗ Tùng — Đồng sáng lập TSE Vending, 10 năm kinh nghiệm triển khai máy bán hàng tự động và smart locker tại Việt Nam.*
