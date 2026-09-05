import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";

/**
 * Tela de carregamento (GSAP, ~5s): um único objeto em cena — o
 * asterisco lime girando e respirando — com o progresso na régua do
 * rodapé e um contador discreto no canto. Sem textos.
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

      // o objeto: gira sem parar e respira enquanto carrega
      const spin = gsap.to(".pre-star", {
        rotation: 360,
        duration: 3.2,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      const breathe = gsap.to(".pre-star", {
        scale: 1.12,
        duration: 0.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        onComplete: () => window.setTimeout(() => done.current(), 100),
      });

      tl.fromTo(".pre-star", { scale: 0, rotation: -120 }, { scale: 1, duration: 0.9, ease: "back.out(1.6)" }, 0.1)
        .to(
          counter,
          {
            v: 100,
            duration: 4.1,
            ease: "power2.inOut",
            onUpdate: () => {
              countEl.textContent = String(Math.round(counter.v));
            },
          },
          0.3
        )
        .fromTo(".pre-bar", { scaleX: 0 }, { scaleX: 1, duration: 4.1, ease: "power2.inOut" }, 0.3)
        // saída: o asterisco dispara girando e some, wipe único sobe
        .to(".pre-count, .pre-bar", { opacity: 0, duration: 0.3 }, "+=0.2")
        .to(".pre-star", { scale: 0, rotation: "+=320", duration: 0.55, ease: "power3.in" }, "<")
        .to(".pre-veil", { yPercent: -101, duration: 1.0, ease: "power4.inOut" }, "-=0.1");

      return () => {
        spin.kill();
        breathe.kill();
      };
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pre-veil" />
      <div className="pre-ui">
        <svg className="pre-star" viewBox="0 0 100 100">
          <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
            <line x1="50" y1="14" x2="50" y2="86" />
            <line x1="21" y1="31" x2="79" y2="69" />
            <line x1="21" y1="69" x2="79" y2="31" />
          </g>
        </svg>
        <div className="pre-count">
          <b>0</b>
          <span>%</span>
        </div>
        <div className="pre-bar" />
      </div>
    </div>
  );
}
