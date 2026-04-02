export function formatPostDate(date: string, locale: string): string {
  const resolvedLocale = locale === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(resolvedLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00.000Z`));
}
