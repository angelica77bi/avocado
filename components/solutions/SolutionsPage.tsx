import {useTranslations} from "next-intl";

export default function SolutionsPage() {
  const t = useTranslations("Solutions");

  const roles = [
    { key: "buyers", icon: "📊" },
    { key: "developers", icon: "🏗️" },
    { key: "advisors", icon: "🤝" }
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-14 md:px-10">
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

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {roles.map((role) => (
          <section key={role.key} className="relative flex flex-col rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]">
            <div className="text-4xl mb-6">{role.icon}</div>
            <h2 className="text-2xl font-semibold mb-3">
              {t(`roles.${role.key}.title`)}
            </h2>
            <p className="text-[var(--muted)] leading-7 mb-8">
              {t(`roles.${role.key}.description`)}
            </p>

            <div className="mt-auto">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">Key Capabilities</h3>
              <ul className="space-y-4">
                {(t.raw(`roles.${role.key}.features`) as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-6 text-[var(--foreground)]">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] text-[var(--accent-strong)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
