import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "VenueOS Resources - Venue Operations, BEO Guides and Wedding Venue Sales",
  description:
    "SEO resource hub for venue operations, BEO guides, wedding venue sales, banqueting venue management, payment tracking and multicultural weddings.",
  path: "/blog",
});

const categories = [
  "Venue operations",
  "BEO guides",
  "Wedding venue sales",
  "Banqueting venue management",
  "Payment tracking",
  "Multicultural weddings",
  "Menu planning",
  "Staff and resource planning",
];

const articles = [
  {
    slug: "what-is-beo-software",
    title: "What is BEO software?",
    summary: "A direct guide to banquet event orders, function sheets and operational readiness.",
  },
  {
    slug: "how-venues-track-deposits-and-balances",
    title: "How do venues track deposits and balances?",
    summary: "Why manual ledgers still matter when venues take cash, transfer, cheque or card-machine payments.",
  },
  {
    slug: "multicultural-wedding-operations-checklist",
    title: "Multicultural wedding operations checklist",
    summary: "Segregation, prayer, dietary, supplier and family-side requirements venues should not bury in notes.",
  },
];

export default function BlogPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Resources"
        title="Practical guides for premium venue operators"
        subtitle="Content designed for search and answer engines, focused on venue-side operations rather than couple planning."
      >
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => <Badge key={category}>{category}</Badge>)}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/blog/${article.slug}`} key={article.slug}>
              <Card className="h-full hover:border-slate-400">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{article.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </MarketingShell>
  );
}
