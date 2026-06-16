import { Link } from "@tanstack/react-router";
import { Github, Mail, MessageCircle } from "lucide-react";
import { Monogram } from "@/components/glass/monogram";
import { profile, whatsappUrl } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { lang, t } = useI18n();
  return (
    <footer className="relative mt-24 px-4 pb-10 sm:px-6">
      <div className="hairline-divider mx-auto max-w-6xl" />
      <div className="mx-auto mt-10 grid max-w-6xl gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <Monogram size={36} />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg">{t(profile.name.en, profile.name.ar)}</span>
              <span className="text-xs text-[var(--text-soft)]">{t(profile.roles.en[0], profile.roles.ar[0])}</span>
            </div>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-soft)]">
            {t(profile.tagline.en, profile.tagline.ar)}
          </p>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-faint)]">
            {t("Navigate", "التنقل")}
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { to: "/about", en: "About", ar: "نبذة" },
              { to: "/work", en: "Work", ar: "الأعمال" },
              { to: "/skills", en: "Skills", ar: "المهارات" },
              { to: "/github", en: "GitHub", ar: "GitHub" },
              { to: "/contact", en: "Contact", ar: "تواصل" },
              { to: "/dev", en: "Developer Mode", ar: "وضع المطور" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[var(--text-soft)] transition-colors hover:text-[var(--text)]">
                  {t(l.en, l.ar)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-faint)]">
            {t("Connect", "للتواصل")}
          </div>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2 text-[var(--text-soft)] transition-colors hover:text-[var(--text)]">
                <Mail size={14} /> {profile.contact.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(lang)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
              >
                <MessageCircle size={14} /> {profile.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
              >
                <Github size={14} /> @{profile.contact.githubUser}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 text-xs text-[var(--text-faint)] sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {t(profile.name.en, profile.name.ar)}. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</span>
        <span className="font-mono">{t("Built with TanStack Start · Deployed on Vercel", "مبني بـ TanStack Start · منشور على Vercel")}</span>
      </div>
    </footer>
  );
}
