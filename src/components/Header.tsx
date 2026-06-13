"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, siteConfig } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-brand-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            TS
          </span>
          <span>
            TSE <span className="text-accent-500">Vending</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-600 transition-colors">
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            📞 {siteConfig.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
          aria-label="Mở menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-brand-600 transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-1 inline-block rounded-full bg-accent-500 px-5 py-2.5 text-center text-sm font-bold text-white"
            >
              📞 {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
