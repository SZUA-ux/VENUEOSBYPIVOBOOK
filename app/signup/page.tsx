import { AuthCard, AuthFields } from "@/components/AuthCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Request Access",
  description: "Request access to VenueOS by PivoBook.com.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <AuthCard title="Request access" subtitle="V1 onboarding is venue-side. PivoBook HQ reviews and provisions venue organisations before staff are invited.">
      <AuthFields mode="signup" />
    </AuthCard>
  );
}
