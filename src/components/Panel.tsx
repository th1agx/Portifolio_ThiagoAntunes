import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Painéis de transição — câmera parada, conteúdo transitando:
 *
 * sheetR / sheetL — a seção inteira DESLIZA lateralmente para o
 * lugar (como um take de vídeo passando diante da câmera), com a
 * seção anterior visível ao lado durante o travessia e o conteúdo
 * em contramovimento interno (parallax de câmera).
 *
 * capsule — para o finale lime: entra reduzida e inclinada e cresce
 * até cobrir tudo.
 */
export function CapsulePanel({
  children,
  fill,
  className,
  variant = "sheetR",
  z = 1,
}: {
  children: ReactNode;
  /** cor do painel */
  fill: string;
  /** classe de tinta (panel-chalk | panel-graphite | panel-lime) */
  className?: string;
  /** sheetR = desliza da direita | sheetL = da esquerda | capsule = cresce */
  variant?: "sheetR" | "sheetL" | "capsule";
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // take lateral: o painel inteiro atravessa a tela
  const xR = useTransform(scrollYProgress, [0, 1], ["46vw", "0vw"]);
  const xL = useTransform(scrollYProgress, [0, 1], ["-46vw", "0vw"]);
  const radiusSide = useTransform(scrollYProgress, [0, 1], ["10vw 0 0 10vw", "0vw"]);
  const radiusSideL = useTransform(scrollYProgress, [0, 1], ["0 10vw 10vw 0", "0vw"]);
  // contramovimento interno do conteúdo — acento de câmera
  const innerX = useTransform(scrollYProgress, [0, 1], ["-7vw", "0vw"]);
  const innerXL = useTransform(scrollYProgress, [0, 1], ["7vw", "0vw"]);
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.5], [0, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const radiusCapsule = useTransform(scrollYProgress, [0, 1], ["16vw", "0vw"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 0]);

  let panelStyle: Record<string, unknown> | undefined;
  let contentStyle: Record<string, unknown> | undefined;
  if (!reduce) {
    if (variant === "capsule") {
      panelStyle = { scale, borderRadius: radiusCapsule, rotate };
    } else if (variant === "sheetL") {
      panelStyle = { x: xL, borderRadius: radiusSideL };
      contentStyle = { x: innerXL, opacity: contentOpacity };
    } else {
      panelStyle = { x: xR, borderRadius: radiusSide };
      contentStyle = { x: innerX, opacity: contentOpacity };
    }
  }

  return (
    <div
      ref={ref}
      className={`panel-wrap ${className ?? ""}`}
      style={{ zIndex: z }}
    >
      <motion.div
        className={`panel ${variant}`}
        style={{ background: fill, ...panelStyle }}
      >
        <motion.div className="panel-content" style={contentStyle}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
