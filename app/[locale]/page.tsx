import {routing} from "@/i18n/routing";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {getPaginatedPosts} from "@/lib/news";
import NewsCard from "@/components/news/NewsCard";
import {Link} from "@/i18n/navigation";

type TextBlock = {
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

type WorkflowStep = {
  index: string;
  title: string;
  text: string;
};

type Faq = {
  q: string;
  a: string;
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "Home"});

  const capabilities = toArray<TextBlock>(t.raw("capabilities"));
  const buyers = toArray<string>(t.raw("audience.buyers.items"));
  const developers = toArray<string>(t.raw("audience.developers.items"));
  const partners = toArray<string>(t.raw("partners"));
  const faqs = toArray<Faq>(t.raw("faq.items"));
  const stats = toArray<Stat>(t.raw("stats.items"));
  const workflowSteps = toArray<WorkflowStep>(t.raw("workflow.steps"));

  const recentPostsData = await getPaginatedPosts(1, 3);
  const recentPosts = recentPostsData?.posts || [];

  return (
    <>
      <main>
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">{t("hero.eyebrow")}</p>
              <h1>{t("hero.title")}</h1>
              <p className="hero-text">{t("hero.text")}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#">
                  {t("hero.primaryCta")}
                </a>
                <a className="btn btn-ghost" href="#">
                  {t("hero.secondaryCta")}
                </a>
              </div>
            </div>
            <aside className="metrics-card reveal">
              <p className="card-title">{t("stats.title")}</p>
              <ul className="metrics-list">
                {stats.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="eyebrow">{t("capability.eyebrow")}</p>
            <h2>{t("capability.title")}</h2>
            <div className="card-grid stagger">
              {capabilities.map((item) => (
                <article key={item.title} className="feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="container">
            <p className="eyebrow">{t("trust.eyebrow")}</p>
            <h2>{t("trust.title")}</h2>
            <div className="logo-wall stagger">
              {partners.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container audience-grid">
            <article className="audience-card">
              <p className="eyebrow">{t("audience.buyers.eyebrow")}</p>
              <h3>{t("audience.buyers.title")}</h3>
              <ul>
                {buyers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="audience-card">
              <p className="eyebrow">{t("audience.developers.eyebrow")}</p>
              <h3>{t("audience.developers.title")}</h3>
              <ul>
                {developers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {recentPosts.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className="eyebrow">{t("recentInsights.eyebrow")}</p>
                  <h2>{t("recentInsights.title")}</h2>
                </div>
                <Link
                  href="/news"
                  className="hidden text-sm font-semibold uppercase tracking-wider text-[var(--accent)] transition hover:text-[var(--accent-strong)] md:block"
                >
                  {t("recentInsights.viewAll")} →
                </Link>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {recentPosts.map((post) => (
                  <NewsCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    basePath={`/${locale}/news`}
                  />
                ))}
              </div>
              <div className="mt-8 text-center md:hidden">
                <Link
                  href="/news"
                  className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
                >
                  {t("recentInsights.viewAll")} →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="container">
            <p className="eyebrow">{t("workflow.eyebrow")}</p>
            <h2>{t("workflow.title")}</h2>
            <ol className="steps stagger">
              {workflowSteps.map((step) => (
                <li key={step.index}>
                  <span>{step.index}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container cta-box reveal">
            <p className="eyebrow">{t("cta.eyebrow")}</p>
            <h2>{t("cta.title")}</h2>
            <a className="btn btn-primary" href="#">
              {t("cta.action")}
            </a>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <p className="eyebrow">{t("faq.eyebrow")}</p>
            <h2>{t("faq.title")}</h2>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
