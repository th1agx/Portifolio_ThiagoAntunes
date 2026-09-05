import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";

export type GsapPreset =
  | "wipe" /* cortina horizontal (clip-path) */
  | "slideL" /* entra da esquerda com back.out e leve giro */
  | "slideR" /* entra da direita com expo.out */
  | "drop" /* cai de cima com bounce.out */
  | "elastic" /* escala com elastic.out */
  | "skew"; /* sobe destorcendo com expo.out */

const PRESETS: Record<
  GsapPreset,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  wipe: {
    from: { clipPath: "inset(0 100% 0 0)", x: -34, opacity: 1 },
    to: { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.95, ease: "power4.out" },
  },
  slideL: {
    from: { x: -90, opacity: 0, rotate: -1.2 },
    to: { x: 0, opacity: 1, rotate: 0, duration: 1.0, ease: "back.out(1.5)" },
  },
  slideR: {
    from: { x: 90, opacity: 0, rotate: 1.2 },
    to: { x: 0, opacity: 1, rotate: 0, duration: 1.0, ease: "expo.out" },
  },
  drop: {
    from: { y: -80, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1.15, ease: "bounce.out" },
  },
  elastic: {
    from: { scale: 0.82, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 1.25, ease: "elastic.out(1, 0.6)" },
  },
  skew: {
    from: { y: 64, skewY: 3.5, opacity: 0 },
    to: { y: 0, skewY: 0, opacity: 1, duration: 1.0, ease: "expo.out" },
  },
};

/**
 * Entrada GSAP com preset — cada seção do site usa um diferente,
 * disparada por ScrollTrigger. Nada de fade genérico.
 */
export function GsapIn({
  preset,
  children,
  className,
  delay = 0,
}: {
  preset: GsapPreset;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const p = PRESETS[preset];
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, p.from, {
        ...p.to,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [preset, delay, reduce]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
