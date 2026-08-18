'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { journeySteps } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const stepIcons = [
  'M12 3a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0', // consultation (person)
  'M4 12a8 8 0 0116 0M12 12v.01M8 12h.01M16 12h.01', // imaging
  'M12 3v18M5 8l7-5 7 5', // diagnosis
  'M12 21s-7-4.35-7-10a4 4 0 018-1 4 4 0 018 1c0 5.65-7 10-7 10z', // treatment (care)
  'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z', // recovery (eye)
];

function Icon({ i, className = '' }: { i: number; className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={stepIcons[i]} />
    </svg>
  );
}

export default function PatientJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  // Gently auto-advance the highlight once the section is in view.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % journeySteps.length);
    }, 2600);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="relative overflow-hidden bg-alt py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(14,77,146,0.16),transparent_55%)]" />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              From first visit to
              <br />
              <span className="text-gradient italic">restored vision.</span>
            </>
          }
          subtitle="A calm, considered path — five thoughtful steps designed entirely around you."
        />

        {/* ── Desktop horizontal timeline ── */}
        <div ref={ref} className="mt-20 hidden lg:block">
          <div className="relative">
            {/* base rail */}
            <div className="absolute inset-x-0 top-8 h-px bg-fg/12" />
            {/* animated progress rail */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-retina-cyan via-retina-cyan to-retina-emerald"
            />

            <div className="grid grid-cols-5 gap-6">
              {journeySteps.map((s, i) => {
                const on = active === i;
                return (
                  <Reveal key={s.n} delay={0.15 + i * 0.12}>
                    <div
                      onMouseEnter={() => {
                        paused.current = true;
                        setActive(i);
                      }}
                      onMouseLeave={() => (paused.current = false)}
                      className="group flex cursor-default flex-col items-center px-1 text-center"
                    >
                      {/* node */}
                      <div className="relative z-10 mb-6">
                        <motion.span
                          animate={{ scale: on ? 1.08 : 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-500 ${
                            on ? 'glass-strong text-accent' : 'glass text-fg/70'
                          }`}
                        >
                          {on && (
                            <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_36px_-4px_rgba(56,225,255,0.6)]" />
                          )}
                          <Icon i={i} />
                        </motion.span>
                        <span
                          className={`absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] font-semibold transition-colors duration-500 ${
                            on ? 'bg-retina-cyan text-medical-navy' : 'bg-fg/15 text-fg/60'
                          }`}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-normal text-fg">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg/70">{s.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile vertical timeline ── */}
        <div className="mt-14 lg:hidden">
          <div className="relative border-l border-fg/12 pl-8">
            {journeySteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-xl glass-strong text-accent">
                    <Icon i={i} className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent/80">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-light text-fg">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-fg/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
