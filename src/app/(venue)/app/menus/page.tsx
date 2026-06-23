import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function MenusPage() {
  return (
    <SectionPlaceholder
      title="Menu library"
      description="Central menu item and package catalog with dietary and profitability controls."
      bullets={[
        "Dish library",
        "Dietary/allergen tagging",
        "Package definitions",
        "Cost-to-price ratio checks",
        "Popularity indicators",
        "Availability controls",
      ]}
    />
  );
}
