/**
 * Thêm 75 topic vending machine + 113 topic smart locker mới vào content-calendar.json
 * Run: npx tsx scripts/add-topics.ts
 */
import fs from "fs";
import path from "path";

const CALENDAR_PATH = path.join("scripts", "content-calendar.json");

interface CalendarItem {
  id: number;
  silo: string;
  sub: string;
  topic: string;
  keywords: string[];
  status: "pending" | "published";
  publishedSlug?: string;
  publishedDate?: string;
}

const newVendingTopics: Omit<CalendarItem, "id" | "status">[] = [
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán nước sạch tự động tại khu dân cư mới hình thành: Cơ hội tiên phong",
    keywords: ["máy bán nước sạch", "khu dân cư mới", "vending machine nước uống"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine tại sân tennis và pickleball: Nước thể thao và gel năng lượng",
    keywords: ["máy bán hàng sân tennis", "vending machine thể thao", "gel năng lượng tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại rạp chiếu phim: Snack và nước uống premium",
    keywords: ["máy bán hàng rạp phim", "vending machine rạp chiếu phim", "snack cinema"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán sữa tươi nguyên chất tự động: Xu hướng farm-to-table mới tại Việt Nam",
    keywords: ["máy bán sữa tươi tự động", "sữa nguyên chất vending", "farm to table"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán nước detox và cold-press juice tự động: Xu hướng sức khỏe 2026",
    keywords: ["máy bán nước detox tự động", "cold press juice vending", "nước ép tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine tại chuỗi karaoke: Cơ hội doanh thu bổ trợ cho chủ quán",
    keywords: ["máy bán hàng karaoke", "vending machine quán karaoke", "kinh doanh karaoke"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại bãi đỗ xe: Cơ hội tiềm năng ít ai khai thác",
    keywords: ["máy bán hàng bãi đỗ xe", "vending machine parking", "kinh doanh bãi xe"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán đồ lưu niệm tự động tại điểm du lịch nổi tiếng Việt Nam",
    keywords: ["máy bán đồ lưu niệm tự động", "souvenir vending machine", "du lịch tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Vending machine tại homestay và Airbnb: Xu hướng hospitality mới không cần nhân viên",
    keywords: ["máy bán hàng homestay", "vending airbnb", "hospitality tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại bến phà và bến tàu: Phục vụ hành khách 24/7",
    keywords: ["máy bán hàng bến phà", "vending machine bến tàu", "hành khách đường thủy"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Kinh doanh máy bán nước tinh khiết tự động tại khu dân cư: Phân tích lợi nhuận",
    keywords: ["máy bán nước tinh khiết", "kinh doanh nước uống tự động", "ROI nước uống"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Thuê máy bán hàng tự động ngắn hạn: Chi phí, điều kiện và lợi thế so với mua",
    keywords: ["thuê máy bán hàng tự động", "cho thuê vending machine", "thuê ngắn hạn"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Chiến lược định giá sản phẩm trong máy bán hàng tự động: Tối ưu margin 2026",
    keywords: ["định giá máy bán hàng", "pricing strategy vending", "tối ưu doanh thu"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Màn hình quảng cáo tích hợp máy bán hàng: Nguồn thu nhập phụ hiệu quả",
    keywords: ["quảng cáo trên máy bán hàng", "digital signage vending", "doanh thu quảng cáo"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại phòng gym: Protein shake, BCAA và thực phẩm thể thao",
    keywords: ["máy bán hàng phòng gym", "vending machine gym", "protein shake tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine tại câu lạc bộ bóng đá: Nước thể thao và gel năng lượng cho vận động viên",
    keywords: ["máy bán hàng câu lạc bộ bóng đá", "vending máy sân bóng", "thể thao vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại bãi biển công cộng: Kem chống nắng, đồ bơi và nước uống",
    keywords: ["máy bán hàng bãi biển", "beach vending machine", "kem chống nắng tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine dành cho văn phòng công nghệ: Snack xu hướng cho dev và designer",
    keywords: ["vending machine văn phòng công nghệ", "snack cho lập trình viên", "tech office vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại khu ẩm thực Food Court: Bổ trợ hay cạnh tranh?",
    keywords: ["máy bán hàng food court", "vending machine ẩm thực", "food court tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán đất sét và đồ chơi sáng tạo tự động cho trẻ em tại trung tâm mua sắm",
    keywords: ["máy bán đồ chơi tự động", "kids toy vending machine", "đất sét trẻ em tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Vending machine tại câu lạc bộ yoga và thiền định: Nước thảo dược và sản phẩm organic",
    keywords: ["máy bán hàng yoga", "vending machine thiền", "nước thảo dược tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "ky-thuat",
    topic: "Máy bán hàng tự động dành cho người khuyết tật: Tiêu chuẩn ADA và thiết kế phổ quát",
    keywords: ["máy bán hàng người khuyết tật", "vending machine ADA", "tiếp cận toàn diện"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "ky-thuat",
    topic: "Máy bán hàng tự động tích hợp AI nhận diện khuôn mặt: Cá nhân hóa trải nghiệm mua sắm",
    keywords: ["máy bán hàng AI nhận diện khuôn mặt", "face recognition vending", "cá nhân hóa vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-thanh-toan",
    topic: "Máy bán hàng tự động thanh toán bằng tiền xu: Mô hình cổ điển có còn phù hợp 2026?",
    keywords: ["máy bán hàng tiền xu", "coin vending machine", "thanh toán tiền xu"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-quan-ly",
    topic: "Phần mềm quản lý kho tích hợp máy bán hàng tự động: Inventory Management hiện đại",
    keywords: ["phần mềm quản lý kho vending", "inventory management vending machine", "tồn kho tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-quan-ly",
    topic: "Ứng dụng học máy (Machine Learning) trong dự đoán hàng hóa vending machine",
    keywords: ["machine learning vending machine", "dự đoán tồn kho AI", "AI vending machine"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-quan-ly",
    topic: "Máy bán hàng tự động tích hợp với app loyalty: Tích điểm và chương trình khuyến mãi",
    keywords: ["loyalty app vending machine", "tích điểm máy bán hàng", "khuyến mãi vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Cách thiết lập hợp đồng bảo trì máy bán hàng tự động chuyên nghiệp: Điều khoản cần có",
    keywords: ["hợp đồng bảo trì vending machine", "service contract máy bán hàng", "bảo trì chuyên nghiệp"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "ky-thuat",
    topic: "Lỗi thường gặp khi vận hành máy bán hàng tự động và cách xử lý nhanh",
    keywords: ["lỗi máy bán hàng tự động", "sự cố vending machine", "xử lý sự cố"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "ky-thuat",
    topic: "Thiết kế không gian tối ưu khu vực đặt máy bán hàng tự động: Tăng doanh thu",
    keywords: ["thiết kế vị trí máy bán hàng", "bố trí vending machine", "không gian tối ưu"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại phòng chờ bệnh viện: Đồ ăn nhẹ và nhu yếu phẩm",
    keywords: ["máy bán hàng phòng chờ bệnh viện", "vending machine waiting room", "nhu yếu phẩm bệnh viện"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại khu công nghệ cao: Xu hướng CNTT và sản xuất hiện đại",
    keywords: ["máy bán hàng khu công nghệ cao", "vending machine tech park", "công nghệ cao vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Vending machine tích hợp với hệ thống ERP doanh nghiệp: Tự động hóa toàn diện",
    keywords: ["vending machine ERP", "tích hợp hệ thống doanh nghiệp", "ERP vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Xe tải bán hàng tự động lưu động: Mobile vending truck xu hướng mới tại Việt Nam",
    keywords: ["xe tải vending machine", "mobile vending truck", "bán hàng lưu động tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động phục vụ ca đêm: Giải pháp cho nhân viên làm việc ban đêm",
    keywords: ["máy bán hàng ca đêm", "vending machine night shift", "tiện ích ca đêm"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động và trách nhiệm xã hội doanh nghiệp: CSR và giá trị cộng đồng",
    keywords: ["vending machine CSR", "trách nhiệm xã hội vending", "phúc lợi cộng đồng"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động tích hợp carbon footprint tracking: Vending xanh cho doanh nghiệp",
    keywords: ["carbon footprint vending", "máy bán hàng xanh", "ESG vending machine"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Vending machine tại trạm xe buýt điện: Tương lai giao thông xanh đô thị",
    keywords: ["vending machine xe buýt điện", "trạm sạc xe điện vending", "giao thông xanh"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Tương lai của máy bán hàng tự động Việt Nam: Xu hướng và dự báo 2027-2030",
    keywords: ["tương lai vending machine Việt Nam", "xu hướng 2030 vending", "dự báo thị trường"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Kinh nghiệm thực tế vận hành 10 máy bán hàng tự động: Bài học và rút ra",
    keywords: ["kinh nghiệm vận hành vending machine", "vận hành nhiều máy", "bài học thực tế"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Máy bán hàng tự động phục vụ nhân viên y tế: Nhu cầu đặc biệt tại bệnh viện",
    keywords: ["vending machine nhân viên y tế", "tiện ích bệnh viện nhân viên", "nhu cầu y tế"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại cửa hàng tiện lợi 24h: Bổ trợ hay cạnh tranh trực tiếp?",
    keywords: ["vending machine cửa hàng tiện lợi", "so sánh với cửa hàng tiện lợi", "cạnh tranh vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Xây dựng đội ngũ kỹ thuật bảo trì máy bán hàng tự động in-house vs thuê ngoài",
    keywords: ["đội kỹ thuật vending", "bảo trì in-house vending", "outsource bảo trì máy bán hàng"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại trung tâm thương mại: Vị trí chiến lược và cách thương lượng",
    keywords: ["máy bán hàng trung tâm thương mại", "vending mall", "thuê mặt bằng mall"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động nhận diện tuổi (age verification): Công nghệ bán sản phẩm hạn chế",
    keywords: ["age verification vending", "nhận diện tuổi máy bán hàng", "bán sản phẩm hạn chế"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Xu hướng wrap quảng cáo toàn thân máy bán hàng tự động: Tăng nhận diện thương hiệu",
    keywords: ["wrap quảng cáo vending machine", "branding máy bán hàng", "marketing vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng combo bán kèm: Chiến lược tăng doanh thu trên mỗi giao dịch",
    keywords: ["combo vending machine", "bán kèm máy bán hàng", "upsell vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán nước mía tự động: Xu hướng thức uống địa phương mới nổi tại Việt Nam",
    keywords: ["máy bán nước mía tự động", "sugarcane juice vending", "nước mía sạch"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine tại điểm câu cá và khu thể thao ngoài trời: Mồi và phụ kiện",
    keywords: ["vending machine câu cá", "máy bán hàng thể thao ngoài trời", "fishing vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán cà phê hạt rang xay tươi tại chỗ: Whole bean vending machine xu hướng mới",
    keywords: ["máy bán cà phê hạt rang xay", "whole bean vending", "cà phê tươi tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại cảng biển và cảng cá: Phục vụ thuyền viên và ngư dân",
    keywords: ["máy bán hàng cảng biển", "vending machine cảng cá", "thuyền viên ngư dân"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán đặc sản địa phương tự động: Quà tặng và sản vật vùng miền Việt Nam",
    keywords: ["máy bán đặc sản địa phương", "vending machine quà tặng", "đặc sản vùng miền"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Liên kết chuỗi cung ứng máy bán hàng tự động: Từ nhà sản xuất đến người tiêu dùng",
    keywords: ["chuỗi cung ứng vending machine", "supply chain vending", "nhà cung cấp hàng hóa"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "luat-phap",
    topic: "Máy bán hàng tự động và thuế: Hướng dẫn kê khai VAT và hóa đơn điện tử",
    keywords: ["thuế VAT máy bán hàng", "hóa đơn điện tử vending", "kế toán vending machine"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động phục vụ sự kiện hội chợ triển lãm: Logistics và setup",
    keywords: ["vending machine hội chợ", "máy bán hàng sự kiện", "triển lãm vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Cách chọn công ty bảo trì máy bán hàng tự động uy tín tại Việt Nam: Tiêu chí đánh giá",
    keywords: ["công ty bảo trì vending machine", "chọn nhà bảo trì", "đánh giá dịch vụ bảo trì"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Máy bán hàng tự động phục vụ VIP và premium: Vị trí cao cấp và sản phẩm hạng sang",
    keywords: ["premium vending machine", "máy bán hàng VIP", "vending machine cao cấp"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại khu phố cổ và trung tâm lịch sử: Hài hòa văn hóa",
    keywords: ["máy bán hàng phố cổ", "vending machine trung tâm lịch sử", "bảo tồn văn hóa"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Vending machine tại khu nghỉ dưỡng biển hè 2026: Cơ hội doanh thu cao điểm mùa hè",
    keywords: ["vending machine resort biển", "máy bán hàng mùa hè", "doanh thu cao điểm"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động tại sân golf: Premium product mix dành cho golfer Việt Nam",
    keywords: ["vending machine sân golf", "máy bán hàng golf", "sản phẩm golfer"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Phân tích lợi nhuận thực tế máy bán hàng tự động theo từng loại vị trí cụ thể",
    keywords: ["phân tích lợi nhuận vending", "ROI vending machine theo vị trí", "doanh thu thực tế"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động tích hợp mini fridge: Xu hướng hotel vending cạnh tranh với minibar",
    keywords: ["mini fridge vending machine", "hotel minibar vending", "khách sạn tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Xu hướng máy bán hàng tự động tái chế và hệ thống deposit tại Châu Âu: Bài học cho Việt Nam",
    keywords: ["reverse vending machine", "máy thu hồi chai tự động", "deposit system vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Máy bán hàng tự động dịch vụ hậu cần sự kiện đám cưới và tiệc cưới",
    keywords: ["vending machine tiệc cưới", "dịch vụ sự kiện vending", "đám cưới tự động"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động trên tàu hỏa và tàu cao tốc: Dịch vụ tiện ích đường sắt",
    keywords: ["vending machine tàu hỏa", "máy bán hàng đường sắt", "tiện ích hành khách tàu"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Máy bán hàng tự động cho khu vực khó tiếp cận: Giải pháp cung ứng hàng hóa vùng xa",
    keywords: ["vending machine vùng xa", "cung ứng hàng hóa khó tiếp cận", "rural vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-do-an-vat",
    topic: "Vending machine tại nhà máy điện và công trình hạ tầng: Tiện ích cho công nhân viên",
    keywords: ["vending machine nhà máy điện", "máy bán hàng công trình", "tiện ích hạ tầng"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "mo-hinh-kinh-doanh",
    topic: "Xây dựng thương hiệu máy bán hàng tự động tại Việt Nam: Chiến lược branding hiệu quả",
    keywords: ["thương hiệu vending machine", "branding vending Việt Nam", "marketing vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại phòng chờ cơ quan hành chính: Dịch vụ công hiện đại",
    keywords: ["vending machine cơ quan nhà nước", "tiện ích phòng chờ hành chính", "dịch vụ công"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động thế hệ tiếp theo tại Hàn Quốc và Singapore: Bài học cho Việt Nam",
    keywords: ["vending machine Hàn Quốc", "Singapore vending machine", "kinh nghiệm quốc tế"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại khu phức hợp dịch vụ tổng hợp: Tòa nhà văn phòng-căn hộ",
    keywords: ["vending machine tòa nhà hỗn hợp", "mixed-use building vending", "complex vending"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "may-ban-nuoc-giai-khat",
    topic: "Máy bán hàng tự động tại trung tâm chăm sóc người cao tuổi: Giải pháp tiện ích an toàn",
    keywords: ["vending machine người cao tuổi", "tiện ích dưỡng lão", "máy bán hàng an toàn"]
  },
  {
    silo: "may-ban-hang-tu-dong", sub: "xu-huong",
    topic: "Máy bán hàng tự động phục vụ cộng đồng phật giáo: Tiện ích tại chùa và đền thờ",
    keywords: ["vending machine chùa", "tiện ích phật giáo", "đền thờ tự động"]
  },
];

const newLockerTopics: Omit<CalendarItem, "id" | "status">[] = [
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh cho văn phòng không bàn cố định (hot-desking): Quản lý linh hoạt",
    keywords: ["locker hot-desking", "tủ locker văn phòng linh hoạt", "hot desk locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-chung-cu",
    topic: "Phân tích ROI thực tế khi đầu tư tủ locker thông minh tại chung cư",
    keywords: ["ROI locker chung cư", "chi phí đầu tư tủ locker", "lợi nhuận locker chung cư"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Tủ locker thông minh kết hợp điểm pick-up thương mại điện tử tại cửa hàng tiện lợi",
    keywords: ["locker pickup thương mại điện tử", "điểm nhận hàng tự động", "ecommerce pickup locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh dành cho công ty FDI: Đáp ứng tiêu chuẩn quốc tế tại nhà máy Việt Nam",
    keywords: ["locker FDI", "tủ locker nhà máy FDI", "tiêu chuẩn quốc tế locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh tích hợp sạc điện thoại: Giá trị gia tăng thu hút người dùng",
    keywords: ["locker sạc điện thoại", "charging locker", "tủ locker sạc pin"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh kết nối Zalo và Telegram: Thông báo nhận hàng tức thì",
    keywords: ["locker Zalo notification", "tủ locker telegram", "thông báo locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Phần mềm API tủ locker thông minh: Tích hợp với ứng dụng của doanh nghiệp",
    keywords: ["locker API", "tích hợp phần mềm locker", "locker SDK"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh tích hợp e-ink: Đổi thông tin hiển thị từ xa không dây",
    keywords: ["e-ink locker", "tủ locker màn hình giấy điện tử", "digital label locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh tích hợp cảm biến trọng lượng: Phát hiện hàng còn trong ô",
    keywords: ["weight sensor locker", "cảm biến trọng lượng locker", "smart locker sensor"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "So sánh các giao thức bảo mật của tủ locker thông minh: AES-256, TLS và HTTPS",
    keywords: ["bảo mật locker AES", "giao thức bảo mật tủ locker", "TLS locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh tích hợp IoT gateway: Kết nối hệ sinh thái thiết bị thông minh",
    keywords: ["IoT gateway locker", "tủ locker IoT", "smart home locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh kết nối API với hệ thống quản lý tòa nhà BMS",
    keywords: ["BMS locker integration", "tủ locker tòa nhà thông minh", "building management locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh đa ngôn ngữ: Giao diện tiếng Anh, Nhật, Hàn, Trung cho khu công nghiệp",
    keywords: ["locker đa ngôn ngữ", "multilingual smart locker", "locker ngoại ngữ"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh trong môi trường chống tĩnh điện ESD: Bảo vệ linh kiện điện tử",
    keywords: ["ESD locker", "tủ locker chống tĩnh điện", "anti-static locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "cong-nghe-locker",
    topic: "Tủ locker thông minh tích hợp hệ thống phòng cháy chữa cháy: An toàn PCCC",
    keywords: ["locker PCCC", "tủ locker phòng cháy", "fire safety locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh phân quyền theo cấp bậc: Quản lý Manager, nhân viên và khách",
    keywords: ["phân quyền tủ locker", "role-based locker access", "quản lý cấp bậc locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh tích hợp hóa đơn điện tử tự động theo từng giao dịch",
    keywords: ["hóa đơn điện tử locker", "tự động xuất hóa đơn", "e-invoice locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh tích hợp thanh toán tiền mặt và ví điện tử MoMo, VNPay",
    keywords: ["thanh toán ví điện tử locker", "MoMo locker", "VNPay tủ locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh sử dụng năng lượng mặt trời: Giải pháp cho vùng không có điện lưới",
    keywords: ["locker năng lượng mặt trời", "solar locker", "tủ locker điện mặt trời"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh tích hợp camera thermal: Phát hiện đồ vật nguy hiểm và kiểm soát an ninh",
    keywords: ["camera thermal locker", "tủ locker camera nhiệt", "an ninh locker AI"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tinh-nang-locker",
    topic: "Tủ locker thông minh tích hợp token và điểm thưởng: Gamification cho người dùng",
    keywords: ["loyalty token locker", "điểm thưởng tủ locker", "gamification locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "chat-lieu-locker",
    topic: "Tủ locker thông minh chống cháy nổ: Tiêu chuẩn an toàn PCCC và vật liệu chịu lửa",
    keywords: ["locker chống cháy", "tủ locker chịu lửa", "fire-resistant locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "chat-lieu-locker",
    topic: "Tủ locker thông minh ngoài trời IP65: Chịu mưa nắng và điều kiện khắc nghiệt",
    keywords: ["locker IP65 ngoài trời", "outdoor waterproof locker", "tủ locker chống thấm"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "chat-lieu-locker",
    topic: "Tủ locker thông minh chịu nhiệt độ cao: Phù hợp khu vực công nghiệp luyện kim và đúc",
    keywords: ["locker chịu nhiệt", "high temperature locker", "tủ locker công nghiệp"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "chat-lieu-locker",
    topic: "Tủ locker thông minh chống ẩm và chống trộm trong kho hàng và nhà xưởng",
    keywords: ["locker chống ẩm kho", "moisture-proof locker", "tủ locker nhà kho"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Hệ thống quản lý tủ locker đa tầng đa tòa: Giải pháp tổng thể cho tập đoàn lớn",
    keywords: ["locker đa tòa", "hệ thống locker tập đoàn", "multi-building locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh tại tòa nhà hỗn hợp văn phòng-dân cư: Giải pháp toàn diện",
    keywords: ["locker mixed-use building", "tủ locker tòa nhà hỗn hợp", "văn phòng dân cư locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh giải pháp BYOD (Bring Your Own Device): Bảo mật thiết bị cá nhân",
    keywords: ["BYOD locker", "tủ locker bảo mật laptop", "device locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh dành cho CEO và lãnh đạo cao cấp: Bảo mật tài liệu mật",
    keywords: ["locker lãnh đạo", "executive locker", "tủ locker bảo mật cấp cao"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Chiến lược marketing tủ locker thông minh: Thu hút và thuyết phục khách hàng B2B",
    keywords: ["marketing locker B2B", "bán tủ locker doanh nghiệp", "sales locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh tại văn phòng luật sư và công chứng: Bảo mật hồ sơ pháp lý",
    keywords: ["locker văn phòng luật", "tủ locker hồ sơ pháp lý", "legal locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh cho ngành in ấn và xuất bản: Quản lý thiết bị và vật tư",
    keywords: ["locker ngành in ấn", "tủ locker xưởng in", "printing locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-chung-cu",
    topic: "Tủ locker thông minh tại khu đô thị sinh thái xanh: Giải pháp thân thiện môi trường",
    keywords: ["locker khu đô thị xanh", "eco locker", "tủ locker xanh"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-chung-cu",
    topic: "Tủ locker thông minh tại khu dân cư thấp tầng liền kề và shophouse: Xu hướng mới",
    keywords: ["locker nhà liền kề", "shophouse locker", "tủ locker nhà phố"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-chung-cu",
    topic: "Giải pháp tủ locker thông minh cho biệt thự và nhà liền kề cao cấp: Tiêu chuẩn luxury",
    keywords: ["locker biệt thự", "luxury locker", "tủ locker nhà cao cấp"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-chung-cu",
    topic: "Tủ locker thông minh tại làng đại học: Kết nối nhiều cơ sở giáo dục trên một nền tảng",
    keywords: ["locker làng đại học", "university village locker", "campus locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Tủ locker thông minh dành cho shipper theo giờ: Nhận hàng linh hoạt không cố định",
    keywords: ["locker shipper", "tủ locker giao hàng theo giờ", "flexible delivery locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Tủ locker thông minh cho mô hình hub-and-spoke giao nhận: Phân phối từ trung tâm",
    keywords: ["locker hub and spoke", "tủ locker trung tâm phân phối", "hub locker logistics"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Tủ locker thông minh phục vụ điểm ăn uống food delivery pickup: Giải pháp F&B",
    keywords: ["locker food delivery", "food pickup locker", "tủ locker nhà hàng giao hàng"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Tủ locker thông minh cho thương mại điện tử B2B: Giao hàng văn phòng tự động",
    keywords: ["locker B2B ecommerce", "tủ locker giao hàng văn phòng", "B2B delivery locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-giao-nhan-hang",
    topic: "Xu hướng tủ locker giao nhận hàng tại Hàn Quốc: Kakao i Locker và mô hình tiên tiến",
    keywords: ["Kakao locker Hàn Quốc", "locker giao nhận Hàn Quốc", "mô hình locker châu Á"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-truong-hoc",
    topic: "Tủ locker thông minh dành cho học sinh THPT: Giải pháp giảm tải balo nặng mỗi ngày",
    keywords: ["locker học sinh THPT", "tủ locker trường cấp 3", "giảm tải sách vở"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-truong-hoc",
    topic: "Tủ locker thông minh phục vụ mầm non và tiểu học: Quản lý đồ dùng và bảo mật",
    keywords: ["locker trường mầm non", "tủ locker tiểu học", "locker trẻ em nhỏ"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-truong-hoc",
    topic: "Tủ locker thông minh tại trung tâm dạy nghề và giáo dục nghề nghiệp: Bảo vệ dụng cụ",
    keywords: ["locker dạy nghề", "tủ locker trường nghề", "vocational locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-benh-vien",
    topic: "Tủ locker thông minh tại bệnh viện tư nhân: Nâng cao trải nghiệm bệnh nhân",
    keywords: ["locker bệnh viện tư nhân", "tủ locker bệnh viện quốc tế", "patient locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-benh-vien",
    topic: "Tủ locker thông minh theo dõi chuỗi lạnh dược phẩm: Cold chain locker y tế",
    keywords: ["cold chain locker dược phẩm", "tủ locker lạnh y tế", "pharmaceutical locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-benh-vien",
    topic: "Tủ locker thông minh dành cho ngành dược phẩm và nhà phân phối: Kiểm soát chuỗi lạnh",
    keywords: ["locker nhà phân phối dược", "pharmaceutical distributor locker", "drug locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại sân tennis và pickleball: Gửi vợt và phụ kiện thể thao",
    keywords: ["locker sân tennis", "tủ locker sân pickleball", "racket storage locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại phòng chơi bowling và bida: Gửi đồ trong khi giải trí",
    keywords: ["locker phòng bowling", "tủ locker bida", "entertainment locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu phức hợp thể thao: Quản lý thiết bị dùng chung",
    keywords: ["locker khu thể thao phức hợp", "sports complex locker", "shared equipment locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại câu lạc bộ đọc sách và không gian học tập cộng đồng",
    keywords: ["locker câu lạc bộ sách", "reading club locker", "library community locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại rạp chiếu phim: Gửi đồ và nhận vé trước suất chiếu",
    keywords: ["locker rạp phim", "cinema locker", "tủ locker rạp chiếu phim"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu vui chơi giải trí và công viên nước: Gửi đồ an toàn",
    keywords: ["locker công viên nước", "theme park locker", "tủ locker vui chơi"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại trung tâm thể dục thẩm mỹ và yoga: Quản lý đồ khách hàng",
    keywords: ["locker yoga studio", "fitness center locker", "tủ locker thể hình"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu cắm trại và dã ngoại ngoài trời: Giải pháp ngoài trời",
    keywords: ["locker cắm trại", "outdoor camping locker", "tủ locker dã ngoại"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu mua sắm duty-free sân bay: Lưu trữ đồ mua sắm",
    keywords: ["locker duty-free", "airport shopping locker", "tủ locker mua sắm sân bay"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu du thuyền và cảng hàng hải: Bảo mật đồ dùng thủy thủ",
    keywords: ["locker cảng hàng hải", "marina locker", "tủ locker tàu du thuyền"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu resort núi và du lịch mạo hiểm: Giải pháp vận chuyển nhẹ",
    keywords: ["locker resort núi", "adventure locker", "tủ locker du lịch mạo hiểm"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh khu phức hợp vui chơi trẻ em và nhà banh: Tiện ích cho phụ huynh",
    keywords: ["locker nhà banh trẻ em", "kids play locker", "tủ locker vui chơi trẻ em"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu phức hợp bán lẻ outlet và discount mall",
    keywords: ["locker outlet mall", "tủ locker trung tâm outlet", "discount mall locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-gui-do-thong-minh",
    topic: "Tủ locker thông minh tại khu vực phòng thử quần áo: Lưu trữ đồ cá nhân thời trang",
    keywords: ["locker phòng thử đồ", "fitting room locker", "fashion locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phân loại rác thải điện tử: Kết hợp tái chế và thu gom e-waste",
    keywords: ["locker thu gom rác điện tử", "e-waste locker", "tái chế tủ locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại bến xe khách liên tỉnh: Gửi hành lý và hàng hóa an toàn",
    keywords: ["locker bến xe khách", "bus station locker", "tủ locker hành lý liên tỉnh"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại nhà ga tàu điện ngầm tương lai TP.HCM Metro: Dự án hạ tầng",
    keywords: ["locker metro TP HCM", "tủ locker tàu điện ngầm", "metro station locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh dành cho đơn vị cho thuê thiết bị AV sự kiện: Nhận và trả",
    keywords: ["locker cho thuê thiết bị AV", "event equipment locker", "tủ locker âm thanh ánh sáng"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại trạm xe đạp điện và xe máy điện: Kết hợp giao thông xanh",
    keywords: ["locker trạm xe điện", "e-bike locker", "tủ locker xe đạp điện"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh trong kho lạnh dược phẩm và thực phẩm: Kiểm soát nhiệt độ",
    keywords: ["cold storage locker", "tủ locker kho lạnh", "locker dược phẩm"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại phòng LAB và trung tâm nghiên cứu: Bảo vệ mẫu vật và thiết bị",
    keywords: ["laboratory locker", "tủ locker phòng thí nghiệm", "research lab locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh cho nhà in 3D và không gian maker: Quản lý dụng cụ sáng tạo",
    keywords: ["makerspace locker", "3D printing locker", "tủ locker xưởng sáng tạo"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phục vụ cơ sở tôn giáo: Chùa, nhà thờ và thánh thất lớn",
    keywords: ["locker cơ sở tôn giáo", "tủ locker chùa nhà thờ", "religious locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại nhà máy điện và công trình hạ tầng: Quản lý dụng cụ công nhân",
    keywords: ["locker nhà máy điện", "power plant locker", "tủ locker hạ tầng năng lượng"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phục vụ đội thi đấu thể thao chuyên nghiệp: Quản lý trang phục",
    keywords: ["locker đội thi đấu", "professional sports locker", "tủ locker thể thao chuyên nghiệp"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh dành cho sân khấu và đội biểu diễn nghệ thuật: Quản lý trang phục",
    keywords: ["locker sân khấu", "performance locker", "tủ locker nghệ thuật biểu diễn"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại trụ sở cảnh sát, biên phòng: Bảo mật trang thiết bị đặc biệt",
    keywords: ["locker cảnh sát", "security forces locker", "tủ locker biên phòng"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại trung tâm cai nghiện và phục hồi chức năng: Giải pháp an toàn",
    keywords: ["locker trung tâm cai nghiện", "rehabilitation locker", "tủ locker phục hồi chức năng"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phục vụ nhân viên offshore giàn khoan và tàu biển",
    keywords: ["locker giàn khoan", "offshore locker", "tủ locker tàu biển"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phục vụ mô hình xe đạp chia sẻ và xe máy điện tự phục vụ",
    keywords: ["bike sharing locker", "tủ locker xe đạp chia sẻ", "e-scooter locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh cho doanh nghiệp cho thuê thiết bị xây dựng: Nhận và trả dụng cụ",
    keywords: ["construction equipment locker", "locker cho thuê dụng cụ xây dựng", "tool rental locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại khu kinh tế đặc biệt Phú Quốc và Vân Đồn: Cơ hội mới",
    keywords: ["locker Phú Quốc", "locker Vân Đồn", "tủ locker khu kinh tế đặc biệt"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh tại khu du lịch làng nghề truyền thống Việt Nam",
    keywords: ["locker làng nghề", "craft village locker", "tủ locker du lịch làng nghề"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "ung-dung-dac-biet",
    topic: "Tủ locker thông minh phục vụ nhà thiết kế và xưởng may: Quản lý vải và phụ liệu",
    keywords: ["locker xưởng may", "fashion design locker", "tủ locker ngành may mặc"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Phân tích TCO (tổng chi phí sở hữu) tủ locker thông minh: So sánh thuê và mua",
    keywords: ["TCO tủ locker", "chi phí sở hữu locker", "thuê vs mua locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh trong hệ thống quản lý tài sản doanh nghiệp EAM: Tích hợp toàn diện",
    keywords: ["EAM locker", "tủ locker quản lý tài sản", "enterprise asset management locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Phân tích cạnh tranh thị trường tủ locker thông minh Việt Nam: SWOT 2026",
    keywords: ["cạnh tranh thị trường locker", "SWOT locker Việt Nam", "phân tích thị trường locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Thương hiệu tủ locker thông minh châu Á nổi bật: Phân tích thị phần và chiến lược",
    keywords: ["thương hiệu locker châu Á", "locker brand analysis", "nhà sản xuất locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh cho khu thương mại tự do FTZ: Yêu cầu đặc thù hải quan",
    keywords: ["locker free trade zone", "FTZ locker", "tủ locker khu ngoại quan"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh phục vụ công ty cung ứng lao động: Quản lý nhân viên thời vụ",
    keywords: ["locker công ty lao động", "outsourcing staff locker", "tủ locker nhân viên thời vụ"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh phục vụ đội ngũ freelancer và làm việc từ xa: Remote work solution",
    keywords: ["locker freelancer", "remote work locker", "tủ locker làm việc từ xa"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh tại trung tâm chăm sóc khách hàng call center: Giải pháp hiệu quả",
    keywords: ["locker call center", "tủ locker trung tâm dịch vụ khách hàng", "customer service locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh tại khu văn phòng hành chính tập đoàn lớn: Case study thực tế",
    keywords: ["locker tập đoàn", "corporate locker case study", "tủ locker văn phòng lớn"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tủ locker thông minh phục vụ ngành công nghiệp thực phẩm: Bảo quản dụng cụ HACCP",
    keywords: ["HACCP locker", "food industry locker", "tủ locker ngành thực phẩm"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "doanh-nghiep",
    topic: "Tiêu chuẩn kỹ thuật điện khi lắp đặt tủ locker thông minh: Cẩm nang cho kỹ sư",
    keywords: ["tiêu chuẩn điện tủ locker", "electrical standard locker", "lắp đặt locker kỹ thuật"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Tủ locker thông minh tại tòa nhà xanh LEED: Đáp ứng tiêu chí bền vững môi trường",
    keywords: ["LEED locker", "green building locker", "tủ locker tòa nhà xanh"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Xu hướng tủ locker thông minh tại Nhật Bản: Bài học kinh nghiệm cho thị trường Việt Nam",
    keywords: ["locker Nhật Bản", "Japan locker trend", "mô hình locker thành công"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Xu hướng tủ locker thông minh tại Hàn Quốc: Smart locker K-style và bài học",
    keywords: ["locker Hàn Quốc", "Korea locker trend", "K-style locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Tủ locker thông minh thế hệ tiếp theo: Công nghệ và xu hướng 2027-2030",
    keywords: ["tương lai tủ locker", "locker 2030", "xu hướng smart locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Tủ locker thông minh phục vụ người lao động nước ngoài (expat): Tiêu chuẩn và dịch vụ",
    keywords: ["locker expat", "tủ locker người nước ngoài", "foreigner locker Việt Nam"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Tủ locker thông minh kết hợp với hệ thống Access Control tòa nhà: Tích hợp thẻ",
    keywords: ["access control locker", "tủ locker hệ thống thẻ", "integrated locker security"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "xu-huong",
    topic: "Tủ locker thông minh tại Việt Nam 2030: Dự báo thị trường và cơ hội đầu tư",
    keywords: ["thị trường locker Việt Nam 2030", "dự báo locker", "cơ hội đầu tư locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "thuong-hieu-locker",
    topic: "So sánh tủ locker thông minh nội địa và nhập khẩu: Chất lượng, giá và dịch vụ hậu mãi",
    keywords: ["so sánh locker nội địa nhập khẩu", "locker nội địa vs nhập khẩu", "chất lượng locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "thuong-hieu-locker",
    topic: "Đánh giá thực tế phần mềm quản lý tủ locker thông minh: Tính năng và ưu nhược điểm",
    keywords: ["đánh giá phần mềm locker", "locker software review", "quản lý locker app"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "huong-dan-su-dung",
    topic: "Hướng dẫn đặt hàng và ký kết hợp đồng tủ locker thông minh cho doanh nghiệp",
    keywords: ["đặt hàng tủ locker", "hợp đồng locker", "mua tủ locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "huong-dan-su-dung",
    topic: "Hướng dẫn bảo trì định kỳ tủ locker thông minh: Quy trình và tần suất kiểm tra",
    keywords: ["bảo trì tủ locker", "maintenance locker", "quy trình kiểm tra locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "huong-dan-su-dung",
    topic: "Xử lý sự cố thường gặp với tủ locker thông minh: Hướng dẫn kỹ thuật chi tiết",
    keywords: ["sự cố tủ locker", "troubleshoot locker", "lỗi tủ locker thông minh"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "huong-dan-su-dung",
    topic: "Quy trình lắp đặt tủ locker thông minh cho chung cư: Từ khảo sát đến nghiệm thu",
    keywords: ["quy trình lắp locker chung cư", "lắp đặt locker từng bước", "thi công locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "huong-dan-su-dung",
    topic: "Cách tính số lượng ô locker cần thiết cho tòa nhà văn phòng: Công thức chuẩn",
    keywords: ["tính số ô locker văn phòng", "locker planning formula", "bao nhiêu ô locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "giai-phap-nha-o",
    topic: "Tủ locker thông minh tích hợp hệ thống quản lý chung cư: Kết nối app cư dân",
    keywords: ["locker tích hợp app chung cư", "cư dân app locker", "resident app locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "giai-phap-nha-o",
    topic: "So sánh các thương hiệu tủ locker chung cư phổ biến tại Việt Nam 2026",
    keywords: ["so sánh locker chung cư", "thương hiệu locker chung cư VN", "locker chung cư nào tốt"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "giai-phap-do-thi",
    topic: "Tủ locker thông minh tích hợp điểm đón xe công nghệ Grab, Be: Tiện ích đô thị mới",
    keywords: ["locker Grab Be", "ride-hailing locker", "tủ locker xe công nghệ"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "giai-phap-do-thi",
    topic: "Mô hình tủ locker thông minh công cộng trong đô thị thông minh Việt Nam",
    keywords: ["locker công cộng đô thị", "smart city locker", "tủ locker thành phố thông minh"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh trong hệ thống quản lý dụng cụ công nghiệp EAM",
    keywords: ["locker công nghiệp EAM", "industrial tool locker", "tủ locker dụng cụ"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh cho công trình xây dựng và cơ sở hạ tầng: Bảo quản dụng cụ tại công trường",
    keywords: ["locker công trình xây dựng", "construction site locker", "tủ locker công trường"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "tu-locker-van-phong",
    topic: "Tủ locker thông minh cho ngành công nghiệp điện tử: Kiểm soát dụng cụ và linh kiện",
    keywords: ["locker ngành điện tử", "electronics industry locker", "tủ locker linh kiện"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "bao-mat-locker",
    topic: "Bảo mật dữ liệu tủ locker thông minh: GDPR, nghị định 13 và bảo vệ thông tin người dùng",
    keywords: ["bảo mật dữ liệu locker", "GDPR locker", "bảo vệ thông tin locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "bao-mat-locker",
    topic: "Tủ locker thông minh chống hack và tấn công mạng: Giải pháp cybersecurity",
    keywords: ["cybersecurity locker", "chống hack tủ locker", "bảo mật mạng locker"]
  },
  {
    silo: "tu-locker-thong-minh", sub: "bao-mat-locker",
    topic: "Kiểm định và chứng nhận tủ locker thông minh: Tiêu chuẩn ISO, CE và TCVN",
    keywords: ["chứng nhận locker", "tiêu chuẩn locker ISO", "CE locker Việt Nam"]
  },
];

async function main() {
  const raw = fs.readFileSync(CALENDAR_PATH, "utf8");
  const calendar: CalendarItem[] = JSON.parse(raw);

  let maxId = Math.max(...calendar.map(x => x.id));

  const allNew: CalendarItem[] = [
    ...newVendingTopics.map(t => ({
      id: ++maxId,
      status: "pending" as const,
      ...t
    })),
    ...newLockerTopics.map(t => ({
      id: ++maxId,
      status: "pending" as const,
      ...t
    }))
  ];

  const updated = [...calendar, ...allNew];
  fs.writeFileSync(CALENDAR_PATH, JSON.stringify(updated, null, 2), "utf8");

  const addedVending = newVendingTopics.length;
  const addedLocker = newLockerTopics.length;

  console.log(`✅ Đã thêm ${addedVending} topic vending + ${addedLocker} topic locker`);
  console.log(`📋 Tổng calendar: ${updated.length} items`);

  const pending = updated.filter(x => x.status === "pending");
  const pendingV = pending.filter(x => x.silo === "may-ban-hang-tu-dong");
  const pendingL = pending.filter(x => x.silo === "tu-locker-thong-minh");
  console.log(`⏳ Pending: ${pendingV.length} vending + ${pendingL.length} locker`);
}

main().catch(e => { console.error(e); process.exit(1); });
