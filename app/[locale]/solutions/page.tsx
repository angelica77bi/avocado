import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {toAbsoluteUrl} from "@/lib/site";

type SolutionsPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: SolutionsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const canonicalPath = `/${locale}/solutions`;

  return {
    title: "Solutions | Carbon Ledger",
    description: "Solutions for buyers, developers, and advisory teams.",
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: "Solutions | Carbon Ledger",
      description: "Solutions for buyers, developers, and advisory teams.",
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: "Solutions | Carbon Ledger",
      description: "Solutions for buyers, developers, and advisory teams."
    }
  };
}

export default async function SolutionsPage({params}: SolutionsPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-7 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Solutions</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          Deal execution by team type
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Explore workflows designed for procurement teams, project developers, and
          transaction advisors.
        </p>
      </header>
    </main>
  );
}
