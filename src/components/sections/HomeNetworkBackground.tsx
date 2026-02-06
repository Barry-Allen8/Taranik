"use client";

import { useEffect, useRef } from "react";

type ParticleNode = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  opacity: number;
};

type PointerEcho = {
  x: number;
  y: number;
  age: number;
  duration: number;
  maxRadius: number;
};

const MIN_PARTICLE_COUNT = 34;
const MAX_PARTICLE_COUNT = 76;
const PARTICLE_DENSITY_DIVISOR = 24000;
const GRID_GAP = 72;
const PARTICLE_LINK_DISTANCE = 146;
const POINTER_LINK_DISTANCE = 168;
const PARTICLE_MAX_SPEED = 0.32;
const POINTER_ECHO_INTERVAL = 90;
const MAX_POINTER_ECHOES = 10;
const PARTICLE_LINK_ALPHA_SCALE = 0.46;
const PARTICLE_LINK_MIN_ALPHA = 0.09;
const POINTER_LINK_ALPHA_SCALE = 0.65;
const POINTER_LINK_MIN_ALPHA = 0.14;

const randomInRange = (minimum: number, maximum: number) => Math.random() * (maximum - minimum) + minimum;

const createParticleNodes = (viewportWidth: number, viewportHeight: number, count: number): ParticleNode[] =>
  Array.from({ length: count }, () => ({
    x: randomInRange(0, viewportWidth),
    y: randomInRange(0, viewportHeight),
    velocityX: randomInRange(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED),
    velocityY: randomInRange(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED),
    radius: randomInRange(1.2, 2.4),
    opacity: randomInRange(0.25, 0.7),
  }));

