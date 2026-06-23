import { AuthTemplate } from "@/components/public/auth-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accept invite",
  description: "Accept a VenueOS invitation from your venue administrator.",
  path: "/accept-invite",
});

export default function AcceptInvitePage() {
  return (
    <AuthTemplate
      title="Accept your invite"
      description="Confirm your details and complete access setup for your role."
    />
  );
}
