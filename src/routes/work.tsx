import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Abdelhamed Nada" },
      { name: "description", content: "Selected projects and case studies by Abdelhamed Nada — GitHub Bot SaaS, E-Commerce platforms, and more." },
      { property: "og:title", content: "Work — Abdelhamed Nada" },
      { property: "og:description", content: "Selected projects and case studies by Abdelhamed Nada." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { lang, t } = useI18n();
  return (
    <section className="relative px-4 pt-32 sm:px-6 sm:pt-40">
      <header className="mx-auto max-w-5xl">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("Selected work", "أعمال مختارة")}
        </div>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
          <SplitText text={t("Shipped with care.", "أُنجزت بعناية.")} />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
          {t(
            "A small set of projects I'm proud of — production-grade applications and open-source tools, each with a dedicated case study.",
            "مجموعة صغيرة من المشاريع التي أعتز بها — تطبيقات جاهزة للإنتاج وأدوات مفتوحة المصدر، لكل منها دراسة حالة مخصصة.",
          )}
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-6xl space-y-6 pb-20">
        {profile.projects.map((p, i) => {
          const title = lang === "ar" ? p.title.ar : p.title.en;
          const tag = lang === "ar" ? p.tagline.ar : p.tagline.en;
          const role = lang === "ar" ? p.role.ar : p.role.en;
          return (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="glass-card noise-overlay group block overflow-hidden p-2 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="grid gap-5 md:grid-cols-[1.1fr_1.4fr]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-soft)] md:aspect-auto">
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center aurora-mesh">
                        <span className="glass-pill px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
                          {t("Case study", "دراسة حالة")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      <span>{p.period}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
                      <span>{role}</span>
                      {p.live && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
                          <span className="inline-flex items-center gap-1"><ExternalLink size={10} /> Live</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-display text-3xl font-medium leading-tight text-[var(--text)] sm:text-4xl">
                      {title}
                    </h2>
                    <p className="text-base leading-relaxed text-[var(--text-soft)]">{tag}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="glass-pill px-2.5 py-1 text-[10px] text-[var(--text-soft)]">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)]">
                      {t("Read case study", "اقرأ دراسة الحالة")} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
