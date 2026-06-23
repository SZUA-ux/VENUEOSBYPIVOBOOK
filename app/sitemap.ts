import type { MetadataRoute } from "next";
import { product, publicPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicPages.map((page) => ({
    url: new URL(page.path, product.domain).toString(),
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
