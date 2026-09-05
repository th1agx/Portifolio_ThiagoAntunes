import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { MARQUEE_ITEMS } from "../data/content";
import { clamp, wrap } from "../lib/utils";

function Chunk({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-chunk" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="marquee-item">
          <span className={i % 2 ? "o" : undefined}>{item}</span>
          <span className="marquee-sep" aria-hidden="true">
            /
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Marquee infinito ligado à velocidade do scroll: rolar acelera,
 * rolar para trás chega a inverter a direção — o site "sente" o gesto.
 */
export function Marquee() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const xPct = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);
  const speed = useRef(-4.5); // %/s no estado de repouso
  const lastY = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const sy = window.scrollY;
    const dy = sy - lastY.current;
    lastY.current = sy;
    const boost = clamp(dy * -0.32, -16, 16);
    speed.current += (-4.5 + boost - speed.current) * 0.08;
    x.set(x.get() + (speed.current * delta) / 1000);
  });

  return (
    <div className="marquee" aria-label="Stack em destaque">
      <motion.div className="marquee-track" style={reduce ? undefined : { x: xPct }}>
        <Chunk />
        <Chunk hidden />
      </motion.div>
    </div>
  );
}
