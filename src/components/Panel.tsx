import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Painéis de transição, duas linguagens:
 *
 * sheet — para seções longas (chalk, graphite): o painel entra como
 * uma folha com o TOPO arredondado varrendo a tela, com sombra
 * profunda — a seção anterior permanece visível nos cantos até o
 * final. Sem escala: conteúdo sempre legível, nunca preto-sobre-preto.
 *
 * capsule — para o finale lime (uma tela): entra reduzida e inclinada,
 * a seção anterior como moldura, e cresce até cobrir tudo.
 */
export function CapsulePanel({
  children,
  fill,
  className,
  variant = "sheet",
  z = 1,
}: {
  children: ReactNode;
  /** cor do painel */
  fill: string;
  /** classe de tinta (panel-chalk | panel-graphite | panel-lime) */
  className?: string;
  /** sheet = topo arredondado (seções longas) | capsule = cresce (finale) */
  variant?: "sheet" | "capsule";
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const radiusCapsule = useTransform(scrollYProgress, [0, 1], ["16vw", "0vw"]);
  const radiusSheet = useTransform(scrollYProgress, [0, 1], ["16vw 16vw 0 0", "0vw"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.42], [0, 1]);

  const motionStyle =
    variant === "capsule"
      ? { scale, borderRadius: radiusCapsule, rotate }
      : { borderRadius: radiusSheet };

  return (
    <div
      ref={ref}
      className={`panel-wrap ${className ?? ""}`}
      style={{ zIndex: z }}
    >
      <motion.div
        className={`panel ${variant === "capsule" ? "capsule" : "sheet"}`}
        style={{
          background: fill,
          ...(reduce ? {} : motionStyle),
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
