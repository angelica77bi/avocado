import type {MetadataRoute} from "next";
import {getAllPosts} from "@/lib/news";
import {getSiteUrl} from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts();
  const locales = ["en", "zh"];
  const lastModified = new Date();

  const staticPages = ["", "/about", "/projects", "/news"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8
      });
    }

    // Dynamic news posts
    for (const post of posts) {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6
      });
    }
  }

  return sitemapEntries;
}
