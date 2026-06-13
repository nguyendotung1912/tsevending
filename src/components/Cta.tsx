import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Cta() {
  return (
    <section className="bg-brand-700 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Cần tư vấn giải pháp vending phù hợp với mặt bằng của bạn?
          </h2>
          <p className="mt-2 text-brand-100">
            Liên hệ TSE Vending để được khảo sát vị trí, báo giá và tư vấn mô hình hợp tác miễn phí.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            📞 Gọi ngay {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/lien-he"
            className="rounded-full border border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-brand-700"
          >
            Gửi yêu cầu tư vấn
          </Link>
        </div>
      </div>
    </section>
  );
}
