import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function MessagesPage() {
  return (
    <SectionPlaceholder
      title="Messages command centre"
      description="Generate WhatsApp links and email content with per-booking variables and logging."
      bullets={[
        "WhatsApp template library",
        "Email template library",
        "Generated message log",
        "Manual sent status updates",
        "Recipient tracking",
        "Staff attribution",
      ]}
    />
  );
}
