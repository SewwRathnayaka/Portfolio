import type { Project } from "@/types/project";

const img = (name: string) => `/assets/images/${name}`;

export const PROJECTS_DATA: Project[] = [
  {
    id: "cosmocheck",
    title: "CosmoCheck – AI cosmetic ingredient scanner",
    category: "Full-Stack Web",
    description:
      "Web app that analyzes cosmetic ingredient lists from a photo, upload, or pasted text. Uses AI for extraction and analysis with a clear breakdown: safety score, highlights, warnings, and precautions.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI / OCR", "LLM APIs"],
    image: img("project-cosmocheck.webp"),
    link: "https://cosmocheck.netlify.app",
    sortOrder: 0,
    isFeatured: true,
    createdAt: "2026-03-01T12:00:00.000Z",
  },
  {
    id: "doro",
    title: "Doro – Gamified Pomodoro (Desktop)",
    category: "Desktop App",
    description:
      "Windows desktop Pomodoro app (React, TypeScript, Electron) that gamifies focus sessions with a growing virtual bouquet. Offline-first with IndexedDB, Zustand for state, motivational audio, progress tracking, and shareable bouquet snapshots. Migrated from Expo prototyping to Vite + Electron for packaging.",
    tech: ["React", "TypeScript", "Electron", "Vite", "Zustand", "IndexedDB"],
    image: img("project-doro.webp"),
    link: "https://github.com/SewwRathnayaka/DORO/releases/tag/v1.0.0_Doro_Public_Release",
    sortOrder: 1,
    isFeatured: true,
    createdAt: "2026-02-15T12:00:00.000Z",
  },
  {
    id: "skill-matching",
    title: "Role-Based Skill & Project Matching System",
    category: "Full-Stack Web",
    description:
      "Workforce tool for consultancies: admins manage people and skills, project managers define project needs, and a matching engine suggests candidates by skill fit and availability. Staff update profiles, availability, and see training suggestions for gaps.",
    tech: ["React", "Vite", "React Router", "Node.js", "Express", "MySQL", "JWT", "bcrypt"],
    image: img("project-skill-matching.webp"),
    link: "https://github.com/SewwRathnayaka/Skill-Project-Matching-System",
    sortOrder: 2,
    isFeatured: true,
    createdAt: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "fixfinder",
    title: "Handyman Service Application – FIXFINDER",
    category: "Full-Stack Web",
    description:
      "Service marketplace with role-based client and provider flows: discovery through booking, payment, and reviews. Real-time chat (Socket.io), Twilio voice, Stripe Connect with payouts, Google Maps–based matching and filters, multilingual responsive UI. Deployed on Netlify and Render.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Clerk",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Stripe",
      "Twilio",
    ],
    image: img("project-fixfinder.webp"),
    link: "https://fix-frontend.netlify.app",
    sortOrder: 3,
    isFeatured: true,
    createdAt: "2025-12-01T12:00:00.000Z",
  },
  {
    id: "mebius",
    title: "E-Commerce Storefront (MERN) – MEBIUS",
    category: "Full-Stack Web",
    description:
      "Production-oriented MERN e-commerce platform (STEM Link Full-Stack certification): responsive React storefront, secure Express API, MongoDB with solid schema and indexing. Product filtering, Clerk auth, Stripe checkout, cart, global error handling, images on Vercel Blob, live on Netlify.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Clerk", "Stripe", "Vercel Blob"],
    image: img("project-mebius.webp"),
    link: "https://fed-storefront-frontend-sewwandi.netlify.app",
    sortOrder: 4,
    isFeatured: true,
    createdAt: "2025-08-01T12:00:00.000Z",
  },
];
