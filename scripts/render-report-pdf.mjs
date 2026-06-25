// Render the market-report HTML files to PDF using Playwright (already a devDep).
// Run: node scripts/render-report-pdf.mjs
import { chromium } from "playwright";
import path from "path";
import { pathToFileURL } from "url";

const files = [
  ["public/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.html", "public/reports/bao-cao-thi-truong-smart-locker-viet-nam-2026.pdf"],
  ["public/reports/smart-locker-viet-nam-2026-key-statistics.html", "public/reports/smart-locker-viet-nam-2026-key-statistics.pdf"],
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [html, pdf] of files) {
  await page.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: "networkidle" });
  await page.pdf({ path: pdf, format: "A4", printBackground: true, margin: { top: "0", bottom: "0", left: "0", right: "0" } });
  console.log("OK ->", pdf);
}
await browser.close();
