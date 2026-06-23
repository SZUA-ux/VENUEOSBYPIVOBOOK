import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingBeoTabPage() {
  return (
    <SectionPlaceholder
      title="BEO and function sheets"
      description="Compile event-day truth from quote, menu, itinerary, staffing and payment status."
      bullets={[
        "BEO generation from connected data",
        "Readiness scoring",
        "Operational risk warnings",
        "Cultural requirements fields",
        "Checklist completion workflow",
        "Role-based PDF outputs",
      ]}
    />
  );
}
