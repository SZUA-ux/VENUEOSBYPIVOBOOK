import Link from "next/link";
import { FaqBlock } from "@/components/public/faq-block";
import { FaqSchema, OrganizationSchema, SoftwareSchema } from "@/components/public/schema";
import { buildMetadata } from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/site";

export const metadata = buildMetadata({
  title: "The operating system for wedding and banqueting venues",
  description:
    "Manage enquiries, bookings, multi-event weddings, BEOs, menus, itineraries and payment tracking from one command centre.",
  path: "/",
});

const engines = [
  "Booking management",
  "Quote and version control",
  "Menu builder",
  "Itinerary builder",
  "BEO and function sheets",
  "Manual payment ledger",
  "WhatsApp Web links",
  "Owner reporting dashboards",
];

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareSchema />
      <FaqSchema items={FAQ_ITEMS} />
      <section className="container py-20">
        <p className="badge badge-success">VenueOS by PivoBook.com</p>
        <h1 className="section-title mt-4 max-w-4xl">
          The operating system for premium wedding, banqueting and event venues.
        </h1>
        <p className="muted mt-4 max-w-3xl text-lg leading-8">
          Manage bookings, menus, BEOs, payment tracking and event-day operations from
          one command centre. Your venue keeps collecting cash and bank transfers as
          normal. VenueOS keeps the truth organised.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/demo" className="button-primary">
            Book a Demo
          </Link>
          <Link href="/features" className="button-secondary">
            Explore Features
          </Link>
        </div>
      </section>

      <section className="container mt-4">
        <h2 className="section-title">Core engines for high-pressure operations</h2>
        <div className="grid-cards mt-6">
          {engines.map((engine) => (
            <article key={engine} className="card p-5">
              <h3 className="font-semibold">{engine}</h3>
              <p className="muted mt-2 text-sm leading-6">
                Built for multi-suite operations where every enquiry, event and handover
                must stay connected.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mt-16">
        <h2 className="section-title">Workflow from enquiry to event day</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            "Capture enquiry and schedule viewing",
            "Build quote and send branded PDF",
            "Log deposit in manual payment ledger",
            "Create multi-event wedding timeline",
            "Generate BEO and readiness score",
            "Generate role-based event-day PDFs",
          ].map((step, index) => (
            <li key={step} className="card p-4 text-sm">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Step {index + 1}
              </span>
              <p className="mt-1 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container mt-16">
        <h2 className="section-title">Payment tracking, not payment processing</h2>
        <p className="muted mt-3 max-w-3xl leading-7">
          VenueOS does not process your customer card payments and does not replace your
          existing collection methods. It tracks due dates, logged entries, outstanding
          balances and overdue flags so owners and finance teams stay aligned.
        </p>
      </section>

      <FaqBlock />
    </>
  );
}
