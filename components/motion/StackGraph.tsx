'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { crossLinks, stackNodes } from '@/data/tech-stack';

const GROUPS = ['ai', 'backend', 'data', 'cloud'] as const;
const HOLD = 4; // seconds grouped / ungrouped
const MOVE = 1.6; // seconds of transition
const CYCLE = (HOLD + MOVE) * 2;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const paint = (img?: HTMLImageElement) => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#f5f5f7';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
      ctx.fill();
      if (img) {
        const box = size * 0.5;
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

type Tip = { name: string; x: number; y: number } | null;

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
    camera.position.set(0, 0, 15);
    const world = new THREE.Group();
    scene.add(world);

    // --- layouts -------------------------------------------------------------------------
    const n = stackNodes.length;
    // Tetrahedron vertices: four cluster centers evenly spread in 3D.
    const k = 3.3 / Math.sqrt(3);
    const centers = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(([x, y, z]) => new THREE.Vector3(x * k, y * k, z * k));
    const grouped: THREE.Vector3[] = new Array(n);
    GROUPS.forEach((g, gi) => {
      const members = stackNodes.map((node, i) => ({ node, i })).filter((m) => m.node.group === g);
      const local = sphere(members.length, 0.85 + members.length * 0.09, gi);
      members.forEach((m, k) => (grouped[m.i] = centers[gi].clone().add(local[k])));
    });
    const spread = sphere(n, 3.9, 0.5);
    // Interleave so neighbours in the spread layout come from different groups.
    const order = stackNodes.map((_, i) => i).sort((a, b) => (a * 7) % n - (b * 7) % n);
    const ungrouped: THREE.Vector3[] = new Array(n);
    order.forEach((nodeIndex, k) => (ungrouped[nodeIndex] = spread[k]));

    // --- sprites -------------------------------------------------------------------------
    const sprites: THREE.Sprite[] = [];
    const textures: THREE.Texture[] = [];
    let disposed = false;
    stackNodes.forEach((node, i) => {
      const material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      sprite.scale.setScalar(0.78);
      sprite.position.copy(grouped[i]);
      sprite.userData = { index: i, delay: (i % 5) * 0.08 };
      world.add(sprite);
      sprites.push(sprite);
      makeTexture(`/tech/${node.logo}.svg`, renderer).then((tex) => {
        if (disposed) return tex.dispose();
        textures.push(tex);
        material.map = tex;
        material.opacity = 1;
        material.needsUpdate = true;
        needsRender = true;
      });
    });

    // --- edges ---------------------------------------------------------------------------
    const byName = new Map(stackNodes.map((node, i) => [node.name, i]));
    const pairs: [number, number][] = [];
    GROUPS.forEach((g) => {
      const idx = stackNodes.map((node, i) => (node.group === g ? i : -1)).filter((i) => i >= 0);
      idx.forEach((a, k) => {
        pairs.push([a, idx[(k + 1) % idx.length]]);
        if (idx.length > 3) pairs.push([a, idx[(k + 2) % idx.length]]);
      });
    });
    crossLinks.forEach(([a, b]) => {
      const ia = byName.get(a);
      const ib = byName.get(b);
      if (ia !== undefined && ib !== undefined) pairs.push([ia, ib]);
    });
    const linePositions = new Float32Array(pairs.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4f9cf0, transparent: true, opacity: 0.3, depthWrite: false });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    world.add(lines);

    // --- interaction ---------------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = -1;
    let needsRender = true;

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
    // mix: 0 = grouped, 1 = ungrouped
    const mixAt = (t: number, delay: number) => {
      const c = ((t - delay) % CYCLE + CYCLE) % CYCLE;
      if (c < HOLD) return 0;
      if (c < HOLD + MOVE) return ease((c - HOLD) / MOVE);
      if (c < HOLD * 2 + MOVE) return 1;
      return 1 - ease((c - (HOLD * 2 + MOVE)) / MOVE);
    };
    const tmp = new THREE.Vector3();
    const clock = new THREE.Clock();
    let spin = 0;
    let raf = 0;

    const update = (t: number, dt: number) => {
      let avg = 0;
      sprites.forEach((sprite, i) => {
        const m = reduce ? 0 : mixAt(t, sprite.userData.delay);
        avg += m;
        sprite.position.lerpVectors(grouped[i], ungrouped[i], m);
        const target = i === hovered ? 1.25 : 1;
        const s = sprite.scale.x / 0.78;
        sprite.scale.setScalar(0.78 * (s + (target - s) * Math.min(1, dt * 12)));
      });
      avg /= sprites.length;
      lineMaterial.opacity = 0.36 - avg * 0.2;
      pairs.forEach(([a, b], k) => {
        sprites[a].getWorldPosition(tmp);
        world.worldToLocal(tmp);
        linePositions.set([tmp.x, tmp.y, tmp.z], k * 6);
        sprites[b].getWorldPosition(tmp);
        world.worldToLocal(tmp);
        linePositions.set([tmp.x, tmp.y, tmp.z], k * 6 + 3);
      });
      lineGeometry.attributes.position.needsUpdate = true;
      if (!reduce) {
        spin += dt * (hovered >= 0 ? 0.03 : 0.12);
        world.rotation.y = spin;
        world.rotation.x = Math.sin(t * 0.2) * 0.12;
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (reduce) {
        if (!needsRender) return;
        update(0, dt || 0.016);
        needsRender = false;
      } else {
        if (!visible || document.hidden) return;
        update(clock.elapsedTime, dt);
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
      lineGeometry.dispose();
      lineMaterial.dispose();
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
