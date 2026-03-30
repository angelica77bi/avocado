import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {toAbsoluteUrl} from "@/lib/site";

type MarketDataPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: MarketDataPageProps): Promise<Metadata> {
  const {locale} = await params;
  const canonicalPath = `/${locale}/market-data`;

  return {
    title: "Market Data | Carbon Ledger",
    description: "Live and historical market datasets for clean-energy transactions.",
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: "Market Data | Carbon Ledger",
      description: "Live and historical market datasets for clean-energy transactions.",
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: "Market Data | Carbon Ledger",
      description: "Live and historical market datasets for clean-energy transactions."
    }
  };
}

export default async function MarketDataPage({params}: MarketDataPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-7 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Market Data
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          Market intelligence dashboards
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Benchmark pricing, volatility, and deal activity signals across key clean
          energy markets.
        </p>
      </header>
    </main>
  );
}
