import { AuthCard, AuthFields } from "@/components/AuthCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Forgot Password",
  description: "Recover access to VenueOS by PivoBook.com.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Forgot password" subtitle="Enter your email to receive a Supabase password reset link when auth is configured.">
      <AuthFields mode="forgot" />
    </AuthCard>
  );
}
