import { MarketingShell } from "@/components/MarketingShell";
import { Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Data Processing and GDPR - VenueOS by PivoBook.com",
  description: "Data processing and GDPR placeholder for VenueOS by PivoBook.com.",
  path: "/gdpr",
});

export default function GdprPage() {
  return (
    <MarketingShell>
      <Section eyebrow="Legal" title="Data Processing / GDPR" subtitle="Placeholder DPA and GDPR page for production legal review.">
        <Card><p className="leading-8 text-slate-700">The intended production architecture uses Supabase PostgreSQL with RLS, tenant-scoped tables, audit logs, soft deletes where required and controlled HQ access for support and administration.</p></Card>
      </Section>
    </MarketingShell>
  );
}
