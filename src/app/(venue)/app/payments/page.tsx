import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function PaymentsPage() {
  return (
    <SectionPlaceholder
      title="Payments ledger"
      description="Manual ledger tracking with schedules, methods and overdue balance controls."
      bullets={[
        "Deposit and interim schedules",
        "Manual receipt logging",
        "Outstanding and overdue views",
        "Method-level reporting",
        "Reminder template generation",
        "Immutable audit log trail",
      ]}
    />
  );
}
