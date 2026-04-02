import type {ResourceCopy} from "@/lib/resources";

type ResourcesPageProps = {
  copy: ResourceCopy;
};

export default function ResourcesPage({copy}: ResourcesPageProps) {
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
                placeholder={copy.hero.searchPlaceholder}
                aria-label={copy.hero.searchPlaceholder}
              />
              <button className="btn btn-primary" type="button">
                {copy.hero.searchButton}
              </button>
            </div>
            <div className="resource-filters" aria-label={copy.nav.resources}>
              {copy.filters.map((item) => (
                <button key={item} className="resource-pill" type="button">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="resources-panel resources-panel-split">
          <p className="eyebrow">{copy.featured.eyebrow}</p>
          <h2>{copy.featured.title}</h2>
          <div className="resource-grid featured-grid stagger">
            {copy.featured.items.map((item) => (
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

        <section className="resources-panel resources-panel-full">
          <p className="eyebrow">{copy.resources.eyebrow}</p>
          <h2>{copy.resources.title}</h2>
          <div className="resource-grid stagger">
            {copy.resources.items.map((item) => (
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
