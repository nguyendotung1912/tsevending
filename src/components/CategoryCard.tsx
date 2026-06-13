import Link from "next/link";

interface CategoryCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function CategoryCard({ href, icon, title, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
      <span className="mt-4 text-sm font-semibold text-brand-600">Xem chi tiết →</span>
    </Link>
  );
}
