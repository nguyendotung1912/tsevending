import Breadcrumbs from "./Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/seo";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHeader({ eyebrow, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
      {/* Subtle brand accent — top bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600" />
      {/* Soft glow behind the title area */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-12">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && (
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
