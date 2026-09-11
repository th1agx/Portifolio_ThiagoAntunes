/* ------------------------------------------------------------------ */
/* Camada de dados: conteúdo por idioma — única fonte de verdade.      */
/* Nova língua = novo arquivo aqui + entrada no Record.                */
/* ------------------------------------------------------------------ */
import type { Content, Lang } from "./types";
import { PT } from "./pt";
import { EN } from "./en";

export const CONTENT: Record<Lang, Content> = {
  pt: PT,
  en: EN,
};

export * from "./types";
