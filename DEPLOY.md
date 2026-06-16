# Deployment Guide

This project ships **deploy-ready** for both Vercel and Cloudflare. Pick one.

---

## Option A — Vercel (recommended, zero-config)

### 1. Push to GitHub

```bash
# git is already initialised in this ZIP. Just add your remote:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

### 2. Import on Vercel

1. Go to **https://vercel.com/new**
2. Select your repository → **Import**
3. Vercel auto-detects the `vercel.json` config. Leave all fields default.
4. Click **Deploy**.

That's it. The first build takes ~90 seconds.

### 3. Add an environment variable (optional but recommended)

In **Project Settings → Environment Variables** add:

| Name | Value | Why |
|---|---|---|
| `GITHUB_TOKEN` | a fine-grained read-only PAT | Raises GitHub API limit from 60/h → 5000/h |

Generate the token at https://github.com/settings/tokens?type=beta with **public_repo** read scope only.

### 4. Custom domain

In **Project Settings → Domains**, add your domain and follow Vercel's DNS instructions.

---

## Option B — Cloudflare Pages

```bash
bun install
bun run build
npx wrangler pages deploy .output/public --project-name=abdelhamed-nada
```

For continuous deployment, connect your GitHub repo at https://dash.cloudflare.com → Pages → Connect to Git.

Build settings:
- **Build command**: `bun run build`
- **Output directory**: `.output/public`
- **Node version**: `20`

---

## Local Development

```bash
bun install
bun run dev
# → http://localhost:5173
```

---

## Troubleshooting

**"Module not found" during build**
Run `bun install` (or `npm install`) — `node_modules` is not included in this ZIP.

**Hero 3D scene blank**
Some browsers disable WebGL on low-end devices. The hero gracefully falls back to the static aurora gradient.

**GitHub metrics show "—"**
The unauthenticated GitHub API allows 60 requests/h per IP. Add `GITHUB_TOKEN`.

**Build fails with "vite: command not found"**
Make sure dependencies installed. Try `rm -rf node_modules && bun install`.
