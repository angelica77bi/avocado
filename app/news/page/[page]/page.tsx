import {redirect} from "next/navigation";
import {POSTS_PER_PAGE, getAllPosts} from "@/lib/news";

type NewsPaginationPageProps = {
  params: Promise<{page: string}>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  if (totalPages <= 1) {
    return [];
  }

  return Array.from({length: totalPages - 1}, (_, index) => ({
    page: String(index + 2)
  }));
}

export default async function NewsPaginationPage({
  params
}: NewsPaginationPageProps) {
  const {page} = await params;
  redirect(`/en/news/page/${page}`);
}
