import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";
import { useContent } from "../i18n";

/**
 * Tela de carregamento (GSAP, ~5s): minimalista e calma — o nome em
 * serif itálico sobe de dentro da máscara, uma linha lime se desenha
 * sob ele, o contador corre discreto no canto e a saída é um único
 * wipe vertical. Nada de glifos frenéticos.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const c = useContent();
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
        onComplete: () => window.setTimeout(() => done.current(), 100),
      });

      tl.fromTo(
        ".pre-name-inner",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, ease: "power4.out" },
        0.3
      )
        .fromTo(".pre-sub", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1)
        .fromTo(
          ".pre-underline",
          { scaleX: 0 },
          { scaleX: 1, duration: 3.4, ease: "power2.inOut" },
          0.8
        )
        .to(
          counter,
          {
            v: 100,
            duration: 4.2,
            ease: "power2.inOut",
            onUpdate: () => {
              countEl.textContent = String(Math.round(counter.v));
            },
          },
          0.3
        )
        .fromTo(".pre-bar", { scaleX: 0 }, { scaleX: 1, duration: 4.2, ease: "power2.inOut" }, 0.3)
        // saída calma: nome desce de volta, um único wipe sobe
        .to(".pre-name-inner", { yPercent: -115, duration: 0.7, ease: "power3.in" }, "+=0.25")
        .to(".pre-sub, .pre-count, .pre-underline", { opacity: 0, duration: 0.35 }, "<")
        .to(".pre-veil", { yPercent: -101, duration: 1.0, ease: "power4.inOut" }, "-=0.1");
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pre-veil" />
      <div className="pre-ui">
        <div className="pre-center">
          <div className="pre-name">
            <span className="pre-name-inner serif">{c.preloader.name}</span>
          </div>
          <div className="pre-underline" />
          <p className="serif pre-sub">{c.preloader.sub}</p>
        </div>
        <div className="pre-count">
          <b>0</b>
          <span>%</span>
        </div>
        <div className="pre-bar" />
      </div>
    </div>
  );
}
