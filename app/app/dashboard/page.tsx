import Link from "next/link";
import { Badge, Button, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { sampleBookings } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Venue Dashboard",
  description: "VenueOS owner dashboard for today's events, readiness, revenue, balances, enquiries and risk flags.",
  path: "/app/dashboard",
});

export default function VenueDashboardPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's events" value="4" detail="2 high-pressure changeovers" tone="warning" />
        <StatCard label="Confirmed revenue this month" value="£182,400" />
        <StatCard label="Outstanding balances" value="£61,700" detail="£12,300 overdue" tone="danger" />
        <StatCard label="Enquiries this month" value="48" detail="31% conversion" tone="success" />
        <StatCard label="Deposits received" value="£38,950" />
        <StatCard label="Quotes sent" value="22" />
        <StatCard label="Top lead source" value="Instagram" detail="14 enquiries" />
        <StatCard label="Suite utilisation" value="74%" detail="Grand Ballroom at 91%" tone="warning" />
      </section>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Quick actions</h1>
            <p className="mt-2 text-slate-600">Create operational records from the command centre.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["New enquiry", "New booking", "New quote", "New BEO", "Payment reminder", "Support ticket"].map((action) => (
              <Button href="/app/bookings" variant="secondary" key={action}>{action}</Button>
            ))}
          </div>
        </div>
      </Card>
      <DataTable
        columns={["Booking", "Status", "Readiness", "Risk", "Balance", "Open"]}
        rows={sampleBookings.map((booking) => [
          `${booking.reference} - ${booking.title}`,
          <Badge key={`${booking.reference}-status`} tone={booking.risk === "high" ? "danger" : "warning"}>{booking.status}</Badge>,
          <ProgressBar key={`${booking.reference}-progress`} value={booking.readiness} />,
          <Badge key={`${booking.reference}-risk`} tone={booking.risk === "high" ? "danger" : "warning"}>{booking.risk}</Badge>,
          booking.balance,
          <Link key={`${booking.reference}-link`} href={`/app/bookings/${booking.reference}`} className="font-bold">Open</Link>,
        ])}
      />
    </div>
  );
}
