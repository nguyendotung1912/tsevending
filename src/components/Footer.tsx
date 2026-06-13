import Link from "next/link";
import { NAV_LINKS, siteConfig } from "@/content/site";
import { getFooterSiloLinks } from "@/content/categories";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
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

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Sản phẩm</h3>
          <ul className="space-y-2 text-sm">
            {getFooterSiloLinks().map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Trang</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
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
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name} - {siteConfig.legalName}. Khu vực phục vụ:{" "}
        {siteConfig.areasServed.join(", ")}.
      </div>
    </footer>
  );
}
