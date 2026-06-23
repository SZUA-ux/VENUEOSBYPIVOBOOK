import { AuthCard, AuthFields } from "@/components/AuthCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Login",
  description: "Login to VenueOS by PivoBook.com.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <AuthCard title="Login" subtitle="Venue staff and PivoBook HQ users log in here. External customers do not have accounts.">
      <AuthFields mode="login" />
    </AuthCard>
  );
}
