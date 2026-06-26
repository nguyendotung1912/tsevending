import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, serviceJsonLd, itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getAllSilos, getSiloBySlug } from "@/content/categories";
import { PROVINCES } from "@/content/provinces";
import { getPostsBySilo } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import ComparisonTable from "@/components/ComparisonTable";
import FaqSection from "@/components/Faq";
import VideoSection from "@/components/VideoSection";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import RoiCalculator from "@/components/RoiCalculator";

function normalizeSlugForImage(slug: string): string {
  return slug
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-z0-9-]/g, "")
    .toLowerCase();
}

// ── Rich text types ────────────────────────────────────────────────
type RichSegment = string | { anchor: string; href: string };
type RichParagraph = RichSegment[];

function RichPara({ segments }: { segments: RichParagraph }) {
  return (
    <p className="text-sm leading-relaxed text-slate-600">
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          seg
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            {seg.anchor}
          </Link>
        )
      )}
    </p>
  );
}

export function generateStaticParams() {
  return getAllSilos().map((silo) => ({ silo: silo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string }>;
}): Promise<Metadata> {
  const { silo: siloSlug } = await params;
  const silo = getSiloBySlug(siloSlug);
  if (!silo) return {};
  return buildMetadata({
    title: silo.metaTitle,
    description: silo.metaDescription,
    path: `/${silo.slug}`,
  });
}

const extendedContent: Record<string, {
  stats: { value: string; label: string }[];
  richBody: RichParagraph[];
  whatIs: { title: string; paragraphs: string[] };
  howWorks: { title: string; paragraphs: string[] };
  locations: { title: string; items: { name: string; desc: string }[] };
  investment: { title: string; paragraphs: string[] };
  roi: { title: string; paragraphs: string[] };
  process: { title: string; steps: { num: string; title: string; desc: string }[] };
}> = {
  "may-ban-hang-tu-dong": {
    stats: [
      { value: "5 dòng máy", label: "Đa dạng sản phẩm" },
      { value: "24/7", label: "Hoạt động liên tục" },
      { value: "QR / NFC", label: "Thanh toán hiện đại" },
      { value: "12–20 tháng", label: "Thời gian hoàn vốn" },
    ],
    richBody: [
      [
        "Máy bán hàng tự động (vending machine) là kênh bán lẻ tự phục vụ đang tăng trưởng mạnh nhất tại Việt Nam trong bối cảnh chi phí nhân sự tăng cao và người tiêu dùng ngày càng quen với dịch vụ không tiếp xúc. TSE Vending cung cấp đầy đủ các dòng máy phù hợp từng nhu cầu cụ thể: ",
        { anchor: "máy bán nước giải khát tự động", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat" },
        " phù hợp văn phòng, chung cư và trường học; ",
        { anchor: "máy bán snack, đồ ăn vặt tự động", href: "/may-ban-hang-tu-dong/may-ban-do-an-vat" },
        " lý tưởng cho căng-tin nhà máy và khu nghỉ ca; ",
        { anchor: "máy bán hàng đông lạnh, hàng lạnh", href: "/may-ban-hang-tu-dong/may-ban-hang-lanh" },
        " cho bệnh viện và siêu thị mini; cùng ",
        { anchor: "máy bán gas, bình gas tự động", href: "/may-ban-hang-tu-dong/may-ban-gas" },
        " đáp ứng nhu cầu khu dân cư. Đơn vị đang vận hành chuỗi máy cũng tìm được ",
        { anchor: "linh kiện, phụ tùng thay thế chính hãng", href: "/may-ban-hang-tu-dong/linh-kien-phu-tung" },
        " để bảo trì hệ thống liên tục.",
      ],
      [
        "Lợi thế cạnh tranh của vending machine nằm ở chi phí vận hành cố định và khả năng phục vụ 24/7 — kể cả ngày lễ và giờ cao điểm khi cửa hàng truyền thống đóng cửa hoặc không đủ nhân lực. Một máy đặt tại vị trí tốt (tòa nhà văn phòng 300+ nhân viên hoặc khu công nghiệp mật độ cao) có thể đạt doanh thu 10–20 triệu đồng/tháng, với chi phí đầu tư ban đầu 25–50 triệu đồng và thời gian hoàn vốn trung bình 12–20 tháng.",
      ],
      [
        "Điểm khác biệt cốt lõi của máy TSE Vending là module IoT tích hợp sẵn: chủ máy nhận cảnh báo tự động qua app khi hàng sắp hết, khi máy gặp sự cố kỹ thuật hoặc khi có giao dịch bất thường — theo dõi từ xa mà không cần đến tận nơi kiểm tra. Hệ thống thanh toán hỗ trợ đầy đủ: tiền mặt (trả lại tiền thừa tự động), thẻ ngân hàng EMV/NFC contactless, QR code VNPay, MoMo, ZaloPay và toàn bộ ngân hàng chuẩn VietQR.",
      ],
      [
        "Thành công của vending machine phụ thuộc rất lớn vào vị trí đặt máy và danh mục sản phẩm phù hợp nhu cầu thực tế. TSE Vending thực hiện khảo sát và phân tích vị trí miễn phí: đánh giá lưu lượng người, đối tượng khách hàng, cạnh tranh xung quanh và cơ sở hạ tầng điện để đề xuất dòng máy và cấu hình tối ưu. Đội kỹ thuật thường trú tại TP. Hồ Chí Minh, Hà Nội, Đà Nẵng và Bình Dương đảm bảo lắp đặt và bảo trì trong ngày.",
      ],
      [
        "TSE Vending cung cấp nhiều ",
        { anchor: "mô hình hợp tác kinh doanh vending", href: "/giai-phap-kinh-doanh" },
        " linh hoạt: đầu tư trọn gói sở hữu máy, hợp tác chia sẻ doanh thu với chủ mặt bằng (nhận 1–3 triệu đồng/tháng/máy mà không cần đầu tư vốn), hoặc thuê vận hành theo gói dịch vụ. ",
        { anchor: "Liên hệ ngay để được tư vấn và khảo sát thực địa miễn phí", href: "/lien-he" },
        " — đội ngũ phản hồi trong vòng 2 giờ làm việc.",
      ],
      [
        "Trước khi đầu tư, tham khảo ",
        { anchor: "bảng giá máy bán hàng tự động", href: "/may-ban-hang-tu-dong/bang-gia" },
        ", cân nhắc ",
        { anchor: "kinh doanh máy bán hàng tự động có lãi không", href: "/tin-tuc/kinh-doanh-may-ban-hang-tu-dong-co-lai-khong" },
        ", hoặc chọn phương án ít vốn hơn với ",
        { anchor: "dịch vụ cho thuê máy bán hàng tự động", href: "/may-ban-hang-tu-dong/thue-may" },
        ".",
      ],
    ],
    whatIs: {
      title: "Máy bán hàng tự động là gì? Cách hoạt động",
      paragraphs: [
        "Máy bán hàng tự động (vending machine) là thiết bị bán lẻ tự phục vụ, cho phép khách hàng chọn và mua sản phẩm bất kỳ lúc nào mà không cần nhân viên phục vụ. Sau khi khách hàng chọn sản phẩm trên màn hình cảm ứng hoặc bàn phím số và hoàn tất thanh toán — bằng tiền mặt, thẻ ngân hàng, QR code hoặc ví điện tử — máy tự động xuất hàng qua cơ chế vít xoắn (spiral) hoặc băng chuyền điều khiển bằng motor điện.",
        "Mỗi máy bán hàng tự động của TSE Vending đều tích hợp module IoT giúp kết nối với hệ thống quản lý trung tâm. Chủ máy có thể theo dõi lượng hàng tồn, doanh thu từng sản phẩm và tình trạng kỹ thuật theo thời gian thực trên điện thoại hoặc máy tính mà không cần đến tận nơi kiểm tra. Hệ thống tự cảnh báo khi tồn kho thấp, khi máy gặp lỗi kỹ thuật hoặc khi có giao dịch bất thường.",
        "Không giống với các kênh bán lẻ truyền thống đòi hỏi mặt bằng lớn và chi phí nhân sự cao, máy bán hàng tự động hoạt động liên tục 24/7 — kể cả ngày lễ và giờ cao điểm — với chi phí vận hành cố định và minh bạch.",
      ],
    },
    howWorks: {
      title: "Công nghệ tích hợp trong máy bán hàng tự động hiện đại",
      paragraphs: [
        "Máy bán hàng tự động thế hệ mới tích hợp nhiều lớp công nghệ: cảm biến phát hiện sản phẩm kẹt ngay sau khi xuất hàng; camera giám sát khu vực máy ngăn chặn gian lận; bộ nhớ flash lưu trữ dữ liệu giao dịch ngay cả khi mất kết nối internet.",
        "Các dòng máy TSE Vending hỗ trợ đầy đủ phương thức thanh toán: tiền mặt (nhận và trả lại tiền thừa tự động), thẻ ngân hàng chip EMV và NFC contactless, QR code VNPay/MoMo/ZaloPay và toàn bộ ngân hàng chuẩn VietQR.",
        "Phần mềm quản lý (CMS) cho phép thiết lập giá, thay đổi danh mục và cập nhật khuyến mãi từ xa trên tất cả máy trong hệ thống. Báo cáo doanh thu tổng hợp tự động theo ngày, tuần, tháng.",
      ],
    },
    locations: {
      title: "Vị trí triển khai và đặc điểm vận hành",
      items: [
        {
          name: "Tòa nhà văn phòng (200+ nhân viên)",
          desc: "Lưu lượng ổn định, nhu cầu nước uống và snack cao theo giờ nghỉ. Tòa nhà 200 nhân viên có thể đạt 5–15 triệu đồng/tháng/máy tại vị trí tốt.",
        },
        {
          name: "Khu công nghiệp & nhà máy",
          desc: "Mật độ lao động cao, ca đêm tạo nhu cầu liên tục khi căng-tin đóng cửa. Tỷ lệ sử dụng cao và ổn định theo lịch sản xuất.",
        },
        {
          name: "Trường học, đại học & ký túc xá",
          desc: "Lượng người dùng ổn định, nhu cầu snack cao giờ giải lao. Sinh viên ký túc xá cần dịch vụ 24/7 ngoài giờ hành chính.",
        },
        {
          name: "Bệnh viện & cơ sở y tế",
          desc: "Bệnh nhân, người nhà và nhân viên y tế ca 24h đều cần tiếp cận thực phẩm nhanh. Doanh thu ổn định, ít biến động.",
        },
        {
          name: "Chung cư và khu dân cư đô thị",
          desc: "Nhu cầu mua đồ tiện lợi sáng sớm và tối muộn khi cửa hàng lân cận đóng. Máy tại sảnh tầng trệt phục vụ hiệu quả.",
        },
        {
          name: "Trạm dừng chân, sân bay, ga tàu",
          desc: "Lưu lượng đông, thời gian dừng ngắn — người dùng cần mua nhanh, không xếp hàng. Giao dịch lớn theo giờ cao điểm.",
        },
      ],
    },
    investment: {
      title: "Chi phí đầu tư và kỳ vọng lợi nhuận thực tế",
      paragraphs: [
        "Máy bán nước giải khát tiêu chuẩn (25–50 triệu đồng), đặt tại vị trí 200–300 giao dịch/ngày, doanh thu hàng tháng có thể đạt 10–20 triệu đồng. Sau khi trừ hàng hóa (55–65%), điện và bảo trì, lợi nhuận ròng khoảng 2–5 triệu đồng/tháng/máy — hoàn vốn 10–20 tháng.",
        "Với mô hình hợp tác chia sẻ doanh thu, chủ mặt bằng có thể nhận 1–3 triệu đồng/tháng/máy mà không cần bỏ vốn đầu tư hay quản lý vận hành.",
        "TSE Vending thực hiện phân tích vị trí miễn phí trước khi ký hợp đồng — bao gồm đánh giá lưu lượng, cạnh tranh và đề xuất cấu hình máy tối ưu cho từng địa điểm.",
      ],
    },
    roi: {
      title: "Khi nào đầu tư mang lại hiệu quả tốt nhất?",
      paragraphs: [
        "Vending machine phát huy hiệu quả cao nhất tại vị trí có từ 150–200 người/ngày trở lên, không có cạnh tranh trực tiếp trong bán kính 50m và nguồn điện ổn định 24/7.",
        "Ba yếu tố quyết định doanh thu: (1) lưu lượng và nhân khẩu học; (2) danh mục sản phẩm phù hợp nhu cầu thực tế tại vị trí đó; (3) giá bán hợp lý so với lựa chọn thay thế trong khu vực.",
        "Không phải vị trí nào cũng phù hợp — TSE Vending sẽ đánh giá thực địa và chỉ đề xuất triển khai khi có cơ sở dữ liệu cho thấy tiềm năng đủ để đảm bảo hiệu quả đầu tư.",
      ],
    },
    process: {
      title: "Quy trình triển khai máy bán hàng tự động",
      steps: [
        { num: "01", title: "Liên hệ & tư vấn ban đầu", desc: "Phản hồi trong vòng 2 giờ làm việc để hiểu nhu cầu và xác định lịch khảo sát thực địa." },
        { num: "02", title: "Khảo sát & phân tích vị trí", desc: "Đội kỹ thuật đến đo đạc, đánh giá lưu lượng và đề xuất vị trí, dòng máy và danh mục sản phẩm." },
        { num: "03", title: "Báo giá & ký hợp đồng", desc: "Báo giá chi tiết từng hạng mục. Hợp đồng ghi rõ trách nhiệm hai bên, chính sách bảo hành và SLA kỹ thuật." },
        { num: "04", title: "Lắp đặt & đào tạo", desc: "Hoàn thành trong 1–2 ngày. Đào tạo cơ bản về nạp hàng, xử lý sự cố và phần mềm quản lý." },
        { num: "05", title: "Vận hành & tối ưu liên tục", desc: "IoT giám sát 24/7. Bảo trì định kỳ và hỗ trợ tối ưu danh mục theo dữ liệu bán thực tế." },
      ],
    },
  },
  "tu-locker-thong-minh": {
    stats: [
      { value: "8 môi trường", label: "Ứng dụng đa dạng" },
      { value: "0 chìa khóa", label: "Xác thực số hoàn toàn" },
      { value: "24/7", label: "Nhận hàng tự động" },
      { value: "API", label: "Tích hợp sàn TMĐT" },
    ],
    richBody: [
      [
        "Tủ locker thông minh (smart locker) không còn là giải pháp chỉ dành cho trung tâm thương mại lớn — thiết bị ngày nay được triển khai rộng rãi từ chung cư đến bệnh viện, từ trường học đến điểm giao nhận logistics. TSE Vending cung cấp giải pháp tùy chỉnh theo từng môi trường: ",
        { anchor: "tủ locker chung cư", href: "/tu-locker-thong-minh/tu-locker-chung-cu" },
        " nhận hàng hộ cư dân tự động 24/7; ",
        { anchor: "tủ locker văn phòng và khu công nghiệp", href: "/tu-locker-thong-minh/tu-locker-van-phong" },
        " tích hợp thẻ nhân viên RFID sẵn có; ",
        { anchor: "tủ gửi đồ thông minh cho trường học, TTTM, gym", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh" },
        " cấp mã QR một lần không cần chìa; ",
        { anchor: "tủ locker giao nhận hàng cho logistics, shipper", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang" },
        " tích hợp API sàn TMĐT; ",
        { anchor: "tủ locker khách sạn, resort", href: "/tu-locker-thong-minh/tu-locker-khach-san-resort" },
        " gửi hành lý tự phục vụ sau check-out; và ",
        { anchor: "tủ locker bệnh viện, cơ sở y tế", href: "/tu-locker-thong-minh/tu-locker-benh-vien-y-te" },
        " với bề mặt kháng khuẩn tiêu chuẩn y tế.",
      ],
      [
        "Điểm mấu chốt của tủ locker thông minh so với tủ khóa cơ truyền thống là xác thực không tiếp xúc và quản lý toàn bộ từ xa. Người dùng xác thực qua mã PIN (6–8 số), mã QR qua điện thoại, thẻ RFID (tích hợp chung với thẻ chấm công hoặc thẻ học sinh sẵn có), vân tay hoặc nhận diện khuôn mặt — tùy cấu hình từng dự án. Mỗi thao tác mở/đóng tủ đều được ghi nhận đầy đủ: timestamp, ID người dùng và số ô — quản trị viên truy cập toàn bộ lịch sử qua dashboard mà không cần ra tận nơi kiểm tra.",
      ],
      [
        "Phần mềm quản lý tập trung của TSE Vending cho phép theo dõi tình trạng từng ô tủ theo thời gian thực, phân quyền sử dụng theo nhóm (nhân viên theo ca, học sinh theo học kỳ, khách vãng lai theo lượt giao dịch), nhận cảnh báo ô tủ quá hạn và xuất báo cáo vận hành tự động. Hệ thống hỗ trợ tích hợp API với BMS (Building Management System), phần mềm quản lý nhân sự và các sàn thương mại điện tử như Shopee, Lazada cùng đơn vị vận chuyển GHN, GHTK.",
      ],
      [
        "Thiết kế module của TSE Vending cho phép linh hoạt hoàn toàn: bắt đầu với cụm 20 ô và mở rộng thêm khi nhu cầu tăng mà không cần thay toàn bộ hệ thống. Kích thước ô từ S (tài liệu, phụ kiện nhỏ) đến XL (hành lý lớn, thiết bị y tế) được thiết kế theo đặt hàng cụ thể từng dự án. Vật liệu thép sơn tĩnh điện chống ẩm phù hợp cả môi trường ngoài trời có mái che; tùy chọn bề mặt thép không gỉ cho môi trường yêu cầu tiêu chuẩn vệ sinh cao.",
      ],
      [
        "Đối với chủ tòa nhà, ban quản lý chung cư hay đơn vị logistics, TSE Vending cung cấp nhiều ",
        { anchor: "mô hình hợp tác linh hoạt từ mua trọn gói đến thuê SaaS", href: "/giai-phap-kinh-doanh" },
        " theo tháng — phù hợp với dự án ngắn hạn hoặc muốn kiểm nghiệm trước khi đầu tư dài hạn. ",
        { anchor: "Liên hệ ngay để được tư vấn và khảo sát thực địa miễn phí", href: "/lien-he" },
        " — đội ngũ phản hồi trong vòng 2 giờ làm việc.",
      ],
      [
        "Mới tìm hiểu về smart locker? Đọc bài giải thích ",
        { anchor: "smart locker là gì", href: "/tu-locker-thong-minh/smart-locker-la-gi" },
        " để nắm rõ cơ chế hoạt động và phân loại, hoặc xem ngay ",
        { anchor: "bảng giá tủ locker thông minh", href: "/tu-locker-thong-minh/bang-gia" },
        " để ước tính chi phí đầu tư theo từng cấu hình.",
      ],
    ],
    whatIs: {
      title: "Tủ locker thông minh là gì? Nguyên lý hoạt động",
      paragraphs: [
        "Tủ locker thông minh (smart locker) là hệ thống tủ lưu trữ điện tử với cơ chế xác thực kỹ thuật số — thay thế hoàn toàn chìa khóa cơ. Người dùng xác thực qua mã PIN, mã QR qua app, thẻ RFID, vân tay hoặc nhận diện khuôn mặt tùy cấu hình.",
        "Mỗi lần mở/đóng ô tủ đều được ghi nhận với đầy đủ thông tin: ID người dùng, thời gian và ô tủ. Quản trị viên truy cập dashboard để xem lịch sử, phân quyền và mở ô từ xa khi cần can thiệp — không cần ra tận nơi.",
        "Tủ locker TSE Vending thiết kế theo module: bắt đầu với 20 ô và mở rộng thêm mà không cần thay toàn bộ hệ thống. Mỗi module kết nối bộ điều khiển trung tâm qua bus nội bộ, đồng bộ lên máy chủ đám mây qua Wi-Fi hoặc 4G.",
      ],
    },
    howWorks: {
      title: "Các phương thức xác thực và trường hợp sử dụng",
      paragraphs: [
        "Mã PIN phù hợp khi người dùng không có điện thoại thông minh hoặc thẻ. Mã QR qua app phù hợp với giao nhận hàng: shipper quét QR nạp hàng, hệ thống gửi mã nhận cho người nhận.",
        "Thẻ RFID tối ưu cho môi trường doanh nghiệp — tích hợp với thẻ chấm công sẵn có, nhân viên dùng một thẻ cho nhiều mục đích. Sinh trắc học (vân tay, khuôn mặt) loại bỏ hoàn toàn việc quản lý mã và thẻ.",
        "Hệ thống quản lý TSE Vending hỗ trợ đồng thời nhiều phương thức xác thực trên cùng cụm tủ, linh hoạt theo nhóm người dùng: nhân viên thường xuyên dùng thẻ RFID, khách vãng lai dùng mã QR/PIN một lần.",
      ],
    },
    locations: {
      title: "Ứng dụng theo từng môi trường triển khai",
      items: [
        {
          name: "Chung cư cao tầng (từ 100 căn)",
          desc: "Sảnh tầng trệt nhận hộ bưu phẩm 24/7. Shipper giao khi cư dân vắng mặt, cư dân tự lấy bất kỳ lúc nào — giảm tải hoàn toàn cho bảo vệ.",
        },
        {
          name: "Văn phòng & khu công nghiệp",
          desc: "Nhân viên lưu trữ đồ cá nhân và thiết bị. Tích hợp thẻ nhân viên sẵn có tiết kiệm chi phí và tạo trải nghiệm đồng bộ.",
        },
        {
          name: "Trường học & trung tâm thể thao",
          desc: "Thay tủ khóa cơ: không quản lý chìa, không lo mất chìa. Học sinh/vận động viên quét QR mỗi lần dùng; admin quản lý qua phần mềm.",
        },
        {
          name: "Trung tâm thương mại & khách sạn",
          desc: "Gửi đồ tạm thời theo giờ, thu phí tự động. Khách sạn dùng lưu hành lý sau trả phòng — khách tự lấy, giảm tải lễ tân.",
        },
        {
          name: "Bưu cục & điểm giao nhận logistics",
          desc: "Tích hợp API với sàn TMĐT: trạng thái giao/nhận đồng bộ tự động lên hệ thống vận đơn. Giảm tỷ lệ giao hàng thất bại.",
        },
        {
          name: "Bệnh viện & cơ sở y tế",
          desc: "Nhân viên y tế lưu trữ đồ cá nhân an toàn trong ca trực. Bề mặt kháng khuẩn, dễ vệ sinh theo tiêu chuẩn y tế.",
        },
      ],
    },
    investment: {
      title: "Chi phí đầu tư và lựa chọn cấu hình",
      paragraphs: [
        "Chi phí phụ thuộc vào số lượng ô, kích thước ô (S/M/L/XL), công nghệ xác thực (PIN đơn giản vs. sinh trắc học) và mức độ tích hợp phần mềm (standalone vs. API với hệ thống hiện có).",
        "Cụm tủ 20 ô cơ bản (PIN/QR, quản lý web) có chi phí thấp hơn đáng kể so với hệ thống 100 ô tích hợp vân tay và API logistics. TSE Vending thiết kế theo nhu cầu và ngân sách cụ thể từng dự án.",
        "Với mô hình thuê dịch vụ (SaaS locker), chủ mặt bằng trả phí thuê hàng tháng — TSE Vending chịu bảo trì và nâng cấp phần mềm. Phù hợp với dự án ngắn hạn hoặc muốn kiểm nghiệm trước khi đầu tư dài hạn.",
      ],
    },
    roi: {
      title: "Lợi ích vận hành thực tế",
      paragraphs: [
        "Tại chung cư 300 căn nhận 80–100 kiện/ngày, tủ locker giúp bảo vệ tiết kiệm 2–3 giờ/ngày — không còn ký nhận, bảo quản và thông báo từng kiện hàng.",
        "Trong văn phòng và khu công nghiệp: loại bỏ rủi ro quản lý chìa khóa (mất chìa, sao chép trái phép, thay ổ khóa khi nhân viên nghỉ). Lịch sử truy cập đầy đủ hỗ trợ quản lý tài sản và điều tra sự cố.",
        "Thu phí gửi đồ tự động tại trung tâm thương mại và sân bay có thể hoàn vốn thiết bị trong 18–36 tháng từ doanh thu phí dịch vụ.",
      ],
    },
    process: {
      title: "Quy trình triển khai tủ locker thông minh",
      steps: [
        { num: "01", title: "Khảo sát nhu cầu & vị trí", desc: "Đánh giá số lượng người dùng, tần suất, yêu cầu tích hợp và không gian vật lý để xác định cấu hình phù hợp." },
        { num: "02", title: "Thiết kế hệ thống & báo giá", desc: "Đề xuất số ô, kích thước, công nghệ xác thực và phần mềm. Báo giá chi tiết từng hạng mục, không phát sinh chi phí ẩn." },
        { num: "03", title: "Sản xuất & kiểm tra chất lượng", desc: "Sản xuất theo đơn đặt hàng cụ thể, kiểm tra toàn bộ cơ khí và điện tử tại xưởng trước khi xuất hàng." },
        { num: "04", title: "Lắp đặt & tích hợp phần mềm", desc: "Lắp đặt vật lý, cài phần mềm, cấu hình người dùng và kiểm tra kết nối. Đào tạo quản trị viên sử dụng dashboard." },
        { num: "05", title: "Hỗ trợ & bảo trì dài hạn", desc: "Bảo trì định kỳ cơ khí và cập nhật firmware tự động. Hỗ trợ 24/7 qua hotline, điều phối kỹ thuật viên tại chỗ khi cần." },
      ],
    },
  },
};

export default async function SiloPage({ params }: { params: Promise<{ silo: string }> }) {
  const { silo: siloSlug } = await params;
  const silo = getSiloBySlug(siloSlug);
  if (!silo) notFound();

  const posts = getPostsBySilo(silo.slug).slice(0, 6);
  const ext = extendedContent[siloSlug];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: silo.title,
          description: silo.metaDescription,
          path: `/${silo.slug}`,
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          name: silo.title,
          description: silo.metaDescription,
          path: `/${silo.slug}`,
          items: silo.subcategories.map((sub, index) => ({
            position: index + 1,
            name: sub.title,
            url: `https://tsevending.com/${silo.slug}/${sub.slug}`,
            description: sub.metaDescription,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: silo.title, path: `/${silo.slug}` },
        ])}
      />

      {/* ── SILO HERO ── */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-900/80 via-brand-950 to-brand-950" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute right-8 top-8 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-12 h-56 w-56 rounded-full bg-accent-600/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-12">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-white/70">{silo.title}</span>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-400">
            Sản phẩm &amp; dịch vụ
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {silo.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {silo.intro[0]}
          </p>

          {/* Stats row */}
          {ext && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ext.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <p className="text-xl font-extrabold text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INTRO + SUBCATEGORIES ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Snippet-ready direct answer + E-E-A-T byline */}
              {silo.faqs[0] && (
                <div className="mb-6 space-y-3">
                  <QuickAnswer>{silo.faqs[0].a}</QuickAnswer>
                  <AuthorByline />
                </div>
              )}

              <h2 className="mb-5 text-xl font-extrabold text-slate-900">Danh mục sản phẩm</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {silo.subcategories.map((sub) => (
                  <CategoryCard
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    icon={sub.icon}
                    title={sub.title}
                    description={sub.metaDescription}
                    image={`/images/products/${silo.slug}/${normalizeSlugForImage(sub.slug)}/01.webp?v=3`}
                  />
                ))}
              </div>

              {/* Rich body with internal links — below product grid */}
              {ext?.richBody && (
                <div className="mt-10 space-y-3 border-t border-slate-100 pt-8">
                  <h2 className="mb-4 text-lg font-extrabold text-slate-900">
                    Tổng quan về {silo.title.toLowerCase()}
                  </h2>
                  {ext.richBody.map((para, i) => (
                    <RichPara key={i} segments={para} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">Tính năng kỹ thuật</h2>
                <ul className="mt-4 space-y-2.5">
                  {silo.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-slate-600">
                      <svg className="mt-0.5 h-4 w-4 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
                <p className="text-sm font-bold text-brand-800">Khảo sát vị trí miễn phí</p>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-700">
                  Đội kỹ thuật TSE Vending đến thực địa, đánh giá và đề xuất cấu hình thiết bị phù hợp — không tính phí tư vấn.
                </p>
                <a
                  href="/lien-he"
                  className="mt-4 block rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700"
                >
                  Yêu cầu tư vấn →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-t border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">So sánh dòng sản phẩm</p>
          <h2 className="mt-2 mb-2 text-xl font-extrabold text-slate-900">
            Nên chọn dòng nào? Bảng so sánh nhanh
          </h2>
          <p className="mb-8 max-w-3xl text-sm text-slate-600">
            Mỗi dòng sản phẩm phù hợp với một nhóm vị trí và mục tiêu khác nhau. Tham khảo bảng dưới hoặc liên hệ để được tư vấn theo vị trí thực tế.
          </p>
          <ComparisonTable subcategories={silo.subcategories} />
        </div>
      </section>

      {/* ── SMART LOCKER: so sánh + phương thức mở khóa (chỉ pillar locker) ── */}
      {siloSlug === "tu-locker-thong-minh" && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-2 text-xl font-extrabold text-slate-900">Smart Locker khác gì tủ khóa cơ truyền thống?</h2>
            <p className="mb-6 max-w-3xl text-sm text-slate-600">
              Smart locker thay chìa khóa cơ bằng xác thực điện tử và quản lý từ xa — khác biệt rõ rệt về vận hành, bảo mật và chi phí.
            </p>
            <div className="mb-12 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="border border-slate-200 p-3">Tiêu chí</th>
                    <th className="border border-slate-200 p-3">Tủ khóa cơ</th>
                    <th className="border border-slate-200 p-3 text-brand-700">Smart Locker (TSE)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {[
                    ["Mở khóa", "Chìa vật lý", "QR / PIN / RFID / vân tay / Face ID"],
                    ["Mất chìa", "Phải thay ổ khóa", "Cấp lại mã từ xa, miễn phí"],
                    ["Lịch sử truy cập", "Không có", "Ghi log đầy đủ kèm thời gian"],
                    ["Quản lý từ xa", "Không", "Dashboard IoT theo thời gian thực"],
                    ["Phân quyền", "Cố định, thủ công", "Linh hoạt theo người / ca / thời hạn"],
                    ["Vận hành", "Cần người trông coi", "Tự phục vụ 24/7, không nhân sự"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <td className="border border-slate-200 p-3 font-medium text-slate-900">{r[0]}</td>
                      <td className="border border-slate-200 p-3">{r[1]}</td>
                      <td className="border border-slate-200 p-3">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mb-2 text-xl font-extrabold text-slate-900">Các phương thức mở khóa smart locker</h2>
            <p className="mb-6 max-w-3xl text-sm text-slate-600">
              Một hệ thống có thể dùng đồng thời nhiều phương thức cho các nhóm người dùng khác nhau.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Mã QR", v: "Cấp qua app/SMS, quét bằng điện thoại — lý tưởng cho giao nhận hàng." },
                { k: "Mã PIN / OTP", v: "Nhập trên bàn phím cảm ứng — đơn giản, không cần thiết bị phụ." },
                { k: "Thẻ RFID", v: "Tích hợp thẻ nhân viên/học sinh sẵn có — một thẻ đa chức năng." },
                { k: "Vân tay", v: "Sinh trắc học, không thể quên hay mất — bảo mật cao." },
                { k: "Nhận diện khuôn mặt", v: "Mở không chạm — phù hợp môi trường y tế, cao cấp." },
                { k: "App di động", v: "Quản lý và mở tủ qua ứng dụng — tiện cho người dùng thường xuyên." },
              ].map((m) => (
                <div key={m.k} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-bold text-slate-900">{m.k}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{m.v}</p>
                </div>
              ))}
            </div>
            <h2 className="mb-2 mt-12 text-xl font-extrabold text-slate-900">Vì sao chọn smart locker TSE Vending?</h2>
            <p className="mb-6 max-w-3xl text-sm text-slate-600">
              Khác với phần lớn đơn vị chỉ bán tủ, TSE Vending làm chủ toàn bộ chuỗi giá trị — đây là 5 lợi thế khác biệt.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Giải pháp trọn gói", v: "Thiết kế → sản xuất → IoT → lắp đặt → vận hành → bảo trì. Một đầu mối chịu trách nhiệm toàn bộ." },
                { k: "Module IoT tích hợp", v: "Quản lý từ xa, giám sát tình trạng từng ô và lịch sử truy cập theo thời gian thực." },
                { k: "Kỹ thuật viên 4 tỉnh", v: "Thường trú tại TP.HCM, Hà Nội, Đà Nẵng, Bình Dương — lắp đặt & bảo trì nhanh." },
                { k: "3 mô hình hợp đồng", v: "Mua trọn gói, thuê dịch vụ hoặc chia sẻ doanh thu — linh hoạt theo ngân sách." },
                { k: "Case study thật", v: "Đã triển khai tại Vinhomes Grand Park, ĐH Kinh tế TP.HCM, bệnh viện tư nhân TP.HCM." },
                { k: "Sản xuất trong nước", v: "Chủ động linh kiện, bảo hành nhanh, tùy biến cấu hình theo từng dự án." },
              ].map((a) => (
                <div key={a.k} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-bold text-brand-700">{a.k}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{a.v}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Tìm hiểu sâu hơn: <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">smart locker là gì</Link>{" "}
              · <Link href="/tu-locker-thong-minh/bang-gia" className="font-semibold text-brand-600 hover:underline">bảng giá tủ locker thông minh</Link>.
            </p>
          </div>
        </section>
      )}

      {/* ── EXTENDED CONTENT ── */}
      {ext && (
        <>
          {/* What is + How works */}
          <section className="py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{ext.whatIs.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                    {ext.whatIs.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{ext.howWorks.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                    {ext.howWorks.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Locations */}
          <section className="bg-slate-50 py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Phạm vi triển khai</p>
              <h2 className="mt-2 mb-3 text-xl font-extrabold text-slate-900">{ext.locations.title}</h2>
              <p className="mb-8 max-w-3xl text-sm text-slate-600">
                Mỗi môi trường có yêu cầu kỹ thuật và cấu hình thiết bị khác nhau — TSE Vending đánh giá và đề xuất cấu hình phù hợp cho từng địa điểm.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ext.locations.items.map((loc) => (
                  <div
                    key={loc.name}
                    className="rounded-xl border border-slate-100 border-l-4 border-l-brand-500 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-sm font-bold text-slate-900">{loc.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investment + ROI */}
          <section className="border-t border-slate-100 py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{ext.investment.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                    {ext.investment.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{ext.roi.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                    {ext.roi.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <RoiCalculator />
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="relative overflow-hidden bg-brand-950 py-14 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="pointer-events-none absolute right-8 top-8 h-64 w-64 rounded-full bg-brand-700/25 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-10 text-xl font-extrabold">{ext.process.title}</h2>
              <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-white/15 lg:block" />
                {ext.process.steps.map((step) => (
                  <div key={step.num}>
                    <div className="relative z-10 mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-brand-600 text-sm font-extrabold shadow-lg shadow-black/20">
                      {step.num}
                    </div>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-200">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/lien-he"
                  className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-accent-600"
                >
                  Bắt đầu tư vấn →
                </Link>
                <Link
                  href="/giai-phap-kinh-doanh"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Xem mô hình hợp tác
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── RELATED ARTICLES ── */}
      {posts.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Tài liệu & Phân tích</p>
            <h2 className="mt-2 mb-6 text-xl font-extrabold text-slate-900">
              Bài viết chuyên sâu về {silo.title.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/tin-tuc" className="text-sm font-semibold text-brand-600 hover:underline">
                Xem tất cả bài viết →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── PROVINCE MAP ── */}
      {siloSlug === "may-ban-hang-tu-dong" && (
        <section id="tinh-thanh" className="bg-slate-50 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Khu vực phủ sóng</p>
            <h2 className="mt-2 mb-2 text-xl font-extrabold text-slate-900">
              Khu vực có kỹ thuật viên thường trú
            </h2>
            <p className="mb-8 max-w-3xl text-sm text-slate-600">
              TSE Vending duy trì đội kỹ thuật và kho phụ tùng tại 4 địa bàn sau — đảm bảo lắp đặt và bảo trì trong ngày. Các tỉnh thành khác phục vụ qua mạng lưới đối tác với lịch trình sắp xếp trước.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROVINCES.filter((p) => ["ho-chi-minh", "ha-noi", "da-nang", "binh-duong"].includes(p.slug)).map((p) => (
                <Link
                  key={p.slug}
                  href={`/may-ban-hang-tu-dong/tinh-thanh/${p.slug}`}
                  className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-white hover:shadow-md"
                >
                  <span>{p.name}</span>
                  <span className="ml-2 flex-none text-brand-500">→</span>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">
              Cần lắp đặt tại tỉnh thành khác?{" "}
              <Link href="/lien-he" className="text-brand-600 hover:underline">
                Liên hệ để được sắp xếp qua mạng lưới đối tác.
              </Link>
            </p>
          </div>
        </section>
      )}

      {siloSlug === "tu-locker-thong-minh" && (
        <section className="border-t border-slate-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-accent-600">Chuyên môn kỹ thuật</p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900">Kiến thức kỹ thuật chuyên sâu về smart locker</h2>
                <p className="mt-1 text-sm text-slate-600">14 bài về cấu tạo, công nghệ mở khóa, phân loại, kiến trúc IoT và sản xuất — kèm sơ đồ nguyên lý.</p>
              </div>
              <Link href="/kien-thuc-ky-thuat" className="shrink-0 self-start rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800 sm:self-center">
                Xem loạt bài kỹ thuật →
              </Link>
            </div>
          </div>
        </section>
      )}

      <VideoSection path={`/${siloSlug}`} title={`Video về ${silo.title.toLowerCase()}`} />

      <FaqSection faqs={silo.faqs} title={`Câu hỏi thường gặp về ${silo.title.toLowerCase()}`} />
      <Cta />
    </>
  );
}
