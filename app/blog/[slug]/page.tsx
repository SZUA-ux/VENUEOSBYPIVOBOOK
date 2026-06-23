import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/MarketingShell";
import { Card, Section } from "@/components/ui";
import { createMetadata, JsonLd } from "@/lib/seo";

const articles: Record<string, { title: string; description: string; points: string[] }> = {
  "what-is-beo-software": {
    title: "What is BEO software?",
    description: "BEO software creates banquet event orders and function sheets that align venue teams before event day.",
    points: [
      "It turns booking, menu, itinerary, decor, supplier and payment readiness data into a single source of truth.",
      "It should create different outputs for kitchen, floor, security, decor, suppliers and coordinators.",
      "For wedding venues, readiness warnings are as important as the PDF itself.",
    ],
  },
  "how-venues-track-deposits-and-balances": {
    title: "How do venues track deposits and balances?",
    description: "Venues track deposits and balances with agreed totals, due schedules and manually logged payment entries.",
    points: [
      "VenueOS does not process payments from venue customers.",
      "The balance due is agreed booking total minus manually logged payments.",
      "Every payment edit or deletion should be visible in the activity log.",
    ],
  },
  "multicultural-wedding-operations-checklist": {
    title: "Multicultural wedding operations checklist",
    description: "A checklist for Muslim, Sikh, Hindu, Pakistani and multicultural wedding venue operations.",
    points: [
      "Confirm segregation, prayer area, dietary and alcohol-free requirements early.",
      "Track bride-side and groom-side guest counts separately when needed.",
      "Surface requirements in BEOs and role-specific sheets, not just internal notes.",
    ],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) return {};
  return createMetadata({
    title: `${article.title} - VenueOS Resources`,
    description: article.description,
    path: `/blog/${params.slug}`,
  });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();

  return (
    <MarketingShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          author: { "@type": "Organization", name: "PivoBook.com" },
        }}
      />
      <Section eyebrow="VenueOS resources" title={article.title} subtitle={article.description}>
        <div className="mx-auto grid max-w-3xl gap-4">
          {article.points.map((point) => (
            <Card key={point}><p className="leading-8 text-slate-700">{point}</p></Card>
          ))}
        </div>
      </Section>
    </MarketingShell>
  );
}
