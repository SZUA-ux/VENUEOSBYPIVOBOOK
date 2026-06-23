import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingQuoteTabPage() {
  return (
    <SectionPlaceholder
      title="Quote builder"
      description="Versioned quote engine with line items, VAT modes and branded PDF output."
      bullets={[
        "Per-head and fixed pricing",
        "Discount and VAT controls",
        "Quote version history",
        "Accepted/rejected status tracking",
        "Quote PDF generation",
        "Quote-to-booking financial sync",
      ]}
    />
  );
}
