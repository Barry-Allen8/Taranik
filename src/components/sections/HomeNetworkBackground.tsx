"use client";

import { useEffect, useRef } from "react";

type ConstellationNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: "lime" | "cyan";
};

const CONSTELLATION_PIXELS_PER_NODE = 30000;
const CONSTELLATION_MIN_NODES = 28;
const CONSTELLATION_MAX_NODES = 92;
const CONSTELLATION_LINK_DISTANCE = 228;
const CONSTELLATION_EDGE_PADDING = 24;
const CONSTELLATION_MIN_SPEED = 0.12;
const CONSTELLATION_MAX_SPEED = 0.34;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    const constellation: ConstellationNode[] = [];

    const createConstellationNode = (): ConstellationNode => {
      const angle = randomInRange(0, Math.PI * 2);
      const speed = randomInRange(CONSTELLATION_MIN_SPEED, CONSTELLATION_MAX_SPEED);

      return {
        x: randomInRange(-CONSTELLATION_EDGE_PADDING, width + CONSTELLATION_EDGE_PADDING),
        y: randomInRange(-CONSTELLATION_EDGE_PADDING, height + CONSTELLATION_EDGE_PADDING),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: randomInRange(1.1, 2.6),
        twinklePhase: randomInRange(0, Math.PI * 2),
        twinkleSpeed: randomInRange(0.55, 1.35),
        color: Math.random() > 0.64 ? "lime" : "cyan",
      };
    };

    const initializeConstellation = () => {
      const targetCount = clamp(
        Math.round((width * height) / CONSTELLATION_PIXELS_PER_NODE),
        CONSTELLATION_MIN_NODES,
        CONSTELLATION_MAX_NODES
      );

      constellation.length = 0;
      for (let i = 0; i < targetCount; i += 1) {
        constellation.push(createConstellationNode());
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      initializeConstellation();
    };

    const drawConstellation = (deltaMs: number, timeSeconds: number) => {
      const deltaScale = deltaMs / 16.7;
      const linkDistance = CONSTELLATION_LINK_DISTANCE + intensity * 14;
      const linkDistanceSq = linkDistance * linkDistance;

      if (!reducedMotion) {
        for (const node of constellation) {
          node.x += node.vx * deltaScale;
          node.y += node.vy * deltaScale;

          if (node.x < -CONSTELLATION_EDGE_PADDING || node.x > width + CONSTELLATION_EDGE_PADDING) {
            node.vx *= -1;
            node.x = clamp(node.x, -CONSTELLATION_EDGE_PADDING, width + CONSTELLATION_EDGE_PADDING);
          }

          if (node.y < -CONSTELLATION_EDGE_PADDING || node.y > height + CONSTELLATION_EDGE_PADDING) {
            node.vy *= -1;
            node.y = clamp(node.y, -CONSTELLATION_EDGE_PADDING, height + CONSTELLATION_EDGE_PADDING);
          }
        }
      }

      for (let i = 0; i < constellation.length; i += 1) {
        const a = constellation[i];

        for (let j = i + 1; j < constellation.length; j += 1) {
          const b = constellation[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq > linkDistanceSq) {
            continue;
          }

          const distance = Math.sqrt(distanceSq);
          const proximity = 1 - distance / linkDistance;
          const alpha = proximity * proximity * (0.14 + intensity * 0.11);
          if (alpha <= 0.0025) {
            continue;
          }

          context.strokeStyle =
            (i + j) % 6 === 0
              ? `rgba(190, 242, 100, ${alpha * 0.84})`
              : `rgba(56, 189, 248, ${alpha})`;
          context.lineWidth = 0.45 + proximity * 0.95;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const node of constellation) {
        const twinkle = reducedMotion
          ? 0.8
          : 0.55 + ((Math.sin(timeSeconds * node.twinkleSpeed + node.twinklePhase) + 1) * 0.5) * 0.45;
        const alpha = (node.color === "lime" ? 0.3 : 0.36) * twinkle * intensity;
        const radius = node.size * (0.7 + twinkle * 0.75);

        context.fillStyle =
          node.color === "lime"
            ? `rgba(190, 242, 100, ${alpha})`
            : `rgba(56, 189, 248, ${alpha})`;
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();
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

      context.clearRect(0, 0, width, height);

      const timeSeconds = time * 0.001;
      drawConstellation(deltaMs, reducedMotion ? 0 : timeSeconds);
      drawVignette();

      rafId = window.requestAnimationFrame(frame);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    resize();
    rafId = window.requestAnimationFrame(frame);

    window.addEventListener("resize", resize, { passive: true });
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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
