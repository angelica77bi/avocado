import Parser from 'rss-parser';
import type { NewsItem } from '@/lib/news-types';
import { RSS_SOURCES, SOURCE_TIMEOUT_MS } from '@/lib/config/sources';

const parser = new Parser();

/**
 * Fetch a single RSS source with timeout.
 */
async function fetchSource(source: { name: string; url: string; maxItems: number }): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const feed = await parser.parseURL(source.url, { signal: controller.signal });
    const items: NewsItem[] = [];
    for (const entry of feed.items.slice(0, source.maxItems)) {
      items.push({
        title: entry.title ?? '',
        url: entry.link ?? '',
        source: source.name,
        published_at: entry.isoDate ?? new Date().toISOString(),
        summary: entry.contentSnippet ?? entry.content ?? '',
        featuredImage: (entry.enclosure?.url as string) ?? '',
      });
    }
    return items;
  } catch (err) {
    console.warn(`Failed to fetch ${source.name}:`, err);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch all configured sources, skipping any that fail.
 */
export async function fetchAll(): Promise<NewsItem[]> {
  const results: NewsItem[] = [];
  for (const src of RSS_SOURCES) {
    const items = await fetchSource(src);
    results.push(...items);
  }
  return results;
}
