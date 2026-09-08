import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";
import type { Language } from "@/i18n/translations";
import type { Theme } from "@/context/ThemeContext";
import "./LanguageThemeSwitcher.css";

export default function LanguageThemeSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const { theme, setTheme, effectiveTheme } = useTheme();

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

      {/* Theme Selector */}
      <div className="switcher-item">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="switcher-select"
          aria-label="Select theme"
        >
          <option value="light">{t.theme.light}</option>
          <option value="dark">{t.theme.dark}</option>
          <option value="system">System</option>
        </select>
      </div>

      {/* Theme Indicator */}
      <div className="theme-indicator" title={`Current: ${effectiveTheme}`}>
        {effectiveTheme === "dark" ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
