import { useContent } from "../i18n";
import { WordsInView } from "./Reveal";
import { GsapIn } from "./GsapIn";

export function Education() {
  const c = useContent();
  return (
    <section className="section" id="formacao" aria-label="Formação e estudos">
      <div className="edu-grid">
        <div>
          <h2 className="sec-title">
              <WordsInView>{c.sections.eduTitle}</WordsInView>
            </h2>
          {c.education.degrees.map((d) => (
            <GsapIn key={d.course} preset="drop" className="degree">
              <h3 className="degree-course">{d.course}</h3>
              <p className="degree-meta">
                {d.school} · {d.period} ·{" "}
                <span className="serif green">{d.status}</span>
              </p>
            </GsapIn>
          ))}
        </div>

        <div className="edu-certs">
          <GsapIn preset="slideL">
            <p className="serif certs-title">{c.education.certsTitle}</p>
          </GsapIn>
          <GsapIn preset="wipe">
            <p className="certs-text">
              {c.education.certs.map((cert, i) => (
                <span key={cert.name}>
                  {cert.name} <span className="dim">({cert.issuer})</span>
                  {i < c.education.certs.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </GsapIn>
        </div>
      </div>
    </section>
  );
}
