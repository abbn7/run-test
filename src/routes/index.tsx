import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { SkillMarquee } from "@/components/sections/skill-marquee";
import { FeaturedWork } from "@/components/sections/featured-work";
import { PrinciplesGrid } from "@/components/sections/principles-grid";
import { ContactCta } from "@/components/sections/contact-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdelhamed Nada — Full-Stack Developer & AI Tools Expert" },
      {
        name: "description",
        content:
          "Full-Stack Developer specialized in modern Frontend, React, Next.js, TypeScript, and AI-augmented engineering. Building production-grade web experiences.",
      },
      { property: "og:title", content: "Abdelhamed Nada — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Full-Stack Developer specialized in modern Frontend, React, Next.js, TypeScript, and AI-augmented engineering.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdelhamed Nada",
          jobTitle: "Full-Stack Developer",
          description:
            "Full-Stack Developer specialized in modern Frontend, React, Next.js, and AI-augmented engineering.",
          email: "mailto:dior53634@gmail.com",
          sameAs: ["https://github.com/abbn7"],
          knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "PostgreSQL",
            "Python",
            "AI Tools",
            "Telegram Bot API",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <SkillMarquee />
      <AboutPreview />
      <FeaturedWork />
      <PrinciplesGrid />
      <ContactCta />
    </>
  );
}
