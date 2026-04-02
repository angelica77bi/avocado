# Carbon Ledger

Carbon Ledger is a transaction infrastructure platform for clean-energy procurement and project transactions. It connects buyers, developers, and advisors in a unified workspace to source, evaluate, negotiate, and close deals faster.

## 🚀 Features

- **Next.js 16 (App Router)**: Built with the latest Next.js features for speed and reliability.
- **Static Export**: Optimized for static hosting (e.g., Cloudflare Pages).
- **Full Localization (i18n)**: Supports English (en) and Chinese (zh) using `next-intl`.
- **Dynamic News Engine**:
  - Automated news scraper for climate and energy insights.
  - Concurrency-controlled and robust enrichment process.
  - Full-text search-ready markdown storage.
- **Resource Hub**: Practical guides, market briefings, and procurement playbooks.
- **Market Intelligence**: Real-time pricing records and risk analytics.
- **SEO Optimized**:
  - Dynamic `sitemap.xml` and `robots.txt`.
  - Localized metadata for every page.
  - OpenGraph and Twitter card support.
- **Tailwind CSS 4**: Modern styling with a clean, marketplace-style aesthetic.

## 🛠️ Development

### Setup

```bash
npm install
```

### Commands

- `npm run dev`: Start the development server.
- `npm run build`: Build the project (static export).
- `npm run lint`: Run ESLint check.
- `npm run scrape:news`: Run the news scraper manually.
- `npm run scrape:news:schedule`: Start the scraper on a 12-hour schedule.
- `npm run deploy`: Deploy to Cloudflare Pages (preview).
- `npm run deploy:prod`: Deploy to Cloudflare Pages (production).

## 📂 Project Structure

- `app/[locale]/`: Localized page routes.
- `components/`: Reusable React components (News, Projects, Resources, etc.).
- `messages/`: JSON translation files for i18n.
- `content/news/`: Scraped news articles stored as Markdown.
- `scripts/`: Utility scripts (e.g., news scraper).
- `lib/`: Shared utilities and data fetching logic.

## 🌐 Deployment

The project is configured for **Cloudflare Pages**.
Production URL: [https://main.avocado-5l5.pages.dev](https://main.avocado-5l5.pages.dev)

---
Built with [Claude Code](https://github.com/anthropics/claude-code)
