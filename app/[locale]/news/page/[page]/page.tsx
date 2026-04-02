import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import NewsListPage from "@/components/news/NewsListPage";
import {getAllPosts, getPaginatedPosts, POSTS_PER_PAGE} from "@/lib/news";

type NewsPaginationPageProps = {
  params: Promise<{locale: string; page: string}>;
};

export async function generateMetadata({
  params
}: NewsPaginationPageProps): Promise<Metadata> {
  const {locale, page} = await params;
  const t = await getTranslations({locale, namespace: "Insights"});

  return {
    title: `${t("meta.title")} - Page ${page}`,
    description: t("meta.description")
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const locales = ["en", "zh"];

  const params = [];
  for (const locale of locales) {
    for (let page = 1; page <= totalPages; page++) {
      params.push({locale, page: page.toString()});
    }
  }

  return params;
}

export default async function NewsPaginationPage({
  params
}: NewsPaginationPageProps) {
  const {locale, page} = await params;
  setRequestLocale(locale);

  const pageNumber = parseInt(page, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const paginated = await getPaginatedPosts(pageNumber);
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
