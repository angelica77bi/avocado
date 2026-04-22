export const RSS_SOURCES = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    maxItems: 20,
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    maxItems: 20,
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/rss',
    maxItems: 20,
  },
];

// Timeout per source in milliseconds
export const SOURCE_TIMEOUT_MS = 6000;
