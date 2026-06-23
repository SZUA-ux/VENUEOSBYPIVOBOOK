import Link from "next/link";
import { PRODUCT_NAME, PUBLIC_NAV } from "@/lib/site";

export function PublicFrame({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="border-b border-slate-200 bg-white/95">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="font-semibold tracking-tight">
            {PRODUCT_NAME}
          </Link>
          <nav className="hidden gap-5 text-sm text-slate-700 md:flex">
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <Link href="/login" className="button-secondary">
              Login
            </Link>
            <Link href="/demo" className="button-primary">
              Book a Demo
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="container flex flex-col gap-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>{PRODUCT_NAME} - Built for premium wedding and banqueting venues.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
