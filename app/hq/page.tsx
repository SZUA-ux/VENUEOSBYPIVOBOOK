import { Badge, Card, DataTable, ProgressBar, StatCard } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "PivoBook HQ Dashboard",
  description: "Internal PivoBook HQ dashboard for VenueOS SaaS revenue, venues, trials, onboarding and support.",
  path: "/hq",
});

export default function HqDashboardPage() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR" value="£18,720" detail="+£1,990 net new MRR" tone="success" />
        <StatCard label="ARR" value="£224,640" detail="Projected from active subscriptions" />
        <StatCard label="Active venues" value="84" detail="12 trial venues" />
        <StatCard label="Failed payments" value="3" detail="Needs billing follow-up" tone="danger" />
        <StatCard label="Setup fees this month" value="£7,480" />
        <StatCard label="Demo requests" value="18" detail="6 new, 4 demo booked" tone="warning" />
        <StatCard label="Open support tickets" value="11" detail="2 urgent event-day issues" tone="danger" />
        <StatCard label="Venues at churn risk" value="7" detail="Low usage or payment risk" tone="warning" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-black">Recent subscriptions</h2>
          <div className="mt-5">
            <DataTable
              columns={["Organisation", "Plan", "Status", "MRR"]}
              rows={[
                ["Royal Banqueting Group", "Group", <Badge tone="success" key="active">active</Badge>, "£399"],
                ["Pearl Events Hall", "Pro", <Badge tone="warning" key="trial">trial</Badge>, "£199"],
                ["Orchid Suites", "Starter", <Badge tone="danger" key="failed">failed payment</Badge>, "£99"],
              ]}
            />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-black">Onboarding progress</h2>
          <div className="mt-6 space-y-5">
            {[
              ["Pearl Events Hall", 64],
              ["Saffron Wedding Suites", 38],
              ["Regency Banqueting", 92],
            ].map(([name, value]) => (
              <div key={String(name)}>
                <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
                  <span>{name}</span>
                  <span>{value}%</span>
                </div>
                <ProgressBar value={Number(value)} />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
