import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, GitFork, Github, Star, Users } from "lucide-react";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { getGitHubData } from "@/lib/api/github.functions";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub — Abdelhamed Nada" },
      { name: "description", content: "Live GitHub activity, repositories, and contribution data for @abbn7." },
      { property: "og:title", content: "GitHub — Abdelhamed Nada" },
      { property: "og:description", content: "Live GitHub activity, repositories, and contribution data for @abbn7." },
      { property: "og:url", content: "/github" },
    ],
    links: [{ rel: "canonical", href: "/github" }],
  }),
  component: GitHubPage,
});

function GitHubPage() {
  const { t } = useI18n();
  const fetchFn = useServerFn(getGitHubData);
  const { data, isLoading } = useQuery({
    queryKey: ["github-data"],
    queryFn: () => fetchFn(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <header className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          <Github size={14} /> {t("Live from GitHub", "مباشر من GitHub")} · @{profile.contact.githubUser}
        </div>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1] sm:text-7xl">
          <SplitText text={t("Code in motion.", "كود متحرك.")} />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
          {t(
            "Real activity, pulled live from the GitHub API. No vanity numbers, no editorial spin.",
            "نشاط حقيقي مسحوب مباشرة من واجهة GitHub. بلا أرقام تجميلية أو تحرير مظهري.",
          )}
        </p>
      </header>

      {/* Top stats */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-4">
        <Stat
          icon={<Star size={14} />}
          label={t("Stars", "نجوم")}
          value={isLoading ? "—" : data?.ok ? String(data.totalStars) : "—"}
        />
        <Stat
          icon={<GitFork size={14} />}
          label={t("Public repos", "مستودعات عامة")}
          value={isLoading ? "—" : data?.ok && data.profile ? String(data.profile.public_repos) : "—"}
        />
        <Stat
          icon={<Users size={14} />}
          label={t("Followers", "متابعون")}
          value={isLoading ? "—" : data?.ok && data.profile ? String(data.profile.followers) : "—"}
        />
        <Stat
          icon={<Github size={14} />}
          label={t("Following", "يتابع")}
          value={isLoading ? "—" : data?.ok && data.profile ? String(data.profile.following) : "—"}
        />
      </div>

      {/* Languages */}
      {data?.ok && data.topLanguages.length > 0 && (
        <Reveal>
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
              {t("Top languages", "أكثر اللغات")}
            </div>
            <div className="glass-card noise-overlay flex flex-wrap items-center gap-2 p-4">
              {data.topLanguages.map((l) => (
                <span key={l.name} className="glass-pill px-3 py-1 text-xs text-[var(--text-soft)]">
                  <span className="font-medium text-[var(--text)]">{l.name}</span>
                  <span className="ms-1.5 text-[var(--text-faint)]">{l.count}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Repos */}
      <div className="mx-auto mt-12 max-w-6xl">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("Repositories", "المستودعات")}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card h-44 animate-pulse p-5" />
            ))}
          {!isLoading && data?.ok &&
            data.repos.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.04}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener"
                  className="glass-card noise-overlay group block h-full p-5 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent-1)]">
                      {r.name}
                    </h3>
                    <ExternalLink size={12} className="mt-1 text-[var(--text-faint)]" />
                  </div>
                  {r.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-soft)]">
                      {r.description}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-faint)]">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-1)]" /> {r.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} /> {r.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={11} /> {r.forks_count}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          {!isLoading && (!data?.ok || data.repos.length === 0) && (
            <div className="glass-card col-span-full p-8 text-center text-sm text-[var(--text-soft)]">
              {t(
                "Live data unavailable right now. Visit GitHub directly for the latest activity.",
                "البيانات المباشرة غير متاحة حالياً. زر GitHub مباشرة لآخر النشاطات.",
              )}
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener"
                className="ms-2 underline"
              >
                @{profile.contact.githubUser}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card noise-overlay p-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
        {icon} {label}
      </div>
      <div className="mt-2 font-display text-3xl font-medium text-[var(--text)]">{value}</div>
    </div>
  );
}
