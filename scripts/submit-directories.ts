/**
 * Auto-submit TSE Vending to Vietnamese & international directories.
 * Uses Playwright — opens browser so user can solve CAPTCHA manually.
 *
 * Install Playwright first:
 *   npx playwright install chromium
 *
 * Usage: npm run submit:directories
 * Usage (one site): npm run submit:directories -- --site=muare
 */
import { chromium, Page } from "playwright";
import nap from "./backlink-profiles/nap.json";

const NAP = nap;

// Status tracker
const STATUS_FILE = `${__dirname}/backlink-profiles/submission-status.json`;
import fs from "fs";

function loadStatus(): Record<string, { submitted: boolean; date?: string; url?: string; notes?: string }> {
  if (fs.existsSync(STATUS_FILE)) return JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
  return {};
}
function saveStatus(status: ReturnType<typeof loadStatus>) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2), "utf8");
}

async function pause(msg: string) {
  console.log(`\n⏸  ${msg}`);
  console.log("   → Nhấn ENTER khi xong...");
  await new Promise((r) => process.stdin.once("data", r));
}

// ─────────────────────────────────────────────
// Directory submission handlers
// ─────────────────────────────────────────────

async function submitMuare(page: Page) {
  // muare.vn — đăng rao vặt máy bán hàng tự động
  await page.goto("https://muare.vn/dang-tin");
  await pause("Đăng nhập muare.vn nếu chưa có tài khoản, sau đó nhấn ENTER");

  // Fill title
  await page.fill('input[name="title"], #title, [placeholder*="tiêu đề"]',
    "Máy bán hàng tự động & Tủ locker thông minh — TSE Vending");

  // Fill description
  const desc = `${NAP.description_long_vi}\n\nWebsite: ${NAP.website}\nHotline: ${NAP.phone}`;
  await page.fill('textarea[name="description"], textarea[name="content"], #description', desc);

  // Fill price (optional)
  try { await page.fill('input[name="price"]', "0"); } catch {}

  // Phone
  try { await page.fill('input[name="phone"], input[name="contact_phone"]', NAP.phone); } catch {}

  await pause("Kiểm tra form, chọn danh mục phù hợp, giải CAPTCHA nếu có, rồi bấm ĐĂNG TIN. Nhấn ENTER sau khi đăng xong.");
  return page.url();
}

async function submitEnbac(page: Page) {
  await page.goto("https://enbac.com/dang-tin");
  await pause("Đăng nhập enbac.com nếu cần, nhấn ENTER");

  try {
    await page.fill('input[name="title"]', "Máy bán hàng tự động, tủ locker thông minh — TSE Vending TPHCM");
    await page.fill('textarea[name="content"], textarea[name="description"]',
      `${NAP.description_long_vi}\n\nWebsite: ${NAP.website} | Hotline: ${NAP.phone}`);
    await page.fill('input[name="phone"]', NAP.phone);
  } catch {}

  await pause("Kiểm tra, giải CAPTCHA, đăng tin. Nhấn ENTER sau khi xong.");
  return page.url();
}

async function submitTrangVang(page: Page) {
  await page.goto("https://trangvangvietnam.com/dang-ky");
  await pause("Điền form đăng ký tại trangvangvietnam.com. Dùng thông tin từ company-info.md. Nhấn ENTER sau khi submit.");
  return page.url();
}

async function submitYellowPagesVN(page: Page) {
  await page.goto("https://www.yellowpages.vn/addcompany");
  await pause("Điền form đăng ký tại yellowpages.vn. Nhấn ENTER sau khi submit.");
  return page.url();
}

async function submitYPVN(page: Page) {
  await page.goto("https://yp.vn/dang-ky-doanh-nghiep");
  await pause("Điền form đăng ký tại yp.vn. Nhấn ENTER sau khi xong.");
  return page.url();
}

async function submitVatgia(page: Page) {
  // Vatgia cho phép đăng sản phẩm trong category máy bán hàng tự động
  await page.goto("https://vatgia.com/raovat/them");
  await pause("Đăng nhập vatgia.com, điền thông tin sản phẩm. Nhấn ENTER sau khi xong.");
  return page.url();
}

async function submitDiachi(page: Page) {
  await page.goto("https://diachidoanhnghiep.com/dang-ky");
  await pause("Điền form tại diachidoanhnghiep.com. Nhấn ENTER sau khi xong.");
  return page.url();
}

