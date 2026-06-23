import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqProblemRadarPage() {
  return (
    <SectionPlaceholder
      title="Problem radar"
      description="Cross-tenant risk detection for platform and customer success teams."
      bullets={[
        "Payment failed",
        "Trial ending soon",
        "Low usage or no recent login",
        "Onboarding incomplete",
        "Many support tickets",
        "Subscription cancellation scheduled",
      ]}
    />
  );
}
