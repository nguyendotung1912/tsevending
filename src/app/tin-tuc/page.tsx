import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getAllPostsMeta, CATEGORY_META, type ArticleCategory } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import type { WorldNewsItem } from "../../../scripts/fetch-world-news";

function catMeta(cat: string | undefined) {
  if (!cat) return null;
  return CATEGORY_META[cat as ArticleCategory] ?? null;
}

export const metadata: Metadata = buildMetadata({
  title: `Tin tức Smart Locker & Vending Machine Việt Nam`,
  description: `Tin tức, dự án, xu hướng và kiến thức về tủ locker thông minh và máy bán hàng tự động tại Việt Nam — cập nhật từ ${siteConfig.name}.`,
  path: "/tin-tuc",
});

const CATEGORIES: { slug: ArticleCategory; label: string; href: string; icon: string }[] = [
  { slug: "du-an",     label: "Dự án",       href: "/tin-tuc/du-an",     icon: "🏗" },
  { slug: "xu-huong",  label: "Xu hướng",    href: "/tin-tuc/xu-huong",  icon: "📈" },
  { slug: "huong-dan", label: "Hướng dẫn",   href: "/tin-tuc/huong-dan", icon: "📋" },
  { slug: "so-sanh",   label: "So sánh",     href: "/tin-tuc/so-sanh",   icon: "⚖️" },
  { slug: "kien-thuc", label: "Kiến thức",   href: "/tin-tuc/kien-thuc", icon: "📚" },
];

const LOCKER_SUBS: { label: string; href: string; icon: string }[] = [
  { label: "Locker chung cư",       href: "/tu-locker-thong-minh/tu-locker-chung-cu",              icon: "🏢" },
  { label: "Locker văn phòng",      href: "/tu-locker-thong-minh/tu-locker-van-phong",             icon: "🏛️" },
  { label: "Tủ gửi đồ thông minh",  href: "/tu-locker-thong-minh/tu-gui-do-thong-minh",           icon: "🎒" },
  { label: "Locker giao nhận hàng", href: "/tu-locker-thong-minh/tu-locker-giao-nhan-hang",       icon: "📦" },
  { label: "Locker trường học/ĐH",  href: "/tu-locker-thong-minh/tu-locker-truong-hoc-dai-hoc",   icon: "🎓" },
  { label: "Locker khách sạn",      href: "/tu-locker-thong-minh/tu-locker-khach-san-resort",     icon: "🏨" },
  { label: "Locker siêu thị",       href: "/tu-locker-thong-minh/tu-locker-sieu-thi-banle",       icon: "🛒" },
  { label: "Locker bệnh viện",      href: "/tu-locker-thong-minh/tu-locker-benh-vien-y-te",       icon: "🏥" },
];

const VENDING_SUBS: { label: string; href: string; icon: string }[] = [
  { label: "Máy bán nước giải khát", href: "/may-ban-hang-tu-dong/may-ban-nuoc-giai-khat",  icon: "🥤" },
  { label: "Máy bán đồ ăn vặt",     href: "/may-ban-hang-tu-dong/may-ban-do-an-vat",       icon: "🍿" },
  { label: "Máy bán hàng lạnh",     href: "/may-ban-hang-tu-dong/may-ban-hang-lanh",       icon: "❄️" },
  { label: "Máy bán gas",           href: "/may-ban-hang-tu-dong/may-ban-gas",             icon: "🔥" },
  { label: "Linh kiện phụ tùng",    href: "/may-ban-hang-tu-dong/linh-kien-phu-tung",     icon: "⚙️" },
];

function loadWorldNews(): WorldNewsItem[] {
  try {
    const p = path.join(process.cwd(), "src", "data", "world-news.json");
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    return data.items || [];
  } catch { return []; }
}

function getWorldNewsUpdatedAt(): string {
  try {
    const p = path.join(process.cwd(), "src", "data", "world-news.json");
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    return data.updatedAt || "";
  } catch { return ""; }
}

function formatDateShort(d: string) {
  try { return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }); }
  catch { return ""; }
}

function formatDateFull(d: string) {
  try { return new Date(d).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); }
  catch { return ""; }
}

