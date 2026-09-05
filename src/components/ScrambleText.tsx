import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { GLYPHS } from "../lib/utils";

interface ScrambleProps {
  text: string;
  mode?: "hover" | "inview";
  className?: string;
  children?: never;
}

/** Texto que se embaralha (efeito "decode") ao entrar em view ou no hover. */
export function ScrambleText({ text, mode = "hover", className }: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);
  const [display, setDisplay] = useState(text);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const run = useCallback(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    stop();
    let progress = 0;
    const step = Math.max(1, Math.round(text.length / 14));
    timer.current = window.setInterval(() => {
      progress += step;
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            ch === " " ? " " : i < progress ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      );
      if (progress >= text.length) {
        stop();
        setDisplay(text);
      }
    }, 30);
  }, [text, reduce, stop]);

  useEffect(() => stop, [stop]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (mode === "inview" && inView) run();
  }, [mode, inView, run]);

  return (
    <span ref={ref} className={className} onPointerEnter={mode === "hover" ? run : undefined}>
      {display}
    </span>
  );
}

/** Cicla por frases com transição scramble — usado no hero. */
export function ScrambleCycle({ phrases, className }: { phrases: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [display, setDisplay] = useState(phrases[0]);
  const timer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % phrases.length), 3200);
    return () => window.clearInterval(id);
  }, [phrases.length, reduce]);

  useEffect(() => {
    const target = phrases[i];
    if (reduce) {
      setDisplay(target);
      return;
    }
    if (timer.current) window.clearInterval(timer.current);
    let progress = 0;
    timer.current = window.setInterval(() => {
      progress += 2;
      setDisplay(
        target
          .split("")
          .map((ch, idx) =>
            ch === " " ? " " : idx < progress ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      );
      if (progress >= target.length) {
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        setDisplay(target);
      }
    }, 28);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [i, phrases, reduce]);

  return <span className={className}>{display}</span>;
}

export function Text({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
