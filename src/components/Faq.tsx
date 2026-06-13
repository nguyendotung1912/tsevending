import JsonLd from "./JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/content/categories";

export default function FaqSection({ faqs, title = "Câu hỏi thường gặp" }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-800 marker:content-none">
                <span className="flex items-center justify-between gap-2">
                  {faq.q}
                  <span className="text-brand-500 transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
