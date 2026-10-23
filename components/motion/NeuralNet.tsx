'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Tokens shown on the input layer. */
  tokens: string[];
  /** Hidden layer sizes. The output is the portrait the parent places over the last column. */
  hidden?: number[];
  className?: string;
};

type Node = { x: number; y: number };
type Pulse = { from: Node; to: Node; t: number; speed: number; layer: number };

const BLUE = [61, 110, 245];
const CYAN = [92, 203, 230];
const mix = (k: number) => BLUE.map((c, i) => Math.round(c + (CYAN[i] - c) * k)).join(',');

// A small feed-forward net drawn on canvas: signals travel from the token inputs, through two hidden
// layers, into the output node (the portrait). Static, fully drawn frame under prefers-reduced-motion.
const DEFAULT_HIDDEN = [6, 6];

export default function NeuralNet({ tokens, hidden = DEFAULT_HIDDEN, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let layers: Node[][] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let glow = 0;
    let visible = true;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sizes = [tokens.length, ...hidden, 1];
      // Input column leaves room on its left for the token labels; output sits where the portrait is.
      const xs = [0.26, 0.45, 0.6, 0.78];
      layers = sizes.map((n, li) => {
        const x = xs[li] * width;
        const span = li === sizes.length - 1 ? 0 : height * (li === 0 ? 0.62 : 0.72);
        return Array.from({ length: n }, (_, i) => ({
          x,
          y: n === 1 ? height / 2 : height / 2 - span / 2 + (span / (n - 1)) * i,
        }));
      });
      pulses = [];
    };

    const spawn = () => {
      const from = layers[0][Math.floor(Math.random() * layers[0].length)];
      const to = layers[1][Math.floor(Math.random() * layers[1].length)];
      pulses.push({ from, to, t: 0, speed: 0.012 + Math.random() * 0.01, layer: 0 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const fg = getComputedStyle(canvas).color;

      // Edges
      ctx.lineWidth = 1;
      ctx.strokeStyle = fg;
      ctx.globalAlpha = 0.07;
      for (let li = 0; li < layers.length - 1; li++) {
        for (const a of layers[li]) for (const b of layers[li + 1]) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pulses: a short bright trail along the edge, blue turning cyan as it nears the output.
      for (const p of pulses) {
        const k = (p.layer + p.t) / (layers.length - 1);
        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        const tx = p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - 0.18);
        const ty = p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${mix(k)},0)`);
        grad.addColorStop(1, `rgba(${mix(k)},0.9)`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgb(${mix(k)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes (the output node is drawn by the portrait, only its halo is painted here)
      layers.forEach((layer, li) => {
        if (li === layers.length - 1) return;
        for (const n of layer) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = fg;
          ctx.globalAlpha = 0.45;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Token labels on the input layer
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = fg;
      ctx.font = `500 ${width < 420 ? 11 : 13}px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      layers[0].forEach((n, i) => ctx.fillText(tokens[i], n.x - 14, n.y));

      // Output halo
      const out = layers[layers.length - 1][0];
      const r = Math.min(width, height) * 0.2;
      const reach = Math.min(r * 1.9, width - out.x, out.y);
      const halo = ctx.createRadialGradient(out.x, out.y, r * 0.9, out.x, out.y, reach);
      halo.addColorStop(0, `rgba(${mix(1)},${0.18 + glow * 0.3})`);
      halo.addColorStop(1, `rgba(${mix(1)},0)`);
      ctx.globalAlpha = 1;
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(out.x, out.y, reach, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      if (!visible) return;
      if (pulses.length < 22 && Math.random() < 0.22) spawn();
      glow = Math.max(0, glow - 0.02);
      const next: Pulse[] = [];
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t < 1) {
          next.push(p);
          continue;
        }
        const li = p.layer + 1;
        if (li >= layers.length - 1) {
          glow = Math.min(1, glow + 0.35);
          continue;
        }
        const pool = layers[li + 1];
        next.push({ from: p.to, to: pool[Math.floor(Math.random() * pool.length)], t: 0, speed: p.speed, layer: li });
      }
      pulses = next;
      draw();
    };

    layout();
    if (reduce) {
      for (let i = 0; i < 10; i++) {
        spawn();
        pulses[i].t = 0.4 + Math.random() * 0.5;
      }
      draw();
    } else {
      frame = requestAnimationFrame(step);
    }

    const resize = new ResizeObserver(() => {
      layout();
      if (reduce) draw();
    });
    resize.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
    };
  }, [tokens, hidden]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full text-foreground ${className}`} />;
}
