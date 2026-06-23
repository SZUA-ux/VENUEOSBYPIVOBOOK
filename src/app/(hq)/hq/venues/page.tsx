import Link from "next/link";

const venues = [
  {
    id: "org-001",
    name: "Regency Banqueting",
    plan: "Pro",
    status: "active",
    onboarding: "86%",
  },
  {
    id: "org-002",
    name: "Royal Pearl Events",
    plan: "Starter",
    status: "trial",
    onboarding: "42%",
  },
];

export default function HqVenuesPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Organisations</h1>
      <p className="muted mt-2">
        Manage venues, plans, onboarding and subscription status.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Organisation</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Onboarding</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.id} className="border-b border-slate-100">
                <td className="p-3">
                  <Link href={`/hq/venues/${venue.id}`} className="font-medium text-teal-700">
                    {venue.name}
                  </Link>
                </td>
                <td className="p-3">{venue.plan}</td>
                <td className="p-3">{venue.status}</td>
                <td className="p-3">{venue.onboarding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
