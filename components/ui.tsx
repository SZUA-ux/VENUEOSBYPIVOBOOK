import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { clsx } from "clsx";

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
}) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-950":
        variant === "primary",
      "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:ring-slate-400":
        variant === "secondary",
      "text-slate-700 hover:bg-slate-100 focus:ring-slate-300":
        variant === "ghost",
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600":
        variant === "danger",
    },
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title || subtitle) && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">{eyebrow}</p>}
          {title && <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-3xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "brand";
}) {
  return (
    <span
      className={clsx("inline-flex rounded-full px-3 py-1 text-xs font-bold", {
        "bg-slate-100 text-slate-700": tone === "neutral",
        "bg-emerald-100 text-emerald-800": tone === "success",
        "bg-amber-100 text-amber-800": tone === "warning",
        "bg-rose-100 text-rose-800": tone === "danger",
        "bg-indigo-100 text-indigo-800": tone === "brand",
      })}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  detail,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
      {detail && (
        <p
          className={clsx("mt-2 text-sm", {
            "text-slate-500": tone === "neutral",
            "text-emerald-700": tone === "success",
            "text-amber-700": tone === "warning",
            "text-rose-700": tone === "danger",
          })}
        >
          {detail}
        </p>
      )}
    </Card>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div
        className="h-2 rounded-full bg-slate-950"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function FeatureGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item} className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
          <p className="font-semibold text-slate-900">{item}</p>
        </Card>
      ))}
    </div>
  );
}

export function IconCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <div className="mb-4 inline-flex rounded-2xl bg-slate-950 p-3 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{children}</p>
    </Card>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th className="px-5 py-4 font-bold" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={index} className="text-slate-700">
                {row.map((cell, cellIndex) => (
                  <td className="px-5 py-4" key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
