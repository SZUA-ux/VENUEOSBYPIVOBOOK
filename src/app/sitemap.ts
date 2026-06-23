import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/features",
    "/features/beo-software",
    "/features/wedding-venue-crm",
    "/features/banqueting-venue-software",
    "/pricing",
    "/demo",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/accept-invite",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
