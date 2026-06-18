import JsonLd from "./JsonLd";
import { siteConfig } from "@/content/site";
import { reviews, aggregateRating } from "@/content/reviews";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-5 w-5 ${filled ? "text-amber-400" : "text-slate-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <div className={`flex gap-0.5 ${large ? "[&_svg]:h-7 [&_svg]:w-7" : ""}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= Math.round(rating)} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const reviewJsonLds = reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: r.author,
    },
    reviewBody: r.text,
    datePublished: r.date,
  }));

  return (
    <section className="bg-slate-50 py-20">
      {reviewJsonLds.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Phản hồi khách hàng</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Khách hàng nói gì về TSE Vending?
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Stars rating={aggregateRating.ratingValue} large />
            <div className="text-left">
              <span className="text-3xl font-extrabold text-slate-900">{aggregateRating.ratingValue}</span>
              <span className="ml-1 text-slate-400 text-lg">/5</span>
              <p className="text-sm text-slate-500">
                từ {aggregateRating.ratingCount} đánh giá của khách hàng
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Stars rating={r.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 italic">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-900">{r.author}</p>
                <p className="text-xs text-slate-500">{r.role}</p>
                <p className="text-xs font-medium text-brand-600">{r.company}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Trở thành đối tác của TSE Vending —{" "}
          <a href="/lien-he" className="font-semibold text-brand-600 hover:underline">
            liên hệ tư vấn miễn phí
          </a>
        </p>
      </div>
    </section>
  );
}
