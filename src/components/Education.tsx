import { CERTS, DEGREES } from "../data/content";
import { Reveal, WordsInView } from "./Reveal";

export function Education() {
  return (
    <section className="section" id="formacao" aria-label="Formação e estudos">
      <div className="edu-grid">
        <div>
          <h2 className="sec-title">
            <WordsInView>Formação</WordsInView>
          </h2>
          {DEGREES.map((d) => (
            <Reveal key={d.course} y={22} className="degree">
              <h3 className="degree-course">{d.course}</h3>
              <p className="degree-meta">
                {d.school} · {d.period} ·{" "}
                <span className="serif green">{d.status}</span>
              </p>
            </Reveal>
          ))}
        </div>

        <div className="edu-certs">
          <Reveal y={18}>
            <p className="serif certs-title">pelo caminho, certifiquei-me em</p>
          </Reveal>
          <Reveal y={22}>
            <p className="certs-text">
              {CERTS.map((c, i) => (
                <span key={c.name}>
                  {c.name} <span className="dim">({c.issuer})</span>
                  {i < CERTS.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
