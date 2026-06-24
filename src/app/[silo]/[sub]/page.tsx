import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, serviceJsonLd, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getAllCategorySlugs, getSubcategory } from "@/content/categories";

// Reference price ranges (VND) for vending product categories — drives Product
// schema with AggregateOffer so these landing pages are eligible for Google's
// product rich results. Keep in sync with /may-ban-hang-tu-dong/bang-gia.
const SUB_PRICE_RANGE: Record<string, { lowPrice: number; highPrice: number }> = {
  "may-ban-nuoc-giai-khat": { lowPrice: 40_000_000, highPrice: 120_000_000 },
  "may-ban-do-an-vat": { lowPrice: 60_000_000, highPrice: 150_000_000 },
  "may-ban-hang-lanh": { lowPrice: 80_000_000, highPrice: 200_000_000 },
  "linh-kien-phu-tung": { lowPrice: 500_000, highPrice: 5_000_000 },
};
import { getPostsBySilo } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";
import ProductGallery from "@/components/ProductGallery";
import ArticleCard from "@/components/ArticleCard";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

function normalizeSubSlug(slug: string): string {
  return slug
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-z0-9-]/g, "")
    .toLowerCase();
}

// ── Rich text primitives ───────────────────────────────────────────
type RichSegment = string | { anchor: string; href: string };
type RichParagraph = RichSegment[];

type ContentBlock =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; segs: RichParagraph }
  | { t: "ul"; items: string[] };

function RichPara({ segs }: { segs: RichParagraph }) {
  return (
    <p className="text-sm leading-relaxed text-slate-600">
      {segs.map((seg, i) =>
        typeof seg === "string" ? (
          seg
        ) : (
          <Link key={i} href={seg.href} className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
            {seg.anchor}
          </Link>
        )
      )}
    </p>
  );
}

