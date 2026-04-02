"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ProjectsPageShell() {
  const t = useTranslations("Projects");
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);
  const desktopSidebarRef = useRef<HTMLElement | null>(null);
  const mobileSidebarRef = useRef<HTMLElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  const filterSections = [
    t("filter.sections.country"),
    t("filter.sections.technology"),
    t("filter.sections.capacity"),
    t("filter.sections.developer")
  ];

  const mockProjects = [
    {
      id: 1,
      title: "1.1GW Solar Project — Australia",
      country: "Australia",
      type: "Solar",
      capacity_mw: 1100,
      developer: "European Energy",
      stage: "Approved",
      opportunity: "Investment / EPC",
      source_url: "https://www.pv-tech.org/european-energy-approval-1-1gw-solar-project-australia/"
    },
    {
      id: 2,
      title: "500MW Offshore Wind — Vietnam",
      country: "Vietnam",
      type: "Wind",
      capacity_mw: 500,
      developer: "Mainstream Renewable Power",
      stage: "Development",
      opportunity: "Partnership",
      source_url: "#"
    },
    {
      id: 3,
      title: "200MW Battery Storage — USA",
      country: "USA",
      type: "Storage",
      capacity_mw: 200,
      developer: "NextEra Energy",
      stage: "Under Construction",
      opportunity: "Asset Sale",
      source_url: "#"
    },
    {
      id: 4,
      title: "300MW Hybrid Solar-Wind — Spain",
      country: "Spain",
      type: "Hybrid",
      capacity_mw: 300,
      developer: "Iberdrola",
      stage: "Approved",
      opportunity: "EPC",
      source_url: "#"
    },
    {
      id: 5,
      title: "800MW Solar Park — India",
      country: "India",
      type: "Solar",
      capacity_mw: 800,
      developer: "Adani Green Energy",
      stage: "Operational",
      opportunity: "Refinancing",
      source_url: "#"
    },
    {
      id: 6,
      title: "1.2GW Offshore Wind — UK",
      country: "UK",
      type: "Wind",
      capacity_mw: 1200,
      developer: "Ørsted",
      stage: "Development",
      opportunity: "Investment",
      source_url: "#"
    },
    {
      id: 7,
      title: "150MW Wind Farm — Brazil",
      country: "Brazil",
      type: "Wind",
      capacity_mw: 150,
      developer: "Casa dos Ventos",
      stage: "Approved",
      opportunity: "Investment",
      source_url: "#"
    },
    {
      id: 8,
      title: "400MW Solar Project — Chile",
      country: "Chile",
      type: "Solar",
      capacity_mw: 400,
      developer: "Enel Green Power",
      stage: "Under Construction",
      opportunity: "EPC / Partnership",
      source_url: "#"
    },
    {
      id: 9,
      title: "100MW Floating Solar — Thailand",
      country: "Thailand",
      type: "Solar",
      capacity_mw: 100,
      developer: "EGAT",
      stage: "Operational",
      opportunity: "Case Study",
      source_url: "#"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    Technology: [],
    Country: []
  });

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTech =
      activeFilters.Technology.length === 0 ||
      activeFilters.Technology.includes(project.type);

    const matchesCountry =
      activeFilters.Country.length === 0 ||
      activeFilters.Country.includes(project.country);

    return matchesSearch && matchesTech && matchesCountry;
  });

  const toggleFilter = (section: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[section] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [section]: next };
    });
  };

  const isSidebarOpen = isPinnedOpen || isHoveringEdge;

  useEffect(() => {
    if (!isPinnedOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (
        desktopSidebarRef.current?.contains(target) ||
        mobileSidebarRef.current?.contains(target) ||
        filterButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsPinnedOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPinnedOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPinnedOpen]);

  return (
    <main className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-14 md:px-10">
      <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden md:block">
        <div
          className="pointer-events-auto relative h-full w-8"
          onMouseEnter={() => setIsHoveringEdge(true)}
          onMouseLeave={() => setIsHoveringEdge(false)}
        >
          <div
            aria-hidden="true"
            className={`absolute left-0 top-0 h-full transition-[width,background-color] duration-300 ease-out ${
              isSidebarOpen
                ? "w-[8px] bg-[color-mix(in_srgb,var(--accent)_62%,var(--muted)_38%)]"
                : "w-[3px] bg-[color-mix(in_srgb,var(--line)_88%,white_12%)]"
            }`}
          />

          <aside
            ref={desktopSidebarRef}
            className={`absolute left-0 top-[96px] h-[calc(100vh-128px)] w-[clamp(220px,18vw,320px)] rounded-r-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_90%,white_10%)_0%,color-mix(in_srgb,var(--accent-soft)_18%,white_82%)_100%)] p-5 shadow-[0_20px_48px_rgba(35,77,54,0.08)] transition-transform duration-300 ease-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-[var(--line)] pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t("filter.title")}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {t("filter.description")}
                </p>
              </div>

              <div className="mt-5 space-y-6 overflow-y-auto pr-1">
                {/* Technology Filter */}
                <section className="rounded-[22px] border border-dashed border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--surface)_82%,white_18%)] p-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                    {t("filter.sections.technology")}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Solar", "Wind", "Storage", "Hybrid"].map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleFilter("Technology", tech)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          activeFilters.Technology.includes(tech)
                            ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                            : "border-[var(--line)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Country Filter */}
                <section className="rounded-[22px] border border-dashed border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--surface)_82%,white_18%)] p-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                    {t("filter.sections.country")}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Australia", "Vietnam", "USA", "Spain", "India", "UK", "Brazil", "Chile", "Thailand"].map((country) => (
                      <button
                        key={country}
                        onClick={() => toggleFilter("Country", country)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          activeFilters.Country.includes(country)
                            ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                            : "border-[var(--line)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {isPinnedOpen ? (
        <button
          aria-label={t("filter.close")}
          className="fixed inset-0 z-30 bg-[rgba(35,77,54,0.08)] backdrop-blur-[1px]"
          onClick={() => setIsPinnedOpen(false)}
          type="button"
        />
      ) : null}

      <section className="relative z-10 rounded-[32px] border border-[var(--line)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--surface)_92%,white_8%)_0%,color-mix(in_srgb,var(--accent-soft)_22%,white_78%)_100%)] px-6 py-8 shadow-[0_18px_48px_rgba(35,77,54,0.06)] md:px-10 md:py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {t("header.eyebrow")}
        </p>
        <h1 className="mt-3 text-center font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          {t("header.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[var(--muted)]">
          {t("header.description")}
        </p>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 md:flex-row md:items-center">
          <label className="block flex-1">
            <span className="sr-only">{t("search.label")}</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_80%,white_20%)] px-6 py-4 text-base text-[var(--foreground)] shadow-[0_14px_34px_rgba(35,77,54,0.08)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent-soft)_70%,white_30%)]"
            />
          </label>
          <button
            ref={filterButtonRef}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_34%,var(--line)_66%)] bg-[color-mix(in_srgb,var(--surface)_76%,white_24%)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)] shadow-[0_12px_28px_rgba(35,77,54,0.08)] transition hover:-translate-y-[1px] hover:bg-[color-mix(in_srgb,var(--accent-soft)_54%,white_46%)]"
            onClick={() => setIsPinnedOpen((current) => !current)}
            type="button"
          >
            <span aria-hidden="true">☰</span>
            {t("filter.button")}
          </button>
        </div>
      </section>

      <aside
        ref={mobileSidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-[min(85vw,320px)] rounded-r-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_92%,white_8%)_0%,color-mix(in_srgb,var(--accent-soft)_18%,white_82%)_100%)] p-5 shadow-[0_20px_48px_rgba(35,77,54,0.12)] transition-transform duration-300 ease-out md:hidden ${
          isPinnedOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("filter.title")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {t("filter.description")}
              </p>
            </div>
            <button
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]"
              onClick={() => setIsPinnedOpen(false)}
              type="button"
            >
              {t("filter.close")}
            </button>
          </div>

          <div className="mt-5 space-y-4 overflow-y-auto pr-1">
            {filterSections.map((section) => (
              <section
                key={section}
                className="rounded-[22px] border border-dashed border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--surface)_82%,white_18%)] p-4"
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                  {section}
                </h2>
                <div className="mt-3 h-20 rounded-2xl bg-[color-mix(in_srgb,var(--background)_48%,white_52%)]" />
              </section>
            ))}
          </div>
        </div>
      </aside>

      <section className="relative z-10 mt-8 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_16px_40px_rgba(35,77,54,0.05)] md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("list.eyebrow")}
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-[var(--foreground)]">
              {t("list.title")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            {t("list.description")}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-5 transition-[transform,opacity] duration-300 ease-out md:grid-cols-2 lg:grid-cols-3 ${
            isSidebarOpen ? "md:translate-x-3" : ""
          }`}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_88%,white_12%)_0%,color-mix(in_srgb,var(--background)_68%,white_32%)_100%)] p-5 shadow-[0_14px_28px_rgba(35,77,54,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(35,77,54,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {project.type}
                    </span>
                    <span className="text-xs font-semibold text-[var(--muted)]">
                      {project.country}
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 font-display text-lg leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                    <a href={project.source_url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.title}
                    </a>
                  </h3>

                  <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
                    <li className="flex items-center justify-between">
                      <span>{t("list.card.capacity")}</span>
                      <span className="font-medium text-[var(--foreground)]">{project.capacity_mw} MW</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("list.card.developer")}</span>
                      <span className="font-medium text-[var(--foreground)]">{project.developer}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-lg border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-3 py-1.5 text-xs font-medium capitalize text-[var(--foreground)] shadow-sm">
                    {project.stage}
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-3 py-1.5 text-xs font-medium capitalize text-[var(--foreground)] shadow-sm">
                    {project.opportunity}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-[var(--muted)]">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
