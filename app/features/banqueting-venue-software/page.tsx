import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Button, Card, Section } from "@/components/ui";
import { culturalTemplates } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Banqueting Venue Software for Asian and Multicultural Wedding Halls",
  description:
    "VenueOS supports banqueting venues with multi-event weddings, menus, segregation, prayer requirements, dietary requirements, staff planning and resource planning.",
  path: "/features/banqueting-venue-software",
});

export default function BanquetingVenueSoftwarePage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Banqueting venue software"
        title="Built for multi-suite, high-pressure banqueting operations"
        subtitle="VenueOS supports Asian wedding halls, Muslim wedding venues, Sikh wedding venues, Hindu wedding venues, hotels with banqueting halls and event venue groups."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {["Multi-event weddings", "Menus and allergens", "Segregation and prayer", "Staff/resource planning", "Décor and suppliers", "Owner reporting"].map((item) => (
            <Card key={item}><Badge tone="brand">{item}</Badge><p className="mt-4 leading-7 text-slate-600">Structured operational data that flows into BEOs, PDFs, messages and dashboards.</p></Card>
          ))}
        </div>
      </Section>
      <Section className="bg-white" title="Cultural quick-add templates">
        <div className="grid gap-5 md:grid-cols-2">
          {culturalTemplates.map((template) => (
            <Card key={template.culture}>
              <h2 className="text-xl font-bold">{template.culture}</h2>
              <p className="mt-3 leading-7 text-slate-600">{template.events.join(", ")}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center"><Button href="/demo">Start Venue Onboarding</Button></div>
      </Section>
    </MarketingShell>
  );
}
