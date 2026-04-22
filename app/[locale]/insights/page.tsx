"use client";
import { useEffect, useState } from 'react';
import type { NewsPostSummary } from '@/lib/news-types';
import NewsListPage from '@/components/news/NewsListPage';
import { useTranslations, useLocale } from 'next-intl';

export default function InsightsPage() {
  const locale = useLocale();
  const t = useTranslations('Insights');
  const [posts, setPosts] = useState<NewsPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Network response was not ok');
        const data: NewsPostSummary[] = await res.json();
        setPosts(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const basePath = `/${locale}/insights`;

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
        <section className="text-center py-20">
          <p className="text-lg text-[var(--muted)]">{t('loading')}</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
        <section className="text-center py-20 text-red-600">{error}</section>
      </main>
    );
  }

  return (
    <NewsListPage
      locale={locale}
      basePath={basePath}
      posts={posts}
      currentPage={1}
      totalPages={1}
    />
  );
}

import { useEffect, useState } from 'react';
import type { NewsPostSummary } from '@/lib/news-types';
import NewsListPage from '@/components/news/NewsListPage';
import { useTranslations, useLocale } from 'next-intl';

import type { NewsPostSummary } from '@/lib/news-types';
import NewsListPage from '@/components/news/NewsListPage';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export default function InsightsPage() {
  const { locale, pathname } = useRouter();
  const t = useTranslations('Insights');
  const [posts, setPosts] = useState<NewsPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Network response was not ok');
        const data: NewsPostSummary[] = await res.json();
        setPosts(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // The basePath for links – we keep the same locale prefix
  const basePath = `/${locale}/insights`;

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
        <section className="text-center py-20">
          <p className="text-lg text-[var(--muted)]">{t('loading')}</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
        <section className="text-center py-20 text-red-600">{error}</section>
      </main>
    );
  }

  return (
    <NewsListPage
      locale={locale}
      basePath={basePath}
      posts={posts}
      currentPage={1}
      totalPages={1}
    />
  );
}
