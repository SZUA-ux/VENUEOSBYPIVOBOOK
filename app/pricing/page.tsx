import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Button, Card, Section } from "@/components/ui";
import { pricingPlans } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "VenueOS Pricing - Subscription Plans for Wedding and Banqueting Venues",
  description:
    "Starter, Pro and Group pricing for VenueOS by PivoBook.com. Stripe Billing charges venues for SaaS subscriptions only; VenueOS does not process venue client payments.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Pricing"
        title="Subscription pricing for premium event venues"
        subtitle="PivoBook charges venues for VenueOS using Stripe Billing. VenueOS never processes payments from brides, grooms, families or event customers."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "relative ring-2 ring-slate-950" : undefined}>
              {plan.featured && <div className="absolute -top-3 left-6"><Badge tone="brand">Most popular</Badge></div>}
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className="mt-4 text-5xl font-black">{plan.price}<span className="text-base font-semibold text-slate-500">/month</span></p>
              <p className="mt-3 leading-7 text-slate-600">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
                {plan.features.map((feature) => <li key={feature}>- {feature}</li>)}
              </ul>
              <Button href="/demo" className="mt-8 w-full">Request Access</Button>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="bg-amber-50" title="Setup fee and payment rules">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Setup fee</h2>
            <p className="mt-3 leading-7 text-slate-600">£499 to £1,500 depending on onboarding level, template migration, staff training and venue complexity.</p>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Payment tracking, not payment processing</h2>
            <p className="mt-3 leading-7 text-slate-600">VenueOS does not process your client payments. Your venue continues taking cash, bank transfer, card machine or cheque as normal.</p>
          </Card>
        </div>
      </Section>
    </MarketingShell>
  );
}
