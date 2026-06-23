import { NextResponse } from "next/server";

// Server-side only — the Unsplash key never reaches the browser.
const UNSPLASH_API = "https://api.unsplash.com/search/photos";

// Vietnamese + English stopwords to drop when extracting keywords.
const STOPWORDS = new Set([
  "và", "là", "của", "có", "cho", "các", "được", "trong", "với", "để", "một",
  "những", "này", "đó", "khi", "như", "về", "tại", "theo", "không", "đã", "sẽ",
  "cũng", "nhưng", "hay", "hoặc", "nên", "rất", "nhiều", "thì", "ra", "vào",
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are",
  "with", "this", "that", "by", "as", "at", "be",
]);

// Map Vietnamese domain phrases → English Unsplash queries (Unsplash is
// English-biased, so a domain term yields far better photos than raw Vietnamese).
const DOMAIN_MAP: [RegExp, string][] = [
  [/tủ locker|smart locker|locker|tủ khóa/i, "smart locker parcel delivery"],
  [/máy bán nước|nước giải khát|beverage/i, "beverage vending machine"],
  [/máy bán hàng|vending/i, "vending machine retail"],
  [/snack|đồ ăn vặt/i, "snack vending machine"],
  [/cà phê|coffee/i, "coffee vending machine"],
  [/thanh toán|qr|cashless|ví điện tử/i, "contactless mobile payment"],
  [/iot|cảm biến|kết nối|công nghệ/i, "iot smart technology"],
  [/ai|trí tuệ nhân tạo|machine learning/i, "artificial intelligence technology"],
  [/chung cư|căn hộ|tòa nhà/i, "modern apartment building lobby"],
  [/văn phòng|office/i, "modern office workspace"],
  [/khu công nghiệp|nhà máy|công nhân/i, "industrial factory workers"],
  [/bệnh viện|y tế/i, "hospital corridor modern"],
  [/trường học|sinh viên|đại học/i, "university students campus"],
  [/siêu thị|bán lẻ|retail/i, "supermarket retail aisle"],
  [/logistics|kho|giao hàng|shipper/i, "warehouse logistics delivery"],
  [/khách sạn|resort|du lịch/i, "hotel lobby luggage"],
  [/bảo trì|sửa chữa|kỹ thuật/i, "technician equipment maintenance"],
  [/đầu tư|kinh doanh|doanh thu|roi/i, "business investment growth"],
];

function extractKeywords(content: string): { keywords: string[]; query: string } {
  const clean = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`>_[\]()|!~\-]/g, " ")
    .toLowerCase();

  // Domain-aware English query (best Unsplash results)
  const domainHits: string[] = [];
  for (const [re, q] of DOMAIN_MAP) {
    if (re.test(clean) && !domainHits.includes(q)) domainHits.push(q);
    if (domainHits.length >= 2) break;
  }

  // Frequency-based keywords (shown to the user as "detected keywords")
  const freq = new Map<string, number>();
  for (const w of clean.split(/\s+/)) {
    const t = w.trim();
    if (t.length < 3 || STOPWORDS.has(t) || /^\d+$/.test(t)) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w);

  const query =
    domainHits.length > 0
      ? domainHits.join(" ")
      : "vending machine smart locker technology";

  return { keywords, query };
}

export async function POST(req: Request) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Chưa cấu hình UNSPLASH_ACCESS_KEY trong biến môi trường." },
      { status: 500 }
    );
  }

  let content = "";
  try {
    ({ content } = await req.json());
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }
  if (!content || content.trim().length < 10) {
    return NextResponse.json(
      { error: "Hãy nhập nội dung bài viết (tối thiểu ~10 ký tự)." },
      { status: 400 }
    );
  }

  const { keywords, query } = extractKeywords(content);

  const url = `${UNSPLASH_API}?query=${encodeURIComponent(
    query
  )}&per_page=5&orientation=landscape&content_filter=high`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Unsplash lỗi (${res.status}). Kiểm tra lại Access Key.` },
      { status: 502 }
    );
  }

  const data = await res.json();
  const images = (data.results ?? []).map(
    (p: {
      id: string;
      alt_description?: string;
      urls: { thumb: string; small: string; regular: string };
      links: { html: string };
      user: { name: string; links: { html: string } };
    }) => ({
      id: p.id,
      thumb: p.urls.small,
      url: p.urls.regular,
      alt: p.alt_description ?? query,
      photographer: p.user.name,
      photographerUrl: `${p.user.links.html}?utm_source=tsevending&utm_medium=referral`,
      unsplashUrl: `${p.links.html}?utm_source=tsevending&utm_medium=referral`,
    })
  );

  return NextResponse.json({ query, keywords, images });
}
