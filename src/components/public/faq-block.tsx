import { FAQ_ITEMS } from "@/lib/site";

export function FaqBlock() {
  return (
    <section className="container mt-16">
      <h2 className="section-title">Frequently asked questions</h2>
      <div className="mt-6 grid gap-4">
        {FAQ_ITEMS.map((item) => (
          <article key={item.question} className="card p-5">
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
