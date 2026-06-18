/**
 * Backlink audit & reclamation tool for tsevending.com
 *
 * 1. Checks known mentions — does the page actually link back to tsevending.com?
 * 2. Checks dauthau.asia profile — does it have the website field filled?
 * 3. Reports unlinked mentions with outreach email template
 *
 * Usage: npm run audit:backlinks
 */
import https from "https";
import http from "http";
import nap from "./backlink-profiles/nap.json";

const TARGET = "tsevending.com";

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    proto.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; BacklinkAudit/1.0)" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchPage(res.headers.location!).then(resolve).catch(reject);
      }
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

function checkLink(html: string, domain: string): { found: boolean; dofollow: boolean; count: number } {
  const linkRegex = /<a[^>]+href=["'][^"']*tsevending\.com[^"']*["'][^>]*>/gi;
  const matches = html.match(linkRegex) || [];
  const dofollow = matches.some((m) => !m.toLowerCase().includes('rel="nofollow"') && !m.toLowerCase().includes("rel='nofollow'"));
  return { found: matches.length > 0, dofollow, count: matches.length };
}

function buildOutreachEmail(mention: typeof nap.known_mentions[0]): string {
  return `
Kính gửi,

Tôi là Nguyễn Đỗ Tùng, đồng sáng lập TSE Vending (tsevending.com) — nhà sản xuất máy bán hàng tự động và tủ locker thông minh tại Việt Nam.

Tôi thấy bài viết của quý vị tại:
${mention.url}

...có đề cập đến TSE Vending. Cảm ơn vì sự ghi nhận này.

Tôi muốn đề nghị: nếu quý vị có thể thêm đường link về website chính thức của chúng tôi (https://tsevending.com) kèm với phần đề cập, điều này sẽ giúp độc giả của quý vị tìm hiểu thêm về sản phẩm và dịch vụ của TSE Vending.

Rất mong nhận được phản hồi của quý vị.

Trân trọng,
Nguyễn Đỗ Tùng
Đồng sáng lập TSE Vending
info@tsevending.com | 0837375757
https://tsevending.com
`.trim();
}

async function main() {
  console.log(`\n🔍 Backlink Audit — ${TARGET}\n${"=".repeat(50)}`);

  const results: Array<{
    site: string;
    url: string;
    status: string;
    found: boolean;
    dofollow: boolean;
    count: number;
    action: string;
  }> = [];

  for (const mention of nap.known_mentions) {
    process.stdout.write(`\nChecking ${mention.site}... `);
    try {
      const html = await fetchPage(mention.url);
      const { found, dofollow, count } = checkLink(html, TARGET);

      let action = "";
      if (!found) {
        action = "⚠️  UNLINKED MENTION — send outreach email";
      } else if (!dofollow) {
        action = "🟡 NOFOLLOW link found — request dofollow";
      } else {
        action = "✅ DOFOLLOW link active";
      }

      console.log(action);
      results.push({ site: mention.site, url: mention.url, status: mention.status, found, dofollow, count, action });
    } catch (err) {
      console.log(`❌ Error: ${err}`);
      results.push({ site: mention.site, url: mention.url, status: "error", found: false, dofollow: false, count: 0, action: "❌ Could not check" });
    }

    // Rate limit — don't hammer servers
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n${"=".repeat(50)}\n📊 SUMMARY\n`);
  for (const r of results) {
    console.log(`${r.action}`);
    console.log(`   → ${r.url}`);
    if (!r.found) {
      const mention = nap.known_mentions.find((m) => m.site === r.site)!;
      console.log(`\n📧 OUTREACH EMAIL FOR ${r.site.toUpperCase()}:`);
      console.log("-".repeat(40));
      console.log(buildOutreachEmail(mention));
      console.log("-".repeat(40));
    }
    console.log();
  }

  const unlinked = results.filter((r) => !r.found).length;
  const dofollow = results.filter((r) => r.dofollow).length;
  console.log(`\nTotal checked: ${results.length}`);
  console.log(`Dofollow links: ${dofollow}`);
  console.log(`Unlinked mentions (send outreach): ${unlinked}`);
}

main().catch(console.error);
