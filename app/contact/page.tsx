import { submitContactRequest } from "@/lib/actions";
import { MarketingShell } from "@/components/MarketingShell";
import { Button, Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact PivoBook - VenueOS Enquiries",
  description:
    "Contact PivoBook.com about VenueOS for venue operations, onboarding, pricing, support or partnership enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Contact"
        title="Talk to PivoBook about VenueOS"
        subtitle="Use this for general enquiries. Demo requests should use the dedicated demo form so HQ can route them correctly."
      >
        <Card className="mx-auto max-w-3xl">
          <form action={submitContactRequest} className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Full name
              <input className="form-field" name="full_name" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Email
              <input className="form-field" name="email" type="email" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Phone
              <input className="form-field" name="phone" type="tel" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Message
              <textarea className="form-field min-h-36" name="message" required />
            </label>
            <Button>Send enquiry</Button>
          </form>
        </Card>
      </Section>
    </MarketingShell>
  );
}
