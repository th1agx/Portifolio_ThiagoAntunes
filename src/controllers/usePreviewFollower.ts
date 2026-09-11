import { useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Controller do pôster flutuante: springs que perseguem o cursor,
 * com rotação por velocidade e Y preso à viewport (cola no cursor,
 * corta nas bordas — nunca escapa da tela).
 */
export function usePreviewFollower() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.55 });
  const myClamped = useTransform(my, (v) => {
    const halfH = (Math.min(400, Math.max(230, window.innerWidth * 0.24)) * 1.25) / 2;
    const edge = halfH * 0.55 + 20;
    return Math.min(Math.max(v, edge), window.innerHeight - edge);
  });
  const py = useSpring(myClamped, { stiffness: 260, damping: 26, mass: 0.55 });
  const rot = useTransform(useVelocity(px), [-1600, 1600], [-6, 6]);

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return { px, py, rot, onMove };
}
