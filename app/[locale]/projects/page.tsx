import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { toAbsoluteUrl } from "@/lib/site";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  const canonicalPath = `/${locale}/projects`;

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

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPageShell />;
}
