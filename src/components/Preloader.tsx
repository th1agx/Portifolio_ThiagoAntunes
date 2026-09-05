import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { EASE } from "../lib/utils";
import { ScrambleText } from "./ScrambleText";

const COLS = [0, 1, 2, 3, 4];

const colVariants: Variants = {
  exit: (i: number) => ({
    y: "-101%",
    transition: { delay: 0.3 + i * 0.055, duration: 0.85, ease: EASE },
  }),
};

const fadeVariants: Variants = {
  exit: { opacity: 0, transition: { duration: 0.26 } },
};

/**
 * Tela de carregamento: contador com easing, nome em scramble,
 * régua de progresso e saída em cortina de colunas.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const D = 1900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  return (
    <motion.div className="preloader" exit="exit" aria-hidden="true">
      {COLS.map((i) => (
        <motion.div key={i} className="pre-col" custom={i} variants={colVariants} />
      ))}
      <motion.div className="pre-fade" variants={fadeVariants}>
        <p className="serif pre-label">preparando o palco</p>
        <div className="pre-name">
          <ScrambleText text="Thiago Filipe" mode="inview" className="pre-name-t" />
        </div>
        <div className="pre-count">
          {count}
          <span>%</span>
        </div>
        <div className="pre-bar" style={{ transform: `scaleX(${count / 100})` }} />
      </motion.div>
    </motion.div>
  );
}
