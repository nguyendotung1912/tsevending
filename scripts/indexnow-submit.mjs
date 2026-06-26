// IndexNow submitter — notifies Bing/Yandex (and other IndexNow engines) of URLs.
// Reads the live sitemap.xml, extracts all <loc> URLs, and POSTs them in one batch.
//
// Usage: node scripts/indexnow-submit.mjs
// The key is read from scripts/.indexnow-key (created at setup); the matching
// key file must be live at https://tsevending.com/<key>.txt before running.
import fs from "fs";
import path from "path";

const HOST = "tsevending.com";
const key = fs.readFileSync(path.join(import.meta.dirname, ".indexnow-key"), "utf8").trim();
const keyLocation = `https://${HOST}/${key}.txt`;

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urlList.length === 0) {
  console.error("Không trích được URL nào từ sitemap — dừng.");
  process.exit(1);
}

console.log(`Gửi ${urlList.length} URL tới IndexNow (key ${key.slice(0, 8)}…)`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
});

console.log("HTTP", res.status, res.statusText);
const body = await res.text();
if (body) console.log("Phản hồi:", body.slice(0, 500));
// IndexNow: 200 = nhận OK; 202 = nhận, đang xác thực key; 4xx = lỗi key/format.
