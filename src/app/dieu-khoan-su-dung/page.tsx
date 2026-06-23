import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Điều khoản sử dụng | TSE Vending",
  description: "Điều khoản sử dụng website tsevending.com — quy định quyền và nghĩa vụ của người dùng khi truy cập và sử dụng dịch vụ của TSE Vending.",
  path: "/dieu-khoan-su-dung",
});

export default function TermsPage() {
  const updated = "18/06/2026";
  return (
    <>
      <PageHeader
        eyebrow="Pháp lý"
        title="Điều khoản sử dụng"
        description={`Áp dụng khi truy cập và sử dụng ${siteConfig.url} — Cập nhật: ${updated}`}
        breadcrumbs={[{ name: "Điều khoản sử dụng", path: "/dieu-khoan-su-dung" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">

            <h2>1. Chấp thuận điều khoản</h2>
            <p>
              Khi truy cập và sử dụng website <strong>{siteConfig.domain}</strong>, bạn đồng ý bị ràng buộc
              bởi các điều khoản sử dụng này. Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng
              ngừng sử dụng website.
            </p>

            <h2>2. Thông tin về chủ thể</h2>
            <ul>
              <li><strong>Tên doanh nghiệp:</strong> {siteConfig.legalName}</li>
              <li><strong>Tên thương mại:</strong> {siteConfig.name}</li>
              <li><strong>Địa chỉ:</strong> {siteConfig.address.street}, {siteConfig.address.city}</li>
              <li><strong>Email:</strong> {siteConfig.email}</li>
              <li><strong>Hotline:</strong> {siteConfig.phoneDisplay}</li>
            </ul>

            <h2>3. Quy định sử dụng</h2>
            <p>Khi sử dụng website, bạn cam kết:</p>
            <ul>
              <li>Cung cấp thông tin chính xác, trung thực khi điền form liên hệ</li>
              <li>Không sử dụng website cho mục đích trái pháp luật hoặc gây hại cho bên thứ ba</li>
              <li>Không cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu của TSE Vending</li>
              <li>Không sao chép, phân phối nội dung website khi chưa có sự đồng ý bằng văn bản</li>
            </ul>

            <h2>4. Sở hữu trí tuệ</h2>
            <p>
              Toàn bộ nội dung trên website {siteConfig.domain} — bao gồm văn bản, hình ảnh, logo,
              thiết kế, mã nguồn — thuộc quyền sở hữu của {siteConfig.legalName} hoặc được sử dụng
              hợp pháp. Nghiêm cấm sao chép, chỉnh sửa hoặc phân phối lại khi chưa được phép.
            </p>

            <h2>5. Giới hạn trách nhiệm</h2>
            <p>
              TSE Vending cố gắng duy trì thông tin chính xác và cập nhật trên website, tuy nhiên
              không chịu trách nhiệm về các thiệt hại phát sinh từ việc sử dụng thông tin trên website
              mà không có hợp đồng cụ thể. Giá sản phẩm và thông số kỹ thuật có thể thay đổi mà không
              báo trước — vui lòng liên hệ để xác nhận trước khi quyết định.
            </p>

            <h2>6. Liên kết bên ngoài</h2>
            <p>
              Website có thể chứa liên kết đến các website bên ngoài. TSE Vending không kiểm soát
              và không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các website đó.
            </p>

            <h2>7. Thay đổi điều khoản</h2>
            <p>
              TSE Vending có quyền cập nhật điều khoản sử dụng bất kỳ lúc nào. Phiên bản mới nhất
              luôn được đăng tải tại {siteConfig.url}/dieu-khoan-su-dung. Việc tiếp tục sử dụng
              website sau khi cập nhật đồng nghĩa với việc chấp nhận điều khoản mới.
            </p>

            <h2>8. Luật áp dụng</h2>
            <p>
              Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ
              được giải quyết tại Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh.
            </p>

            <h2>9. Liên hệ</h2>
            <ul>
              <li><strong>Email:</strong> {siteConfig.email}</li>
              <li><strong>Hotline:</strong> {siteConfig.phoneDisplay}</li>
              <li><strong>Địa chỉ:</strong> {siteConfig.address.street}, {siteConfig.address.city}</li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
}
