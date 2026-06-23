import Link from "next/link";
import { Badge, Button, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

const tabs = ["overview", "events", "quote", "menu", "itinerary", "beo", "payments", "messages", "files", "notes", "activity-log"];

export function generateMetadata({ params }: { params: { id: string } }) {
  return createMetadata({
    title: `Booking Command Page - ${params.id}`,
    description: "VenueOS booking detail command page with events, quote, menu, itinerary, BEO, payments, messages, files, notes and activity log.",
    path: `/app/bookings/${params.id}`,
  });
}

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="warning">Ready for BEO</Badge>
            <h1 className="mt-4 text-3xl font-black">Khan & Ahmed Wedding</h1>
            <p className="mt-3 leading-8 text-slate-600">Reference {params.id} - Grand Ballroom - 420 guests - multi-event wedding.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Generate BEO</Button>
            <Button variant="secondary">Generate PDF pack</Button>
            <Button variant="secondary">WhatsApp reminder</Button>
          </div>
        </div>
      </Card>
      <nav className="flex gap-2 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-2">
        {tabs.map((tab) => (
          <Link key={tab} href={tab === "overview" ? `/app/bookings/${params.id}` : `/app/bookings/${params.id}/${tab}`} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
            {tab.replace("-", " ")}
          </Link>
        ))}
      </nav>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Agreed total" value="£42,000" />
        <StatCard label="Received" value="£33,500" tone="success" />
        <StatCard label="Balance due" value="£8,500" tone="warning" />
        <StatCard label="Readiness" value="82%" />
      </section>
      <Card>
        <div className="mb-2 flex justify-between text-sm font-bold text-slate-600"><span>Event readiness score</span><span>82%</span></div>
        <ProgressBar value={82} />
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="warning">Staff not fully assigned</Badge>
          <Badge tone="neutral">Décor awaiting confirmation</Badge>
          <Badge tone="success">Menu selected</Badge>
        </div>
      </Card>
      <DataTable
        columns={["Sub-event", "Date", "Suite", "Guests", "Requirements"]}
        rows={[
          ["Mehndi", "2026-07-17", "Orchid Suite", "260", "Vegetarian, decor stage"],
          ["Nikah", "2026-07-18", "Grand Ballroom", "420", "Prayer area, segregation, halal"],
          ["Walima", "2026-07-19", "Grand Ballroom", "390", "HMC, VIP tables"],
        ]}
      />
    </div>
  );
}
