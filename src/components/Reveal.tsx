import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../lib/utils";

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
 * Título revelado PALAVRA por palavra: cada uma sobe da máscara com
 * um leve giro — entrada rica, com ritmo, para títulos de seção.
 */
export function WordsInView({ children, className }: LineInViewProps) {
  const reduce = useReducedMotion();
  const text = typeof children === "string" ? children : String(children ?? "");
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={`words-in ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i} className="mask wi-mask">
          <motion.span
            className="mask-inner"
            initial={reduce ? { y: "0%" } : { y: "112%", rotate: 5 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
            transition={{
              duration: reduce ? 0 : 0.9,
              delay: reduce ? 0 : 0.08 + i * 0.07,
              ease: EASE,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
