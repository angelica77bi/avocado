import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import RecoursePage from "@/components/recourse/RecoursePage";
import {type RecourseLocale, recourseContent} from "@/lib/recourse";
import {toAbsoluteUrl} from "@/lib/site";

type ResourcesRouteProps = {
  params: Promise<{locale: string}>;
};

function toRecourseLocale(locale: string): RecourseLocale {
  return locale === "zh" ? "zh" : "en";
}

export async function generateMetadata({
  params
}: ResourcesRouteProps): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = toRecourseLocale(locale);
  const copy = recourseContent[currentLocale];
  const canonicalPath = `/${currentLocale}/resources`;

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description
    }
  };
}

export default async function LocalizedResourcesPage({params}: ResourcesRouteProps) {
  const {locale} = await params;
  const currentLocale = toRecourseLocale(locale);
  const copy = recourseContent[currentLocale];
  setRequestLocale(currentLocale);

  return <RecoursePage copy={copy} />;
}
