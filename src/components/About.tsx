import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Segment } from "../data/content";
import { useContent } from "../i18n";
import { EASE } from "../lib/utils";
import { WordsInView } from "./Reveal";
import { GsapIn } from "./GsapIn";
import { Parallax } from "./Parallax";

/**
 * Palavra que acende (0.3 → 1) assim que entra na viewport —
 * reveal por palavra, à prova de painéis sticky: nunca fica presa
 * meio-apagada.
 */
function Word({ w, em, i }: { w: string; em?: Segment["em"]; i: number }) {
  const reduce = useReducedMotion();
  const cls = em === "serif" ? "w-serif" : em === "green" ? "w-green" : undefined;
  return (
    <motion.span
      className={cls}
      initial={reduce ? { opacity: 1 } : { opacity: 0.3, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.55,
        // variação orgânica: cada palavra tem seu atraso próprio
        delay: reduce ? 0 : ((i * 37) % 11) / 60,
        ease: EASE,
      }}
    >
      {w}{" "}
    </motion.span>
  );
}

/** Quem eu sou — parágrafos grandes com reveal palavra por palavra. */
export function About() {
  const c = useContent();
  const paras = useMemo(
    () =>
      c.about.paras.map((segs) =>
        segs.flatMap((s: Segment) =>
          s.text
            .split(" ")
            .filter(Boolean)
            .map((w) => ({ w, em: s.em }))
        )
      ),
    [c]
  );

  return (
    <section className="section" id="sobre" aria-label="Sobre">
      <Parallax dir="left" speed={0.9}>
        <h2 className="sec-title">
          <WordsInView>{c.sections.aboutTitle}</WordsInView>
        </h2>
      </Parallax>

      <div className="about-body">
        {paras.map((words, pi) => (
          <GsapIn key={pi} preset={pi % 2 ? "slideR" : "skew"}>
          <p className="w-para">
            {words.map((word, wi) => (
              <Word key={`${pi}-${wi}`} w={word.w} em={word.em} i={wi} />
            ))}
          </p>
          </GsapIn>
        ))}

        <GsapIn preset="wipe">
        <div className="about-foot">
          <p className="serif">{c.about.footSerif}</p>
          <p className="current-role">
            {c.about.rolePre} <span className="green">{c.about.roleHL}</span>{c.about.rolePos}
          </p>
        </div>
        </GsapIn>
      </div>
    </section>
  );
}
