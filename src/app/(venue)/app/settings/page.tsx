import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function SettingsPage() {
  return (
    <SectionPlaceholder
      title="Venue settings"
      description="Configure venue profile, branding, email mode, templates and role permissions."
      bullets={[
        "Profile and contact details",
        "Brand colours and logo",
        "Email mode selection",
        "WhatsApp template variables",
        "Role permissions",
        "Feature flags",
      ]}
    />
  );
}
