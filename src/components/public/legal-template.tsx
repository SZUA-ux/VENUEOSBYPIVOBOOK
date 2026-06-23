export function LegalTemplate({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="container py-16">
      <h1 className="section-title">{title}</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">{description}</p>
      <div className="card mt-8 space-y-4 p-6 text-sm leading-7 text-slate-700">
        <p>
          This page is a legal placeholder for the initial platform release. Replace with
          legal counsel-approved language before production launch.
        </p>
        <p>
          VenueOS by PivoBook.com processes venue business data as a SaaS provider and
          supports GDPR-aligned controls through role-based access and audit logging.
        </p>
      </div>
    </section>
  );
}
