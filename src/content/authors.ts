export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  description: string;
  yearsOfExperience: number;
  expertise: string[];
  url: string;
}

export const mainAuthor: Author = {
  slug: "nguyen-do-tung",
  name: "Nguyễn Đỗ Tùng",
  jobTitle: "Chuyên gia Máy Bán Hàng Tự Động & Smart Locker",
  description:
    "Hơn 10 năm kinh nghiệm trong lĩnh vực máy bán hàng tự động và smart locker tại Việt Nam. Đồng sáng lập TSE Vending từ năm 2014, trực tiếp tư vấn và triển khai hàng trăm dự án cho doanh nghiệp, chung cư và khu công nghiệp trên toàn quốc.",
  yearsOfExperience: 10,
  expertise: [
    "Máy bán hàng tự động",
    "Tủ locker thông minh",
    "Mô hình kinh doanh vending",
    "IoT & quản lý thiết bị từ xa",
    "Thanh toán không tiền mặt",
  ],
  url: "https://tsevending.com/gioi-thieu#nguyen-do-tung",
};
