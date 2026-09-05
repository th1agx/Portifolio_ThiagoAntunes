import { EXPERIENCE } from "../data/content";
import { Reveal, WordsInView } from "./Reveal";

/**
 * Trajetória como texto corrido: período em serif itálico à esquerda,
 * cargo e história à direita. Sem bullets, sem travessões.
 */
export function Experience() {
  return (
    <section className="section" id="experiencia" aria-label="Experiência">
      <h2 className="sec-title">
        <WordsInView>Trajetória</WordsInView>
      </h2>

      <div className="xp-list">
        {EXPERIENCE.map((xp, i) => (
          <Reveal key={xp.period} delay={i * 0.05} y={34} className="xp-row">
            <p className="serif xp-period">{xp.period}</p>
            <div className="xp-body">
              <h3 className={`xp-role ${xp.music ? "serif" : ""}`}>{xp.role}</h3>
              <p className="serif xp-org">{xp.org}</p>
              <p className="xp-text">{xp.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
