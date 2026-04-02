import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import SolutionsPage from "@/components/solutions/SolutionsPage";

type SolutionsPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: SolutionsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Solutions"});

  return {
    title: t("meta.title"),
    description: t("meta.description")
  };
}

export default async function Page({params}: SolutionsPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <SolutionsPage />;
}
