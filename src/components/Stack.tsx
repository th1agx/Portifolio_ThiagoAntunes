import { STACK_GROUPS } from "../data/content";
import { LineInView, Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

/**
 * Arsenal como conversa: "no backend…" seguido das ferramentas em
 * texto corrido — sem chips, sem caixas, sem separadores enfeitados.
 */
export function Stack() {
  return (
    <section className="section" id="stack" aria-label="Stack e ferramentas">
      <h2 className="sec-title">
        <LineInView>Arsenal</LineInView>
      </h2>

      <div className="stack-list">
        {STACK_GROUPS.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.04} y={26} className="stack-group">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
