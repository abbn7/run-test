import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  animated?: boolean;
  withRing?: boolean;
}

/**
 * Custom AN monogram — interlocking glass glyph.
 * Used in nav, footer, loading screen, favicon, OG.
 */
export function Monogram({ size = 40, className, animated = false, withRing = true }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("inline-block", className)}
      aria-label="Abdelhamed Nada monogram"
      role="img"
    >
      <defs>
        <linearGradient id="an-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.18 268)" />
          <stop offset="35%" stopColor="oklch(0.78 0.13 215)" />
          <stop offset="70%" stopColor="oklch(0.82 0.13 195)" />
          <stop offset="100%" stopColor="oklch(0.80 0.13 320)" />
        </linearGradient>
        <linearGradient id="an-grad-soft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(1 0 0 / 0.6)" />
          <stop offset="100%" stopColor="oklch(1 0 0 / 0.05)" />
        </linearGradient>
        <filter id="an-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {withRing && (
        <circle cx="32" cy="32" r="30" fill="none" stroke="url(#an-grad)" strokeWidth="1.2" opacity="0.5" />
      )}

      {/* Inner glass plate */}
      <circle cx="32" cy="32" r="26" fill="url(#an-grad-soft)" stroke="oklch(1 0 0 / 0.35)" strokeWidth="0.6" />

      {/* A — left diagonal */}
      <path
        d="M19 46 L29 18 L35 18 L45 46"
        fill="none"
        stroke="url(#an-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#an-blur)"
        style={
          animated
            ? { strokeDasharray: 120, strokeDashoffset: 120, animation: "draw-stroke 1.6s var(--ease-apple) forwards" }
            : undefined
        }
      />
      {/* A — crossbar */}
      <path
        d="M24 36 L40 36"
        fill="none"
        stroke="url(#an-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
        style={
          animated
            ? { strokeDasharray: 20, strokeDashoffset: 20, animation: "draw-stroke 0.8s var(--ease-apple) 0.6s forwards" }
            : undefined
        }
      />
      {/* N — overlaid */}
      <path
        d="M30 46 L30 22 L44 42 L44 18"
        fill="none"
        stroke="url(#an-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
        style={
          animated
            ? { strokeDasharray: 120, strokeDashoffset: 120, animation: "draw-stroke 1.6s var(--ease-apple) 0.3s forwards" }
            : undefined
        }
      />
    </svg>
  );
}
