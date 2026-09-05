import { useContent } from "../i18n";
import { WordsInView } from "./Reveal";
import { GsapIn } from "./GsapIn";
import { ScrambleText } from "./ScrambleText";

/**
 * Arsenal como conversa: "no backend…" seguido das ferramentas em
 * texto corrido — sem chips, sem caixas, sem separadores enfeitados.
 */
export function Stack() {
  const c = useContent();
  return (
    <section className="section" id="stack" aria-label="Stack e ferramentas">
      <h2 className="sec-title">
          <WordsInView>{c.sections.stackTitle}</WordsInView>
        </h2>

      <div className="stack-list">
        {c.stack.map((g, i) => (
          <GsapIn key={g.label} preset="drop" delay={i * 0.05} className="stack-group">
            <p className="serif stack-label">
              {g.label}
              {g.note ? <span className="stack-note"> — {g.note}</span> : null}
            </p>
            <p className="stack-items">
              {g.items.map((item, j) => (
                <span key={item}>
                  <span className="stack-item">
                    <ScrambleText text={item} />
                  </span>
                  {j < g.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </GsapIn>
        ))}
      </div>
    </section>
  );
}
