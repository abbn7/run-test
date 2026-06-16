import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  tier?: "whisper" | "card" | "strong";
  glow?: boolean;
  children: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, tier = "card", glow = false, children, ...rest },
  ref,
) {
  const tierClass =
    tier === "whisper" ? "glass" : tier === "strong" ? "glass-strong" : "glass-card";
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        tierClass,
        glow && "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-[var(--accent-1)]/8 before:via-transparent before:to-[var(--accent-3)]/8 before:pointer-events-none",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