function Block({ b }: { b: ContentBlock }) {
  if (b.t === "h2") return <h2 className="mt-8 mb-3 text-lg font-extrabold text-slate-900 first:mt-0">{b.text}</h2>;
  if (b.t === "h3") return <h3 className="mt-5 mb-2 text-base font-bold text-slate-800">{b.text}</h3>;
  if (b.t === "p") return <RichPara segs={b.segs} />;
  return (
    <ul className="mt-2 space-y-1.5">
      {b.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Per-subcategory SEO content (H2 / H3 / p / ul) ────────────────
const subContent: Record<string, ContentBlock[]> = {
  "may-ban-nuoc-giai-khat": [
    { t: "h2", text: "Máy bán nước giải khát tự động là gì?" },
    { t: "p", segs: ["Máy bán nước giải khát tự động (beverage vending machine) là thiết bị bán lẻ tự phục vụ chuyên cung cấp đồ uống — từ nước ngọt lon, nước suối chai PET, nước tăng lực đến nước ép trái cây đóng chai — hoạt động liên tục 24/7 mà không cần nhân viên. Hệ thống làm lạnh tích hợp duy trì ổn định 4–10°C, đảm bảo chất lượng sản phẩm ngay khi khách hàng cần."] },
    { t: "h3", text: "Công nghệ làm lạnh và thanh toán hiện đại" },
    { t: "p", segs: ["Dòng máy TSE Vending sử dụng compressor inverter tiết kiệm điện, đạt chuẩn nhiệt độ 4–10°C ngay cả khi môi trường lên 40°C. Hệ thống thanh toán hỗ trợ toàn diện: tiền mặt trả lại thừa tự động, thẻ ngân hàng EMV/NFC contactless, QR VNPay, MoMo, ZaloPay và toàn bộ ngân hàng chuẩn VietQR — không cần tiền lẻ, không cần nhân viên thu ngân. Module IoT cảnh báo tồn kho thấp và lỗi kỹ thuật tức thì qua app."] },

    { t: "h2", text: "Vị trí triển khai tối ưu" },
    { t: "p", segs: ["Thành công của máy bán nước giải khát phụ thuộc trực tiếp vào chất lượng vị trí đặt máy. Các môi trường mang lại ROI tốt nhất:"] },
    { t: "ul", items: [
      "Tòa nhà văn phòng từ 200 nhân viên: 100–200 giao dịch/ngày, doanh thu 8–15 triệu đồng/tháng/máy",
      "Khu công nghiệp có ca đêm: nhu cầu nước cao liên tục khi căng-tin đóng cửa",
      "Ký túc xá đại học 300–500 sinh viên/tòa: tiêu thụ 24/7, ít cạnh tranh ngoài giờ",
      "Sảnh chung cư từ 150 căn: cư dân mua thường xuyên, doanh thu phân bổ đều",
    ]},
    { t: "h3", text: "Ba yếu tố đánh giá tiềm năng vị trí" },
    { t: "p", segs: ["Trước khi đầu tư, cần kiểm tra: (1) lưu lượng người thực tế từ 150/ngày trở lên; (2) không có cửa hàng tiện lợi hoặc quầy nước trong bán kính 50m; (3) nguồn điện ổn định 24/7 với chủ mặt bằng đồng ý cho tiếp điện. TSE Vending thực hiện đánh giá vị trí miễn phí và chỉ đề xuất lắp đặt khi dữ liệu thực địa đảm bảo đủ tiềm năng."] },

    { t: "h2", text: "Hiệu quả đầu tư và thời gian hoàn vốn" },
    { t: "p", segs: ["Chi phí đầu tư máy bán nước giải khát tiêu chuẩn: 25–40 triệu đồng (30–40 khoang, có làm lạnh, thanh toán đa kênh). Tại văn phòng 300 nhân viên với 150 giao dịch/ngày, giá bán trung bình 15.000đ: doanh thu ~67,5 triệu/tháng, sau giá vốn hàng hóa (65%) và điện + bảo trì, lợi nhuận ròng khoảng 2–4 triệu đồng/tháng/máy. Thời gian hoàn vốn trung bình 15–24 tháng tùy vị trí và giá bán."] },

    { t: "h2", text: "Kết hợp với máy khác để tối đa doanh thu" },
    { t: "p", segs: ["TSE Vending hỗ trợ triển khai đồng thời máy bán nước giải khát với ", { anchor: "máy bán snack, đồ ăn vặt tự động", href: "/may-ban-hang-tu-dong/may-ban-do-an-vat" }, " tại cùng vị trí — khách hàng có xu hướng mua kèm, tăng doanh thu tổng mà không tăng chi phí vị trí. Hai máy chạy chung phần mềm quản lý, theo dõi tồn kho và doanh thu trên một dashboard. Xem thêm ", { anchor: "mô hình hợp tác kinh doanh vending", href: "/giai-phap-kinh-doanh" }, " hoặc ", { anchor: "liên hệ để được khảo sát vị trí miễn phí", href: "/lien-he" }, "."] },
  ],

  "may-ban-do-an-vat": [
    { t: "h2", text: "Máy bán snack và đồ ăn vặt tự động là gì?" },
    { t: "p", segs: ["Máy bán snack tự động (snack vending machine) phân phối bánh kẹo, snack đóng gói, mì gói, bánh mì, thanh năng lượng và đồ ăn vặt đa dạng tại điểm tiêu thụ — không cần nhân viên, không cần căng-tin. Hệ thống khay xoắn (spiral coil) kiểm soát chính xác từng lượt xuất hàng, hạn chế kẹt với mọi hình dạng sản phẩm từ túi phồng đến hộp cứng."] },
    { t: "h3", text: "Sức chứa và khả năng quản lý từ xa" },
    { t: "p", segs: ["Mỗi máy chứa 300–400 sản phẩm tùy cấu hình khay. Màn hình cảm ứng hiển thị ảnh và giá bán từng sản phẩm — tỷ lệ chuyển đổi cao hơn bàn phím số thông thường. Giá bán từng khay được cài đặt và thay đổi từ xa qua phần mềm; khuyến mãi theo giờ hoặc theo sản phẩm cập nhật tức thì mà không cần đến tận máy."] },

    { t: "h2", text: "Vị trí phù hợp nhất cho máy bán snack" },
    { t: "ul", items: [
      "Căng-tin nhà máy và khu nghỉ ca: nhân viên cần snack nhanh giờ giải lao 10–15 phút",
      "Trường học và ký túc xá: học sinh, sinh viên tiêu thụ liên tục giờ ra chơi và buổi tối",
      "Phòng chờ bệnh viện: người nhà bệnh nhân cần thực phẩm tiện lợi trong giờ chờ",
      "Văn phòng không có căng-tin: nhân viên cần snack giờ chiều hoặc làm thêm giờ",
    ]},
    { t: "h3", text: "Ưu điểm so với máy bán nước giải khát" },
    { t: "p", segs: ["Doanh thu máy snack ít phụ thuộc thời tiết hơn máy nước giải khát (nhu cầu nước tăng mùa nóng), phân bổ đều hơn trong năm. Biên lợi nhuận/sản phẩm thường cao hơn do giá bán đơn vị lớn hơn và giá vốn thấp hơn tương đối."] },

    { t: "h2", text: "Lợi nhuận và mô hình đầu tư" },
    { t: "p", segs: ["Chi phí đầu tư máy bán snack: 20–35 triệu đồng. Tại căng-tin nhà máy 500 công nhân với 200 giao dịch/ngày, giá bán trung bình 12.000đ: doanh thu ~72 triệu/tháng. Sau giá vốn hàng hóa (60%) và vận hành: lợi nhuận ròng 3–6 triệu đồng/tháng/máy. Mô hình hợp tác chia sẻ doanh thu với nhà máy/trường học phổ biến — chủ mặt bằng nhận 10–15% mà không đầu tư vốn."] },

    { t: "h2", text: "Kết hợp tối ưu với dòng máy khác" },
    { t: "p", segs: ["Kết hợp máy bán snack với ", { anchor: "máy bán nước giải khát tự động", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat" }, " tại cùng vị trí mang lại ROI tổng tốt hơn đáng kể. Xem ", { anchor: "các mô hình hợp tác đầu tư vending linh hoạt", href: "/giai-phap-kinh-doanh" }, " — từ mua trọn gói, chia sẻ doanh thu đến thuê theo tháng. ", { anchor: "Liên hệ để được tư vấn và khảo sát vị trí miễn phí", href: "/lien-he" }, "."] },
  ],

  "may-ban-hang-lanh": [
    { t: "h2", text: "Máy bán hàng lạnh và đông lạnh tự động" },
    { t: "p", segs: ["Máy bán hàng lạnh (refrigerated vending machine) là dòng máy tự phục vụ chuyên phân phối thực phẩm đòi hỏi kiểm soát nhiệt độ: kem que, sữa chua, sandwich, cơm hộp chế biến sẵn, đồ uống có ga lạnh sâu. Hệ thống nén lạnh công nghiệp duy trì dải nhiệt -18°C đến +8°C tùy cấu hình — đảm bảo an toàn thực phẩm tuyệt đối suốt 24/7."] },
    { t: "h3", text: "Hai chế độ nhiệt độ và ứng dụng tương ứng" },
    { t: "p", segs: ["Chế độ mát (2–8°C): phù hợp sandwich, sữa chua, đồ uống có ga. Chế độ đông lạnh (-18 đến -12°C): phù hợp kem, thực phẩm đông lạnh, đá viên. Một số dòng máy TSE Vending hỗ trợ hai khoang nhiệt độ độc lập trong cùng một máy — linh hoạt danh mục mà không tốn thêm diện tích đặt máy."] },

    { t: "h2", text: "Vị trí triển khai hiệu quả nhất" },
    { t: "ul", items: [
      "Bệnh viện và phòng khám: nhân viên y tế ca 24h cần thực phẩm nhanh khi căng-tin đóng",
      "Khu công nghiệp thực phẩm: công nhân quen với suất ăn ca, máy lạnh bổ sung khi hết giờ phân phối",
      "Trường học nội trú và ký túc xá: sinh viên cần đồ ăn tối muộn và sáng sớm",
      "Phòng gym và trung tâm thể thao: nhu cầu protein bar, sữa phục hồi sau tập",
    ]},
    { t: "h3", text: "Chi phí đầu tư và thời gian hoàn vốn" },
    { t: "p", segs: ["Chi phí đầu tư máy lạnh cao hơn máy thường (35–65 triệu đồng) do hệ thống làm lạnh phức tạp hơn. Tuy nhiên, giá bán đơn vị cao hơn (kem, cơm hộp chế biến sẵn giá 25.000–60.000đ/sản phẩm) bù đắp chi phí đầu tư, thời gian hoàn vốn 18–30 tháng tại vị trí tốt. Tiêu thụ điện cao hơn máy thường khoảng 30–40% — cần tính vào chi phí vận hành."] },

    { t: "h2", text: "Tích hợp vào hệ sinh thái vending" },
    { t: "p", segs: ["Máy lạnh thường triển khai kết hợp với ", { anchor: "máy bán nước giải khát", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat" }, " và ", { anchor: "máy bán snack đồ ăn vặt", href: "/may-ban-hang-tu-dong/may-ban-do-an-vat" }, " để tạo góc tiện lợi hoàn chỉnh — khách hàng không cần rời địa điểm để tìm thực phẩm. Toàn bộ cụm máy quản lý trên một phần mềm. Xem ", { anchor: "giải pháp kinh doanh vending", href: "/giai-phap-kinh-doanh" }, " hoặc ", { anchor: "liên hệ để được đề xuất cấu hình phù hợp", href: "/lien-he" }, "."] },
  ],

  "may-ban-gas": [
    { t: "h2", text: "Máy bán gas tự động — giải pháp mua gas 24/7" },
    { t: "p", segs: ["Máy bán gas tự động giải quyết nhu cầu mua bình gas mini (230g–500g) ngoài giờ hành chính — khi đại lý đóng cửa tối muộn, cuối tuần và ngày lễ. Thiết kế khoang chứa đạt chuẩn an toàn PCCC, cơ chế xuất hàng cơ học chắc chắn, không dùng điện tại khoang chứa — đảm bảo an toàn tuyệt đối trong điều kiện vận hành liên tục."] },
    { t: "h3", text: "Đặc điểm kỹ thuật và tiêu chuẩn an toàn" },
    { t: "p", segs: ["Máy bán gas TSE Vending đáp ứng tiêu chuẩn TCVN về lưu trữ và phân phối LPG chai nhỏ: khoang chứa cách điện hoàn toàn, thông gió tự nhiên theo quy định, cảm biến rò rỉ gas kích hoạt khóa van tự động. Vị trí đặt máy cần tuân thủ khoảng cách an toàn theo QCVN — TSE Vending hỗ trợ tư vấn lựa chọn vị trí đúng quy định và phối hợp với đơn vị PCCC khi cần thiết."] },

    { t: "h2", text: "Vị trí phù hợp và tiềm năng kinh doanh" },
    { t: "ul", items: [
      "Sảnh chung cư từ 200 căn: cư dân mua gas mini thường xuyên, ít cạnh tranh trong tòa nhà",
      "Khu dân cư mật độ cao: đại lý gas không phủ hết giờ, máy bù đắp thời gian ngoài giờ",
      "Siêu thị mini và cửa hàng tiện lợi: mở rộng danh mục thiết yếu mà không cần thêm nhân viên",
      "Khu nhà trọ đông người: nhu cầu gas mini ổn định, ít đầu tư tiếp thị",
    ]},
    { t: "h3", text: "Tính ổn định doanh thu so với máy thực phẩm" },
    { t: "p", segs: ["Nhu cầu gas nấu ăn ổn định quanh năm, không phụ thuộc thời tiết hay mùa vụ — doanh thu phân bổ đều hơn máy nước giải khát (tăng mùa nóng) hay máy snack (tăng dịp lễ). Tần suất mua lặp lại cao: hộ gia đình dùng 1–3 bình mini/tháng, tạo nguồn khách hàng trung thành tự nhiên."] },

    { t: "h2", text: "Kết hợp và mô hình hợp tác" },
    { t: "p", segs: ["Máy bán gas thường triển khai song song với ", { anchor: "máy bán nước giải khát tự động", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat" }, " tại cùng sảnh chung cư — tận dụng một điểm đặt để phục vụ nhiều nhu cầu thiết yếu. Tìm hiểu ", { anchor: "mô hình hợp tác chia sẻ doanh thu", href: "/giai-phap-kinh-doanh" }, " phù hợp cho chủ mặt bằng không muốn đầu tư vốn thiết bị. ", { anchor: "Liên hệ để được tư vấn và khảo sát an toàn miễn phí", href: "/lien-he" }, "."] },
  ],

  "linh-kien-phu-tung": [
    { t: "h2", text: "Linh kiện và phụ tùng thay thế chính hãng cho máy vending" },
    { t: "p", segs: ["Downtime (máy ngừng hoạt động) là kẻ thù lớn nhất của nhà đầu tư vending machine. Linh kiện chính hãng với đúng thông số kỹ thuật giúp phục hồi máy nhanh hơn, tránh hỏng hóc dây chuyền do linh kiện không tương thích. TSE Vending cung cấp toàn bộ linh kiện thiết yếu cho các dòng máy phổ biến tại Việt Nam."] },
    { t: "h3", text: "Danh mục linh kiện cung cấp" },
    { t: "ul", items: [
      "Bo mạch điều khiển chính (MCU board / main control board)",
      "Đầu đọc thẻ ngân hàng EMV chip và NFC contactless",
      "Đầu đọc QR code và module thanh toán VietQR",
      "Motor vít xoắn (spiral motor) các kích thước khay",
      "Block máy nén lạnh và van tiết lưu cho dòng máy có làm lạnh",
      "Màn hình cảm ứng (7\" và 10\") thay thế",
      "Bộ nguồn (PSU) 12V/24V và biến áp",
      "Cảm biến hàng, cảm biến cửa và công tắc hành trình",
    ]},

    { t: "h2", text: "Tại sao nên dự phòng linh kiện tại chỗ?" },
    { t: "p", segs: ["Với chuỗi từ 5 máy trở lên, dự phòng 1–2 bộ linh kiện thường xảy ra hỏng tại chỗ (motor, board điều khiển) giúp giảm thời gian máy ngừng từ 3–7 ngày (chờ đặt hàng + vận chuyển) xuống còn vài giờ. Với máy đặt tại vị trí doanh thu 10 triệu/tháng, 1 ngày ngừng hoạt động = mất ~333.000đ doanh thu — chi phí dự phòng linh kiện thường hoàn lại trong 1–2 sự cố."] },
    { t: "h3", text: "Chẩn đoán lỗi từ xa trước khi đặt linh kiện" },
    { t: "p", segs: ["Hệ thống IoT trên máy TSE Vending ghi nhận mã lỗi cụ thể theo chuẩn NRI/MEI — đội kỹ thuật chẩn đoán lỗi từ xa và xác nhận chính xác linh kiện cần thay trước khi bạn đặt hàng, tránh mua nhầm gây lãng phí chi phí và thời gian."] },

    { t: "h2", text: "Hỗ trợ kỹ thuật và đặt linh kiện" },
    { t: "p", segs: ["Ưu tiên hỗ trợ nhanh cho đối tác đang vận hành ", { anchor: "máy bán nước giải khát", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat" }, ", ", { anchor: "máy bán snack", href: "/may-ban-hang-tu-dong/may-ban-do-an-vat" }, " và ", { anchor: "máy bán hàng lạnh TSE Vending", href: "/may-ban-hang-tu-dong/may-ban-hang-lanh" }, ". Cũng hỗ trợ linh kiện tương thích cho một số dòng máy thương hiệu khác — xác nhận tương thích trước khi đặt. ", { anchor: "Liên hệ kỹ thuật TSE Vending", href: "/lien-he" }, " với mã máy và triệu chứng lỗi để được tư vấn nhanh nhất."] },
  ],

  "tu-locker-chung-cu": [
    { t: "h2", text: "Tủ locker thông minh chung cư — nhận hàng hộ cư dân 24/7" },
    { t: "p", segs: ["Tủ locker thông minh tại sảnh chung cư giải quyết bài toán nhận hàng hộ — vấn đề ngày càng nghiêm trọng khi sản lượng đơn thương mại điện tử tăng vọt và bảo vệ không thể xử lý hàng chục đến hàng trăm kiện mỗi ngày. Cư dân nhận thông báo tức thì qua app hoặc SMS khi có bưu phẩm, tự lấy bằng QR hoặc PIN bất kỳ lúc — không cần chờ giờ hành chính, không cần gặp bảo vệ."] },
    { t: "h3", text: "Quy trình nhận hàng không tiếp xúc" },
    { t: "ul", items: [
      "Shipper quét mã dự án → chọn ô phù hợp kích thước kiện hàng → đặt vào ô",
      "Hệ thống ghi nhận giao thành công tức thì → gửi mã nhận đến cư dân qua SMS/Zalo/app",
      "Cư dân quét QR hoặc nhập PIN 6 số → ô mở tự động → lấy hàng",
      "Toàn bộ quá trình ghi log với timestamp — bảo vệ quyền lợi cả shipper lẫn cư dân",
    ]},

    { t: "h2", text: "Lợi ích vận hành cho ban quản lý" },
    { t: "p", segs: ["Tại chung cư 300 căn nhận trung bình 80–100 kiện/ngày, tủ locker giúp bảo vệ tiết kiệm 2–3 giờ công mỗi ngày — không còn ký nhận từng kiện, bảo quản và thông báo thủ công cho cư dân. Tỷ lệ phàn nàn về thất lạc bưu phẩm giảm về gần 0 do mỗi giao dịch có ảnh và log đầy đủ."] },
    { t: "h3", text: "Cấu hình ô tủ theo lưu lượng thực tế" },
    { t: "p", segs: ["Tỷ lệ ô theo kích thước khuyến nghị cho chung cư phổ thông: S (phong bì, phụ kiện nhỏ) 20%, M (giày, quần áo) 50%, L (đồ gia dụng nhỏ) 25%, XL (thùng carton) 5%. Tỷ lệ thực tế điều chỉnh theo đặc điểm cư dân (chung cư cao cấp có nhiều đơn XL hơn). TSE Vending phân tích dữ liệu đơn hàng 2–4 tuần để đề xuất cấu hình chính xác."] },

    { t: "h2", text: "Tích hợp và mở rộng" },
    { t: "p", segs: ["Tủ locker chung cư có thể kết hợp với ", { anchor: "hệ thống giao nhận hàng logistics", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang" }, " nếu tòa nhà muốn trở thành điểm nhận hàng công cộng cho shipper GHN, GHTK, J&T. Xem thêm ", { anchor: "toàn bộ dòng tủ locker thông minh", href: "/tu-locker-thong-minh" }, " hoặc ", { anchor: "liên hệ để được khảo sát sảnh và báo giá", href: "/lien-he" }, "."] },

    { t: "h2", text: "Dự án thực tế: Chung cư Vinhomes Grand Park" },
    { t: "p", segs: ["TSE Vending đã triển khai hệ thống tủ locker nhận hàng thông minh tại chung cư Vinhomes Grand Park (TP. Thủ Đức, TP.HCM). Cư dân nhận bưu phẩm tự động 24/7 bằng mã QR/PIN, bảo vệ không còn phải ký nhận và bảo quản hộ từng kiện hàng. Đại diện Ban Quản Lý chia sẻ: hệ thống hoạt động ổn định từ khi lắp đặt, đội kỹ thuật TSE phản hồi nhanh khi có sự cố nhỏ — đúng với cam kết vận hành trọn gói của TSE Vending."] },
  ],

  "tu-locker-van-phong": [
    { t: "h2", text: "Tủ locker thông minh văn phòng và khu công nghiệp" },
    { t: "p", segs: ["Tủ locker thông minh thay thế hoàn toàn tủ cá nhân cơ truyền thống — vốn tốn kém về quản lý chìa khóa: làm thêm chìa, thay ổ khi nhân viên nghỉ, xử lý tranh chấp khi mất đồ mà không có lịch sử truy cập. Với locker thông minh, mọi lần mở/đóng được ghi nhận đầy đủ ID nhân viên và timestamp — quản trị viên xem lịch sử bất kỳ lúc qua dashboard web."] },
    { t: "h3", text: "Tích hợp thẻ RFID nhân viên sẵn có" },
    { t: "p", segs: ["Điểm mạnh nhất của locker văn phòng TSE Vending: tích hợp thẻ RFID chấm công sẵn có — nhân viên dùng một thẻ cho cả kiểm soát ra vào, chấm công và mở tủ cá nhân. Không cần phát thêm thẻ hay khóa. Quản trị viên phân quyền ô tủ theo phòng ban, dự án hoặc ca làm từ giao diện web, cập nhật tức thì không cần đến tận nơi."] },

    { t: "h2", text: "Ứng dụng trong khu công nghiệp quy mô lớn" },
    { t: "p", segs: ["Nhà máy 1.000 công nhân làm 3 ca sẽ thấy ngay hiệu quả: mỗi ca nhận quyền truy cập ô tủ theo lịch ca, tự động hết quyền khi ca kết thúc — bảo vệ không cần quản lý thêm bất kỳ thao tác nào. Dữ liệu truy cập đầy đủ hỗ trợ điều tra sự cố mất tài sản và quản lý đồ dùng bảo hộ lao động cá nhân."] },
    { t: "ul", items: [
      "Loại bỏ hoàn toàn rủi ro mất chìa, sao chép chìa trái phép",
      "Tự động reset quyền sau mỗi ca — không cần thu hồi thẻ hay khóa",
      "Báo cáo truy cập tự động theo ca, theo phòng ban",
      "Tích hợp với phần mềm HRM hiện có qua API",
    ]},

    { t: "h2", text: "Thiết kế và lựa chọn cấu hình" },
    { t: "p", segs: ["Văn phòng 100 nhân viên thường cần 80–100 ô (S và M), ưu tiên xác thực thẻ RFID. Nhà máy 500+ công nhân cần 400–600 ô với hệ thống phân vùng theo ca. Xem thêm ", { anchor: "tủ gửi đồ thông minh cho khu vực công cộng", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh" }, " nếu cần locker cho khách vãng lai. ", { anchor: "Liên hệ để được thiết kế cấu hình và báo giá chi tiết", href: "/lien-he" }, "."] },
  ],

  "tu-gui-do-thong-minh": [
    { t: "h2", text: "Tủ gửi đồ thông minh tự phục vụ là gì?" },
    { t: "p", segs: ["Tủ gửi đồ thông minh (self-service locker) phục vụ người dùng ngắn hạn trong không gian đông người: trường học (học sinh gửi đồ theo buổi), trung tâm thương mại (khách gửi trước khi mua sắm), gym và hồ bơi (gửi tài sản trong lúc tập), sân bay và bến tàu (hành khách gửi hành lý theo giờ). Không cần đăng ký trước, không cần chìa khóa — toàn bộ quy trình hoàn tất trong 20 giây."] },
    { t: "h3", text: "Quy trình gửi đồ trong 20 giây" },
    { t: "ul", items: [
      "Người dùng chọn ô trống trên màn hình cảm ứng — hệ thống hiển thị ô gần nhất phù hợp kích thước",
      "Đặt đồ vào ô → hệ thống cấp mã QR hoặc PIN 6 số qua màn hình hoặc SMS",
      "Lấy đồ bằng cách quét QR hoặc nhập PIN — ô mở tức thì",
      "Tùy cài đặt: miễn phí, miễn phí X phút rồi thu phí, hoặc thu phí ngay từ đầu theo giờ",
    ]},

    { t: "h2", text: "Mô hình thu phí và quản lý vận hành" },
    { t: "p", segs: ["Tủ gửi đồ có thể vận hành miễn phí (như tiện ích cơ sở vật chất) hoặc thu phí để tạo nguồn doanh thu phụ. Chính sách phí cài đặt hoàn toàn từ dashboard — thay đổi theo giờ trong ngày, theo ngày lễ hoặc theo khu vực tủ mà không cần kỹ thuật viên đến tận nơi. Tích hợp thanh toán QR MoMo/VNPay cho tủ thu phí."] },
    { t: "h3", text: "Quản lý ô quá hạn và thông báo tự động" },
    { t: "p", segs: ["Tủ gửi đồ tại TTTM và sân bay thường gặp vấn đề ô bị chiếm quá lâu. Dashboard TSE Vending cảnh báo tự động khi ô quá thời hạn; quản trị viên có thể mở từ xa sau thời gian cài đặt (ví dụ: tự động mở sau 24h và chụp ảnh đồ bên trong để lưu bằng chứng)."] },

    { t: "h2", text: "So sánh với các loại locker khác" },
    { t: "p", segs: ["Khác với ", { anchor: "tủ locker văn phòng", href: "/tu-locker-thong-minh/tu-locker-van-phong" }, " (phân quyền cố định theo nhân viên), tủ gửi đồ vận hành theo chế độ first-come-first-served — ai đến trước lấy ô trước, mã hết hạn sau thời gian cài đặt. Xem thêm ", { anchor: "toàn bộ dòng tủ locker thông minh", href: "/tu-locker-thong-minh" }, " hoặc ", { anchor: "liên hệ để được thiết kế cụm tủ phù hợp lưu lượng và chính sách", href: "/lien-he" }, "."] },
  ],

  "tu-locker-giao-nhan-hang": [
    { t: "h2", text: "Tủ locker giao nhận hàng (Parcel Locker) — logistics cuối chặng" },
    { t: "p", segs: ["Tủ locker giao nhận hàng thay thế hình thức giao tận tay vốn tốn kém và tỷ lệ thất bại cao (không có người nhận, giao lại 2–3 lần). Shipper giao hàng vào tủ một lần, người nhận tự lấy 24/7 — tỷ lệ giao thành công gần 100% mà không cần gặp mặt trực tiếp, không cần điều phối lịch giao lại."] },
    { t: "h3", text: "Tích hợp API với nền tảng vận đơn" },
    { t: "p", segs: ["TSE Vending tích hợp trực tiếp với API quản lý vận đơn: khi shipper nạp hàng vào tủ thành công, hệ thống tự cập nhật trạng thái \"Đã giao vào tủ\" lên nền tảng và gửi mã lấy hàng cho người nhận qua SMS/Zalo/email — không cần thao tác thủ công từ bất kỳ bên nào. Hiện hỗ trợ tích hợp GHN, GHTK, J&T Express, Shopee Express và Ninja Van."] },

    { t: "h2", text: "Vị trí lắp đặt tối ưu" },
    { t: "ul", items: [
      "Sảnh chung cư kết hợp tủ locker nhận hàng cư dân — tăng gấp đôi giá trị điểm đặt",
      "Siêu thị và cửa hàng tiện lợi — điểm nhận hàng cho khu dân cư xung quanh",
      "Trụ sở doanh nghiệp lớn — nhân viên nhận đơn cá nhân mà không cần về sớm",
      "Trường đại học — sinh viên nhận hàng linh hoạt theo thời khóa biểu",
      "Trạm xăng và trạm nghỉ cao tốc — điểm nhận hàng trên trục giao thông lớn",
    ]},
    { t: "h3", text: "Mô hình kinh doanh cho chủ mặt bằng" },
    { t: "p", segs: ["Chủ mặt bằng có thể thu phí dịch vụ từ đơn vị vận chuyển (1.500–3.000đ/lần giao) hoặc từ người nhận (phí lưu trữ nếu không lấy sau 48h). Tùy mô hình, tủ locker giao nhận hàng có thể hoàn vốn trong 12–24 tháng từ doanh thu phí dịch vụ. Xem ", { anchor: "mô hình hợp tác đầu tư locker", href: "/giai-phap-kinh-doanh" }, " hoặc ", { anchor: "liên hệ để được tư vấn tích hợp API", href: "/lien-he" }, "."] },
  ],

  "tu-locker-truong-hoc-dai-hoc": [
    { t: "h2", text: "Tủ locker thông minh cho trường học và đại học" },
    { t: "p", segs: ["Tủ locker thông minh trong môi trường giáo dục giải quyết đồng thời ba vấn đề: bảo vệ tài sản học sinh và sinh viên, giảm gánh nặng quản lý chìa khóa cho nhà trường, và nâng cấp cơ sở vật chất đáp ứng tiêu chuẩn môi trường học tập hiện đại. Học sinh xác thực bằng thẻ học sinh RFID sẵn có — một thẻ cho nhiều mục đích, không phát thêm thiết bị."] },
    { t: "h3", text: "Phân quyền tự động theo học kỳ" },
    { t: "p", segs: ["Đầu mỗi học kỳ, nhà trường nhập danh sách và phân ô tủ theo lớp, khoa hoặc khu ký túc xá — thao tác hàng loạt qua file Excel, không cần nhập tay từng học sinh. Cuối học kỳ, quyền truy cập tự động hết hạn và sẵn sàng phân bổ lại — không cần thu hồi chìa hay gia hạn thủ công. Dashboard cảnh báo ô tủ quá hạn chưa dọn đồ trước kỳ mới."] },

    { t: "h2", text: "Tính năng phù hợp đặc thù trường học" },
    { t: "ul", items: [
      "Giao diện đa ngôn ngữ (Việt, Anh, Trung) cho trường quốc tế và học sinh nước ngoài",
      "Chế độ giám sát phụ huynh: thông báo khi con mở/đóng tủ theo giờ học",
      "Phân quyền theo ca học (sáng/chiều) — tự động reset giữa ca",
      "Xuất báo cáo sử dụng theo tháng phục vụ kiểm tra cơ sở vật chất",
      "Tùy chọn camera giám sát tích hợp tại khu vực tủ",
    ]},

    { t: "h2", text: "Kết hợp với tủ gửi đồ khu thể thao" },
    { t: "p", segs: ["Trường có phòng gym hoặc hồ bơi có thể kết hợp ", { anchor: "tủ gửi đồ thông minh", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh" }, " tại khu thể thao — phục vụ học sinh gửi tài sản trong lúc tập, tách biệt với hệ thống tủ học. Hai khu chạy trên cùng phần mềm, quản trị viên theo dõi tập trung. Xem ", { anchor: "toàn bộ dòng tủ locker thông minh", href: "/tu-locker-thong-minh" }, " hoặc ", { anchor: "liên hệ để được tư vấn chương trình hợp tác giáo dục", href: "/lien-he" }, "."] },

    { t: "h2", text: "Dự án thực tế: Trường Đại học Kinh tế TP.HCM" },
    { t: "p", segs: ["TSE Vending đã lắp đặt tủ gửi đồ thông minh tại khu thể thao của Trường Đại học Kinh tế TP.HCM. Sinh viên xác thực bằng mã/app để gửi đồ trong lúc tập luyện, không còn tình trạng mất đồ hay thất lạc chìa khóa như tủ cơ truyền thống. Đại diện bộ phận cơ sở vật chất cho biết sinh viên đón nhận rất tích cực và việc quản lý qua app rất tiện, không cần bố trí nhân viên trực — đúng tinh thần vận hành tự động của smart locker."] },
  ],

  "tu-locker-khach-san-resort": [
    { t: "h2", text: "Tủ locker thông minh cho khách sạn và resort" },
    { t: "p", segs: ["Tủ locker thông minh tại khách sạn giải quyết trải nghiệm lưu hành lý sau check-out — thời điểm khách trả phòng 12h nhưng chuyến bay 22h, phụ thuộc hoàn toàn vào lễ tân và tạo điểm nghẽn dịch vụ trong giờ cao điểm. Với locker tự phục vụ, khách nhận mã OTP cá nhân, gửi và lấy hành lý bất kỳ lúc — không cần nhân viên can thiệp, không xếp hàng tại quầy."] },
    { t: "h3", text: "Tích hợp PMS khách sạn" },
    { t: "p", segs: ["Hệ thống tích hợp với PMS (Property Management System) thông dụng: Cloudbeds, Opera, Mews. Khi khách check-in, tài khoản locker kích hoạt tự động theo thời gian lưu trú. Check-out = quyền truy cập ngăn tủ cá nhân hết hạn, chuyển sang quyền lưu hành lý hạn chế. Toàn bộ quy trình không cần thao tác thủ công từ lễ tân."] },

    { t: "h2", text: "Cấu hình phù hợp theo hạng sao" },
    { t: "ul", items: [
      "Khách sạn 3 sao (50–100 phòng): cụm 30–50 ô S/M/L, giao diện tiếng Việt + Anh, PIN/QR",
      "Khách sạn 4–5 sao: bổ sung vân tay, giao diện 4+ ngôn ngữ, camera tích hợp, ốp vật liệu cao cấp",
      "Resort có bãi tắm/bể bơi: thêm khu tủ gửi đồ theo giờ cho khu vui chơi ngoài trời",
      "Chuỗi khách sạn: đồng bộ quản lý toàn chuỗi trên một dashboard trung tâm",
    ]},

    { t: "h2", text: "Tăng điểm đánh giá và giảm tải nhân sự" },
    { t: "p", segs: ["Resort có khu tắm biển hoặc spa có thể kết hợp ", { anchor: "tủ gửi đồ thông minh", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh" }, " cho khu vực hoạt động ngoài trời — phục vụ khách gửi đồ giá trị trong lúc tham gia hoạt động, tách biệt với khu lưu hành lý chính. Xem thêm ", { anchor: "các mô hình hợp tác đầu tư tủ locker", href: "/giai-phap-kinh-doanh" }, " hoặc ", { anchor: "liên hệ để được tư vấn giải pháp theo tiêu chuẩn khách sạn", href: "/lien-he" }, "."] },
  ],

  "tu-locker-sieu-thi-banlẻ": [
    { t: "h2", text: "Tủ gửi đồ thông minh tự phục vụ cho siêu thị và bán lẻ" },
    { t: "p", segs: ["Tủ gửi đồ thông minh tại siêu thị loại bỏ điểm nghẽn tại quầy gửi đồ truyền thống — nơi khách xếp hàng chờ nhân viên, nhận phiếu giấy và trình phiếu khi ra về. Toàn bộ quy trình tự phục vụ hoàn tất trong 20 giây: chọn ô → đặt đồ → nhận mã QR → quét khi ra về. Không cần nhân viên gửi đồ, không cần quản lý phiếu."] },
    { t: "h3", text: "Dashboard quản lý chuỗi tập trung" },
    { t: "p", segs: ["Hệ thống hỗ trợ chuỗi siêu thị: toàn bộ chi nhánh đồng bộ trên một giao diện quản lý duy nhất. Báo cáo tỷ lệ lấp đầy, thời gian gửi trung bình, ô tủ quá hạn và doanh thu phí (nếu thu) tổng hợp tự động theo ngày/tuần/tháng. Thay đổi chính sách phí đồng loạt toàn chuỗi trong vài giây từ trụ sở trung tâm."] },

    { t: "h2", text: "Mô hình thu phí linh hoạt theo chính sách" },
    { t: "ul", items: [
      "Miễn phí hoàn toàn: định vị là tiện ích hỗ trợ trải nghiệm mua sắm",
      "Miễn phí 3 giờ đầu, thu phí giờ tiếp theo: khuyến khích mua hàng và xoay vòng ô tủ nhanh",
      "Thu phí theo giờ từ đầu: tạo nguồn doanh thu phụ, phổ biến tại TTTM và sân bay",
      "Tất cả thay đổi từ dashboard — không cần kỹ thuật viên đến tận nơi",
    ]},

    { t: "h2", text: "Tích hợp click-and-collect và mở rộng dịch vụ" },
    { t: "p", segs: ["Siêu thị có chiến lược omnichannel có thể kết hợp với ", { anchor: "tủ locker giao nhận hàng", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang" }, " để tạo điểm nhận đơn trực tuyến ngay tại cửa hàng (click-and-collect). Khách mua online → nhận thông báo hàng sẵn tại tủ → đến lấy bất kỳ lúc. Xem ", { anchor: "toàn bộ dòng tủ locker thông minh", href: "/tu-locker-thong-minh" }, " hoặc ", { anchor: "liên hệ để nhận demo và báo giá cho chuỗi", href: "/lien-he" }, "."] },
  ],

  "tu-locker-benh-vien-y-te": [
    { t: "h2", text: "Tủ locker thông minh cho bệnh viện và cơ sở y tế" },
    { t: "p", segs: ["Môi trường y tế đặt ra yêu cầu đặc thù mà locker thông minh thông thường không đáp ứng được: bề mặt phải kháng khuẩn và chịu vệ sinh bằng hóa chất cồn 70%, cơ chế mở không chạm để giảm nguy cơ lây nhiễm chéo, và phân vùng rõ ràng theo chức năng. Tủ locker y tế TSE Vending đáp ứng đầy đủ các yêu cầu này."] },
    { t: "h3", text: "Vật liệu và tiêu chuẩn kháng khuẩn" },
    { t: "ul", items: [
      "Bề mặt thép sơn tĩnh điện kháng khuẩn ion bạc — chịu lau rửa cồn 70% và dung dịch khử khuẩn",
      "Khóa điện từ inox 304 không bị ăn mòn bởi hóa chất vệ sinh y tế",
      "Mở khóa QR code hoặc vân tay — loại bỏ bề mặt tiếp xúc vật lý (bàn phím số)",
      "Khe thông gió thiết kế ngăn tích tụ độ ẩm và vi khuẩn bên trong ô tủ",
      "Tùy chọn đèn UV-C tích hợp khử trùng tự động theo lịch cài đặt",
    ]},

    { t: "h2", text: "Phân vùng theo nhóm người dùng" },
    { t: "p", segs: ["Bệnh viện lớn cần phân vùng rõ ràng: khu nhân viên y tế (bác sĩ, điều dưỡng theo ca), khu bệnh nhân nội trú (lưu trữ đồ theo số phòng/giường bệnh), khu người nhà (tạm lưu trong giờ thăm bệnh). Ba khu chạy trên cùng nền tảng phần mềm nhưng hoàn toàn tách biệt về quyền truy cập và thời hạn sử dụng."] },
    { t: "h3", text: "Tự động hóa quản lý ca trực y tế" },
    { t: "p", segs: ["Nhân viên y tế vào phòng vô trùng hoặc ICU cần gửi tất cả đồ cá nhân — tủ locker tích hợp với hệ thống lịch ca: khi ca trực bắt đầu, ô tủ được gán tự động; khi ca kết thúc, nhân viên lấy đồ và ô tủ reset về trạng thái sẵn sàng cho ca tiếp theo. Không cần admin can thiệp thủ công giữa các ca."] },

    { t: "h2", text: "Triển khai và hỗ trợ" },
    { t: "p", segs: ["TSE Vending có kinh nghiệm triển khai tại bệnh viện và phòng khám — hiểu rõ quy trình nghiệm thu cơ sở vật chất y tế và phối hợp với bộ phận kiểm soát nhiễm khuẩn. Xem thêm ", { anchor: "toàn bộ dòng tủ locker thông minh", href: "/tu-locker-thong-minh" }, " hoặc ", { anchor: "liên hệ để được tư vấn giải pháp phù hợp tiêu chuẩn cơ sở y tế", href: "/lien-he" }, "."] },

    { t: "h2", text: "Dự án thực tế: Bệnh viện Đa khoa tư nhân TP.HCM" },
    { t: "p", segs: ["TSE Vending đã triển khai tủ locker khu nhân viên y tế tại một bệnh viện đa khoa tư nhân ở TP.HCM, đáp ứng đúng tiêu chuẩn bề mặt chống khuẩn như cam kết. Nhân viên y tế lưu trữ đồ cá nhân an toàn trong ca trực dài, mở khóa không chạm để giảm nguy cơ lây nhiễm chéo. Đại diện vận hành bệnh viện đánh giá nhân viên rất hài lòng và yên tâm về tài sản cá nhân — minh chứng cho năng lực triển khai trong môi trường y tế đặc thù của TSE."] },
  ],
};

const investmentTierMeta: Record<string, { label: string; color: string; desc: string }> = {
  "Thấp": { label: "Vốn thấp", color: "text-emerald-700 bg-emerald-50 border-emerald-200", desc: "Phù hợp nhà đầu tư mới hoặc muốn thử nghiệm với rủi ro tài chính thấp." },
  "Trung bình": { label: "Vốn trung bình", color: "text-amber-700 bg-amber-50 border-amber-200", desc: "Cân bằng giữa chi phí và tiềm năng sinh lời." },
  "Cao": { label: "Vốn cao", color: "text-red-700 bg-red-50 border-red-200", desc: "Dành cho nhà đầu tư dài hạn tại vị trí lưu lượng lớn." },
};

export function generateStaticParams() {
  return getAllCategorySlugs()
    .filter((e) => e.sub)
    .map((e) => ({ silo: e.silo, sub: e.sub as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ silo: string; sub: string }> }): Promise<Metadata> {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) return {};
  const { sub } = result;
  return buildMetadata({ title: sub.metaTitle, description: sub.metaDescription, path: `/${siloSlug}/${subSlug}` });
}

export default async function SubCategoryPage({ params }: { params: Promise<{ silo: string; sub: string }> }) {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) notFound();
  const { silo, sub } = result;

  const posts = getPostsBySilo(silo.slug, sub.slug).slice(0, 6);
  const siblings = silo.subcategories.filter((s) => s.slug !== sub.slug);
  const tier = investmentTierMeta[sub.investmentTier] ?? investmentTierMeta["Trung bình"];
  const blocks = subContent[sub.slug] ?? null;

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: sub.title, description: sub.metaDescription, path: `/${silo.slug}/${sub.slug}` })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: silo.title, path: `/${silo.slug}` },
          { name: sub.shortTitle, path: `/${silo.slug}/${sub.slug}` },
        ])}
      />
      <JsonLd
        data={productJsonLd({
          name: sub.title,
          description: sub.metaDescription,
          path: `/${silo.slug}/${sub.slug}`,
          ...(SUB_PRICE_RANGE[sub.slug] ?? {}),
        })}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-900/80 via-brand-950 to-brand-950" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute right-8 top-8 h-64 w-64 rounded-full bg-brand-700/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6">
          <div className="mb-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Trang chủ</Link>
            <span>/</span>
            <Link href={`/${silo.slug}`} className="transition-colors hover:text-white/80">{silo.title}</Link>
            <span>/</span>
            <span className="text-white/70">{sub.shortTitle}</span>
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-400">{silo.title}</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{sub.h1}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{sub.intro[0]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold ${tier.color}`}>{tier.label}</span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">{sub.idealFor.split(",")[0]}</span>
            <Link href="/lien-he" className="inline-flex items-center rounded-full bg-accent-500 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-accent-600">
              Nhận báo giá →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GALLERY ── */}
      <ProductGallery title={sub.title} siloSlug={silo.slug} subSlug={sub.slug} />

      {/* ── MAIN ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Content column */}
            <div className="lg:col-span-2">
              {/* Short intro from categories.ts */}
              {sub.intro.length > 1 && (
                <div className="prose prose-slate max-w-none text-sm">
                  {sub.intro.slice(1).map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                </div>
              )}

              {/* SEO structured content (H2 / H3 / p / ul) */}
              {blocks && (
                <div className="mt-6">
                  {blocks.map((b, i) => <Block key={i} b={b} />)}
                </div>
              )}

              {/* Features */}
              <h2 className="mt-10 mb-5 text-xl font-extrabold text-slate-900">
                Tính năng nổi bật của {sub.title.toLowerCase()}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {sub.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                    <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Phù hợp nhất với</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{sub.idealFor}</p>
              </div>

              <div className={`rounded-2xl border p-5 ${tier.color}`}>
                <p className="text-xs font-bold uppercase tracking-wider">Mức đầu tư</p>
                <p className="mt-1 text-base font-extrabold">{tier.label}</p>
                <p className="mt-2 text-xs leading-relaxed">{tier.desc}</p>
              </div>

              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <p className="text-sm font-bold text-accent-900">Nhận báo giá {sub.shortTitle.toLowerCase()}</p>
                <p className="mt-2 text-xs leading-relaxed text-accent-800">Tư vấn và khảo sát vị trí miễn phí — không phát sinh chi phí.</p>
                <Link href="/lien-he" className="mt-4 block rounded-xl bg-accent-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-accent-600">
                  Liên hệ ngay →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Cùng nhóm {silo.shortTitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${silo.slug}/${s.slug}`} className="flex items-center gap-2 text-sm text-brand-700 hover:underline">
                        <span>{s.icon}</span>
                        <span>{s.shortTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/${silo.slug}`} className="mt-5 inline-block text-xs font-semibold text-brand-600 hover:underline">
                  ← Toàn bộ {silo.title.toLowerCase()}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT AUDIENCE ── */}
      <section className="border-t border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900">Ai nên đầu tư {sub.title.toLowerCase()}?</h2>
          <p className="mb-8 max-w-3xl text-slate-600">Phù hợp với nhiều đối tượng — từ doanh nghiệp nâng cao tiện ích nội bộ đến nhà đầu tư tìm nguồn thu nhập thụ động ổn định.</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Chủ mặt bằng & ban quản lý tòa nhà",
                desc: `${sub.title} là tiện ích gia tăng giúp nâng chất lượng dịch vụ mà không cần nhân sự vận hành thêm. Nhiều chủ mặt bằng chọn hợp tác chia sẻ doanh thu với TSE Vending — không cần bỏ vốn đầu tư.`,
              },
              {
                title: "Nhà đầu tư cá nhân",
                desc: `Mô hình kinh doanh bán thụ động phù hợp cá nhân có vốn nhàn rỗi và muốn có thêm thu nhập mà không cần trông coi liên tục. Yêu cầu chính là tìm được vị trí tốt và chọn đúng cấu hình.`,
              },
              {
                title: "Doanh nghiệp nâng cao phúc lợi",
                desc: `Nhiều doanh nghiệp đầu tư ${sub.title.toLowerCase()} như một phần phúc lợi nhân viên — tăng hài lòng và giữ chân nhân tài với chi phí thấp hơn nhiều so với các hình thức truyền thống.`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative overflow-hidden bg-brand-950 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute right-8 top-8 h-64 w-64 rounded-full bg-brand-700/25 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-2xl font-extrabold">Quy trình từ tư vấn đến vận hành</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { n: "01", title: "Liên hệ & xác định nhu cầu", desc: "Chia sẻ thông tin vị trí, mục tiêu, ngân sách. Đội tư vấn phản hồi trong 2 giờ làm việc." },
              { n: "02", title: "Khảo sát thực địa miễn phí", desc: "Kỹ thuật viên đến đo đạc, đề xuất cấu hình tối ưu và lập báo giá chi tiết không ràng buộc." },
              { n: "03", title: "Ký hợp đồng rõ ràng", desc: "Hợp đồng ghi đầy đủ phạm vi, thời gian, bảo hành và SLA kỹ thuật cụ thể." },
              { n: "04", title: "Lắp đặt & chạy thử", desc: "Hoàn thành trong 1–3 ngày. Kiểm tra toàn bộ chức năng, đào tạo vận hành cơ bản." },
              { n: "05", title: "Hỗ trợ vận hành dài hạn", desc: "IoT giám sát 24/7. Bảo trì định kỳ và hỗ trợ kỹ thuật theo điều khoản hợp đồng." },
            ].map((step) => (
              <div key={step.n}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-brand-700/60 text-sm font-extrabold">
                  {step.n}
                </div>
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-300">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/lien-he" className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-600">
              Bắt đầu tư vấn →
            </Link>
            <Link href={`/${silo.slug}`} className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">
              Xem thêm {silo.title.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {posts.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-6 text-xl font-extrabold text-slate-900">Bài viết chuyên sâu về {sub.title.toLowerCase()}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── SIBLINGS ── */}
      <section className={`py-14 ${posts.length > 0 ? "border-t border-slate-100 bg-slate-50" : ""}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-extrabold text-slate-900">Khám phá thêm trong {silo.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <CategoryCard
                key={s.slug}
                href={`/${silo.slug}/${s.slug}`}
                icon={s.icon}
                title={s.title}
                description={s.metaDescription}
                image={`/images/products/${silo.slug}/${normalizeSubSlug(s.slug)}/01.jpg`}
              />
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={sub.faqs} title={`Câu hỏi thường gặp về ${sub.title.toLowerCase()}`} />
      <Cta />
    </>
  );
}
