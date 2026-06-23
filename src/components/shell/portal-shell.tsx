import Link from "next/link";

type NavItem = { label: string; href: string };

export function PortalShell({
  title,
  subtitle,
  navItems,
  children,
}: {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="shell-layout">
      <aside className="shell-sidebar">
        <p className="text-xs uppercase tracking-wide text-slate-400">{subtitle}</p>
        <h1 className="mt-2 text-lg font-semibold">{title}</h1>
        <nav className="mt-6 flex flex-col gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-slate-200 hover:bg-[var(--sidebar-muted)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="shell-main">{children}</section>
    </div>
  );
}
