'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { crossLinks, stackNodes } from '@/data/tech-stack';
import { alphaBar, diffusionSeconds, gaussian, smooth, T_NOISE, timeline } from '@/lib/diffusion';

const GROUPS = ['ai', 'backend', 'data', 'cloud'] as const;
const NOISE_RADIUS = 1.9; // std of the node noise, in world units
const DOT_NOISE = 1.1; // std of the edge-dot noise
const DOTS_PER_EDGE = 12;
const NODE = 1.0; // sprite size in world units (a logo disc)
const BLUE: [number, number, number] = [61 / 255, 110 / 255, 245 / 255];
const CYAN: [number, number, number] = [92 / 255, 203 / 255, 230 / 255];

// Points spread evenly over a sphere (Fibonacci lattice).
function sphere(n: number, radius: number, offset = 0): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * (i + offset);
    return new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius);
  });
}

// Light disc with the technology logo, drawn once.
function makeTexture(src: string, renderer: THREE.WebGLRenderer): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const paint = (img?: HTMLImageElement) => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#f5f5f7';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
      ctx.fill();
      if (img) {
        const box = size * 0.66; // logo fills two thirds of the disc
        const k = Math.min(box / img.naturalWidth, box / img.naturalHeight) || 1;
        const w = (img.naturalWidth || box) * k;
        const h = (img.naturalHeight || box) * k;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      }
      texture.needsUpdate = true;
      resolve(texture);
    };
    const img = new Image();
    img.onload = () => {
      // SVGs without width/height report 0: draw them into a fixed box instead
      if (!img.naturalWidth) {
        img.width = img.height = 128;
      }
      paint(img);
    };
    img.onerror = () => paint();
    img.src = src;
  });
}

// Round dot for the edge particles.
function makeDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

type Tip = { name: string; x: number; y: number } | null;

