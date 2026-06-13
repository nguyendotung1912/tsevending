import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full: BreadcrumbItem[] = [{ name: "Trang chủ", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <JsonLd data={breadcrumbJsonLd(full)} />
      <ol className="flex flex-wrap items-center gap-1">
        {full.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1">
            {index > 0 && <span className="text-slate-400">/</span>}
            {index === full.length - 1 ? (
              <span className="text-slate-700 font-medium">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-brand-600 transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
