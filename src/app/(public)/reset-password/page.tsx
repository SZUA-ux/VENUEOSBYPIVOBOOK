import { AuthTemplate } from "@/components/public/auth-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reset password",
  description: "Set a new password for your VenueOS account.",
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <AuthTemplate
      title="Reset your password"
      description="Choose a secure password to continue to VenueOS."
    />
  );
}
