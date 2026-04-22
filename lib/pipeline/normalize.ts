import type { NewsItem, NewsPostSummary } from '@/lib/news-types';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * Strip query parameters and fragments from a URL, returning the canonical form.
 */
export function canonicalizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return rawUrl; // fallback to original if parsing fails
  }
}

/**
 * Convert any date string to ISO 8601 UTC.
 */
export function toIsoUtc(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

/**
 * Normalization step – canonical URL, UTC timestamps, image fallback.
 */
export function normalizeItems(items: NewsItem[]): NewsPostSummary[] {
  return items.map((item) => {
    const canonicalUrl = canonicalizeUrl(item.url);
    const isoDate = toIsoUtc(item.published_at);
    const image = item.featuredImage || '/default-news.jpg';
    // Derive slug from canonical URL path (last segment without extension)
    const slug = canonicalUrl.split('/').filter(Boolean).pop() ?? '';
    const summary: NewsPostSummary = {
      title: item.title,
      date: isoDate,
      category: item.source,
      excerpt: item.summary.slice(0, 200) + (item.summary.length > 200 ? '…' : ''),
      featuredImage: image,
      slug,
    } as any; // cast because NewsPostSummary omits content
    return summary;
  });
}
