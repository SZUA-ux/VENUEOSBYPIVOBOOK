import { LegalTemplate } from "@/components/public/legal-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "Privacy policy for VenueOS by PivoBook.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalTemplate
      title="Privacy Policy"
      description="How PivoBook collects, stores and processes operational venue data."
    />
  );
}
