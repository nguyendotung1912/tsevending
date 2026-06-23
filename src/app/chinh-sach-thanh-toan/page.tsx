import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách thanh toán | TSE Vending",
  description: "Chính sách thanh toán khi mua máy bán hàng tự động, tủ locker thông minh của TSE Vending. Chuyển khoản ngân hàng, thanh toán theo tiến độ hợp đồng.",
  path: "/chinh-sach-thanh-toan",
});

export default function PaymentPage() {
  const updated = "18/06/2026";
  return (
    <>
      <PageHeader
        eyebrow="Pháp lý"
        title="Chính sách thanh toán"
        description={`Áp dụng cho toàn bộ giao dịch tại ${siteConfig.url} — Cập nhật: ${updated}`}
        breadcrumbs={[{ name: "Chính sách thanh toán", path: "/chinh-sach-thanh-toan" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">

            <h2>1. Hình thức thanh toán được chấp nhận</h2>
            <p>TSE Vending hiện chấp nhận các hình thức thanh toán sau:</p>
            <ul>
              <li><strong>Chuyển khoản ngân hàng:</strong> Vietcombank, Techcombank, MB Bank, BIDV (thông tin tài khoản ghi trong hợp đồng)</li>
              <li><strong>Thanh toán tiền mặt:</strong> tại văn phòng TSE Vending hoặc tại địa điểm lắp đặt (đối với hợp đồng giá trị nhỏ)</li>
              <li><strong>Ví điện tử MoMo / ZaloPay:</strong> áp dụng cho các giao dịch nhỏ lẻ theo thỏa thuận</li>
            </ul>

            <h2>2. Điều khoản thanh toán theo hợp đồng</h2>
            <p>Thông thường, thanh toán được chia theo các đợt:</p>
            <ul>
              <li><strong>Đặt cọc:</strong> 30–50% giá trị hợp đồng sau khi ký kết — để sản xuất/đặt hàng thiết bị</li>
              <li><strong>Thanh toán lần 2:</strong> 40–60% trước khi vận chuyển và lắp đặt</li>
              <li><strong>Thanh toán lần cuối:</strong> phần còn lại (nếu có) sau khi nghiệm thu và bàn giao</li>
            </ul>
            <p>
              Tỷ lệ và thời điểm thanh toán cụ thể được ghi rõ trong từng hợp đồng. TSE Vending không
              yêu cầu thanh toán 100% trước khi giao hàng.
            </p>

            <h2>3. Hóa đơn & chứng từ</h2>
            <p>
              TSE Vending xuất hóa đơn VAT (GTGT 8%) cho toàn bộ giao dịch theo quy định pháp luật
              Việt Nam. Hóa đơn được xuất sau khi nhận thanh toán và giao hàng hoàn tất. Doanh nghiệp
              cần lấy hóa đơn để khấu trừ thuế vui lòng cung cấp thông tin xuất hóa đơn khi đặt hàng.
            </p>

            <h2>4. Chính sách hoàn tiền</h2>
            <ul>
              <li>
                <strong>Thiết bị lỗi kỹ thuật:</strong> hoàn tiền hoặc đổi thiết bị mới trong vòng 30 ngày
                kể từ ngày lắp đặt nếu lỗi do nhà sản xuất
              </li>
              <li>
                <strong>Hủy hợp đồng trước khi sản xuất:</strong> hoàn lại tiền đặt cọc trừ chi phí phát sinh
                thực tế (tư vấn, khảo sát)
              </li>
              <li>
                <strong>Hủy hợp đồng sau khi sản xuất:</strong> không hoàn tiền đặt cọc; thiết bị đã sản xuất
                theo đơn có thể không bán lại được cho bên khác
              </li>
            </ul>

            <h2>5. Bảo mật thanh toán</h2>
            <p>
              TSE Vending không lưu trữ thông tin thẻ ngân hàng của khách hàng. Mọi giao dịch chuyển
              khoản đều được xác nhận qua hệ thống ngân hàng có mã hóa bảo mật. Khách hàng lưu ý:
              TSE Vending <strong>không yêu cầu</strong> chuyển tiền qua tài khoản cá nhân không có trong
              hợp đồng.
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
