import { Badge, Button, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { id: string } }) {
  return createMetadata({
    title: `HQ Venue Profile - ${params.id}`,
    description: "PivoBook HQ organisation detail with venues, subscription, onboarding, usage, support tickets and activity.",
    path: `/hq/venues/${params.id}`,
  });
}

export default function HqVenueDetailPage({ params }: { params: { id: string } }) {
  const orgName = params.id.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="brand">Organisation profile</Badge>
            <h1 className="mt-4 text-3xl font-black">{orgName}</h1>
            <p className="mt-3 leading-8 text-slate-600">Owner: Aisha Khan - events@examplevenue.co.uk - +44 7000 000000</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Invite owner</Button>
            <Button variant="secondary">Open support ticket</Button>
            <Button variant="danger">Suspend organisation</Button>
          </div>
        </div>
      </Card>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Plan" value="Pro" detail="Stripe subscription active" />
        <StatCard label="Trial end" value="Jul 12" detail="19 days remaining" tone="warning" />
        <StatCard label="Users" value="18" detail="Last login today" />
        <StatCard label="Bookings" value="146" detail="22 in last 30 days" tone="success" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1fr]">
        <Card>
          <h2 className="text-xl font-black">Health score</h2>
          <p className="mt-3 text-5xl font-black">71/100</p>
          <div className="mt-4"><ProgressBar value={71} /></div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="warning">Trial ending soon</Badge>
            <Badge tone="danger">No BEO generated</Badge>
            <Badge tone="neutral">Onboarding incomplete</Badge>
          </div>
        </Card>
        <DataTable
          columns={["Area", "Value", "Risk"]}
          rows={[
            ["Stripe customer ID", "cus_example", <Badge key="ok" tone="success">synced</Badge>],
            ["Setup fee status", "Part paid", <Badge key="watch" tone="warning">watch</Badge>],
            ["Support tickets", "2 open", <Badge key="med" tone="warning">medium</Badge>],
            ["Onboarding progress", "64%", <Badge key="todo" tone="neutral">incomplete</Badge>],
          ]}
        />
      </section>
      <DataTable
        columns={["Activity", "Actor", "Entity", "Created"]}
        rows={[
          ["Marked onboarding step complete", "Onboarding Manager", "Suites added", "Today"],
          ["Generated support ticket", "Venue owner", "Email issue", "Yesterday"],
          ["Changed subscription status", "Billing Admin", "Stripe sync", "2 days ago"],
        ]}
      />
    </div>
  );
}
