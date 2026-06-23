import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingFilesTabPage() {
  return (
    <SectionPlaceholder
      title="Files and PDFs"
      description="Generate and store branded quote packs, itinerary sheets and role-based BEO documents."
      bullets={[
        "Quote PDF",
        "Payment schedule PDF",
        "Client itinerary PDF",
        "Full BEO PDF",
        "Kitchen/floor/decor/security sheets",
        "Generate all and send",
      ]}
    />
  );
}
