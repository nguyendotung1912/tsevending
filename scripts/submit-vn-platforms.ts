/**
 * Auto-submit TSE Vending to Vietnamese platforms:
 * 1. Viblo.asia     — DA 71, dofollow, tech article
 * 2. muare.vn       — classified ad (máy bán hàng)
 * 3. enbac.com      — classified ad
 * 4. timviec365.vn  — employer profile (website link)
 * 5. vietnamworks   — employer profile
 *
 * Usage: npx tsx scripts/submit-vn-platforms.ts
 * Usage (one): npx tsx scripts/submit-vn-platforms.ts -- --site=viblo
 *
 * After running: check nguyendotung@gmail.com for verification emails → click links
 */
import { chromium, Page } from "playwright";
import fs from "fs";
import path from "path";

const EMAIL = "nguyendotung@gmail.com";
const PASSWORD = "TSEVending@2024!";
const FULL_NAME = "Nguyễn Đỗ Tùng";
const USERNAME = "nguyendotung1912";
const COMPANY = "TSE Vending";
const WEBSITE = "https://tsevending.com";
const PHONE = "0837375757";
const ADDRESS = "66/2 Tân Thới Nhất 05, Quận 12, TP. Hồ Chí Minh";

const STATUS_FILE = path.join(__dirname, "backlink-profiles/vn-submission-status.json");

type Status = Record<string, { submitted: boolean; date?: string; url?: string; notes?: string }>;
function loadStatus(): Status {
  if (fs.existsSync(STATUS_FILE)) return JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
  return {};
}
function saveStatus(s: Status) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(s, null, 2));
}

function readContent(filename: string): string {
  return fs.readFileSync(path.join(__dirname, "backlink-profiles/press-releases", filename), "utf8");
}

function extractBody(raw: string): string {
  const lines = raw.split("\n");
  let start = 0;
  let dashCount = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "---") { dashCount++; if (dashCount >= 2) { start = i + 1; break; } }
  }
  return lines.slice(start).join("\n")
    .replace(/\*\*/g, "").replace(/^\*\s*/gm, "• ").replace(/^#+\s*/gm, "").trim();
}

// ──────────────────────────────────────────────
// 1. VIBLO.ASIA — Tech article, DA 71, dofollow
// ──────────────────────────────────────────────
async function submitViblo(page: Page) {
  const raw = readContent("viblo.md");
  const title = "Tủ Locker Thông Minh: Không Chỉ Là Xu Hướng, Mà Là Nhu Cầu Thiết Yếu Của Việt Nam 2026 – Từ Chung Cư Đến Khu Công Nghiệp";
  const body = extractBody(raw);

  // Register
  console.log("  → Viblo: Đăng ký tài khoản...");
  await page.goto("https://viblo.asia/register", { waitUntil: "domcontentloaded", timeout: 30000 });

  try {
    await page.fill('input[name="name"], input[id="name"]', FULL_NAME).catch(() => {});
    await page.fill('input[name="username"], input[id="username"]', USERNAME).catch(() => {});
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"], input[type="password"]', PASSWORD).catch(() => {});
    // Confirm password
    const confirmField = page.locator('input[name="password_confirmation"], input[name="confirm_password"]').first();
    if (await confirmField.count() > 0) await confirmField.fill(PASSWORD);

    await page.waitForTimeout(1500);
    const btn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
    console.log("  ✓ Viblo: Đã đăng ký — check email để verify");
  } catch (e) {
    console.log(`  ⚠ Viblo register: ${e}`);
  }

  // Try login in case already registered
  await page.goto("https://viblo.asia/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"], input[type="password"]', PASSWORD).catch(() => {});
    await page.waitForTimeout(1000);
    const btn = page.locator('button[type="submit"]').first();
    if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
  } catch {}

  // New post
  console.log("  → Viblo: Tạo bài viết...");
  await page.goto("https://viblo.asia/p/new", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Fill title
  const titleSel = 'input[placeholder*="tiêu đề" i], input[placeholder*="title" i], input[name="title"], .post-title input';
  try {
    const el = page.locator(titleSel).first();
    if (await el.count() > 0) { await el.fill(title); console.log("  ✓ Viblo: Title filled"); }
  } catch {}

  // Fill content (Viblo uses CodeMirror or contenteditable)
  try {
    const editor = page.locator('.CodeMirror-code, .cm-content, [contenteditable="true"], textarea[name="content"]').first();
    if (await editor.count() > 0) {
      await editor.click();
      await page.keyboard.selectAll();
      await page.keyboard.type(body.slice(0, 8000));
      console.log("  ✓ Viblo: Content filled");
    }
  } catch (e) {
    console.log(`  ⚠ Viblo content: ${e}`);
  }

  await page.waitForTimeout(2000);

  // Publish
  const publishBtn = page.locator('button:has-text("Xuất bản"), button:has-text("Publish"), button:has-text("Đăng bài")').first();
  if (await publishBtn.count() > 0) {
    await publishBtn.click();
    await page.waitForTimeout(3000);
    console.log("  ✓ Viblo: Đăng bài submitted");
  }

  return page.url();
}

