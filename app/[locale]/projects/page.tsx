import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ProjectsPageShell from "@/components/projects/ProjectsPageShell";
import { toAbsoluteUrl } from "@/lib/site";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonicalPath = `/${locale}/projects`;

  return {
    title: "Projects | Carbon Ledger",
    description: "Explore current clean-energy projects and transaction opportunities.",
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: "Projects | Carbon Ledger",
      description: "Explore current clean-energy projects and transaction opportunities.",
      type: "website",
      url: toAbsoluteUrl(canonicalPath)
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | Carbon Ledger",
      description: "Explore current clean-energy projects and transaction opportunities."
    }
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPageShell />;
}
