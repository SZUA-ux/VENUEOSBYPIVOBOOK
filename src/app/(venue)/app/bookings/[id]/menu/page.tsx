import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BookingMenuTabPage() {
  return (
    <SectionPlaceholder
      title="Event menu"
      description="Configure package, dish selections and kitchen production quantities per booking event."
      bullets={[
        "Menu package selection",
        "Dietary and allergen visibility",
        "Production quantity calculation",
        "Final numbers lock",
        "Late-change approval controls",
        "Kitchen and allergen sheet outputs",
      ]}
    />
  );
}
