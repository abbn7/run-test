import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/glass/monogram";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const ROUTES = [
  { to: "/", en: "Home", ar: "الرئيسية" },
  { to: "/about", en: "About", ar: "نبذة" },
  { to: "/work", en: "Work", ar: "الأعمال" },
  { to: "/skills", en: "Skills", ar: "المهارات" },
  { to: "/github", en: "GitHub", ar: "GitHub" },
  { to: "/contact", en: "Contact", ar: "تواصل" },
] as const;

export function Nav() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 transition-all sm:top-4 sm:px-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full px-2 py-2 transition-all duration-500 sm:px-3",
            scrolled ? "glass-strong" : "glass",
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-[var(--surface-soft)]"
            aria-label={t("Home", "الرئيسية")}
          >
            <Monogram size={28} />
            <span className="hidden text-sm font-medium tracking-tight text-[var(--text)] sm:inline">
              {t("Abdelhamed Nada", "عبد الحميد ندى")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {ROUTES.map((r) => {
              const active =
                r.to === "/" ? pathname === "/" : pathname === r.to || pathname.startsWith(r.to + "/");
              return (
                <Link
                  key={r.to}
                  to={r.to}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "text-[var(--text)]" : "text-[var(--text-soft)] hover:text-[var(--text)]",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--surface-strong)] shadow-[0_1px_0_0_var(--glass-highlight)_inset]"
                    />
                  )}
                  {t(r.en, r.ar)}
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleLang}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
              aria-label={t("Switch language", "تبديل اللغة")}
            >
              <span className="text-[11px] font-semibold tracking-wide">{lang === "en" ? "ع" : "EN"}</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
              aria-label={t("Toggle theme", "تبديل المظهر")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link
              to="/contact"
              className="hidden rounded-full bg-[var(--text)] px-4 py-2 text-[13px] font-medium text-[var(--bg)] transition-all hover:scale-[1.03] active:scale-[0.97] sm:inline-flex"
            >
              {t("Let's talk", "تواصل")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--text)] transition-colors hover:bg-[var(--surface-soft)] md:hidden"
              aria-label={t("Menu", "القائمة")}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[var(--bg)]/60 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute inset-x-3 top-20 flex flex-col gap-1 rounded-3xl p-3"
            >
              {ROUTES.map((r, i) => (
                <motion.div
                  key={r.to}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={r.to}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-soft)]"
                  >
                    {t(r.en, r.ar)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
