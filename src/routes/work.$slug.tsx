import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { getProject, profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title.en} — Abdelhamed Nada` : "Case Study — Abdelhamed Nada";
    const description = p ? p.summary.en : "Project case study.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/work/${params.slug}` },
        { property: "og:type", content: "article" },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: p.title.en,
                description: p.summary.en,
                author: { "@type": "Person", name: "Abdelhamed Nada" },
                dateCreated: p.period,
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="px-4 pt-40 text-center">
      <h1 className="font-display text-4xl">Project not found.</h1>
      <Link to="/work" className="mt-6 inline-block underline">Back to work</Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const { lang, t } = useI18n();
  const title = lang === "ar" ? project.title.ar : project.title.en;
  const summary = lang === "ar" ? project.summary.ar : project.summary.en;
  const challenge = lang === "ar" ? project.challenge.ar : project.challenge.en;
  const role = lang === "ar" ? project.role.ar : project.role.en;
  const type = lang === "ar" ? project.type.ar : project.type.en;
  const process = (lang === "ar" ? project.process.ar : project.process.en) as readonly string[];
  const results = (lang === "ar" ? project.results.ar : project.results.en) as readonly { label: string; value: string }[];
  const stack = project.stack as readonly string[];

  const other = profile.projects.filter((p) => p.slug !== project.slug);

  return (
    <article className="relative px-4 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/work"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" /> {t("All work", "كل الأعمال")}
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
            <span>{project.period}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>{type}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>{role}</span>
          </div>
          <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
            <SplitText text={title} />
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-lg leading-relaxed text-[var(--text-soft)] sm:text-xl">
            {summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03]"
              >
                <ExternalLink size={14} /> {t("Visit live site", "زيارة الموقع")}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:scale-[1.03]"
              >
                <Github size={14} /> {t("Source", "الكود")}
              </a>
            )}
          </div>
        </header>

        {/* Cover */}
        {project.cover && (
          <Reveal>
            <div className="glass-card noise-overlay mb-16 overflow-hidden rounded-[2rem] p-2">
              <motion.img
                src={project.cover}
                alt={title}
                className="h-auto w-full rounded-[1.6rem] object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>
        )}

        {/* Quick facts */}
        <div className="mb-16 grid gap-3 sm:grid-cols-3">
          {results.map((r) => (
            <Reveal key={r.label}>
              <div className="glass-card noise-overlay p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-faint)]">
                  {r.label}
                </div>
                <div className="mt-2 font-display text-2xl font-medium">{r.value}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Body grid */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.7fr] md:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-medium">{t("Challenge", "التحدي")}</h2>
          </Reveal>
          <Reveal>
            <p className="text-base leading-relaxed text-[var(--text-soft)]">{challenge}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl font-medium">{t("Process", "المسار")}</h2>
          </Reveal>
          <Reveal>
            <ol className="space-y-4">
              {process.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="glass-pill grid h-7 w-7 shrink-0 place-items-center font-mono text-xs text-[var(--text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-[var(--text-soft)]">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl font-medium">{t("Stack", "التقنيات")}</h2>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="glass-pill px-3 py-1.5 text-sm text-[var(--text-soft)]">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Other projects */}
        <div className="mt-24">
          <div className="hairline-divider mb-10" />
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
            {t("Other work", "أعمال أخرى")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {other.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="glass-card noise-overlay group p-5 transition-all hover:-translate-y-1"
              >
                <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">{p.period}</div>
                <h3 className="mt-2 font-display text-xl font-medium">
                  {lang === "ar" ? p.title.ar : p.title.en}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  {lang === "ar" ? p.tagline.ar : p.tagline.en}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
