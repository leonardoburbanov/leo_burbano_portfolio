// Shared diffusion process used by the hero portrait and the stack graph, so both show the same
// state at the same moment: noise (t = 1) resolves into the image (t = 0) and dissolves again.

// Cycle (seconds): pure noise, reverse process (denoise), crisp image, forward process (noise).
export const T_NOISE = 0.6;
export const T_REVERSE = 3.8;
export const T_HOLD = 4.5;
export const T_FORWARD = 2.2;
export const CYCLE = T_NOISE + T_REVERSE + T_HOLD + T_FORWARD;
export const STEPS = 1000;

/** Page clock in seconds. Every consumer reads this one clock, so they stay in phase. */
export const diffusionSeconds = () => performance.now() / 1000;

// Cosine noise schedule (Nichol & Dhariwal): alpha-bar as a function of t in [0, 1].
export const alphaBar = (t: number) => {
  const f = (x: number) => Math.cos(((x + 0.008) / 1.008) * (Math.PI / 2)) ** 2;
  return f(t) / f(0);
};

// Box-Muller
export const gaussian = () => {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

export const smooth = (x: number) => x * x * (3 - 2 * x);

export type Phase = 'denoising' | 'noising' | 'settled';

/** Diffusion time t in [0, 1] (1 = pure noise), the phase, and the cycle progress for a moment. */
export function timeline(sec: number): { t: number; phase: Phase; cycle: number; into: number } {
  const cycle = Math.floor(sec / CYCLE);
  const c = sec - cycle * CYCLE;
  if (c < T_NOISE) return { t: 1, phase: 'denoising', cycle, into: c };
  if (c < T_NOISE + T_REVERSE) {
    // Detail resolves late in real sampling: ease so most of the change happens near the end.
    const k = (c - T_NOISE) / T_REVERSE;
    return { t: 1 - smooth(Math.pow(k, 1.35)), phase: 'denoising', cycle, into: c };
  }
  if (c < T_NOISE + T_REVERSE + T_HOLD) return { t: 0, phase: 'settled', cycle, into: c };
  const k = (c - T_NOISE - T_REVERSE - T_HOLD) / T_FORWARD;
  return { t: smooth(k), phase: 'noising', cycle, into: c };
}
