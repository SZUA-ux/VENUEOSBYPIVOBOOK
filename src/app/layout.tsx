import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pivobook.com"),
  title: {
    default: "VenueOS by PivoBook.com",
    template: "%s | VenueOS by PivoBook.com",
  },
  description:
    "VenueOS by PivoBook.com is the operating system for wedding and banqueting venues.",
  openGraph: {
    title: "VenueOS by PivoBook.com",
    description:
      "Manage enquiries, bookings, BEOs, menus, itineraries, and payment tracking from one command centre.",
    url: "https://pivobook.com",
    siteName: "VenueOS by PivoBook.com",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "VenueOS" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VenueOS by PivoBook.com",
    description:
      "The operating system for premium wedding and banqueting venues.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
