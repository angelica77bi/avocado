import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {getAllPosts, getPostBySlug, renderMarkdown, formatPostDate} from "@/lib/news";

type NewsPostPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({
  params
}: NewsPostPageProps): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Carbon Ledger`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage ? [post.featuredImage] : []
    }
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const locales = ["en", "zh"];

  const params = [];
  for (const locale of locales) {
    for (const post of posts) {
      params.push({locale, slug: post.slug});
    }
  }

  return params;
}

export default async function NewsPostPage({params}: NewsPostPageProps) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const contentHtml = await renderMarkdown(post.content);
  const t = await getTranslations({locale, namespace: "Insights"});

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pb-24 pt-14 md:px-10">
      <header className="mb-12">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-[var(--muted)]">
          <Link href={`/${locale}/news`} className="transition hover:text-[var(--accent)]">
            {t("eyebrow")}
          </Link>
          <span>/</span>
          <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs">
            {post.category}
          </span>
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
        </div>
        <h1 className="font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
      </header>

      {post.featuredImage && (
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-3xl bg-[var(--surface)]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-a:text-[var(--accent)] prose-img:rounded-3xl"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <footer className="mt-16 border-t border-[var(--line)] pt-8">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center text-sm font-semibold tracking-wide text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
        >
          ← {t("backToAll")}
        </Link>
      </footer>
    </article>
  );
}
