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

type EchoRipple = {
  x: number;
  y: number;
  age: number;
  duration: number;
  radius: number;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
  echoes: EchoRipple[];
};

const BLOBS: AuroraBlob[] = [
  { xFactor: 0.2, yFactor: 0.18, radius: 430, speed: 0.12, phase: 0.2, color: "cyan" },
  { xFactor: 0.82, yFactor: 0.2, radius: 480, speed: 0.1, phase: 1.4, color: "lime" },
  { xFactor: 0.68, yFactor: 0.78, radius: 420, speed: 0.14, phase: 2.1, color: "cyan" },
  { xFactor: 0.3, yFactor: 0.76, radius: 460, speed: 0.11, phase: 2.8, color: "lime" },
];

const GRID_SIZE = 40;
const GRID_MAX_SHIFT = 14;
const ECHO_INTERVAL_MS = 85;
const ECHO_MAX_COUNT = 9;
const ECHO_MIN_DURATION = 620;
const ECHO_MAX_DURATION = 980;

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
    let lastEchoAt = 0;

    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      echoes: [],
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

    const drawPointerGlow = () => {
      if (!pointer.active) {
        return;
      }

      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 120);
      gradient.addColorStop(0, "rgba(190, 242, 100, 0.14)");
      gradient.addColorStop(0.45, "rgba(56, 189, 248, 0.08)");
      gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2);
      context.fill();
    };

    const drawEchoes = (deltaMs: number) => {
      for (let i = pointer.echoes.length - 1; i >= 0; i -= 1) {
        const echo = pointer.echoes[i];
        echo.age += deltaMs;

        if (echo.age >= echo.duration) {
          pointer.echoes.splice(i, 1);
          continue;
        }

        const progress = echo.age / echo.duration;
        const radius = 10 + echo.radius * progress;
        const alpha = (1 - progress) * 0.34 * intensity;

        context.strokeStyle = `rgba(190, 242, 100, ${alpha})`;
        context.lineWidth = 1.8 - progress;
        context.beginPath();
        context.arc(echo.x, echo.y, radius, 0, Math.PI * 2);
        context.stroke();
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
      drawPointerGlow();
      drawEchoes(deltaMs);
      drawVignette();

      rafId = window.requestAnimationFrame(frame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.active = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;

      if (reducedMotion) {
        return;
      }

      if (event.timeStamp - lastEchoAt >= ECHO_INTERVAL_MS) {
        lastEchoAt = event.timeStamp;
        pointer.echoes.push({
          x: event.clientX,
          y: event.clientY,
          age: 0,
          duration: randomInRange(ECHO_MIN_DURATION, ECHO_MAX_DURATION),
          radius: randomInRange(56, 106),
        });

        if (pointer.echoes.length > ECHO_MAX_COUNT) {
          pointer.echoes.shift();
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
      pointer.echoes = [];
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
