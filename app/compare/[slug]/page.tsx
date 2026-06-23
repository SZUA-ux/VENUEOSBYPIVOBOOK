import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/MarketingShell";
import { Button, Card, DataTable, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

const comparisons: Record<string, { title: string; description: string; other: string }> = {
  spreadsheets: {
    title: "VenueOS vs spreadsheets",
    description: "Compare connected venue operations software with spreadsheet-based booking and BEO management.",
    other: "Spreadsheets",
  },
  "generic-crm": {
    title: "VenueOS vs generic CRM",
    description: "Compare venue-specific booking, menu, BEO and payment ledger workflows with generic sales CRM tools.",
    other: "Generic CRM",
  },
  "wedding-planner-software": {
    title: "VenueOS vs wedding planner software",
    description: "VenueOS is built for venues and staff operations, not as a planning portal for couples.",
    other: "Wedding planner software",
  },
  "venue-tools": {
    title: "VenueOS vs venue tools",
    description: "A neutral comparison template for evaluating venue operations platforms.",
    other: "Other venue tools",
  },
};

export function generateMetadata({ params }: { params: { slug: string } }) {
  const comparison = comparisons[params.slug];
  if (!comparison) return {};
  return createMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${params.slug}`,
  });
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const comparison = comparisons[params.slug];
  if (!comparison) notFound();

  return (
    <MarketingShell>
      <Section eyebrow="Comparison" title={comparison.title} subtitle={comparison.description}>
        <Card className="mb-8">
          <h2 className="text-xl font-bold">Short answer</h2>
          <p className="mt-3 leading-8 text-slate-600">
            VenueOS is a venue-side operating system for bookings, multi-event weddings, BEOs, menus, itineraries, manual payment tracking, PDFs, messages and owner reporting.
          </p>
        </Card>
        <DataTable
          columns={["Capability", comparison.other, "VenueOS"]}
          rows={[
            ["Client portal", "May include customer-facing areas", "No V1 client portal; contacts only"],
            ["Payment handling", "May vary", "Manual ledger only for venue customer payments"],
            ["BEO outputs", "Often limited or separate", "Full BEO plus kitchen, floor, decor, supplier and security sheets"],
            ["Multicultural weddings", "Usually notes/custom fields", "Native cultural, dietary, prayer and segregation fields"],
            ["SaaS billing", "Depends on vendor", "Stripe Billing only for PivoBook charging venues"],
          ]}
        />
        <div className="mt-10 text-center"><Button href="/demo">Book a Demo</Button></div>
      </Section>
    </MarketingShell>
  );
}
