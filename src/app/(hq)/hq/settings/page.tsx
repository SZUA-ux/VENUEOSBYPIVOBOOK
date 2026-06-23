import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqSettingsPage() {
  return (
    <SectionPlaceholder
      title="Platform settings"
      description="Global controls for product flags, defaults and maintenance posture."
      bullets={[
        "Feature flags",
        "Default pricing plans",
        "Template defaults",
        "Maintenance mode",
        "AI service settings",
        "System-level notification controls",
      ]}
    />
  );
}
