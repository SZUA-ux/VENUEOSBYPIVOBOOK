import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingEventsTabPage() {
  return (
    <SectionPlaceholder
      title="Booking events"
      description="Build multi-event wedding structures with per-event timing, suite and cultural requirements."
      bullets={[
        "Quick-add cultural templates",
        "Per-event guest counts",
        "Segregation and prayer requirements",
        "Suite/time allocation",
        "Session type controls",
        "Event status and notes",
      ]}
    />
  );
}
