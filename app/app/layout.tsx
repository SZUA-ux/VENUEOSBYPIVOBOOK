import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { appNav } from "@/lib/content";

export default function VenueAppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Venue App" nav={appNav}>
      {children}
    </AppShell>
  );
}
