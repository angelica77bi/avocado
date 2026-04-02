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
    </main>
  );
}
