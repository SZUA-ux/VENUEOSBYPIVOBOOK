export function SectionPlaceholder({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="muted mt-2 max-w-3xl">{description}</p>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {bullets.map((item) => (
          <li key={item} className="card p-4 text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
