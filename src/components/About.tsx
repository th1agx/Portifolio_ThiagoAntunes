import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ABOUT_PARAS } from "../data/content";
import type { Segment } from "../data/content";
import { EASE } from "../lib/utils";
import { LineInView, Reveal } from "./Reveal";

/**
 * Palavra que acende (0.3 → 1) assim que entra na viewport —
 * reveal por palavra, à prova de painéis sticky: nunca fica presa
 * meio-apagada.
 */
function Word({ w, em }: { w: string; em?: Segment["em"] }) {
  const reduce = useReducedMotion();
  const cls = em === "serif" ? "w-serif" : em === "green" ? "w-green" : undefined;
  return (
    <motion.span
      className={cls}
      initial={reduce ? { opacity: 1 } : { opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {w}{" "}
    </motion.span>
  );
}

/** Quem eu sou — parágrafos grandes com reveal palavra por palavra. */
export function About() {
  const paras = useMemo(
    () =>
      ABOUT_PARAS.map((segs) =>
        segs.flatMap((s: Segment) =>
          s.text
            .split(" ")
            .filter(Boolean)
            .map((w) => ({ w, em: s.em }))
        )
      ),
    []
  );

  return (
    <section className="section" id="sobre" aria-label="Sobre">
      <h2 className="sec-title">
        <LineInView>Além do código</LineInView>
      </h2>

      <div className="about-body">
        {paras.map((words, pi) => (
          <p key={pi} className="w-para">
            {words.map((word, wi) => (
              <Word key={`${pi}-${wi}`} w={word.w} em={word.em} />
            ))}
          </p>
        ))}

        <Reveal className="about-foot" y={24}>
          <p className="serif">quatro anos construindo software — e a curva só sobe.</p>
          <p className="current-role">
            Engenheiro de Software Júnior — <span className="green">3D Lab</span>, desde 06.2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
