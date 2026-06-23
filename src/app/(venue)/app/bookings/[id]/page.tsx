import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

const tabs = [
  { label: "Overview", href: "" },
  { label: "Events", href: "/events" },
  { label: "Quote", href: "/quote" },
  { label: "Menu", href: "/menu" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "BEO", href: "/beo" },
  { label: "Payments", href: "/payments" },
  { label: "Messages", href: "/messages" },
  { label: "Files", href: "/files" },
];

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Booking {id}</h1>
        <p className="muted mt-2">
          Command view with operational tabs for event planning and delivery.
        </p>
      </div>
      <div className="card flex flex-wrap gap-2 p-4">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={`/app/bookings/${id}${tab.href}`}
            className="button-secondary"
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="grid-cards">
        {[
          "Primary contact and lead source",
          "Booking status and hold expiry",
          "Estimated and confirmed guests",
          "Agreed total and deposit terms",
          "Final balance due date",
          "Activity log and notes",
        ].map((item) => (
          <article key={item} className="card p-4 text-sm text-slate-700">
            {item}
          </article>
        ))}
      </div>
    </section>
  );
}
