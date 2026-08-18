'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal, RevealText } from '@/components/ui/Reveal';

// Procedurally-ish drawn retinal vessel paths (fundus-like branching)
const vessels = [
  'M300,300 C260,240 220,200 150,170 C110,150 80,130 40,120',
  'M300,300 C280,230 250,180 210,120 C190,90 180,60 170,30',
  'M300,300 C340,250 380,220 450,200 C500,185 540,170 570,150',
  'M300,300 C330,360 360,400 420,440 C460,465 500,485 540,500',
  'M300,300 C270,360 240,410 190,450 C150,480 110,500 70,520',
  'M300,300 C300,370 300,430 300,520',
  'M300,300 C250,300 200,300 120,310 C80,315 50,320 20,330',
];

export default function WhyRetina() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="relative overflow-hidden bg-alt py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(122,92,255,0.12),transparent_55%)]" />
      <div className="container-p relative grid items-center gap-16 lg:grid-cols-2">
        {/* Left — copy */}
        <div>
          <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tightest text-fg md:text-6xl">
            <RevealText text="The Retina Converts" />
            <br />
            <RevealText text="Light Into" className="text-gradient" delay={0.2} />{' '}
            <span className="text-gradient italic font-display">Life.</span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-md text-lg text-fg/60">
              A tissue thinner than a sheet of paper captures every photon and
              turns it into the images you live by. When the retina is
              protected, so is everything you love to see.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { k: '120M', v: 'Rod cells sensing light' },
              { k: '6M', v: 'Cones for colour' },
              { k: '0.2mm', v: 'Thin as a whisper' },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.4 + i * 0.1}>
                <div className="rounded-2xl glass p-4">
                  <div className="font-display text-2xl text-gradient-cyan">{s.k}</div>
                  <div className="mt-1 text-xs text-fg/65">{s.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — animated retina */}
        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(220,120,90,0.35),rgba(120,40,40,0.15)_60%,transparent_72%)]" />
          <svg viewBox="0 0 600 600" className="relative h-full w-full">
            <defs>
              <radialGradient id="fundus" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#e88b5a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7a2f2f" stopOpacity="0.1" />
              </radialGradient>
              <filter id="vglow">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="300" cy="300" r="290" fill="url(#fundus)" opacity="0.5" />

            {/* optic disc */}
            <circle cx="300" cy="300" r="34" fill="#ffe6b0" opacity="0.35" />
            <circle cx="300" cy="300" r="20" fill="#fff2d6" opacity="0.6" />

            {/* macula */}
            <circle cx="380" cy="320" r="46" fill="#b8452f" opacity="0.28" />
            <circle cx="380" cy="320" r="6" fill="#7a1f1f" opacity="0.6" />

            {/* vessels */}
            {vessels.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="#d24b3e"
                strokeWidth={i % 2 ? 3 : 4.2}
                strokeLinecap="round"
                filter="url(#vglow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
                transition={{ duration: 1.6, delay: 0.2 + i * 0.13, ease: 'easeInOut' }}
              />
            ))}

            {/* neural signal pulses along a vessel */}
            {inView &&
              vessels.slice(0, 4).map((d, i) => (
                <motion.circle key={`p${i}`} r="3.4" fill="#7fe9ff">
                  <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={d} />
                </motion.circle>
              ))}
          </svg>

          {/* labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
            className="absolute left-[38%] top-[46%] -translate-x-full"
          >
            <span className="rounded-full glass px-3 py-1 text-[0.65rem] uppercase tracking-widest text-fg/80">
              Optic Disc
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
            className="absolute left-[66%] top-[56%]"
          >
            <span className="rounded-full glass px-3 py-1 text-[0.65rem] uppercase tracking-widest text-fg/80">
              Macula
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
