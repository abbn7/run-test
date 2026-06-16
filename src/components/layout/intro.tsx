import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/glass/monogram";
import { useI18n } from "@/lib/i18n/context";

/**
 * 2-second cinematic intro curtain. Shows once per session.
 * Skippable on click / key / tap.
 */
export function IntroCurtain() {
  const [visible, setVisible] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("an_intro_seen");
    if (seen) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("an_intro_seen", "1");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const skip = () => {
      setVisible(false);
      sessionStorage.setItem("an_intro_seen", "1");
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Glass curtain */}
          <div className="absolute inset-0 bg-[var(--bg)]" />
          <div className="aurora-mesh absolute inset-0 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-3xl" />

          {/* Monogram bloom */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <Monogram size={120} animated withRing />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.4em] text-[var(--text-soft)]"
            >
              {lang === "ar" ? "عبد الحميد ندى" : "Abdelhamed Nada"}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