export default function HomeNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      return;
    }

    const renderingContext = canvasElement.getContext("2d");
    if (!renderingContext) {
      return;
    }

    let viewportWidth = 0;
    let viewportHeight = 0;
    let animationFrameId = 0;
    let previousTimestamp = 0;
    let particleNodes: ParticleNode[] = [];
    const pointerState = { x: 0, y: 0, active: false, lastEchoAt: 0, echoes: [] as PointerEcho[] };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotionEnabled = reducedMotionQuery.matches;

    const setupCanvas = () => {
      viewportWidth = canvasElement.clientWidth;
      viewportHeight = canvasElement.clientHeight;

      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasElement.width = Math.floor(viewportWidth * devicePixelRatio);
      canvasElement.height = Math.floor(viewportHeight * devicePixelRatio);
      renderingContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const particleCount = Math.min(
        MAX_PARTICLE_COUNT,
        Math.max(MIN_PARTICLE_COUNT, Math.floor((viewportWidth * viewportHeight) / PARTICLE_DENSITY_DIVISOR))
      );

      particleNodes = createParticleNodes(viewportWidth, viewportHeight, particleCount);
    };

    const drawGrid = (timestamp: number) => {
      const horizontalOffset = reducedMotionEnabled ? 0 : (timestamp * 0.012) % GRID_GAP;
      const verticalOffset = reducedMotionEnabled ? 0 : (timestamp * 0.008) % GRID_GAP;

      renderingContext.lineWidth = 1;
      renderingContext.strokeStyle = "rgba(148, 163, 184, 0.08)";

      for (let xPosition = -GRID_GAP + horizontalOffset; xPosition <= viewportWidth + GRID_GAP; xPosition += GRID_GAP) {
        renderingContext.beginPath();
        renderingContext.moveTo(xPosition, 0);
        renderingContext.lineTo(xPosition, viewportHeight);
        renderingContext.stroke();
      }

      for (let yPosition = -GRID_GAP + verticalOffset; yPosition <= viewportHeight + GRID_GAP; yPosition += GRID_GAP) {
        renderingContext.beginPath();
        renderingContext.moveTo(0, yPosition);
        renderingContext.lineTo(viewportWidth, yPosition);
        renderingContext.stroke();
      }
    };

    const updateParticles = () => {
      if (reducedMotionEnabled) {
        return;
      }

      for (const node of particleNodes) {
        node.x += node.velocityX;
        node.y += node.velocityY;

        if (node.x <= 0 || node.x >= viewportWidth) {
          node.velocityX *= -1;
        }
        if (node.y <= 0 || node.y >= viewportHeight) {
          node.velocityY *= -1;
        }
      }
    };

    const drawParticleLinks = () => {
      renderingContext.lineWidth = 1.15;

      for (let sourceIndex = 0; sourceIndex < particleNodes.length; sourceIndex += 1) {
        const sourceNode = particleNodes[sourceIndex];

        for (let targetIndex = sourceIndex + 1; targetIndex < particleNodes.length; targetIndex += 1) {
          const targetNode = particleNodes[targetIndex];
          const deltaX = sourceNode.x - targetNode.x;
          const deltaY = sourceNode.y - targetNode.y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > PARTICLE_LINK_DISTANCE) {
            continue;
          }

          const opacity = Math.max(
            PARTICLE_LINK_MIN_ALPHA,
            (1 - distance / PARTICLE_LINK_DISTANCE) * PARTICLE_LINK_ALPHA_SCALE
          );
          renderingContext.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
          renderingContext.beginPath();
          renderingContext.moveTo(sourceNode.x, sourceNode.y);
          renderingContext.lineTo(targetNode.x, targetNode.y);
          renderingContext.stroke();
        }
      }
    };

    const drawPointerLinks = () => {
      if (!pointerState.active) {
        return;
      }

      renderingContext.lineWidth = 1.25;

      for (const node of particleNodes) {
        const distance = Math.hypot(node.x - pointerState.x, node.y - pointerState.y);
        if (distance > POINTER_LINK_DISTANCE) {
          continue;
        }

        const opacity = Math.max(
          POINTER_LINK_MIN_ALPHA,
          (1 - distance / POINTER_LINK_DISTANCE) * POINTER_LINK_ALPHA_SCALE
        );
        renderingContext.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
        renderingContext.beginPath();
        renderingContext.moveTo(node.x, node.y);
        renderingContext.lineTo(pointerState.x, pointerState.y);
        renderingContext.stroke();
      }
    };

    const drawPointerEchoes = (deltaMilliseconds: number) => {
      if (pointerState.active) {
        const glowGradient = renderingContext.createRadialGradient(
          pointerState.x,
          pointerState.y,
          0,
          pointerState.x,
          pointerState.y,
          86
        );
        glowGradient.addColorStop(0, "rgba(125, 211, 252, 0.28)");
        glowGradient.addColorStop(0.35, "rgba(56, 189, 248, 0.14)");
        glowGradient.addColorStop(1, "rgba(56, 189, 248, 0)");

        renderingContext.fillStyle = glowGradient;
        renderingContext.beginPath();
        renderingContext.arc(pointerState.x, pointerState.y, 86, 0, Math.PI * 2);
        renderingContext.fill();
      }

      for (let echoIndex = pointerState.echoes.length - 1; echoIndex >= 0; echoIndex -= 1) {
        const echo = pointerState.echoes[echoIndex];
        echo.age += deltaMilliseconds;

        if (echo.age >= echo.duration) {
          pointerState.echoes.splice(echoIndex, 1);
          continue;
        }

        const progress = echo.age / echo.duration;
        const radius = 12 + echo.maxRadius * progress;
        const opacity = (1 - progress) * 0.46;

        renderingContext.lineWidth = 1.6 - progress;
        renderingContext.strokeStyle = `rgba(125, 211, 252, ${opacity})`;
        renderingContext.beginPath();
        renderingContext.arc(echo.x, echo.y, radius, 0, Math.PI * 2);
        renderingContext.stroke();
      }
    };

    const drawParticles = () => {
      for (const node of particleNodes) {
        renderingContext.fillStyle = `rgba(125, 211, 252, ${node.opacity})`;
        renderingContext.beginPath();
        renderingContext.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        renderingContext.fill();
      }
    };

    const renderFrame = (timestamp: number) => {
      const deltaMilliseconds = previousTimestamp === 0 ? 16.7 : timestamp - previousTimestamp;
      previousTimestamp = timestamp;
      renderingContext.clearRect(0, 0, viewportWidth, viewportHeight);
      drawGrid(timestamp);
      updateParticles();
      drawParticleLinks();
      drawPointerLinks();
      drawPointerEchoes(deltaMilliseconds);
      drawParticles();
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerState.x = event.clientX;
      pointerState.y = event.clientY;
      pointerState.active = true;

      if (!reducedMotionEnabled && event.timeStamp - pointerState.lastEchoAt >= POINTER_ECHO_INTERVAL) {
        pointerState.lastEchoAt = event.timeStamp;
        pointerState.echoes.push({
          x: event.clientX,
          y: event.clientY,
          age: 0,
          duration: randomInRange(560, 860),
          maxRadius: randomInRange(54, 92),
        });
        if (pointerState.echoes.length > MAX_POINTER_ECHOES) {
          pointerState.echoes.shift();
        }
      }
    };

    const handlePointerLeave = () => {
      pointerState.active = false;
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionEnabled = event.matches;
    };

    setupCanvas();
    animationFrameId = window.requestAnimationFrame(renderFrame);

    window.addEventListener("resize", setupCanvas, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointercancel", handlePointerLeave);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointercancel", handlePointerLeave);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-60 [mask-image:radial-gradient(ellipse_90%_85%_at_50%_45%,black,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(37,99,235,0.1),transparent_52%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_56%)] opacity-65" />
    </div>
  );
}
