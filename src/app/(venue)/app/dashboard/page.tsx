import Link from "next/link";

const cards = [
  { label: "Today's events", value: "4" },
  { label: "Upcoming events", value: "18" },
  { label: "Confirmed revenue (month)", value: "GBP 212,000" },
  { label: "Outstanding balances", value: "GBP 46,300" },
  { label: "Overdue balances", value: "GBP 12,150" },
  { label: "Conversion rate", value: "34%" },
];

export default function VenueDashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Venue dashboard</h1>
        <p className="muted mt-2">
          Booking pipeline, event readiness and finance risk in one command view.
        </p>
      </section>
      <section className="grid-cards">
        {cards.map((card) => (
          <article key={card.label} className="card p-4">
            <p className="text-sm text-slate-600">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </section>
      <section className="card p-5">
        <h2 className="text-xl font-semibold">Risk flags</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <li>Final balance unpaid for booking BK-2031</li>
          <li>Menu missing for Walima event</li>
          <li>BEO not locked for tomorrow evening booking</li>
          <li>Tight suite changeover detected (45m available, 80m required)</li>
        </ul>
      </section>
      <section className="card p-5">
        <h2 className="text-xl font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/app/enquiries" className="button-secondary">
            New enquiry
          </Link>
          <Link href="/app/bookings" className="button-secondary">
            New booking
          </Link>
          <Link href="/app/quotes" className="button-secondary">
            New quote
          </Link>
          <Link href="/app/beos" className="button-secondary">
            New BEO
          </Link>
          <Link href="/app/payments" className="button-secondary">
            Generate payment reminder
          </Link>
        </div>
      </section>
    </div>
  );
}