// ──────────────────────────────────────────────
// 2. MUARE.VN — Classified ad
// ──────────────────────────────────────────────
async function submitMuare(page: Page) {
  const title = "Máy bán hàng tự động & Tủ locker thông minh IoT — TSE Vending TPHCM";
  const desc = `TSE Vending chuyên cung cấp máy bán hàng tự động và tủ locker thông minh IoT tại Việt Nam từ năm 2014.

Tủ locker thông minh: Mở khóa QR, vân tay, thẻ từ, khuôn mặt. Kết nối IoT real-time, camera 24/7. Phù hợp chung cư, khu công nghiệp, bệnh viện, trường học.

Máy bán hàng tự động: Nước uống, thực phẩm, đồ tiêu dùng. Thanh toán Momo, ZaloPay, QR Pay.

Website: ${WEBSITE}
Hotline: ${PHONE}
Địa chỉ: ${ADDRESS}`;

  console.log("  → Muare: Đăng ký tài khoản...");
  await page.goto("https://muare.vn/dang-ky", { waitUntil: "domcontentloaded", timeout: 30000 });

  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"]', PASSWORD).catch(() => {});
    await page.fill('input[name="name"], input[name="fullname"]', FULL_NAME).catch(() => {});
    await page.fill('input[name="phone"]', PHONE).catch(() => {});
    await page.waitForTimeout(1000);
    const btn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
    console.log("  ✓ Muare: Đăng ký xong");
  } catch (e) { console.log(`  ⚠ Muare register: ${e}`); }

  // Đăng tin
  await page.goto("https://muare.vn/dang-tin", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  try {
    await page.fill('input[name="title"], #title', title).catch(() => {});
    await page.fill('textarea[name="description"], textarea[name="content"], #description', desc).catch(() => {});
    await page.fill('input[name="phone"], input[name="contact_phone"]', PHONE).catch(() => {});
    console.log("  ✓ Muare: Form filled");
    await page.waitForTimeout(3000);

    // Check for CAPTCHA — pause for user if present
    const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
    if (hasCaptcha) {
      console.log("  ⚠ Muare: CAPTCHA detected — bỏ qua, để user làm thủ công");
    } else {
      const btn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
      console.log("  ✓ Muare: Đã submit");
    }
  } catch (e) { console.log(`  ⚠ Muare form: ${e}`); }

  return page.url();
}

// ──────────────────────────────────────────────
// 3. ENBAC.COM — Classified
// ──────────────────────────────────────────────
async function submitEnbac(page: Page) {
  const title = "Tủ locker thông minh IoT, máy bán hàng tự động — TSE Vending";
  const desc = `TSE Vending (Công ty Cổ phần Công nghệ TSE) — nhà sản xuất tủ locker thông minh và máy bán hàng tự động tại TPHCM từ 2014.

Tủ locker: QR, PIN, vân tay, nhận diện khuôn mặt. IoT cloud, thông báo SMS/app, camera 24/7. Cho chung cư, khu CN, bệnh viện.

Máy bán hàng: Đa chủng loại, thanh toán Momo/ZaloPay/QR/thẻ.

Website: ${WEBSITE} | Hotline: ${PHONE}`;

  console.log("  → Enbac: Đăng ký...");
  await page.goto("https://enbac.com/dang-ky", { waitUntil: "domcontentloaded", timeout: 30000 });

  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"]', PASSWORD).catch(() => {});
    await page.fill('input[name="name"], input[name="fullname"]', FULL_NAME).catch(() => {});
    await page.fill('input[name="phone"]', PHONE).catch(() => {});
    await page.waitForTimeout(1000);
    const btn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
  } catch (e) { console.log(`  ⚠ Enbac register: ${e}`); }

  await page.goto("https://enbac.com/dang-tin", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  try {
    await page.fill('input[name="title"]', title).catch(() => {});
    await page.fill('textarea[name="content"], textarea[name="description"]', desc).catch(() => {});
    await page.fill('input[name="phone"]', PHONE).catch(() => {});
    console.log("  ✓ Enbac: Form filled");

    const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
    if (!hasCaptcha) {
      const btn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
      console.log("  ✓ Enbac: Submitted");
    } else {
      console.log("  ⚠ Enbac: CAPTCHA — skip");
    }
  } catch (e) { console.log(`  ⚠ Enbac form: ${e}`); }

  return page.url();
}

