import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function HqActivityPage() {
  return (
    <SectionPlaceholder
      title="Platform activity"
      description="Global activity stream for sensitive actions and audit requirements."
      bullets={[
        "Organisation lifecycle changes",
        "Billing plan and subscription changes",
        "Support workflow actions",
        "Role and permission changes",
        "Template updates",
        "Administrative overrides",
      ]}
    />
  );
}
