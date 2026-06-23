import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { hqNav } from "@/lib/content";

export default function HqLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="PivoBook HQ" nav={hqNav}>
      {children}
    </AppShell>
  );
}
