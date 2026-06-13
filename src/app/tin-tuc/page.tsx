import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { getAllPostsMeta } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: `Tin tức & Kiến thức Vending, Locker Thông Minh`,
  description: `Cập nhật tin tức, kiến thức và hướng dẫn về máy bán hàng tự động, tủ locker thông minh từ ${siteConfig.name}.`,
  path: "/tin-tuc",
});

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      <PageHeader
        eyebrow="Tin tức & kiến thức"
        title="Tin tức & Kiến thức Vending, Locker Thông Minh"
        description="Cập nhật xu hướng, kiến thức vận hành và hướng dẫn lựa chọn máy bán hàng tự động, tủ locker thông minh tại Việt Nam."
        breadcrumbs={[{ name: "Tin tức", path: "/tin-tuc" }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-slate-500">Chưa có bài viết. Nội dung mới sẽ được cập nhật hàng ngày.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
