import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import NewsListPage from "@/components/news/NewsListPage";
import {getPaginatedPosts} from "@/lib/news";

type NewsPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: NewsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Insights"});

  return {
    title: t("meta.title"),
    description: t("meta.description")
  };
}

export default async function NewsPage({params}: NewsPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  const paginated = await getPaginatedPosts(1);
  if (!paginated) {
    notFound();
  }

  return (
    <NewsListPage
      locale={locale}
      basePath={`/${locale}/news`}
      posts={paginated.posts}
      currentPage={paginated.currentPage}
      totalPages={paginated.totalPages}
    />
  );
}
