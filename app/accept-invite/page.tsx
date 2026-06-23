import { AuthCard, AuthFields } from "@/components/AuthCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Accept Invite",
  description: "Accept a VenueOS staff invite.",
  path: "/accept-invite",
});

export default function AcceptInvitePage() {
  return (
    <AuthCard title="Accept invite" subtitle="Invited venue staff create a password here. Invite tokens should map the user to an organisation, venue and role.">
      <AuthFields mode="invite" />
    </AuthCard>
  );
}
