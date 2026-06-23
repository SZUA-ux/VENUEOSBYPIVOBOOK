import { LegalTemplate } from "@/components/public/legal-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie policy",
  description: "Cookie and tracking policy for VenueOS by PivoBook.com.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalTemplate
      title="Cookie Policy"
      description="How cookies are used for analytics, session handling and service quality."
    />
  );
}
