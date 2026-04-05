"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import en from "@/messages/en";
import es from "@/messages/es";

export type Locale = "en" | "es";

type Messages = typeof en;
const messages: Record<Locale, Messages> = { en, es };

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("squeezr-locale") as Locale | null;
    if (saved && messages[saved]) {
      setLocaleState(saved);
    } else {
      const browser = navigator.language.startsWith("es") ? "es" : "en";
      setLocaleState(browser);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("squeezr-locale", l);
    document.documentElement.lang = l;
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
