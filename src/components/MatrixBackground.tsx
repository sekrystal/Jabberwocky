import React, { useRef, useEffect } from "react";

// Improved Matrix "Digital Rain" animation – slower, smooth, staggered, streams of varied color.
const CHARACTERS = "01".split("");
const MAIN_COLOR = "#e5e7eb"; // white
const ACCENT_COLOR = "#ef4444"; // red

function randomChar() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const fontSize = 18;
    let columns = Math.floor(width / fontSize);

    // Each stream keeps its own text "trail" and vertical position
    let streams = Array.from({ length: columns }, (_, col) => ({
      chars: Array.from({ length: Math.floor(8 + Math.random() * 8) }, randomChar),
      y: Math.random() * height / fontSize, // Start partially down the screen
      speed: 0.17 + Math.random() * 0.13, // Even slower and more varied
      lastUpdate: performance.now() - Math.random() * 1500,
      color: Math.random() > 0.85 ? ACCENT_COLOR : MAIN_COLOR,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      streams = Array.from({ length: columns }, (_, col) => ({
        chars: Array.from({ length: Math.floor(8 + Math.random() * 8) }, randomChar),
        y: Math.random() * height / fontSize,
        speed: 0.17 + Math.random() * 0.13,
        lastUpdate: performance.now() - Math.random() * 1500,
        color: Math.random() > 0.85 ? ACCENT_COLOR : MAIN_COLOR,
      }));
    };
    window.addEventListener("resize", handleResize);

    function draw(now: number) {
      ctx.fillStyle = "rgba(10,10,10,0.86)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        let stream = streams[i];
        let { chars, y, speed, lastUpdate, color } = stream;
        let streamLength = chars.length;

        // Only advance the stream every N ms for smoothness and slowness
        if (now - stream.lastUpdate > 46) { // ~22 FPS per stream, much slower
          stream.y += speed;
          stream.lastUpdate = now;
          // Cycle chars, randomly change one at front for animation "noise"
          if (Math.random() > 0.5) {
            chars[0] = randomChar();
          }
        }

        // Occasionally swap stream color (60% main, 40% chance of turning red "accent" for a moment)
        if (Math.random() > 0.994) {
          stream.color = ACCENT_COLOR;
        } else if (Math.random() < 0.985) {
          stream.color = MAIN_COLOR;
        }

        // Draw each char in the column as a "tail"
        for (let j = 0; j < streamLength; j++) {
          const fade = 1 - j / streamLength;
          ctx.fillStyle = stream.color === ACCENT_COLOR && j < 2
            ? ACCENT_COLOR
            : `rgba(229,231,235,${fade * (stream.color === ACCENT_COLOR ? 0.76 : 0.85)})`;

          ctx.fillText(
            chars[j],
            i * fontSize,
            (y - j) * fontSize
          );
        }

        // Reset
        if ((y - streamLength) * fontSize > height && Math.random() > 0.978) {
          stream.y = -Math.random() * 6;
          stream.chars = Array.from({ length: Math.floor(8 + Math.random() * 8) }, randomChar);
          stream.speed = 0.17 + Math.random() * 0.13;
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none"
      style={{
        background: "black",
        opacity: 0.93,
      }}
      aria-hidden="true"
    />
  );
}
