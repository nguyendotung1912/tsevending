import Link from "next/link";
import { mainAuthor } from "@/content/authors";

// E-E-A-T byline — surfaces the human expert behind technical content and links
// to their bio (Person schema lives on /gioi-thieu#author and in articleJsonLd).
export default function AuthorByline({ updated }: { updated?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
      <span>
        Nội dung chuyên môn bởi{" "}
        <Link href="/gioi-thieu#nguyen-do-tung" className="font-semibold text-brand-600 hover:underline">
          {mainAuthor.name}
        </Link>
        {" — "}
        {mainAuthor.jobTitle}
      </span>
      {updated && (
        <>
          <span className="text-slate-300">·</span>
          <span>Cập nhật {updated}</span>
        </>
      )}
    </div>
  );
}