// ──────────────────────────────────────────────
// 4. TIMVIEC365.VN — Employer profile (DA 55)
// ──────────────────────────────────────────────
async function submitTimviec(page: Page) {
  console.log("  → Timviec365: Tạo tài khoản nhà tuyển dụng...");
  await page.goto("https://timviec365.vn/nha-tuyen-dung/tao-tai-khoan", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"]', PASSWORD).catch(() => {});
    await page.fill('input[name="company_name"], input[name="ten_cong_ty"]', COMPANY).catch(() => {});
    await page.fill('input[name="phone"], input[name="dien_thoai"]', PHONE).catch(() => {});
    await page.fill('input[name="website"], input[name="website_cong_ty"]', WEBSITE).catch(() => {});
    console.log("  ✓ Timviec: Form filled");
    await page.waitForTimeout(1500);

    const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
    if (!hasCaptcha) {
      const btn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
    } else {
      console.log("  ⚠ Timviec: CAPTCHA");
    }
  } catch (e) { console.log(`  ⚠ Timviec: ${e}`); }

  return page.url();
}

// ──────────────────────────────────────────────
// 5. VIETNAMWORKS.COM — Employer profile (DA 68)
// ──────────────────────────────────────────────
async function submitVietnamWorks(page: Page) {
  console.log("  → VietnamWorks: Đăng ký nhà tuyển dụng...");
  await page.goto("https://employer.vietnamworks.com/vi/register", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"]', PASSWORD).catch(() => {});

    const companyField = page.locator('input[name="company_name"], input[name="companyName"], input[placeholder*="công ty" i]').first();
    if (await companyField.count() > 0) await companyField.fill(COMPANY);

    const phoneField = page.locator('input[name="phone"], input[name="phoneNumber"]').first();
    if (await phoneField.count() > 0) await phoneField.fill(PHONE);

    const websiteField = page.locator('input[name="website"], input[name="companyWebsite"]').first();
    if (await websiteField.count() > 0) await websiteField.fill(WEBSITE);

    console.log("  ✓ VietnamWorks: Form filled");
    await page.waitForTimeout(1500);

    const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
    if (!hasCaptcha) {
      const btn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await btn.count() > 0) { await btn.click(); await page.waitForTimeout(3000); }
    } else {
      console.log("  ⚠ VietnamWorks: CAPTCHA");
    }
  } catch (e) { console.log(`  ⚠ VietnamWorks: ${e}`); }

  return page.url();
}

// ──────────────────────────────────────────────
// Registry & Main
// ──────────────────────────────────────────────
const SITES: Record<string, { name: string; da: number; fn: (p: Page) => Promise<string> }> = {
  viblo:        { name: "Viblo.asia",         da: 71, fn: submitViblo },
  muare:        { name: "muare.vn",           da: 52, fn: submitMuare },
  enbac:        { name: "enbac.com",          da: 48, fn: submitEnbac },
  timviec:      { name: "timviec365.vn",      da: 55, fn: submitTimviec },
  vietnamworks: { name: "vietnamworks.com",   da: 68, fn: submitVietnamWorks },
};

async function main() {
  const arg = process.argv.find((a) => a.startsWith("--site="));
  const targetSite = arg ? arg.split("=")[1] : null;

  const status = loadStatus();
  const browser = await chromium.launch({ headless: false, slowMo: 250 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  const toRun = targetSite
    ? [[targetSite, SITES[targetSite]] as [string, typeof SITES[string]]]
    : Object.entries(SITES);

  console.log(`\n🇻🇳 TSE Vending — Vietnamese Platform Submitter`);
  console.log(`   ${toRun.length} platform(s) | Email: ${EMAIL}`);
  console.log(`   📧 Sau khi chạy: check Gmail click verify link từ Viblo\n`);

  for (const [key, site] of toRun) {
    if (!site) { console.log(`❌ Unknown: ${key}`); continue; }
    if (status[key]?.submitted) {
      console.log(`⏭  ${site.name} — đã submit ${status[key].date}`);
      continue;
    }

    console.log(`\n${"─".repeat(50)}`);
    console.log(`📌 ${site.name} (DA ${site.da})`);

    try {
      const url = await site.fn(page);
      status[key] = { submitted: true, date: new Date().toISOString().slice(0, 10), url };
      saveStatus(status);
      console.log(`✅ ${site.name} — done`);
    } catch (err) {
      console.log(`❌ ${site.name} — error: ${err}`);
      status[key] = { submitted: false, notes: String(err), date: new Date().toISOString().slice(0, 10) };
      saveStatus(status);
    }

    await page.waitForTimeout(2000);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Done. Check nguyendotung@gmail.com để verify:`);
  console.log(`   • Viblo.asia → click link xác nhận → bài được đăng`);
  console.log(`   • Muare/Enbac → click xác nhận nếu có`);

  await browser.close();
}

main().catch(console.error);
