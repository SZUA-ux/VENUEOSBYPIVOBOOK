import { PortalShell } from "@/components/shell/portal-shell";

const appNav = [
  { label: "Dashboard", href: "/app/dashboard" },
  { label: "Onboarding", href: "/app/onboarding" },
  { label: "Calendar", href: "/app/calendar" },
  { label: "Enquiries", href: "/app/enquiries" },
  { label: "Bookings", href: "/app/bookings" },
  { label: "Quotes", href: "/app/quotes" },
  { label: "Menus", href: "/app/menus" },
  { label: "Itineraries", href: "/app/itineraries" },
  { label: "BEOs", href: "/app/beos" },
  { label: "Payments", href: "/app/payments" },
  { label: "Staff", href: "/app/staff" },
  { label: "Inventory", href: "/app/inventory" },
  { label: "Decor", href: "/app/decor" },
  { label: "Reports", href: "/app/reports" },
  { label: "Messages", href: "/app/messages" },
  { label: "Settings", href: "/app/settings" },
  { label: "Help", href: "/app/help" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      title="Venue App"
      subtitle="VenueOS Operations"
      navItems={appNav}
    >
      {children}
    </PortalShell>
  );
}
