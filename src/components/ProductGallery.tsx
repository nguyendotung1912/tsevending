"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  title: string;
  siloSlug: string;
  subSlug: string;
}

function normalizeSlug(slug: string): string {
  return slug
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-z0-9-]/g, "")
    .toLowerCase();
}

export default function ProductGallery({ title, siloSlug, subSlug }: ProductGalleryProps) {
  const folder = normalizeSlug(subSlug);
  const base = `/images/products/${siloSlug}/${folder}`;

  // Bump `v` whenever the underlying 01/02/03.jpg are replaced — the images are
  // cached 30 days (see public/_headers), so reusing the same filename without a
  // new query string would keep serving the old (stock) photo from edge/browser.
  const v = "2";
  // Serve the smaller WebP siblings (≈30-40% lighter than the .jpg) — improves
  // the gallery LCP image on mobile. All product folders have fresh 0N.webp.
  const allImages = [
    { src: `${base}/01.webp?v=${v}`, alt: `${title} — hình ảnh thực tế 1` },
    { src: `${base}/02.webp?v=${v}`, alt: `${title} — hình ảnh thực tế 2` },
    { src: `${base}/03.webp?v=${v}`, alt: `${title} — hình ảnh thực tế 3` },
  ];

  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  function markFailed(idx: number) {
    setFailed((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }

  const visible = allImages.map((img, i) => ({ ...img, originalIdx: i })).filter((_, i) => !failed.has(i));
  if (visible.length === 0) return null;

  const clampedActive = Math.min(active, visible.length - 1);
  const mainImg = visible[clampedActive];

  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main image */}
        <div className="relative h-64 sm:h-[420px] overflow-hidden rounded-2xl bg-brand-900">
          <Image
            key={mainImg.src}
            src={mainImg.src}
            alt={mainImg.alt}
            fill
            priority
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 75vw"
            onError={() => {
              markFailed(mainImg.originalIdx);
              setActive(0);
            }}
          />
          {/* Image counter badge */}
          {visible.length > 1 && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {clampedActive + 1} / {visible.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {visible.length > 1 && (
          <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${visible.length}, 1fr)` }}>
            {visible.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setActive(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                className={`relative h-20 sm:h-28 overflow-hidden rounded-xl transition-all duration-200 ${
                  i === clampedActive
                    ? "ring-2 ring-brand-500 ring-offset-2 opacity-100"
                    : "opacity-55 hover:opacity-90 hover:ring-1 hover:ring-brand-300 hover:ring-offset-1"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                  onError={() => markFailed(img.originalIdx)}
                />
              </button>
            ))}
          </div>
        )}

        <p className="mt-3 text-center text-xs text-slate-400">
          {title} — ảnh tham khảo thực tế triển khai
        </p>
      </div>
    </section>
  );
}
