import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { appModuleSummaries, bookingStatuses, culturalTemplates, onboardingTasks, sampleBookings } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const titles: Record<string, string> = {
  onboarding: "Venue Onboarding",
  calendar: "Multi-Suite Calendar",
  enquiries: "Enquiries",
  bookings: "Bookings",
  "wedding-builder": "Wedding Builder",
  quotes: "Quotes",
  menus: "Menus",
  itineraries: "Itineraries",
  beos: "BEOs",
  payments: "Payment Ledger",
  staff: "Staff",
  inventory: "Inventory",
  decor: "Décor",
  reports: "Reports",
  messages: "Messages",
  files: "Files",
  settings: "Settings",
  help: "Help / Support",
};

export function generateMetadata({ params }: { params: { section: string } }) {
  const title = titles[params.section];
  if (!title) return {};
  return createMetadata({
    title: `Venue App - ${title}`,
    description: appModuleSummaries[params.section],
    path: `/app/${params.section}`,
  });
}

export default function VenueSectionPage({ params }: { params: { section: string } }) {
  const title = titles[params.section];
  const summary = appModuleSummaries[params.section];
  if (!title || !summary) notFound();

  if (params.section === "onboarding") return <OnboardingPage />;
  if (params.section === "bookings" || params.section === "enquiries") return <BookingsPage section={params.section} />;
  if (params.section === "payments") return <PaymentsPage />;
  if (params.section === "beos") return <BeosPage />;
  if (params.section === "messages") return <MessagesPage />;
  if (params.section === "wedding-builder") return <WeddingBuilderPage />;

  return (
    <div className="grid gap-6">
      <Card>
        <Badge tone="brand">Venue module</Badge>
        <h1 className="mt-4 text-3xl font-black">{title}</h1>
        <p className="mt-3 max-w-4xl leading-8 text-slate-600">{summary}</p>
      </Card>
      <DataTable
        columns={["Item", "Status", "Owner", "Risk"]}
        rows={[
          [`${title} workflow`, <Badge key="ready" tone="success">ready</Badge>, "Venue team", <Badge key="low" tone="success">low</Badge>],
          ["Configuration", <Badge key="pending" tone="warning">pending</Badge>, "Owner / Manager", <Badge key="med" tone="warning">medium</Badge>],
          ["Activity logging", <Badge key="logged" tone="brand">enabled in schema</Badge>, "System", <Badge key="ok" tone="success">low</Badge>],
        ]}
      />
    </div>
  );
}

function OnboardingPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <h1 className="text-3xl font-black">Venue onboarding</h1>
        <p className="mt-3 leading-8 text-slate-600">Owner/manager can skip steps, but incomplete setup remains visible.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {onboardingTasks.map((task, index) => (
          <Card key={task}>
            <Badge tone={index < 5 ? "success" : "warning"}>{index < 5 ? "complete" : "pending"}</Badge>
            <h2 className="mt-4 font-bold">{task}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BookingsPage({ section }: { section: string }) {
  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{section === "enquiries" ? "Enquiries" : "Bookings"}</h1>
            <p className="mt-3 leading-8 text-slate-600">Statuses: {bookingStatuses.join(", ")}.</p>
          </div>
          <Button>{section === "enquiries" ? "New enquiry" : "New booking"}</Button>
        </div>
      </Card>
      <DataTable
        columns={["Reference", "Title", "Status", "Suite", "Guests", "Open"]}
        rows={sampleBookings.map((booking) => [
          booking.reference,
          booking.title,
          <Badge key={booking.reference} tone={booking.risk === "high" ? "danger" : "warning"}>{booking.status}</Badge>,
          booking.suite,
          booking.guests,
          <Link key={`${booking.reference}-open`} href={`/app/bookings/${booking.reference}`} className="font-bold">Open command page</Link>,
        ])}
      />
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total booking value" value="£182,400" />
        <StatCard label="Total received" value="£120,700" />
        <StatCard label="Balance outstanding" value="£61,700" tone="warning" />
        <StatCard label="Overdue amount" value="£12,300" tone="danger" />
      </section>
      <Card>
        <Badge tone="danger">No payment processing</Badge>
        <h1 className="mt-4 text-3xl font-black">Manual payment ledger</h1>
        <p className="mt-3 leading-8 text-slate-600">Entries are manually logged by venue staff after the customer pays the venue outside VenueOS. No checkout, card data, bank account, Stripe Connect, refunds, chargebacks or payouts.</p>
      </Card>
      <DataTable
        columns={["Schedule", "Due", "Received", "Method", "Status"]}
        rows={[
          ["Deposit", "£5,000", "£5,000", "bank_transfer", <Badge key="paid" tone="success">paid</Badge>],
          ["Interim payment", "£8,000", "£3,000", "cash", <Badge key="partial" tone="warning">partially_paid</Badge>],
          ["Final balance", "£12,300", "£0", "-", <Badge key="overdue" tone="danger">overdue</Badge>],
        ]}
      />
    </div>
  );
}

function BeosPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <h1 className="text-3xl font-black">BEO builder</h1>
        <p className="mt-3 leading-8 text-slate-600">BEO pulls from quote, menu, itinerary, payment status, décor, staff and cultural requirement fields.</p>
      </Card>
      <DataTable
        columns={["BEO", "Readiness", "Risk", "Missing items", "Outputs"]}
        rows={[
          ["Khan & Ahmed Wedding", <ProgressBar key="r1" value={82} />, <Badge key="m" tone="warning">medium</Badge>, "Staff finalisation", "Full, Kitchen, Floor, Decor, Supplier, Security"],
          ["Singh Reception", <ProgressBar key="r2" value={45} />, <Badge key="h" tone="danger">high</Badge>, "Menu, payment, decor", "Draft only"],
        ]}
      />
    </div>
  );
}

function MessagesPage() {
  const sampleMessage = encodeURIComponent("Hi Aisha, your final balance is due. Please contact the venue team if you need anything.");
  return (
    <div className="grid gap-6">
      <Card>
        <Badge tone="brand">Click-to-send only</Badge>
        <h1 className="mt-4 text-3xl font-black">WhatsApp Web command centre</h1>
        <p className="mt-3 leading-8 text-slate-600">VenueOS generates wa.me prefilled links and logs generated/copied/manually marked sent statuses. It does not use the WhatsApp Business API in V1.</p>
        <a className="mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white" href={`https://wa.me/447000000000?text=${sampleMessage}`} target="_blank" rel="noreferrer">Open sample WhatsApp link</a>
      </Card>
      <DataTable
        columns={["Template", "Channel", "Status", "Variables"]}
        rows={[
          ["Deposit due", "whatsapp", <Badge key="generated" tone="warning">generated</Badge>, "venue_name, contact_name, deposit_amount, due_date"],
          ["Quote follow-up", "email", <Badge key="manual" tone="neutral">manual copy</Badge>, "quote_total, booking_reference"],
        ]}
      />
    </div>
  );
}

function WeddingBuilderPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <h1 className="text-3xl font-black">Multi-event wedding builder</h1>
        <p className="mt-3 leading-8 text-slate-600">Templates create default itinerary blocks and BEO sections for each sub-event.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {culturalTemplates.map((template) => (
          <Card key={template.culture}>
            <Badge tone="brand">{template.culture}</Badge>
            <h2 className="mt-4 font-bold">{template.events.join(", ")}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
