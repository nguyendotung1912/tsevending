/**
 * Auto-submit TSE Vending to Vietnamese tech/automation forums
 * Interactive mode: browser opens, user solves CAPTCHA, script auto-continues on URL change
 *
 * Usage: npx tsx scripts/submit-forums.ts
 * Usage (one): npx tsx scripts/submit-forums.ts --site=tinhte
 * Usage (re-run): npx tsx scripts/submit-forums.ts --force
 */
import { chromium, Page } from "playwright";
import fs from "fs";
import path from "path";

const EMAIL    = "nguyendotung@gmail.com";
const PASSWORD = "TSEVending@2024!";
const USERNAME = "nguyendotung1912";
const FULLNAME = "Nguyễn Đỗ Tùng";

const STATUS_FILE = path.join(__dirname, "backlink-profiles/forum-submission-status.json");

type Status = Record<string, { submitted: boolean; date?: string; url?: string; notes?: string }>;
function loadStatus(): Status {
  if (fs.existsSync(STATUS_FILE)) return JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
  return {};
}
function saveStatus(s: Status) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(s, null, 2));
}

// Chờ URL thay đổi (user click submit/đăng ký → URL đổi → tiếp tục)
async function waitForUrlChange(page: Page, currentUrl: string, timeoutMs = 120000): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await page.waitForTimeout(1000);
    if (page.url() !== currentUrl) return page.url();
  }
  return page.url();
}

// Fill field dùng JS để bypass hidden/disabled
async function jsFill(page: Page, selector: string, value: string): Promise<void> {
  await page.evaluate(({ sel, val }) => {
    const el = document.querySelector(sel) as HTMLInputElement | HTMLTextAreaElement | null;
    if (!el) return;
    const proto = el instanceof HTMLTextAreaElement
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) { setter.call(el, val); }
    else { el.value = val; }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, { sel: selector, val: value }).catch(() => {});
}

// Fill tất cả password inputs
async function fillPasswords(page: Page) {
  const count = await page.locator('input[type="password"]').count();
  for (let i = 0; i < count; i++) {
    await page.locator('input[type="password"]').nth(i).fill(PASSWORD, { force: true }).catch(() => {});
  }
}

// ── Articles ────────────────────────────────────────────────────────────────
const LOCKER_TITLE = "Tủ locker thông minh IoT tại Việt Nam 2026: Công nghệ, ứng dụng và nhà cung cấp uy tín";
const LOCKER_BODY = `Tủ locker thông minh (smart locker) đang trở thành hạ tầng thiết yếu tại các tòa nhà, khu công nghiệp và bệnh viện Việt Nam.

Công nghệ bên trong:
- Xác thực đa phương thức: mã PIN, QR code, thẻ RFID, vân tay, nhận diện khuôn mặt
- Kết nối IoT: Wi-Fi/4G, đồng bộ cloud theo thời gian thực
- Dashboard quản lý: lịch sử mở/đóng, phân quyền, cảnh báo bất thường
- Tích hợp API: BMS, phần mềm nhân sự, logistics (GHN, GHTK, Shopee)

Ứng dụng thực tế:
- Chung cư cao tầng: nhận hộ bưu phẩm 24/7 khi cư dân vắng mặt
- Khu công nghiệp: quản lý tủ đồ cá nhân + tích hợp thẻ chấm công RFID
- Bệnh viện: lưu trữ đồ bệnh nhân, bề mặt chống khuẩn
- Trường học & Gym: gửi đồ không cần chìa khóa

TSE Vending (https://tsevending.com/tu-locker-thong-minh) là đơn vị tiên phong sản xuất tủ locker thông minh IoT tại Việt Nam từ năm 2014. Hơn 500 dự án toàn quốc. Hotline: 0837 375 757`;

const VENDING_TITLE = "Máy bán hàng tự động tại Việt Nam 2026: Đầu tư bao nhiêu, đặt ở đâu lãi nhất?";
const VENDING_BODY = `Thị trường máy bán hàng tự động (vending machine) Việt Nam tăng trưởng mạnh nhờ tiêu dùng 24/7 và chi phí lao động tăng cao.

Nguyên lý hoạt động:
- Cơ cấu xuất hàng: vít xoắn hoặc băng chuyền điều khiển motor
- Thanh toán: tiền mặt, thẻ ngân hàng NFC, QR VNPay/MoMo/ZaloPay
- IoT: 4G/Wi-Fi, cảm biến kẹt hàng, camera giám sát
- CMS từ xa: tồn kho, doanh thu, lỗi kỹ thuật theo thời gian thực

Vị trí đặt máy hiệu quả:
- Văn phòng 200+ người: 5-15 triệu/tháng
- Khu công nghiệp ca đêm: 8-20 triệu/tháng
- Bệnh viện 24/7: 6-12 triệu/tháng
- Trường học/KTX: 3-8 triệu/tháng

Mô hình: tự đầu tư, chia sẻ doanh thu (15-30%), hoặc thuê theo tháng.

Chi tiết tại TSE Vending: https://tsevending.com/may-ban-hang-tu-dong | Hotline: 0837 375 757`;

