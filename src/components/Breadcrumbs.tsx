import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

export default function Breadcrumbs({ items, dark = false }: { items: BreadcrumbItem[]; dark?: boolean }) {
  const full: BreadcrumbItem[] = [{ name: "Trang chủ", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <JsonLd data={breadcrumbJsonLd(full)} />
      <ol className="flex flex-wrap items-center gap-1">
        {full.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1">
            {index > 0 && (
              <span className={dark ? "text-slate-600" : "text-slate-400"}>/</span>
            )}
            {index === full.length - 1 ? (
              <span className={dark ? "font-medium text-slate-300" : "font-medium text-slate-700"}>
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className={
                  dark
                    ? "text-slate-500 transition-colors hover:text-brand-400"
                    : "text-slate-500 transition-colors hover:text-brand-600"
                }
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
