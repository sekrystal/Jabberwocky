
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
    // An array of "y" positions for the drop in each column
    let drops = Array(columns).fill(1);

    // Handle resizing (responsive)
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", handleResize);

    function draw() {
      // Black background with opacity, fading trails effect
      ctx.fillStyle = "rgba(10,10,10,0.80)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        // Pick a random character in red or green occasionally for accent
        let text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        if (Math.random() > 0.985) {
          ctx.fillStyle = "#ef4444"; // Red accent
        } else {
          ctx.fillStyle = "#e5e7eb"; // Light gray/white
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send drop back to top randomly, otherwise move down
        if (
          drops[i] * fontSize > height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i]++;
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
        // You can tune opacity if needed
      }}
      aria-hidden="true"
    />
  );
}
