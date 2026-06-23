import { submitDemoRequest } from "@/lib/actions";
import { MarketingShell } from "@/components/MarketingShell";
import { Button, Card, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book a VenueOS Demo - PivoBook.com",
  description:
    "Request a demo of VenueOS for wedding venues, banqueting halls, Asian wedding venues, hotels and multi-suite event operators.",
  path: "/demo",
});

const fields = [
  ["full_name", "Full name", "text", true],
  ["venue_name", "Venue name", "text", true],
  ["email", "Email", "email", true],
  ["phone", "Phone", "tel", true],
  ["website", "Website", "url", false],
  ["number_of_venues", "Number of venues", "number", true],
  ["number_of_suites", "Number of suites / halls", "number", true],
  ["average_events_per_month", "Average events per month", "number", true],
  ["current_system", "Current system used", "text", false],
  ["preferred_demo_time", "Preferred demo time", "text", false],
] as const;

export default function DemoPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Book a Demo"
        title="Show us how your venue operates today"
        subtitle="The form creates a demo request record in Supabase for PivoBook HQ when your Supabase environment is configured."
      >
        <Card className="mx-auto max-w-4xl">
          <form action={submitDemoRequest} className="grid gap-5 md:grid-cols-2">
            {fields.map(([name, label, type, required]) => (
              <label key={name} className="grid gap-2 text-sm font-bold text-slate-700">
                {label}
                <input className="form-field" type={type} name={name} required={required} min={type === "number" ? 0 : undefined} />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Biggest problem
              <textarea className="form-field min-h-32" name="biggest_problem" required placeholder="Tell us what is hard to manage today: BEOs, menus, payment balances, multi-event weddings, staff, spreadsheets..." />
            </label>
            <label className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700 md:col-span-2">
              <input type="checkbox" name="consent" required />
              I consent to PivoBook contacting me about VenueOS.
            </label>
            <div className="md:col-span-2">
              <Button>Submit demo request</Button>
            </div>
          </form>
        </Card>
      </Section>
    </MarketingShell>
  );
}
