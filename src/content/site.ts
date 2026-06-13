export const siteConfig = {
  name: "TSE Vending",
  legalName: "Công ty Cổ phần Công nghệ TSE",
  shortName: "TSEvending",
  domain: "tsevending.com",
  url: "https://tsevending.com",
  description:
    "TSE Vending - Nhà sản xuất & cung cấp máy bán hàng tự động và tủ locker thông minh tại Việt Nam. Giải pháp trọn gói: thiết kế, lắp đặt, vận hành, bảo trì.",
  tagline: "Giải pháp máy bán hàng tự động & tủ locker thông minh hàng đầu Việt Nam",
  phone: "0837375757",
  phoneDisplay: "08.3737.5757",
  email: "info@tsevending.com",
  address: {
    street: "66/2 Đường Tân Thới Nhất 05, Phường Tân Thới Nhất, Quận 12",
    city: "TP. Hồ Chí Minh",
    region: "TP. Hồ Chí Minh",
    postalCode: "700000",
    country: "VN",
  },
  areasServed: ["TP. Hồ Chí Minh", "Đà Nẵng", "Bình Dương", "Hà Nội", "Toàn quốc"],
  social: {
    facebook: "https://www.facebook.com/tsevendingmachine/",
    facebookAlt: "https://www.facebook.com/vendingmachineVN/",
  },
  founderName: "TSE Technology",
} as const;

export const NAV_LINKS = [
  { title: "Máy bán hàng tự động", href: "/may-ban-hang-tu-dong" },
  { title: "Tủ locker thông minh", href: "/tu-locker-thong-minh" },
  { title: "Giải pháp kinh doanh", href: "/giai-phap-kinh-doanh" },
  { title: "Tin tức", href: "/tin-tuc" },
  { title: "Giới thiệu", href: "/gioi-thieu" },
  { title: "Liên hệ", href: "/lien-he" },
] as const;
