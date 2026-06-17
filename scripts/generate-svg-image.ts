/**
 * Programmatic SVG image generator for blog articles.
 * Creates 1200×630 px Open-Graph-ready SVG images.
 * No external image APIs — zero copyright risk.
 *
 * Exports:
 *   generateSvgImage(slug, title, silo) => writes public/images/articles/<slug>.svg
 */
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "articles");

// Silo-aware colour palettes
const PALETTES: Record<string, { from: string; to: string; accent: string; badge: string }> = {
  "may-ban-hang-tu-dong": {
    from: "#1E40AF",
    to: "#0369A1",
    accent: "#FBA800",
    badge: "Máy bán hàng tự động",
  },
  "tu-locker-thong-minh": {
    from: "#0F766E",
    to: "#0E4F8D",
    accent: "#34D399",
    badge: "Tủ locker thông minh",
  },
  "giai-phap-kinh-doanh": {
    from: "#15803D",
    to: "#0F766E",
    accent: "#FACC15",
    badge: "Giải pháp kinh doanh",
  },
};

const DEFAULT_PALETTE = PALETTES["may-ban-hang-tu-dong"];

// Wrap plain text into SVG <tspan> lines at ~38 chars per line
function wrapTitle(title: string, maxChars = 38): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
    if (lines.length === 2) { current = "..."; break; }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3);
}

export function generateSvgImage(slug: string, title: string, silo: string): string {
  const p = PALETTES[silo] || DEFAULT_PALETTE;
  const lines = wrapTitle(title);
  const lineHeight = 68;
  const titleStartY = lines.length === 1 ? 280 : lines.length === 2 ? 246 : 216;

  const tspans = lines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.from}"/>
      <stop offset="100%" stop-color="${p.to}"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.04)"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1100" cy="-60" r="280" fill="rgba(255,255,255,0.06)"/>
  <circle cx="1050" cy="600" r="200" fill="rgba(255,255,255,0.05)"/>
  <circle cx="50"  cy="500" r="160" fill="rgba(255,255,255,0.04)"/>

  <!-- Grid lines -->
  <line x1="0" y1="160" x2="1200" y2="160" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="0" y1="490" x2="1200" y2="490" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Top branding bar -->
  <rect x="0" y="0" width="1200" height="56" fill="rgba(0,0,0,0.25)"/>
  <text x="40" y="37" font-family="'Segoe UI',Arial,sans-serif" font-size="20" font-weight="700" fill="white" letter-spacing="2">TSE VENDING</text>
  <text x="1160" y="37" font-family="'Segoe UI',Arial,sans-serif" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="end">tsevending.com</text>

  <!-- Category badge -->
  <rect x="40" y="80" width="${p.badge.length * 11 + 24}" height="36" rx="18" fill="${p.accent}" fill-opacity="0.9"/>
  <text x="${40 + p.badge.length * 5.5 + 12}" y="104" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#1E293B" text-anchor="middle">${escapeXml(p.badge)}</text>

  <!-- Article title -->
  <text font-family="'Segoe UI',Arial,sans-serif" font-size="${lines.length > 2 ? 52 : 60}" font-weight="800" fill="white" x="80" y="${titleStartY}" letter-spacing="-0.5">
    ${tspans}
  </text>

  <!-- Accent line under title -->
  <rect x="80" y="${titleStartY + lineHeight * lines.length + 10}" width="80" height="5" rx="3" fill="${p.accent}"/>

  <!-- Bottom strip -->
  <rect x="0" y="560" width="1200" height="70" fill="rgba(0,0,0,0.3)"/>
  <text x="40" y="603" font-family="'Segoe UI',Arial,sans-serif" font-size="18" fill="rgba(255,255,255,0.6)">Cẩm nang máy bán hàng tự động &amp; tủ locker thông minh Việt Nam</text>

  <!-- Decorative icon (abstract) -->
  <g transform="translate(1050,300)" opacity="0.15">
    <rect x="-60" y="-80" width="120" height="160" rx="12" fill="white"/>
    <rect x="-40" y="-60" width="35" height="45" rx="4" fill="${p.from}"/>
    <rect x="5"  y="-60" width="35" height="45" rx="4" fill="${p.from}"/>
    <rect x="-40" y="0"  width="35" height="45" rx="4" fill="${p.from}"/>
    <rect x="5"  y="0"   width="35" height="45" rx="4" fill="${p.from}"/>
    <rect x="-50" y="55"  width="100" height="18" rx="4" fill="${p.from}"/>
  </g>
</svg>`;

  return svg;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function saveArticleImage(slug: string, title: string, silo: string): string {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  const svg = generateSvgImage(slug, title, silo);
  const filePath = path.join(PUBLIC_DIR, `${slug}.svg`);
  fs.writeFileSync(filePath, svg, "utf8");
  return `/images/articles/${slug}.svg`;
}
