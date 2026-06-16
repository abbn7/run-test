import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Abdelhamed Nada" },
      {
        name: "description",
        content:
          "About Abdelhamed Nada: Full-Stack Developer with a frontend-first mindset, AI-augmented workflow, and a love for production-grade craft.",
      },
      { property: "og:title", content: "About — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Full-Stack Developer with a frontend-first mindset, AI-augmented workflow, and a love for production-grade craft.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang, t } = useI18n();
  const edu = lang === "ar" ? profile.education.ar : profile.education.en;

  return (
    <article className="relative px-4 pt-32 sm:px-6 sm:pt-40">
      <header className="mx-auto max-w-4xl text-center">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("About", "نبذة")}
        </div>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
          <SplitText text={t("Engineering, with intent.", "هندسة، بنية واضحة.")} />
        </h1>
      </header>

      <Reveal delay={0.3}>
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Portrait */}
          <div className="glass-card noise-overlay overflow-hidden rounded-[2rem] p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <motion.img
                src={profile.portrait}
                alt={t(profile.name.en, profile.name.ar)}
                className="h-full w-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <span className="glass-pill px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
                  {t(profile.name.en, profile.name.ar)}
                </span>
                <span className="glass-pill px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
                  Egypt
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-8">
            <p className="font-display text-2xl leading-[1.35] text-[var(--text)] sm:text-3xl">
              {t(profile.summary.en, profile.summary.ar)}
            </p>

            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                {t("Education", "التعليم")}
              </div>
              <div className="space-y-4">
                {edu.map((e) => (
                  <div key={e.school} className="glass-card noise-overlay p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-medium text-[var(--text)]">{e.school}</h3>
                      <span className="text-xs text-[var(--text-faint)]">{e.period}</span>
                    </div>
                    <div className="mt-1 text-sm font-medium text-[var(--text-soft)]">{e.degree}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">{e.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                {t("Get in touch", "للتواصل")}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03]"
                >
                  {t("Contact me", "تواصل معي")}
                </Link>
                <Link
                  to="/work"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:scale-[1.03]"
                >
                  {t("See my work", "شاهد أعمالي")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
