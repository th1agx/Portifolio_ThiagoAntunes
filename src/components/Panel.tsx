import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * Painel-onda: gruda no topo e entra VARRENDO a seção anterior com uma
 * borda ondulada (SVG senoidal que ondula sem parar). Sem translateY —
 * a onda fica visível do começo ao fim da subida, varrendo a tela toda.
 */

const WAVE_PATH =
  "M0,70 C260,148 520,2 760,70 C1000,138 1240,6 1440,70 L1440,0 L0,0 Z";

function Wave({ fill }: { fill: string }) {
  return (
    <div className="wave" aria-hidden="true">
      <div className="wave-track">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill={fill} />
        </svg>
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

export function WavePanel({
  children,
  fill,
  className,
  z = 1,
}: {
  children: ReactNode;
  /** cor do painel e da onda */
  fill: string;
  /** classe de tinta (panel-chalk | panel-graphite | panel-lime) */
  className?: string;
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`panel-wrap ${className ?? ""}`}
      style={{ zIndex: z }}
    >
      <div className="panel" style={{ background: fill }}>
        <Wave fill={fill} />
        {children}
      </div>
    </div>
  );
}
