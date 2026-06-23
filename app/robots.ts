import type { MetadataRoute } from "next";
import { product } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features", "/pricing", "/demo", "/contact", "/blog", "/compare"],
        disallow: ["/hq", "/app", "/login", "/signup", "/reset-password"],
      },
    ],
    sitemap: `${product.domain}/sitemap.xml`,
    host: product.domain,
  };
}
