/**
 * Auto-submit press releases to free platforms.
 * PRLog: no account needed, just email verification after submit.
 * OpenPR: free account, then submit.
 *
 * Usage: npm run submit:pr
 * Usage (one platform): npm run submit:pr -- --site=prlog
 *
 * After running: check info@tsevending.com for verification links from PRLog.
 */
import { chromium, Browser, Page } from "playwright";
import fs from "fs";
import path from "path";

const PR_DIR = path.join(__dirname, "backlink-profiles/press-releases");
const STATUS_FILE = path.join(__dirname, "backlink-profiles/pr-submission-status.json");

const EMAIL = "nguyendotung@gmail.com";
const PHONE = "0837375757";
const WEBSITE = "https://tsevending.com";
const COMPANY = "TSE Vending";

type Status = Record<string, { submitted: boolean; date?: string; url?: string; notes?: string }>;

function loadStatus(): Status {
  if (fs.existsSync(STATUS_FILE)) return JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
  return {};
}
function saveStatus(s: Status) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(s, null, 2));
}

function readPR(name: string): { title: string; body: string } {
  const file = path.join(PR_DIR, `${name}.md`);
  const raw = fs.readFileSync(file, "utf8");

  // Extract title: first H1 or first bold line
  const lines = raw.split("\n").filter((l) => l.trim());
  let title = "";
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Skip meta-header lines (URL, DA, etc.)
    if (line.startsWith("**URL") || line.startsWith("**DA") || line.startsWith("**Audience") || line.startsWith("**Ghi") || line.startsWith("#") || line === "---" || line === "**FOR IMMEDIATE RELEASE**") continue;
    // First bold line or first H2 = title
    if (!title && (line.startsWith("**") || line.startsWith("##"))) {
      title = line.replace(/\*\*/g, "").replace(/^##\s*/, "").replace(/\*$/g, "").trim();
      bodyStart = i + 1;
      break;
    }
  }

  // Remaining content as body — strip markdown for plain text
  const bodyLines = lines.slice(bodyStart);
  const body = bodyLines
    .join("\n")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/---/g, "")
    .trim();

  return { title, body };
}

// ─────────────────────────────────────────────────────────
// PRLog.com — free, no account, just email verification
// ─────────────────────────────────────────────────────────
async function submitPRLog(page: Page) {
  console.log("  → Navigating to PRLog submission form...");
  await page.goto("https://www.prlog.org/login.html", { waitUntil: "domcontentloaded", timeout: 30000 });

  // Check if login page or direct form
  const isLogin = await page.locator('input[name="email"], input[type="email"]').count() > 0;

  if (isLogin) {
    // PRLog requires account. Go to register
    await page.goto("https://www.prlog.org/register.html", { waitUntil: "domcontentloaded", timeout: 30000 });
    console.log("  → PRLog registration page loaded");

    // Fill registration form
    try {
      await page.fill('input[name="email"], input[type="email"]', EMAIL);
      await page.fill('input[name="password"], input[type="password"]', "TSEVending@2024!");
      const nameField = page.locator('input[name="name"], input[name="first_name"]').first();
      if (await nameField.count() > 0) await nameField.fill("Nguyen Do Tung");
      console.log("  → Registration form filled");
    } catch (e) {
      console.log("  ⚠ Registration form fields not found, trying direct submission");
    }
  }

  // Navigate to press release submission
  await page.goto("https://www.prlog.org/post-press-release.html", { waitUntil: "domcontentloaded", timeout: 30000 });
  console.log("  → PR submission form loaded");

  const pr = readPR("prlog");
  console.log(`  → Title: ${pr.title.slice(0, 60)}...`);

  // Step 1: Fill title
  const titleField = page.locator('input[name="title"], #title, input[placeholder*="title" i]').first();
  if (await titleField.count() > 0) {
    await titleField.fill(pr.title);
    console.log("  ✓ Title filled");
  }

  // Step 2: Fill body
  const bodyField = page.locator('textarea[name="body"], textarea[name="content"], #body, #content, .ql-editor').first();
  if (await bodyField.count() > 0) {
    await bodyField.fill(pr.body);
    console.log("  ✓ Body filled");
  }

  // Step 3: Email
  const emailField = page.locator('input[name="email"], input[type="email"]').first();
  if (await emailField.count() > 0) {
    await emailField.fill(EMAIL);
    console.log("  ✓ Email filled");
  }

  // Step 4: Category - try to select Technology or Business
  const catField = page.locator('select[name="category"], select[name="cat_id"]').first();
  if (await catField.count() > 0) {
    try { await catField.selectOption({ label: "Technology" }); } catch {}
    try { await catField.selectOption({ label: "Business" }); } catch {}
    console.log("  ✓ Category selected");
  }

  // Step 5: Company name
  const companyField = page.locator('input[name="company"], input[name="org_name"]').first();
  if (await companyField.count() > 0) {
    await companyField.fill(COMPANY);
    console.log("  ✓ Company filled");
  }

  // Step 6: Website
  const websiteField = page.locator('input[name="website"], input[name="url"]').first();
  if (await websiteField.count() > 0) {
    await websiteField.fill(WEBSITE);
    console.log("  ✓ Website filled");
  }

  // Step 7: Phone
  const phoneField = page.locator('input[name="phone"]').first();
  if (await phoneField.count() > 0) {
    await phoneField.fill(PHONE);
    console.log("  ✓ Phone filled");
  }

  console.log("  ⏸ Pausing for 5 seconds — review form before submit...");
  await page.waitForTimeout(5000);

  // Try to submit
  const submitBtn = page.locator('button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Post")').first();
  if (await submitBtn.count() > 0) {
    await submitBtn.click();
    console.log("  ✓ Submit clicked");
    await page.waitForTimeout(3000);
  }

  return page.url();
}

