import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Animated aurora gradient backdrop. Sits behind everything.
 * Uses pure CSS animations + framer for subtle drift; no R3F overhead.
 */
export function AuroraBackdrop() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base wash */}
      <div className="absolute inset-0 bg-[var(--bg)]" />

      {/* Aurora mesh — main */}
      <motion.div
        className="aurora-mesh absolute -inset-[20%] opacity-90"
        style={{
          transform: `translate3d(${(mouse.x - 0.5) * 30}px, ${(mouse.y - 0.5) * 30}px, 0)`,
          transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 1, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second aurora layer — slower, opposite direction */}
      <motion.div
        className="aurora-mesh absolute -inset-[25%] opacity-50 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -2, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />
    </div>
  );
}
