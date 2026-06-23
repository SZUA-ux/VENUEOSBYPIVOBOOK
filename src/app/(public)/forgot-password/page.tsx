import { AuthTemplate } from "@/components/public/auth-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Forgot password",
  description: "Reset your VenueOS password.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <AuthTemplate
      title="Forgot your password?"
      description="Submit your account email to receive reset instructions."
    />
  );
}
