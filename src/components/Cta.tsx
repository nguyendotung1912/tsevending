import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Cần tư vấn giải pháp phù hợp với mặt bằng của bạn?
          </h2>
          <p className="mt-2 text-sm text-brand-200">
            Đội kỹ thuật TSE Vending khảo sát vị trí, báo giá và tư vấn cấu hình thiết bị — không tính phí.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-600"
          >
            Gọi ngay {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/lien-he"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Gửi yêu cầu tư vấn
          </Link>
        </div>
      </div>
    </section>
  );
}
