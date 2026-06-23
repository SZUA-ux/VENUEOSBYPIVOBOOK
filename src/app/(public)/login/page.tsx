import { AuthTemplate } from "@/components/public/auth-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Login",
  description: "Login for VenueOS HQ and venue staff users.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <AuthTemplate
      title="Sign in to VenueOS"
      description="For PivoBook HQ users and authorised venue staff."
    />
  );
}
