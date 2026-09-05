import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../lib/utils";
import { gsap, SplitText } from "../lib/gsap";

/* ------------------------------------------------------------------ */
/* Primitivas de entrada usadas em todo o site.                        */
/* Todas respeitam prefers-reduced-motion.                             */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Entrada suave de baixo quando o elemento entra na viewport. */
export function Reveal({ children, delay = 0, y = 30, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.3 : 0.9,
        delay: reduce ? 0 : delay,
        ease: reduce ? "linear" : EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

interface LineMaskProps {
  children: ReactNode;
  /** Controla o início — usado para sincronizar com o fim do preloader. */
  ready?: boolean;
  delay?: number;
}

/** Linha de texto que sob de dentro de uma máscara (overflow hidden). */
export function LineMask({ children, ready = true, delay = 0 }: LineMaskProps) {
  const reduce = useReducedMotion();
  return (
    <span className="mask">
      <motion.span
        className="mask-inner"
        initial={{ y: reduce ? "0%" : "112%" }}
        animate={ready || reduce ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: reduce ? 0 : 1.15, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface LineInViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Mesma máscara, disparada por scroll — para títulos de seção. */
export function LineInView({ children, delay = 0, className }: LineInViewProps) {
  const reduce = useReducedMotion();
  return (
    <span className={`mask ${className ?? ""}`}>
      <motion.span
        className="mask-inner"
        initial={{ y: reduce ? "0%" : "112%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
        transition={{ duration: reduce ? 0 : 1.05, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Título revelado letra a letra (GSAP SplitText + ScrollTrigger):
 * cada caractere sobe com giro 3D e ritmo orgânico.
 */
export function WordsInView({ children, className }: LineInViewProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(ref.current!, { type: "words,chars" });
      gsap.set(split.chars, { transformOrigin: "50% 100%" });
      gsap.fromTo(
        split.chars,
        { yPercent: 120, rotateX: -75, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: { each: 0.02, from: "start" },
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <span className={`words-in ${className ?? ""}`} ref={ref}>
      {children}
    </span>
  );
}
