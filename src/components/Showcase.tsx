import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useContent } from "../i18n";
import { ProjectPoster } from "./ProjectPoster";
import { Magnetic } from "./Magnetic";

/**
 * Seção "zoom hero": o frame do projeto destaque entra reduzido e
 * cresce até cobrir a tela conforme o scroll — um take cinematográfico
 * no meio da página. Pôster lime sólido, tipografia preta.
 */
export function Showcase() {
  const c = useContent();
  const project = c.projects[0];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.06, 0.5], [0.5, 1]);
  const radius = useTransform(scrollYProgress, [0.06, 0.5], [44, 0]);
  const headY = useTransform(scrollYProgress, [0.3, 0.44], [70, 0]);
  const headO = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const copyO = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.38, 0.5], [40, 0]);

  

  return (
    <section ref={ref} className="showcase" aria-label="Projeto em destaque">
      <div className="showcase-sticky">
        <motion.div
          className="showcase-frame"
          style={reduce ? undefined : { scale, borderRadius: radius }}
        >
          <ProjectPoster project={project} minimal />
        </motion.div>

        <div className="showcase-overlay">
          <motion.p
            className="serif"
            style={reduce ? undefined : { opacity: headO, y: headY }}
          >
            {c.showcase.kicker}
          </motion.p>
          <motion.h3
            className="showcase-title"
            style={reduce ? undefined : { opacity: headO, y: headY }}
          >
            {project.title}
          </motion.h3>
          <motion.div style={reduce ? undefined : { opacity: copyO, y: copyY }}>
            <p className="showcase-copy">
              {c.showcase.copyPre} <span className="serif">{c.showcase.copyHL}</span>
              {c.showcase.copyPos}
            </p>
            {project.link && (
              <Magnetic strength={0.25}>
                <a
                  className="showcase-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                >
                  ver no github
                </a>
              </Magnetic>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
