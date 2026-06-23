import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqOnboardingPage() {
  return (
    <SectionPlaceholder
      title="Onboarding tracker"
      description="Task-level onboarding progress across each organisation and venue setup sequence."
      bullets={[
        "Venue profile completed",
        "Suites and capacities added",
        "Menu and package baseline loaded",
        "Payment terms configured",
        "Staff invites sent",
        "First booking created",
      ]}
    />
  );
}
