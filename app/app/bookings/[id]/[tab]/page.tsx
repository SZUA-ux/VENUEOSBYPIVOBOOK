import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, Card, DataTable, ProgressBar } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

const tabTitles: Record<string, string> = {
  events: "Events",
  quote: "Quote",
  menu: "Menu",
  itinerary: "Itinerary",
  beo: "BEO",
  payments: "Payments",
  messages: "Messages",
  files: "Files",
  notes: "Notes",
  "activity-log": "Activity Log",
};

export function generateMetadata({ params }: { params: { id: string; tab: string } }) {
  const title = tabTitles[params.tab];
  if (!title) return {};
  return createMetadata({
    title: `${title} - Booking ${params.id}`,
    description: `VenueOS booking ${title} tab.`,
    path: `/app/bookings/${params.id}/${params.tab}`,
  });
}

export default function BookingTabPage({ params }: { params: { id: string; tab: string } }) {
  const title = tabTitles[params.tab];
  if (!title) notFound();

  return (
    <div className="grid gap-6">
      <Card>
        <Link href={`/app/bookings/${params.id}`} className="text-sm font-bold text-slate-500">Back to booking overview</Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="brand">Booking tab</Badge>
            <h1 className="mt-4 text-3xl font-black">{title}</h1>
            <p className="mt-3 leading-8 text-slate-600">Command page section for booking {params.id}. All records are tenant-scoped by org_id in the Supabase schema.</p>
          </div>
          <Button>{primaryAction(params.tab)}</Button>
        </div>
      </Card>
      <TabContent tab={params.tab} />
    </div>
  );
}

function primaryAction(tab: string) {
  const actions: Record<string, string> = {
    events: "Add event",
    quote: "Create quote version",
    menu: "Build menu",
    itinerary: "Add timeline block",
    beo: "Generate BEO",
    payments: "Log manual payment",
    messages: "Generate message",
    files: "Generate PDF",
    notes: "Add note",
    "activity-log": "Export activity",
  };
  return actions[tab] ?? "Add record";
}

function TabContent({ tab }: { tab: string }) {
  if (tab === "payments") {
    return (
      <DataTable
        columns={["Entry", "Amount", "Method", "Logged by", "Audit"]}
        rows={[
          ["Deposit received", "£5,000", "bank_transfer", "Finance", <Badge key="logged" tone="success">activity logged</Badge>],
          ["Interim payment", "£8,000", "cash", "Owner", <Badge key="logged2" tone="success">activity logged</Badge>],
          ["Final balance due", "£8,500", "-", "-", <Badge key="due" tone="warning">upcoming</Badge>],
        ]}
      />
    );
  }

  if (tab === "beo") {
    return (
      <Card>
        <h2 className="text-xl font-black">Readiness score</h2>
        <div className="mt-4"><ProgressBar value={82} /></div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="success">Guest count confirmed</Badge>
          <Badge tone="success">Final menu selected</Badge>
          <Badge tone="warning">Staff assigned partially</Badge>
          <Badge tone="warning">Supplier arrival times missing</Badge>
        </div>
      </Card>
    );
  }

  if (tab === "messages") {
    return (
      <DataTable
        columns={["Channel", "Template", "Status", "Generated link"]}
        rows={[
          ["whatsapp", "Final balance due", <Badge key="g" tone="warning">generated</Badge>, "https://wa.me/{phone}?text={encoded_message}"],
          ["email", "Itinerary confirmation", <Badge key="m" tone="neutral">manual copy</Badge>, "mailto mode available"],
        ]}
      />
    );
  }

  if (tab === "activity-log") {
    return (
      <DataTable
        columns={["Action", "Entity", "Actor", "Timestamp"]}
        rows={[
          ["create_booking", "bookings", "Sales", "Today 10:22"],
          ["add_payment_entry", "payment_entries", "Finance", "Today 11:03"],
          ["generate_beo", "beos", "Coordinator", "Today 11:40"],
        ]}
      />
    );
  }

  return (
    <DataTable
      columns={["Record", "Status", "Owner", "Notes"]}
      rows={[
        [`${tab} item 1`, <Badge key="draft" tone="warning">draft</Badge>, "Coordinator", "Pending manager review"],
        [`${tab} item 2`, <Badge key="ready" tone="success">ready</Badge>, "Operations", "Included in BEO compiler"],
      ]}
    />
  );
}
