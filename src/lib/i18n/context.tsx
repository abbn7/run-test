import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  dir: "ltr" | "rtl";
  t: (en: string, ar: string) => string;
}

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "an_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "en";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "ar" : "en"), [lang, setLang]);

  const t = useCallback(
    (en: string, ar: string) => (lang === "ar" ? ar : en),
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, dir: lang === "ar" ? "rtl" : "ltr", t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
