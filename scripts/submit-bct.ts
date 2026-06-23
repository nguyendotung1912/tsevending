/**
 * Tự động đăng ký website với Bộ Công Thương (BCT)
 * Portal: https://dichvucong.moit.gov.vn
 * Loại: Thông báo website bán hàng (DocId=115)
 *
 * Usage: npx tsx scripts/submit-bct.ts
 */
import { chromium, Page } from "playwright";
import fs from "fs";

const EMAIL    = "nguyendotung@gmail.com";
const PASSWORD = "TSEVending@2024!";
const FULLNAME = "Nguyễn Đỗ Tùng";
const PHONE    = "0837375757";
const WEBSITE  = "https://tsevending.com";
const COMPANY  = "Công ty Cổ phần Công nghệ TSE";
const MST      = ""; // ← Điền Mã số thuế công ty vào đây

// Đọc CAPTCHA text từ element img bằng cách chụp và đọc alt/title
async function readCaptcha(page: Page): Promise<string> {
  // Thử đọc alt text hoặc title của img CAPTCHA
  const captchaImg = page.locator('img[src*="captcha"], img[src*="Captcha"], img[id*="captcha"], img[id*="Captcha"]').first();
  if (await captchaImg.count() > 0) {
    const alt = await captchaImg.getAttribute("alt") ?? "";
    const title = await captchaImg.getAttribute("title") ?? "";
    if (alt.trim()) return alt.trim();
    if (title.trim()) return title.trim();

    // Chụp ảnh CAPTCHA và lưu để đọc thủ công
    await captchaImg.screenshot({ path: "scripts/backlink-profiles/bct-captcha.png" });
    console.log("  📸 CAPTCHA ảnh: scripts/backlink-profiles/bct-captcha.png");
  }
  return "";
}

