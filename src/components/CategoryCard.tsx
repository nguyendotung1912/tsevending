"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CategoryCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export default function CategoryCard({ href, icon, title, description, image }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = image && !imgError;

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-brand-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image / Gradient header */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 flex-shrink-0">
        {showImage && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        {!showImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-40">{icon}</span>
          </div>
        )}
        {/* Gradient overlay — text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
        {/* Icon badge bottom-left */}
        <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl backdrop-blur-sm ring-1 ring-white/20">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-extrabold leading-snug text-slate-900 group-hover:text-brand-700">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition-all group-hover:gap-2">
          Xem chi tiết
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
