"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import type {ResourceCopy, ResourceItem} from "@/lib/resources";

type ResourcesPageProps = {
  copy: ResourceCopy;
};

export default function ResourcesPage({copy}: ResourcesPageProps) {
  const t = useTranslations("Resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filterItem = (item: ResourceItem) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === "All" || item.type.includes(activeFilter) || (activeFilter === "PPA Pricing" && item.title.includes("PPA"));

    return matchesSearch && matchesFilter;
  };

  const filteredFeatured = copy.featured.items.filter(filterItem);
  const filteredResources = copy.resources.items.filter(filterItem);
  const hasResults = filteredFeatured.length > 0 || filteredResources.length > 0;

  return (
    <main className="resources-main">
      <div className="container resources-layout">
        <section className="resources-panel resources-panel-hero reveal">
          <div className="resources-center">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-text">{copy.hero.description}</p>
            <div className="resource-search-wrap" role="search">
              <input
                className="resource-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.hero.searchPlaceholder}
                aria-label={copy.hero.searchPlaceholder}
              />
              <button className="btn btn-primary" type="button">
                {copy.hero.searchButton}
              </button>
            </div>
            <div className="resource-filters" aria-label={copy.nav.resources}>
              {copy.filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`resource-pill ${activeFilter === item ? "active" : ""}`}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {!hasResults ? (
          <section className="py-20 text-center">
            <p className="text-[var(--muted)] text-lg">{t("empty")}</p>
          </section>
        ) : (
          <>
            {filteredFeatured.length > 0 && (
              <section className="resources-panel resources-panel-split">
                <p className="eyebrow">{copy.featured.eyebrow}</p>
                <h2>{copy.featured.title}</h2>
                <div className="resource-grid featured-grid stagger">
                  {filteredFeatured.map((item) => (
                    <article key={item.title} className="resource-card resource-card-featured">
                      <p className="resource-type">{item.type}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="resource-meta">
                        <span>{item.readTime}</span>
                        <a href={item.href}>{copy.actions.read}</a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="resources-panel resources-panel-split resources-panel-library">
              <div className="library-box">
                <p className="eyebrow">{copy.library.eyebrow}</p>
                <h2>{copy.library.title}</h2>
                <p>{copy.library.description}</p>
                <div className="library-grid">
                  {copy.library.highlights.map((item) => (
                    <div key={item} className="library-chip">
                      {item}
                    </div>
                  ))}
                </div>
                <a className="btn btn-ghost" href="#">
                  {copy.library.action}
                </a>
              </div>
            </section>

            {filteredResources.length > 0 && (
              <section className="resources-panel resources-panel-full">
                <p className="eyebrow">{copy.resources.eyebrow}</p>
                <h2>{copy.resources.title}</h2>
                <div className="resource-grid stagger">
                  {filteredResources.map((item) => (
                    <article key={item.title} className="resource-card">
                      <p className="resource-type">{item.type}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="resource-meta">
                        <span>{item.readTime}</span>
                        <a href={item.href}>{copy.actions.read}</a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <section className="resources-panel resources-panel-full">
          <div className="resources-subscribe">
            <p className="eyebrow">{copy.subscribe.eyebrow}</p>
            <h2>{copy.subscribe.title}</h2>
            <p>{copy.subscribe.description}</p>
            <a className="btn btn-primary" href="#">
              {copy.subscribe.action}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

