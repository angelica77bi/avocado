import {useTranslations} from "next-intl";

export default function MarketDataPage() {
  const t = useTranslations("MarketData");

  const regions = t.raw("regions.items") as Array<{
    region: string;
    tech: string;
    price: string;
    trend: string;
  }>;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-14 md:px-10">
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
          <h2 className="text-2xl font-semibold mb-6">{t("dashboard.title")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">{t("dashboard.stats.pricing")}</p>
              <p className="text-3xl font-display font-bold">4,800+</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">{t("dashboard.stats.projects")}</p>
              <p className="text-3xl font-display font-bold">1,200+</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)] mb-1">{t("dashboard.stats.markets")}</p>
              <p className="text-3xl font-display font-bold">35</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] p-6 bg-[var(--surface)] shadow-[0_0_20px_rgba(190,230,137,0.3)]">
              <p className="text-sm text-[var(--muted)] mb-1">{t("dashboard.stats.cycle")}</p>
              <p className="text-3xl font-display font-bold text-[var(--accent)]">24h</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{t("regions.title")}</h2>
          <p className="text-[var(--muted)] mt-2">{t("regions.description")}</p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-[var(--line)] bg-[var(--surface)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[rgba(35,77,54,0.03)]">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t("regions.headers.region")}</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t("regions.headers.tech")}</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t("regions.headers.price")}</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t("regions.headers.trend")}</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((item, i) => (
                <tr key={i} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(35,77,54,0.02)] transition">
                  <td className="px-8 py-5 font-semibold text-[var(--foreground)]">{item.region}</td>
                  <td className="px-8 py-5 text-[var(--muted)]">{item.tech}</td>
                  <td className="px-8 py-5 font-mono text-[var(--accent)] font-bold">{item.price}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.trend.startsWith("+") ? "bg-green-100 text-green-800" :
                      item.trend.startsWith("-") ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
