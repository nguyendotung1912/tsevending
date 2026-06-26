import Link from "next/link";

// Custom 404 — served with HTTP 404 status for unmatched routes. Renders inside
// the root layout (Header/Footer present), and offers crawlable links to the main
// hubs so users and bots that hit a dead URL are routed back into the site.
const LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/", label: "Trang chủ", icon: "🏠" },
  { href: "/tu-locker-thong-minh", label: "Tủ locker thông minh", icon: "🔒" },
  { href: "/may-ban-hang-tu-dong", label: "Máy bán hàng tự động", icon: "🤖" },
  { href: "/tin-tuc", label: "Tin tức", icon: "📰" },
  { href: "/kien-thuc-ky-thuat", label: "Kiến thức kỹ thuật", icon: "📐" },
  { href: "/lien-he", label: "Liên hệ", icon: "📞" },
];

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="text-6xl font-black tracking-tight text-brand-700 sm:text-7xl">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Không tìm thấy trang
      </h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển. Bạn có thể quay lại các trang chính bên dưới.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            <span className="text-lg">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Cần hỗ trợ?{" "}
        <Link href="/lien-he" className="font-semibold text-brand-600 hover:underline">
          Liên hệ TSE Vending
        </Link>{" "}
        để được tư vấn.
      </p>
    </section>
  );
}
