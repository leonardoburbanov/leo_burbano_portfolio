# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mixed audience landing on Leonardo Burbano's personal site: hiring managers and recruiters sizing up a Senior AI Engineer, companies that want production LLM agents built, and community organizers (GDG, conferences) looking for a speaker. All of them arrive cold, often from LinkedIn, and decide within seconds whether he is credible.

## Product Purpose

Bilingual (EN/ES) personal site that proves Leonardo builds LLM agents that run in production at scale, and turns that proof into a LinkedIn connection. Success: a visitor understands what he builds, believes it, and connects on LinkedIn.

## Positioning

He has shipped multi-agent LLM sales systems that handle 1M+ requests/day for 1,500+ businesses in 20+ countries at Mercately (Techstars), with a 50% inference-cost cut. That production record, not side projects, is what sets him apart.

## Operating Context

Visitors come from LinkedIn posts, talks (DevFest, Build with AI), and GDG community links, on mobile and desktop. Content lives in `data/*.ts`, `messages/{en,es}.json` and MDX blog posts under `content/blog`. Deployed on Vercel.

## Capabilities and Constraints

- Next.js 15 (App Router) + Tailwind v4 + next-intl; locales `en` and `es`; light/dark theme toggle.
- Home sections: hero, case study (Mercately multi-agent architecture), experience, LinkedIn posts, projects, speaking, blog, contact. Separate routes: `/events`, `/blog`, `/projects/gemini-enterprise-sales-agent` (has its own GDG-themed presentation styling, out of scope for the main site look).
- The site no longer advertises job seeking ("Open to roles" removed 2026-10-23).

## Brand Commitments

- Name: Leonardo Burbano. Title: Senior AI Engineer & Tech Lead.
- Primary CTA: Connect on LinkedIn.
- Company logos (Mercately, Houston AI formerly Taxflow, Thoughtworks) and the profile photo `public/foto_white.png`.

## Evidence on Hand

- Metrics: 1M+ requests/day, 1,500+ businesses, 20+ countries, 50% lower inference cost (`data/case-study.ts`).
- Experience: Mercately (Techstars), Houston AI (formerly Taxflow, San Francisco), Thoughtworks.
- Projects: Navbe (live + GitHub), Gemini Enterprise Sales Agent workshop, small-LLM fine-tuning (coming soon).
- Talks: DevFest Quito 2026 (slides PDF), Build with AI Quito and Cuenca 2026, Ecuador Tech Week 2026.
- Two featured LinkedIn posts with images in `public/posts`.
- No testimonials, client quotes, or press exist; do not fabricate them.

## Product Principles

1. Production proof first: numbers and shipped systems over adjectives.
2. Every section earns the LinkedIn connection.
3. Bilingual parity: anything said in English is said in Spanish.
4. Show the system, not just the claim (architecture, real posts, real slides).
