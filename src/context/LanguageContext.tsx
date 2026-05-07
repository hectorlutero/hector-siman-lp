"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "pt" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (pt: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  const toggle = () => setLang((prev) => (prev === "pt" ? "en" : "pt"));
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
