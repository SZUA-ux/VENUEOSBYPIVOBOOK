import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqSubscriptionsPage() {
  return (
    <SectionPlaceholder
      title="Subscriptions"
      description="Track Stripe billing state for each organisation and monitor failed collections."
      bullets={[
        "Plan and billing interval",
        "Current period start/end",
        "Failed payment count",
        "Cancellation and churn risk",
        "Invoice links",
        "Upgrade and downgrade history",
      ]}
    />
  );
}
