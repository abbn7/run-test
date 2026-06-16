import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  radius?: number;
  strength?: number;
}

export function MagneticHover({ children, className, radius = 80, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(x, (v) => `${v}px`);
  const ty = useTransform(y, (v) => `${v}px`);

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius * 1.5) { mx.set(0); my.set(0); return; }
    mx.set(dx * strength);
    my.set(dy * strength);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: tx, y: ty }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
