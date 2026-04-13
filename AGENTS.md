# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Development Commands

- **Start Dev Server**: `npm run dev`
- **Build (Static Export)**: `npm run build`
- **Lint**: `npm run lint`
- **Scrape News**: `npm run scrape:news`
- **Scrape News (Scheduled)**: `npm run scrape:news:schedule`
- **Deploy to Cloudflare Pages**: `npm run deploy`
- **Deploy to Production Branch**: `npm run deploy:prod`

## Project Structure & Architecture

- **Framework**: Next.js 16 (App Router) with static export configuration (`output: "export"`).
- **Internationalization**: Uses `next-intl`. Supported locales are `en` (default) and `zh`.
    - `app/[locale]/`: Localized page routes.
    - `messages/`: JSON translation files.
    - `i18n/`: Configuration for routing and requests.
- **Styling**: Tailwind CSS 4 with PostCSS.
- **Content Management**:
    - `content/news/`: News articles are stored as Markdown files with YAML frontmatter.
    - `lib/news.ts`: Utilities for reading and parsing news Markdown files using `gray-matter`.
- **Components**:
    - `components/news/`: Components for news listings, cards, and pagination.
    - `components/projects/`: Components for project displays.
- **Data Fetching**:
    - `scripts/scrape-news.js`: Node.js script for scraping news using `axios` and `cheerio`.
- **Deployment**: Configured for Cloudflare Pages via `wrangler.toml` and `CLOUDFLARE_DEPLOY.md`.

## Coding Patterns

- **Static Export**: Ensure all pages and data fetching strategies are compatible with `output: "export"`.
- **Localization**: Use `next-intl` hooks (`useTranslations`, etc.) and ensure all user-facing text is localized.
- **Component Design**: Prefer functional components and Tailwind CSS for styling.
