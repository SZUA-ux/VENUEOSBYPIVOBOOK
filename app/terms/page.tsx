import { MarketingShell } from "@/components/MarketingShell";
import { Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms - VenueOS by PivoBook.com",
  description: "Terms placeholder for VenueOS by PivoBook.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <MarketingShell>
      <Section eyebrow="Legal" title="Terms" subtitle="Placeholder terms to be replaced by production legal terms.">
        <Card><p className="leading-8 text-slate-700">VenueOS is supplied to venues as SaaS. PivoBook charges venues for the software subscription. VenueOS does not process payments from a venue&apos;s event customers.</p></Card>
      </Section>
    </MarketingShell>
  );
}
