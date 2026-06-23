import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqMrrPage() {
  return (
    <SectionPlaceholder
      title="MRR dashboard"
      description="SaaS commercial health including growth, churn and projected recurring revenue."
      bullets={[
        "Current MRR and ARR",
        "Expansion and contraction MRR",
        "New logos by month",
        "Plan distribution",
        "Demo-to-customer conversion",
        "Setup fee revenue this month",
      ]}
    />
  );
}
