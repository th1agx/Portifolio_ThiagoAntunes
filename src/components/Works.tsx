import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "motion/react";
import { EASE } from "../lib/utils";
import type { Project } from "../data/content";
import { useContent } from "../i18n";
import { WordsInView } from "./Reveal";
import { GsapIn } from "./GsapIn";
import { Parallax } from "./Parallax";
import { ProjectPoster } from "./ProjectPoster";

function Row({
  project,
  onEnter,
  preview,
}: {
  project: Project;
  onEnter: () => void;
  preview: boolean;
}) {
  const inner = (
    <>
      <span className="work-main">
        {preview && (
          <span className="work-inline-poster">
            <ProjectPoster project={project} />
          </span>
        )}
        <span className="work-title">{project.title}</span>
        <span className="serif work-sub">{project.subtitle}</span>
      </span>
      <span className="work-year serif">{project.year}</span>
    </>
  );

  const shared = {
    className: "work-row",
    "data-cursor": "view",
    onPointerEnter: onEnter,
  } as const;

  return project.link ? (
    <a {...shared} href={project.link} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <div {...shared}>{inner}</div>
  );
}

/**
 * Lista editorial de projetos: no desktop, um pôster flutuante persegue
 * o cursor (com rotação por velocidade); no touch, cada linha carrega
 * seu pôster inline. O título inteiro é o link — sem setas.
 */
export function Works() {
  const c = useContent();
  const projects = c.projects;
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const usePreview = canHover && !reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.55 });
  // o pôster nunca escapa da tela: o Y fica preso dentro da viewport
  const myClamped = useTransform(my, (v) => {
    const halfH = (Math.min(400, Math.max(230, window.innerWidth * 0.24)) * 1.25) / 2;
    return Math.min(Math.max(v, halfH + 28), window.innerHeight - halfH - 28);
  });
  const py = useSpring(myClamped, { stiffness: 260, damping: 26, mass: 0.55 });
  const rot = useTransform(useVelocity(px), [-1600, 1600], [-6, 6]);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section className="section" id="trabalhos" aria-label="Trabalhos">
      <Parallax dir="right" speed={0.9}>
        <h2 className="sec-title">
          <WordsInView>{c.sections.worksTitle}</WordsInView>
        </h2>
      </Parallax>

      <div
        className="works-list"
        onPointerMove={usePreview ? onMove : undefined}
        onPointerLeave={usePreview ? () => setActive(null) : undefined}
      >
        {projects.map((p, i) => (
          <GsapIn key={p.id} preset={i % 2 ? "slideR" : "wipe"}>
            <Row project={p} onEnter={() => setActive(i)} preview={!usePreview} />
          </GsapIn>
        ))}
      </div>

      {usePreview && (
        <motion.div
          className="work-preview"
          style={{ x: px, y: py, rotate: rot }}
          animate={{ scale: active !== null ? 1 : 0.55, opacity: active !== null ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden="true"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="work-preview-item"
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 1.12,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ProjectPoster project={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
