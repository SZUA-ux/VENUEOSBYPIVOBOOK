import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function QuotesPage() {
  return (
    <SectionPlaceholder
      title="Quotes"
      description="Manage draft, sent and accepted quote versions across all bookings."
      bullets={[
        "Version history",
        "VAT mode handling",
        "Internal acceptance",
        "Branded PDFs",
        "Upsell suggestions",
        "Quote conversion metrics",
      ]}
    />
  );
}
