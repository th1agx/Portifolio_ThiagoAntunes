import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Cápsula: o painel novo entra reduzido (0.62) como uma pílula
 * arredondada — a seção anterior fica visível ao redor, moldura da
 * prévia — e cresce até cobrir a tela. Sombra profunda dá o relevo.
 * A mesma linguagem do take do showcase, agora nas seções.
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ["14vw", "0vw"]);

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
          ...(reduce ? {} : { scale, borderRadius: radius }),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
