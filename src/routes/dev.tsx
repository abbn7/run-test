import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { useI18n } from "@/lib/i18n/context";

const ARCH = `
src/
├── routes/                  TanStack file-based routing
│   ├── __root.tsx           Shell + providers + aurora + intro
│   ├── index.tsx            Home (hero + sections)
│   ├── about, work, …       Page routes
│   └── work.$slug.tsx       Project case study
├── components/
│   ├── glass/               Glass primitives + monogram + motion
│   ├── hero/                R3F scene + composition
│   ├── layout/              Nav, footer, aurora, intro
│   └── sections/            Featured, principles, marquee, CTA
├── hooks/                   useTheme, useReducedMotion
├── lib/
│   ├── api/                 createServerFn endpoints
│   ├── data/profile.ts      Real CV data (single source of truth)
│   └── i18n/                AR / EN provider, RTL
└── styles.css               Tailwind v4 + design tokens
`.trim();

const LIBS = [
  { name: "TanStack Start", v: "v1", purpose: "SSR framework" },
  { name: "React", v: "19", purpose: "UI" },
  { name: "TypeScript", v: "5.8", purpose: "Type safety, strict mode" },
  { name: "Tailwind CSS", v: "v4", purpose: "Styling, design tokens" },
  { name: "Framer Motion", v: "12", purpose: "Component animations" },
  { name: "GSAP", v: "3", purpose: "Cinematic timelines" },
  { name: "React Three Fiber", v: "9", purpose: "WebGL hero scene" },
  { name: "drei", v: "10", purpose: "R3F helpers (MeshTransmissionMaterial)" },
  { name: "Lenis", v: "1", purpose: "Smooth scroll (optional)" },
  { name: "TanStack Query", v: "5", purpose: "GitHub data caching" },
  { name: "Zod", v: "3", purpose: "Input validation" },
  { name: "@vercel/analytics", v: "2", purpose: "Page + custom analytics" },
  { name: "@vercel/speed-insights", v: "2", purpose: "Real-user perf" },
];

export const Route = createFileRoute("/dev")({
  head: () => ({
    meta: [
      { title: "Developer Mode — Abdelhamed Nada" },
      { name: "description", content: "Architecture, tech stack, and libraries powering this portfolio." },
      { property: "og:title", content: "Developer Mode — Abdelhamed Nada" },
      { property: "og:description", content: "Architecture, tech stack, and libraries powering this portfolio." },
      { property: "og:url", content: "/dev" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/dev" }],
  }),
  component: DevPage,
});

function DevPage() {
  const { t } = useI18n();
  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <header className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("Developer mode · view stack", "وضع المطور · عرض التقنيات")}
        </div>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
          <SplitText text={t("Under the hood.", "ما تحت الغطاء.")} />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
          {t(
            "Full transparency on the architecture, tech stack, and libraries powering this portfolio.",
            "شفافية كاملة حول الهيكل والتقنيات والمكتبات التي تشغّل هذا البروتفوليو.",
          )}
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card noise-overlay h-full p-6">
            <h2 className="mb-4 font-display text-2xl">{t("Architecture", "الهيكل")}</h2>
            <pre className="overflow-x-auto rounded-2xl bg-[var(--bg-deep)]/60 p-4 font-mono text-[11px] leading-relaxed text-[var(--text-soft)]">
{ARCH}
            </pre>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="glass-card noise-overlay h-full p-6">
            <h2 className="mb-4 font-display text-2xl">{t("Libraries", "المكتبات")}</h2>
            <div className="space-y-2">
              {LIBS.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--surface-soft)]"
                >
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm text-[var(--text)]">{l.name}</div>
                    <div className="truncate text-xs text-[var(--text-faint)]">{l.purpose}</div>
                  </div>
                  <span className="glass-pill shrink-0 px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-soft)]">
                    {l.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mx-auto mt-6 max-w-6xl">
          <div className="glass-card noise-overlay p-6">
            <h2 className="mb-4 font-display text-2xl">{t("Performance budget", "ميزانية الأداء")}</h2>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { l: "LCP", v: "< 1.8s" },
                { l: "CLS", v: "< 0.05" },
                { l: "INP", v: "< 200ms" },
                { l: "Lighthouse", v: "95+" },
              ].map((m) => (
                <div key={m.l} className="rounded-2xl bg-[var(--surface-soft)] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                    {m.l}
                  </div>
                  <div className="mt-1 font-display text-2xl">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
