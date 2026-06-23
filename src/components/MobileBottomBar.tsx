import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.10)]">
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-1 items-center justify-center gap-1.5 bg-accent-500 py-3.5 text-sm font-bold text-white active:bg-accent-600"
        >
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Gọi tư vấn
        </a>
        <div className="w-px bg-slate-200" />
        <Link
          href="/lien-he"
          className="flex flex-1 items-center justify-center gap-1.5 bg-brand-700 py-3.5 text-sm font-bold text-white active:bg-brand-800"
        >
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Nhận báo giá
        </Link>
      </div>
    </div>
  );
}
