import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function BeosPage() {
  return (
    <SectionPlaceholder
      title="BEO command centre"
      description="Track draft, ready, locked and completed function sheets with readiness progression."
      bullets={[
        "Readiness score monitoring",
        "Checklist completion",
        "Missing item warnings",
        "Cultural requirement confirmations",
        "Lock workflow",
        "Output pack generation",
      ]}
    />
  );
}
