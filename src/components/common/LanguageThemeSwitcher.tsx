import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";
import type { Language } from "@/i18n/translations";
import "./LanguageThemeSwitcher.css";

export default function LanguageThemeSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const { setTheme, effectiveTheme } = useTheme();

  const languages: Language[] = ["en", "ru", "az"];

  return (
    <div className="switcher-group">
      {/* Language Selector */}
      <div className="switcher-item">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="switcher-select"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {t.languages[lang]}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Toggle */}
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
        aria-label={effectiveTheme === "dark" ? t.theme.light : t.theme.dark}
        title={effectiveTheme === "dark" ? t.theme.light : t.theme.dark}
      >
        {effectiveTheme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}