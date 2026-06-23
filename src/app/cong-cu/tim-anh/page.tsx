import type { Metadata } from "next";
import ImagePicker from "@/components/ImagePicker";

export const metadata: Metadata = {
  title: "Công cụ tìm ảnh minh họa",
  // Internal tool — keep it out of Google.
  robots: { index: false, follow: false },
};

export default function ImageSearchToolPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Tìm ảnh minh họa cho bài viết</h1>
        <p className="mt-2 mb-8 text-slate-600">
          Dán nội dung bài viết, hệ thống phân tích từ khóa và gợi ý 5 ảnh từ Unsplash. Chọn ảnh
          rồi chép URL dán vào bài viết.
        </p>
        <ImagePicker />
      </div>
    </section>
  );
}
