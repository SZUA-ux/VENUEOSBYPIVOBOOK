import Link from "next/link";
import type { ReactNode } from "react";
import { marketingNav, product } from "@/lib/content";
import { Button } from "@/components/ui";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white">V</span>
            <span>{product.name}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
            {marketingNav.slice(0, -1).map((item) => (
              <Link href={item.href} key={item.href} className="hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden text-sm font-semibold text-slate-700 hover:text-slate-950 sm:block">
              Login
            </Link>
            <Button href="/demo">Book a Demo</Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <p className="font-black">{product.name}</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Venue-side SaaS for premium wedding, banqueting and event venues. No client portal. No client payment processing. Serious operations software for serious venues.
            </p>
          </div>
          <div>
            <p className="font-bold">Product</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/demo">Book a Demo</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-bold">Legal</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/gdpr">GDPR</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
