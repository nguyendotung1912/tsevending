// Case studies — linkable assets built from REAL, already-published project data
// (see /du-an, content/reviews.ts and the per-niche "Dự án thực tế" sections).
//
// ⚠ Client names/logos: [CẦN XÁC NHẬN QUYỀN DÙNG TÊN/LOGO] before any PR push.
// ⚠ Figures flagged `real: false` are [CẦN SỐ THẬT] — placeholders to confirm.

export interface CaseResult {
  value: string;
  label: string;
  /** false → render as [CẦN SỐ THẬT] (not a confirmed figure). */
  real: boolean;
}

export interface CaseStudy {
  slug: string;
  client: string;
  clientShort: string;
  /** Short label for the logo tile (text logo placeholder). */
  logoText: string;
  industry: string;
  location: string;
  year: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  context: string;
  problem: string[];
  solution: string[];
  results: CaseResult[];
  testimonial?: { text: string; author: string; role: string };
  /** Niche/pillar pages to internally link back to. */
  related: { label: string; href: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "smart-locker-vinhomes-grand-park",
    client: "Chung cư Vinhomes Grand Park",
    clientShort: "Vinhomes Grand Park",
    logoText: "Vinhomes Grand Park",
    industry: "Chung cư / Dân cư",
    location: "TP. Thủ Đức, TP.HCM",
    year: "2024",
    metaTitle: "Case Study: Smart Locker Vinhomes Grand Park | TSE",
    metaDescription:
      "Dự án tủ locker thông minh nhận hàng 24/7 tại chung cư Vinhomes Grand Park: 24 ô tủ, tích hợp API vận đơn, giảm ~80% khối lượng nhận hàng của bảo vệ.",
    summary:
      "TSE Vending triển khai hệ thống tủ locker nhận hàng tự động 24/7 tại chung cư Vinhomes Grand Park, giúp cư dân nhận bưu phẩm thương mại điện tử mọi lúc và giảm mạnh khối lượng nhận hàng hộ của bảo vệ.",
    context:
      "Vinhomes Grand Park là đại đô thị với hàng nghìn cư dân và lượng đơn thương mại điện tử rất lớn mỗi ngày. Khi sản lượng bưu kiện tăng cao, việc nhận hàng hộ trở thành gánh nặng vận hành cho ban quản lý và bộ phận bảo vệ.",
    problem: [
      "Bảo vệ phải ký nhận, bảo quản và thông báo thủ công hàng trăm kiện hàng mỗi ngày.",
      "Cư dân phải chờ giờ hành chính hoặc gặp trực tiếp bảo vệ để lấy hàng.",
      "Khó truy vết khi xảy ra thất lạc bưu phẩm do thiếu lịch sử giao nhận.",
    ],
    solution: [
      "Lắp đặt 24 ô tủ locker đa kích thước S/M/L tại sảnh, mở khóa bằng QR code và mã PIN.",
      "Tích hợp API với GHN, GHTK và Shopee Express để shipper gửi hàng vào tủ một lần.",
      "Tự động gửi mã nhận hàng cho cư dân qua SMS/Zalo ngay khi có bưu phẩm.",
      "Ghi log đầy đủ kèm timestamp cho mỗi lượt gửi/nhận, bảo vệ quyền lợi các bên.",
    ],
    results: [
      { value: "24 ô tủ", label: "Cấu hình S/M/L tại sảnh chung cư", real: true },
      { value: "~80%", label: "Giảm khối lượng nhận hàng hộ của bảo vệ", real: true },
      { value: "24/7", label: "Cư dân nhận hàng mọi lúc, không cần gặp bảo vệ", real: true },
      { value: "[CẦN SỐ THẬT]", label: "Số lượt gửi/nhận trung bình mỗi tháng", real: false },
    ],
    testimonial: {
      text: "Tủ locker thông minh hoạt động ổn định từ khi lắp đặt. Cư dân nhận hàng tự động 24/7, bảo vệ không còn phải ký nhận hộ. Đội kỹ thuật TSE phản hồi nhanh khi có sự cố nhỏ, rất hài lòng.",
      author: "Nguyễn Minh Tuấn",
      role: "Trưởng Ban Quản Lý, Chung cư Vinhomes Grand Park",
    },
    related: [
      { label: "Tủ locker thông minh chung cư", href: "/tu-locker-thong-minh/tu-locker-chung-cu" },
      { label: "Tủ locker giao nhận hàng", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang" },
    ],
  },
  {
    slug: "smart-locker-dai-hoc-kinh-te-tphcm",
    client: "Trường Đại học Kinh tế TP.HCM (UEH)",
    clientShort: "ĐH Kinh tế TP.HCM",
    logoText: "UEH",
    industry: "Giáo dục / Đại học",
    location: "TP.HCM",
    year: "2024",
    metaTitle: "Case Study: Smart Locker ĐH Kinh tế TP.HCM | TSE",
    metaDescription:
      "Dự án tủ gửi đồ thông minh tại khu thể thao Trường Đại học Kinh tế TP.HCM: 40 ô tủ mở khóa bằng thẻ sinh viên RFID, chấm dứt mất chìa và thất lạc đồ.",
    summary:
      "TSE Vending lắp đặt tủ gửi đồ thông minh tại khu thể thao Trường Đại học Kinh tế TP.HCM, cho sinh viên gửi đồ an toàn bằng thẻ sinh viên RFID có sẵn, loại bỏ hoàn toàn rủi ro mất chìa của tủ cơ truyền thống.",
    context:
      "Khu thể thao của trường phục vụ lượng lớn sinh viên mỗi ngày. Hệ thống tủ khóa cơ truyền thống thường xuyên phát sinh sự cố mất chìa, trùng khóa và thất lạc tài sản, tạo gánh nặng quản lý cho bộ phận cơ sở vật chất.",
    problem: [
      "Tủ khóa cơ thường xuyên mất chìa, phải làm thêm chìa và thay ổ khóa.",
      "Không có lịch sử truy cập để xử lý khi sinh viên báo mất đồ.",
      "Quản lý thủ công tốn nhân sự, đặc biệt vào giờ cao điểm.",
    ],
    solution: [
      "Lắp đặt 40 ô tủ dạng module, mở khóa bằng thẻ sinh viên RFID sẵn có.",
      "Phân quyền theo lớp, khoa và học kỳ; tự động reset cuối mỗi học kỳ.",
      "Quản lý tập trung qua app, không cần bố trí nhân viên trực tại khu tủ.",
    ],
    results: [
      { value: "40 ô tủ", label: "Mở khóa bằng thẻ sinh viên RFID", real: true },
      { value: "0", label: "Sự cố mất chìa / trùng khóa sau khi chuyển đổi", real: true },
      { value: "Tự động", label: "Reset quyền truy cập cuối mỗi học kỳ", real: true },
      { value: "[CẦN SỐ THẬT]", label: "Số sinh viên sử dụng mỗi ngày", real: false },
    ],
    testimonial: {
      text: "Tủ gửi đồ thông minh tại khu thể thao được sinh viên đón nhận rất tích cực. Không còn phàn nàn về mất đồ hay thất lạc chìa khóa. Việc quản lý qua app rất tiện, không cần nhân viên trực.",
      author: "Lê Hoàng Phúc",
      role: "Giám Đốc Cơ Sở Vật Chất, Trường Đại học Kinh tế TP.HCM",
    },
    related: [
      { label: "Tủ locker trường học / đại học", href: "/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc" },
      { label: "Tủ gửi đồ thông minh", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh" },
    ],
  },
  {
    slug: "smart-locker-benh-vien-tphcm",
    client: "Bệnh viện Đa khoa tư nhân (TP.HCM)",
    clientShort: "Bệnh viện Đa khoa tư nhân TP.HCM",
    logoText: "Bệnh viện ĐK tư nhân",
    industry: "Y tế",
    location: "TP.HCM",
    year: "2025",
    metaTitle: "Case Study: Smart Locker Bệnh Viện | TSE Vending",
    metaDescription:
      "Dự án tủ locker thông minh kháng khuẩn cho khu nhân viên y tế tại bệnh viện đa khoa tư nhân TP.HCM: mở khóa không chạm, bề mặt chống khuẩn, quản lý theo ca trực.",
    summary:
      "TSE Vending triển khai tủ locker kháng khuẩn cho khu nhân viên y tế tại một bệnh viện đa khoa tư nhân ở TP.HCM, đáp ứng tiêu chuẩn vệ sinh y tế với cơ chế mở khóa không chạm.",
    context:
      "Nhân viên y tế làm ca trực dài cần nơi lưu trữ đồ cá nhân an toàn, trong môi trường đòi hỏi vệ sinh khử khuẩn nghiêm ngặt và hạn chế tiếp xúc bề mặt để giảm lây nhiễm chéo.",
    problem: [
      "Tủ thông thường không chịu được vệ sinh bằng hóa chất cồn và dung dịch khử khuẩn.",
      "Bề mặt tiếp xúc (bàn phím, tay nắm) tiềm ẩn nguy cơ lây nhiễm chéo.",
      "Cần phân vùng và quản lý theo ca trực thay vì gán cố định.",
    ],
    solution: [
      "Tủ bề mặt kháng khuẩn, chịu lau rửa cồn 70% và dung dịch khử khuẩn y tế.",
      "Mở khóa bằng QR code / vân tay — loại bỏ bề mặt tiếp xúc vật lý.",
      "Tích hợp lịch ca trực: ô tủ gán tự động đầu ca, reset khi hết ca.",
    ],
    results: [
      { value: "Kháng khuẩn", label: "Bề mặt đạt chuẩn vệ sinh y tế", real: true },
      { value: "Không chạm", label: "Mở khóa giảm nguy cơ lây nhiễm chéo", real: true },
      { value: "[CẦN SỐ THẬT]", label: "Số ô tủ đã lắp đặt", real: false },
      { value: "[CẦN SỐ THẬT]", label: "Số nhân viên y tế sử dụng theo ca", real: false },
    ],
    testimonial: {
      text: "Tủ locker khu nhân viên y tế đáp ứng đúng tiêu chuẩn chống khuẩn như cam kết. Nhân viên y tế rất hài lòng, không lo mất đồ cá nhân trong ca trực dài.",
      author: "Phạm Văn Hùng",
      role: "Quản Lý Vận Hành, Bệnh viện Đa khoa tư nhân TP.HCM",
    },
    related: [
      { label: "Tủ locker bệnh viện / y tế", href: "/tu-locker-thong-minh/tu-locker-benh-vien-y-te" },
      { label: "Tổng quan tủ locker thông minh", href: "/tu-locker-thong-minh" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
