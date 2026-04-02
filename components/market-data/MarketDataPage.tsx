import {useTranslations} from "next-intl";

export default function MarketDataPage() {
  const t = useTranslations("MarketData");

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-7 py-10 md:px-12">
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

      <section className="mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--background)]">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-6">Market Pulse Dashboard</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">Pricing Records</p>
              <p className="text-3xl font-display font-bold">4,800+</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">Active Projects</p>
              <p className="text-3xl font-display font-bold">1,200+</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">Markets Covered</p>
              <p className="text-3xl font-display font-bold">35</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">Update Cycle</p>
              <p className="text-3xl font-display font-bold">24h</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