// ─────────────────────────────────────────────────────────
// OpenPR.com — free account + submission
// ─────────────────────────────────────────────────────────
async function submitOpenPR(page: Page) {
  console.log("  → Navigating to OpenPR...");
  await page.goto("https://www.openpr.com/account/register.html", { waitUntil: "domcontentloaded", timeout: 30000 });
  console.log("  → OpenPR register page loaded");

  const pr = readPR("openpr");

  // Fill registration
  try {
    await page.fill('input[name="email"], input[type="email"]', EMAIL);
    await page.fill('input[name="password"]', "TSEVending@2024!");
    await page.fill('input[name="company"], input[name="company_name"], input[name="name"]', COMPANY);
    const websiteField = page.locator('input[name="website"], input[name="url"]').first();
    if (await websiteField.count() > 0) await websiteField.fill(WEBSITE);
    console.log("  ✓ Registration form filled");

    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("  ✓ Registration submitted");
    }
  } catch (e) {
    console.log(`  ⚠ Registration: ${e}`);
  }

  // Navigate to submit form
  await page.goto("https://www.openpr.com/submit-press-release/", { waitUntil: "domcontentloaded", timeout: 30000 });
  console.log("  → PR submission form loaded");

  // Fill PR form
  try {
    const titleField = page.locator('input[name="title"], #headline, input[placeholder*="headline" i]').first();
    if (await titleField.count() > 0) await titleField.fill(pr.title);

    const bodyField = page.locator('textarea[name="text"], textarea[name="body"], textarea[name="content"], .ql-editor').first();
    if (await bodyField.count() > 0) await bodyField.fill(pr.body);

    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    if (await emailField.count() > 0) await emailField.fill(EMAIL);

    console.log("  ✓ PR form filled");
    await page.waitForTimeout(3000);

    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("  ✓ PR submitted");
    }
  } catch (e) {
    console.log(`  ⚠ PR form: ${e}`);
  }

  return page.url();
}

// ─────────────────────────────────────────────────────────
// 1888PressRelease.com — free, simple form
// ─────────────────────────────────────────────────────────
async function submit1888PR(page: Page) {
  console.log("  → Navigating to 1888PressRelease...");
  await page.goto("https://www.1888pressrelease.com/submit/", { waitUntil: "domcontentloaded", timeout: 30000 });

  const pr = readPR("openpr"); // reuse similar content
  console.log("  → 1888PR form loaded");

  try {
    await page.fill('input[name="title"], input[name="headline"]', pr.title);
    await page.fill('textarea[name="body"], textarea[name="content"], textarea[name="release"]', pr.body);
    await page.fill('input[name="email"], input[type="email"]', EMAIL);
    await page.fill('input[name="company"], input[name="organization"]', COMPANY);
    const websiteField = page.locator('input[name="website"], input[name="url"]').first();
    if (await websiteField.count() > 0) await websiteField.fill(WEBSITE);
    const phoneField = page.locator('input[name="phone"]').first();
    if (await phoneField.count() > 0) await phoneField.fill(PHONE);
    console.log("  ✓ 1888PR form filled");

    await page.waitForTimeout(2000);
    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("  ✓ 1888PR submitted");
    }
  } catch (e) {
    console.log(`  ⚠ 1888PR form: ${e}`);
  }

  return page.url();
}

