import {useTranslations} from "next-intl";

export default function Footer() {
  const ft = useTranslations("Footer");
  const navT = useTranslations("Home.nav");

  const footerSolutions = ft.raw("solutions") as string[];
  const footerPlatform = ft.raw("platform") as string[];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">{navT("brand")}</p>
          <p>{ft("tagline")}</p>
        </div>
        <div>
          <p className="footer-title">{ft("solutionsTitle")}</p>
          {footerSolutions.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>
        <div>
          <p className="footer-title">{ft("platformTitle")}</p>
          {footerPlatform.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>
        <div>
          <p className="footer-title">{ft("contactTitle")}</p>
          <a href={`mailto:${ft("email")}`}>{ft("email")}</a>
          <a href={`tel:${ft("phoneHref")}`}>{ft("phone")}</a>
          <span>{ft("city")}</span>
        </div>
      </div>
      <div className="container footer-meta">
        <small>{ft("copyright")}</small>
        <div>
          <a href="#">{ft("privacy")}</a>
          <a href="#">{ft("terms")}</a>
        </div>
      </div>
    </footer>
  );
}
