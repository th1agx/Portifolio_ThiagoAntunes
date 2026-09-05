import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { EASE } from "../lib/utils";
import { gsap, SplitText } from "../lib/gsap";
import { useContent } from "../i18n";
import { ScrambleCycle } from "./ScrambleText";

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
 * Hero cinético em grafite: nome gigante letra a letra (GSAP),
 * badge orbital elástico e o resto em cascata.
 */
export function Hero({ ready }: { ready: boolean }) {
  const c = useContent();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 60, stiffness: 350, mass: 0.8 });
  const skew = useTransform(smooth, [-2400, 2400], [-2, 2]);
  const y = useTransform(scrollY, [0, 700], [0, -110]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.1]);
  const base = ready ? 0.45 : 0;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || reduce || !titleRef.current) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, { type: "chars" });
      gsap.set(split.chars, { transformOrigin: "50% 100%" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        split.chars,
        { yPercent: 130, rotateX: -85, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.045,
          ease: "back.out(1.4)",
        },
        0
      ).fromTo(
        badgeRef.current,
        { scale: 0, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.3, ease: "elastic.out(1, 0.55)" },
        0.55
      );
    }, titleRef);
    return () => ctx.revert();
  }, [ready, reduce]);

  return (
    <section className="hero" id="topo" aria-label="Apresentação">
      <div ref={badgeRef} className="orbit-badge-wrap" aria-hidden="true">
        <OrbitBadge />
      </div>
      <motion.div className="hero-inner" style={reduce ? undefined : { y, opacity: fade }}>
        <motion.h1
          className="hero-title"
          ref={titleRef}
          style={reduce ? undefined : { skewY: skew }}
          aria-label={c.hero.nameLines.join(" ")}
        >
          <span className="line">{c.hero.nameLines[0]}</span>
          <span className="line">{c.hero.nameLines[1]}</span>
        </motion.h1>

        <motion.p
          className="hero-tagline serif"
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: base + 0.3, ease: EASE }}
        >
          {c.hero.taglinePre} <span className="green">{c.hero.taglineAmp}</span> {c.hero.taglinePos}
        </motion.p>

        <div className="hero-sub">
          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: base + 0.42, ease: EASE }}
          >
            <p className="hero-role-line">
              {c.hero.roleLinePre} <span className="green">{c.hero.roleLineHL}</span>{" "}
              {c.hero.roleLinePos}
            </p>
            <p className="hero-cycle green">
              <ScrambleCycle phrases={c.hero.cycle} />
            </p>
          </motion.div>

          <motion.div
            className="hero-scroll serif"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: base + 0.55 }}
          >
            <span className="scroll-track">
              <span className="scroll-dot" />
            </span>
            {c.hero.scrollHint}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
