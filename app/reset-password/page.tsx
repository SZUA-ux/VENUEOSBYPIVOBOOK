import { AuthCard, AuthFields } from "@/components/AuthCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Reset Password",
  description: "Reset your VenueOS password.",
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Reset password" subtitle="Choose a new password after opening a verified Supabase reset link.">
      <AuthFields mode="reset" />
    </AuthCard>
  );
}
