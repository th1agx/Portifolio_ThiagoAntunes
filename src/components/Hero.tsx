import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { EASE } from "../lib/utils";
import { LineMask } from "./Reveal";

/** Badge circular: texto orbitando um asterisco, girando sem parar. */
function OrbitBadge() {
  // 2πr com r=80 — textLength distribui o texto de forma uniforme na volta
  const CIRC = 2 * Math.PI * 80;
  return (
    <div className="orbit-badge" aria-hidden="true">
      <svg className="orbit-text" viewBox="0 0 200 200">
        <defs>
          <path
            id="orbit-circle"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text>
          <textPath
            href="#orbit-circle"
            textLength={CIRC * 0.985}
            lengthAdjust="spacingAndGlyphs"
          >
            engenheiro de software · portfólio 2026 · fullstack &amp; genai ·
          </textPath>
        </text>
      </svg>
      <svg className="orbit-star" viewBox="0 0 200 200">
        <g stroke="currentColor" strokeWidth="9" strokeLinecap="round">
          <line x1="100" y1="58" x2="100" y2="142" />
          <line x1="63" y1="79" x2="137" y2="121" />
          <line x1="63" y1="121" x2="137" y2="79" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Hero cinético em grafite: nome gigante + badge orbital.
 * Só o essencial — o resto é o desenho girando.
 */
export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 60, stiffness: 350, mass: 0.8 });
  const skew = useTransform(smooth, [-2400, 2400], [-2, 2]);
  const y = useTransform(scrollY, [0, 700], [0, -110]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.1]);
  const base = ready ? 0.45 : 0;

  return (
    <section className="hero" id="topo" aria-label="Apresentação">
      <OrbitBadge />
      <motion.div className="hero-inner" style={reduce ? undefined : { y, opacity: fade }}>
        <motion.h1
          className="hero-title"
          style={reduce ? undefined : { skewY: skew }}
          aria-label="Thiago Filipe"
        >
          <span className="line">
            <LineMask ready={ready} delay={base + 0.05}>
              Thiago
            </LineMask>
          </span>
          <span className="line">
            <LineMask ready={ready} delay={base + 0.16}>
              Filipe
            </LineMask>
          </span>
        </motion.h1>

        <motion.p
          className="hero-tagline serif"
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: base + 0.3, ease: EASE }}
        >
          engenharia de software <span className="green">&</span> interfaces vivas
        </motion.p>
      </motion.div>
    </section>
  );
}
