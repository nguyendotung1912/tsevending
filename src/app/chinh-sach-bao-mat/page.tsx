import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách bảo mật thông tin | TSE Vending",
  description: "Chính sách bảo mật thông tin khách hàng của TSE Vending (Công ty Cổ phần Công nghệ TSE) — cam kết bảo vệ dữ liệu cá nhân theo quy định pháp luật Việt Nam.",
  path: "/chinh-sach-bao-mat",
});

export default function PrivacyPage() {
  const updated = "18/06/2026";
  return (
    <>
      <PageHeader
        eyebrow="Pháp lý"
        title="Chính sách bảo mật thông tin"
        description={`Áp dụng cho website ${siteConfig.url} — Cập nhật lần cuối: ${updated}`}
        breadcrumbs={[{ name: "Chính sách bảo mật", path: "/chinh-sach-bao-mat" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">

            <h2>1. Phạm vi thu thập thông tin</h2>
            <p>
              <strong>{siteConfig.legalName}</strong> (sau đây gọi là "TSE Vending" hoặc "Chúng tôi") thu thập
              thông tin cá nhân khi bạn:
            </p>
            <ul>
              <li>Điền form liên hệ, yêu cầu tư vấn hoặc báo giá trên website {siteConfig.domain}</li>
              <li>Đăng ký nhận thông tin sản phẩm, khuyến mãi qua email</li>
              <li>Thực hiện giao dịch mua bán hoặc ký kết hợp đồng với TSE Vending</li>
            </ul>
            <p>Thông tin thu thập bao gồm: họ tên, số điện thoại, địa chỉ email, địa chỉ lắp đặt, nhu cầu sản phẩm.</p>

            <h2>2. Mục đích sử dụng thông tin</h2>
            <p>TSE Vending sử dụng thông tin thu thập để:</p>
            <ul>
              <li>Liên hệ tư vấn, khảo sát và báo giá theo yêu cầu của khách hàng</li>
              <li>Thực hiện hợp đồng cung cấp sản phẩm, dịch vụ</li>
              <li>Gửi thông tin sản phẩm mới, khuyến mãi (nếu khách hàng đồng ý nhận)</li>
              <li>Cải thiện chất lượng dịch vụ và trải nghiệm khách hàng</li>
              <li>Tuân thủ nghĩa vụ pháp lý theo quy định pháp luật Việt Nam</li>
            </ul>

            <h2>3. Phạm vi chia sẻ thông tin</h2>
            <p>
              TSE Vending cam kết không bán, cho thuê hoặc tiết lộ thông tin cá nhân của khách hàng cho
              bên thứ ba, ngoại trừ các trường hợp:
            </p>
            <ul>
              <li>Đơn vị vận chuyển, đối tác lắp đặt nhằm thực hiện hợp đồng đã ký kết</li>
              <li>Cơ quan nhà nước có thẩm quyền theo quy định pháp luật</li>
              <li>Có sự đồng ý rõ ràng của khách hàng</li>
            </ul>

            <h2>4. Thời gian lưu trữ thông tin</h2>
            <p>
              Thông tin cá nhân được lưu trữ trong thời gian cần thiết để thực hiện mục đích thu thập,
              hoặc theo quy định pháp luật (tối thiểu 5 năm đối với thông tin giao dịch thương mại).
            </p>

            <h2>5. Quyền của khách hàng</h2>
            <p>Khách hàng có quyền:</p>
            <ul>
              <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình</li>
              <li>Rút lại sự đồng ý nhận thông tin marketing bất kỳ lúc nào</li>
              <li>Khiếu nại về việc sử dụng thông tin không đúng mục đích</li>
            </ul>

            <h2>6. Bảo mật dữ liệu</h2>
            <p>
              TSE Vending áp dụng các biện pháp kỹ thuật và quản lý phù hợp để bảo vệ thông tin khách
              hàng khỏi truy cập trái phép, mất mát hoặc tiết lộ. Website sử dụng giao thức HTTPS mã hóa
              toàn bộ dữ liệu truyền tải.
            </p>

            <h2>7. Cookie</h2>
            <p>
              Website sử dụng cookie để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập
              (Google Analytics). Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính
              năng của website có thể bị ảnh hưởng.
            </p>

            <h2>8. Liên hệ</h2>
            <p>
              Mọi yêu cầu liên quan đến chính sách bảo mật, vui lòng liên hệ:
            </p>
            <ul>
              <li><strong>Công ty:</strong> {siteConfig.legalName}</li>
              <li><strong>Địa chỉ:</strong> {siteConfig.address.street}, {siteConfig.address.city}</li>
              <li><strong>Email:</strong> {siteConfig.email}</li>
              <li><strong>Hotline:</strong> {siteConfig.phoneDisplay}</li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
}
