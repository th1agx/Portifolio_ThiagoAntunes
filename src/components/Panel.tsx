import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Cápsula: o painel novo entra bem reduzido e inclinado — a seção
 * anterior vira moldura de prévia ao redor — e cresce endireitando
 * até cobrir a tela, com o conteúdo acendendo junto. Sombra profunda
 * dá o relevo. A linguagem do take do showcase, em todas as seções.
 */
export function CapsulePanel({
  children,
  fill,
  className,
  z = 1,
}: {
  children: ReactNode;
  /** cor do painel */
  fill: string;
  /** classe de tinta (panel-chalk | panel-graphite | panel-lime) */
  className?: string;
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ["16vw", "0vw"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div
      ref={ref}
      className={`panel-wrap ${className ?? ""}`}
      style={{ zIndex: z }}
    >
      <motion.div
        className="panel capsule"
        style={{
          background: fill,
          ...(reduce ? {} : { scale, borderRadius: radius, rotate }),
        }}
      >
        <motion.div
          className="panel-content"
          style={reduce ? undefined : { opacity: contentOpacity }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
