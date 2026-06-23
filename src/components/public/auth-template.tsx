export function AuthTemplate({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="muted mt-2 text-sm">{description}</p>
        <form className="mt-6 space-y-3">
          <label className="text-sm">
            Email
            <input className="input mt-1" type="email" />
          </label>
          <label className="text-sm">
            Password
            <input className="input mt-1" type="password" />
          </label>
          <button type="button" className="button-primary w-full">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}
