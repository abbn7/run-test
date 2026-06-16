import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export function AboutPreview() {
  const { lang, t } = useI18n();
  const highlights = lang === "ar" ? profile.highlights.ar : profile.highlights.en;

  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                {t("About", "عن")}
              </div>
              <h2 className="font-display text-4xl font-medium leading-[1] sm:text-5xl">
                {t("A builder, first.", "صانع، أولاً.")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--text-soft)]">
                {t(profile.summary.en, profile.summary.ar)}
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] underline-offset-4 hover:underline"
              >
                {t("Read the full story →", "اقرأ القصة كاملة →")}
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.06}>
                <div className="glass-card noise-overlay h-full p-6">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent-1)]/30 to-[var(--accent-3)]/30 text-[11px] font-semibold text-[var(--text)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl font-medium text-[var(--text)]">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
