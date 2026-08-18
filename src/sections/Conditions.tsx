'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { conditions, type Condition } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import RetinaGlyph from '@/components/ui/RetinaGlyph';

export default function Conditions() {
  const [active, setActive] = useState<Condition | null>(null);
  const [treated, setTreated] = useState(false);

  const open = (c: Condition) => {
    setActive(c);
    setTreated(false);
  };

  return (
    <section id="conditions" className="relative bg-page py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,77,146,0.18),transparent_50%)]" />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              Retinal conditions,
              <br />
              <span className="text-gradient italic">explored & explained.</span>
            </>
          }
          subtitle="Tap any condition to see the affected retina, the warning signs, and how modern treatment restores what matters."
        />

        <div className="perspective mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {conditions.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.08}>
              <TiltCard className="h-full">
                <button
                  onClick={() => open(c)}
                  data-cursor="hover"
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl glass p-6 text-left transition-[transform,border-color,box-shadow] duration-300 ease-out-strong hover:-translate-y-1 hover:border-fg/25 hover:shadow-lift active:scale-[0.99]"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: c.accent }}
                  />
                  <div className="relative mb-4 h-24 w-24" style={{ transform: 'translateZ(40px)' }}>
                    <RetinaGlyph accent={c.accent} affected className="h-full w-full" />
                  </div>
                  <h3 className="relative font-display text-xl font-normal text-fg" style={{ transform: 'translateZ(30px)' }}>
                    {c.name}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm text-fg/65">{c.short}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-alt/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-3xl gap-8 overflow-hidden rounded-[2rem] glass-strong p-8 md:grid-cols-2 md:p-10"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-colors hover:bg-fg/10"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* Visual */}
              <div>
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-3xl"
                  style={{ background: `radial-gradient(circle, ${active.accent}22, transparent 70%)` }}
                >
                  <RetinaGlyph accent={active.accent} affected={!treated} treated={treated} className="h-full w-full p-4" />
                </div>
                <div className="mt-4 flex rounded-full glass p-1 text-sm">
                  <button
                    onClick={() => setTreated(false)}
                    className={`flex-1 rounded-full py-2 transition ${!treated ? 'bg-fg text-page' : 'text-fg/60'}`}
                  >
                    Before Treatment
                  </button>
                  <button
                    onClick={() => setTreated(true)}
                    className={`flex-1 rounded-full py-2 transition ${treated ? 'bg-fg text-page' : 'text-fg/60'}`}
                  >
                    After Treatment
                  </button>
                </div>
              </div>

              {/* Copy */}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: active.accent }}>
                  Retinal Condition
                </span>
                <h3 className="mt-2 font-display text-3xl font-light text-fg">{active.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fg/65">{active.description}</p>
                <div className="mt-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-fg/60">Warning Signs</h4>
                  <ul className="mt-3 space-y-2">
                    {active.signs.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-sm text-fg/75">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: active.accent }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#book"
                  onClick={() => setActive(null)}
                  className="btn-primary mt-auto self-start pt-3.5"
                >
                  Book a consultation
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
