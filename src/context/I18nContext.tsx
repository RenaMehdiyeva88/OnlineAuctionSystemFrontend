import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { Language } from '@/i18n/translations';
import { getTranslation } from '@/i18n/translations';

const I18N_STORAGE_KEY = 'preferred-language';

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(I18N_STORAGE_KEY) as Language | null;
    return stored || 'en';
  });

  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: getTranslation(language) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
