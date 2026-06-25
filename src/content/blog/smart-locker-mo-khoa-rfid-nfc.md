---
title: "Mở khóa smart locker bằng thẻ RFID/NFC hoạt động thế nào?"
description: "Nguyên lý mở khóa smart locker bằng thẻ RFID/NFC: đầu đọc đọc UID thẻ, đối chiếu quyền, ghép thẻ với ô và nhả khóa. Ưu nhược điểm và ứng dụng văn phòng, trường học."
date: "2026-06-24"
silo: "tu-locker-thong-minh"
category: "kien-thuc"
keywords:
  - "smart locker rfid"
  - "mở khóa locker bằng thẻ từ"
  - "nfc locker"
  - "thẻ nhân viên mở tủ"
faqs:
  - q: "RFID và NFC khác nhau thế nào trong smart locker?"
    a: "NFC là một nhánh của RFID hoạt động ở tần số 13.56MHz, khoảng cách rất ngắn (chạm). RFID nói chung gồm nhiều dải tần và khoảng đọc khác nhau. Smart locker văn phòng/trường học thường dùng thẻ RFID/NFC tầm gần, quẹt sát đầu đọc để mở ô."
  - q: "Có dùng thẻ nhân viên/sinh viên sẵn có để mở tủ không?"
    a: "Có, nếu thẻ dùng chuẩn RFID tương thích với đầu đọc của tủ. Đây là ưu điểm lớn: một thẻ cho cả chấm công, ra vào và mở tủ cá nhân — không cần phát thêm thẻ. Cần kiểm tra chuẩn thẻ trước khi triển khai."
  - q: "Mất thẻ RFID thì xử lý thế nào?"
    a: "Quản trị viên hủy quyền của thẻ cũ trên phần mềm và cấp quyền cho thẻ mới — tức thì, không cần thay khóa như tủ cơ. Lịch sử truy cập vẫn lưu nên dễ truy vết."
---

Mở khóa bằng **thẻ RFID/NFC** rất phù hợp môi trường có sẵn thẻ định danh như văn phòng, khu công nghiệp và trường học. Người dùng chỉ cần **quẹt thẻ sát đầu đọc**; đầu đọc lấy mã định danh (UID) của thẻ, bo điều khiển đối chiếu quyền đã gán cho thẻ-ô rồi nhả đúng ô và ghi log.

> *Sơ đồ dưới là **luồng xác thực nguyên lý**, không phải sơ đồ kỹ thuật chi tiết.*

## Mục lục