function SectionHeader({ label, count, href, accent = "brand" }: { label: string; count?: number; href?: string; accent?: string }) {
  const accentClass = accent === "orange" ? "bg-orange-600" : "bg-brand-700";
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`h-6 w-1.5 rounded-full ${accentClass}`} />
      <span className="text-sm font-black uppercase tracking-widest text-slate-700">{label}</span>
      <div className="flex-1 border-b border-slate-300" />
      {count !== undefined && <span className="text-xs text-slate-400">{count} bài</span>}
      {href && <Link href={href} className="shrink-0 text-xs font-semibold text-brand-600 hover:underline">Xem tất cả →</Link>}
    </div>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const featured = posts[0];
  const recent = posts.slice(1, 9);
  const olderPosts = posts.slice(9);

  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    posts: posts.filter((p) => p.category === cat.slug).slice(0, 4),
  })).filter((c) => c.posts.length > 0);

  const lockerPosts = posts.filter((p) => p.silo === "tu-locker-thong-minh").slice(0, 4);
  const vendingPosts = posts.filter((p) => p.silo === "may-ban-hang-tu-dong").slice(0, 4);

  const worldNews = loadWorldNews().slice(0, 6);
  const allWorldNews = loadWorldNews();
  const worldNewsUpdatedAt = getWorldNewsUpdatedAt();
  const todayLabel = formatDateFull(new Date().toISOString());

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Tin tức", path: "/tin-tuc" }])} />
      {/* ══ NEWSPAPER MASTHEAD ══════════════════════════════════════ */}
      <div className="border-b-2 border-slate-900 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs text-slate-500">
            <span>{todayLabel}</span>
            <div className="flex items-center gap-3">
              <Link href="/tin-tuc/the-gioi" className="flex items-center gap-1.5 font-medium text-orange-600 hover:text-orange-700">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                Tin thế giới
              </Link>
              <span className="text-slate-300">|</span>
              <span>{posts.length} bài viết</span>
            </div>
          </div>

          <div className="py-4 text-center border-b border-slate-200">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Tin Tức Ngành Vending & Smart Locker
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Dự án · Xu hướng · Hướng dẫn · So sánh · Kiến thức · Tin thế giới
            </p>
          </div>

          {posts.slice(0, 5).length > 0 && (
            <div className="flex items-center gap-3 py-2.5 overflow-hidden">
              <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                Mới nhất
              </span>
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-none whitespace-nowrap text-sm">
                {posts.slice(0, 8).map((post) => (
                  <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="shrink-0 text-slate-700 hover:text-brand-700 font-medium transition">
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ CATEGORY NAV (sticky) ══════════════════════════════════ */}
      <div className="sticky top-16 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none">
            <Link href="/tin-tuc" className="shrink-0 rounded-full bg-brand-700 px-3.5 py-1.5 text-xs font-bold text-white">
              Tất cả
            </Link>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat.slug];
              return (
                <Link key={cat.slug} href={cat.href} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${meta.bg} ${meta.color} hover:opacity-80 transition-opacity`}>
                  {cat.icon} {cat.label}
                </Link>
              );
            })}
            <Link href="/tin-tuc/the-gioi" className="shrink-0 rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-semibold text-orange-700 hover:opacity-80 transition-opacity ml-2">
              🌐 Tin thế giới
            </Link>
            <span className="mx-2 text-slate-300 shrink-0">|</span>
            <Link href="/tu-locker-thong-minh" className="shrink-0 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700 hover:opacity-80 transition-opacity">
              🔒 Smart Locker
            </Link>
            <Link href="/may-ban-hang-tu-dong" className="shrink-0 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:opacity-80 transition-opacity">
              🤖 Vending Machine
            </Link>
          </nav>
        </div>
      </div>

      {/* ══ MAIN 2-COLUMN LAYOUT ═══════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* ── LEFT ────────────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Featured industry report */}
            <Link
              href="/bao-cao"
              className="group flex flex-col gap-4 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-5 hover:shadow-lg transition-shadow sm:flex-row sm:items-center"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-3xl text-white">
                📊
              </div>
              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-accent-600">Báo cáo ngành · Mới</span>
                <h2 className="mt-1 text-lg font-extrabold text-slate-900 leading-snug group-hover:text-brand-700">
                  Báo cáo Thị trường Smart Locker Việt Nam 2026
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Quy mô, động lực tăng trưởng, phân khúc, xu hướng công nghệ &amp; dự báo 2026–2031 — kèm trích dẫn nguồn. Tải PDF miễn phí.
                </p>
              </div>
              <span className="shrink-0 self-start sm:self-center rounded-lg bg-brand-700 px-4 py-2 text-xs font-bold text-white group-hover:bg-brand-800 transition">
                Xem báo cáo →
              </span>
            </Link>

            {/* Featured article */}
            {featured && (
              <div>
                <SectionHeader label="Bài nổi bật" />
                <Link
                  href={`/tin-tuc/${featured.slug}`}
                  className="group grid gap-0 rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-shadow sm:grid-cols-[55%_45%]"
                >
                  <div className="relative h-64 sm:h-full min-h-[300px] bg-slate-100">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.imageAlt ?? featured.title}
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, 55vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center">
                        <span className="text-7xl text-white/20">🔐</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    {catMeta(featured.category) && (
                      <span className={`mb-3 self-start rounded-full px-3 py-1 text-xs font-bold ${catMeta(featured.category)!.bg} ${catMeta(featured.category)!.color}`}>
                        {catMeta(featured.category)!.label}
                      </span>
                    )}
                    <p className="text-xs text-slate-400 mb-2">{formatDateShort(featured.date)}</p>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-brand-700 mb-3 sm:text-2xl">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{featured.description}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-xs font-bold text-white group-hover:bg-brand-800 transition">
                        Đọc bài →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Recent 8 articles */}
            {recent.length > 0 && (
              <div>
                <SectionHeader label="Bài mới nhất" count={posts.length} />
                <div className="grid gap-4 sm:grid-cols-2">
                  {recent.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ──────────────────────────────────────────── */}
          <aside className="space-y-6">

            {/* World news */}
            {worldNews.length > 0 && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 overflow-hidden">
                <div className="bg-orange-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <span className="text-sm font-black text-white uppercase tracking-wide">Tin Thế Giới</span>
                  </div>
                  <Link href="/tin-tuc/the-gioi" className="text-xs font-semibold text-orange-100 hover:text-white">
                    Xem tất cả →
                  </Link>
                </div>
                <div className="divide-y divide-orange-100">
                  {worldNews.slice(0, 5).map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.slug ? `/tin-tuc/the-gioi/${item.slug}` : item.url}
                      {...(item.slug ? {} : { target: "_blank", rel: "noopener noreferrer nofollow" })}
                      className="flex gap-3 p-3 hover:bg-orange-100/60 transition group"
                    >
                      <span className="shrink-0 text-base font-black text-orange-300 leading-none mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-orange-700 mb-0.5 truncate">{item.source}</p>
                        <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-700 transition">
                          {item.titleVi}
                        </p>
                        {item.pubDate && (
                          <p className="mt-0.5 text-xs text-slate-400">{formatDateShort(item.pubDate)}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                {worldNewsUpdatedAt && (
                  <div className="px-4 py-2 bg-orange-100/50 text-xs text-orange-500 text-right">
                    Cập nhật {formatDateShort(worldNewsUpdatedAt)}
                  </div>
                )}
              </div>
            )}

            {/* Category nav */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="bg-slate-900 px-4 py-3">
                <span className="text-sm font-black text-white uppercase tracking-wide">Chuyên Mục</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat.slug];
                  const count = posts.filter((p) => p.category === cat.slug).length;
                  return (
                    <li key={cat.slug}>
                      <Link href={cat.href} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition group">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-brand-700">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${meta.bg} ${meta.color}`}>{cat.icon}</span>
                          {cat.label}
                        </span>
                        <span className="text-xs text-slate-400">{count} bài</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="/tin-tuc/the-gioi" className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition group">
                    <span className="flex items-center gap-2 text-sm font-medium text-orange-700">
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold">🌐</span>
                      Tin thế giới
                    </span>
                    <span className="text-xs text-slate-400">{allWorldNews.length} bài</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── Smart Locker product nav ── */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50 overflow-hidden">
              <Link href="/tu-locker-thong-minh" className="block bg-teal-700 px-4 py-3 hover:bg-teal-800 transition">
                <span className="text-sm font-black text-white uppercase tracking-wide">🔒 Tủ Locker Thông Minh</span>
              </Link>
              <ul className="divide-y divide-teal-100">
                {LOCKER_SUBS.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="flex items-center gap-2 px-4 py-2.5 hover:bg-teal-100/60 transition group text-sm">
                      <span>{s.icon}</span>
                      <span className="text-slate-700 group-hover:text-teal-800 font-medium">{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 bg-teal-100/40">
                <Link href="/tu-locker-thong-minh" className="text-xs font-bold text-teal-700 hover:underline">
                  → Xem toàn bộ tủ locker thông minh
                </Link>
              </div>
            </div>

            {/* ── Vending Machine product nav ── */}
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 overflow-hidden">
              <Link href="/may-ban-hang-tu-dong" className="block bg-indigo-700 px-4 py-3 hover:bg-indigo-800 transition">
                <span className="text-sm font-black text-white uppercase tracking-wide">🤖 Máy Bán Hàng Tự Động</span>
              </Link>
              <ul className="divide-y divide-indigo-100">
                {VENDING_SUBS.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="flex items-center gap-2 px-4 py-2.5 hover:bg-indigo-100/60 transition group text-sm">
                      <span>{s.icon}</span>
                      <span className="text-slate-700 group-hover:text-indigo-800 font-medium">{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 bg-indigo-100/40">
                <Link href="/may-ban-hang-tu-dong" className="text-xs font-bold text-indigo-700 hover:underline">
                  → Xem toàn bộ máy bán hàng tự động
                </Link>
              </div>
            </div>

            {/* CTA block */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-300 mb-2">Tư vấn miễn phí</p>
              <p className="text-sm font-semibold mb-1">Cần giải pháp smart locker hay vending machine?</p>
              <p className="text-xs text-white/70 mb-4">Đội ngũ TSE hỗ trợ thiết kế, lắp đặt và bảo trì toàn quốc.</p>
              <Link
                href="/lien-he"
                className="block text-center rounded-lg bg-accent-500 hover:bg-accent-400 py-2.5 text-sm font-bold text-white transition"
              >
                Liên hệ ngay →
              </Link>
              <Link href="/giai-phap-kinh-doanh" className="mt-2 block text-center text-xs text-brand-300 hover:text-white">
                Xem giải pháp kinh doanh →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ══ ARTICLES BY PRODUCT SILO ═══════════════════════════════ */}
      <div className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">

          {/* Smart Locker articles */}
          {lockerPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-6 w-1.5 rounded-full bg-teal-600" />
                <Link href="/tu-locker-thong-minh" className="text-sm font-black uppercase tracking-widest text-teal-700 hover:underline">
                  🔒 Bài viết về Tủ Locker Thông Minh
                </Link>
                <div className="flex-1 border-b border-slate-200" />
                <Link href="/tin-tuc" className="shrink-0 text-xs font-semibold text-teal-600 hover:underline">Xem thêm →</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {lockerPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {LOCKER_SUBS.slice(0, 4).map((s) => (
                  <Link key={s.href} href={s.href} className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100 transition">
                    {s.icon} {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Vending Machine articles */}
          {vendingPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-6 w-1.5 rounded-full bg-indigo-600" />
                <Link href="/may-ban-hang-tu-dong" className="text-sm font-black uppercase tracking-widest text-indigo-700 hover:underline">
                  🤖 Bài viết về Máy Bán Hàng Tự Động
                </Link>
                <div className="flex-1 border-b border-slate-200" />
                <Link href="/tin-tuc" className="shrink-0 text-xs font-semibold text-indigo-600 hover:underline">Xem thêm →</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {vendingPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {VENDING_SUBS.map((s) => (
                  <Link key={s.href} href={s.href} className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition">
                    {s.icon} {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ CATEGORY SECTIONS ══════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
          {byCategory.map((cat) => {
            const meta = CATEGORY_META[cat.slug];
            return (
              <div key={cat.slug}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-6 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-brand-700,#1d4ed8)" }} />
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${meta.bg} ${meta.color}`}>
                    {cat.icon} {cat.label}
                  </span>
                  <div className="flex-1 border-b border-slate-300" />
                  <Link href={cat.href} className="text-xs font-semibold text-brand-600 hover:underline whitespace-nowrap">
                    Xem tất cả →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.posts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            );
          })}

          {olderPosts.length > 0 && (
            <div>
              <SectionHeader label="Tất cả bài viết" count={olderPosts.length} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {olderPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ PRODUCT DISCOVERY ══════════════════════════════════════ */}
      <section className="border-t-2 border-brand-900 bg-brand-950 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-black text-white sm:text-2xl">Khám Phá Danh Mục Sản Phẩm TSE</h2>
            <p className="mt-2 text-sm text-brand-300">Giải pháp smart locker và vending machine cho mọi ngành nghề</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Locker grid */}
            <div>
              <Link href="/tu-locker-thong-minh" className="mb-4 flex items-center gap-2 hover:underline group">
                <span className="text-base font-black text-teal-400 group-hover:text-teal-300">🔒 Tủ Locker Thông Minh</span>
                <span className="text-xs text-teal-600">→</span>
              </Link>
              <div className="grid gap-2 grid-cols-2">
                {LOCKER_SUBS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex items-center gap-2.5 rounded-xl border border-brand-800 bg-brand-900/60 px-3 py-2.5 hover:border-teal-600 hover:bg-teal-950/40 transition"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-teal-300 leading-tight">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Vending grid */}
            <div>
              <Link href="/may-ban-hang-tu-dong" className="mb-4 flex items-center gap-2 hover:underline group">
                <span className="text-base font-black text-indigo-400 group-hover:text-indigo-300">🤖 Máy Bán Hàng Tự Động</span>
                <span className="text-xs text-indigo-600">→</span>
              </Link>
              <div className="grid gap-2 grid-cols-2">
                {VENDING_SUBS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex items-center gap-2.5 rounded-xl border border-brand-800 bg-brand-900/60 px-3 py-2.5 hover:border-indigo-500 hover:bg-indigo-950/40 transition"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-indigo-300 leading-tight">{s.label}</span>
                  </Link>
                ))}
              </div>

              {/* Internal links to solutions */}
              <div className="mt-4 rounded-xl border border-brand-800 bg-brand-900/60 p-4">
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wide mb-3">Giải pháp kinh doanh</p>
                <div className="space-y-2">
                  <Link href="/giai-phap-kinh-doanh" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                    <span>💼</span> Giải pháp kinh doanh vending
                  </Link>
                  <Link href="/lien-he" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                    <span>📞</span> Liên hệ tư vấn & báo giá
                  </Link>
                  <Link href="/tu-locker-thong-minh" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                    <span>🔒</span> Tổng quan tủ locker thông minh
                  </Link>
                  <Link href="/may-ban-hang-tu-dong" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                    <span>🤖</span> Tổng quan máy bán hàng tự động
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WORLD NEWS FULL SECTION ════════════════════════════════ */}
      {allWorldNews.length > 0 && (
        <section className="border-t-4 border-orange-600 bg-white py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1.5 rounded-full bg-orange-600" />
              <span className="text-xl font-black text-slate-900">Tin Tức Thế Giới</span>
              <span className="text-sm text-slate-500">— Tổng hợp & phân tích từ 15+ nguồn quốc tế</span>
              <div className="flex-1 border-b border-slate-200" />
              <Link href="/tin-tuc/the-gioi" className="shrink-0 text-sm font-bold text-orange-600 hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allWorldNews.slice(0, 6).map((item, idx) => (
                <Link
                  key={idx}
                  href={item.slug ? `/tin-tuc/the-gioi/${item.slug}` : item.url}
                  {...(item.slug ? {} : { target: "_blank", rel: "noopener noreferrer nofollow" })}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">{item.source}</span>
                    {item.pubDate && <span className="text-xs text-slate-400">{formatDateShort(item.pubDate)}</span>}
                  </div>
                  <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-brand-700 transition line-clamp-2 mb-2 flex-1">
                    {item.titleVi}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">{item.summaryVi}</p>
                  <span className="text-xs font-bold text-orange-600 group-hover:text-orange-700">
                    {item.slug ? "Đọc phân tích →" : "Đọc bản gốc →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
