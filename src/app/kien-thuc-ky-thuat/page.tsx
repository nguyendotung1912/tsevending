import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, absoluteUrl } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Cta from "@/components/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Kiến Thức Kỹ Thuật Smart Locker | TSE Vending",
  description:
    "Tổng hợp loạt bài kỹ thuật chuyên sâu về smart locker: cấu tạo, công nghệ mở khóa, phân loại, kiến trúc IoT và quy trình sản xuất — kèm sơ đồ nguyên lý.",
  path: "/kien-thuc-ky-thuat",
});

const breadcrumbs = [{ name: "Kiến thức kỹ thuật smart locker", path: "/kien-thuc-ky-thuat" }];

const CLUSTERS: { key: string; label: string; desc: string; slugs: string[] }[] = [
  {
    key: "A",
    label: "Cấu tạo & vật liệu",
    desc: "Giải phẫu các thành phần và vật liệu của một smart locker.",
    slugs: [
      "cau-tao-smart-locker-giai-phau-tu-locker-thong-minh",
      "co-cau-khoa-dien-tu-smart-locker",
      "he-thong-dien-nguon-smart-locker",
    ],
  },
  {
    key: "B",
    label: "Công nghệ mở khóa",
    desc: "Nguyên lý từng phương thức xác thực và luồng mở khóa.",
    slugs: [
      "smart-locker-mo-khoa-qr-pin-otp",
      "smart-locker-mo-khoa-rfid-nfc",
      "smart-locker-mo-khoa-van-tay",
      "smart-locker-mo-khoa-nhan-dien-khuon-mat",
      "smart-locker-mo-khoa-app-bluetooth-cloud",
    ],
  },
  {
    key: "C",
    label: "Phân loại theo ứng dụng",
    desc: "Các loại smart locker và đặc thù cấu tạo theo môi trường.",
    slugs: [
      "cac-loai-smart-locker-phan-loai-toan-dien",
      "smart-locker-lanh-kiem-soat-nhiet-do",
      "smart-locker-ngoai-troi-chong-nuoc-bui-pha",
    ],
  },
  {
    key: "D",
    label: "Kiến trúc hệ thống & sản xuất",
    desc: "Kiến trúc IoT, quy trình sản xuất và tiêu chuẩn chứng nhận.",
    slugs: [
      "kien-truc-iot-smart-locker-tu-tu-toi-dam-may",
      "quy-trinh-san-xuat-smart-locker",
      "tieu-chuan-chung-nhan-smart-locker",
    ],
  },
];

export default function KienThucKyThuatPage() {
  const all = getAllPostsMeta();
  const bySlug = new Map(all.map((p) => [p.slug, p]));

  const clusters = CLUSTERS.map((c) => ({
    ...c,
    posts: c.slugs.map((s) => bySlug.get(s)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
  }));

  const allPosts = clusters.flatMap((c) => c.posts);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, ...breadcrumbs])} />
      <JsonLd
        data={itemListJsonLd({
          name: "Kiến thức kỹ thuật smart locker",
          description: "Loạt bài kỹ thuật chuyên sâu về smart locker của TSE Vending.",
          path: "/kien-thuc-ky-thuat",
          items: allPosts.map((p, i) => ({
            name: p.title,
            url: absoluteUrl(`/tin-tuc/${p.slug}`),
            description: p.description,
            position: i + 1,
          })),
        })}
      />

      <PageHeader
        eyebrow="Kiến thức kỹ thuật"
        title="Kiến thức kỹ thuật chuyên sâu về Smart Locker"
        description="Loạt bài kỹ thuật về cấu tạo, công nghệ mở khóa, phân loại, kiến trúc IoT và quy trình sản xuất smart locker — mỗi bài kèm sơ đồ nguyên lý do TSE Vending biên soạn."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6">
          {clusters.map((c) => (
            <div key={c.key}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-extrabold text-white">
                  {c.key}
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{c.label}</h2>
                  <p className="text-sm text-slate-500">{c.desc}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/tin-tuc/${p.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-md"
                  >
                    <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">
                      {p.description}
                    </p>
                    <span className="mt-3 text-xs font-bold text-brand-600">Đọc bài →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p>
              Loạt bài do bộ phận kỹ thuật TSE Vending biên soạn. Các sơ đồ là sơ đồ nguyên lý/khối, mô tả đúng logic hoạt động.
              Tìm hiểu giải pháp: {" "}
              <Link href="/tu-locker-thong-minh" className="font-semibold text-brand-600 hover:underline">tủ locker thông minh</Link>
              {" · "}
              <Link href="/tu-locker-thong-minh/smart-locker-la-gi" className="font-semibold text-brand-600 hover:underline">smart locker là gì</Link>
              {" · "}
              <Link href="/bao-cao-thi-truong-smart-locker-viet-nam" className="font-semibold text-brand-600 hover:underline">báo cáo thị trường 2026</Link>.
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
