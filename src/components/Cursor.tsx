import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useContent } from "../i18n";

type CursorMode = "default" | "link" | "view";

/**
 * Cursor líquido: ponto imediato + anel com mola que se ESTICA na
 * direção do movimento (squash & stretch por velocidade). Elementos
 * declaram intenção via data-cursor="link" | "view". Só em pointer fine.
 */
export function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const c = useContent();
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.7 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.7 });

  // estica na direção da velocidade
  const vx = useVelocity(rx);
  const vy = useVelocity(ry);
  const stretch = useTransform(
    [vx, vy],
    ([dx, dy]: number[]) => Math.min(0.45, Math.hypot(dx, dy) / 2600)
  );
  const angle = useTransform(
    [vx, vy],
    ([dx, dy]: number[]) => `${(Math.atan2(dy, dx) * 180) / Math.PI}deg`
  );
  const scaleX = useTransform(stretch, (s) => 1 + s);
  const scaleY = useTransform(stretch, (s) => 1 - s * 0.7);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;
      if (!el) {
        setMode("default");
        return;
      }
      const v = el.dataset?.["cursor"];
      setMode(v === "view" ? "view" : "link");
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        aria-hidden="true"
        style={{ x, y, opacity: visible && mode !== "view" ? 1 : 0 }}
      />
      <motion.div className="cursor-ring-outer" style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}>
        <motion.div
          className={`cursor-ring ${mode}`}
          style={{ rotate: angle, scaleX, scaleY }}
        >
          <span className="cursor-label">{c.misc.view}</span>
        </motion.div>
      </motion.div>
    </>
  );
}
