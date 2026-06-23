import { MarketingShell } from "@/components/MarketingShell";
import { Button, Card, DataTable, Section } from "@/components/ui";
import { createMetadata, JsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Wedding Venue CRM for Enquiries, Viewings, Quotes and Bookings",
  description:
    "VenueOS is a wedding venue CRM for venue-side enquiry management, showrounds, quotes, provisional holds, bookings and follow-ups.",
  path: "/features/wedding-venue-crm",
});

export default function WeddingVenueCrmPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is wedding venue CRM?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wedding venue CRM is venue-side software for tracking enquiries, showrounds, quotes, provisional holds, follow-ups and confirmed bookings.",
              },
            },
          ],
        }}
      />
      <Section
        eyebrow="Wedding venue CRM"
        title="A CRM for venues, not a wedding planning app for couples"
        subtitle="External customers are contacts. They receive messages and PDFs, but there is no V1 client portal or customer login area."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {["Enquiries and lead sources", "Showrounds and viewings", "Quotes and follow-ups", "Provisional holds", "Deposit schedules", "Confirmed bookings"].map((item) => (
            <Card key={item}><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Track progress without losing operational context for menus, BEOs and payment ledger.</p></Card>
          ))}
        </div>
      </Section>
      <Section className="bg-white" title="VenueOS CRM compared with a generic CRM">
        <DataTable
          columns={["Need", "Generic CRM", "VenueOS"]}
          rows={[
            ["Suite availability", "Usually custom fields", "Native multi-suite calendar and conflict checks"],
            ["BEO readiness", "Not operational", "Readiness score, warnings and function sheet outputs"],
            ["Deposits and balances", "Sales notes", "Manual payment schedules and ledger entries"],
            ["Multicultural wedding data", "Buried in notes", "Native event, dietary, prayer and segregation fields"],
          ]}
        />
        <div className="mt-10 text-center"><Button href="/demo">Talk to PivoBook</Button></div>
      </Section>
    </MarketingShell>
  );
}
