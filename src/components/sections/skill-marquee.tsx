import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

const ALL = Object.values(profile.skills).flat();

export function SkillMarquee() {
  const { t } = useI18n();
  return (
    <section className="relative py-16">
      <div className="mb-6 px-4 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
        {t("Daily toolkit", "أدواتي اليومية")}
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        <motion.div
          className="flex shrink-0 gap-3 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...ALL, ...ALL].map((s, i) => (
            <span
              key={i}
              className="glass-pill shrink-0 px-4 py-2 text-sm font-medium text-[var(--text-soft)]"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
