"use client";

import { useEffect, useRef, useState } from "react";

const filterSections = ["Country", "Technology", "Capacity", "Developer"];

const MOCK_PROJECT = {
  title: "1.1GW Solar Project — Australia",
  country: "Australia",
  type: "solar",
  capacity_mw: 1100,
  developer: "European Energy",
  stage: "approved",
  opportunity: "investment / EPC",
  source_url: "https://www.pv-tech.org/european-energy-approval-1-1gw-solar-project-australia/"
};

const mockProjects = Array.from({ length: 9 }, (_, index) => ({
  ...MOCK_PROJECT,
  id: index,
}));

export default function ProjectsPageShell() {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);
  const desktopSidebarRef = useRef<HTMLElement | null>(null);
  const mobileSidebarRef = useRef<HTMLElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

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
                  Filters
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Placeholder sidebar for future project filtering.
                </p>
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
        </div>
      </div>

      {isPinnedOpen ? (
        <button
          aria-label="Close filter sidebar"
          className="fixed inset-0 z-30 bg-[rgba(35,77,54,0.08)] backdrop-blur-[1px]"
          onClick={() => setIsPinnedOpen(false)}
          type="button"
        />
      ) : null}

      <section className="relative z-10 rounded-[32px] border border-[var(--line)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--surface)_92%,white_8%)_0%,color-mix(in_srgb,var(--accent-soft)_22%,white_78%)_100%)] px-6 py-8 shadow-[0_18px_48px_rgba(35,77,54,0.06)] md:px-10 md:py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Project Listing
        </p>
        <h1 className="mt-3 text-center font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
          Renewable energy project database
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[var(--muted)]">
          Explore placeholder listings for utility-scale solar, wind, storage, and
          hybrid assets across different markets.
        </p>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 md:flex-row md:items-center">
          <label className="block flex-1">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects..."
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
            Filter
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
                Filters
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Placeholder sidebar for future project filtering.
              </p>
            </div>
            <button
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]"
              onClick={() => setIsPinnedOpen(false)}
              type="button"
            >
              Close
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
              Projects
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-[var(--foreground)]">
              Project cards area
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            Use the Filter button or hover at the left edge on desktop to reveal the
            sidebar.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-5 transition-[transform,opacity] duration-300 ease-out md:grid-cols-2 lg:grid-cols-3 ${
            isSidebarOpen ? "md:translate-x-3" : ""
          }`}
        >
          {mockProjects.map((project) => (
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
                    <span>Capacity</span>
                    <span className="font-medium text-[var(--foreground)]">{project.capacity_mw} MW</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Developer</span>
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
          ))}
        </div>
      </section>
    </main>
  );
}
