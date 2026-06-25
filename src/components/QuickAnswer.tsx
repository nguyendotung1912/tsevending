// "Trả lời nhanh" callout — a visually-distinct 40-60 word direct answer at the
// top of a page, optimized for Google featured snippets & AI Overview extraction.
export default function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-brand-500 bg-brand-50 p-5">
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-brand-600">Trả lời nhanh</p>
      <p className="text-sm leading-relaxed text-slate-700">{children}</p>
    </div>
  );
}
