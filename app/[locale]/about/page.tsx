import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {toAbsoluteUrl} from "@/lib/site";

type AboutPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: AboutPageProps): Promise<Metadata> {
  const {locale} = await params;
  const canonicalPath = `/${locale}/about`;

  return {
    title: "About | Carbon Ledger",
    description: "Mission, team, and operating principles behind Carbon Ledger.",
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: "About | Carbon Ledger",
      description: "Mission, team, and operating principles behind Carbon Ledger.",
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: "About | Carbon Ledger",
      description: "Mission, team, and operating principles behind Carbon Ledger."
    }
  };
}

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-7 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">About</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          Built for faster clean-energy transactions
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Carbon Ledger provides shared market context and execution infrastructure so
          teams can move from sourcing to signed terms with less friction.
        </p>
      </header>
    </main>
  );
}
