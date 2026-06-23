import type { Metadata } from "next";
import { product } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(product.domain),
  title: {
    default: product.name,
    template: `%s | ${product.name}`,
  },
  description: product.description,
  applicationName: product.name,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
