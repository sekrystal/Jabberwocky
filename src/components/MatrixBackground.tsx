
import React, { useRef, useEffect } from "react";

// Matrix "Digital Rain" animation as a Canvas background component
const CHARACTERS = "01".split("");

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
    let fontSize = 16;
    let columns = Math.floor(width / fontSize);

    // Array of [y, velocity] for each column
    let drops = Array.from({ length: columns }, () => ({
      y: Math.random() * height / fontSize,
      velocity: 0.8 + Math.random() * 0.55, // much slower (was 1+)
    }));

    // Handle resizing (responsive)
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * height / fontSize,
        velocity: 0.8 + Math.random() * 0.55,
      }));
    };
    window.addEventListener("resize", handleResize);

    function draw() {
      // Black background with opacity, fading trails effect
      ctx.fillStyle = "rgba(10,10,10,0.80)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        let text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        // Accent: mostly light gray/white, occasional red (accent)
        if (Math.random() > 0.985) {
          ctx.fillStyle = "#ef4444";
        } else {
          ctx.fillStyle = "#e5e7eb";
        }
        ctx.fillText(text, i * fontSize, drops[i].y * fontSize);

        // Move the drop down by its velocity (much slower)
        drops[i].y += drops[i].velocity;

        // Reset to top if off-screen with some randomness
        if (
          drops[i].y * fontSize > height &&
          Math.random() > 0.98
        ) {
          drops[i].y = 0;
          drops[i].velocity = 0.8 + Math.random() * 0.55;
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    draw();

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
        opacity: 0.9,
      }}
      aria-hidden="true"
    />
  );
}
