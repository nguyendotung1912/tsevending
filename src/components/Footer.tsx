import Link from "next/link";
import { NAV_LINKS, siteConfig } from "@/content/site";
import { getFooterSiloLinks } from "@/content/categories";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              TS
            </span>
            <span>
              TSE <span className="text-accent-500">Vending</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
          <p className="mt-3 text-sm text-slate-400">{siteConfig.legalName}</p>
        </div>

        {/* Sản phẩm — 3rd on mobile, 2nd column on desktop */}
        <div className="order-3 md:order-none">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Sản phẩm</h3>
          <ul className="space-y-2 text-sm">
            {getFooterSiloLinks().map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/may-ban-hang-tu-dong/bang-gia" className="hover:text-white transition-colors text-slate-400">
                Bảng giá máy bán hàng
              </Link>
            </li>
            <li>
              <Link href="/tu-locker-thong-minh/cho-thue" className="hover:text-white transition-colors text-slate-400">
                Cho thuê tủ locker
              </Link>
            </li>
          </ul>
        </div>

        {/* Trang — 4th on mobile, 3rd column on desktop */}
        <div className="order-4 md:order-none">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Trang</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/du-an" className="hover:text-white transition-colors text-slate-400">
                Công trình thực tế
              </Link>
            </li>
            <li>
              <Link href="/khach-hang" className="hover:text-white transition-colors text-slate-400">
                Khách hàng &amp; dự án
              </Link>
            </li>
            <li>
              <Link href="/kien-thuc-ky-thuat" className="hover:text-white transition-colors text-slate-400">
                Kiến thức kỹ thuật
              </Link>
            </li>
            <li>
              <Link href="/bao-cao-thi-truong-smart-locker-viet-nam" className="hover:text-white transition-colors text-slate-400">
                Báo cáo thị trường
              </Link>
            </li>
            <li>
              <Link href="/video" className="hover:text-white transition-colors text-slate-400">
                Video
              </Link>
            </li>
            <li>
              <Link href="/bao-chi" className="hover:text-white transition-colors text-slate-400">
                Báo chí
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ — 2nd on mobile (most important for conversion), 4th column on desktop */}
        <div className="order-2 md:order-none">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Liên hệ</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 {siteConfig.address.street}, {siteConfig.address.city}</li>
            <li>
              📞{" "}
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              ✉️{" "}
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-slate-500 mb-2">
          <Link href="/chinh-sach-bao-mat" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</Link>
          <Link href="/chinh-sach-van-chuyen" className="hover:text-slate-300 transition-colors">Chính sách vận chuyển</Link>
          <Link href="/chinh-sach-thanh-toan" className="hover:text-slate-300 transition-colors">Chính sách thanh toán</Link>
          <Link href="/dieu-khoan-su-dung" className="hover:text-slate-300 transition-colors">Điều khoản sử dụng</Link>
        </div>
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name} - {siteConfig.legalName}. Khu vực phục vụ:{" "}
          {siteConfig.areasServed.join(", ")}.
        </p>
      </div>
    </footer>
  );
}
