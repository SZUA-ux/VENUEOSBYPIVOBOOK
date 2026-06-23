import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  MessageCircle,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell } from "@/components/MarketingShell";
import { Badge, Button, Card, FeatureGrid, IconCard, ProgressBar, Section, StatCard } from "@/components/ui";
import { coreFeatures, faqs, pricingPlans, product, sampleBookings, workflowSteps } from "@/lib/content";
import { createMetadata, faqSchema, JsonLd, organizationSchema, softwareSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "VenueOS by PivoBook.com - Wedding and Banqueting Venue Operating System",
  description:
    "Manage bookings, menus, BEOs, payment tracking and event-day operations from one venue-side command centre.",
  path: "/",
});

const coreEngineCards: Array<{ title: string; Icon: LucideIcon; body: string }> = [
  {
    title: "BEO and function sheet automation",
    Icon: FileText,
    body: "Compile quote, menu, itinerary, decor, staff, supplier and payment readiness into role-specific outputs.",
  },
  {
    title: "WhatsApp Web command centre",
    Icon: MessageCircle,
    body: "Generate prefilled click-to-send links and track message generation without using the WhatsApp Business API.",
  },
  {
    title: "Owner dashboard preview",
    Icon: BarChart3,
    body: "MRR is for PivoBook HQ. Venue owners see confirmed revenue, outstanding balances, utilisation and events at risk.",
  },
];

export default function HomePage() {
  return (
    <MarketingShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={softwareSchema()} />
      <JsonLd data={faqSchema(faqs)} />

      <section className="hero-grid overflow-hidden border-b border-slate-200 bg-stone-100">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <Badge tone="brand">Venue-side SaaS for premium operators</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-9 text-slate-800">
              The operating system for wedding and banqueting venues.
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Manage bookings, menus, BEOs, payment tracking and event-day operations from one command centre. Your venue keeps taking cash and bank transfers as normal. VenueOS keeps the truth organised.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo">Book a Demo</Button>
              <Button href="/features" variant="secondary">See VenueOS</Button>
            </div>
          </div>
          <Card className="bg-white/90">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Today&apos;s command centre</p>
                <h2 className="mt-2 text-2xl font-black">Event readiness</h2>
              </div>
              <Badge tone="warning">3 risks</Badge>
            </div>
            <div className="mt-6 grid gap-4">
              {sampleBookings.map((booking) => (
                <div key={booking.reference} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">{booking.title}</p>
                      <p className="text-sm text-slate-500">{booking.date} - {booking.suite} - {booking.guests} guests</p>
                    </div>
                    <Badge tone={booking.risk === "high" ? "danger" : "warning"}>{booking.status}</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                      <span>BEO readiness</span>
                      <span>{booking.readiness}%</span>
                    </div>
                    <ProgressBar value={booking.readiness} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Section
        eyebrow="Built for venues that need more than a diary"
        title="From enquiry to final function sheet, everything stays connected."
        subtitle="VenueOS is designed for multi-suite, multicultural, high-pressure event operations where sales, finance, kitchen, coordinators and owners all need the same truth."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <IconCard icon={CalendarCheck} title="Booking engine">Enquiries, viewings, provisional holds, confirmed bookings, sub-events and conflict checks.</IconCard>
          <IconCard icon={Utensils} title="Menu and itinerary">Per-event menus, allergens, final numbers, timelines and cultural templates.</IconCard>
          <IconCard icon={ClipboardList} title="BEO command">Full BEO, kitchen sheet, floor sheet, decor sheet, supplier sheet and mobile coordinator view.</IconCard>
          <IconCard icon={CreditCard} title="Manual ledger">Payment schedules and entries only. No client checkout, card data, bank connection or Stripe Connect.</IconCard>
        </div>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Feature overview"
        title="A connected operating layer for premium event venues"
      >
        <FeatureGrid items={coreFeatures} />
      </Section>

      <Section
        eyebrow="Workflow"
        title="Enquiry to event day"
        subtitle="VenueOS mirrors how venue teams actually work: lead capture, quote, hold, payment schedule, wedding events, menu, itinerary, BEO, PDFs, messages and reporting."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <Card key={step}>
              <p className="text-sm font-black text-amber-700">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-bold">{step}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-950 text-white" eyebrow="Core engines" title="Business-first tools for complex venue operations">
        <div className="grid gap-5 md:grid-cols-3">
          {coreEngineCards.map(({ title, Icon, body }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Icon className="h-7 w-7 text-amber-300" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Multicultural weddings"
        title="Native fields for requirements that generic CRMs miss"
        subtitle="VenueOS surfaces operational details for Asian, Muslim, Sikh, Hindu and multicultural weddings as proper data, not buried notes."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Segregated seating", "Prayer area", "Halal / HMC", "Jain and vegetarian", "No onion/garlic", "Bride/groom side seating", "VIP tables", "Family privacy notes"].map((item) => (
            <Card key={item}><p className="font-bold">{item}</p></Card>
          ))}
        </div>
      </Section>

      <Section className="bg-amber-50" eyebrow="Payment tracking, not payment processing" title="Venues keep collecting money their way.">
        <div className="grid gap-5 lg:grid-cols-3">
          <StatCard label="Venue client payments" value="Manual" detail="Cash, bank transfer, cheque, card machine or other offline method." />
          <StatCard label="Stripe usage" value="SaaS only" detail="PivoBook charges venues for VenueOS subscriptions through Stripe Billing." />
          <StatCard label="Risk avoided" value="No PCI flow" detail="No client checkout, Stripe Connect, KYC, payouts or bank reconciliation." />
        </div>
      </Section>

      <Section eyebrow="Pricing preview" title="Clear subscription pricing for venues">
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "ring-2 ring-slate-950" : undefined}>
              <Badge tone={plan.featured ? "brand" : "neutral"}>{plan.name}</Badge>
              <p className="mt-5 text-4xl font-black">{plan.price}<span className="text-base font-semibold text-slate-500">/month</span></p>
              <p className="mt-3 text-slate-600">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {plan.features.slice(0, 5).map((feature) => <li key={feature}>- {feature}</li>)}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/pricing" variant="secondary">View pricing details</Button>
        </div>
      </Section>

      <Section className="bg-white" eyebrow="FAQ" title="Direct answers for venue owners">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="text-center" eyebrow="Talk to PivoBook" title="Ready to see VenueOS on real venue workflows?">
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
          Book a demo for booking operations, multi-event wedding management, BEO automation, manual payment tracking and owner reporting.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/demo">Book a Demo</Button>
          <Button href="/contact" variant="secondary">Talk to PivoBook</Button>
        </div>
      </Section>
    </MarketingShell>
  );
}
