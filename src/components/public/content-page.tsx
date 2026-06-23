export function ContentHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="container py-16">
      <p className="badge badge-success">{kicker}</p>
      <h1 className="section-title mt-4 max-w-4xl">{title}</h1>
      <p className="muted mt-4 max-w-3xl text-lg leading-8">{description}</p>
    </section>
  );
}

export function BulletSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <section className="container mt-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {points.map((point) => (
          <li key={point} className="card p-4 text-sm leading-6">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
