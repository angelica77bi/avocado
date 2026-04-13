"use client";

import NewsCard from "@/components/news/NewsCard";
import NewsPagination from "@/components/news/NewsPagination";
import type {NewsPostSummary} from "@/lib/news-types";
import {useTranslations} from "next-intl";
import {useState} from "react";

type NewsListPageProps = {
  locale: string;
  basePath: string;
  posts: NewsPostSummary[];
  currentPage: number;
  totalPages: number;
};

export default function NewsListPage({
  locale,
  basePath,
  posts,
  currentPage,
  totalPages
}: NewsListPageProps) {
  const t = useTranslations("Insights");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <header className="mb-10 rounded-3xl border border-[var(--line)] bg-[linear-gradient(150deg,color-mix(in_srgb,var(--surface)_75%,white_25%)_0%,color-mix(in_srgb,var(--accent-soft)_45%,white_55%)_100%)] px-7 py-10 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {t("description")}
            </p>
          </div>
          <div className="w-full min-w-0 md:w-80">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_80%,white_20%)] px-5 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </header>

      {filteredPosts.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-[var(--line-strong)] bg-[var(--surface)] p-12 text-center text-[var(--muted)]">
          {searchQuery ? t("empty") : t("empty")}
        </section>
      ) : (
        <section className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <NewsCard
              key={post.slug}
              post={post}
              locale={locale}
              basePath={basePath}
            />
          ))}
        </section>
      )}

      {searchQuery === "" && (
        <NewsPagination
          basePath={basePath}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </main>
  );
}
