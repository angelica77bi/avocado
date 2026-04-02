import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Home.meta" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="site-shell">
        <header className="top-nav">
          <div className="container nav-row">
            <Link className="brand" href="/">
              {t("nav.brand")}
            </Link>
            <nav className="nav-links" aria-label={t("nav.ariaLabel")}>
              <Link href="/projects">{t("nav.projects")}</Link>
              <Link href="/about">{t("nav.about")}</Link>
            </nav>
          </div>
        </header>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
