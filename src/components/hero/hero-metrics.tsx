import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGitHubData, type GitHubData } from "@/lib/api/github.functions";
import { useI18n } from "@/lib/i18n/context";

export function HeroMetrics() {
  const { t } = useI18n();
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    let active = true;
    getGitHubData()
      .then((d) => { if (active) setData(d); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const cells = [
    { label: t("Repos", "ريبو"),        value: data?.profile?.public_repos ?? "—" },
    { label: t("Followers", "متابعين"), value: data?.profile?.followers    ?? "—" },
    { label: t("Stars", "نجوم"),         value: data?.totalStars            ?? "—" },
    { label: t("Stack", "تقنيات"),       value: data?.topLanguages?.length  ?? "12+" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
    >
      {cells.map((c) => (
        <div key={c.label} className="glass-l1 glass-rim rounded-2xl px-4 py-3">
          <div className="font-display text-2xl font-semibold text-[var(--text)]">{c.value}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]">{c.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
