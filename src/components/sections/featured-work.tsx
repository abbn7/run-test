import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export function FeaturedWork() {
  const { lang, t } = useI18n();
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                {t("Selected work", "أعمال مختارة")}
              </div>
              <h2 className="font-display text-4xl font-medium leading-[1] sm:text-5xl">
                {t("Things I've shipped.", "ما أنجزته من مشاريع.")}
              </h2>
            </div>
            <Link
              to="/work"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--text-soft)] transition-colors hover:text-[var(--text)] sm:inline-flex"
            >
              {t("All projects", "كل المشاريع")} <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {profile.projects.map((p, i) => {
            const title = lang === "ar" ? p.title.ar : p.title.en;
            const tag = lang === "ar" ? p.tagline.ar : p.tagline.en;
            const role = lang === "ar" ? p.role.ar : p.role.en;
            return (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group glass-card noise-overlay block h-full overflow-hidden p-2 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-soft)]">
                    {p.cover ? (
                      <motion.img
                        src={p.cover}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center aurora-mesh">
                        <div className="glass-pill px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
                          {t("Case study", "دراسة حالة")}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                      <span className="glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                        {p.period}
                      </span>
                      {p.live && (
                        <span className="glass-pill flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                          <ExternalLink size={10} /> Live
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-2 p-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      <span>{role}</span>
                    </div>
                    <h3 className="font-display text-2xl font-medium leading-tight text-[var(--text)]">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-soft)]">{tag}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="glass-pill px-2.5 py-1 text-[10px] text-[var(--text-soft)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
