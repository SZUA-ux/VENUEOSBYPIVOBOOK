import Link from "next/link";
import type { ReactNode } from "react";
import { product } from "@/lib/content";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/" className="font-black">{product.name}</Link>
        <h1 className="mt-8 text-3xl font-black">{title}</h1>
        <p className="mt-3 leading-7 text-slate-600">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

export function AuthFields({ mode }: { mode: "login" | "signup" | "forgot" | "reset" | "invite" }) {
  return (
    <form className="grid gap-4">
      {mode !== "reset" && mode !== "invite" && (
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Email
          <input className="form-field" type="email" required />
        </label>
      )}
      {mode === "signup" && (
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Venue / organisation name
          <input className="form-field" required />
        </label>
      )}
      {(mode === "login" || mode === "signup" || mode === "reset" || mode === "invite") && (
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Password
          <input className="form-field" type="password" required />
        </label>
      )}
      <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
        Continue
      </button>
      <p className="text-sm leading-6 text-slate-500">
        Supabase Auth wiring is prepared in the backend layer. Production login actions should enforce HQ and venue route permissions by profile user_type and role.
      </p>
    </form>
  );
}
