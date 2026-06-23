import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Button, Card, FeatureGrid, Section } from "@/components/ui";
import { coreFeatures } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "VenueOS Features - Booking, BEO, Menu, Itinerary and Payment Ledger Software",
  description:
    "Explore VenueOS feature groups for booking management, multi-suite calendars, quote builder, menu builder, BEOs, PDFs, WhatsApp links, email templates and reports.",
  path: "/features",
});

const groups = [
  {
    title: "Booking Management",
    items: ["Enquiry capture", "Viewing booked", "Quote sent", "Provisional holds", "Confirmed bookings", "Lost reasons"],
  },
  {
    title: "Multi-Event Wedding Builder",
    items: ["Nikah", "Mehndi", "Baraat", "Walima", "Sangeet", "Pheras", "Anand Karaj Reception"],
  },
  {
    title: "BEO / Function Sheets",
    items: ["Full BEO", "Kitchen sheet", "Floor sheet", "Decor sheet", "Supplier sheet", "Security sheet"],
  },
  {
    title: "Messages and PDFs",
    items: ["WhatsApp Web links", "Email modes", "PDF pack", "Quote PDF", "Client itinerary", "Manual copy mode"],
  },
];

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Feature groups"
        title="VenueOS connects sales, finance and event-day operations"
        subtitle="A serious B2B SaaS stack for venue teams that need booking data, menus, itineraries, BEOs, payments and reports to stay aligned."
      >
        <FeatureGrid items={coreFeatures} />
      </Section>
      <Section className="bg-white" title="Core operating areas">
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <Card key={group.title}>
              <Badge tone="brand">{group.title}</Badge>
              <div className="mt-5 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {group.items.map((item) => <span key={item}>- {item}</span>)}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/demo">Request Access</Button>
        </div>
      </Section>
    </MarketingShell>
  );
}
