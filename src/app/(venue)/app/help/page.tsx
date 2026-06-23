import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HelpPage() {
  return (
    <SectionPlaceholder
      title="Help and support"
      description="Create support tickets and access operational guidance for your venue team."
      bullets={[
        "Submit support ticket",
        "Ticket status tracking",
        "Event-day urgent issue route",
        "Training guides",
        "Onboarding checklists",
        "Platform status notices",
      ]}
    />
  );
}
