import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function VenueCalendarPage() {
  return (
    <SectionPlaceholder
      title="Multi-suite calendar"
      description="View event occupancy, setup/teardown windows and booking conflicts."
      bullets={[
        "Suite day/week timeline",
        "Provisional hold overlays",
        "Confirmed booking conflict checks",
        "Changeover buffer warnings",
        "Capacity and layout markers",
        "Quick create booking action",
      ]}
    />
  );
}
