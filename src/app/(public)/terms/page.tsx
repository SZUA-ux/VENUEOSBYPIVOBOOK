import { LegalTemplate } from "@/components/public/legal-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of service",
  description: "Terms of service for VenueOS by PivoBook.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalTemplate
      title="Terms of Service"
      description="Service terms governing VenueOS platform usage by venues and internal teams."
    />
  );
}
