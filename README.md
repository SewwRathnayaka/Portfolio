# Sewwandi Rathnayaka - Portfolio

Personal portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. Projects are managed dynamically via Supabase with an admin interface.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS** + **shadcn/ui** (styling)
- **Framer Motion** (animations)
- **Supabase** (database + auth for admin)
- **EmailJS** (contact form)
- **React Query** (data fetching)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <YOUR_REPO_URL>
cd Portfolio
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_RECIPIENT_EMAIL` | Email to receive contact form submissions |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Admin Panel

Navigate to `/admin/projects` to manage portfolio projects (requires Supabase auth login).

## Deployment

Set all environment variables on your hosting platform (e.g. Render, Vercel, Netlify), then deploy with:

- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist`
