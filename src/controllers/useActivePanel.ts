import { useEffect } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

/**
 * Controller: descobre qual painel cobre o topo da viewport —
 * base para a tinta do nav trocar junto com a seção visível.
 * Regra isolada e testável: devolve a classe do painel dominante.
 */
export function useActivePanel(
  onChange: (cls: string) => void
): void {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const probe = y + 2;
    const wraps = [...document.querySelectorAll<HTMLElement>(".panel-wrap")];
    let current: HTMLElement | null = null;
    for (const w of wraps) {
      if (w.offsetTop <= probe) current = w;
    }
    let cls = current?.className ?? "";
    // o take lime do showcase vive DENTRO do painel graphite — quando
    // seu frame cobre o topo, a tinta precisa trocar também
    const take = document.querySelector<HTMLElement>(".showcase-sticky");
    if (take) {
      const r = take.getBoundingClientRect();
      if (r.top <= 2 && r.bottom > 2) cls += " lime";
    }
    onChange(cls);
  });
}

/** Painel claro (chalk/lime) para tinta escura? */
export function isLightPanel(cls: string): boolean {
  return cls.includes("chalk") || cls.includes("lime");
}

/** Trava o scroll do documento enquanto `locked` for true. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    document.documentElement.classList.toggle("lock", locked);
  }, [locked]);
}
