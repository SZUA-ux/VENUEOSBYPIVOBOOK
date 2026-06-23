import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Button, Card, Section } from "@/components/ui";
import { createMetadata, JsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BEO Software for Wedding and Banqueting Venues",
  description:
    "VenueOS BEO software creates banquet event orders, function sheets, kitchen sheets, floor sheets, supplier sheets and mobile event-day views.",
  path: "/features/beo-software",
});

const outputs = ["Full BEO PDF", "Kitchen Sheet", "Floor Sheet", "Decor Sheet", "Supplier Sheet", "Security Sheet", "Mobile Coordinator View"];

export default function BeoSoftwarePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Features", item: "https://pivobook.com/features" },
            { "@type": "ListItem", position: 2, name: "BEO Software", item: "https://pivobook.com/features/beo-software" },
          ],
        }}
      />
      <Section
        eyebrow="BEO software"
        title="Banquet event orders and function sheets built from live venue data"
        subtitle="VenueOS compiles booking, quote, menu, itinerary, payment, decor, staff, supplier and cultural requirement data into one event-day source of truth."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <Card><Badge tone="brand">Definition</Badge><h2 className="mt-4 text-xl font-bold">What is BEO software?</h2><p className="mt-3 leading-7 text-slate-600">BEO software helps venues create banquet event orders or function sheets that tell every team what must happen before, during and after an event.</p></Card>
          <Card><Badge tone="warning">Warnings</Badge><h2 className="mt-4 text-xl font-bold">Readiness score</h2><p className="mt-3 leading-7 text-slate-600">VenueOS flags missing menu, unpaid balance, guest count gaps, staffing shortage, resource clash, segregation risk and timing clashes.</p></Card>
          <Card><Badge tone="success">Outputs</Badge><h2 className="mt-4 text-xl font-bold">Role-specific packs</h2><p className="mt-3 leading-7 text-slate-600">One BEO can generate kitchen, floor, decor, supplier, security and coordinator views without retyping details.</p></Card>
        </div>
      </Section>
      <Section className="bg-white" title="BEO outputs included">
        <div className="grid gap-4 md:grid-cols-3">
          {outputs.map((output) => <Card key={output}><p className="font-bold">{output}</p></Card>)}
        </div>
        <div className="mt-10 text-center"><Button href="/demo">See BEO Automation</Button></div>
      </Section>
    </MarketingShell>
  );
}