- [Sơ đồ luồng xác thực bằng RFID](#so-do-luong)
- [Nguyên lý đọc thẻ](#nguyen-ly)
- [Ghép thẻ với ô và phân quyền](#ghep-the)
- [Ưu nhược điểm](#uu-nhuoc)
- [Bảng đánh giá nhanh](#danh-gia)

<h2 id="so-do-luong">Sơ đồ luồng xác thực bằng thẻ RFID/NFC</h2>

<figure role="img" aria-label="Sơ đồ luồng xác thực mở smart locker bằng thẻ RFID: quẹt thẻ, đầu đọc đọc UID, bo điều khiển đối chiếu quyền, nhả ô và ghi log">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:Arial,Helvetica,sans-serif" role="img">
  <title>Luồng xác thực mở khóa bằng RFID/NFC</title>
  <rect x="0" y="0" width="820" height="180" fill="#f8fafc" rx="12"/>
  <g font-size="13" font-weight="600" text-anchor="middle">
    <rect x="8" y="60" width="150" height="64" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="83" y="88" fill="#1e293b">Quẹt thẻ</text><text x="83" y="106" fill="#64748b" font-weight="400" font-size="12">RFID/NFC</text>
    <rect x="172" y="60" width="150" height="64" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="247" y="88" fill="#1e3a8a">Đầu đọc</text><text x="247" y="106" fill="#475569" font-weight="400" font-size="12">đọc UID thẻ</text>
    <rect x="336" y="60" width="150" height="64" rx="8" fill="#1d4ed8"/>
    <text x="411" y="88" fill="#ffffff">Bo điều khiển</text><text x="411" y="106" fill="#dbeafe" font-weight="400" font-size="12">đối chiếu quyền</text>
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
<figcaption>Luồng xác thực nguyên lý khi mở smart locker bằng thẻ RFID/NFC. Nguồn: TSE Vending.</figcaption>
</figure>

<h2 id="nguyen-ly">Nguyên lý đọc thẻ</h2>

Thẻ RFID/NFC chứa một **chip và ăng-ten**, lưu mã định danh duy nhất (UID). Khi đưa thẻ lại gần, **đầu đọc** phát trường điện từ cấp năng lượng cho thẻ (thẻ thụ động không cần pin), thẻ phản hồi lại UID. Đầu đọc chuyển UID cho bo điều khiển để đối chiếu. NFC là một dạng RFID tầm rất ngắn (13.56MHz) — thao tác "chạm" quen thuộc.

<h2 id="ghep-the">Ghép thẻ với ô và phân quyền</h2>

Quản trị viên **gán quyền** cho từng thẻ: ô cố định cho nhân viên, hoặc quyền theo ca/lớp/khoa. Khi UID hợp lệ, bo điều khiển nhả đúng ô tương ứng. Ưu điểm lớn: **tận dụng thẻ định danh sẵn có** (thẻ chấm công, thẻ sinh viên) — một thẻ nhiều công dụng. Rất phù hợp [tủ locker văn phòng](/tu-locker-thong-minh/tu-locker-van-phong) và [tủ locker trường học/đại học](/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc).

<h2 id="uu-nhuoc">Ưu nhược điểm</h2>

- **Ưu:** thao tác nhanh (chạm), tận dụng thẻ sẵn có, phân quyền & thu hồi tức thì trên phần mềm, không lo mất chìa.
- **Nhược:** phụ thuộc thẻ vật lý (quên/mất thẻ); cần kiểm tra chuẩn thẻ tương thích; thẻ có thể bị sao chép nếu dùng loại bảo mật thấp → nên chọn chuẩn thẻ mã hóa cho ứng dụng nhạy cảm.

<h2 id="chon-the">Chọn chuẩn thẻ và kịch bản triển khai</h2>

Không phải thẻ RFID nào cũng giống nhau. Khi triển khai cần xác định **chuẩn thẻ** đang dùng trong tổ chức để đảm bảo đầu đọc tương thích, và cân nhắc mức bảo mật:

- **Tổ chức đã có hệ thống thẻ:** ưu tiên giải pháp đọc được thẻ sẵn có (chấm công, sinh viên) để không phát thêm thẻ — tiết kiệm chi phí và thuận tiện cho người dùng.
- **Ứng dụng nhạy cảm:** chọn chuẩn thẻ có mã hóa thay vì thẻ chỉ phát UID đơn giản (dễ sao chép), giảm rủi ro nhân bản thẻ.
- **Triển khai mới:** có thể chuẩn hóa một loại thẻ duy nhất cho cả ra vào, chấm công và locker.

Một số kịch bản điển hình: **văn phòng** gán ô cố định theo nhân viên; **nhà máy** phân quyền ô theo ca, tự reset giữa các ca; **trường học/ký túc xá** gán theo lớp/khoa và thu hồi cuối học kỳ. Toàn bộ thao tác cấp/thu quyền thực hiện trên phần mềm, không cần can thiệp phần cứng — khác biệt lớn so với tủ khóa cơ.

<h2 id="danh-gia">Bảng đánh giá nhanh</h2>

| Tiêu chí | RFID/NFC |
|---|---|
| Thiết bị người dùng | Thẻ (thường có sẵn) |
| Tốc độ | Rất nhanh (chạm) |
| Bảo mật | Trung bình–cao (tùy chuẩn thẻ) |
| Quản lý quyền | Tức thì trên phần mềm |
| Phù hợp | Văn phòng, KCN, trường học |

> **[CẦN KIỂM CHỨNG]** Chuẩn thẻ/đầu đọc TSE hỗ trợ (vd MIFARE/DESFire…), khả năng tương thích thẻ sẵn có và mức mã hóa — kỹ sư xác nhận trước khi xuất bản.

## Tìm hiểu thêm

- Cùng cụm công nghệ: [QR & PIN/OTP](/tin-tuc/smart-locker-mo-khoa-qr-pin-otp) · [vân tay](/tin-tuc/smart-locker-mo-khoa-van-tay) · [Face ID](/tin-tuc/smart-locker-mo-khoa-nhan-dien-khuon-mat) · [App/Bluetooth](/tin-tuc/smart-locker-mo-khoa-app-bluetooth-cloud)
- [Cấu tạo smart locker](/tin-tuc/cau-tao-smart-locker-giai-phau-tu-locker-thong-minh)
- Tổng quan: [smart locker là gì](/tu-locker-thong-minh/smart-locker-la-gi)
