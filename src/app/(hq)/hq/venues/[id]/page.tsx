type Props = {
  params: Promise<{ id: string }>;
};

export default async function HqVenueDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Venue profile: {id}</h1>
        <p className="muted mt-2">
          Organisation summary, plan status, usage trends, onboarding and support history.
        </p>
      </div>
      <div className="grid-cards">
        {[
          "Owner and contact profile",
          "Subscription and Stripe status",
          "Onboarding progress tracker",
          "Support ticket timeline",
          "Usage and health score",
          "Internal notes",
        ].map((item) => (
          <article key={item} className="card p-4 text-sm text-slate-700">
            {item}
          </article>
        ))}
      </div>
    </section>
  );
}