// ── XenForo helper ──────────────────────────────────────────────────────────
async function xenforoFlow(page: Page, opts: {
  label: string;
  baseUrl: string;
  forumPostPath: string;
  title: string;
  body: string;
}) {
  const { label, baseUrl, forumPostPath, title, body } = opts;

  // ── Register ──
  console.log(`  [1/3] Đăng ký ${label}...`);
  await page.goto(`${baseUrl}/register`, { waitUntil: "domcontentloaded", timeout: 40000 });
  await page.waitForTimeout(2000);

  await jsFill(page, 'input[name="username"]', USERNAME);
  await jsFill(page, 'input[name="email"]', EMAIL);
  await fillPasswords(page);
  await page.locator('input[name*="agree"], input[name*="terms"]').first().check({ force: true }).catch(() => {});
  await page.waitForTimeout(500);

  const regUrl = page.url();
  const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"], .h-captcha, [data-sitekey]').count() > 0;
  if (hasCaptcha) {
    console.log(`  ⏸  CAPTCHA đang hiển thị — giải trong browser rồi click Đăng ký`);
    console.log(`     Script tự động tiếp tục khi URL thay đổi (tối đa 3 phút)...`);
    await waitForUrlChange(page, regUrl, 180000);
  } else {
    await page.locator('button[type="submit"], input[type="submit"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(4000);
  }
  console.log(`  ✓ register → ${page.url()}`);

  // ── Login ──
  console.log(`  [2/3] Đăng nhập ${label}...`);
  await page.goto(`${baseUrl}/login`, { waitUntil: "domcontentloaded", timeout: 40000 });
  await page.waitForTimeout(2000);

  await jsFill(page, 'input[name="login"]', EMAIL);
  await jsFill(page, 'input[name="password"]', PASSWORD);
  await page.locator('input[name="login"]').fill(EMAIL, { force: true }).catch(() => {});
  await page.locator('input[type="password"]').first().fill(PASSWORD, { force: true }).catch(() => {});

  const loginUrl = page.url();
  const hasLoginCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
  if (hasLoginCaptcha) {
    console.log(`  ⏸  CAPTCHA login — giải trong browser rồi click Đăng nhập`);
    await waitForUrlChange(page, loginUrl, 180000);
  } else {
    await page.locator('button[type="submit"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(5000);
  }

  // Kiểm tra cần verify email không
  const isLoggedIn = await page.locator('.username, .p-navgroup-link--user, [data-username], .avatar').count() > 0;
  if (!isLoggedIn) {
    console.log(`  ⚠ Chưa login — có thể cần verify email`);
    console.log(`     Kiểm tra Gmail (${EMAIL}), click link verify, sau đó quay lại login`);
    console.log(`     Script chờ login thành công (tối đa 5 phút)...`);
    // Chờ user verify email và login thủ công
    await page.waitForSelector('.username, .p-navgroup-link--user, [data-username], .avatar', { timeout: 300000 }).catch(() => {});
  }
  console.log(`  ✓ login → ${page.url()}`);

  // ── Post ──
  console.log(`  [3/3] Đăng bài ${label}...`);
  await page.goto(`${baseUrl}${forumPostPath}`, { waitUntil: "domcontentloaded", timeout: 40000 });
  await page.waitForTimeout(3000);

  await jsFill(page, 'input[name="title"]', title);
  await page.locator('input[name="title"]').fill(title, { force: true }).catch(() => {});
  await page.waitForTimeout(800);

  // XenForo editor
  const froalaEditor = page.locator('.fr-element').first();
  const bbEditor = page.locator('[contenteditable="true"].bbWrapper').first();
  const quillEditor = page.locator('.ql-editor').first();
  const contentEditable = page.locator('[contenteditable="true"]').first();

  let typed = false;
  for (const ed of [froalaEditor, bbEditor, quillEditor, contentEditable]) {
    if (await ed.count() > 0) {
      await ed.click({ force: true });
      await page.waitForTimeout(500);
      await page.keyboard.press("Control+a");
      await page.keyboard.type(body.slice(0, 5000));
      typed = true;
      break;
    }
  }
  if (!typed) {
    await jsFill(page, 'textarea[name="message"]', body.slice(0, 5000));
  }

  await page.waitForTimeout(1500);
  // Không tự click submit — để user kiểm tra rồi click
  const postUrl = page.url();
  console.log(`  ⏸  Bài viết đã điền — kiểm tra trong browser, rồi click Đăng bài`);
  console.log(`     Script tự động tiếp tục khi URL thay đổi (tối đa 3 phút)...`);
  await waitForUrlChange(page, postUrl, 180000);
  console.log(`  ✓ posted → ${page.url()}`);
  return page.url();
}

// ── 1. TINHTE ───────────────────────────────────────────────────────────────
async function submitTinhte(page: Page) {
  return xenforoFlow(page, {
    label: "tinhte",
    baseUrl: "https://tinhte.vn",
    forumPostPath: "/forums/cong-nghe.35/post-thread",
    title: LOCKER_TITLE,
    body: LOCKER_BODY,
  });
}

// ── 2. VN-Z ─────────────────────────────────────────────────────────────────
async function submitVnz(page: Page) {
  return xenforoFlow(page, {
    label: "vnz",
    baseUrl: "https://vn-z.vn",
    forumPostPath: "/forums/kinh-doanh.29/post-thread",
    title: VENDING_TITLE,
    body: VENDING_BODY,
  });
}

// ── 3. 6GIAY ────────────────────────────────────────────────────────────────
async function submit6giay(page: Page) {
  return xenforoFlow(page, {
    label: "6giay",
    baseUrl: "https://6giay.vn",
    forumPostPath: "/threads/create",
    title: LOCKER_TITLE,
    body: LOCKER_BODY,
  });
}

// ── 4. PLCVIETNAM ────────────────────────────────────────────────────────────
async function submitPlc(page: Page) {
  const label = "plcvietnam";
  console.log(`  [1/3] Đăng ký ${label}...`);
  await page.goto("https://plcvietnam.com.vn/register", { waitUntil: "domcontentloaded", timeout: 40000 });
  await page.waitForTimeout(2000);

  await jsFill(page, 'input[name="username"]', USERNAME);
  await jsFill(page, 'input[name="email"]', EMAIL);
  await fillPasswords(page);

  const regUrl = page.url();
  const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
  if (hasCaptcha) {
    console.log(`  ⏸  CAPTCHA — giải trong browser rồi click Đăng ký`);
    await waitForUrlChange(page, regUrl, 180000);
  } else {
    await page.locator('button[type="submit"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(5000);
  }

  console.log(`  [2/3] Đăng nhập ${label}...`);
  await page.goto("https://plcvietnam.com.vn/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  await jsFill(page, 'input[name="login"], input[name="email"]', EMAIL);
  await jsFill(page, 'input[type="password"]', PASSWORD);
  await page.locator('button[type="submit"]').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(5000);

  const isLoggedIn = await page.locator('.username, .user-info, [data-username]').count() > 0;
  if (!isLoggedIn) {
    console.log(`  ⚠ Chưa login — verify Gmail rồi login thủ công, chờ 5 phút...`);
    await page.waitForSelector('.username, .user-info, [data-username]', { timeout: 300000 }).catch(() => {});
  }

  console.log(`  [3/3] Đăng bài ${label}...`);
  await page.goto("https://plcvietnam.com.vn/threads/create", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);
  await jsFill(page, 'input[name="title"]', VENDING_TITLE);
  await page.locator('input[name="title"]').fill(VENDING_TITLE, { force: true }).catch(() => {});
  const editor = page.locator('[contenteditable="true"], textarea[name="message"]').first();
  if (await editor.count() > 0) {
    await editor.click({ force: true });
    await page.keyboard.press("Control+a");
    await page.keyboard.type(VENDING_BODY.slice(0, 5000));
  }
  await page.waitForTimeout(1500);
  const postUrl = page.url();
  console.log(`  ⏸  Kiểm tra bài trong browser rồi click Đăng bài`);
  await waitForUrlChange(page, postUrl, 180000);
  return page.url();
}

// ── 5. ARDUINO.VN (Drupal) ───────────────────────────────────────────────────
async function submitArduino(page: Page) {
  const label = "arduino";
  const ARDUINO_TITLE = "Tủ locker thông minh IoT dùng RFID + ESP32: Ứng dụng thực tế 2026";
  const ARDUINO_BODY = `Chia sẻ về hệ thống tủ locker thông minh IoT triển khai thực tế tại Việt Nam.

Kiến trúc hệ thống:
- Vi điều khiển: ESP32 (Wi-Fi + BLE)
- Xác thực: RFID RC522 + keypad 4x4 PIN
- Khóa điện: Solenoid lock 12V điều khiển qua relay
- Cloud: MQTT broker - Node.js - MySQL
- App: Flutter (iOS/Android) scan QR nhận hàng

Hệ thống đang được TSE Vending (https://tsevending.com/tu-locker-thong-minh) triển khai tại hàng trăm chung cư, khu công nghiệp và bệnh viện. Hotline: 0837 375 757`;

  console.log(`  [1/3] Đăng ký ${label}...`);
  await page.goto("https://arduino.vn/user/register", { waitUntil: "domcontentloaded", timeout: 40000 });
  await page.waitForTimeout(2000);

  await jsFill(page, 'input[name="name"]', USERNAME);
  await jsFill(page, 'input[name="mail"]', EMAIL);
  await jsFill(page, 'input[name="pass[pass1]"]', PASSWORD);
  await jsFill(page, 'input[name="pass[pass2]"]', PASSWORD);

  const regUrl = page.url();
  const hasCaptcha = await page.locator('.g-recaptcha, iframe[src*="recaptcha"]').count() > 0;
  if (hasCaptcha) {
    console.log(`  ⏸  CAPTCHA — giải trong browser rồi click Tạo tài khoản`);
    await waitForUrlChange(page, regUrl, 180000);
  } else {
    await page.locator('input[type="submit"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(5000);
  }

  console.log(`  [2/3] Đăng nhập ${label}...`);
  await page.goto("https://arduino.vn/user/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  await jsFill(page, 'input[name="name"]', USERNAME);
  await jsFill(page, 'input[name="pass"]', PASSWORD);
  const loginUrl = page.url();
  await page.locator('input[type="submit"]').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(5000);

  const isLoggedIn = !page.url().includes("user/login");
  if (!isLoggedIn) {
    console.log(`  ⚠ Chưa login — verify Gmail rồi login thủ công (chờ 5 phút)...`);
    await waitForUrlChange(page, loginUrl, 300000);
  }

  console.log(`  [3/3] Đăng bài ${label}...`);
  await page.goto("https://arduino.vn/node/add/forum", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);

  await jsFill(page, 'input[name="title"]', ARDUINO_TITLE);
  const ta = page.locator('textarea:not(.g-recaptcha-response)').first();
  if (await ta.count() > 0) {
    await ta.fill(ARDUINO_BODY, { force: true }).catch(() => {});
  }

  await page.waitForTimeout(1500);
  const postUrl = page.url();
  console.log(`  ⏸  Kiểm tra bài trong browser rồi click Lưu`);
  await waitForUrlChange(page, postUrl, 180000);
  return page.url();
}

// ── 6. CHOCONGNGHIEP365 ──────────────────────────────────────────────────────
async function submitChoCongNghiep(page: Page) {
  return xenforoFlow(page, {
    label: "chocongnghiep365",
    baseUrl: "https://chocongnghiep365.com",
    forumPostPath: "/threads/create",
    title: VENDING_TITLE,
    body: VENDING_BODY,
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
const FORUMS: Record<string, { name: string; da: number; fn: (p: Page) => Promise<string> }> = {
  tinhte:        { name: "tinhte.vn",           da: 70, fn: submitTinhte },
  vnz:           { name: "vn-z.vn",             da: 55, fn: submitVnz },
  "6giay":       { name: "6giay.vn",            da: 55, fn: submit6giay },
  plcvietnam:    { name: "plcvietnam.com.vn",   da: 40, fn: submitPlc },
  arduino:       { name: "arduino.vn",           da: 35, fn: submitArduino },
  chocongnghiep: { name: "chocongnghiep365.com", da: 33, fn: submitChoCongNghiep },
};

async function main() {
  const args = process.argv.slice(2);
  const targetSite = args.find((a) => a.startsWith("--site="))?.split("=")[1] ?? null;
  const force = args.includes("--force");

  const status = loadStatus();
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  const toRun = targetSite
    ? [[targetSite, FORUMS[targetSite]] as [string, (typeof FORUMS)[string]]]
    : Object.entries(FORUMS);

  console.log(`\n📋 TSE Vending — Forum Submitter`);
  console.log(`   ${toRun.length} forum(s) | script tự chờ URL đổi sau mỗi bước`);
  console.log(`   Bạn chỉ cần: giải CAPTCHA → click nút → script tiếp tục\n`);

  for (const [key, forum] of toRun) {
    if (!forum) { console.log(`❌ Unknown site: ${key}`); continue; }
    if (!force && status[key]?.submitted) {
      console.log(`⏭  ${forum.name} — đã submit ${status[key].date}`);
      continue;
    }

    console.log(`\n${"─".repeat(50)}`);
    console.log(`📌 ${forum.name} (DA ${forum.da})`);

    try {
      const url = await forum.fn(page);
      status[key] = { submitted: true, date: new Date().toISOString().slice(0, 10), url };
      saveStatus(status);
      console.log(`✅ ${forum.name} — done`);
    } catch (err) {
      console.log(`❌ ${forum.name} — error: ${err}`);
      status[key] = { submitted: false, notes: String(err), date: new Date().toISOString().slice(0, 10) };
      saveStatus(status);
    }

    await page.waitForTimeout(2000);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Xong tất cả! Check Gmail verify email từ các forum.`);
  await page.waitForTimeout(10000);
  await browser.close();
}

main().catch(console.error);
