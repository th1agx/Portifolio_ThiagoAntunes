import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initScroll(): Lenis | null {
  if (lenis) return lenis;
  if (typeof window === "undefined") return null;
  // Respeita quem pede menos movimento: scroll nativo, sem suavização.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  lenis = new Lenis({ lerp: 0.09, autoRaf: true });
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToSection(target: string | number): void {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
