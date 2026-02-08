"use client";

import { useEffect, useRef } from "react";

type AuroraBlob = {
  xFactor: number;
  yFactor: number;
  radius: number;
  speed: number;
  phase: number;
  color: "lime" | "cyan";
};

type CometTrailPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
  trail: CometTrailPoint[];
};

const BLOBS: AuroraBlob[] = [
  { xFactor: 0.2, yFactor: 0.18, radius: 430, speed: 0.12, phase: 0.2, color: "cyan" },
  { xFactor: 0.82, yFactor: 0.2, radius: 480, speed: 0.1, phase: 1.4, color: "lime" },
  { xFactor: 0.68, yFactor: 0.78, radius: 420, speed: 0.14, phase: 2.1, color: "cyan" },
  { xFactor: 0.3, yFactor: 0.76, radius: 460, speed: 0.11, phase: 2.8, color: "lime" },
];

const GRID_SIZE = 80;
const GRID_MAX_SHIFT = 24;
const TRAIL_EMIT_INTERVAL_MS = 14;
const TRAIL_MAX_POINTS = 30;
const TRAIL_MIN_LIFE_MS = 260;
const TRAIL_MAX_LIFE_MS = 520;
const TRAIL_DRAG = 0.9;

const lerp = (start: number, end: number, value: number) => start + (end - start) * value;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function HomeNetworkBackground({
  intensity = 1,
}: {
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let rafId = 0;
    let previousTime = 0;
    let lastTrailAt = 0;

    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      trail: [],
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!pointer.active) {
        pointer.x = width * 0.5;
        pointer.y = height * 0.5;
        pointer.targetX = pointer.x;
        pointer.targetY = pointer.y;
      }
    };

    const drawAurora = (timeSeconds: number) => {
      for (const blob of BLOBS) {
        const waveX = Math.sin(timeSeconds * blob.speed + blob.phase) * (28 * intensity);
        const waveY = Math.cos(timeSeconds * blob.speed * 0.85 + blob.phase) * (24 * intensity);
        const x = width * blob.xFactor + waveX;
        const y = height * blob.yFactor + waveY;

        const gradient = context.createRadialGradient(x, y, 0, x, y, blob.radius);

        if (blob.color === "lime") {
          gradient.addColorStop(0, `rgba(190, 242, 100, ${0.12 * intensity})`);
          gradient.addColorStop(0.36, `rgba(163, 230, 53, ${0.08 * intensity})`);
          gradient.addColorStop(1, "rgba(163, 230, 53, 0)");
        } else {
          gradient.addColorStop(0, `rgba(34, 211, 238, ${0.1 * intensity})`);
          gradient.addColorStop(0.34, `rgba(56, 189, 248, ${0.07 * intensity})`);
          gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        }

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, blob.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawParallaxGrid = () => {
      const nx = pointer.x / Math.max(width, 1) - 0.5;
      const ny = pointer.y / Math.max(height, 1) - 0.5;
      const offsetX = nx * GRID_MAX_SHIFT * intensity;
      const offsetY = ny * GRID_MAX_SHIFT * intensity;

      context.strokeStyle = "rgba(148, 163, 184, 0.08)";
      context.lineWidth = 1;

      const startX = -GRID_SIZE + offsetX;
      const startY = -GRID_SIZE + offsetY;

      for (let x = startX; x < width + GRID_SIZE; x += GRID_SIZE) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = startY; y < height + GRID_SIZE; y += GRID_SIZE) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const drawCometTrail = (deltaMs: number) => {
      const deltaScale = deltaMs / 16.7;
      const drag = Math.pow(TRAIL_DRAG, deltaScale);

      for (let i = pointer.trail.length - 1; i >= 0; i -= 1) {
        const point = pointer.trail[i];
        point.age += deltaMs;

        if (point.age >= point.life) {
          pointer.trail.splice(i, 1);
          continue;
        }

        point.x += point.vx * deltaScale;
        point.y += point.vy * deltaScale;
        point.vx *= drag;
        point.vy *= drag;
      }

      if (pointer.trail.length < 2) {
        return;
      }

      for (let i = 1; i < pointer.trail.length; i += 1) {
        const previous = pointer.trail[i - 1];
        const current = pointer.trail[i];
        const previousLife = 1 - previous.age / previous.life;
        const currentLife = 1 - current.age / current.life;
        const life = Math.min(previousLife, currentLife);

        if (life <= 0) {
          continue;
        }

        const t = i / (pointer.trail.length - 1);
        const alpha = life * (0.08 + t * 0.46) * intensity;

        context.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        context.lineWidth = Math.max(0.8, current.size * (0.8 + t * 0.8));
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(current.x, current.y);
        context.stroke();

        if (t > 0.45) {
          context.strokeStyle = `rgba(190, 242, 100, ${alpha * 0.72})`;
          context.lineWidth = Math.max(0.6, current.size * 0.45);
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.stroke();
        }
      }
    };

    const drawVignette = () => {
      const vignette = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(2, 6, 23, 0)");
      vignette.addColorStop(1, "rgba(2, 6, 23, 0.56)");

      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const frame = (time: number) => {
      const deltaMs = previousTime === 0 ? 16.7 : time - previousTime;
      previousTime = time;

      if (!reducedMotion) {
        pointer.x = lerp(pointer.x, pointer.targetX, 0.13);
        pointer.y = lerp(pointer.y, pointer.targetY, 0.13);
      } else {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }

      context.clearRect(0, 0, width, height);

      const timeSeconds = time * 0.001;
      drawAurora(reducedMotion ? 0 : timeSeconds);
      drawParallaxGrid();
      drawCometTrail(deltaMs);
      drawVignette();

      rafId = window.requestAnimationFrame(frame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const previousTargetX = pointer.targetX;
      const previousTargetY = pointer.targetY;

      pointer.active = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;

      if (reducedMotion) {
        return;
      }

      if (event.timeStamp - lastTrailAt >= TRAIL_EMIT_INTERVAL_MS) {
        lastTrailAt = event.timeStamp;

        const dx = event.clientX - previousTargetX;
        const dy = event.clientY - previousTargetY;
        const distance = Math.hypot(dx, dy);
        const normalized = distance > 0 ? distance : 1;
        const directionX = dx / normalized;
        const directionY = dy / normalized;
        const speed = Math.min(distance, 28);
        const spread = 0.55 + speed * 0.045;

        pointer.trail.push({
          x: event.clientX - directionX * 3,
          y: event.clientY - directionY * 3,
          vx:
            -directionX * (0.75 + speed * 0.08) +
            randomInRange(-spread, spread),
          vy:
            -directionY * (0.75 + speed * 0.08) +
            randomInRange(-spread, spread),
          age: 0,
          life: randomInRange(TRAIL_MIN_LIFE_MS, TRAIL_MAX_LIFE_MS),
          size: randomInRange(2.4, 4.8) + speed * 0.04,
        });

        if (pointer.trail.length > TRAIL_MAX_POINTS) {
          pointer.trail.shift();
        }
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = width * 0.5;
      pointer.targetY = height * 0.45;
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      pointer.trail = [];
    };

    resize();
    rafId = window.requestAnimationFrame(frame);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointercancel", handlePointerLeave);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointercancel", handlePointerLeave);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, [intensity]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="ambient-scanline" aria-hidden="true" />
      <div className="ambient-noise" aria-hidden="true" />
    </div>
  );
}
