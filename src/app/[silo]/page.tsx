import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getAllSilos, getSiloBySlug } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import ComparisonTable from "@/components/ComparisonTable";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

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
  whatIs: { title: string; paragraphs: string[] };
  howWorks: { title: string; paragraphs: string[] };
  locations: { title: string; items: { name: string; desc: string }[] };
  investment: { title: string; paragraphs: string[] };
  roi: { title: string; paragraphs: string[] };
  process: { title: string; steps: { num: string; title: string; desc: string }[] };
}> = {
  "may-ban-hang-tu-dong": {
    whatIs: {
      title: "Máy bán hàng tự động là gì? Cách hoạt động",
      paragraphs: [
        "Máy bán hàng tự động (vending machine) là thiết bị bán lẻ tự phục vụ, cho phép khách hàng chọn và mua sản phẩm bất kỳ lúc nào mà không cần nhân viên phục vụ. Sau khi khách hàng chọn sản phẩm trên màn hình cảm ứng hoặc bàn phím số và hoàn tất thanh toán — bằng tiền mặt, thẻ ngân hàng, QR code hoặc ví điện tử — máy tự động xuất hàng qua cơ chế vít xoắn (spiral) hoặc băng chuyền điều khiển bằng motor điện.",
        "Mỗi máy bán hàng tự động của TSE Vending đều tích hợp module IoT giúp kết nối với hệ thống quản lý trung tâm. Chủ máy có thể theo dõi lượng hàng tồn, doanh thu từng sản phẩm và tình trạng kỹ thuật theo thời gian thực trên điện thoại hoặc máy tính mà không cần đến tận nơi kiểm tra. Hệ thống tự cảnh báo khi tồn kho thấp, khi máy gặp lỗi kỹ thuật hoặc khi có giao dịch bất thường.",
        "Không giống với các kênh bán lẻ truyền thống đòi hỏi mặt bằng lớn và chi phí nhân sự cao, máy bán hàng tự động hoạt động liên tục 24/7 — kể cả ngày lễ và giờ cao điểm — với chi phí vận hành cố định và minh bạch. Đây là lý do tại sao mô hình vending đang mở rộng nhanh chóng tại Việt Nam, đặc biệt ở các khu đô thị có mật độ dân số cao và nhu cầu tiêu dùng tiện lợi ngày càng tăng.",
      ],
    },
    howWorks: {
      title: "Công nghệ tích hợp trong máy bán hàng tự động hiện đại",
      paragraphs: [
        "Máy bán hàng tự động thế hệ mới không chỉ là hộp kim loại phân phối sản phẩm — đây là điểm bán hàng thông minh (smart POS) thu nhỏ, tích hợp nhiều lớp công nghệ. Hệ thống cảm biến phát hiện sản phẩm kẹt ngay sau khi xuất hàng; camera giám sát khu vực máy ngăn chặn gian lận; bộ nhớ flash lưu trữ dữ liệu giao dịch ngay cả khi mất kết nối internet.",
        "Các dòng máy bán hàng tự động của TSE Vending hỗ trợ đầy đủ các phương thức thanh toán đang được người tiêu dùng Việt Nam sử dụng phổ biến: tiền mặt (với bộ nhận tiền và trả lại tiền thừa tự động), thẻ ngân hàng nội địa và quốc tế (chip EMV và NFC contactless), QR code tích hợp với VNPay, MoMo, ZaloPay và tất cả ngân hàng hỗ trợ chuẩn VietQR. Với thị trường dần chuyển sang thanh toán không tiền mặt, đây là yếu tố quyết định doanh thu của máy.",
        "Phần mềm quản lý vận hành (CMS - Content Management System) của TSE Vending cho phép thiết lập giá bán, thay đổi danh mục sản phẩm và cập nhật khuyến mãi từ xa trên tất cả các máy trong hệ thống chỉ bằng vài thao tác. Báo cáo doanh thu được tổng hợp tự động theo ngày, tuần, tháng — không cần nhân viên nhập liệu thủ công.",
      ],
    },
    locations: {
      title: "Vị trí đặt máy bán hàng tự động mang lại doanh thu cao nhất",
      items: [
        {
          name: "Tòa nhà văn phòng (200+ nhân viên)",
          desc: "Nhân viên văn phòng là nhóm khách hàng tiêu thụ nước uống và đồ ăn nhẹ đều đặn, đặc biệt vào giờ nghỉ trưa và buổi chiều. Tòa nhà 200 nhân viên có thể duy trì doanh thu 5-15 triệu đồng/tháng/máy cho máy bán nước + snack. Đặt tại sảnh tầng trệt, gần thang máy hoặc khu bếp/pantry là các vị trí tối ưu.",
        },
        {
          name: "Khu công nghiệp & nhà máy",
          desc: "Khu công nghiệp có mật độ lao động cao (500-5.000 công nhân/nhà máy) và ca làm việc xuyên đêm tạo nhu cầu liên tục cho nước uống và đồ ăn. Máy đặt tại khu vực nghỉ ca, nhà ăn và cổng ra vào nhà máy thường có tỷ lệ sử dụng rất cao, đặc biệt ca đêm khi căng-tin đóng cửa.",
        },
        {
          name: "Trường học, đại học & ký túc xá",
          desc: "Môi trường giáo dục có lượng người dùng ổn định và nhu cầu ăn vặt cao, đặc biệt giờ giải lao và sau giờ học. Sinh viên ký túc xá cần dịch vụ 24/7 vì lịch học và sinh hoạt không theo giờ hành chính. Máy bán snack + nước uống là cấu hình phổ biến tại các vị trí này.",
        },
        {
          name: "Bệnh viện & cơ sở y tế",
          desc: "Bệnh nhân, người thân chờ đợi và nhân viên y tế làm ca 24h đều cần tiếp cận thực phẩm và đồ uống nhanh. Máy bán hàng tự động đặt tại khu chờ khám, hành lang tầng bệnh viện và khu nhân viên thường có doanh thu ổn định và ít biến động.",
        },
        {
          name: "Chung cư và khu dân cư đô thị",
          desc: "Cư dân chung cư có xu hướng mua đồ tiện lợi gần nhà vào sáng sớm và tối muộn — thời điểm các cửa hàng lân cận đã đóng cửa. Máy bán gas mini, nước uống và đồ ăn nhanh đặt tại sảnh tầng trệt phục vụ nhu cầu này hiệu quả.",
        },
        {
          name: "Trạm dừng chân, sân bay, ga tàu",
          desc: "Vị trí giao thông đông người qua lại nhưng thời gian dừng ngắn — người dùng cần mua hàng nhanh, không xếp hàng. Đây là môi trường lý tưởng cho vending machine với doanh thu cao và mật độ giao dịch lớn theo giờ.",
        },
      ],
    },
    investment: {
      title: "Chi phí đầu tư và kỳ vọng lợi nhuận thực tế",
      paragraphs: [
        "Đầu tư máy bán hàng tự động đòi hỏi vốn ban đầu thấp hơn nhiều so với mở cửa hàng truyền thống và không cần chi phí nhân sự thường trực. Tuy nhiên, lợi nhuận thực tế phụ thuộc lớn vào vị trí đặt máy, loại sản phẩm và dòng máy được chọn.",
        "Với máy bán nước giải khát tiêu chuẩn (đầu tư 25-50 triệu đồng), đặt tại vị trí có 200-300 giao dịch/ngày, doanh thu hàng tháng có thể đạt 10-20 triệu đồng. Sau khi trừ chi phí hàng hóa (55-65%), chi phí điện và bảo trì, lợi nhuận ròng từ 2-5 triệu đồng/tháng/máy — tương đương thời gian hoàn vốn 10-20 tháng.",
        "Chủ mặt bằng lựa chọn mô hình hợp tác chia sẻ doanh thu với TSE Vending có thể nhận thu nhập thụ động từ 1-3 triệu đồng/tháng mỗi máy mà không cần đầu tư vốn hay quản lý vận hành. Đây là lý do ngày càng nhiều ban quản lý tòa nhà và chủ chung cư chủ động liên hệ để đặt máy tại mặt bằng của mình.",
      ],
    },
    roi: {
      title: "Khi nào đầu tư máy bán hàng tự động mang lại hiệu quả tốt nhất?",
      paragraphs: [
        "Máy bán hàng tự động phát huy hiệu quả cao nhất khi đặt tại vị trí có lưu lượng người ổn định từ 150-200 người/ngày trở lên, không có hoặc hạn chế cạnh tranh trực tiếp (cửa hàng tiện lợi, căng-tin) trong bán kính 50m và có nguồn điện ổn định 24/7.",
        "Ba yếu tố quyết định doanh thu của một điểm máy: (1) Lưu lượng người qua lại và đặc điểm nhân khẩu học — nhân viên văn phòng tiêu dùng cao hơn công nhân theo thu nhập trung bình; (2) Danh mục sản phẩm phù hợp với nhu cầu cụ thể tại vị trí đó — không phải vị trí nào cũng bán được cùng một loại hàng; (3) Giá bán được định giá hợp lý so với lựa chọn thay thế tại khu vực.",
        "TSE Vending thực hiện phân tích vị trí miễn phí cho tất cả khách hàng tiềm năng trước khi ký hợp đồng — bao gồm đánh giá lưu lượng, cạnh tranh, tiềm năng doanh thu và đề xuất cấu hình máy/danh mục hàng tối ưu cho từng vị trí cụ thể.",
      ],
    },
    process: {
      title: "Quy trình triển khai máy bán hàng tự động với TSE Vending",
      steps: [
        { num: "01", title: "Liên hệ & tư vấn ban đầu", desc: "Gọi điện hoặc điền form liên hệ. Đội tư vấn phản hồi trong vòng 2 giờ làm việc để hiểu nhu cầu và lịch khảo sát." },
        { num: "02", title: "Khảo sát & phân tích vị trí", desc: "Đội kỹ thuật đến thực địa đo đạc, đánh giá lưu lượng và đề xuất vị trí đặt máy, dòng máy và danh mục sản phẩm tối ưu." },
        { num: "03", title: "Báo giá & ký hợp đồng", desc: "Nhận báo giá chi tiết cho thiết bị, lắp đặt và dịch vụ hỗ trợ. Hợp đồng ghi rõ trách nhiệm hai bên, chính sách bảo hành và SLA hỗ trợ kỹ thuật." },
        { num: "04", title: "Lắp đặt & đào tạo", desc: "Lắp đặt và cấu hình máy tại chỗ trong 1-2 ngày. Đào tạo cơ bản về nạp hàng, xử lý sự cố thông thường và sử dụng phần mềm quản lý." },
        { num: "05", title: "Vận hành & tối ưu liên tục", desc: "Hệ thống IoT giám sát 24/7. Đội kỹ thuật bảo trì định kỳ và hỗ trợ tối ưu danh mục hàng theo dữ liệu bán thực tế." },
      ],
    },
  },
  "tu-locker-thong-minh": {
    whatIs: {
      title: "Tủ locker thông minh là gì? Nguyên lý hoạt động",
      paragraphs: [
        "Tủ locker thông minh (smart locker) là hệ thống tủ lưu trữ điện tử với cơ chế xác thực kỹ thuật số — thay thế hoàn toàn chìa khóa cơ truyền thống. Người dùng xác thực quyền truy cập bằng mã PIN nhập trên bàn phím số, mã QR quét qua app điện thoại, thẻ RFID (thẻ nhân viên hoặc thẻ từ riêng), vân tay hoặc nhận diện khuôn mặt tùy cấu hình.",
        "Mỗi lần mở hoặc đóng ô tủ đều được ghi nhận trong hệ thống với đầy đủ thông tin: ID người dùng, thời gian chính xác và ô tủ tương ứng. Quản trị viên truy cập dashboard trên trình duyệt hoặc app để xem lịch sử này theo thời gian thực, phân quyền ô tủ cho người dùng mới và giải phóng ô khi cần can thiệp. Khi có sự cố — quên mã, cần mở khẩn cấp — quản trị viên có thể mở ô từ xa qua hệ thống mà không cần ra tận nơi.",
        "Tủ locker thông minh của TSE Vending được thiết kế theo module: bạn có thể bắt đầu với 20 ô và mở rộng thêm mà không cần thay thế toàn bộ hệ thống. Mỗi module kết nối với bộ điều khiển trung tâm qua bus nội bộ, bộ điều khiển kết nối internet qua Wi-Fi hoặc 4G để đồng bộ với máy chủ đám mây.",
      ],
    },
    howWorks: {
      title: "Các công nghệ xác thực trong tủ locker thông minh",
      paragraphs: [
        "Mỗi phương thức xác thực có ưu điểm và trường hợp sử dụng tối ưu khác nhau. Mã PIN thích hợp khi người dùng không có điện thoại thông minh hoặc thẻ từ — chỉ cần nhớ 4-6 chữ số. Mã QR qua app phù hợp với tình huống giao nhận hàng: shipper quét QR để nạp hàng vào ô trống, hệ thống tự gửi mã nhận cho người nhận.",
        "Thẻ RFID là lựa chọn tối ưu cho môi trường doanh nghiệp — tích hợp với thẻ chấm công sẵn có giúp nhân viên chỉ cần một thẻ cho nhiều mục đích: vào cổng bảo vệ, chấm công và mở tủ locker. Sinh trắc học (vân tay, khuôn mặt) loại bỏ hoàn toàn việc ghi nhớ mã hoặc quản lý thẻ — người dùng không thể quên, mất hay chia sẻ thông tin xác thực.",
        "Hệ thống quản lý tập trung của TSE Vending hỗ trợ đồng thời nhiều phương thức xác thực trên cùng một cụm tủ, cho phép linh hoạt theo nhóm người dùng: nhân viên lâu dài dùng thẻ RFID, khách vãng lai dùng mã QR/PIN một lần, quản trị viên có quyền cao nhất qua tài khoản bảo mật 2 lớp.",
      ],
    },
    locations: {
      title: "Ứng dụng tủ locker thông minh theo từng môi trường",
      items: [
        {
          name: "Chung cư cao tầng (từ 100 căn trở lên)",
          desc: "Sảnh tầng trệt chung cư là vị trí lý tưởng cho tủ locker nhận hộ bưu phẩm. Shipper giao hàng khi cư dân vắng mặt, cư dân nhận thông báo và tự lấy hàng bất kỳ lúc nào — giải phóng bảo vệ khỏi nhiệm vụ nhận và bảo quản hàng chục kiện hàng mỗi ngày.",
        },
        {
          name: "Văn phòng & khu công nghiệp",
          desc: "Nhân viên lưu trữ đồ cá nhân, tài liệu và thiết bị bảo hộ trong ô tủ riêng được phân quyền. Tích hợp với thẻ nhân viên sẵn có tiết kiệm chi phí triển khai và tạo trải nghiệm đồng bộ cho người dùng.",
        },
        {
          name: "Trường học & trung tâm thể thao",
          desc: "Tủ gửi đồ thông minh thay thế tủ khóa cơ: không cần quản lý chìa khóa, không lo mất chìa. Học sinh/vận động viên quét QR mỗi lần sử dụng; admin theo dõi và giải phóng ô tủ qua phần mềm.",
        },
        {
          name: "Trung tâm thương mại & khách sạn",
          desc: "Cung cấp dịch vụ gửi đồ tạm thời cho khách mua sắm, thuê ô theo giờ với thanh toán tự động. Khách sạn dùng để gửi hành lý sau khi trả phòng — khách tự lấy lúc tiện, giảm tải cho lễ tân.",
        },
        {
          name: "Bưu cục & điểm giao nhận logistics",
          desc: "Tủ locker tích hợp API với sàn TMĐT và đơn vị vận chuyển: trạng thái 'đã giao vào tủ' và 'đã nhận' đồng bộ tự động lên hệ thống vận đơn. Giảm tỷ lệ giao hàng thất bại và tranh chấp về thời gian giao nhận.",
        },
        {
          name: "Bệnh viện & cơ sở y tế",
          desc: "Nhân viên y tế lưu trữ đồ cá nhân và dụng cụ an toàn trong ca trực dài. Tủ locker chống khuẩn, bề mặt dễ vệ sinh phù hợp tiêu chuẩn môi trường y tế.",
        },
      ],
    },
    investment: {
      title: "Chi phí đầu tư và lựa chọn cấu hình tủ locker thông minh",
      paragraphs: [
        "Chi phí đầu tư tủ locker thông minh phụ thuộc vào số lượng ô, kích thước ô (nhỏ S, vừa M, lớn L, siêu lớn XL), công nghệ xác thực (PIN đơn giản vs. vân tay/nhận diện khuôn mặt) và mức độ tích hợp phần mềm (standalone vs. API với hệ thống hiện có).",
        "Cụm tủ 20 ô cơ bản (mở bằng PIN/QR, quản lý qua web) có chi phí đầu tư thấp hơn đáng kể so với hệ thống 100 ô tích hợp vân tay và API logistics. TSE Vending thiết kế từng dự án theo nhu cầu thực tế và ngân sách cụ thể của từng khách hàng — không áp dụng cấu hình tiêu chuẩn duy nhất cho tất cả.",
        "Với mô hình thuê dịch vụ (SaaS locker), chủ mặt bằng trả phí thuê hàng tháng thay vì mua đứt thiết bị. TSE Vending chịu trách nhiệm bảo trì và nâng cấp phần mềm. Mô hình này phù hợp với các dự án ngắn hạn hoặc chủ mặt bằng muốn kiểm nghiệm giải pháp trước khi đầu tư dài hạn.",
      ],
    },
    roi: {
      title: "Lợi ích vận hành thực tế khi triển khai tủ locker thông minh",
      paragraphs: [
        "Lợi ích đo lường được rõ nhất khi triển khai tủ locker thông minh tại chung cư là giảm tải nhân lực bảo vệ. Tại một chung cư 300 căn nhận trung bình 80-100 kiện hàng/ngày, bảo vệ có thể tiết kiệm 2-3 giờ/ngày từ việc không phải ký nhận, bảo quản và thông báo từng kiện hàng — tương đương giảm 1-2 nhân viên hoặc để lực lượng hiện có tập trung vào bảo vệ an ninh thực sự.",
        "Tại môi trường văn phòng và khu công nghiệp, lợi ích chính đến từ loại bỏ chi phí và rủi ro quản lý chìa khóa: không còn chìa bị mất, sao chép trái phép hay phải thay toàn bộ ổ khóa khi nhân viên nghỉ việc. Lịch sử truy cập đầy đủ cũng hỗ trợ quản lý tài sản và điều tra sự cố nội bộ.",
        "Tính năng thu phí gửi đồ tự động (tích hợp thanh toán) biến tủ locker thành nguồn thu nhập thụ động cho chủ mặt bằng tại trung tâm thương mại, ga tàu và sân bay. Tại các điểm có lưu lượng cao, thu nhập từ phí gửi đồ có thể đủ để tự hoàn vốn thiết bị trong 18-36 tháng.",
      ],
    },
    process: {
      title: "Quy trình triển khai tủ locker thông minh với TSE Vending",
      steps: [
        { num: "01", title: "Khảo sát nhu cầu & vị trí", desc: "Đánh giá số lượng người dùng, tần suất sử dụng, yêu cầu tích hợp (API, thẻ nhân viên, thanh toán) và không gian vật lý để thiết kế cấu hình phù hợp nhất." },
        { num: "02", title: "Thiết kế hệ thống & báo giá", desc: "Đề xuất số ô, kích thước ô, công nghệ xác thực và phần mềm quản lý. Báo giá chi tiết từng hạng mục, không phát sinh chi phí ẩn sau ký hợp đồng." },
        { num: "03", title: "Sản xuất & kiểm tra chất lượng", desc: "Tủ được sản xuất theo đơn đặt hàng cụ thể, kiểm tra toàn bộ tính năng cơ khí và điện tử tại xưởng trước khi xuất hàng lắp đặt thực địa." },
        { num: "04", title: "Lắp đặt & tích hợp phần mềm", desc: "Lắp đặt vật lý, cài đặt phần mềm quản lý, cấu hình người dùng ban đầu và kiểm tra kết nối internet. Đào tạo quản trị viên sử dụng dashboard." },
        { num: "05", title: "Hỗ trợ & bảo trì dài hạn", desc: "Bảo trì định kỳ cơ khí và cập nhật firmware tự động. Hỗ trợ kỹ thuật 24/7 qua hotline và có thể điều phối kỹ thuật viên đến xử lý tại chỗ khi cần." },
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
      <PageHeader
        eyebrow="Sản phẩm & dịch vụ"
        title={silo.h1}
        description={silo.intro[0]}
        breadcrumbs={[{ name: silo.title, path: `/${silo.slug}` }]}
      />

      {/* ── MAIN CONTENT ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left: intro + subcategories */}
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                {silo.intro.slice(1).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              <h2 className="mt-10 mb-5 text-xl font-extrabold text-slate-900">Danh mục sản phẩm</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {silo.subcategories.map((sub) => (
                  <CategoryCard
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    icon={sub.icon}
                    title={sub.title}
                    description={sub.metaDescription}
                  />
                ))}
              </div>
            </div>

            {/* Right: features sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
                <h2 className="text-base font-bold text-brand-900">Vì sao chọn TSE Vending?</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {silo.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <p className="text-sm font-semibold text-accent-800">Tư vấn miễn phí</p>
                <p className="mt-2 text-xs text-accent-700 leading-relaxed">
                  Đội chuyên gia TSE Vending khảo sát vị trí và đề xuất giải pháp phù hợp — không tính phí tư vấn ban đầu.
                </p>
                <a
                  href="/lien-he"
                  className="mt-4 block rounded-xl bg-accent-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-accent-600"
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
          <h2 className="mb-2 text-xl font-extrabold text-slate-900">
            Nên chọn dòng nào? Bảng so sánh nhanh
          </h2>
          <p className="mb-6 max-w-3xl text-sm text-slate-600">
            Mỗi dòng sản phẩm trong nhóm {silo.title.toLowerCase()} phù hợp với một nhóm vị trí và mục tiêu khác nhau. Tham khảo bảng dưới để chọn phù hợp, hoặc liên hệ TSE Vending để được tư vấn theo vị trí thực tế.
          </p>
          <ComparisonTable subcategories={silo.subcategories} />
        </div>
      </section>

      {/* ── EXTENDED CONTENT (only if exists) ── */}
      {ext && (
        <>
          {/* What is / How works */}
          <section className="py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{ext.whatIs.title}</h2>
                  <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
                    {ext.whatIs.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{ext.howWorks.title}</h2>
                  <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
                    {ext.howWorks.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Locations / Applications */}
          <section className="border-t border-slate-100 bg-slate-50 py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-3 text-2xl font-extrabold text-slate-900">{ext.locations.title}</h2>
              <p className="mb-8 max-w-3xl text-slate-600">
                Vị trí đặt thiết bị là yếu tố quan trọng nhất quyết định hiệu quả đầu tư. Dưới đây là các môi trường phổ biến và đặc điểm vận hành tương ứng.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ext.locations.items.map((loc) => (
                  <div key={loc.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900">{loc.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investment & ROI */}
          <section className="py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{ext.investment.title}</h2>
                  <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
                    {ext.investment.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{ext.roi.title}</h2>
                  <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
                    {ext.roi.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="border-t border-slate-100 bg-brand-700 py-14 text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-10 text-2xl font-extrabold">{ext.process.title}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {ext.process.steps.map((step) => (
                  <div key={step.num}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-base font-extrabold text-white">
                      {step.num}
                    </div>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-brand-200">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/lien-he"
                  className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
                >
                  Bắt đầu tư vấn miễn phí →
                </Link>
                <Link
                  href="/giai-phap-kinh-doanh"
                  className="rounded-full border-2 border-brand-300 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
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
            <h2 className="mb-6 text-xl font-extrabold text-slate-900">
              Bài viết chuyên sâu về {silo.title.toLowerCase()}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <FaqSection faqs={silo.faqs} title={`Câu hỏi thường gặp về ${silo.title.toLowerCase()}`} />
      <Cta />
    </>
  );
}