async function main() {
  console.log("\n🏛️  BCT — Đăng ký website Bộ Công Thương");
  console.log("   Portal: dichvucong.moit.gov.vn\n");

  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  // ── Bước 1: Đăng ký tài khoản ─────────────────────────────────────────
  console.log("── Bước 1: Đăng ký tài khoản ──");
  await page.goto("https://dichvucong.moit.gov.vn/Register.aspx", { waitUntil: "networkidle", timeout: 40000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "scripts/backlink-profiles/bct-register.png" });

  try {
    // Bước quan trọng: chọn "Loại hình" trước — mới hiện các trường khác
    const loaiHinhSelect = page.locator('select[id*="LoaiHinh"], select[id*="loaihinh"], select').first();
    if (await loaiHinhSelect.count() > 0) {
      // Chọn "Doanh nghiệp" hoặc option đầu tiên không phải placeholder
      const options = await loaiHinhSelect.locator("option").all();
      for (const opt of options) {
        const val = await opt.getAttribute("value") ?? "";
        const txt = (await opt.textContent() ?? "").toLowerCase();
        if (val && val !== "" && (txt.includes("doanh") || txt.includes("1") || txt.includes("công ty"))) {
          await loaiHinhSelect.selectOption(val);
          console.log(`  ✓ Loại hình: ${await opt.textContent()}`);
          await page.waitForTimeout(2000); // Chờ form load thêm fields
          break;
        }
      }
      // Nếu không tìm được, chọn option thứ 2 (thứ 1 thường là "Chọn...")
      const allOpts = await loaiHinhSelect.locator("option").all();
      if (allOpts.length >= 2) {
        const secondVal = await allOpts[1].getAttribute("value") ?? "";
        if (secondVal) {
          await loaiHinhSelect.selectOption(secondVal);
          const txt = await allOpts[1].textContent();
          console.log(`  ✓ Loại hình (option 2): ${txt}`);
          await page.waitForTimeout(2000);
        }
      }
    }

    await page.screenshot({ path: "scripts/backlink-profiles/bct-register-2.png" });
    console.log("  📸 bct-register-2.png (sau khi chọn loại hình)");

    // Điền MST nếu có
    if (MST) {
      const mstField = page.locator('input[id*="MST"], input[id*="MaSo"], input[id*="TaxCode"], input[name*="MST"]').first();
      if (await mstField.count() > 0) { await mstField.fill(MST); console.log("  ✓ MST"); }
    }

    // Điền tên
    const nameField = page.locator('input[id*="HoTen"], input[id*="Name"], input[id*="TenNguoi"]').first();
    if (await nameField.count() > 0) { await nameField.fill(FULLNAME); console.log("  ✓ tên"); }

    // Điền email
    const emailField = page.locator('input[id*="Email"], input[type="email"]').first();
    if (await emailField.count() > 0) { await emailField.fill(EMAIL); console.log("  ✓ email"); }

    // Điền số điện thoại
    const phoneField = page.locator('input[id*="Phone"], input[id*="DienThoai"], input[id*="Mobile"]').first();
    if (await phoneField.count() > 0) { await phoneField.fill(PHONE); console.log("  ✓ phone"); }

    // Điền mật khẩu
    const passFields = page.locator('input[type="password"]');
    const pc = await passFields.count();
    if (pc >= 1) { await passFields.nth(0).fill(PASSWORD); console.log("  ✓ password"); }
    if (pc >= 2) { await passFields.nth(1).fill(PASSWORD); console.log("  ✓ confirm password"); }

    await page.waitForTimeout(2000);
    await page.screenshot({ path: "scripts/backlink-profiles/bct-register-filled.png" });
    console.log("  📸 bct-register-filled.png");

    console.log("\n  ⏸  DỪNG — Cần thao tác thủ công:");
    console.log("     1. Kiểm tra các trường đã điền trong browser");
    console.log("     2. Bổ sung thông tin còn thiếu nếu có");
    console.log("     3. Click nút Đăng ký → hoàn thành");
    console.log("     4. Sau khi đăng ký xong, nhấn Enter ở đây để tiếp tục login\n");
    await new Promise<void>((resolve) => {
      process.stdin.once("data", () => resolve());
    });
  } catch (e) {
    console.log(`  ⚠ Lỗi đăng ký: ${e}`);
  }

  // ── Bước 2: Đăng nhập ──────────────────────────────────────────────────
  console.log("\n── Bước 2: Đăng nhập ──");
  await page.goto("https://dichvucong.moit.gov.vn/Login.aspx", { waitUntil: "networkidle", timeout: 40000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "scripts/backlink-profiles/bct-login.png" });

  try {
    // Điền tên đăng nhập (email hoặc MST)
    const loginField = page.locator('input[id*="UserName"], input[id*="TenDN"], input[name*="UserName"]').first();
    if (await loginField.count() > 0) { await loginField.fill(EMAIL); console.log("  ✓ username"); }

    // Điền mật khẩu
    const passField = page.locator('input[type="password"]').first();
    if (await passField.count() > 0) { await passField.fill(PASSWORD); console.log("  ✓ password"); }

    // Đọc CAPTCHA
    const captchaText = await readCaptcha(page);
    const captchaInput = page.locator('input[id*="captcha"], input[id*="Captcha"], input[name*="captcha"]').first();

    if (await captchaInput.count() > 0) {
      if (captchaText) {
        await captchaInput.fill(captchaText);
        console.log(`  ✓ CAPTCHA tự điền: "${captchaText}"`);
      } else {
        console.log("\n  ⏸  CAPTCHA không đọc được tự động.");
        console.log("     Nhìn vào browser và điền CAPTCHA + click Đăng nhập,");
        console.log("     sau đó nhấn Enter ở đây để tiếp tục.\n");
        await new Promise<void>((resolve) => {
          process.stdin.once("data", () => resolve());
        });
      }
    }

    await page.waitForTimeout(1500);
    const loginBtn = page.locator('input[value*="Đăng nhập"], button:has-text("Đăng nhập"), input[type="submit"]').first();
    if (await loginBtn.count() > 0 && captchaText) {
      await loginBtn.click();
      await page.waitForTimeout(4000);
    }

    console.log(`  → URL sau login: ${page.url()}`);
    await page.screenshot({ path: "scripts/backlink-profiles/bct-after-login.png" });
  } catch (e) {
    console.log(`  ⚠ Lỗi login: ${e}`);
  }

  // ── Bước 3: Nộp hồ sơ ─────────────────────────────────────────────────
  console.log("\n── Bước 3: Mở form nộp hồ sơ ──");
  await page.goto("https://dichvucong.moit.gov.vn/TTHCOnlineDetail.aspx?DocId=115", {
    waitUntil: "networkidle", timeout: 40000,
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "scripts/backlink-profiles/bct-form.png" });
  console.log("  📸 bct-form.png");

  // Tìm nút "Nộp hồ sơ trực tuyến"
  const applyBtn = page.locator('a:has-text("Nộp hồ sơ"), a:has-text("Thực hiện"), a:has-text("Nộp trực tuyến"), .btn-primary').first();
  if (await applyBtn.count() > 0) {
    await applyBtn.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: "scripts/backlink-profiles/bct-form2.png" });
    console.log(`  → Form URL: ${page.url()}`);
  }

  // Điền thông tin website
  const websiteField = page.locator('input[id*="Website"], input[id*="DiaChi"], input[name*="website"]').first();
  if (await websiteField.count() > 0) { await websiteField.fill(WEBSITE); console.log("  ✓ website URL"); }

  const compField = page.locator('input[id*="TenCT"], input[id*="TenDN"], input[id*="Company"]').first();
  if (await compField.count() > 0) { await compField.fill(COMPANY); console.log("  ✓ tên công ty"); }

  await page.waitForTimeout(1500);
  await page.screenshot({ path: "scripts/backlink-profiles/bct-form-filled.png" });
  console.log("  📸 bct-form-filled.png");

  console.log("\n════════════════════════════════════════");
  console.log("  ⏸  Browser đang mở tại form nộp hồ sơ.");
  console.log("  Hoàn thành thủ công:");
  console.log("    1. Điền/kiểm tra thông tin còn thiếu");
  console.log("    2. Upload GPKD (file scan)");
  console.log("    3. Điền CAPTCHA nếu có");
  console.log("    4. Click Nộp hồ sơ");
  console.log("    5. Nhấn Ctrl+C khi xong");
  console.log("════════════════════════════════════════\n");

  await new Promise(() => {}); // Giữ browser mở vô thời hạn
}

main().catch(console.error);
