import { useRef } from "react";
import type { ReactNode } from "react";

/**
<<<<<<< HEAD
 * Painel-onda: gruda no topo e entra VARRENDO a seção anterior com uma
 * borda ondulada (SVG senoidal que ondula sem parar). Sem translateY —
 * a onda fica visível do começo ao fim da subida, varrendo a tela toda.
=======
 * Cápsula: o painel novo entra reduzido (0.62) como uma pílula
 * arredondada — a seção anterior fica visível ao redor, moldura da
 * prévia — e cresce até cobrir a tela. Sombra profunda dá o relevo.
 * A mesma linguagem do take do showcase, agora nas seções.
>>>>>>> develop
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
<<<<<<< HEAD
=======
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ["14vw", "0vw"]);

>>>>>>> develop
  return (
    <div
      ref={ref}
      className={`panel-wrap ${className ?? ""}`}
      style={{ zIndex: z }}
    >
<<<<<<< HEAD
      <div className="panel" style={{ background: fill }}>
        <Wave fill={fill} />
=======
      <motion.div
        className="panel capsule"
        style={{
          background: fill,
          ...(reduce ? {} : { scale, borderRadius: radius }),
        }}
      >
>>>>>>> develop
        {children}
      </div>
    </div>
  );
}
