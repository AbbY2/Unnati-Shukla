<div align="center">

# 👁️ Unnati Retina Clinic

### A cinematic, award‑style website for a leading retina speciality clinic in Ahmedabad

An immersive scroll experience built around a live, cursor‑reactive 3D eye — pairing
medical credibility with the motion and polish of a modern flagship site.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br/>

**Dr. Unnati Shukla Bharadwaj** · Vitreoretinal Surgeon
_MS Ophthalmology · DNB Ophthalmology · Fellowship in Vitreoretinal Surgery_

<!-- 🔗 Live demo: replace with your Vercel URL once deployed -->
<!-- 🖼️ Tip: drop a hero screenshot/GIF here for an instant "wow" in the repo -->

</div>

---

## ✨ Overview

A single‑page, cinematic storytelling website that takes a visitor on a journey
*through the human eye* — from a glowing particle‑constellation iris that follows
the cursor, down through the anatomy of vision, the conditions we treat, the
technology behind diagnosis, and a concierge path to booking an appointment.

It is designed to feel like **Apple × luxury healthcare**: minimal, confident
typography; glassmorphism and soft depth; smooth, purposeful motion; and a cool,
trustworthy medical‑blue / retina‑cyan palette — in both **light and dark mode**.

## 🌟 Experience highlights

| Section | What it does |
|---|---|
| **Hero** | A live WebGL **particle‑constellation eye** (≈5,400 points) that assembles on load and **tracks the cursor** across the viewport. Supports an optional looping **video background** (desktop 16:9 + mobile 9:16) with a graceful fallback to the 3D eye. |
| **Journey Into Your Vision** | A pinned, scroll‑driven travel through the eye — cornea → lens → vitreous → macula → retina → optic nerve. |
| **Why the Retina Matters** | Animated fundus vessels with travelling neural‑signal pulses. |
| **Conditions** | 3D‑tilt cards opening an interactive modal with affected‑area visualization and a before/after toggle. |
| **Technology** | Holographic cards for OCT, fundus, laser, vitrectomy, wide‑field and OCT‑A imaging. |
| **AI Retina Scan** | A staged, illustrative scanning sequence (beam → vessel mapping → AI heat‑maps → readout). |
| **Meet the Specialist** | Dr. Unnati Shukla Bharadwaj — animated signature, credential timeline, particle halo. |
| **Patient Journey** | A compact, auto‑advancing care‑path timeline (desktop horizontal, mobile vertical). |
| **Vision Simulator** | A draggable before/after slider comparing healthy vs. diabetic / AMD / detachment vision. |
| **Vision Timeline · Testimonials · Stats · Locations · Booking · Final CTA** | Early‑detection story, auto‑scrolling voices, count‑up stats, themed map, concierge multi‑step booking, and a glowing finale. |

Plus a custom glowing cursor, magnetic buttons, scroll progress, a floating
WhatsApp/call dock, and full SEO (metadata, Open Graph, `MedicalClinic` JSON‑LD,
sitemap & robots).

## 🛠️ Tech stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** — design system, glassmorphism, theme tokens
- **React Three Fiber / Three.js** — the particle eye with custom **GLSL shaders**
- **GSAP + ScrollTrigger** — scroll‑driven motion
- **Lenis** — buttery smooth scrolling
- **Framer Motion** — reveals, micro‑interactions, transitions
- **next‑themes** — dark / light mode
- **Be Vietnam Pro**, self‑hosted from **[Bunny Fonts](https://fonts.bunny.net)** (no Google Fonts)

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint the project |

## 📁 Project structure

```
src/
  app/            layout, SEO metadata, JSON-LD, sitemap, fonts, globals.css
  components/
    layout/       Navbar, Footer
    providers/    SmoothScroll (Lenis + GSAP), ThemeProvider
    three/        ParticleEye + HeroBackground + GLSL shaders
    ui/           CustomCursor, MagneticButton, Reveal, TiltCard, ThemeToggle, …
  sections/       The storytelling sections, in scroll order
  lib/
    content.ts    ← EDIT ALL COPY, LINKS & DATA HERE (single source of truth)
public/
  fonts/          Be Vietnam Pro (self-hosted .woff2)
  videos/         optional hero video (README inside with specs)
```

## 🎨 Theming & fonts

- **Light / dark mode** via `next-themes` with a navbar toggle; colours are driven
  by CSS variables (`--fg`, `--page`, `--accent`, …) so text stays readable in both.
- Cinematic sections (hero, final CTA, footer) stay dark in both modes by design.
- **Be Vietnam Pro** is self‑hosted from Bunny Fonts — swap or extend it in
  `src/app/fonts.ts` and `public/fonts/`.

## ✍️ Customising content

Nearly all copy, links and data live in one file — **`src/lib/content.ts`**:

```ts
clinic      // name, phone, WhatsApp, email, address, hours, map embed
doctor      // name, qualifications, expertise, timeline
conditions  // the retinal conditions + signs
technology  // imaging equipment
stats        // animated statistics
testimonials // patient voices  (sample copy — replace with real, consented quotes)
socials     // Instagram, Facebook, Google Maps, KiviHealth, EyeWiki
```

> The phone and WhatsApp numbers are set to the clinic line. Email, the Google
> Maps embed, stats and testimonials are still sample/placeholder — confirm them
> before launch.

## ✅ Before you go live

- [ ] Add the doctor's photo at **`public/doctor.jpg`** (≈800×1000, 4:5) — the
      specialist section loads it automatically (shows a placeholder until then).
- [ ] *(Optional)* Add a hero clip at **`public/videos/hero.mp4`** (+ `hero-mobile.mp4`)
      to switch the hero to a video background — see `public/videos/README.md`.
- [ ] Confirm email, Google Maps embed, stats and testimonials in `content.ts`.
- [ ] Connect the **Booking** flow (`src/sections/Booking.tsx`) to your real
      system / email / WhatsApp — it's a front‑end demo today.
- [ ] Have a clinician review all medical copy.

## ☁️ Deployment

Deployed on **[Vercel](https://vercel.com)** (zero‑config for Next.js) and connected
to this GitHub repo, so every push to `main` **auto‑deploys**.

```bash
git push origin main   # → triggers a Vercel production deploy
```

To deploy your own copy: push to GitHub, then at **vercel.com/new** import the
repository and click **Deploy** — no environment variables required.

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll & heavy animation).
- Semantic headings, ARIA labels, visible keyboard focus, 4.5:1 text contrast.
- The 3D canvas is lazy‑loaded (`ssr: false`) and DPR‑capped for 60 fps.
- SEO: metadata, Open Graph, `MedicalClinic` JSON‑LD, sitemap & robots.

## ⚕️ Medical disclaimer

Condition descriptions are educational, and the AI‑scan and vision‑simulator are
clearly labelled as **illustrative demos, not diagnoses**. Nothing here replaces
professional medical advice.

---

<div align="center">

Designed & built for **Unnati Retina Clinic**, Ahmedabad, Gujarat, India.

</div>
