import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách vận chuyển & lắp đặt | TSE Vending",
  description: "Chính sách vận chuyển, lắp đặt máy bán hàng tự động và tủ locker thông minh của TSE Vending. Hỗ trợ toàn quốc, bảo hành tại chỗ.",
  path: "/chinh-sach-van-chuyen",
});

export default function ShippingPage() {
  const updated = "18/06/2026";
  return (
    <>
      <PageHeader
        eyebrow="Pháp lý"
        title="Chính sách vận chuyển & lắp đặt"
        description={`Áp dụng cho toàn bộ sản phẩm tại ${siteConfig.url} — Cập nhật: ${updated}`}
        breadcrumbs={[{ name: "Chính sách vận chuyển", path: "/chinh-sach-van-chuyen" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">

            <h2>1. Phạm vi cung cấp dịch vụ</h2>
            <p>
              TSE Vending cung cấp dịch vụ vận chuyển và lắp đặt máy bán hàng tự động, tủ locker thông
              minh trên toàn quốc. Đội ngũ kỹ thuật tập trung tại:
            </p>
            <ul>
              <li>TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An): phục vụ trong ngày</li>
              <li>Đà Nẵng, Hà Nội và các tỉnh thành khác: theo lịch hẹn, thông thường 3–7 ngày làm việc</li>
            </ul>

            <h2>2. Chi phí vận chuyển & lắp đặt</h2>
            <p>
              Chi phí vận chuyển và lắp đặt được thỏa thuận cụ thể trong hợp đồng tùy thuộc vào:
            </p>
            <ul>
              <li>Địa điểm lắp đặt (khoảng cách, tầng, điều kiện tiếp cận)</li>
              <li>Số lượng và trọng lượng thiết bị</li>
              <li>Yêu cầu tích hợp hệ thống điện, mạng tại chỗ</li>
            </ul>
            <p>
              Đối với các dự án trong khu vực TP. Hồ Chí Minh, TSE Vending hỗ trợ miễn phí vận chuyển
              và lắp đặt cơ bản. Chi phí lắp đặt tại các tỉnh thành khác sẽ được thông báo rõ ràng
              trước khi ký hợp đồng.
            </p>

            <h2>3. Thời gian giao hàng & lắp đặt</h2>
            <ul>
              <li><strong>Máy bán hàng tự động có sẵn kho:</strong> 3–5 ngày làm việc sau khi ký hợp đồng và thanh toán đặt cọc</li>
              <li><strong>Máy sản xuất theo đơn:</strong> 15–30 ngày tùy cấu hình</li>
              <li><strong>Tủ locker thông minh:</strong> 15–45 ngày tùy số lượng ô và cấu hình xác thực</li>
            </ul>
            <p>
              TSE Vending sẽ thông báo lịch vận chuyển và lắp đặt cụ thể qua điện thoại hoặc email
              ít nhất 2 ngày làm việc trước ngày thực hiện.
            </p>

            <h2>4. Kiểm tra & nghiệm thu</h2>
            <p>
              Sau khi lắp đặt hoàn tất, đội kỹ thuật TSE Vending sẽ:
            </p>
            <ul>
              <li>Vận hành thử toàn bộ tính năng thiết bị tại chỗ</li>
              <li>Kết nối và cấu hình phần mềm quản lý từ xa</li>
              <li>Đào tạo cơ bản cho nhân viên vận hành của khách hàng</li>
              <li>Bàn giao hồ sơ kỹ thuật và thông tin bảo hành</li>
            </ul>

            <h2>5. Chính sách đổi trả thiết bị</h2>
            <p>
              Thiết bị được đổi trả hoặc bảo hành theo điều kiện trong hợp đồng. Trường hợp thiết bị
              có lỗi kỹ thuật do nhà sản xuất trong vòng 12 tháng đầu, TSE Vending chịu toàn bộ chi
              phí sửa chữa hoặc thay thế tại chỗ.
            </p>

            <h2>6. Liên hệ</h2>
            <ul>
              <li><strong>Hotline:</strong> {siteConfig.phoneDisplay}</li>
              <li><strong>Email:</strong> {siteConfig.email}</li>
              <li><strong>Địa chỉ:</strong> {siteConfig.address.street}, {siteConfig.address.city}</li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
}
