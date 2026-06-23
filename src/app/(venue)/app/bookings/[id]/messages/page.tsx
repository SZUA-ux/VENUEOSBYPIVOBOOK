import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingMessagesTabPage() {
  return (
    <SectionPlaceholder
      title="Messages"
      description="Generate WhatsApp Web links and email drafts with booking and event variables."
      bullets={[
        "Deposit reminder templates",
        "Quote follow-up templates",
        "Viewing confirmation templates",
        "WhatsApp click-to-send links",
        "Email mode compatibility",
        "Message generation audit logs",
      ]}
    />
  );
}
