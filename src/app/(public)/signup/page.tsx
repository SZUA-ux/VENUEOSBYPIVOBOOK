import { AuthTemplate } from "@/components/public/auth-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Signup",
  description: "VenueOS account setup via invite or onboarding flow.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <AuthTemplate
      title="Create your VenueOS account"
      description="Use your invite details to activate your venue workspace."
    />
  );
}
