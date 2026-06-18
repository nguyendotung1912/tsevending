/**
 * Auto-submit press release to Brands Vietnam self-service form
 * https://www.brandsvietnam.com/box/press-release/
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const EMAIL = "nguyendotung@gmail.com";
const PASSWORD = "TSEVending@2024!";
const COMPANY = "TSE Vending";
const WEBSITE = "https://tsevending.com";
const PHONE = "0837375757";

function readPR() {
  const raw = fs.readFileSync(
    path.join(__dirname, "backlink-profiles/press-releases/brandsvietnam.md"),
    "utf8"
  );
  const lines = raw.split("\n");
  // Find title — first bold line after ---
  let title = "";
  let bodyStart = 0;
  let passedSeparator = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "---") { passedSeparator = true; continue; }
    if (!passedSeparator) continue;
    const line = lines[i].trim();
    if (!title && line.startsWith("**") && !line.startsWith("**URL") && !line.startsWith("**DA") && !line.startsWith("**Audience") && !line.startsWith("**Ghi")) {
      title = line.replace(/\*\*/g, "").trim();
      bodyStart = i + 1;
      break;
    }
  }
  const body = lines.slice(bodyStart).join("\n")
    .replace(/\*\*/g, "")
    .replace(/^\*\s*/gm, "• ")
    .replace(/^#+\s*/gm, "")
    .trim();
  return { title, body };
}

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  console.log("🚀 Brands Vietnam — Auto Submit");

  // Step 1: Register / Login
  console.log("  → Navigating to Brands Vietnam registration...");
  await page.goto("https://www.brandsvietnam.com/dang-ky", { waitUntil: "domcontentloaded", timeout: 30000 });

  try {
    // Try to fill registration form
    await page.fill('input[name="email"], input[type="email"]', EMAIL).catch(() => {});
    await page.fill('input[name="password"], input[type="password"]', PASSWORD).catch(() => {});
    await page.fill('input[name="name"], input[name="fullname"], input[name="username"]', "Nguyen Do Tung").catch(() => {});

    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("  ✓ Registration submitted");
    }
  } catch (e) {
    console.log(`  ⚠ Registration: ${e}`);
  }

  // Step 2: Navigate to PR submission form
  console.log("  → Going to press release form...");
  await page.goto("https://www.brandsvietnam.com/box/press-release/gui-thong-cao-bao-chi", {
    waitUntil: "domcontentloaded", timeout: 30000
  }).catch(() => {});

  // Try alternate URL
  if (!page.url().includes("gui-thong-cao")) {
    await page.goto("https://www.brandsvietnam.com/box/press-release/", {
      waitUntil: "domcontentloaded", timeout: 30000
    }).catch(() => {});
  }

  console.log(`  → Current URL: ${page.url()}`);

  const pr = readPR();
  console.log(`  → Title: ${pr.title.slice(0, 70)}...`);

  await page.waitForTimeout(2000);

  // Fill form fields
  const titleSelectors = ['input[name="title"]', '#title', 'input[placeholder*="tiêu đề" i]', 'input[placeholder*="title" i]'];
  for (const sel of titleSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.count() > 0) {
        await el.fill(pr.title);
        console.log("  ✓ Title filled");
        break;
      }
    } catch {}
  }

  const bodySelectors = ['textarea[name="content"]', 'textarea[name="body"]', '.ql-editor', '[contenteditable="true"]', 'textarea'];
  for (const sel of bodySelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.count() > 0) {
        await el.fill(pr.body.slice(0, 5000)); // limit to avoid overflow
        console.log("  ✓ Content filled");
        break;
      }
    } catch {}
  }

  // Company name
  const companyEl = page.locator('input[name="company"], input[name="company_name"]').first();
  if (await companyEl.count() > 0) await companyEl.fill(COMPANY).catch(() => {});

  // Website
  const websiteEl = page.locator('input[name="website"], input[name="url"]').first();
  if (await websiteEl.count() > 0) await websiteEl.fill(WEBSITE).catch(() => {});

  // Phone
  const phoneEl = page.locator('input[name="phone"]').first();
  if (await phoneEl.count() > 0) await phoneEl.fill(PHONE).catch(() => {});

  console.log("  ⏸ Pausing 8 seconds to review...");
  await page.waitForTimeout(8000);

  // Submit
  const submitBtn = page.locator('button[type="submit"], input[type="submit"], button:has-text("Gửi"), button:has-text("Đăng")').first();
  if (await submitBtn.count() > 0) {
    await submitBtn.click();
    console.log("  ✓ Submitted");
    await page.waitForTimeout(4000);
  }

  console.log(`  → Final URL: ${page.url()}`);
  console.log("✅ Done. Check browser for result.");

  // Keep browser open 30s for user to see
  await page.waitForTimeout(30000);
  await browser.close();
}

main().catch(console.error);
