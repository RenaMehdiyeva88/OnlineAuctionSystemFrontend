import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { useI18n } from "@/context/I18nContext";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container not-found">
      <span className="not-found__lot mono">{t.pages.notFoundLot}</span>
      <h1>{t.pages.notFoundTitle}</h1>
      <p>{t.pages.notFoundText}</p>
      <Link to="/">
        <Button>{t.pages.notFoundBack}</Button>
      </Link>
    </div>
  );
}