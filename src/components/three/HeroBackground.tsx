'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Live particle-constellation eye — the hero centrepiece (and graceful
// fallback shown until a hero video is added).
const ParticleEye = dynamic(() => import('@/components/three/ParticleEye'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse-ring rounded-full bg-retina-cyan/20" />
    </div>
  ),
});

/**
 * MotionSites-style full-bleed hero background — responsive video.
 *
 * Drop your clips in /public/videos/ :
 *   Desktop (16:9)  → hero.webm  (preferred) / hero.mp4
 *   Mobile  (9:16)  → hero-mobile.webm / hero-mobile.mp4   (optional)
 *   Poster          → hero-poster.svg (a placeholder ships here)
 *
 * Phones load the vertical clip, desktops the landscape one. If the
 * device-specific file is missing it falls back to the landscape clip,
 * and if no video plays at all it gracefully shows the live 3D eye — so
 * the hero is never empty or broken.
 */
export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const sync = () => {
      setReduced(motionMq.matches);
      setIsMobile(mobileMq.matches);
    };
    sync();
    motionMq.addEventListener('change', sync);
    mobileMq.addEventListener('change', sync);
    return () => {
      motionMq.removeEventListener('change', sync);
      mobileMq.removeEventListener('change', sync);
    };
  }, []);

  // Reload + reset when the source set changes (desktop ⇄ mobile).
  useEffect(() => {
    setVideoReady(false);
    videoRef.current?.load();
  }, [isMobile]);

  // Mobile tries the vertical clip first, then falls back to the landscape one.
  const sources = isMobile
    ? [
        { src: '/videos/hero-mobile.webm', type: 'video/webm' },
        { src: '/videos/hero-mobile.mp4', type: 'video/mp4' },
        { src: '/videos/hero.webm', type: 'video/webm' },
        { src: '/videos/hero.mp4', type: 'video/mp4' },
      ]
    : [
        { src: '/videos/hero.webm', type: 'video/webm' },
        { src: '/videos/hero.mp4', type: 'video/mp4' },
      ];

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden">
      {/* Base gradient — always dark so text stays legible in both themes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#0b2a52_0%,#061426_45%,#04101f_100%)]" />

      {/* Looping hero video (fades in only once it can actually play) */}
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.svg"
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
        aria-hidden
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Fallback: live 3D eye while no video is available */}
      {!videoReady && <ParticleEye className="absolute inset-0" />}

      {/* Legibility overlays over whatever is behind */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_45%,rgba(4,16,31,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-medical-deepnavy via-medical-deepnavy/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-medical-deepnavy/70 to-transparent" />
    </div>
  );
}