// The stack as the same diffusion process as the hero portrait: grouped = x0 (clean image),
// scattered = Gaussian noise. Nodes follow x_t = sqrt(abar_t) * x0 + sqrt(1 - abar_t) * eps,
// and the edges are chains of dots that dissolve into the same noise. Both read the shared
// page clock (lib/diffusion.ts), so hero and stack are always in the same phase.
export default function StackGraph() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 14.5);
    const world = new THREE.Group();
    scene.add(world);

    // --- x0: the clean layout (four clusters on a tetrahedron) -------------------------------
    const n = stackNodes.length;
    const k = 3.6 / Math.sqrt(3);
    const centers = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(([x, y, z]) => new THREE.Vector3(x * k, y * k, z * k));
    const x0: THREE.Vector3[] = new Array(n);
    GROUPS.forEach((g, gi) => {
      const members = stackNodes.map((node, i) => ({ node, i })).filter((m) => m.node.group === g);
      const local = sphere(members.length, 1.05 + members.length * 0.1, gi);
      members.forEach((m, j) => (x0[m.i] = centers[gi].clone().add(local[j])));
    });

    // --- sprites -------------------------------------------------------------------------
    const sprites: THREE.Sprite[] = [];
    const textures: THREE.Texture[] = [];
    let disposed = false;
    let needsRender = true;
    stackNodes.forEach((node, i) => {
      const material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      sprite.scale.setScalar(NODE);
      sprite.position.copy(x0[i]);
      sprite.userData = { index: i, loaded: false };
      world.add(sprite);
      sprites.push(sprite);
      makeTexture(`/tech/${node.logo}.svg`, renderer).then((tex) => {
        if (disposed) return tex.dispose();
        textures.push(tex);
        material.map = tex;
        material.needsUpdate = true;
        sprite.userData.loaded = true;
        needsRender = true;
      });
    });

    // --- edges as chains of dots -----------------------------------------------------------
    const byName = new Map(stackNodes.map((node, i) => [node.name, i]));
    const pairs: [number, number][] = [];
    GROUPS.forEach((g) => {
      const idx = stackNodes.map((node, i) => (node.group === g ? i : -1)).filter((i) => i >= 0);
      idx.forEach((a, j) => {
        pairs.push([a, idx[(j + 1) % idx.length]]);
        if (idx.length > 3) pairs.push([a, idx[(j + 2) % idx.length]]);
      });
    });
    crossLinks.forEach(([a, b]) => {
      const ia = byName.get(a);
      const ib = byName.get(b);
      if (ia !== undefined && ib !== undefined) pairs.push([ia, ib]);
    });
    const dotCount = pairs.length * DOTS_PER_EDGE;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);
    pairs.forEach((_, p) => {
      for (let d = 0; d < DOTS_PER_EDGE; d++) {
        const u = (d + 0.5) / DOTS_PER_EDGE;
        const o = (p * DOTS_PER_EDGE + d) * 3;
        dotColors[o] = BLUE[0] + (CYAN[0] - BLUE[0]) * u;
        dotColors[o + 1] = BLUE[1] + (CYAN[1] - BLUE[1]) * u;
        dotColors[o + 2] = BLUE[2] + (CYAN[2] - BLUE[2]) * u;
      }
    });
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));
    const dotTexture = makeDotTexture();
    const dotMaterial = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      map: dotTexture,
      alphaTest: 0.3,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    dots.frustumCulled = false;
    world.add(dots);

    // --- noise: one Gaussian vector per node and per dot, resampled every cycle ---------------
    const sample = (len: number) => Float32Array.from({ length: len }, gaussian);
    let nodeFrom = sample(n * 3);
    let nodeTo = nodeFrom;
    let dotFrom = sample(dotCount * 3);
    let dotTo = dotFrom;
    let lastCycle = -1;

    // --- interaction ---------------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = -1;

    const setHover = (index: number, clientX?: number, clientY?: number) => {
      if (index === hovered && index < 0) return;
      hovered = index;
      needsRender = true;
      if (index < 0) return setTip(null);
      const rect = host.getBoundingClientRect();
      setTip({ name: stackNodes[index].name, x: (clientX ?? 0) - rect.left, y: (clientY ?? 0) - rect.top });
    };
    const pick = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(sprites, false)[0];
      setHover(hit ? (hit.object.userData.index as number) : -1, e.clientX, e.clientY);
      host.style.cursor = hit ? 'pointer' : 'default';
    };
    // On touch, pointerleave fires as soon as the finger lifts: keep the tooltip until the next tap.
    const leave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') setHover(-1);
    };
    host.addEventListener('pointermove', pick);
    host.addEventListener('pointerdown', pick);
    host.addEventListener('pointerleave', leave);

    // --- sizing / visibility -------------------------------------------------------------
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      needsRender = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.05 });
    io.observe(host);

    // --- loop ----------------------------------------------------------------------------
    const clock = new THREE.Clock();
    let spin = 0;
    let raf = 0;
    const MAX = 5.4; // keep noisy nodes inside the frame

    const update = (t: number, blend: number, dt: number) => {
      const ab = alphaBar(t);
      const signal = Math.sqrt(ab);
      const noise = Math.sqrt(1 - ab);

      sprites.forEach((sprite, i) => {
        // x_t = sqrt(abar) * x0 + sqrt(1 - abar) * eps (eps blends to a fresh sample while at pure noise)
        const o = i * 3;
        const ex = (nodeFrom[o] + (nodeTo[o] - nodeFrom[o]) * blend) * NOISE_RADIUS;
        const ey = (nodeFrom[o + 1] + (nodeTo[o + 1] - nodeFrom[o + 1]) * blend) * NOISE_RADIUS;
        const ez = (nodeFrom[o + 2] + (nodeTo[o + 2] - nodeFrom[o + 2]) * blend) * NOISE_RADIUS;
        sprite.position.set(signal * x0[i].x + noise * ex, signal * x0[i].y + noise * ey, signal * x0[i].z + noise * ez);
        if (sprite.position.length() > MAX) sprite.position.setLength(MAX);
        const target = i === hovered ? 1.25 : 1;
        const s = sprite.userData.s ?? 1;
        sprite.userData.s = s + (target - s) * Math.min(1, dt * 12);
        sprite.scale.setScalar(NODE * (0.88 + 0.12 * signal) * sprite.userData.s);
        (sprite.material as THREE.SpriteMaterial).opacity = sprite.userData.loaded ? 0.5 + 0.5 * signal : 0;
      });

      // Edge dots: placed along the (noisy) segment, then dissolved with their own noise.
      pairs.forEach(([a, b], p) => {
        const pa = sprites[a].position;
        const pb = sprites[b].position;
        for (let d = 0; d < DOTS_PER_EDGE; d++) {
          const u = (d + 0.5) / DOTS_PER_EDGE;
          const idx = (p * DOTS_PER_EDGE + d) * 3;
          dotPositions[idx] = pa.x + (pb.x - pa.x) * u + noise * DOT_NOISE * (dotFrom[idx] + (dotTo[idx] - dotFrom[idx]) * blend);
          dotPositions[idx + 1] = pa.y + (pb.y - pa.y) * u + noise * DOT_NOISE * (dotFrom[idx + 1] + (dotTo[idx + 1] - dotFrom[idx + 1]) * blend);
          dotPositions[idx + 2] = pa.z + (pb.z - pa.z) * u + noise * DOT_NOISE * (dotFrom[idx + 2] + (dotTo[idx + 2] - dotFrom[idx + 2]) * blend);
        }
      });
      dotGeometry.attributes.position.needsUpdate = true;
      dotMaterial.opacity = 0.4 + 0.5 * signal;
      dotMaterial.size = 0.08 + 0.06 * signal;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (reduce) {
        if (!needsRender) return;
        update(0, 1, dt || 0.016);
        needsRender = false;
      } else {
        if (!visible || document.hidden) return;
        const { t, cycle, into } = timeline(diffusionSeconds());
        if (cycle !== lastCycle) {
          lastCycle = cycle;
          nodeFrom = nodeTo;
          nodeTo = sample(n * 3);
          dotFrom = dotTo;
          dotTo = sample(dotCount * 3);
        }
        // At pure noise the previous sample glides into the new one, so nothing jumps.
        const blend = into < T_NOISE ? smooth(into / T_NOISE) : 1;
        update(t, blend, dt);
        spin += dt * (hovered >= 0 ? 0.02 : 0.08);
        world.rotation.y = spin;
        world.rotation.x = Math.sin(spin * 1.7) * 0.12;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', pick);
      host.removeEventListener('pointerdown', pick);
      host.removeEventListener('pointerleave', leave);
      sprites.forEach((s) => (s.material as THREE.SpriteMaterial).dispose());
      textures.forEach((t) => t.dispose());
      dotGeometry.dispose();
      dotMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className="relative h-full w-full">
      {tip && (
        <span
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[170%] whitespace-nowrap rounded-[4px] border border-border bg-background/90 px-2.5 py-1 text-[13px] font-medium text-foreground backdrop-blur"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.name}
        </span>
      )}
    </div>
  );
}
