// Local landing data for smart-locker by city. TSE has resident technicians in
// these provinces (real service presence) — so these pages are legitimate local
// pages, not doorway pages. Each city has UNIQUE content to avoid duplication.
export interface LockerArea {
  slug: string;
  city: string;        // hiển thị, vd "TP.HCM"
  cityFull: string;    // tên đầy đủ
  metaTitle: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  intro: string[];     // 2 đoạn, bối cảnh riêng từng thành phố
  useCases: { name: string; href: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const lockerAreas: LockerArea[] = [
  {
    slug: "ho-chi-minh",
    city: "TP.HCM",
    cityFull: "Thành phố Hồ Chí Minh",
    metaTitle: "Smart Locker TP.HCM - Tủ Locker Thông Minh | TSE Vending",
    metaDescription:
      "Lắp đặt smart locker (tủ locker thông minh) tại TP.HCM: chung cư, văn phòng, KCN, bệnh viện, logistics. Kỹ thuật viên TSE thường trú — khảo sát & báo giá miễn phí.",
    h1: "Smart Locker tại TP.HCM (Tủ Locker Thông Minh)",
    quickAnswer:
      "TSE Vending cung cấp và lắp đặt smart locker (tủ locker thông minh) tại TP.HCM với kỹ thuật viên thường trú — khảo sát, lắp đặt và bảo trì trong ngày cho chung cư, văn phòng, khu công nghiệp, bệnh viện và điểm giao nhận hàng. Liên hệ để nhận báo giá miễn phí.",
    intro: [
      "TP.HCM là đô thị có mật độ chung cư cao tầng lớn nhất cả nước và lượng đơn thương mại điện tử khổng lồ — đúng môi trường mà smart locker phát huy hiệu quả nhất. Áp lực nhận hàng hộ tại sảnh chung cư và nhu cầu tự động hóa lưu trữ tại văn phòng, khu công nghiệp khiến tủ locker thông minh trở thành tiện ích gần như bắt buộc.",
      "Với đội kỹ thuật thường trú tại TP.HCM, TSE Vending khảo sát vị trí, lắp đặt và bảo trì nhanh — không phải chờ điều phối từ tỉnh khác. Đây là khác biệt quan trọng vì smart locker cần hỗ trợ kịp thời khi vận hành.",
    ],
    useCases: [
      { name: "Chung cư cao tầng", href: "/tu-locker-thong-minh/tu-locker-chung-cu", desc: "Nhận hàng hộ cư dân 24/7 tại các khu căn hộ đông dân khắp thành phố." },
      { name: "Văn phòng & KCN", href: "/tu-locker-thong-minh/tu-locker-van-phong", desc: "Lưu đồ nhân viên, giao nhận nội bộ tại tòa văn phòng và khu công nghiệp." },
      { name: "Bệnh viện", href: "/tu-locker-thong-minh/tu-locker-benh-vien-y-te", desc: "Tủ kháng khuẩn cho nhân viên y tế tại các bệnh viện lớn." },
      { name: "Logistics", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang", desc: "Điểm giao nhận hàng tự động cho shipper và sàn TMĐT." },
    ],
    faqs: [
      { q: "TSE có lắp smart locker tại TP.HCM không?", a: "Có. TSE Vending có kỹ thuật viên thường trú tại TP.HCM, đảm bảo khảo sát, lắp đặt và bảo trì smart locker nhanh chóng tại tất cả các quận huyện." },
      { q: "Lắp tủ locker thông minh ở chung cư TP.HCM mất bao lâu?", a: "Sau khảo sát sảnh, việc lắp đặt cơ bản thường hoàn tất trong 1–3 ngày tùy số ô và hạ tầng điện/mạng của tòa nhà." },
    ],
  },
  {
    slug: "ha-noi",
    city: "Hà Nội",
    cityFull: "Hà Nội",
    metaTitle: "Smart Locker Hà Nội - Tủ Locker Thông Minh | TSE Vending",
    metaDescription:
      "Lắp đặt smart locker (tủ locker thông minh) tại Hà Nội: chung cư, trường đại học, văn phòng, bệnh viện. Kỹ thuật viên TSE thường trú — khảo sát & báo giá miễn phí.",
    h1: "Smart Locker tại Hà Nội (Tủ Locker Thông Minh)",
    quickAnswer:
      "TSE Vending lắp đặt smart locker (tủ locker thông minh) tại Hà Nội với kỹ thuật viên thường trú — phục vụ chung cư, trường đại học, văn phòng và bệnh viện khu vực nội thành và các quận mở rộng. Liên hệ để được khảo sát và báo giá miễn phí.",
    intro: [
      "Hà Nội có mật độ dân cư nội thành rất cao cùng hệ thống trường đại học, văn phòng và chung cư dày đặc — nhu cầu lưu trữ và giao nhận tự động lớn. Tại các khu căn hộ và trường đại học, smart locker giải quyết bài toán nhận hàng và gửi đồ mà tủ khóa cơ truyền thống không đáp ứng nổi.",
      "TSE Vending duy trì đội kỹ thuật thường trú tại Hà Nội, giúp triển khai và bảo trì smart locker nhanh tại nội thành cũng như các quận, huyện mở rộng — không phụ thuộc điều phối từ nơi khác.",
    ],
    useCases: [
      { name: "Trường đại học", href: "/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc", desc: "Tủ locker sinh viên dùng thẻ học sinh tại các trường đại học lớn của Hà Nội." },
      { name: "Chung cư", href: "/tu-locker-thong-minh/tu-locker-chung-cu", desc: "Nhận bưu phẩm hộ cư dân 24/7 tại các khu đô thị, chung cư nội thành." },
      { name: "Văn phòng & KCN", href: "/tu-locker-thong-minh/tu-locker-van-phong", desc: "Lưu đồ nhân viên, quản lý bằng thẻ tại tòa văn phòng và khu công nghiệp." },
      { name: "Bệnh viện", href: "/tu-locker-thong-minh/tu-locker-benh-vien-y-te", desc: "Tủ kháng khuẩn cho nhân viên y tế theo ca trực." },
    ],
    faqs: [
      { q: "TSE có lắp smart locker tại Hà Nội không?", a: "Có. TSE Vending có kỹ thuật viên thường trú tại Hà Nội, hỗ trợ khảo sát, lắp đặt và bảo trì smart locker tại nội thành và các quận, huyện." },
      { q: "Smart locker phù hợp cho trường đại học ở Hà Nội thế nào?", a: "Tủ locker thông minh dùng thẻ sinh viên RFID hoặc mã QR, phân quyền theo lớp/khoa và tự thu hồi cuối học kỳ — phù hợp với quy mô sinh viên lớn của các đại học Hà Nội." },
    ],
  },
  {
    slug: "da-nang",
    city: "Đà Nẵng",
    cityFull: "Đà Nẵng",
    metaTitle: "Smart Locker Đà Nẵng - Tủ Locker Thông Minh | TSE Vending",
    metaDescription:
      "Lắp đặt smart locker (tủ locker thông minh) tại Đà Nẵng: khách sạn/resort, chung cư, văn phòng, du lịch. Kỹ thuật viên TSE thường trú — khảo sát & báo giá miễn phí.",
    h1: "Smart Locker tại Đà Nẵng (Tủ Locker Thông Minh)",
    quickAnswer:
      "TSE Vending lắp đặt smart locker (tủ locker thông minh) tại Đà Nẵng với kỹ thuật viên thường trú — phục vụ khách sạn/resort, chung cư, văn phòng và điểm du lịch ven biển. Liên hệ để được khảo sát và báo giá miễn phí.",
    intro: [
      "Đà Nẵng là trung tâm du lịch lớn với mật độ khách sạn, resort cao — môi trường rất phù hợp cho tủ gửi hành lý thông minh phục vụ khách sau check-out. Bên cạnh đó, các khu chung cư và văn phòng đang phát triển nhanh cũng tạo nhu cầu lưu trữ, giao nhận tự động.",
      "TSE Vending có kỹ thuật viên thường trú tại Đà Nẵng, đảm bảo lắp đặt và bảo trì smart locker kịp thời cho cả khu vực ven biển du lịch lẫn khu dân cư, văn phòng trong thành phố.",
    ],
    useCases: [
      { name: "Khách sạn & resort", href: "/tu-locker-thong-minh/tu-locker-khach-san-resort", desc: "Tủ gửi hành lý tự phục vụ sau check-out cho khách du lịch tại Đà Nẵng." },
      { name: "Chung cư", href: "/tu-locker-thong-minh/tu-locker-chung-cu", desc: "Nhận hàng hộ cư dân 24/7 tại các khu căn hộ ven biển và trung tâm." },
      { name: "Văn phòng", href: "/tu-locker-thong-minh/tu-locker-van-phong", desc: "Lưu đồ nhân viên tại các tòa văn phòng đang mở rộng." },
      { name: "Gửi đồ công cộng", href: "/tu-locker-thong-minh/tu-gui-do-thong-minh", desc: "Tủ gửi đồ cho khu vui chơi, bãi biển, trung tâm thương mại." },
    ],
    faqs: [
      { q: "TSE có lắp smart locker tại Đà Nẵng không?", a: "Có. TSE Vending có kỹ thuật viên thường trú tại Đà Nẵng, hỗ trợ khảo sát, lắp đặt và bảo trì smart locker cho khách sạn, chung cư và văn phòng trong thành phố." },
      { q: "Khách sạn ở Đà Nẵng dùng smart locker để làm gì?", a: "Phổ biến nhất là tủ gửi hành lý tự phục vụ: khách trả phòng sớm nhưng bay muộn có thể tự gửi và lấy hành lý bằng mã OTP 24/7, giảm tải cho lễ tân." },
    ],
  },
];

export function getLockerArea(slug: string): LockerArea | undefined {
  return lockerAreas.find((a) => a.slug === slug);
}