// ─────────────────────────────────────────────────────────
// PressAbout.com
// ─────────────────────────────────────────────────────────
async function submitPressAbout(page: Page) {
  console.log("  → Navigating to PressAbout...");
  await page.goto("https://www.pressabout.com/post-pr.aspx", { waitUntil: "domcontentloaded", timeout: 30000 });

  const pr = readPR("pressabout");
  console.log("  → PressAbout form loaded");

  try {
    await page.fill('input[name="Title"], input[name="title"]', pr.title);
    await page.fill('textarea[name="Body"], textarea[name="body"], textarea[name="content"]', pr.body);
    await page.fill('input[name="Email"], input[name="email"], input[type="email"]', EMAIL);
    const companyField = page.locator('input[name="Company"], input[name="company"]').first();
    if (await companyField.count() > 0) await companyField.fill(COMPANY);
    const websiteField = page.locator('input[name="Website"], input[name="website"], input[name="url"]').first();
    if (await websiteField.count() > 0) await websiteField.fill(WEBSITE);
    console.log("  ✓ PressAbout form filled");

    await page.waitForTimeout(2000);
    const submitBtn = page.locator('button[type="submit"], input[type="submit"], input[value*="Submit" i]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("  ✓ PressAbout submitted");
    }
  } catch (e) {
    console.log(`  ⚠ PressAbout form: ${e}`);
  }

  return page.url();
}

// ─────────────────────────────────────────────────────────
// Site registry
// ─────────────────────────────────────────────────────────
const SITES: Record<string, { name: string; da: number; fn: (p: Page) => Promise<string> }> = {
  prlog:      { name: "PRLog.com",              da: 72, fn: submitPRLog },
  openpr:     { name: "OpenPR.com",             da: 70, fn: submitOpenPR },
  pr1888:     { name: "1888PressRelease.com",   da: 55, fn: submit1888PR },
  pressabout: { name: "PressAbout.com",         da: 50, fn: submitPressAbout },
};

// ─────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────
async function main() {
  const arg = process.argv.find((a) => a.startsWith("--site="));
  const targetSite = arg ? arg.split("=")[1] : null;

  const status = loadStatus();
  const browser: Browser = await chromium.launch({ headless: false, slowMo: 200 });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  const toRun = targetSite
    ? [[targetSite, SITES[targetSite]] as [string, typeof SITES[string]]]
    : Object.entries(SITES);

  console.log(`\n🚀 TSE Vending — Press Release Auto-Submitter`);
  console.log(`   Submitting to ${toRun.length} platform(s)...`);
  console.log(`   ⚡ PRLog: check info@tsevending.com for verification email after submit\n`);

  for (const [key, site] of toRun) {
    if (!site) { console.log(`❌ Unknown site: ${key}`); continue; }
    if (status[key]?.submitted) {
      console.log(`⏭  ${site.name} (DA ${site.da}) — already submitted ${status[key].date}`);
      continue;
    }

    console.log(`\n${"─".repeat(55)}`);
    console.log(`📌 ${site.name} (DA ${site.da})`);

    try {
      const resultUrl = await site.fn(page);
      status[key] = { submitted: true, date: new Date().toISOString().slice(0, 10), url: resultUrl };
      saveStatus(status);
      console.log(`✅ ${site.name} — done → ${resultUrl}`);
    } catch (err) {
      console.log(`❌ ${site.name} — error: ${err}`);
      status[key] = { submitted: false, notes: String(err), date: new Date().toISOString().slice(0, 10) };
      saveStatus(status);
    }

    // Wait between sites
    await page.waitForTimeout(2000);
  }

  await browser.close();

  console.log(`\n${"=".repeat(55)}`);
  console.log(`✅ Done. Status: ${STATUS_FILE}`);

  const done = Object.values(status).filter((s) => s.submitted).length;
  console.log(`${done}/${Object.keys(SITES).length} platforms submitted`);
  console.log(`\n📧 NEXT STEP: Check info@tsevending.com for verification emails from PRLog & OpenPR`);
}

main().catch(console.error);
