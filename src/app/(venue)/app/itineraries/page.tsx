import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function ItinerariesPage() {
  return (
    <SectionPlaceholder
      title="Itineraries"
      description="Reusable timeline structures for ceremony flow, supplier coordination and event-day pacing."
      bullets={[
        "Template-based generation",
        "Versioned timelines",
        "Visibility modes by audience",
        "Timing warning flags",
        "Supplier brief output",
        "WhatsApp summary format",
      ]}
    />
  );
}
