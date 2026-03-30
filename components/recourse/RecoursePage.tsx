import type {RecourseCopy} from "@/lib/recourse";

type RecoursePageProps = {
  copy: RecourseCopy;
};

export default function RecoursePage({copy}: RecoursePageProps) {
  return (
    <main className="recourse-main">
      <div className="container recourse-layout">
        <section className="recourse-panel recourse-panel-hero reveal">
          <div className="recourse-center">
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

        <section className="recourse-panel recourse-panel-split">
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

        <section className="recourse-panel recourse-panel-split recourse-panel-library">
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

        <section className="recourse-panel recourse-panel-full">
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

        <section className="recourse-panel recourse-panel-full">
          <div className="recourse-subscribe">
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
