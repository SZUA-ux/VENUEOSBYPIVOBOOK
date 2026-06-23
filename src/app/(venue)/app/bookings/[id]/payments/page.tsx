import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingPaymentsTabPage() {
  return (
    <SectionPlaceholder
      title="Payment ledger"
      description="Manual payment schedule and entry tracking for deposits, interim and final balances."
      bullets={[
        "Schedule due-date tracking",
        "Manual payment entry logs",
        "Outstanding balance calculation",
        "Overdue status and reminders",
        "Edit/delete audit trail",
        "Payment method breakdown",
      ]}
    />
  );
}
