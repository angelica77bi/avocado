import type {Metadata} from "next";
import {setRequestLocale, getTranslations} from "next-intl/server";
import {toAbsoluteUrl} from "@/lib/site";

type AboutPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: AboutPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "About"});
  const canonicalPath = `/${locale}/about`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description")
    }
  };
}

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "About"});

  const values = t.raw("values.items") as Array<{title: string, text: string}>;

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

      <section className="mt-16 grid gap-12 md:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--line)] p-8 bg-[linear-gradient(150deg,var(--surface)_0%,var(--accent-soft)_100%)]">
          <h2 className="text-2xl font-semibold mb-4">{t("mission.title")}</h2>
          <p className="text-lg leading-relaxed text-[var(--foreground)]">
            {t("mission.text")}
          </p>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] p-8 bg-[var(--background)]">
          <h2 className="text-2xl font-semibold mb-4">{t("vision.title")}</h2>
          <p className="text-lg leading-relaxed text-[var(--foreground)]">
            {t("vision.text")}
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-sm uppercase tracking-[0.3em] text-[var(--muted)] mb-12">
          {t("values.title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="p-8 rounded-3xl border border-[var(--line)] hover:border-[var(--accent)] transition hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[var(--muted)] leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
