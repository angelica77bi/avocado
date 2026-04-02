import {useTranslations} from "next-intl";

export default function SolutionsPage() {
  const t = useTranslations("Solutions");

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="rounded-3xl border border-[var(--line)] bg-[linear-gradient(150deg,var(--surface)_0%,var(--accent-soft)_100%)] px-7 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {t("header.eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          {t("header.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {t("header.description")}
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <section className="rounded-3xl border border-[var(--line)] p-8 transition hover:border-[var(--accent)] hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">For Buyers</h2>
          <p className="text-[var(--muted)]">
            Compare pricing across regions and technologies without relying on a single sourcing channel.
          </p>
        </section>
        <section className="rounded-3xl border border-[var(--line)] p-8 transition hover:border-[var(--accent)] hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">For Developers</h2>
          <p className="text-[var(--muted)]">
            Showcase projects to high-intent buyers and manage the transaction workflow in one place.
          </p>
        </section>
        <section className="rounded-3xl border border-[var(--line)] p-8 transition hover:border-[var(--accent)] hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">For Advisors</h2>
          <p className="text-[var(--muted)]">
            Use standard tools to manage due diligence, modeling, and client feedback more efficiently.
          </p>
        </section>
      </div>
    </main>
  );
}
