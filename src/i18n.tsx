import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CONTENT } from "./data/content";
import type { Content, Lang } from "./data/content";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  c: Content;
}

const Ctx = createContext<LangCtx>({
  lang: "pt",
  setLang: () => {},
  c: CONTENT.pt,
});

const STORE_KEY = "th1agx-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = window.localStorage.getItem(STORE_KEY);
    return saved === "en" || saved === "pt" ? saved : "pt";
  });

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    window.localStorage.setItem(STORE_KEY, lang);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, c: CONTENT[lang] }),
    [lang]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** Conteúdo do idioma corrente */
export function useContent() {
  return useContext(Ctx).c;
}
