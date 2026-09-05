import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "../data/content";
import { ProjectPoster } from "./ProjectPoster";
import { Magnetic } from "./Magnetic";

/**
 * Seção "zoom hero": o frame do projeto destaque entra reduzido e
 * cresce até cobrir a tela conforme o scroll — um take cinematográfico
 * no meio da página. Pôster lime sólido, tipografia preta.
 */
export function Showcase() {
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

  const project = PROJECTS[0];

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
            o destaque
          </motion.p>
          <motion.h3
            className="showcase-title"
            style={reduce ? undefined : { opacity: headO, y: headY }}
          >
            Dev Guard Skill
          </motion.h3>
          <motion.div style={reduce ? undefined : { opacity: copyO, y: copyY }}>
            <p className="showcase-copy">
              Uma skill de disciplina de desenvolvimento para agentes de IA: SDD,
              planejamento, testes, smoke &amp; stress tests e entrega baseada em
              evidências. <span className="serif">IA com método</span> — não com
              achismo.
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
