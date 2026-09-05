import { useContent } from "../i18n";
import { WordsInView } from "./Reveal";
import { GsapIn } from "./GsapIn";

/**
 * Trajetória como texto corrido: período em serif itálico à esquerda,
 * cargo e história à direita. Sem bullets, sem travessões.
 */
export function Experience() {
  const c = useContent();
  return (
    <section className="section" id="experiencia" aria-label="Experiência">
      <h2 className="sec-title">
          <WordsInView>{c.sections.xpTitle}</WordsInView>
        </h2>

      <div className="xp-list">
        {c.experience.map((xp, i) => (
          <GsapIn key={xp.period} preset={i % 2 ? "slideR" : "slideL"} className="xp-row">
            <p className="serif xp-period">{xp.period}</p>
            <div className="xp-body">
              <h3 className="xp-role">{xp.role}</h3>
              <p className="serif xp-org">{xp.org}</p>
              <p className="xp-text">{xp.text}</p>
            </div>
          </GsapIn>
        ))}
      </div>
    </section>
  );
}
