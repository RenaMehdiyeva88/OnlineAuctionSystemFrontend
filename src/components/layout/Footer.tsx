import { Link } from "react-router-dom";
import { useI18n } from "@/context/I18nContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="footer">
      <div className="container footer__content">
        {/* ---- Brand Section ---- */}
        <div className="footer__section footer__section--brand">
          <div className="footer__brand">
            <span className="footer__brand-icon">⚒</span>
            <span>Auctionhouse</span>
          </div>
          <p className="footer__tagline">
            {t.ui.footerTagline}
          </p>
        </div>

        {/* ---- Browse Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">{t.auctions.browse}</h4>
          <ul className="footer__links">
            <li><Link to="/auctions">{t.auctions.browse}</Link></li>
            <li><Link to="/auctions">{t.home.categories}</Link></li>
            <li><Link to="/">{t.ui.footerHowItWorks}</Link></li>
          </ul>
        </div>

        {/* ---- Sell Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">{t.ui.footerSell}</h4>
          <ul className="footer__links">
            <li><Link to="/register">{t.ui.footerStartSelling}</Link></li>
            <li><Link to="/">{t.ui.footerSellerFees}</Link></li>
            <li><Link to="/">{t.ui.footerAuthentication}</Link></li>
          </ul>
        </div>

        {/* ---- Support Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">{t.ui.footerSupport}</h4>
          <ul className="footer__links">
            <li><a href="mailto:support@auctionhouse.local">{t.ui.footerContact}</a></li>
            <li><Link to="/">{t.ui.footerHelpCenter}</Link></li>
            <li><Link to="/">{t.ui.footerTerms}</Link></li>
          </ul>
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="footer__bottom">
        <div className="container footer__bottom-content">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Auctionhouse. {t.ui.footerRights}
          </span>
          <div className="footer__legal">
            <a href="/" className="footer__legal-link">{t.ui.footerPrivacy}</a>
            <a href="/" className="footer__legal-link">{t.ui.footerTerms}</a>
            <a href="/" className="footer__legal-link">{t.ui.footerCookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}