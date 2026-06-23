import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function InventoryPage() {
  return (
    <SectionPlaceholder
      title="Inventory and allocations"
      description="Track event resources, allocations and double-booking risks."
      bullets={[
        "Item catalog by category",
        "Available quantity tracking",
        "Allocation windows",
        "Double allocation warnings",
        "Low stock alerts",
        "Damage/loss notes",
      ]}
    />
  );
}
