import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import MarketDataPage from "@/components/market-data/MarketDataPage";

type MarketDataPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: MarketDataPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "MarketData"});

  return {
    title: t("meta.title"),
    description: t("meta.description")
  };
}

export default async function Page({params}: MarketDataPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <MarketDataPage />;
}
