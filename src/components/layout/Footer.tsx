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
            Fair bidding. Transparent pricing. Secure transactions.
          </p>
        </div>

        {/* ---- Browse Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">{t.auctions.browse}</h4>
          <ul className="footer__links">
            <li><Link to="/auctions">{t.auctions.browse}</Link></li>
            <li><Link to="/auctions">{t.home.categories}</Link></li>
            <li><Link to="/">How it works</Link></li>
          </ul>
        </div>

        {/* ---- Sell Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">Sell</h4>
          <ul className="footer__links">
            <li><Link to="/register">Start selling</Link></li>
            <li><Link to="/">Seller fees</Link></li>
            <li><Link to="/">Authentication</Link></li>
          </ul>
        </div>

        {/* ---- Support Section ---- */}
        <div className="footer__section">
          <h4 className="footer__section-title">Support</h4>
          <ul className="footer__links">
            <li><a href="mailto:support@auctionhouse.local">Contact us</a></li>
            <li><Link to="/">Help center</Link></li>
            <li><Link to="/">Terms of service</Link></li>
          </ul>
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="footer__bottom">
        <div className="container footer__bottom-content">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Auctionhouse. All rights reserved.
          </span>
          <div className="footer__legal">
            <a href="/" className="footer__legal-link">Privacy Policy</a>
            <a href="/" className="footer__legal-link">Terms of Service</a>
            <a href="/" className="footer__legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}