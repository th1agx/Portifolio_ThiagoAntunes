import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export type ParallaxDir = "up" | "down" | "left" | "right";

/**
 * Câmera parada, conteúdo em movimento: o elemento atravessa a
 * viewport em velocidade própria (mais rápido ou mais lento que o
 * scroll) — para cima, para baixo ou lateralmente. O movimento é
 * contínuo na entrada, na travessia e na saída.
 */
export function Parallax({
  dir = "up",
  speed = 1,
  className,
  children,
}: {
  dir?: ParallaxDir;
  /** 0.3 = quase preso à câmera · 2 = dispara */
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 110 * speed;
  const up = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const down = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const left = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const right = useTransform(scrollYProgress, [0, 1], [-range, range]);

  const style =
    dir === "up" ? { y: up }
    : dir === "down" ? { y: down }
    : dir === "left" ? { x: left }
    : { x: right };

  return (
    <motion.div
      ref={ref}
      className={`parallax ${className ?? ""}`}
      style={reduce ? undefined : { ...style, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
