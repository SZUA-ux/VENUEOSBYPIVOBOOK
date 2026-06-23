import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "VenueOS pricing for wedding and banqueting venues: Starter, Pro and Group with setup fee options.",
  path: "/pricing",
});

const plans = [
  {
    name: "Starter",
    price: "GBP 99/month",
    target: "For smaller venues",
    features: [
      "Booking management",
      "Quotes",
      "Menu builder",
      "Itinerary builder",
      "Basic BEO",
      "Payment ledger",
      "WhatsApp links",
      "Shared/manual email",
    ],
  },
  {
    name: "Pro",
    price: "GBP 199/month",
    target: "For serious wedding and banqueting venues",
    features: [
      "Everything in Starter",
      "Advanced BEO",
      "PDF pack",
      "White-label email",
      "Staff/resource scheduling",
      "Inventory",
      "Reporting",
      "Optional AI tools",
    ],
  },
  {
    name: "Group",
    price: "GBP 399/month",
    target: "For multi-venue operators",
    features: [
      "Everything in Pro",
      "Multi-venue dashboard",
      "Cross-venue reporting",
      "Multiple brands",
      "Group-level user management",
      "Priority onboarding",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container py-16">
      <h1 className="section-title">Simple pricing for serious venue operations</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">
        Setup fee ranges from GBP 499 to GBP 1,500 depending on onboarding depth and data
        migration complexity.
      </p>
      <div className="grid-cards mt-10">
        {plans.map((plan) => (
          <article key={plan.name} className="card p-6">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-1 text-2xl font-bold">{plan.price}</p>
            <p className="muted mt-2 text-sm">{plan.target}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="card mt-8 p-5 text-sm leading-7">
        <h3 className="text-base font-semibold">Important payment note</h3>
        <p className="mt-2 text-slate-600">
          VenueOS does not process your client payments. Your venue continues taking cash,
          bank transfer, card machine or cheque as normal. VenueOS tracks schedules and
          entries only.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/demo" className="button-primary">
          See VenueOS
        </Link>
      </div>
    </div>
  );
}
