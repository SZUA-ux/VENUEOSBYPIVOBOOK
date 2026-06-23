import { PortalShell } from "@/components/shell/portal-shell";

const hqNav = [
  { label: "Dashboard", href: "/hq" },
  { label: "Venues", href: "/hq/venues" },
  { label: "Demo Requests", href: "/hq/demo-requests" },
  { label: "Subscriptions", href: "/hq/subscriptions" },
  { label: "MRR", href: "/hq/mrr" },
  { label: "Support", href: "/hq/support" },
  { label: "Problem Radar", href: "/hq/problem-radar" },
  { label: "Onboarding", href: "/hq/onboarding" },
  { label: "Templates", href: "/hq/templates" },
  { label: "Settings", href: "/hq/settings" },
  { label: "Activity", href: "/hq/activity" },
];

export default function HqLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      title="PivoBook HQ"
      subtitle="Internal Admin Panel"
      navItems={hqNav}
    >
      {children}
    </PortalShell>
  );
}
