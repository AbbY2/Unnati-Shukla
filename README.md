# Unnati Retina Clinic — Cinematic Website

A world-class, immersive website for **Unnati Retina Clinic**, Ahmedabad — featuring
Dr. Unnati Shukla Bharadwaj, Vitreoretinal Surgeon. Built as a cinematic scroll
experience: a shader-driven 3D eye, a journey through eye anatomy, an interactive
disease explorer, an AI retina-scan demo, a vision simulator, and a concierge
booking flow.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — design system & glassmorphism
- **React Three Fiber / Three.js** — the WebGL 3D eye with custom GLSL shaders
- **GSAP + ScrollTrigger** — pinned horizontal scroll (Patient Journey)
- **Lenis** — buttery smooth scrolling
- **Framer Motion** — reveals, micro-interactions, transitions

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

To create an optimised production build:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/            layout, metadata/SEO, JSON-LD, sitemap, globals.css
  components/
    layout/       Navbar, Footer
    providers/    SmoothScroll (Lenis + GSAP)
    three/        EyeScene + GLSL shaders (the hero 3D eye)
    ui/           Cursor, MagneticButton, Reveal, TiltCard, RetinaGlyph, …
  sections/       The 15 storytelling sections, in scroll order
  lib/
    content.ts    ← EDIT ALL COPY, LINKS & DATA HERE (single source of truth)
```

## ⚠️ Before you go live — fill in the real details

Everything editable lives in **`src/lib/content.ts`**. Replace the placeholders:

| Field | Where | Current value |
|-------|-------|---------------|
| Phone number | `clinic.phone` / `clinic.phoneHref` | `+91 00000 00000` |
| WhatsApp number | `clinic.whatsapp` | `wa.me/910000000000` |
| Email | `clinic.email` | placeholder |
| Full address | `clinic.addressLine` | "Ahmedabad, Gujarat" |
| Google Maps embed | `clinic.mapEmbed` | generic search embed |
| Stats (years, patients, surgeries…) | `stats` | illustrative |
| Testimonials | `testimonials` | sample copy |

Also:

- **Doctor portrait** → add `public/doctor.jpg` and wire it in
  `src/sections/Doctor.tsx` (see `public/README-assets.txt`).
- **Booking flow** (`src/sections/Booking.tsx`) is a front-end demo. Connect the
  final `submit()` to your booking system, email, or a WhatsApp deep link to go live.
- **Social handles** are already wired in `socials` (Instagram, Facebook,
  KiviHealth, EyeWiki, Google Maps).

## Notes on the medical content

Condition descriptions and warning signs are written to be reassuring and
educational, and the site clearly labels the AI-scan and vision-simulator as
illustrative demos, not diagnoses. Have a clinician review all medical copy in
`content.ts` before launch.

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll & heavy animation).
- Semantic headings, ARIA labels, keyboard-focusable controls.
- 3D canvas is lazy-loaded (`ssr: false`) and DPR-capped for 60 fps.
- SEO: metadata, Open Graph, `MedicalClinic` JSON-LD, sitemap & robots.
```
