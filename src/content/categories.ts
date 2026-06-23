export interface Faq {
  q: string;
  a: string;
}

export interface SubCategory {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  features: string[];
  faqs: Faq[];
  icon: string;
  idealFor: string;
  investmentTier: "Thấp" | "Trung bình" | "Cao";
}

export interface Silo {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  features: string[];
  faqs: Faq[];
  icon: string;
  subcategories: SubCategory[];
}

export const SILOS: Silo[] = [
  {
    slug: "may-ban-hang-tu-dong",
    title: "Máy bán hàng tự động",
    shortTitle: "Máy bán hàng tự động",
    metaTitle: "Máy Bán Hàng Tự Động Chính Hãng | Giá Tốt - TSE Vending",
    metaDescription:
      "Cung cấp máy bán hàng tự động (vending machine) chính hãng: máy bán nước, đồ ăn vặt, hàng lạnh, gas... Tư vấn vị trí, lắp đặt, vận hành & bảo trì trên toàn quốc.",
    h1: "Máy Bán Hàng Tự Động",
    intro: [
      "Máy bán hàng tự động (vending machine) là thiết bị bán lẻ tự phục vụ hoạt động 24/7, cho phép khách hàng mua sản phẩm mà không cần nhân viên phục vụ. TSE Vending là đơn vị sản xuất và phân phối máy bán hàng tự động hàng đầu Việt Nam — cung cấp giải pháp trọn gói cho chung cư, văn phòng, khu công nghiệp, bệnh viện và trường học.",
      "Mỗi dòng máy đều được tích hợp công nghệ thanh toán đa dạng (tiền mặt, thẻ, QR code, ví điện tử), hệ thống quản lý từ xa qua app/web giúp theo dõi doanh thu, hàng hóa và tình trạng máy theo thời gian thực.",
      "Chúng tôi cung cấp giải pháp trọn gói từ tư vấn lựa chọn dòng máy phù hợp, khảo sát vị trí đặt máy, lắp đặt, vận hành đến bảo trì - bảo hành dài hạn, giúp đối tác tối ưu chi phí đầu tư và tăng hiệu quả kinh doanh.",
    ],
    features: [
      "Đa dạng dòng máy: nước giải khát, snack, hàng lạnh, gas, hàng đông lạnh",
      "Tích hợp thanh toán không tiền mặt: thẻ, QR, ví điện tử, NFC",
      "Quản lý vận hành từ xa: doanh thu, tồn kho, cảnh báo lỗi theo thời gian thực",
      "Tư vấn miễn phí vị trí đặt máy & mô hình hợp tác đầu tư",
      "Bảo trì - bảo hành chính hãng, đội ngũ kỹ thuật toàn quốc",
    ],
    faqs: [
      {
        q: "Máy bán hàng tự động là gì?",
        a: "Máy bán hàng tự động (vending machine) là thiết bị bán lẻ tự phục vụ, cho phép khách hàng chọn và mua sản phẩm — nước uống, thực phẩm, đồ tiêu dùng — bất kỳ lúc nào mà không cần nhân viên phục vụ. Máy nhận thanh toán tiền mặt hoặc không tiền mặt (Momo, ZaloPay, QR Pay, thẻ ngân hàng) và cấp phát hàng hóa tự động.",
      },
      {
        q: "Giá máy bán hàng tự động khoảng bao nhiêu?",
        a: "Giá máy bán hàng tự động dao động tùy dòng máy, dung tích và tính năng tích hợp (thanh toán, camera, IoT). TSE Vending tư vấn báo giá chi tiết theo nhu cầu thực tế và mô hình kinh doanh của bạn.",
      },
      {
        q: "Có hỗ trợ lắp đặt và vận hành tại các tỉnh thành không?",
        a: "TSE Vending hỗ trợ lắp đặt, bảo trì tại TP. Hồ Chí Minh, Đà Nẵng, Bình Dương, Hà Nội và đang mở rộng mạng lưới kỹ thuật trên toàn quốc.",
      },
      {
        q: "Có thể hợp tác đặt máy miễn phí mặt bằng không?",
        a: "Có. TSE Vending có nhiều mô hình hợp tác: đầu tư trọn gói, hợp tác chia sẻ doanh thu hoặc cho thuê mặt bằng đặt máy - phù hợp với chủ tòa nhà, trường học, doanh nghiệp.",
      },
      {
        q: "Nên mua hay thuê máy bán hàng tự động?",
        a: "Nếu muốn chủ động vận hành lâu dài, mua máy là lựa chọn tối ưu chi phí theo thời gian. Nếu muốn thử nghiệm trước hoặc hạn chế vốn đầu tư ban đầu, có thể chọn mô hình hợp tác/cho thuê của TSE Vending - xem chi tiết tại trang giải pháp kinh doanh.",
      },
      {
        q: "Máy bán hàng tự động của TSE Vending được bảo hành trong bao lâu?",
        a: "Mỗi dòng máy có chính sách bảo hành riêng theo linh kiện và hãng sản xuất. TSE Vending cung cấp thông tin bảo hành cụ thể kèm hợp đồng khi tư vấn báo giá, đồng thời hỗ trợ bảo trì - sửa chữa sau bảo hành trên toàn quốc.",
      },
    ],
    icon: "🥤",
    subcategories: [
      {
        slug: "may-ban-nuoc-giai-khat",
        title: "Máy bán nước giải khát tự động",
        shortTitle: "Nước giải khát",
        metaTitle: "Máy Bán Nước Giải Khát Tự Động | TSE Vending",
        metaDescription:
          "Máy bán nước giải khát tự động (lon, chai, ly) cho văn phòng, chung cư, trường học. Làm lạnh nhanh, thanh toán đa phương thức, quản lý từ xa.",
        h1: "Máy Bán Nước Giải Khát Tự Động",
        intro: [
          "Máy bán nước giải khát tự động của TSE Vending phù hợp cho các sản phẩm nước ngọt lon, chai PET, nước suối và nước tăng lực, với hệ thống làm lạnh nhanh giữ nhiệt độ ổn định 24/7.",
          "Thiết kế khoang chứa linh hoạt, dễ dàng thay đổi loại sản phẩm theo mùa, kèm màn hình hiển thị sản phẩm trực quan giúp tăng tỷ lệ chuyển đổi mua hàng.",
        ],
        features: [
          "Làm lạnh nhanh, duy trì nhiệt độ 4-10°C ổn định",
          "Sức chứa linh hoạt 200-600 lon/chai tùy mẫu máy",
          "Thanh toán tiền mặt, thẻ, QR code, ví điện tử",
          "Cảnh báo tồn kho thấp, hết hàng qua app quản lý",
        ],
        faqs: [
          {
            q: "Máy bán nước tự động có tốn điện nhiều không?",
            a: "Máy sử dụng công nghệ nén lạnh tiết kiệm điện, mức tiêu thụ tương đương một tủ lạnh thương mại cỡ vừa, phù hợp lắp đặt 24/7 tại sảnh, hành lang.",
          },
          {
            q: "Có thể bán nhiều loại nước trong một máy không?",
            a: "Có, máy được chia thành nhiều khay/cột hàng độc lập, có thể bố trí 6-10 loại sản phẩm khác nhau trong cùng một máy.",
          },
        ],
        icon: "🥤",
        idealFor: "Văn phòng, chung cư, trường học - nơi có nhu cầu nước uống thường xuyên",
        investmentTier: "Trung bình",
      },
      {
        slug: "may-ban-do-an-vat",
        title: "Máy bán snack, đồ ăn vặt tự động",
        shortTitle: "Snack, đồ ăn vặt",
        metaTitle: "Máy Bán Snack, Đồ Ăn Vặt Tự Động | TSE Vending",
        metaDescription:
          "Máy bán snack, bánh kẹo, mì gói, đồ ăn vặt tự động cho văn phòng, trường học, khu công nghiệp. Đa dạng khay hàng, vận hành 24/7.",
        h1: "Máy Bán Snack, Đồ Ăn Vặt Tự Động",
        intro: [
          "Dòng máy bán snack và đồ ăn vặt tự động của TSE Vending được thiết kế với hệ thống khay xoắn (spiral) chính xác, hạn chế kẹt hàng, phù hợp với các sản phẩm có kích thước và hình dạng đa dạng như bánh, kẹo, mì gói, snack đóng túi.",
          "Đây là lựa chọn phổ biến cho căng-tin trường học, khu vực pantry văn phòng và nhà máy nhờ vận hành liên tục, không cần nhân viên trông coi.",
        ],
        features: [
          "Hệ thống khay xoắn chống kẹt hàng, độ bền cao",
          "Sức chứa 300-400 sản phẩm tùy cấu hình khay",
          "Màn hình cảm ứng hiển thị sản phẩm, giá bán rõ ràng",
          "Phù hợp lắp đặt tại căng-tin, pantry, khu nghỉ ca",
        ],
        faqs: [
          {
            q: "Máy có thể bán đồng thời nhiều mức giá khác nhau không?",
            a: "Có, mỗi khay hàng được cài đặt giá riêng, dễ dàng điều chỉnh qua phần mềm quản lý hoặc trực tiếp trên máy.",
          },
        ],
        icon: "🍪",
        idealFor: "Căng-tin trường học, pantry văn phòng, khu nghỉ ca tại nhà máy",
        investmentTier: "Trung bình",
      },
      {
        slug: "may-ban-hang-lanh",
        title: "Máy bán hàng đông lạnh, hàng lạnh tự động",
        shortTitle: "Hàng lạnh, đông lạnh",
        metaTitle: "Máy Bán Hàng Lạnh, Đông Lạnh Tự Động | TSE Vending",
        metaDescription:
          "Máy bán hàng lạnh, đông lạnh tự động: kem, sữa chua, thực phẩm chế biến sẵn. Giữ nhiệt sâu, an toàn thực phẩm, thanh toán không tiếp xúc.",
        h1: "Máy Bán Hàng Đông Lạnh, Hàng Lạnh Tự Động",
        intro: [
          "Máy bán hàng đông lạnh và hàng lạnh tự động của TSE Vending được trang bị hệ thống nén lạnh sâu, duy trì nhiệt độ ổn định cho các sản phẩm yêu cầu bảo quản nghiêm ngặt như kem, sữa chua, thực phẩm chế biến sẵn, suất ăn đông lạnh.",
          "Phù hợp triển khai tại siêu thị mini, khu công nghiệp, bệnh viện - nơi có nhu cầu tiêu thụ thực phẩm đông lạnh, hàng lạnh ngoài giờ hành chính.",
        ],
        features: [
          "Dải nhiệt độ rộng: từ lạnh sâu -18°C đến mát 2-8°C",
          "Cảm biến giám sát nhiệt độ liên tục, đảm bảo an toàn thực phẩm",
          "Thiết kế cửa kính cách nhiệt, hiển thị sản phẩm rõ nét",
          "Phù hợp ngành F&B, suất ăn công nghiệp, siêu thị mini tự động",
        ],
        faqs: [
          {
            q: "Máy có đảm bảo an toàn thực phẩm khi mất điện đột ngột không?",
            a: "Máy có hệ thống cảnh báo và cách nhiệt tốt giúp duy trì nhiệt độ trong thời gian ngắn khi mất điện; TSE Vending khuyến nghị kết hợp UPS cho các vị trí quan trọng.",
          },
        ],
        icon: "🧊",
        idealFor: "Siêu thị mini, bệnh viện, khu công nghiệp cần thực phẩm chế biến sẵn",
        investmentTier: "Cao",
      },
      {
        slug: "may-ban-gas",
        title: "Máy bán gas, bình gas tự động",
        shortTitle: "Gas, bình gas",
        metaTitle: "Máy Bán Gas, Bình Gas Tự Động | TSE Vending",
        metaDescription:
          "Máy bán gas, bình gas mini tự động cho khu dân cư, chung cư, cửa hàng tiện lợi. Vận hành an toàn, thanh toán tự động, giám sát từ xa.",
        h1: "Máy Bán Gas, Bình Gas Tự Động",
        intro: [
          "Máy bán gas và bình gas mini tự động của TSE Vending đáp ứng nhu cầu mua nhanh tại các khu dân cư, cửa hàng tiện lợi và trạm dừng, đảm bảo tiêu chuẩn an toàn trong thiết kế khoang chứa và cơ cấu xuất hàng.",
          "Hệ thống giám sát tồn kho và cảnh báo từ xa giúp đơn vị vận hành chủ động bổ sung hàng, tránh tình trạng hết hàng kéo dài.",
        ],
        features: [
          "Thiết kế khoang chứa đạt chuẩn an toàn cho sản phẩm gas/bình gas mini",
          "Cơ cấu xuất hàng chắc chắn, hạn chế va đập",
          "Giám sát tồn kho, cảnh báo bổ sung hàng từ xa",
          "Phù hợp khu dân cư, chung cư, trạm dừng, cửa hàng tiện lợi",
        ],
        faqs: [
          {
            q: "Máy bán gas tự động có cần giấy phép đặc biệt khi lắp đặt không?",
            a: "Tùy địa phương và loại sản phẩm, đơn vị vận hành cần tuân thủ quy định an toàn PCCC hiện hành. TSE Vending hỗ trợ tư vấn vị trí và cấu hình máy phù hợp quy định.",
          },
        ],
        icon: "🔥",
        idealFor: "Khu dân cư, chung cư, cửa hàng tiện lợi cần mua gas mini nhanh, ngoài giờ",
        investmentTier: "Trung bình",
      },
      {
        slug: "linh-kien-phu-tung",
        title: "Linh kiện, phụ tùng máy bán hàng tự động",
        shortTitle: "Linh kiện, phụ tùng",
        metaTitle: "Linh Kiện, Phụ Tùng Máy Bán Hàng Tự Động | TSE Vending",
        metaDescription:
          "Cung cấp linh kiện, phụ tùng thay thế cho máy bán hàng tự động: bo mạch điều khiển, đầu đọc thẻ, motor khay hàng, máy nén lạnh, màn hình hiển thị.",
        h1: "Linh Kiện, Phụ Tùng Máy Bán Hàng Tự Động",
        intro: [
          "TSE Vending cung cấp đầy đủ linh kiện và phụ tùng thay thế chính hãng cho các dòng máy bán hàng tự động: bo mạch điều khiển, đầu đọc thẻ/QR, motor khay hàng, block nén lạnh, màn hình hiển thị và khóa cửa máy.",
          "Đội ngũ kỹ thuật hỗ trợ chẩn đoán lỗi từ xa và cung ứng linh kiện nhanh, giảm thiểu thời gian máy ngừng hoạt động (downtime) cho đối tác vận hành.",
        ],
        features: [
          "Linh kiện chính hãng: bo mạch, motor khay, đầu đọc thanh toán",
          "Hỗ trợ chẩn đoán lỗi từ xa, tư vấn thay thế đúng linh kiện",
          "Giao hàng nhanh, ưu tiên đối tác vận hành chuỗi máy",
          "Bảo hành linh kiện theo chính sách hãng",
        ],
        faqs: [
          {
            q: "TSE Vending có hỗ trợ sửa chữa máy của hãng khác không?",
            a: "TSE Vending hỗ trợ tư vấn và cung cấp linh kiện tương thích cho nhiều dòng máy phổ biến trên thị trường, đồng thời ưu tiên bảo trì cho khách hàng đang sử dụng máy của TSE.",
          },
        ],
        icon: "🔧",
        idealFor: "Đơn vị đang vận hành máy cần thay thế linh kiện, bảo trì định kỳ",
        investmentTier: "Thấp",
      },
    ],
  },
  {
    slug: "tu-locker-thong-minh",
    title: "Tủ locker thông minh",
    shortTitle: "Tủ locker thông minh",
    metaTitle: "Tủ Locker Thông Minh - Tủ Khóa Điện Tử | TSE Vending",
    metaDescription:
      "Tủ locker thông minh (smart locker) cho chung cư, văn phòng, khu công nghiệp, trường học: mở khóa bằng mã QR, vân tay, thẻ từ. Quản lý tập trung qua app.",
    h1: "Tủ Locker Thông Minh",
    intro: [
      "Tủ locker thông minh (smart locker) của TSE Vending là giải pháp lưu trữ và giao nhận hiện đại, sử dụng các phương thức mở khóa điện tử như mã QR, mã PIN, thẻ RFID, vân tay - thay thế hoàn toàn chìa khóa cơ truyền thống.",
      "Hệ thống được quản lý tập trung qua phần mềm/app, cho phép theo dõi tình trạng từng ô tủ theo thời gian thực, phân quyền sử dụng và xuất báo cáo vận hành tự động.",
      "TSE Vending cung cấp tủ locker với nhiều kích thước ô, vật liệu và cấu hình khác nhau, phù hợp cho chung cư, tòa văn phòng, nhà máy, trường học, trung tâm thương mại và các điểm giao nhận hàng (logistics).",
    ],
    features: [
      "Mở khóa đa phương thức: mã QR, PIN, thẻ RFID, vân tay, app",
      "Quản lý tập trung qua phần mềm, theo dõi thời gian thực",
      "Tùy chọn kích thước ô tủ đa dạng, module mở rộng linh hoạt",
      "Tích hợp thông báo tự động (SMS/app) khi có hàng đến/lấy hàng",
      "Vật liệu thép sơn tĩnh điện, độ bền cao, chống ẩm",
    ],
    faqs: [
      {
        q: "Tủ locker thông minh là gì?",
        a: "Tủ locker thông minh (smart locker) là hệ thống tủ lưu trữ điện tử sử dụng công nghệ số để xác thực quyền truy cập — thay thế chìa khóa cơ truyền thống bằng mã PIN, QR code, thẻ RFID, vân tay hoặc nhận diện khuôn mặt. Toàn bộ lịch sử mở/đóng ô tủ được lưu trữ và quản lý tập trung qua phần mềm.",
      },
      {
        q: "Tủ locker thông minh phù hợp lắp ở đâu?",
        a: "Phù hợp với chung cư (nhận hàng hộ dân 24/7), văn phòng và khu công nghiệp (bảo quản đồ dùng cá nhân, tài liệu nhân viên), trường học (gửi đồ học sinh không cần chìa), trung tâm thương mại và gym (gửi đồ khách hàng theo giờ) và các điểm giao nhận hàng logistics.",
      },
      {
        q: "Giá tủ locker thông minh bao nhiêu tiền?",
        a: "Giá tủ locker thông minh phụ thuộc vào số lượng ô (từ 4 đến 100+ ô), kích thước ô (S/M/L/XL), phương thức xác thực (PIN cơ bản đến nhận diện khuôn mặt) và mức độ tích hợp phần mềm. TSE Vending khảo sát thực tế miễn phí và báo giá chi tiết theo nhu cầu cụ thể.",
      },
      {
        q: "Tủ locker thông minh mở bằng những phương thức nào?",
        a: "Tủ locker thông minh TSE Vending hỗ trợ đa phương thức: mã PIN nhập trên bàn phím số, mã QR quét bằng điện thoại, thẻ RFID (tích hợp với thẻ nhân viên sẵn có), vân tay và nhận diện khuôn mặt. Một hệ thống có thể dùng đồng thời nhiều phương thức cho các nhóm người dùng khác nhau.",
      },
      {
        q: "Có thể tùy chỉnh số lượng và kích thước ô tủ không?",
        a: "Có, TSE Vending thiết kế theo module nên có thể tùy biến số ô, kích thước ô (S nhỏ, M vừa, L lớn, XL hành lý) theo diện tích thực tế và nhu cầu sử dụng. Có thể bắt đầu với cụm nhỏ và mở rộng thêm module sau mà không cần thay toàn bộ hệ thống.",
      },
      {
        q: "Phần mềm quản lý tủ locker có cần kết nối internet liên tục không?",
        a: "Tủ hoạt động ổn định với kết nối Wi-Fi hoặc 4G. Trong trường hợp mất kết nối tạm thời, hệ thống vẫn ghi nhận lịch sử mở/đóng tủ cục bộ và đồng bộ lên cloud khi có mạng trở lại. Quản trị viên có thể giám sát và điều hành từ xa qua trình duyệt hoặc app điện thoại.",
      },
      {
        q: "Tủ locker thông minh có tích hợp được với hệ thống quản lý tòa nhà không?",
        a: "Có. TSE Vending hỗ trợ tích hợp API với hệ thống BMS (Building Management System), phần mềm quản lý nhân sự, thẻ chấm công RFID sẵn có và các sàn thương mại điện tử/đơn vị logistics lớn như Shopee, Lazada, GHN, GHTK.",
      },
      {
        q: "Chi phí lắp đặt tủ locker thông minh phụ thuộc vào yếu tố nào?",
        a: "Chi phí phụ thuộc vào số lượng ô, kích thước ô, công nghệ xác thực và mức độ tích hợp phần mềm. Ngoài ra, chi phí lắp đặt thực địa (đi dây điện, gắn tường, kết nối mạng) cũng ảnh hưởng. TSE Vending khảo sát thực tế miễn phí và cung cấp báo giá trọn gói, không phát sinh ẩn phí.",
      },
      {
        q: "Nếu người dùng quên mã hoặc mất thẻ thì xử lý thế nào?",
        a: "Quản trị viên có thể mở ô tủ từ xa qua dashboard quản lý mà không cần đến tận nơi. Người dùng cũng có thể yêu cầu cấp lại mã qua app hoặc liên hệ admin. Với hệ thống sinh trắc học, người dùng không thể quên hay mất thông tin xác thực.",
      },
      {
        q: "Tủ locker thông minh có cần bảo trì định kỳ không?",
        a: "Có. TSE Vending khuyến nghị bảo trì định kỳ 6 tháng/lần: kiểm tra khóa điện tử, cảm biến, cập nhật firmware và vệ sinh tiếp điểm. Firmware được cập nhật tự động qua mạng. TSE Vending cung cấp dịch vụ bảo trì và hỗ trợ kỹ thuật 24/7 trên toàn quốc.",
      },
    ],
    icon: "🔐",
    subcategories: [
      {
        slug: "tu-locker-chung-cu",
        title: "Tủ locker thông minh chung cư",
        shortTitle: "Chung cư",
        metaTitle: "Tủ Locker Thông Minh Cho Chung Cư | TSE Vending",
        metaDescription:
          "Tủ locker thông minh lắp đặt tại sảnh chung cư, hỗ trợ nhận hàng hộ dân tự động, mở khóa qua mã QR/app, giảm tải cho bảo vệ và lễ tân.",
        h1: "Tủ Locker Thông Minh Cho Chung Cư",
        intro: [
          "Tủ locker thông minh lắp đặt tại sảnh chung cư giúp giải quyết bài toán nhận hộ hàng hóa, bưu phẩm cho cư dân khi vắng nhà, giảm tải đáng kể cho lực lượng bảo vệ và ban quản lý.",
          "Cư dân nhận thông báo qua app/SMS ngay khi có hàng, tự lấy hàng bằng mã QR hoặc mã PIN bất kỳ thời điểm, không phụ thuộc giờ làm việc của lễ tân.",
        ],
        features: [
          "Giảm tải khối lượng công việc cho bảo vệ, lễ tân tòa nhà",
          "Cư dân tự nhận hàng 24/7 bằng mã QR/PIN qua app",
          "Tích hợp với shipper, đơn vị vận chuyển qua API/giao diện đối tác",
          "Thiết kế module, dễ lắp đặt tại sảnh, hành lang",
        ],
        faqs: [
          {
            q: "Shipper gửi hàng vào tủ locker như thế nào?",
            a: "Shipper được cấp quyền tạm thời để gửi hàng vào ô tủ trống, hệ thống tự động gửi mã nhận hàng cho cư dân qua app hoặc SMS.",
          },
        ],
        icon: "🏢",
        idealFor: "Chung cư, tòa nhà dân cư cần điểm nhận hàng hộ cư dân 24/7",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-locker-van-phong",
        title: "Tủ locker thông minh văn phòng, khu công nghiệp",
        shortTitle: "Văn phòng, KCN",
        metaTitle: "Tủ Locker Thông Minh Văn Phòng, Khu Công Nghiệp | TSE Vending",
        metaDescription:
          "Tủ locker thông minh cho văn phòng, nhà máy, khu công nghiệp: lưu trữ đồ cá nhân, tài liệu, thiết bị bảo hộ. Mở khóa bằng thẻ nhân viên, vân tay.",
        h1: "Tủ Locker Thông Minh Văn Phòng, Khu Công Nghiệp",
        intro: [
          "Tủ locker thông minh cho văn phòng và khu công nghiệp giúp nhân viên lưu trữ đồ dùng cá nhân, tài liệu, thiết bị bảo hộ lao động một cách an toàn, có thể tích hợp với thẻ chấm công/thẻ nhân viên sẵn có.",
          "Quản trị viên dễ dàng phân quyền ô tủ theo phòng ban, ca làm việc và theo dõi lịch sử sử dụng để phục vụ công tác quản lý tài sản.",
        ],
        features: [
          "Mở khóa bằng thẻ nhân viên (RFID), vân tay hoặc mã PIN",
          "Phân quyền ô tủ theo nhân viên, phòng ban, ca làm việc",
          "Lịch sử đóng/mở tủ phục vụ kiểm soát nội bộ",
          "Phù hợp nhà máy, xưởng sản xuất, tòa văn phòng",
        ],
        faqs: [
          {
            q: "Có thể tích hợp tủ locker với hệ thống chấm công hiện có không?",
            a: "TSE Vending hỗ trợ tư vấn tích hợp với thẻ RFID/chấm công hiện có của doanh nghiệp để thống nhất một loại thẻ cho nhiều mục đích sử dụng.",
          },
        ],
        icon: "🏭",
        idealFor: "Văn phòng, nhà máy, khu công nghiệp cần lưu trữ đồ cá nhân nhân viên",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-gui-do-thong-minh",
        title: "Tủ gửi đồ thông minh (trường học, TTTM, gym)",
        shortTitle: "Gửi đồ (trường học, TTTM, gym)",
        metaTitle: "Tủ Gửi Đồ Thông Minh Cho Trường Học, TTTM, Gym | TSE Vending",
        metaDescription:
          "Tủ gửi đồ thông minh cho trường học, trung tâm thương mại, gym, hồ bơi: mở khóa bằng mã QR/PIN dùng một lần, không cần chìa khóa, vận hành tự động.",
        h1: "Tủ Gửi Đồ Thông Minh Cho Trường Học, TTTM, Gym",
        intro: [
          "Tủ gửi đồ thông minh là giải pháp lý tưởng cho các không gian công cộng như trường học, trung tâm thương mại, gym, hồ bơi - nơi có lượng lớn người dùng cần gửi đồ tạm thời trong ngày.",
          "Người dùng chỉ cần chọn ô trống, hệ thống cấp mã QR/PIN dùng một lần để mở lại tủ, không cần chìa khóa vật lý, hạn chế tình trạng mất chìa khóa hoặc dùng chung khóa kém vệ sinh.",
        ],
        features: [
          "Cấp mã QR/PIN dùng một lần cho mỗi lượt sử dụng",
          "Không cần nhân viên trông giữ, vận hành hoàn toàn tự động",
          "Phù hợp không gian đông người: trường học, TTTM, gym, hồ bơi",
          "Tùy chọn tích hợp thanh toán phí gửi đồ (nếu cần)",
        ],
        faqs: [
          {
            q: "Nếu người dùng quên mã lấy đồ thì xử lý thế nào?",
            a: "Quản trị viên có thể tra cứu và mở tủ từ hệ thống quản lý trung tâm để hỗ trợ người dùng trong trường hợp quên mã.",
          },
        ],
        icon: "🎒",
        idealFor: "Trường học, trung tâm thương mại, gym, hồ bơi - nơi đông người gửi đồ tạm thời",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-locker-giao-nhan-hang",
        title: "Tủ locker giao nhận hàng (logistics, shipper)",
        shortTitle: "Giao nhận hàng (logistics)",
        metaTitle: "Tủ Locker Giao Nhận Hàng Cho Logistics, Shipper | TSE Vending",
        metaDescription:
          "Tủ locker thông minh cho điểm giao nhận hàng, bưu cục, shipper: gửi/nhận hàng tự động 24/7, tích hợp API với sàn TMĐT và đơn vị vận chuyển.",
        h1: "Tủ Locker Giao Nhận Hàng Cho Logistics, Shipper",
        intro: [
          "Tủ locker giao nhận hàng giúp các đơn vị logistics, sàn thương mại điện tử và shipper gửi/nhận hàng tự động 24/7 tại các điểm dân cư, văn phòng đông người mà không cần gặp mặt trực tiếp.",
          "Hệ thống hỗ trợ tích hợp API với nền tảng quản lý vận đơn của đối tác, tự động cập nhật trạng thái 'đã gửi vào tủ' và 'đã lấy hàng' theo thời gian thực.",
        ],
        features: [
          "Gửi/nhận hàng tự động 24/7, không cần gặp mặt",
          "Tích hợp API với hệ thống quản lý vận đơn của đối tác logistics",
          "Phân loại ô tủ theo kích thước phù hợp nhiều loại bưu phẩm",
          "Phù hợp lắp đặt tại bưu cục, chung cư, khu dân cư, văn phòng",
        ],
        faqs: [
          {
            q: "TSE Vending có hỗ trợ tích hợp với các sàn TMĐT lớn không?",
            a: "TSE Vending tư vấn giải pháp tích hợp API theo yêu cầu của từng đối tác logistics/sàn TMĐT cụ thể, đảm bảo đồng bộ trạng thái đơn hàng theo thời gian thực.",
          },
        ],
        icon: "📦",
        idealFor: "Bưu cục, sàn TMĐT, khu dân cư cần điểm giao nhận hàng tự động 24/7",
        investmentTier: "Cao",
      },
      {
        slug: "tu-locker-truong-hoc-dai-hoc",
        title: "Tủ locker thông minh trường học, đại học",
        shortTitle: "Trường học, đại học",
        metaTitle: "Tủ Locker Thông Minh Cho Trường Học, Đại Học | TSE Vending",
        metaDescription:
          "Tủ locker thông minh cho trường học, đại học: học sinh/sinh viên gửi đồ bằng thẻ học sinh RFID, mã QR, không chìa khóa. Quản lý theo khoa, lớp học.",
        h1: "Tủ Locker Thông Minh Cho Trường Học, Đại Học",
        intro: [
          "Tủ locker thông minh trong môi trường giáo dục thay thế hoàn toàn hệ thống tủ chìa khóa cơ truyền thống — học sinh và sinh viên sử dụng thẻ học sinh RFID sẵn có hoặc mã QR để mở tủ, không cần thêm thẻ hay phụ kiện riêng.",
          "Bộ phận quản lý cơ sở vật chất theo dõi tỷ lệ sử dụng, nhận cảnh báo ô tủ quá hạn và xuất báo cáo theo học kỳ để tối ưu phân bổ locker giữa các khoa, khu giảng đường và ký túc xá.",
        ],
        features: [
          "Tích hợp thẻ học sinh/sinh viên RFID sẵn có — một thẻ đa chức năng",
          "Phân quyền theo lớp, khoa, học kỳ — tự động thu hồi khi hết hạn",
          "Giao diện đa ngôn ngữ (Việt/Anh) cho trường quốc tế",
          "Dashboard quản lý tỷ lệ lấp đầy, cảnh báo ô tủ quá hạn",
        ],
        faqs: [
          {
            q: "Tủ locker trường học có tự động giải phóng ô sau mỗi buổi học không?",
            a: "Hệ thống hỗ trợ cấu hình thời hạn sử dụng linh hoạt: theo buổi, theo ngày hoặc cố định theo học kỳ. Admin nhận cảnh báo tự động khi có ô tủ quá hạn.",
          },
        ],
        icon: "🎓",
        idealFor: "Trường học, đại học cần quản lý locker theo học sinh/học kỳ",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-locker-khach-san-resort",
        title: "Tủ locker thông minh khách sạn, resort",
        shortTitle: "Khách sạn, resort",
        metaTitle: "Tủ Locker Thông Minh Cho Khách Sạn, Resort | TSE Vending",
        metaDescription:
          "Tủ locker thông minh gửi hành lý tự phục vụ cho khách sạn, resort: khách gửi đồ sau check-out bằng mã OTP, lấy lại bất kỳ lúc nào 24/7.",
        h1: "Tủ Locker Thông Minh Cho Khách Sạn, Resort",
        intro: [
          "Tủ locker thông minh tại khách sạn và resort giải quyết bài toán kinh điển: khách trả phòng lúc 12h nhưng chuyến bay lúc 22h — thay vì gửi hành lý tại quầy lễ tân, khách tự gửi vào ô locker và tự lấy khi cần, không cần nhờ nhân viên.",
          "Hệ thống hỗ trợ đa ngôn ngữ, tích hợp PMS (Property Management System) và cấp mã OTP cá nhân hóa cho từng lượt gửi đồ, đảm bảo an toàn tuyệt đối.",
        ],
        features: [
          "Khách tự gửi/lấy hành lý sau check-out 24/7 bằng mã OTP",
          "Tích hợp với PMS khách sạn — cấp quyền tự động khi check-in",
          "Đa ngôn ngữ: Việt, Anh, Trung — phục vụ khách quốc tế",
          "Ngăn tủ đa kích thước từ túi xách đến vali 28 inch",
        ],
        faqs: [
          {
            q: "Tủ locker khách sạn có thể tích hợp với phần mềm quản lý khách sạn không?",
            a: "TSE Vending hỗ trợ tích hợp API với hầu hết các PMS phổ biến tại Việt Nam. Khi khách check-in, tài khoản locker được kích hoạt tự động — không cần lễ tân thao tác thêm.",
          },
        ],
        icon: "🏨",
        idealFor: "Khách sạn, resort muốn nâng trải nghiệm dịch vụ lưu hành lý sau check-out",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-locker-sieu-thi-ban-le",
        title: "Tủ locker gửi đồ siêu thị, trung tâm thương mại",
        shortTitle: "Siêu thị, TTTM",
        metaTitle: "Tủ Gửi Đồ Thông Minh Siêu Thị, Trung Tâm Thương Mại | TSE Vending",
        metaDescription:
          "Tủ gửi đồ thông minh tự phục vụ cho siêu thị, trung tâm thương mại: khách hàng gửi đồ bằng QR/mã PIN trong 30 giây, vận hành không cần nhân viên trực.",
        h1: "Tủ Gửi Đồ Thông Minh Cho Siêu Thị, Trung Tâm Thương Mại",
        intro: [
          "Tủ gửi đồ thông minh tại siêu thị và trung tâm thương mại thay thế hoàn toàn hệ thống tủ khóa cơ và quầy gửi đồ truyền thống — khách hàng hoàn tất giao dịch trong dưới 30 giây và tự lấy đồ khi ra về bằng QR hoặc mã PIN, không xếp hàng, không chờ nhân viên.",
          "Ban quản lý siêu thị truy cập dashboard xem tỷ lệ lấp đầy, doanh thu phí gửi đồ và lịch sử giao dịch theo thời gian thực — đồng bộ toàn chuỗi chi nhánh trên một giao diện duy nhất.",
        ],
        features: [
          "Khách gửi đồ tự phục vụ trong dưới 30 giây, không cần nhân viên",
          "Tùy chọn miễn phí hoặc thu phí theo giờ, thanh toán QR tự động",
          "Dashboard quản lý toàn chuỗi siêu thị theo thời gian thực",
          "Lịch sử giao dịch đầy đủ, giảm tranh chấp mất đồ",
        ],
        faqs: [
          {
            q: "Tủ gửi đồ siêu thị có thể đặt cấu hình thu phí không?",
            a: "Hoàn toàn có. Hệ thống hỗ trợ miễn phí hoàn toàn, miễn phí X giờ đầu rồi thu phí, hoặc thu phí theo giờ ngay từ đầu. Khách thanh toán qua QR (MoMo, ZaloPay, VietQR) trực tiếp tại màn hình tủ.",
          },
        ],
        icon: "🛒",
        idealFor: "Siêu thị, trung tâm thương mại cần giải pháp gửi đồ tự phục vụ đông khách",
        investmentTier: "Trung bình",
      },
      {
        slug: "tu-locker-benh-vien-y-te",
        title: "Tủ locker thông minh bệnh viện, cơ sở y tế",
        shortTitle: "Bệnh viện, y tế",
        metaTitle: "Tủ Locker Thông Minh Cho Bệnh Viện, Cơ Sở Y Tế | TSE Vending",
        metaDescription:
          "Tủ locker thông minh cho bệnh viện: bảo quản đồ cá nhân bệnh nhân, nhân viên y tế. Chất liệu chống khuẩn, mở khóa không chạm, quản lý theo ca trực.",
        h1: "Tủ Locker Thông Minh Cho Bệnh Viện, Cơ Sở Y Tế",
        intro: [
          "Trong môi trường bệnh viện, tủ locker thông minh phục vụ hai nhóm người dùng riêng biệt: bệnh nhân nội trú cần bảo quản đồ cá nhân trong suốt thời gian điều trị, và nhân viên y tế làm ca luân phiên cần lưu trữ tài sản cá nhân và trang thiết bị y tế không mang theo khi vào phòng vô trùng.",
          "Tủ locker cho bệnh viện được thiết kế với chất liệu bề mặt kháng khuẩn, hỗ trợ mở khóa không chạm (QR/vân tay) và quản lý phân quyền theo ca trực, khoa phòng.",
        ],
        features: [
          "Chất liệu bề mặt kháng khuẩn, dễ vệ sinh theo tiêu chuẩn y tế",
          "Mở khóa không chạm: QR, vân tay — giảm nguy cơ lây nhiễm chéo",
          "Phân quyền theo ca trực, khoa phòng — tự động reset sau mỗi ca",
          "Ngăn tủ khóa đôi cho thiết bị y tế giá trị cao",
        ],
        faqs: [
          {
            q: "Tủ locker bệnh viện có thể dùng chung cho cả bệnh nhân và nhân viên y tế không?",
            a: "Hệ thống cho phép phân vùng tủ theo nhóm người dùng: khu vực dành riêng cho bệnh nhân (theo khoa/phòng), khu vực nhân viên y tế (theo ca trực, bộ phận). Mỗi nhóm có cấu hình thời hạn và quyền truy cập riêng biệt.",
          },
        ],
        icon: "🏥",
        idealFor: "Bệnh viện, phòng khám, cơ sở y tế cần locker kháng khuẩn cho bệnh nhân và nhân viên",
        investmentTier: "Cao",
      },
    ],
  },
];

