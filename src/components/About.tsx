import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { ABOUT_PARAS } from "../data/content";
import type { Segment } from "../data/content";
import { LineInView, Reveal } from "./Reveal";

type WordData = { w: string; em?: Segment["em"]; pi: number; wi: number };

function Word({
  word,
  progress,
  range,
}: {
  word: WordData;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.42, 1]);
  const cls = word.em === "serif" ? "w-serif" : word.em === "green" ? "w-green" : undefined;
  return (
    <motion.span className={cls} style={{ opacity }}>
      {word.w}
    </motion.span>
  );
}

/**
 * Texto revelado palavra por palavra conforme o scroll —
 * a leitura acompanha o dedo/mouse do visitante.
 */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const paras = useMemo(
    () =>
      ABOUT_PARAS.map((segs, pi) => ({
        segs,
        words: segs
          .flatMap((s: Segment) =>
            s.text
              .split(" ")
              .filter(Boolean)
              .map((w) => ({ w, em: s.em }))
          )
          .map((w, wi) => ({ ...w, pi, wi })),
      })),
    []
  );
  const total = useMemo(() => paras.reduce((n, p) => n + p.words.length, 0), [paras]);
  const rangeFor = (i: number): [number, number] => [i / total, Math.min(1, (i + 1.6) / total)];

  let flat = 0;

  return (
    <section className="section" id="sobre" aria-label="Sobre">
      <h2 className="sec-title">
        <LineInView>Além do código</LineInView>
      </h2>

      <div ref={ref} className="about-body">
        {paras.map((p, pi) => (
          <p key={pi} className="w-para">
            {p.words.map((word) => {
              const i = flat++;
              return reduce ? (
                <span
                  key={`${pi}-${word.wi}`}
                  className={
                    word.em === "serif" ? "w-serif" : word.em === "green" ? "w-green" : undefined
                  }
                >
                  {word.w}{" "}
                </span>
              ) : (
                <Word
                  key={`${pi}-${word.wi}`}
                  word={word}
                  progress={scrollYProgress}
                  range={rangeFor(i)}
                />
              );
            })}
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
