"use client";

import {useState, useEffect} from "react";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

type NavbarProps = {
  locale: string;
  brandName: string;
};

export default function Navbar({locale, brandName}: NavbarProps) {
  const t = useTranslations("Home");
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    <header className="top-nav">
      <div className="container nav-row">
        <Link className="brand" href="/">
          {brandName}
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-only" aria-label={t("nav.ariaLabel")}>
          <Link href="/market-data">{t("nav.marketData")}</Link>
          <Link href="/news">{t("nav.insights")}</Link>
          <Link href="/projects">{t("nav.projects")}</Link>
          <Link href="/solutions">{t("nav.solutions")}</Link>
          <Link href="/resources">{t("nav.resources")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
        </nav>

        <div className="nav-actions desktop-only">
          <Link
            href="/"
            locale={locale === "en" ? "zh" : "en"}
            className="lang-switcher"
          >
            {locale === "en" ? "中文" : "EN"}
          </Link>
          <Link className="btn btn-login" href="#">
            {t("nav.login")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? "active" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}>
        <nav className="mobile-nav-links" onClick={() => setIsOpen(false)}>
          <Link href="/market-data">{t("nav.marketData")}</Link>
          <Link href="/news">{t("nav.insights")}</Link>
          <Link href="/projects">{t("nav.projects")}</Link>
          <Link href="/solutions">{t("nav.solutions")}</Link>
          <Link href="/resources">{t("nav.resources")}</Link>
          <Link href="/about">{t("nav.about")}</Link>

          <div className="mobile-menu-divider" />

          <div className="mobile-nav-actions">
             <Link
                href="/"
                locale={locale === "en" ? "zh" : "en"}
                className="lang-switcher"
              >
                {locale === "en" ? "Switch to Chinese" : "切换至英文"}
              </Link>
              <Link className="btn btn-primary" href="#">
                {t("nav.login")}
              </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
