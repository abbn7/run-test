# Abdelhamed Nada — Portfolio v2

> Full-Stack Developer · Frontend Specialist · AI Tools Expert  
> Liquid-glass design system · TanStack Start · React 19 · R3F · Framer Motion

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

---

## ✨ Features

- **Pearl Mist liquid-glass design system** — 4 glass tiers, OKLCH color tokens, light & dark modes
- **Cinematic 3D hero** — React Three Fiber orb with `MeshTransmissionMaterial`, mouse + scroll parallax, orbiting glass shards
- **Live GitHub metrics** — repos / followers / stars / stack via server function
- **Bilingual** EN / AR with full RTL support
- **TanStack Start SSR** — file-based routing, server functions, sitemap, SEO meta per route
- **Production-ready** for Vercel (Node) or Cloudflare (Workers)

---

## 🚀 Quick Start

```bash
bun install      # or: npm install
bun run dev      # http://localhost:5173
bun run build
```

Requires **Node 20+** and **Bun ≥ 1.1** (or npm/pnpm).

---

## 📦 Deploy

### Vercel (recommended)

```bash
# 1. Push to GitHub
git remote add origin https://github.com/<you>/portfolio.git
git push -u origin main

# 2. Import the repo at https://vercel.com/new
#    — Vercel auto-detects vercel.json, no further config needed.
```

Environment variables (all optional):
- `GITHUB_TOKEN` — raises GitHub API limit from 60/h → 5000/h.

### Cloudflare Pages

```bash
bun run build
npx wrangler pages deploy .output/public
```

See [`DEPLOY.md`](./DEPLOY.md) for the full guide.

---

## 🗂️ Project Structure

```
src/
├── routes/              # File-based routes (TanStack Router)
│   ├── __root.tsx       # Shell, head, providers
│   ├── index.tsx        # Home
│   ├── about.tsx
│   ├── work.tsx
│   ├── work.$slug.tsx   # Case studies
│   ├── skills.tsx
│   ├── github.tsx
│   ├── contact.tsx
│   └── sitemap[.]xml.ts
├── components/
│   ├── hero/            # 3D hero + scene + metrics
│   ├── glass/           # Glass primitives, magnetic CTA, motion
│   ├── layout/          # Nav, footer, aurora backdrop
│   └── sections/        # Home sections
├── lib/
│   ├── api/             # Server functions (GitHub, contact)
│   ├── data/profile.ts  # Single source of truth
│   └── i18n/
└── styles.css           # Design system tokens & glass utilities
```

---

## 🎨 Design Tokens

All colors are OKLCH and live in `src/styles.css`. Never hardcode colors in components — use semantic tokens:

| Token | Purpose |
|---|---|
| `--accent-iris` `#C7D2FE` | Primary indigo |
| `--accent-aqua` `#A5F3FC` | Secondary cyan |
| `--accent-blossom` `#FBCFE8` | Tertiary pink |
| `--accent-pearl` `#F8FAFC` | Base white |

Utility classes: `glass-l1` → `glass-l4`, `glass-rim`, `aurora-mesh`, `text-iris`, `text-holo`.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview the built app |
| `bun run lint` | ESLint |
| `bun run format` | Prettier |

---

## 📞 Contact

- ✉ dior53634@gmail.com
- 📱 [+20 109 614 4345 (WhatsApp)](https://wa.me/201096144345)
- 🐙 [github.com/abbn7](https://github.com/abbn7)

---

MIT © Abdelhamed Nada
