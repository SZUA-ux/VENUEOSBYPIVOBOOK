import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { hqModuleSummaries, onboardingTasks } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const titles: Record<string, string> = {
  venues: "Organisation and Venue Management",
  "demo-requests": "Demo Requests",
  subscriptions: "Subscriptions",
  mrr: "MRR Dashboard",
  support: "Support Tickets",
  "problem-radar": "Problem Radar",
  onboarding: "Onboarding Tracker",
  templates: "Global Templates",
  settings: "Global Settings",
  activity: "Platform Activity",
};

export function generateMetadata({ params }: { params: { section: string } }) {
  const title = titles[params.section];
  if (!title) return {};
  return createMetadata({
    title: `PivoBook HQ - ${title}`,
    description: hqModuleSummaries[params.section],
    path: `/hq/${params.section}`,
  });
}

export default function HqSectionPage({ params }: { params: { section: string } }) {
  const title = titles[params.section];
  const summary = hqModuleSummaries[params.section];
  if (!title || !summary) notFound();

  if (params.section === "venues") {
    return <VenueManagement />;
  }

  if (params.section === "mrr") {
    return <MrrDashboard />;
  }

  if (params.section === "onboarding") {
    return <OnboardingTracker />;
  }

  return (
    <div className="grid gap-6">
      <Card>
        <Badge tone="brand">PivoBook HQ</Badge>
        <h1 className="mt-4 text-3xl font-black">{title}</h1>
        <p className="mt-3 max-w-4xl leading-8 text-slate-600">{summary}</p>
      </Card>
      <DataTable
        columns={["Record", "Status", "Owner", "Last update"]}
        rows={[
          ["Pearl Events Hall", <Badge key="new" tone="warning">new</Badge>, "Onboarding", "Today"],
          ["Royal Banqueting Group", <Badge key="active" tone="success">active</Badge>, "Support", "Yesterday"],
          ["Orchid Suites", <Badge key="risk" tone="danger">risk</Badge>, "Billing", "2 days ago"],
        ]}
      />
    </div>
  );
}

function VenueManagement() {
  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="brand">HQ venue management</Badge>
            <h1 className="mt-4 text-3xl font-black">Organisations</h1>
            <p className="mt-3 leading-8 text-slate-600">Create organisations, invite owners, change plans, suspend or reactivate venues, open support tickets and view activity.</p>
          </div>
          <Button>Create organisation</Button>
        </div>
      </Card>
      <DataTable
        columns={["Organisation", "Plan", "Subscription", "Onboarding", "Health", "Actions"]}
        rows={[
          ["Royal Banqueting Group", "Group", <Badge key="active" tone="success">active</Badge>, <ProgressBar key="p1" value={92} />, "88/100", <Link key="a1" href="/hq/venues/royal-banqueting-group" className="font-bold text-slate-950">View</Link>],
          ["Pearl Events Hall", "Pro", <Badge key="trial" tone="warning">trial</Badge>, <ProgressBar key="p2" value={64} />, "71/100", <Link key="a2" href="/hq/venues/pearl-events-hall" className="font-bold text-slate-950">View</Link>],
          ["Orchid Suites", "Starter", <Badge key="failed" tone="danger">failed payment</Badge>, <ProgressBar key="p3" value={38} />, "42/100", <Link key="a3" href="/hq/venues/orchid-suites" className="font-bold text-slate-950">View</Link>],
        ]}
      />
    </div>
  );
}

function MrrDashboard() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Current MRR" value="£18,720" />
        <StatCard label="ARR" value="£224,640" />
        <StatCard label="Net new MRR" value="£1,990" tone="success" />
        <StatCard label="Churned MRR" value="£398" tone="danger" />
        <StatCard label="Projected next month" value="£21,060" tone="success" />
      </section>
      <DataTable
        columns={["Metric", "This month", "Previous month", "Trend"]}
        rows={[
          ["New venues", "9", "6", <Badge key="up" tone="success">up</Badge>],
          ["Churned venues", "2", "1", <Badge key="risk" tone="warning">watch</Badge>],
          ["Plan distribution", "Starter 31 / Pro 42 / Group 11", "-", "-"],
          ["Demo-to-customer conversion", "28%", "23%", <Badge key="conv" tone="success">up</Badge>],
        ]}
      />
    </div>
  );
}

function OnboardingTracker() {
  return (
    <div className="grid gap-6">
      <Card>
        <h1 className="text-3xl font-black">Default onboarding tasks</h1>
        <p className="mt-3 leading-8 text-slate-600">These tasks seed every new organisation and drive HQ onboarding progress.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {onboardingTasks.map((task, index) => (
          <Card key={task}>
            <Badge tone={index < 6 ? "success" : "neutral"}>{index < 6 ? "complete" : "pending"}</Badge>
            <h2 className="mt-4 font-bold">{task}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
