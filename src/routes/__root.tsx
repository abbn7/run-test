import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/hooks/use-theme";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { AuroraBackdrop } from "@/components/layout/aurora-bg";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { IntroCurtain } from "@/components/layout/intro";
import { Monogram } from "@/components/glass/monogram";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
      <div className="aurora-mesh absolute inset-0 -z-10 opacity-60" />
      <div className="glass-strong noise-overlay relative max-w-lg overflow-hidden rounded-[2rem] p-10 text-center">
        <div className="mx-auto mb-6 w-fit">
          <Monogram size={56} animated />
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          Error 404
        </div>
        <h1 className="mt-3 font-display text-5xl font-medium text-[var(--text)]">
          Lost in transit.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
          The page you're looking for isn't here. It may have moved, or the link could be wrong.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03]"
          >
            Back home
          </Link>
          <Link
            to="/work"
            className="glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:scale-[1.03]"
          >
            See work
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
      <div className="aurora-mesh absolute inset-0 -z-10 opacity-60" />
      <div className="glass-strong relative max-w-md rounded-[2rem] p-10 text-center">
        <Monogram size={48} className="mx-auto mb-4" />
        <h1 className="font-display text-3xl font-medium text-[var(--text)]">
          Something slipped.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
          We hit an unexpected error. Try again, or head home.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#f7f8fb" },
      { title: "Abdelhamed Nada — Full-Stack Developer & AI Tools Expert" },
      {
        name: "description",
        content:
          "Portfolio of Abdelhamed Nada — Full-Stack Developer specialized in modern Frontend, React, Next.js, and AI-augmented engineering. Available for remote work.",
      },
      { name: "author", content: "Abdelhamed Nada" },
      { property: "og:site_name", content: "Abdelhamed Nada" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Abdelhamed Nada — Full-Stack Developer & AI Tools Expert" },
      {
        property: "og:description",
        content:
          "Portfolio of Abdelhamed Nada — Full-Stack Developer specialized in modern Frontend, React, Next.js, and AI-augmented engineering.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Abdelhamed Nada — Full-Stack Developer & AI Tools Expert" },
      {
        name: "twitter:description",
        content: "Portfolio of Abdelhamed Nada — Full-Stack Developer & AI Tools Expert.",
      },
      { name: "description", content: "Liquid Glass Studio is a premium personal brand platform showcasing a developer's expertise with a glassmorphism design and advanced animations." },
      { property: "og:description", content: "Liquid Glass Studio is a premium personal brand platform showcasing a developer's expertise with a glassmorphism design and advanced animations." },
      { name: "twitter:description", content: "Liquid Glass Studio is a premium personal brand platform showcasing a developer's expertise with a glassmorphism design and advanced animations." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://api.github.com" },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem('an_theme');if(t==='dark')document.documentElement.classList.add('dark');var l=localStorage.getItem('an_lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <Shell />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Shell() {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="relative min-h-[100svh]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-full focus:bg-[var(--text)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--bg)]"
      >
        Skip to content
      </a>
      <AuroraBackdrop />
      <IntroCurtain />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
