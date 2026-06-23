export default function VenueOnboardingPage() {
  const tasks = [
    "Venue profile",
    "Upload logo",
    "Choose brand colours",
    "Add suites/halls",
    "Add capacities",
    "Add event types",
    "Add packages",
    "Add menu items",
    "Set payment terms",
    "Choose email mode",
    "Configure WhatsApp templates",
    "Invite staff",
    "Create first booking",
  ];

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Venue onboarding</h1>
      <p className="muted mt-2">
        Complete setup to unlock accurate quotes, BEOs, schedules and reporting.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {tasks.map((task, index) => (
          <article key={task} className="card flex items-center justify-between p-4 text-sm">
            <span>
              {index + 1}. {task}
            </span>
            <span className="badge badge-warning">Pending</span>
          </article>
        ))}
      </div>
    </section>
  );
}
