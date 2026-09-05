export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export const GLYPHS = "!<>-_\\/[]{}=+*^?#@%&";
