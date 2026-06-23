import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingItineraryTabPage() {
  return (
    <SectionPlaceholder
      title="Itinerary builder"
      description="Build timing blocks with internal and external visibility variants."
      bullets={[
        "Drag-and-drop timeline intent",
        "Cultural itinerary templates",
        "Supplier and staff versions",
        "WhatsApp summary generation",
        "PDF itinerary export",
        "Smart clash warnings",
      ]}
    />
  );
}
