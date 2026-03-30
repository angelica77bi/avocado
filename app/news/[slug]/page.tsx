import {redirect} from "next/navigation";
import {getAllPosts} from "@/lib/news";

type NewsDetailPageProps = {
  params: Promise<{slug: string}>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({slug: post.slug}));
}

export default async function NewsDetailPage({params}: NewsDetailPageProps) {
  const {slug} = await params;
  redirect(`/en/news/${slug}`);
}
