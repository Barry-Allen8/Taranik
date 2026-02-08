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

const CONSTELLATION_PIXELS_PER_NODE = 42000;
const CONSTELLATION_MIN_NODES = 28;
const CONSTELLATION_MAX_NODES = 68;
const CONSTELLATION_LINK_DISTANCE = 190;
const CONSTELLATION_POINTER_RADIUS = 220;
const CONSTELLATION_EDGE_PADDING = 24;
const CONSTELLATION_MIN_SPEED = 0.12;
const CONSTELLATION_MAX_SPEED = 0.34;
const TRAIL_EMIT_INTERVAL_MS = 14;
const TRAIL_MAX_POINTS = 30;
const TRAIL_MIN_LIFE_MS = 260;
const TRAIL_MAX_LIFE_MS = 520;
const TRAIL_DRAG = 0.9;

const lerp = (start: number, end: number, value: number) => start + (end - start) * value;
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

      if (!pointer.active) {
        pointer.x = width * 0.5;
        pointer.y = height * 0.5;
        pointer.targetX = pointer.x;
        pointer.targetY = pointer.y;
      }
    };

    const drawConstellation = (deltaMs: number, timeSeconds: number) => {
      const deltaScale = deltaMs / 16.7;
      const linkDistance = CONSTELLATION_LINK_DISTANCE + intensity * 14;
      const linkDistanceSq = linkDistance * linkDistance;
      const pointerRadiusSq = CONSTELLATION_POINTER_RADIUS * CONSTELLATION_POINTER_RADIUS;

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
          const centerX = (a.x + b.x) * 0.5;
          const centerY = (a.y + b.y) * 0.5;
          let pointerBoost = 0;

          if (pointer.active) {
            const pointerDx = centerX - pointer.x;
            const pointerDy = centerY - pointer.y;
            const pointerDistanceSq = pointerDx * pointerDx + pointerDy * pointerDy;
            if (pointerDistanceSq < pointerRadiusSq) {
              pointerBoost = (1 - Math.sqrt(pointerDistanceSq) / CONSTELLATION_POINTER_RADIUS) * 0.18;
            }
          }

          const alpha = proximity * proximity * (0.14 + intensity * 0.11) + pointerBoost;
          if (alpha <= 0.004) {
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

        let pointerBoost = 0;
        if (pointer.active) {
          const pointerDx = node.x - pointer.x;
          const pointerDy = node.y - pointer.y;
          const pointerDistanceSq = pointerDx * pointerDx + pointerDy * pointerDy;
          if (pointerDistanceSq < pointerRadiusSq) {
            pointerBoost = (1 - Math.sqrt(pointerDistanceSq) / CONSTELLATION_POINTER_RADIUS) * 0.26;
          }
        }

        const alpha = (node.color === "lime" ? 0.3 : 0.36) * twinkle * intensity + pointerBoost;
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
      drawConstellation(deltaMs, reducedMotion ? 0 : timeSeconds);
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
