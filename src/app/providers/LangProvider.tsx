import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CONTENT } from "../../data/content";
import type { Content, Lang } from "../../data/content";

/**
 * Provider de idioma cuja fonte da verdade é a ROTA:
 * "/" => português · "/en" => english. O toggle navega; a URL é
 * compartilhável e o idioma sobrevive ao refresh.
 */

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  c: Content;
}

const Ctx = createContext<LangCtx>({ lang: "pt", setLang: () => {}, c: CONTENT.pt });

const STORE_KEY = "th1agx-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Lang = location.pathname === "/en" ? "en" : "pt";

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    window.localStorage.setItem(STORE_KEY, lang);
  }, [lang]);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang: (l) => navigate(l === "en" ? "/en" : "/"),
      c: CONTENT[lang],
    }),
    [lang, navigate]
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
