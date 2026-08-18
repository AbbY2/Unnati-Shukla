'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import HeroBackground from '@/components/three/HeroBackground';

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 1.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="force-dark isolate relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-medical-deepnavy"
    >
      {/* Full-bleed hero background: looping video (with live-eye fallback) */}
      <HeroBackground />

      {/* Headline block */}
      <div className="container-p relative z-10 mt-10 flex flex-col items-center text-center">
        <h1 className="max-w-6xl font-display text-[2.8rem] font-light leading-[0.98] tracking-tightest text-white sm:text-6xl md:text-7xl lg:text-[5.8rem]">
          <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">
            Every Vision Has A Story.
          </motion.span>
          <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
            <span className="text-gradient italic">We Help Protect It.</span>
          </motion.span>
        </h1>

        <motion.p
          custom={2}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-balance text-base text-white/60 md:text-lg"
        >
          Advanced Retina Care · Expert Vitreoretinal Surgery · Personalised Treatment
        </motion.p>

        <motion.div
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={() => scrollTo('#book')}>
            Book Appointment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollTo('#journey')}>
            Explore Retina Journey
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollTo('#journey')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        aria-label="Scroll down"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
          <motion.span
            animate={{ y: [3, 14, 3], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-1.5 h-1.5 w-1 rounded-full bg-retina-cyan"
          />
        </span>
      </motion.button>
    </section>
  );
}
