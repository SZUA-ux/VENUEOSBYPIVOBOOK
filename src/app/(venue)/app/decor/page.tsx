import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function DecorPage() {
  return (
    <SectionPlaceholder
      title="Decor management"
      description="Package-level decor planning tied to event setup windows and BEO output."
      bullets={[
        "Decor package library",
        "Theme and colour assignment",
        "Stage and floral notes",
        "Setup window controls",
        "Assigned decor team",
        "Decor sheet integration",
      ]}
    />
  );
}
