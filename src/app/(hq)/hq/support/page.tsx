import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqSupportPage() {
  return (
    <SectionPlaceholder
      title="Support tickets"
      description="Operational issue queue for venue-side bugs, billing questions and urgent event-day incidents."
      bullets={[
        "Priority and SLA view",
        "Assigned support owner",
        "Internal notes and resolution logs",
        "Urgent event-day issue lane",
        "Ticket category analytics",
        "Resolved and closed audit trail",
      ]}
    />
  );
}
