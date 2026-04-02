import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {resourceContent, type ResourceLocale} from "@/lib/resources";
import ResourcesPage from "@/components/resources/ResourcesPage";

type ResourcesPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: ResourcesPageProps): Promise<Metadata> {
  const {locale} = await params;
  const content = resourceContent[locale as ResourceLocale];

  if (!content) {
    return {};
  }

  return {
    title: content.meta.title,
    description: content.meta.description
  };
}

export default async function Page({params}: ResourcesPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  const content = resourceContent[locale as ResourceLocale];
  if (!content) {
    notFound();
  }

  return <ResourcesPage copy={content} />;
}
