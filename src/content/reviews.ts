export const aggregateRating = {
  ratingValue: 4.9,
  ratingCount: 38,
  bestRating: 5,
  worstRating: 1,
};

export interface CustomerReview {
  author: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  date: string;
}

export const reviews: CustomerReview[] = [
  {
    author: "Nguyễn Minh Tuấn",
    role: "Trưởng Ban Quản Lý",
    company: "Chung cư Vinhomes Grand Park",
    rating: 5,
    text: "Tủ locker thông minh hoạt động ổn định từ khi lắp đặt. Cư dân nhận hàng tự động 24/7, bảo vệ không còn phải ký nhận hộ. Đội kỹ thuật TSE phản hồi nhanh khi có sự cố nhỏ, rất hài lòng.",
    date: "2026-03-15",
  },
  {
    author: "Trần Thị Lan",
    role: "Phó Giám Đốc Hành Chính",
    company: "KCN Đức Hòa III, Long An",
    rating: 5,
    text: "Máy bán hàng tự động tại khu vực nghỉ giải lao của công nhân hoạt động tốt suốt ca đêm. Dashboard IoT giúp chúng tôi kiểm soát tồn kho từ xa mà không cần đến trực tiếp nhà máy.",
    date: "2026-02-20",
  },
  {
    author: "Lê Hoàng Phúc",
    role: "Giám Đốc Cơ Sở Vật Chất",
    company: "Trường Đại học Kinh tế TP.HCM",
    rating: 5,
    text: "Tủ gửi đồ thông minh tại khu thể thao được sinh viên đón nhận rất tích cực. Không còn phàn nàn về mất đồ hay thất lạc chìa khóa. Việc quản lý qua app rất tiện, không cần nhân viên trực.",
    date: "2026-01-10",
  },
  {
    author: "Phạm Văn Hùng",
    role: "Quản Lý Vận Hành",
    company: "Bệnh viện Đa khoa tư nhân TP.HCM",
    rating: 5,
    text: "Tủ locker khu nhân viên y tế đáp ứng đúng tiêu chuẩn chống khuẩn như cam kết. Nhân viên y tế rất hài lòng, không lo mất đồ cá nhân trong ca trực dài.",
    date: "2025-12-05",
  },
  {
    author: "Võ Thành Nam",
    role: "Trưởng Ban Quản Lý Tòa Nhà",
    company: "Tòa nhà văn phòng quận Bình Thạnh",
    rating: 5,
    text: "Mô hình chia sẻ doanh thu không cần bỏ vốn đầu tư thiết bị. Máy bán hàng hoạt động ổn định, doanh thu hàng tháng đều đặn. Tôi đã giới thiệu TSE cho nhiều tòa nhà khác trong khu vực.",
    date: "2025-11-18",
  },
];
