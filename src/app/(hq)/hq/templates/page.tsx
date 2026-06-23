import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqTemplatesPage() {
  return (
    <SectionPlaceholder
      title="Global templates"
      description="Default BEO, itinerary, email and WhatsApp templates shared across tenant onboarding."
      bullets={[
        "Default BEO sections",
        "Default itinerary blocks",
        "Email templates",
        "WhatsApp templates",
        "Payment reminder scripts",
        "AI feature flags",
      ]}
    />
  );
}
