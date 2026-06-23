import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const compareMap: Record<string, { title: string; summary: string }> = {
  "venueos-vs-spreadsheets": {
    title: "VenueOS vs spreadsheets",
    summary:
      "Connected workflows, audit logs and event-day outputs versus disconnected sheets and manual duplication.",
  },
  "venueos-vs-generic-crm": {
    title: "VenueOS vs generic CRM",
    summary:
      "Operationally complete venue workflows versus sales-only pipelines with no BEO or event-day execution context.",
  },
  "venueos-vs-wedding-planner-software": {
    title: "VenueOS vs wedding planner software",
    summary:
      "Venue-side command and control for teams, not client-side planning portals for couples.",
  },
  "venueos-vs-tripleseat-style-tools": {
    title: "VenueOS vs Tripleseat-style venue tools",
    summary:
      "Custom fit for multicultural wedding and banqueting complexity, with practical controls for UK-style operations.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = compareMap[slug];
  if (!entry) {
    return {
      title: "Comparison",
      description: "VenueOS comparison page",
    };
  }
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/compare/${slug}` },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const entry = compareMap[slug] ?? {
    title: "Comparison page",
    summary: "This comparison page can be populated by your content team.",
  };

  return (
    <section className="container py-16">
      <h1 className="section-title">{entry.title}</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">{entry.summary}</p>
      <div className="card mt-8 overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Capability</th>
              <th className="p-2">VenueOS</th>
              <th className="p-2">Typical alternative</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr>
              <td className="p-2">BEO and function sheets</td>
              <td className="p-2">Native and connected</td>
              <td className="p-2">Often missing or manual</td>
            </tr>
            <tr>
              <td className="p-2">Payment ledger tracking</td>
              <td className="p-2">Manual ledger with audit trail</td>
              <td className="p-2">External spreadsheets</td>
            </tr>
            <tr>
              <td className="p-2">Multi-event wedding support</td>
              <td className="p-2">Core workflow</td>
              <td className="p-2">Partial support</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
