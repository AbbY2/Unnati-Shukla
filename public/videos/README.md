# Hero background video

Drop your looping hero clip here to switch the homepage hero into a
MotionSites-style full-bleed video background. Until then, the hero
gracefully shows the live interactive 3D eye instead — nothing breaks.

## Files the hero looks for

| File | Purpose | Required |
|------|---------|----------|
| `hero.webm` | Desktop 16:9 — preferred (smaller, VP9/AV1) | one of webm/mp4 |
| `hero.mp4`  | Desktop 16:9 — fallback (H.264, broad support) | one of webm/mp4 |
| `hero-mobile.webm` | Mobile 9:16 (vertical) — preferred | optional |
| `hero-mobile.mp4`  | Mobile 9:16 (vertical) — fallback | optional |
| `hero-poster.svg` (or `.jpg`) | First-frame still while the video loads | optional (an SVG placeholder ships here) |

The hero is **responsive**: phones (≤768px) load the vertical `hero-mobile.*`
clip, desktops load the landscape `hero.*` clip. If a mobile clip isn't
present, phones fall back to the landscape clip (cropped via `object-fit: cover`).
Render the mobile clip at **1080×1920 (9:16)**, same guidance as below.

The component fades the video in only once it can actually play, so a
missing/slow file never leaves a blank hero.

## Recommended encoding

- **Duration:** 8–15 s, seamless loop
- **Resolution:** 1920×1080 (or 2560×1440 for retina screens)
- **Aspect:** 16:9, `object-fit: cover` crops to fill
- **Bitrate / size:** keep MP4 under ~4–6 MB for fast load
- **Content:** dark, moody footage works best — a slow eye/iris macro,
  abstract retinal vessels, light rays, or a blue medical-tech loop.
  Keep the centre relatively calm so the headline stays readable.
- **Audio:** none (the tag is muted + autoplay + playsInline)

## Quick encode examples (ffmpeg)

```bash
# MP4 (H.264)
ffmpeg -i source.mov -vf "scale=1920:-2" -c:v libx264 -crf 23 -preset slow -an -movflags +faststart hero.mp4

# WebM (VP9)
ffmpeg -i source.mov -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 32 -b:v 0 -an hero.webm

# Poster (first frame)
ffmpeg -i hero.mp4 -frames:v 1 hero-poster.jpg
```

If you export a `.jpg` poster, update the `poster` path in
`src/components/three/HeroBackground.tsx` from `hero-poster.svg` to `hero-poster.jpg`.

## Where to get footage

Royalty-free options: your own clinic/OCT footage, or stock libraries
(Pexels, Coverr, Artgrid, Envato). Please confirm the licence allows
commercial website use before shipping.
