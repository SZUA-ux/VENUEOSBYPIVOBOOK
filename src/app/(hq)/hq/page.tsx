import { SectionPlaceholder } from "@/components/shell/section-placeholder";

const metrics = [
  { label: "MRR", value: "GBP 48,320" },
  { label: "ARR", value: "GBP 579,840" },
  { label: "Active venues", value: "39" },
  { label: "Trial venues", value: "7" },
  { label: "Failed payments", value: "3" },
  { label: "Open support tickets", value: "14" },
];

export default function HqDashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">HQ dashboard</h1>
        <p className="muted mt-2">
          Revenue, onboarding, support and platform risk monitoring for internal teams.
        </p>
      </section>
      <section className="grid-cards">
        {metrics.map((metric) => (
          <article key={metric.label} className="card p-4">
            <p className="text-sm text-slate-600">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </article>
        ))}
      </section>
      <SectionPlaceholder
        title="Venue health and risk"
        description="Track low adoption, payment issues and onboarding drag in one view."
        bullets={[
          "No login in 14 days",
          "Trial ending in 3 days",
          "Payment failed",
          "No booking created",
          "Too many open support tickets",
          "No BEO generated in last 30 days",
        ]}
      />
    </div>
  );
}
