/**
 * Generates press release content for free Vietnamese media platforms.
 * Uses Gemini to write platform-specific content from NAP + topic.
 *
 * Usage: npm run generate:pr
 * Output: scripts/backlink-profiles/press-releases/
 */
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nap from "./backlink-profiles/nap.json";

const OUT_DIR = path.join(__dirname, "backlink-profiles", "press-releases");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

interface Platform {
  id: string;
  name: string;
  url: string;
  da: number;
  free: boolean;
  audience: string;
  format: "press_release" | "article" | "forum_post";
  maxWords: number;
  linkAllowed: boolean;
  linkType: "dofollow" | "nofollow" | "unknown";
  imageRequired: boolean;
  notes: string;
}

// Toàn bộ nền tảng miễn phí tìm được
export const FREE_PLATFORMS: Platform[] = [
  // ── BÁO / TẠP CHÍ NHẬN BÀI MIỄN PHÍ ──────────────────────────────
  {
    id: "brandsvietnam",
    name: "Brands Vietnam",
    url: "https://www.brandsvietnam.com/box/press-release/",
    da: 62,
    free: true,
    audience: "Marketing, brand managers, giám đốc 90k+ members",
    format: "press_release",
    maxWords: 1000,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "Tự đăng, duyệt trong 24h. Mục press-release chuyên nghiệp, DA cao.",
  },
  {
    id: "advertisingvietnam",
    name: "Advertising Vietnam",
    url: "https://advertisingvietnam.com/huong-dan-dang-bai-tren-website-advertising-vietnam-p20233",
    da: 55,
    free: true,
    audience: "Marketing, advertising professionals",
    format: "article",
    maxWords: 1500,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: true,
    notes: "Ảnh 1440x756px bắt buộc. Tối đa 10 hashtag. Không copy từ Facebook.",
  },
  {
    id: "diendandoanhnghiep",
    name: "Diễn đàn Doanh nghiệp (VCCI)",
    url: "https://diendandoanhnghiep.vn/",
    da: 58,
    free: true,
    audience: "Doanh nhân, doanh nghiệp VN, VCCI readers",
    format: "press_release",
    maxWords: 800,
    linkAllowed: true,
    linkType: "unknown",
    imageRequired: true,
    notes: "Cơ quan VCCI. Gửi bài qua email tòa soạn. Cơ hội cao nếu có góc tin tức thực.",
  },
  {
    id: "doanhnghiepvathuongmai",
    name: "Tạp chí Doanh nghiệp & Thương mại",
    url: "https://doanhnghiepvathuongmai.vn/",
    da: 45,
    free: true,
    audience: "Doanh nghiệp vừa và nhỏ",
    format: "press_release",
    maxWords: 700,
    linkAllowed: true,
    linkType: "unknown",
    imageRequired: true,
    notes: "Gửi bài qua email. Thường đăng tin doanh nghiệp miễn phí nếu có tin tức thực.",
  },
  {
    id: "doanhnghiephoinhap",
    name: "Tạp chí Doanh nghiệp & Hội nhập",
    url: "https://doanhnghiephoinhap.vn/",
    da: 43,
    free: true,
    audience: "Doanh nghiệp xuất nhập khẩu, hội nhập kinh tế",
    format: "press_release",
    maxWords: 700,
    linkAllowed: true,
    linkType: "unknown",
    imageRequired: true,
    notes: "Tạp chí điện tử, thường đăng tin doanh nghiệp. Gửi bài qua email BTV.",
  },
  {
    id: "doanhnghiepthuonghieu",
    name: "Tạp chí Doanh nghiệp & Thương hiệu",
    url: "https://doanhnghiepthuonghieu.vn/",
    da: 40,
    free: true,
    audience: "Doanh nghiệp, brand building",
    format: "press_release",
    maxWords: 700,
    linkAllowed: true,
    linkType: "unknown",
    imageRequired: false,
    notes: "Tạp chí brand-focus. Email tòa soạn để gửi bài.",
  },

  // ── DIỄN ĐÀN / FORUM ──────────────────────────────────────────────
  {
    id: "vbiz",
    name: "vBiz.vn — Diễn đàn Doanh nhân",
    url: "https://vbiz.vn/",
    da: 42,
    free: true,
    audience: "Doanh nhân, startup, B2B",
    format: "forum_post",
    maxWords: 500,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "Đăng bài trong mục kinh nghiệm kinh doanh. Link trong bài được chấp nhận.",
  },
  {
    id: "otofun",
    name: "OtoFun.net (box kinh doanh)",
    url: "https://www.otofun.net/forums/thuong-mai-dich-vu.117/",
    da: 58,
    free: true,
    audience: "Cộng đồng lớn, 1M+ members",
    format: "forum_post",
    maxWords: 400,
    linkAllowed: true,
    linkType: "nofollow",
    imageRequired: false,
    notes: "Box thương mại-dịch vụ. Nofollow nhưng DA cao, traffic lớn → brand awareness.",
  },
  {
    id: "voz",
    name: "VOZ.vn",
    url: "https://voz.vn/f/lam-an-kinh-doanh.54/",
    da: 65,
    free: true,
    audience: "Tech-savvy, 18–35 tuổi, 2M+ members",
    format: "forum_post",
    maxWords: 600,
    linkAllowed: true,
    linkType: "nofollow",
    imageRequired: false,
    notes: "DA 65, cộng đồng lớn nhất VN. Box làm ăn kinh doanh. Nofollow nhưng traffic khổng lồ.",
  },
  {
    id: "webtretho",
    name: "Webtretho.com",
    url: "https://www.webtretho.com/f/rao-vat",
    da: 55,
    free: true,
    audience: "Phụ nữ, gia đình, cư dân chung cư",
    format: "forum_post",
    maxWords: 300,
    linkAllowed: true,
    linkType: "nofollow",
    imageRequired: false,
    notes: "Đúng target: phụ nữ sống chung cư dùng locker. Đăng mục rao vặt.",
  },

  // ── PRESS RELEASE QUỐC TẾ MIỄN PHÍ ──────────────────────────────
  {
    id: "prlog",
    name: "PRLog.com",
    url: "https://www.prlog.org/post-press-release.html",
    da: 72,
    free: true,
    audience: "Google News indexed, global",
    format: "press_release",
    maxWords: 500,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "DA 72, MIỄN PHÍ hoàn toàn, Google News indexed. Bài tiếng Anh. Rất giá trị.",
  },
  {
    id: "openpr",
    name: "OpenPR.com",
    url: "https://www.openpr.com/submit-press-release/",
    da: 70,
    free: true,
    audience: "Global, Google News",
    format: "press_release",
    maxWords: 600,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "DA 70, miễn phí, dofollow. Bài tiếng Anh. Google News indexed.",
  },
  {
    id: "newswire",
    name: "1888PressRelease.com",
    url: "https://www.1888pressrelease.com/submit-press-release.php",
    da: 55,
    free: true,
    audience: "Global PR distribution",
    format: "press_release",
    maxWords: 500,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "DA 55, miễn phí, dofollow link trong bài.",
  },
  {
    id: "pressabout",
    name: "PressAbout.com",
    url: "https://www.pressabout.com/",
    da: 50,
    free: true,
    audience: "PR distribution network",
    format: "press_release",
    maxWords: 500,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "Miễn phí, dofollow.",
  },

  // ── COMMUNITY / WEB 2.0 ──────────────────────────────────────────
  {
    id: "viblo",
    name: "Viblo.asia",
    url: "https://viblo.asia/newest",
    da: 71,
    free: true,
    audience: "Tech community Vietnam, IT engineers",
    format: "article",
    maxWords: 2000,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "Bài đã có sẵn trong viblo-article.md. DA 71, dofollow.",
  },
  {
    id: "medium",
    name: "Medium.com",
    url: "https://medium.com/new-story",
    da: 94,
    free: true,
    audience: "Global English readers",
    format: "article",
    maxWords: 2000,
    linkAllowed: true,
    linkType: "nofollow",
    imageRequired: false,
    notes: "DA 94 nhưng nofollow. Giá trị brand awareness, có thể drive referral traffic.",
  },
  {
    id: "googlesites",
    name: "Google Sites",
    url: "https://sites.google.com/new",
    da: 100,
    free: true,
    audience: "Google index directly",
    format: "article",
    maxWords: 1000,
    linkAllowed: true,
    linkType: "dofollow",
    imageRequired: false,
    notes: "DA 100. Tạo trang về TSE Vending, link về tsevending.com.",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Content generation
// ─────────────────────────────────────────────────────────────────────

function buildPrompt(platform: Platform): string {
  const isEn = ["prlog", "openpr", "newswire", "pressabout", "medium"].includes(platform.id);
  const isForum = platform.format === "forum_post";
  const isPR = platform.format === "press_release";

  const lang = isEn ? "tiếng Anh" : "tiếng Việt";
  const link = `https://tsevending.com`;
  const linkLocker = `https://tsevending.com/tu-locker-thong-minh`;
  const linkVending = `https://tsevending.com/may-ban-hang-tu-dong`;

  if (isForum) {
    return `Bạn là Nguyễn Đỗ Tùng, đồng sáng lập TSE Vending (${link}).
Viết một bài chia sẻ kinh nghiệm ${lang} cho forum ${platform.name}.
- Tone: chuyên gia chia sẻ thực tế, không quảng cáo lộ liễu
- Độ dài: ${platform.maxWords} từ tối đa
- Chủ đề: kinh nghiệm triển khai tủ locker hoặc máy bán hàng tự động tại chung cư/văn phòng
- Mention tự nhiên link: ${linkLocker} hoặc ${link}
- Không dùng emoji
- Kết thúc bằng thông tin liên hệ tự nhiên: ${nap.phone}`;
  }

  if (isPR) {
    return `Bạn là chuyên gia PR của TSE Vending. Viết thông cáo báo chí (press release) ${lang} cho ${platform.name}.
Thông tin công ty:
- Tên: ${nap.name_vi} (${nap.legal_name_en})
- Website: ${link}
- Địa chỉ: ${nap.address.street_vi}, ${nap.address.city_vi}
- Hotline: ${nap.phone}
- Thành lập: ${nap.founded}

Chủ đề press release: TSE Vending ra mắt giải pháp tủ locker thông minh thế hệ mới tích hợp IoT và đa phương thức thanh toán cho chung cư tại TPHCM năm 2026.

Yêu cầu:
- Độ dài: ${platform.maxWords} từ
- Có headline hấp dẫn (không phải quảng cáo, như một tin tức thực)
- Có dateline: TP. Hồ Chí Minh, ${new Date().toLocaleDateString("vi-VN")}
- Có quote từ "Nguyễn Đỗ Tùng, Đồng sáng lập TSE Vending"
- Mention link tự nhiên: ${linkLocker} và ${link}
- Kết bằng thông tin liên hệ chuẩn PR (boilerplate)
- Ngôn ngữ ${lang}, tone chuyên nghiệp`;
  }

  // article
  return `Bạn là Nguyễn Đỗ Tùng, viết bài chuyên gia ${lang} cho ${platform.name} (audience: ${platform.audience}).
Chủ đề: Xu hướng tủ locker thông minh tại Việt Nam 2026 — từ chung cư đến khu công nghiệp.
- Độ dài: ${Math.min(platform.maxWords, 800)} từ
- Tone: chuyên gia thực chiến, insight thị trường VN
- Include link tự nhiên: ${linkLocker} và ${link}
- Ngôn ngữ ${lang}
- Kết thúc bằng author bio ngắn`;
}

async function generateContent(genAI: GoogleGenerativeAI, platform: Platform): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    generationConfig: { temperature: 0.75, maxOutputTokens: 4096 },
  });
  const result = await model.generateContent(buildPrompt(platform));
  return result.response.text().trim();
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { console.error("❌ GEMINI_API_KEY required"); process.exit(1); }

  const genAI = new GoogleGenerativeAI(apiKey);
  const targetId = process.argv.find((a) => a.startsWith("--platform="))?.split("=")[1];

  const platforms = targetId ? FREE_PLATFORMS.filter((p) => p.id === targetId) : FREE_PLATFORMS;

  console.log(`\n📝 Generating content for ${platforms.length} platform(s)...\n`);

  // Save master checklist
  const checklist = FREE_PLATFORMS.map((p) => ({
    id: p.id,
    name: p.name,
    url: p.url,
    da: p.da,
    linkType: p.linkType,
    format: p.format,
    notes: p.notes,
    submitted: fs.existsSync(path.join(OUT_DIR, `${p.id}.md`)),
  }));
  fs.writeFileSync(
    path.join(__dirname, "backlink-profiles", "platform-checklist.json"),
    JSON.stringify(checklist, null, 2)
  );

  for (const platform of platforms) {
    const outFile = path.join(OUT_DIR, `${platform.id}.md`);
    if (fs.existsSync(outFile)) {
      console.log(`⏭  ${platform.name} — content đã có, bỏ qua`);
      continue;
    }

    process.stdout.write(`  ✍️  ${platform.name}...`);
    try {
      const content = await generateContent(genAI, platform);
      const meta = [
        `# ${platform.name}`,
        ``,
        `**URL đăng:** ${platform.url}`,
        `**DA:** ${platform.da} | **Link:** ${platform.linkType} | **Format:** ${platform.format}`,
        `**Audience:** ${platform.audience}`,
        `**Ghi chú:** ${platform.notes}`,
        ``,
        `---`,
        ``,
        content,
      ].join("\n");

      fs.writeFileSync(outFile, meta, "utf8");
      console.log(` ✅`);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.log(` ❌ ${err}`);
    }
  }

  console.log(`\n✅ Nội dung lưu tại: scripts/backlink-profiles/press-releases/`);
  console.log(`📋 Checklist: scripts/backlink-profiles/platform-checklist.json`);

  // Print summary table
  console.log(`\n${"─".repeat(70)}`);
  console.log(`${"Platform".padEnd(30)} ${"DA".padEnd(5)} ${"Link".padEnd(12)} ${"Format"}`);
  console.log(`${"─".repeat(70)}`);
  for (const p of FREE_PLATFORMS) {
    const status = fs.existsSync(path.join(OUT_DIR, `${p.id}.md`)) ? "✅" : "⏳";
    console.log(`${status} ${p.name.padEnd(28)} ${String(p.da).padEnd(5)} ${p.linkType.padEnd(12)} ${p.format}`);
  }
}

main().catch(console.error);
