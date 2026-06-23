import Link from "next/link";
import type { ReactNode } from "react";
import { product } from "@/lib/content";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function AppShell({
  title,
  nav,
  children,
}: {
  title: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-800 bg-slate-950 text-white">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-white/10 p-5">
            <Link href="/" className="flex items-center gap-3 font-black">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-400 text-slate-950">V</span>
              <span>{product.shortName}</span>
            </Link>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{title}</p>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4 text-xs leading-6 text-slate-400">
            Venue customers are contacts only. VenueOS does not process their payments.
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{title}</p>
              <h1 className="text-xl font-black tracking-tight sm:text-2xl">{product.name}</h1>
            </div>
            <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
              Account
            </Link>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
