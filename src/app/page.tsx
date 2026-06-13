import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { SILOS, SOLUTIONS_SILO } from "@/content/categories";
import { getAllPostsMeta } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import Cta from "@/components/Cta";
import FaqSection from "@/components/Faq";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const generalFaqs = [
  {
    q: "TSE Vending cung cấp những sản phẩm gì?",
    a: "TSE Vending cung cấp hai dòng giải pháp chính: máy bán hàng tự động (nước giải khát, snack, hàng lạnh, gas...) và tủ locker thông minh (chung cư, văn phòng, trường học, logistics), kèm dịch vụ tư vấn vận hành.",
  },
  {
    q: "Khu vực nào được TSE Vending hỗ trợ lắp đặt và bảo trì?",
    a: `TSE Vending hỗ trợ lắp đặt và bảo trì tại ${siteConfig.areasServed.slice(0, -1).join(", ")} và đang mở rộng trên toàn quốc.`,
  },
  {
    q: "Làm sao để nhận tư vấn báo giá nhanh nhất?",
    a: `Bạn có thể gọi trực tiếp hotline ${siteConfig.phoneDisplay} hoặc điền form liên hệ trên website, đội ngũ TSE Vending sẽ phản hồi trong thời gian sớm nhất.`,
  },
];

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-600">
              Máy bán hàng tự động &amp; Tủ locker thông minh
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {siteConfig.legalName} thiết kế, sản xuất và vận hành máy bán hàng tự động & tủ locker
              thông minh cho chung cư, văn phòng, trường học, nhà máy và khu công nghiệp trên toàn quốc.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-600"
              >
                📞 Gọi tư vấn: {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/may-ban-hang-tu-dong"
                className="rounded-full border border-brand-600 px-6 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
              >
                Xem máy bán hàng tự động
              </Link>
              <Link
                href="/tu-locker-thong-minh"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                Xem tủ locker thông minh
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <div className="text-2xl font-extrabold text-brand-700">2</div>
                <div className="text-sm text-slate-500">Dòng giải pháp chính</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-brand-700">{siteConfig.areasServed.length - 1}+</div>
                <div className="text-sm text-slate-500">Khu vực phục vụ</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-brand-700">24/7</div>
                <div className="text-sm text-slate-500">Vận hành tự động</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {SILOS.flatMap((s) => s.subcategories.slice(0, 2)).map((sub) => (
                <div key={sub.slug} className="rounded-2xl bg-slate-50 p-4 text-center">
                  <div className="text-3xl">{sub.icon}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{sub.shortTitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SILOS OVERVIEW */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Giải pháp chính</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Hai nền tảng tự động hóa cho mọi không gian
            </h2>
          </div>

          {SILOS.map((silo) => (
            <div key={silo.slug} className="mb-12">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {silo.icon} {silo.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600">{silo.intro[0]}</p>
                </div>
                <Link
                  href={`/${silo.slug}`}
                  className="hidden whitespace-nowrap text-sm font-semibold text-brand-600 hover:underline sm:inline"
                >
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {silo.subcategories.map((sub) => (
                  <CategoryCard
                    key={sub.slug}
                    href={`/${silo.slug}/${sub.slug}`}
                    icon={sub.icon}
                    title={sub.title}
                    description={sub.metaDescription}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Đồng hành kinh doanh</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">{SOLUTIONS_SILO.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{SOLUTIONS_SILO.intro[0]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS_SILO.items.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${SOLUTIONS_SILO.slug}`}
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
            >
              Tìm hiểu giải pháp kinh doanh →
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      {latestPosts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Tin tức &amp; kiến thức</p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Bài viết mới nhất</h2>
              </div>
              <Link href="/tin-tuc" className="hidden whitespace-nowrap text-sm font-semibold text-brand-600 hover:underline sm:inline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={generalFaqs} />
      <Cta />
    </>
  );
}
