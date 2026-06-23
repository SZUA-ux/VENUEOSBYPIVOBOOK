import type { Metadata } from "next";
import { PRODUCT_NAME, SITE_URL } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: MetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${PRODUCT_NAME}`,
      description,
      url,
      siteName: PRODUCT_NAME,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: PRODUCT_NAME }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${PRODUCT_NAME}`,
      description,
      images: ["/og-image.svg"],
    },
  };
}
