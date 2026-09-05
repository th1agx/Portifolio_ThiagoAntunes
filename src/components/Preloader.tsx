import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";
import { GLYPHS } from "../lib/utils";
import { useContent } from "../i18n";

const COLS = [0, 1, 2, 3, 4];

/**
 * Tela de carregamento (GSAP, ~7s): o nome é decodificado letra a
 * letra em "slot machine" (glifos aleatórios travando na letra
 * certa), palavras-chave ciclam em scramble, o asterisco lime gira,
 * e a saída tem um flash lime varrendo as colunas antes da cortina.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const c = useContent();
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  const words = [c.hero.taglinePre, "genai", c.hero.taglinePos, "motion"];

  useEffect(() => {
    if (reduce) {
      done.current();
      return;
    }
    const ctx = gsap.context(() => {
      const el = root.current!;
      const countEl = el.querySelector(".pre-count b")!;
      const subEl = el.querySelector(".pre-sub b")!;
      const counter = { v: 0 };
      const glyphs = GLYPHS.replace(/[\s]/g, "");

      const tl = gsap.timeline({
        onComplete: () => window.setTimeout(() => done.current(), 150),
      });

      // nome: cada letra é uma slot machine de glifos que trava
      el.querySelectorAll<HTMLElement>(".pre-char").forEach((ch, i) => {
        const final = ch.dataset.ch ?? "";
        if (final === " ") return;
        const st = { t: 0 };
        tl.to(
          st,
          {
            t: 1,
            duration: 0.55,
            delay: 0.06 + i * 0.085,
            ease: "power2.inOut",
            onUpdate() {
              ch.textContent =
                st.t >= 1
                  ? final
                  : glyphs[Math.floor(Math.random() * glyphs.length)];
            },
          },
          0.15
        );
      });

      // palavras-chave ciclam com decode
      words.forEach((w, i) => {
        const st = { t: 0 };
        tl.call(
          () => {
            subEl.textContent = w;
            st.t = 0;
          },
          undefined,
          0.7 + i * 1.05
        );
        if (i > 0) {
          tl.to(
            st,
            {
              t: 1,
              duration: 0.5,
              ease: "power2.out",
              onUpdate() {
                const n = Math.floor(st.t * w.length);
                let s = w.slice(0, n);
                for (let k = n; k < w.length; k++) {
                  s += glyphs[Math.floor(Math.random() * glyphs.length)];
                }
                subEl.textContent = s;
              },
            },
            0.7 + i * 1.05
          );
        }
      });

      // contador + régua (respirando juntos)
      tl.to(
        counter,
        {
          v: 100,
          duration: 4.6,
          ease: "power2.inOut",
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.v));
          },
        },
        0.35
      );
      tl.fromTo(".pre-bar", { scaleX: 0 }, { scaleX: 1, duration: 4.6, ease: "power2.inOut" }, 0.35);

      // saída em dois atos: flash lime varre, cortina sobe
      tl.to(".pre-count, .pre-sub, .pre-star", { opacity: 0, duration: 0.35 }, "+=0.15")
        .fromTo(
          ".pre-col-flash",
          { scaleY: 0, transformOrigin: "50% 100%" },
          { scaleY: 1, duration: 0.5, stagger: 0.055, ease: "power3.in" },
          "<"
        )
        .to(".pre-char", { opacity: 0, duration: 0.25 }, "<")
        .to(".pre-col", { yPercent: -101, duration: 1.0, stagger: 0.075, ease: "power4.inOut" }, "-=0.05")
        .to(".pre-col-flash", { yPercent: -101, duration: 1.0, stagger: 0.075, ease: "power4.inOut" }, "<");
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      {COLS.map((i) => (
        <div key={i} className="pre-col">
          <div className="pre-col-flash" />
        </div>
      ))}
      <div className="pre-ui">
        <svg className="pre-star" viewBox="0 0 100 100" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
            <line x1="50" y1="14" x2="50" y2="86" />
            <line x1="21" y1="31" x2="79" y2="69" />
            <line x1="21" y1="69" x2="79" y2="31" />
          </g>
        </svg>

        <div className="pre-name">
          {c.preloader.name.split("").map((ch, i) => (
            <span
              key={i}
              className={`pre-char${ch === " " ? " pre-space" : ""}`}
              data-ch={ch}
            >
              {ch === " " ? "\u00A0" : "·"}
            </span>
          ))}
        </div>

        <p className="serif pre-sub">
          <b>{words[0]}</b>
        </p>

        <div className="pre-count">
          <b>0</b>
          <span>%</span>
        </div>
        <div className="pre-bar" />
      </div>
    </div>
  );
}
