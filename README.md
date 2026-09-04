<div align="center">

# Wirya

### Digital Transformation & Technology Solutions

**Bilingual website for [Wirya](https://wirya.com)** — Arabic & English, dark & light, admin panel with GitHub sync.

[![CI](https://github.com/ammar0xff/Wirya-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/ammar0xff/Wirya-Website/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)

<br/>

![Wirya Screenshot](https://placehold.co/1200x600/111111/60A5FA?text=Wirya+Website)

</div>

---

## What is this?

Wirya is a full-stack bilingual website for a digital transformation company. It includes a public-facing site, a password-protected admin panel, and a content sync system that pushes admin edits back to this repository via GitHub.

**Key highlights:**

- **Arabic & English** — full RTL/LTR support, every page works in both languages
- **Admin Panel** — manage blog posts, services, FAQs, testimonials, SEO, and site settings
- **GitHub Sync** — admin edits rewrite source files and commit directly to `main`
- **Inline Content** — blog posts and services stored as data in code, no external database
- **WhatsApp Integration** — direct ordering through WhatsApp from any service page

---

## Quick Start

```bash
git clone https://github.com/ammar0xff/Wirya-Website.git
cd Wirya-Website
pnpm install
cp .env.example .env.local
```

Generate an admin password:

```bash
pnpm generate-password YourSecurePassword123
```

Paste the hash into `.env.local`, then:

```bash
pnpm dev
```

Open **http://localhost:3000** for the site, **http://localhost:3000/admin** for the panel.

> Full setup guide: [SETUP.md](./SETUP.md)

---

## Tech Stack

| | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui + Radix primitives |
| State | React 19 + Context API |
| Markdown | react-markdown + remark plugins |
| Icons | Lucide React |
| Animation | Framer Motion |
| 3D | React Three Fiber + Drei |
| Charts | Recharts |

---

## Project Structure

```
Wirya-Website/
├── app/
│   ├── page.tsx                     Home
│   ├── about/                       About us
│   ├── story/                       Our story
│   ├── team/                        Team members
│   ├── services/                    Services + per-service pages
│   ├── blog/                        Blog list + individual posts
│   ├── case-studies/                Portfolio
│   ├── contact/                     Contact form
│   ├── faq/                         FAQ page
│   ├── admin/                       Password-protected admin panel
│   │   ├── blog/                    Manage blog posts
│   │   ├── services/                Manage services
│   │   ├── content/                 Edit pages, footer, site settings
│   │   ├── testimonials/            Manage testimonials
│   │   ├── faq/                     Manage FAQs
│   │   ├── newsletter/              Newsletter subscribers
│   │   ├── seo/                     SEO settings
│   │   └── settings/                Admin settings
│   └── api/                         Route handlers (auth, sync, newsletter)
├── components/
│   ├── ui/                          shadcn/ui components
│   ├── navigation/                  Header + mobile nav
│   ├── animations/                  Scroll + reveal animations
│   └── admin/                       Admin-specific components
├── lib/
│   ├── blog-loader.ts               Blog data + loaders
│   ├── blog.ts                      Blog categories
│   ├── services.ts                  Services data
│   ├── site-content.ts              Page content (about, contact, footer, SEO)
│   ├── content-manager.ts           Central content state manager
│   ├── sync-service.ts              Admin → GitHub sync engine
│   ├── github-sync.ts               GitHub API client
│   ├── i18n.ts                      Arabic/English translations
│   └── theme-provider.tsx           Theme + language context
├── hooks/
│   └── use-content-manager.ts       React hook for content state
├── content/posts/                   Markdown blog posts by category
├── public/                          Static assets
├── scripts/                         Utility scripts
└── styles/                          Global CSS
```

---

## How Content Works

There is **no database**. Content lives in source files:

1. **Blog posts** → `content/posts/{category}/*.md`
2. **Services** → `lib/services.ts`
3. **Pages** → `lib/site-content.ts`
4. **Blog types** → `lib/blog-loader.ts`

When you edit content in the admin panel, the sync engine (`lib/sync-service.ts`) rewrites these files and pushes to GitHub. The site rebuilds with the new content.

```
Admin Panel  →  SyncService  →  Rewrites lib/*.ts + content/posts/*.md  →  Git Push  →  Vercel Rebuild
```

> Detailed sync docs: [SYNC_SYSTEM.md](./SYNC_SYSTEM.md)

---

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on :3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm generate-password <pass>` | Hash a password for admin login |

---

## Environment Variables

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password |
| `NEXT_PUBLIC_SITE_URL` | Site URL (e.g. `https://wirya.com`) |
| `GITHUB_TOKEN` | GitHub PAT with repo access |
| `GITHUB_OWNER` | GitHub username or org |
| `GITHUB_REPO` | Repository name (Wirya-Website) |

See [SETUP.md](./SETUP.md) for full configuration.

---

## Deployment

The site deploys automatically to **Vercel** on every push to `main`.

1. Connect the repo to Vercel
2. Set environment variables in the Vercel dashboard
3. Push to `main` — Vercel builds and deploys automatically

CI runs **type-check + build** on every push and PR.

---

## License

© 2025 Wirya. All rights reserved.
