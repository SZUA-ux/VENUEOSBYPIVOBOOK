import { MarketingShell } from "@/components/MarketingShell";
import { Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Policy - VenueOS by PivoBook.com",
  description: "Cookie policy placeholder for VenueOS by PivoBook.com.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <MarketingShell>
      <Section eyebrow="Legal" title="Cookie Policy" subtitle="Placeholder cookie policy for production review.">
        <Card><p className="leading-8 text-slate-700">VenueOS will use essential cookies for authentication and security. Analytics or marketing cookies should be configured with consent controls before launch.</p></Card>
      </Section>
    </MarketingShell>
  );
}
