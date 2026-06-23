"use client";

import { useState } from "react";
import Image from "next/image";

interface ResultImage {
  id: string;
  thumb: string;
  url: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
}

export default function ImagePicker() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [images, setImages] = useState<ResultImage[]>([]);
  const [selected, setSelected] = useState<ResultImage | null>(null);
  const [copied, setCopied] = useState("");

  async function search() {
    setLoading(true);
    setError("");
    setSelected(null);
    setImages([]);
    try {
      const res = await fetch("/api/image-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra.");
        return;
      }
      setKeywords(data.keywords ?? []);
      setImages(data.images ?? []);
      if ((data.images ?? []).length === 0) setError("Không tìm thấy ảnh phù hợp. Thử nội dung khác.");
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Dán nội dung bài viết
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Dán đoạn nội dung hoặc tiêu đề bài viết vào đây..."
          className="w-full rounded-xl border border-slate-300 p-4 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <button
          onClick={search}
          disabled={loading || content.trim().length < 10}
          className="mt-3 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "Đang tìm ảnh..." : "🔍 Tìm 5 ảnh phù hợp"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {keywords.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">Từ khóa phát hiện:</span>
          {keywords.map((k) => (
            <span key={k} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              {k}
            </span>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                selected?.id === img.id ? "border-brand-600 ring-2 ring-brand-300" : "border-transparent hover:border-brand-300"
              }`}
            >
              <Image src={img.thumb} alt={img.alt} fill sizes="200px" className="object-cover" unoptimized />
              {selected?.id === img.id && (
                <span className="absolute right-1 top-1 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                  ✓ Đã chọn
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5 space-y-3">
          <p className="font-bold text-slate-900">Ảnh đã chọn</p>
          <p className="text-xs text-slate-500">
            Tác giả:{" "}
            <a href={selected.photographerUrl} target="_blank" rel="noopener" className="text-brand-700 underline">
              {selected.photographer}
            </a>{" "}
            trên Unsplash
          </p>
          <div className="space-y-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-600">URL ảnh (dán vào trường <code>image:</code> của bài viết)</p>
              <div className="flex gap-2">
                <input readOnly value={selected.url} className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs" />
                <button onClick={() => copy(selected.url, "url")} className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-900">
                  {copied === "url" ? "✓ Đã chép" : "Chép URL"}
                </button>
              </div>
            </div>
            <button
              onClick={() => copy(`image: "${selected.url}"\nimageAlt: "${selected.alt}"`, "fm")}
              className="rounded-lg border border-brand-300 px-4 py-2 text-xs font-bold text-brand-700 hover:bg-brand-50"
            >
              {copied === "fm" ? "✓ Đã chép frontmatter" : "Chép cả image + imageAlt (frontmatter)"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
