'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  /** "denoising" / "noising" / settled label templates are passed in so the HUD is translated. */
  labels: { denoising: string; noising: string; settled: string };
  className?: string;
};

// Cycle (seconds): pure noise, reverse process (denoise), crisp portrait, forward process (noise).
const T_NOISE = 0.6;
const T_REVERSE = 3.8;
const T_HOLD = 4.5;
const T_FORWARD = 2.2;
const CYCLE = T_NOISE + T_REVERSE + T_HOLD + T_FORWARD;
const STEPS = 1000;

// Cosine noise schedule (Nichol & Dhariwal): alpha-bar as a function of t in [0, 1].
const alphaBar = (t: number) => {
  const f = (x: number) => Math.cos(((x + 0.008) / 1.008) * (Math.PI / 2)) ** 2;
  return f(t) / f(0);
};

// Box-Muller
const gaussian = () => {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Returns the diffusion time t in [0, 1] (1 = pure noise) and the phase for a moment in the cycle. */
function timeline(sec: number): { t: number; phase: 'denoising' | 'noising' | 'settled' } {
  const c = sec % CYCLE;
  if (c < T_NOISE) return { t: 1, phase: 'denoising' };
  if (c < T_NOISE + T_REVERSE) {
    // Detail resolves late in real sampling: ease so most of the change happens near the end.
    const k = (c - T_NOISE) / T_REVERSE;
    return { t: 1 - smooth(Math.pow(k, 1.35)), phase: 'denoising' };
  }
  if (c < T_NOISE + T_REVERSE + T_HOLD) return { t: 0, phase: 'settled' };
  const k = (c - T_NOISE - T_REVERSE - T_HOLD) / T_FORWARD;
  return { t: smooth(k), phase: 'noising' };
}

type Palette = { shadow: [number, number, number]; light: [number, number, number]; invert: boolean };
const DARK: Palette = { shadow: [61, 110, 245], light: [245, 245, 247], invert: false };
const LIGHT: Palette = { shadow: [47, 98, 232], light: [29, 29, 31], invert: true };

// The portrait as a halftone of dots whose state follows the DDPM forward process
// x_t = sqrt(abar_t) * x0 + sqrt(1 - abar_t) * eps. No dot travels along a path: every frame is
// the interpolated state, so the image comes in and out of focus rather than swarming.
export default function DiffusionPortrait({ src, alt, labels, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 639px)').matches;
    const N = small ? 64 : 96;

    let lumDark = new Float32Array(0); // x0 per cell (0..1), faded to black at the frame edge
    let lumLight = new Float32Array(0); // same, faded to white (light theme)
    let eps = new Float32Array(0); // 2 gaussians per cell
    let kick = new Float32Array(0); // pointer-added noise per cell, decays
    let ready = false;
    let size = 0;
    let palette: Palette = document.documentElement.classList.contains('dark') ? DARK : LIGHT;
    let visible = true;
    let raf = 0;
    let start = performance.now();
    let lastHud = '';
    let pointer: { x: number; y: number } | null = null;
    let lastCycle = -1;

    const resample = () => {
      eps = new Float32Array(N * N * 2);
      for (let i = 0; i < eps.length; i++) eps[i] = gaussian();
    };

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      if (!ready) return;
      const cell = size / N;
      const ab = alphaBar(t);
      const signal = Math.sqrt(ab);
      const noise = Math.sqrt(1 - ab);
      const spread = cell * 7;
      const lum = palette.invert ? lumLight : lumDark;
      const BUCKETS = 8;
      const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);

      for (let gy = 0; gy < N; gy++) {
        for (let gx = 0; gx < N; gx++) {
          const i = gy * N + gx;
          const k = kick[i];
          const n = Math.min(1, noise + k);
          const s = Math.sqrt(Math.max(0, 1 - n * n));
          // Brightness drifts to mid-gray static as noise grows; the DDPM mix of x0 and eps.
          const l = Math.min(1, Math.max(0, s * lum[i] + n * (0.5 + eps[i * 2] * 0.22)));
          const radius = cell * (0.08 + 0.46 * (palette.invert ? 1 - l : l)) * (1 - 0.15 * n);
          if (radius < 0.35) continue;
          const x = (gx + 0.5) * cell + (n * eps[i * 2] + k * eps[i * 2 + 1]) * spread * 0.5 * (1 + n);
          const y = (gy + 0.5) * cell + (n * eps[i * 2 + 1] - k * eps[i * 2]) * spread * 0.5 * (1 + n);
          const bucket = Math.min(BUCKETS - 1, Math.floor(l * BUCKETS));
          buckets[bucket].push(x, y, radius);
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        const mix = (b + 0.5) / BUCKETS;
        const lo = palette.invert ? palette.light : palette.shadow;
        const hi = palette.invert ? palette.shadow : palette.light;
        const c = [0, 1, 2].map((j) => Math.round(lo[j] + (hi[j] - lo[j]) * mix));
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.beginPath();
        const list = buckets[b];
        for (let j = 0; j < list.length; j += 3) {
          ctx.moveTo(list[j] + list[j + 2], list[j + 1]);
          ctx.arc(list[j], list[j + 1], list[j + 2], 0, Math.PI * 2);
        }
        ctx.fill();
      }
      void signal;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const sec = (now - start) / 1000;
      const cycle = Math.floor(sec / CYCLE);
      if (cycle !== lastCycle) {
        lastCycle = cycle;
        resample();
      }
      const { t, phase } = timeline(sec);
      // pointer noise decays; while the pointer is over a cell it keeps adding
      for (let i = 0; i < kick.length; i++) kick[i] *= 0.94;
      if (pointer) {
        const cell = size / N;
        const r = 60 / cell;
        const px = pointer.x / cell;
        const py = pointer.y / cell;
        for (let gy = Math.max(0, Math.floor(py - r)); gy <= Math.min(N - 1, Math.ceil(py + r)); gy++) {
          for (let gx = Math.max(0, Math.floor(px - r)); gx <= Math.min(N - 1, Math.ceil(px + r)); gx++) {
            const d = Math.hypot(gx - px, gy - py) / r;
            if (d < 1) kick[gy * N + gx] = Math.max(kick[gy * N + gx], (1 - d) * 0.9);
          }
        }
      }
      draw(t);
      const step = Math.round(t * STEPS);
      const label = phase === 'settled' ? labels.settled : `${phase === 'denoising' ? labels.denoising : labels.noising} · t = ${step}`;
      if (label !== lastHud) {
        lastHud = label;
        setHud(label);
      }
    };

    // --- source image -> luminance grid ------------------------------------------------------
    const img = new Image();
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width = off.height = N;
      const octx = off.getContext('2d', { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, N, N);
      const data = octx.getImageData(0, 0, N, N).data;
      lumDark = new Float32Array(N * N);
      lumLight = new Float32Array(N * N);
      kick = new Float32Array(N * N);
      for (let gy = 0; gy < N; gy++) {
        for (let gx = 0; gx < N; gx++) {
          const i = gy * N + gx;
          const l = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
          // Push the gray backdrop down and let the face and sweater carry the dots.
          let v = Math.min(1, Math.max(0, (l - 0.2) / 0.72));
          v = Math.pow(v, 1.15);
          // Soft frame falloff so the square's edges fade into the page.
          const dx = (gx + 0.5) / N - 0.5;
          const dy = (gy + 0.5) / N - 0.5;
          const edge = 1 - smooth(Math.min(1, Math.max(0, (Math.max(Math.abs(dx), Math.abs(dy)) - 0.38) / 0.12)));
          lumDark[i] = v * edge;
          lumLight[i] = 1 - (1 - v) * edge;
        }
      }
      resample();
      ready = true;
      start = performance.now();
      if (reduce) {
        draw(0);
        setHud(labels.settled);
      }
    };
    img.src = src;

    fit();
    if (!reduce) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      fit();
      if (reduce && ready) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      palette = document.documentElement.classList.contains('dark') ? DARK : LIGHT;
      if (reduce && ready) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const move = (e: PointerEvent) => {
      if (reduce) return;
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const leave = () => (pointer = null);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerdown', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('pointerup', leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerdown', move);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('pointerup', leave);
    };
  }, [src, labels.denoising, labels.noising, labels.settled]);

  return (
    <figure className={`m-0 ${className}`}>
      <canvas ref={canvasRef} role="img" aria-label={alt} className="block aspect-square w-full touch-pan-y" />
      <figcaption aria-hidden="true" className="tabular mt-3 h-5 text-center text-[13px] text-muted-foreground">
        {hud}
      </figcaption>
    </figure>
  );
}