export interface SolutionItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
}

export const SOLUTIONS_SILO = {
  slug: "giai-phap-kinh-doanh",
  title: "Giải pháp & tư vấn vận hành vending",
  shortTitle: "Giải pháp kinh doanh",
  metaTitle: "Giải Pháp Kinh Doanh Vending & Tủ Locker Thông Minh | TSE Vending",
  metaDescription:
    "Tư vấn giải pháp kinh doanh máy bán hàng tự động & tủ locker thông minh: khảo sát vị trí, mô hình hợp tác đầu tư, vận hành - quản lý từ xa, tối ưu chi phí.",
  h1: "Giải Pháp & Tư Vấn Vận Hành Vending",
  intro: [
    "Bên cạnh cung cấp thiết bị, TSE Vending đồng hành cùng đối tác trong toàn bộ quá trình kinh doanh máy bán hàng tự động và tủ locker thông minh - từ khảo sát vị trí, lựa chọn mô hình hợp tác đến vận hành và tối ưu vận chuyển hàng hóa.",
    "Mục tiêu của chúng tôi là giúp đối tác - từ chủ tòa nhà, nhà đầu tư cá nhân đến doanh nghiệp vận hành chuỗi - triển khai hệ thống máy hiệu quả, tiết kiệm chi phí vận hành và tối đa hóa doanh thu trên mỗi điểm đặt máy.",
  ],
  items: [
    {
      slug: "tu-van-vi-tri-dat-may",
      title: "Tư vấn vị trí đặt máy bán hàng tự động & tủ locker",
      shortTitle: "Tư vấn vị trí đặt máy",
      description:
        "Khảo sát lưu lượng người qua lại, đối tượng khách hàng và đặc điểm khu vực để đề xuất vị trí đặt máy mang lại hiệu quả doanh thu cao nhất.",
      icon: "📍",
    },
    {
      slug: "hop-tac-dau-tu",
      title: "Mô hình hợp tác đầu tư máy bán hàng tự động",
      shortTitle: "Hợp tác đầu tư",
      description:
        "Đa dạng mô hình hợp tác: đầu tư trọn gói, chia sẻ doanh thu với chủ mặt bằng, hoặc thuê vận hành theo gói dịch vụ - phù hợp từng quy mô đầu tư.",
      icon: "🤝",
    },
    {
      slug: "van-hanh-quan-ly-tu-xa",
      title: "Vận hành & quản lý hệ thống máy từ xa",
      shortTitle: "Vận hành từ xa",
      description:
        "Nền tảng quản lý tập trung giúp theo dõi doanh thu, tồn kho, tình trạng thiết bị của toàn bộ hệ thống máy theo thời gian thực trên một giao diện duy nhất.",
      icon: "📊",
    },
    {
      slug: "bao-tri-bao-hanh",
      title: "Bảo trì, bảo hành & hỗ trợ kỹ thuật toàn quốc",
      shortTitle: "Bảo trì - bảo hành",
      description:
        "Đội ngũ kỹ thuật phản hồi nhanh, lịch bảo trì định kỳ và chính sách bảo hành rõ ràng giúp hệ thống máy hoạt động liên tục, giảm thời gian gián đoạn.",
      icon: "🛠️",
    },
  ] as SolutionItem[],
  faqs: [
    {
      q: "TSE Vending có những mô hình hợp tác đầu tư nào?",
      a: "TSE Vending cung cấp 3 mô hình phổ biến: đầu tư trọn gói (đối tác sở hữu máy, TSE hỗ trợ vận hành), hợp tác chia sẻ doanh thu với chủ mặt bằng, và thuê vận hành theo gói dịch vụ - phù hợp với từng quy mô và ngân sách đầu tư.",
    },
    {
      q: "Làm sao để bắt đầu hợp tác với TSE Vending?",
      a: "Bạn chỉ cần liên hệ qua hotline hoặc form trên website, TSE Vending sẽ khảo sát vị trí, tư vấn dòng máy/tủ locker phù hợp và đề xuất mô hình hợp tác cụ thể cho không gian của bạn.",
    },
    {
      q: "Phần mềm quản lý từ xa của TSE Vending hoạt động như thế nào?",
      a: "Phần mềm cho phép theo dõi doanh thu, tồn kho, tình trạng thiết bị của toàn bộ hệ thống máy bán hàng và tủ locker theo thời gian thực trên một giao diện duy nhất, kèm cảnh báo tự động khi có sự cố hoặc hàng hóa sắp hết.",
    },
  ] as Faq[],
};

