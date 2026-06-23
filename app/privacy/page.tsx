import { MarketingShell } from "@/components/MarketingShell";
import { Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy - VenueOS by PivoBook.com",
  description: "Privacy policy placeholder for VenueOS by PivoBook.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <Section eyebrow="Legal" title="Privacy Policy" subtitle="Placeholder content to be reviewed by legal counsel before production launch.">
        <Card><p className="leading-8 text-slate-700">VenueOS stores venue-side operational data, user profiles, contacts, booking data, generated messages, PDF metadata and support records in Supabase with tenant isolation and audit logging.</p></Card>
      </Section>
    </MarketingShell>
  );
}
