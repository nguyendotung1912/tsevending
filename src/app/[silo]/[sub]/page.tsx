import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getAllCategorySlugs, getSubcategory } from "@/content/categories";
import { getPostsBySilo } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import FaqSection from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllCategorySlugs()
    .filter((entry) => entry.sub)
    .map((entry) => ({ silo: entry.silo, sub: entry.sub as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string; sub: string }>;
}): Promise<Metadata> {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) return {};
  const { sub } = result;
  return buildMetadata({
    title: sub.metaTitle,
    description: sub.metaDescription,
    path: `/${siloSlug}/${subSlug}`,
  });
}

const investmentTierLabels: Record<string, { label: string; color: string; desc: string }> = {
  "Thấp": { label: "Vốn thấp", color: "text-emerald-700 bg-emerald-50 border-emerald-200", desc: "Phù hợp nhà đầu tư mới hoặc muốn thử nghiệm với rủi ro tài chính thấp." },
  "Trung bình": { label: "Vốn trung bình", color: "text-amber-700 bg-amber-50 border-amber-200", desc: "Phù hợp nhà đầu tư có ngân sách vừa, tìm cân bằng giữa chi phí và tiềm năng sinh lời." },
  "Cao": { label: "Vốn cao", color: "text-red-700 bg-red-50 border-red-200", desc: "Dành cho nhà đầu tư dài hạn muốn khai thác vị trí có lưu lượng lớn với lợi nhuận tiềm năng cao." },
};

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ silo: string; sub: string }>;
}) {
  const { silo: siloSlug, sub: subSlug } = await params;
  const result = getSubcategory(siloSlug, subSlug);
  if (!result) notFound();
  const { silo, sub } = result;

  const posts = getPostsBySilo(silo.slug, sub.slug).slice(0, 6);
  const siblings = silo.subcategories.filter((s) => s.slug !== sub.slug);
  const tier = investmentTierLabels[sub.investmentTier] ?? investmentTierLabels["Trung bình"];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: sub.title,
          description: sub.metaDescription,
          path: `/${silo.slug}/${sub.slug}`,
        })}
      />
      <PageHeader
        eyebrow={silo.title}
        title={sub.h1}
        description={sub.intro[0]}
        breadcrumbs={[
          { name: silo.title, path: `/${silo.slug}` },
          { name: sub.title, path: `/${silo.slug}/${sub.slug}` },
        ]}
      />

      {/* ── MAIN CONTENT ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left column */}
            <div className="lg:col-span-2">
              {/* Extended intro */}
              <div className="prose prose-slate max-w-none">
                {sub.intro.slice(1).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {/* Features */}
              <h2 className="mt-10 mb-5 text-xl font-extrabold text-slate-900">
                Tính năng nổi bật của {sub.title.toLowerCase()}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {sub.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                  >
                    <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right sidebar */}
            <aside className="space-y-5">
              {/* Ideal for */}
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Phù hợp nhất với</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{sub.idealFor}</p>
              </div>

              {/* Investment tier */}
              <div className={`rounded-2xl border p-5 ${tier.color}`}>
                <p className="text-xs font-bold uppercase tracking-wider">Mức đầu tư</p>
                <p className="mt-1 text-base font-extrabold">{tier.label}</p>
                <p className="mt-2 text-xs leading-relaxed">{tier.desc}</p>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <p className="text-sm font-bold text-accent-900">Nhận báo giá {sub.title.toLowerCase()}</p>
                <p className="mt-2 text-xs leading-relaxed text-accent-800">
                  Liên hệ TSE Vending để được khảo sát vị trí và báo giá cụ thể — không phát sinh chi phí tư vấn.
                </p>
                <Link
                  href="/lien-he"
                  className="mt-4 block rounded-xl bg-accent-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-accent-600"
                >
                  Nhận báo giá ngay →
                </Link>
              </div>

              {/* Siblings */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cùng nhóm {silo.shortTitle}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${silo.slug}/${s.slug}`}
                        className="flex items-center gap-2 text-sm text-brand-700 hover:underline"
                      >
                        <span>{s.icon}</span>
                        <span>{s.shortTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/${silo.slug}`} className="mt-5 inline-block text-xs font-semibold text-brand-600 hover:underline">
                  ← Toàn bộ {silo.title.toLowerCase()}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD INVEST ── */}
      <section className="border-t border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-3 text-2xl font-extrabold text-slate-900">
            Ai nên đầu tư {sub.title.toLowerCase()}?
          </h2>
          <p className="mb-8 max-w-3xl text-slate-600">
            {sub.title} phù hợp với nhiều đối tượng khác nhau — từ doanh nghiệp muốn nâng cao tiện ích nội bộ đến nhà đầu tư tìm kiếm nguồn thu nhập thụ động ổn định. Dưới đây là các nhóm đối tượng thường triển khai thành công giải pháp này.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Chủ mặt bằng & ban quản lý tòa nhà",
                desc: `Nếu bạn đang quản lý tòa nhà văn phòng, chung cư hoặc khu công nghiệp, ${sub.title.toLowerCase()} là tiện ích gia tăng giúp nâng cao chất lượng dịch vụ mà không cần nhân sự vận hành thêm. Nhiều chủ mặt bằng chọn mô hình hợp tác chia sẻ doanh thu với TSE Vending để không cần bỏ vốn đầu tư.`,
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Nhà đầu tư cá nhân",
                desc: `Đầu tư ${sub.title.toLowerCase()} là mô hình kinh doanh bán thụ động phù hợp với cá nhân có nguồn vốn 30-200 triệu đồng và muốn có thêm nguồn thu nhập không cần trông coi liên tục. Yêu cầu chính là tìm được vị trí tốt và chọn đúng dòng sản phẩm phù hợp.`,
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Doanh nghiệp muốn nâng cao phúc lợi nhân viên",
                desc: `Nhiều doanh nghiệp đầu tư ${sub.title.toLowerCase()} như một phần của gói phúc lợi nhân viên — tăng sự hài lòng và giữ chân nhân tài mà chi phí thấp hơn nhiều so với các hình thức phúc lợi truyền thống. Với dòng máy thấp hoặc trung bình, đây là đầu tư một lần mang lại lợi ích lâu dài.`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO EVALUATE ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                5 câu hỏi cần trả lời trước khi đầu tư
              </h2>
              <p className="mt-3 text-slate-600">
                Trước khi quyết định đầu tư {sub.title.toLowerCase()}, hãy tự hỏi và tìm câu trả lời cho 5 câu hỏi thực tế sau để đảm bảo quyết định đúng đắn và tránh rủi ro không cần thiết.
              </p>
              <ol className="mt-6 space-y-4">
                {[
                  {
                    q: "Lưu lượng người tại vị trí đặt là bao nhiêu?",
                    a: "Đây là yếu tố số một quyết định doanh thu. Vị trí tốt có từ 150-200 người qua lại hàng ngày, ổn định theo các ngày trong tuần."
                  },
                  {
                    q: "Có đối thủ cạnh tranh trực tiếp trong bán kính 50m không?",
                    a: "Nếu đã có cửa hàng tiện lợi hoặc căng-tin trong cùng tòa nhà, cần phân tích kỹ điểm khác biệt (giờ hoạt động, loại sản phẩm, giá) trước khi quyết định."
                  },
                  {
                    q: "Nguồn điện tại vị trí có ổn định 24/7 không?",
                    a: "Máy hoạt động liên tục đòi hỏi nguồn điện ổn định. Cần xác nhận với chủ mặt bằng về việc tiếp điện và ai chịu chi phí điện theo hợp đồng."
                  },
                  {
                    q: "Mô hình hợp tác nào phù hợp nhất với bạn?",
                    a: "Mua đứt để sở hữu toàn bộ lợi nhuận, thuê theo tháng để giảm vốn ban đầu, hay hợp tác chia sẻ doanh thu để không cần vốn thiết bị?"
                  },
                  {
                    q: "Ai sẽ bổ sung hàng và xử lý sự cố thường ngày?",
                    a: "Nếu bạn không tự vận hành, hãy tính chi phí thuê nhân viên tiếp hàng hoặc chọn mô hình TSE Vending vận hành toàn bộ."
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Quy trình triển khai từ tư vấn đến vận hành
              </h2>
              <p className="mt-3 text-slate-600">
                TSE Vending đồng hành từ bước đầu đến khi hệ thống hoạt động ổn định. Quy trình tiêu chuẩn cho một dự án {sub.title.toLowerCase()} như sau:
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { num: "01", title: "Liên hệ & xác định nhu cầu", desc: "Chia sẻ thông tin về vị trí, mục tiêu và ngân sách. Đội tư vấn phản hồi trong 2 giờ làm việc." },
                  { num: "02", title: "Khảo sát thực địa miễn phí", desc: "Kỹ thuật viên đến khảo sát vị trí, đề xuất cấu hình tối ưu và lập báo giá chi tiết không ràng buộc." },
                  { num: "03", title: "Ký hợp đồng & lên lịch lắp đặt", desc: "Hợp đồng ghi rõ phạm vi, thời gian lắp đặt, bảo hành và điều khoản hỗ trợ kỹ thuật cụ thể." },
                  { num: "04", title: "Lắp đặt & chạy thử", desc: "Lắp đặt hoàn chỉnh trong 1-3 ngày tùy quy mô. Kiểm tra toàn bộ chức năng và đào tạo vận hành cơ bản." },
                  { num: "05", title: "Bàn giao & hỗ trợ dài hạn", desc: "Hệ thống IoT giám sát tự động. Bảo trì định kỳ và hỗ trợ kỹ thuật 24/7 theo điều khoản hợp đồng." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold text-white">
                      {step.num}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TSE FOR THIS PRODUCT ── */}
      <section className="border-t border-slate-100 bg-brand-700 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-3 text-2xl font-extrabold">
            Tại sao chọn TSE Vending cho {sub.title.toLowerCase()}?
          </h2>
          <p className="mb-10 max-w-3xl text-brand-200">
            TSE Vending không chỉ bán thiết bị — chúng tôi là đối tác vận hành dài hạn. Với kinh nghiệm triển khai hàng trăm điểm máy trên toàn quốc, chúng tôi hiểu rõ những gì tạo ra sự khác biệt giữa một điểm máy hoạt động tốt và một điểm máy thất bại.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Sản phẩm nội địa", desc: "Sản xuất tại Việt Nam, linh kiện thay thế luôn sẵn có. Không phải chờ linh kiện nhập từ nước ngoài khi máy cần bảo trì." },
              { title: "IoT tích hợp toàn phần", desc: "Giám sát từ xa 24/7, cảnh báo tự động về tồn kho và lỗi kỹ thuật. Quản lý nhiều điểm máy từ một dashboard duy nhất." },
              { title: "Hỗ trợ kỹ thuật 24/7", desc: "Đội kỹ thuật trực sẵn hỗ trợ từ xa và điều phối tại chỗ trong 24 giờ. Mạng lưới kỹ thuật viên tại 5 tỉnh thành lớn." },
              { title: "Bảo hành & bảo trì rõ ràng", desc: "Chính sách bảo hành ghi rõ trong hợp đồng. Gói bảo trì định kỳ giúp tối đa thời gian hoạt động của máy." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-brand-600 p-5">
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-200">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/lien-he"
              className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
            >
              Liên hệ nhận báo giá →
            </Link>
            <Link
              href={`/${silo.slug}`}
              className="rounded-full border-2 border-brand-300 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Xem thêm {silo.title.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {posts.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-6 text-xl font-extrabold text-slate-900">
              Bài viết chuyên sâu về {sub.title.toLowerCase()}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPLORE MORE ── */}
      <section className={`py-14 ${posts.length > 0 ? "border-t border-slate-100 bg-slate-50" : ""}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-extrabold text-slate-900">Khám phá thêm trong {silo.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <CategoryCard
                key={s.slug}
                href={`/${silo.slug}/${s.slug}`}
                icon={s.icon}
                title={s.title}
                description={s.metaDescription}
              />
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={sub.faqs} title={`Câu hỏi thường gặp về ${sub.title.toLowerCase()}`} />
      <Cta />
    </>
  );
}
