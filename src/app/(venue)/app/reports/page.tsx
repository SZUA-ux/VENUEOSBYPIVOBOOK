import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function ReportsPage() {
  return (
    <SectionPlaceholder
      title="Reports"
      description="Commercial and operational reporting across bookings, payments, capacity and readiness."
      bullets={[
        "Pipeline conversion",
        "Revenue by suite and event type",
        "Outstanding and overdue balances",
        "BEO readiness performance",
        "Resource utilisation",
        "Lead source quality",
      ]}
    />
  );
}
