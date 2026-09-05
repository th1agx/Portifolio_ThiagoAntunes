import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";

const COLS = [0, 1, 2, 3, 4];
const NAME = "Thiago Filipe";

/**
 * Tela de carregamento cinematográfica (GSAP): o nome entra letra a
 * letra em 3D, contador e régua correm juntos, e a saída é uma
 * cortina de colunas com stagger. ~5 segundos de abertura.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (reduce) {
      done.current();
      return;
    }
    const ctx = gsap.context(() => {
      const el = root.current!;
      const countEl = el.querySelector(".pre-count b")!;
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => window.setTimeout(() => done.current(), 120),
      });

      tl.set(".pre-char", { yPercent: 120, rotateX: -90, opacity: 0 })
        .fromTo(".pre-label", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15)
        .to(
          ".pre-char",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.055,
            ease: "back.out(1.5)",
          },
          0.35
        )
        .fromTo(".pre-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .to(
          counter,
          {
            v: 100,
            duration: 2.9,
            ease: "power2.inOut",
            onUpdate: () => {
              countEl.textContent = String(Math.round(counter.v));
            },
          },
          0.5
        )
        .fromTo(".pre-bar", { scaleX: 0 }, { scaleX: 1, duration: 2.9, ease: "power2.inOut" }, 0.5)
        // saída: letras voam, cortina de colunas sobe
        .to(
          ".pre-char",
          {
            yPercent: -130,
            opacity: 0,
            duration: 0.5,
            stagger: { each: 0.03, from: "end" },
            ease: "power3.in",
          },
          "+=0.2"
        )
        .to(".pre-sub, .pre-label, .pre-count, .pre-bar", { opacity: 0, duration: 0.3 }, "<")
        .to(
          ".pre-col",
          {
            yPercent: -101,
            duration: 0.95,
            stagger: 0.075,
            ease: "power4.inOut",
          },
          "-=0.05"
        );
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      {COLS.map((i) => (
        <div key={i} className="pre-col" />
      ))}
      <div className="pre-ui">
        <p className="serif pre-label">preparando o palco</p>
        <div className="pre-name">
          {NAME.split("").map((c, i) => (
            <span key={i} className={`pre-char${c === " " ? " pre-space" : ""}`}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        <p className="serif pre-sub">engenharia de software &amp; interfaces vivas</p>
        <div className="pre-count">
          <b>0</b>
          <span>%</span>
        </div>
        <div className="pre-bar" />
      </div>
    </div>
  );
}
