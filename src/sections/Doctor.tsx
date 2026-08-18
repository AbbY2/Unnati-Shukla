'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { doctor } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';

export default function Doctor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="specialist" className="relative overflow-hidden bg-page py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(122,92,255,0.14),transparent_55%)]" />
      <div className="container-p relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait */}
        <div ref={ref} className="relative mx-auto w-full max-w-sm">
          {/* particle halo */}
          <div className="absolute inset-0 -m-8">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-retina-cyan/70"
                style={{
                  left: `${(50 + 46 * Math.cos((i / 18) * Math.PI * 2)).toFixed(3)}%`,
                  top: `${(50 + 46 * Math.sin((i / 18) * Math.PI * 2)).toFixed(3)}%`,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
                transition={{ duration: 3, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-strong"
          >
            {/* Portrait photo — falls back to a placeholder if /doctor.jpg is absent */}
            {imgFailed ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,225,255,0.25),transparent_60%)]" />
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-retina-cyan/30 to-retina-purple/30 font-display text-4xl text-white">
                      US
                    </div>
                    <p className="px-8 text-xs text-fg/60">
                      Add Dr. Unnati&apos;s portrait to
                      <br />
                      <code className="text-accent/70">/public/doctor.jpg</code>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/doctor.jpg"
                  alt={`${doctor.name}, ${doctor.role}`}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-medical-deepnavy/80 via-medical-deepnavy/20 to-transparent" />
              </>
            )}
            {/* signature */}
            <svg viewBox="0 0 220 60" className="absolute bottom-5 left-6 h-10 w-40 text-white/75">
              <motion.path
                d="M4,40 C20,10 30,50 44,30 C52,18 58,42 70,30 C84,16 90,46 104,28 C120,10 128,44 150,26 C168,12 190,40 216,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.6 }}
              />
            </svg>
          </motion.div>

          <div className="mt-5 flex flex-wrap gap-2">
            {doctor.quals.map((q) => (
              <span key={q} className="rounded-full glass px-3 py-1.5 text-xs text-fg/70">
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Bio + timeline */}
        <div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tightest text-fg md:text-5xl">
            {doctor.name}
          </h2>
          <p className="mt-3 text-lg text-gradient-cyan">{doctor.role}</p>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-fg/60">
              A dedicated vitreoretinal surgeon combining surgical precision with
              genuine warmth. From delicate retinal detachment surgery to
              screening the eyes of premature newborns, every patient receives
              care built on expertise, honesty and hope.
            </p>
          </Reveal>

          {/* Expertise */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-2">
            {doctor.expertise.map((e, i) => (
              <Reveal key={e} delay={i * 0.05}>
                <div className="flex items-center gap-3 text-sm text-fg/75">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-retina-cyan/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-retina-cyan" />
                  </span>
                  {e}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-10 border-l border-fg/10 pl-6">
            {doctor.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-retina-cyan bg-alt shadow-[0_0_12px_rgba(56,225,255,0.7)]" />
                  <div className="text-sm font-medium text-accent">{t.year} · {t.label}</div>
                  <div className="mt-0.5 text-sm text-fg/65">{t.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
