import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: `https://pivobook.com/blog/${post.slug}`,
  };

  return (
    <article className="container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <p className="badge bg-slate-100 text-slate-700">{post.category}</p>
      <h1 className="section-title mt-4">{post.title}</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">{post.excerpt}</p>
      <div className="card mt-8 p-6 text-sm leading-7 text-slate-700">
        <p>
          This is a starter article template for the SEO resource hub. Replace this body
          with long-form operational guidance and internal links to feature and comparison
          pages.
        </p>
      </div>
    </article>
  );
}
