'use client';

import { motion } from 'framer-motion';
import { clinic } from '@/lib/content';
import MagneticButton from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/Reveal';

function scrollToBook() {
  const el = document.querySelector('#book');
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el?.scrollIntoView({ behavior: 'smooth' });
}

export default function FinalCTA() {
  return (
    <section className="force-dark relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-medical-deepnavy">
      {/* massive glowing retina */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.25),rgba(122,92,255,0.12)_40%,transparent_62%)]" />
        <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(56,225,255,0.15),transparent,rgba(122,92,255,0.15),transparent)] mask-fade-b" />
      </motion.div>

      {/* flowing particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-retina-cyan/70"
          style={{ left: `${(i * 41) % 100}%`, top: `${(i * 67) % 100}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="container-p relative z-10 text-center">
        <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tightest text-white md:text-6xl lg:text-7xl">
          <RevealText text="Protect Your Vision." className="block" />
          <span className="mt-2 block text-gradient italic">
            <RevealText text="Trust Retina Experts." delay={0.2} />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={scrollToBook}>Book Appointment</MagneticButton>
          <MagneticButton variant="ghost" href={clinic.phoneHref}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 011-2z" />
            </svg>
            Call Now
          </MagneticButton>
          <MagneticButton variant="ghost" href={clinic.whatsapp} target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.1.1.5-.1 1.2z" />
            </svg>
            WhatsApp
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
