import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Abdelhamed Nada" },
      { name: "description", content: "Complete technical toolkit: React, Next.js, TypeScript, Supabase, AI tools, DevOps, and more." },
      { property: "og:title", content: "Skills — Abdelhamed Nada" },
      { property: "og:description", content: "Complete technical toolkit: React, Next.js, TypeScript, Supabase, AI tools, DevOps, and more." },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const { t } = useI18n();
  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <header className="mx-auto max-w-5xl">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("Toolkit", "أدواتي")}
        </div>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
          <SplitText text={t("Tools I reach for.", "الأدوات التي أعتمد عليها.")} />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
          {t(
            "A curated stack — every item is something I use in real, shipped work. No buzzword padding.",
            "حزمة منتقاة — كل عنصر مستخدم فعلياً في مشاريع منشورة. بدون حشو رنّان.",
          )}
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(profile.skills).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.05}>
            <div className="glass-card noise-overlay h-full p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-medium text-[var(--text)]">{group}</h2>
                <span className="glass-pill px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-soft)]">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="glass-pill px-3 py-1.5 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
