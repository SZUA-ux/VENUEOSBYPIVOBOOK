import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function VenueEnquiriesPage() {
  return (
    <SectionPlaceholder
      title="Enquiries"
      description="Capture enquiries, assign ownership and move opportunities through the pipeline."
      bullets={[
        "Lead source tracking",
        "Viewing scheduling",
        "Status progression",
        "Follow-up reminders",
        "WhatsApp quick-reply links",
        "Lost reason analysis",
      ]}
    />
  );
}