export function getAllSilos(): Silo[] {
  return SILOS;
}

export function getSiloBySlug(slug: string): Silo | undefined {
  return SILOS.find((s) => s.slug === slug);
}

export function getSubcategory(
  siloSlug: string,
  subSlug: string
): { silo: Silo; sub: SubCategory } | undefined {
  const silo = getSiloBySlug(siloSlug);
  if (!silo) return undefined;
  const sub = silo.subcategories.find((s) => s.slug === subSlug);
  if (!sub) return undefined;
  return { silo, sub };
}

export interface FooterLink {
  title: string;
  href: string;
}

export function getFooterSiloLinks(): FooterLink[] {
  const links: FooterLink[] = [];
  for (const silo of SILOS) {
    links.push({ title: silo.shortTitle, href: `/${silo.slug}` });
  }
  links.push({ title: SOLUTIONS_SILO.shortTitle, href: `/${SOLUTIONS_SILO.slug}` });
  return links;
}

export function getAllCategorySlugs(): { silo: string; sub?: string }[] {
  const out: { silo: string; sub?: string }[] = [];
  for (const silo of SILOS) {
    out.push({ silo: silo.slug });
    for (const sub of silo.subcategories) {
      out.push({ silo: silo.slug, sub: sub.slug });
    }
  }
  return out;
}
