import { motion } from "framer-motion";
import { Reveal } from "@/components/glass/motion-primitives";
import { useI18n } from "@/lib/i18n/context";

const PRINCIPLES = [
  {
    en: { kicker: "Performance", title: "Built for speed.", body: "Every byte and every render path is intentional. No bloat, no jank." },
    ar: { kicker: "الأداء", title: "بُني للسرعة.", body: "كل بايت وكل دورة عرض مقصودة. لا حشو، لا تأخير." },
  },
  {
    en: { kicker: "Clarity", title: "Designed to be understood.", body: "Information hierarchy first. Visual polish second. Never the other way around." },
    ar: { kicker: "الوضوح", title: "صُمم ليُفهم.", body: "هرمية المعلومات أولاً. التلميع البصري ثانياً. ليس العكس أبداً." },
  },
  {
    en: { kicker: "Craft", title: "Pixel-grade execution.", body: "Spacing, typography, motion — engineered with the same rigor as the code." },
    ar: { kicker: "الحرفية", title: "تنفيذ بمستوى البكسل.", body: "المسافات والطباعة والحركة — مهندسة بنفس صرامة الكود." },
  },
];

export function PrinciplesGrid() {
  const { lang } = useI18n();
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const content = lang === "ar" ? p.ar : p.en;
            return (
              <Reveal key={content.kicker} delay={i * 0.08}>
                <motion.div
                  className="glass-card noise-overlay group relative h-full overflow-hidden p-7"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent-1)]/0 via-transparent to-[var(--accent-3)]/0 opacity-0 transition-opacity duration-700 group-hover:from-[var(--accent-1)]/10 group-hover:to-[var(--accent-3)]/10 group-hover:opacity-100" />
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                    {content.kicker}
                  </div>
                  <h3 className="font-display text-2xl font-medium leading-tight text-[var(--text)]">
                    {content.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{content.body}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
