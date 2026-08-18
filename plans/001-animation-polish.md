# Animation Polish — Audit & Applied Fixes

Audited with the `improve-animations` skill (Emil Kowalski's rule catalog,
`.agents/skills/improve-animations/AUDIT.md`). Unlike the read-only skill
workflow, these findings were **implemented directly** per the user's request.

Stack: Next.js 14 · Framer Motion · GSAP/ScrollTrigger · Lenis · Tailwind.

## Findings & status

| # | Sev | Category | Location | Finding | Status |
|---|-----|----------|----------|---------|--------|
| 1 | HIGH | Performance | `components/ui/Section.tsx`, `sections/Conditions.tsx`, `sections/Technology.tsx` | `transition-all duration-500` on cards animates every prop off-GPU | ✅ scoped to `transition-[transform,border-color,box-shadow]`, 300ms |
| 2 | HIGH | Performance | `components/layout/Navbar.tsx` | `transition-all duration-500` on the scroll morph | ✅ scoped to explicit props, 300ms |
| 3 | MED | Easing/duration | cards + navbar | 500ms > 300ms UI budget; weak default easing | ✅ 300ms + `ease-out-strong` = `cubic-bezier(0.23,1,0.32,1)` |
| 4 | MED | Physicality | `sections/Booking.tsx` (success), `sections/AIRetinaScan.tsx` (heat) | `scale(0)` — appears "from nothing" | ✅ → `scale(0.5)` pop / `scale(0.6)` |
| 5 | LOW | Cohesion | `tailwind.config.ts` | No shared easing tokens | ✅ added `ease-out-strong`, `ease-in-out-strong`, `duration-250` |
| 6 | LOW | Feedback | `sections/Conditions.tsx` | Pressable cards had no press feedback | ✅ added `active:scale-[0.99]` |

## Deliberately left as-is (by design)

- Reveal / hero / heading entrances already use `[0.16,1,0.3,1]` (a strong ease-out) — consistent, keep.
- Testimonials marquee = `linear`; scroll progress = spring — both correct per the rules.
- Technology hover "scan beam" (1600ms) and MagneticButton shimmer (500ms) are decorative marketing sweeps — long duration acceptable.
- Reduced-motion is globally handled in `globals.css` + Lenis/GSAP guards.

## Verified

`transition: all` with a real duration: **0 offenders** site-wide. Build + typecheck pass.
