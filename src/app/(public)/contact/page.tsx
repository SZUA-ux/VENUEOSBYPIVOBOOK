import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact the PivoBook team about VenueOS onboarding, support and partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="container py-16">
      <h1 className="section-title">Talk to PivoBook</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">
        For onboarding, support and implementation queries, use the channels below.
      </p>
      <div className="grid-cards mt-8">
        <article className="card p-5">
          <h2 className="text-lg font-semibold">Sales and onboarding</h2>
          <p className="mt-2 text-sm text-slate-600">hello@pivobook.com</p>
        </article>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">Support</h2>
          <p className="mt-2 text-sm text-slate-600">support@pivobook.com</p>
        </article>
      </div>
    </section>
  );
}
