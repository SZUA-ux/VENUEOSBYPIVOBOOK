import { DemoForm } from "@/components/public/demo-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a demo",
  description:
    "Request a VenueOS demo for your wedding, banqueting or event venue operation.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <section className="container py-16">
      <h1 className="section-title">Book a VenueOS demo</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">
        Tell us about your venue operation and current blockers. Your request is saved in
        PivoBook HQ for onboarding follow-up.
      </p>
      <DemoForm />
    </section>
  );
}