async function submitTimviec(page: Page) {
  await page.goto("https://timviec365.vn/nha-tuyen-dung/tao-tai-khoan");
  await pause("Tạo tài khoản nhà tuyển dụng timviec365.vn — nhớ điền website tsevending.com. Nhấn ENTER sau khi xong.");
  return page.url();
}

async function submitCrunchbase(page: Page) {
  await page.goto("https://www.crunchbase.com/add-new/organization");
  await pause(`Đăng nhập Crunchbase (dùng Google: ${NAP.email}). Điền:\n  Name: TSE Vending\n  Website: ${NAP.website}\n  Founded: ${NAP.founded}\n  Country: Vietnam\n  Category: Hardware, IoT\nNhấn ENTER sau khi xong.`);
  return page.url();
}

async function submitLinkedIn(page: Page) {
  await page.goto("https://www.linkedin.com/company/setup/new/");
  await pause(`Tạo LinkedIn Company Page:\n  Name: TSE Vending\n  Website: ${NAP.website}\n  Industry: Technology\n  Founded: ${NAP.founded}\nNhấn ENTER sau khi tạo xong.`);
  return page.url();
}

async function submitGoogleSites(page: Page) {
  await page.goto("https://sites.google.com/new");
  await pause(`Tạo Google Sites:\n  Title: TSE Vending - Máy bán hàng tự động & Tủ locker thông minh\n  Thêm link: ${NAP.website}\n  Publish public\nNhấn ENTER sau khi publish.`);
  return page.url();
}

// ─────────────────────────────────────────────
// Site registry
// ─────────────────────────────────────────────

const DIRECTORIES: Record<string, { name: string; fn: (p: Page) => Promise<string> }> = {
  muare:       { name: "muare.vn",            fn: submitMuare },
  enbac:       { name: "enbac.com",            fn: submitEnbac },
  trangvang:   { name: "trangvangvietnam.com", fn: submitTrangVang },
  yellowpages: { name: "yellowpages.vn",       fn: submitYellowPagesVN },
  ypvn:        { name: "yp.vn",               fn: submitYPVN },
  vatgia:      { name: "vatgia.com",           fn: submitVatgia },
  diachi:      { name: "diachidoanhnghiep.com",fn: submitDiachi },
  timviec:     { name: "timviec365.vn",        fn: submitTimviec },
  crunchbase:  { name: "crunchbase.com",       fn: submitCrunchbase },
  linkedin:    { name: "linkedin.com",         fn: submitLinkedIn },
  googlesites: { name: "sites.google.com",     fn: submitGoogleSites },
};

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────

async function main() {
  const arg = process.argv.find((a) => a.startsWith("--site="));
  const targetSite = arg ? arg.split("=")[1] : null;

  const status = loadStatus();
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  const toRun = targetSite
    ? [[targetSite, DIRECTORIES[targetSite]] as [string, typeof DIRECTORIES[string]]]
    : Object.entries(DIRECTORIES);

  console.log(`\n🚀 TSE Vending — Directory Submitter`);
  console.log(`   Sẽ mở từng trang, bạn điền thêm thông tin và giải CAPTCHA\n`);

  for (const [key, dir] of toRun) {
    if (!dir) { console.log(`❌ Unknown site: ${key}`); continue; }
    if (status[key]?.submitted) {
      console.log(`⏭  ${dir.name} — đã submit ${status[key].date}, bỏ qua`);
      continue;
    }

    console.log(`\n${"─".repeat(50)}\n📌 ${dir.name}`);

    try {
      const resultUrl = await dir.fn(page);
      status[key] = { submitted: true, date: new Date().toISOString().slice(0, 10), url: resultUrl };
      saveStatus(status);
      console.log(`✅ ${dir.name} — done`);
    } catch (err) {
      console.log(`❌ ${dir.name} — lỗi: ${err}`);
      status[key] = { submitted: false, notes: String(err) };
      saveStatus(status);
    }
  }

  await browser.close();

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Hoàn tất. Status lưu tại: scripts/backlink-profiles/submission-status.json`);

  const done = Object.values(status).filter((s) => s.submitted).length;
  console.log(`${done}/${Object.keys(DIRECTORIES).length} directories đã submit`);
}

main().catch(console.error);
