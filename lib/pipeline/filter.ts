import type { NewsItem } from '@/lib/news-types';
import { isAfter, subDays, parseISO } from 'date-fns';

// Simple English detection – returns true if the string contains only ASCII letters, numbers, punctuation, and spaces.
function isEnglish(text: string): boolean {
  return /^[\x00-\x7F]*$/.test(text);
}

// Keywords configuration – include any of these words, exclude any of these.
import { INCLUDE_KEYWORDS, EXCLUDE_KEYWORDS } from '@/lib/config/keywords';

export function filterItems(items: NewsItem[]): NewsItem[] {
  const now = new Date();
  const cutoff = subDays(now, 7);
  return items.filter((item) => {
    // 1. Language check
    if (!isEnglish(item.title) || !isEnglish(item.summary)) return false;
    // 2. Date within last 7 days
    const itemDate = parseISO(item.published_at);
    if (!isAfter(itemDate, cutoff)) return false;
    // 3. Include keyword check (if any keywords defined)
    if (INCLUDE_KEYWORDS.length > 0) {
      const lower = (item.title + ' ' + item.summary).toLowerCase();
      if (!INCLUDE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()))) return false;
    }
    // 4. Exclude keyword check
    if (EXCLUDE_KEYWORDS.length > 0) {
      const lower = (item.title + ' ' + item.summary).toLowerCase();
      if (EXCLUDE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()))) return false;
    }
    return true;
  });
}
