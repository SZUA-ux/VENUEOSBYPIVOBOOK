import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Blog and resources",
  description:
    "Guides for venue operations, BEO workflows, payment tracking and multicultural wedding logistics.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="container py-16">
      <h1 className="section-title">Venue operations resources</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">
        Practical guides built for venue owners, managers and operations teams.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((category) => (
          <span key={category} className="badge bg-slate-100 text-slate-700">
            {category}
          </span>
        ))}
      </div>
      <div className="mt-8 grid gap-4">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {post.category}
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="muted mt-2 text-sm">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
