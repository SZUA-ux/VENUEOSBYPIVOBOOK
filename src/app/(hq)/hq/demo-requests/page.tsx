import { getDemoRequests } from "@/lib/hq-data";

export default async function HqDemoRequestsPage() {
  const rows = await getDemoRequests();

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Demo requests</h1>
      <p className="muted mt-2">
        Inbound leads from the public demo form, visible to sales and onboarding.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Venue</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Preferred time</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="p-3 font-medium">{row.full_name}</td>
                  <td className="p-3">{row.venue_name}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.phone ?? "-"}</td>
                  <td className="p-3">{row.status}</td>
                  <td className="p-3">{row.preferred_demo_time ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-slate-500" colSpan={6}>
                  No demo requests yet or Supabase environment variables are not configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
