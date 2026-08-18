'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/Section';

type Phase = 'idle' | 'scanning' | 'mapping' | 'analyzing' | 'complete';

const phaseCopy: Record<Phase, string> = {
  idle: 'Ready to scan',
  scanning: 'Capturing retinal layers…',
  mapping: 'Mapping blood vessels…',
  analyzing: 'AI analysing 12 biomarkers…',
  complete: 'Analysis complete',
};

const markers = [
  { x: 62, y: 40, label: 'Macula · Healthy' },
  { x: 40, y: 55, label: 'Vessels · Normal' },
  { x: 55, y: 68, label: 'Fovea · Intact' },
];

export default function AIRetinaScan() {
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = () => {
    clear();
    setPhase('scanning');
    timers.current.push(setTimeout(() => setPhase('mapping'), 1600));
    timers.current.push(setTimeout(() => setPhase('analyzing'), 3200));
    timers.current.push(setTimeout(() => setPhase('complete'), 4800));
  };

  useEffect(() => () => clear(), []);

  const scanning = phase === 'scanning';
  const showVessels = phase === 'mapping' || phase === 'analyzing' || phase === 'complete';
  const showHeat = phase === 'analyzing' || phase === 'complete';
  const done = phase === 'complete';

  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,225,255,0.08),transparent_60%)]" />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              A retina scan from
              <br />
              <span className="text-gradient italic">the future of care.</span>
            </>
          }
          subtitle="Watch how advanced imaging and AI-assisted analysis turn light into a precise, reassuring diagnosis."
        />

        <div className="mx-auto mt-16 grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Scanner */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* frame */}
            <div className="absolute inset-0 rounded-[2rem] glass-strong" />
            <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-retina-cyan/60" />
            <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-retina-cyan/60" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-retina-cyan/60" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-retina-cyan/60" />

            <div className="absolute inset-6 overflow-hidden rounded-3xl bg-[radial-gradient(circle,#3a1616,#1a0a0a)]">
              {/* fundus base */}
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle cx="100" cy="100" r="96" fill="url(#scanfund)" />
                <defs>
                  <radialGradient id="scanfund" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#e8a86a" stopOpacity="0.6" />
                    <stop offset="60%" stopColor="#9c4a34" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3a1616" stopOpacity="0.2" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="11" fill="#ffe6b8" opacity="0.6" />

                {/* vessel mapping */}
                <g stroke="#7fe9ff" strokeWidth="1.4" fill="none" opacity="0.9">
                  {['M100,100 C78,72 55,58 28,50', 'M100,100 C126,74 156,62 178,54', 'M100,100 C84,132 66,158 44,176', 'M100,100 C122,140 144,162 168,174', 'M100,100 C72,104 44,108 20,112'].map((d, i) => (
                    <motion.path
                      key={i}
                      d={d}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={showVessels ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
                      transition={{ duration: 1.1, delay: i * 0.12 }}
                    />
                  ))}
                </g>

                {/* heat / segmentation */}
                {showHeat &&
                  markers.map((m, i) => (
                    <motion.circle
                      key={i}
                      cx={m.x * 2}
                      cy={m.y * 2}
                      r="14"
                      fill="#25E0A4"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 0.22, scale: 1 }}
                      transition={{ delay: i * 0.18 }}
                    />
                  ))}
              </svg>

              {/* scanning beam */}
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                    className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-retina-cyan/40 to-transparent"
                    style={{ boxShadow: '0 0 30px rgba(56,225,255,0.6)' }}
                  />
                )}
              </AnimatePresence>

              {/* OCT slice lines while scanning */}
              {scanning && (
                <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(56,225,255,0.5) 0 1px,transparent 1px 6px)' }} />
              )}

              {/* AI markers */}
              {done &&
                markers.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  >
                    <span className="block h-3 w-3 rounded-full border border-retina-emerald bg-retina-emerald/30" />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-alt/80 px-2 py-0.5 text-[0.55rem] text-accent-emerald">
                      {m.label}
                    </span>
                  </motion.div>
                ))}
            </div>

            {/* status bar */}
            <div className="absolute inset-x-6 bottom-8 flex items-center gap-3 rounded-full bg-alt/70 px-4 py-2 backdrop-blur">
              <span className={`h-2 w-2 rounded-full ${phase === 'idle' ? 'bg-fg/40' : done ? 'bg-retina-emerald' : 'animate-pulse bg-retina-cyan'}`} />
              <span className="text-xs text-fg/70">{phaseCopy[phase]}</span>
              {phase !== 'idle' && !done && (
                <span className="ml-auto font-mono text-[0.65rem] text-accent/70">AI · v4</span>
              )}
            </div>
          </div>

          {/* Controls / readout */}
          <div>
            <div className="space-y-3">
              {[
                { k: 'Retinal Thickness', v: done ? '271 µm · Normal' : '— —' },
                { k: 'Vessel Density', v: done ? '18.4% · Healthy' : '— —' },
                { k: 'Macular Integrity', v: done ? 'Intact' : '— —' },
                { k: 'Risk Score', v: done ? 'Low' : '— —' },
              ].map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={false}
                  animate={{ opacity: done ? 1 : 0.5 }}
                  transition={{ delay: done ? i * 0.1 : 0 }}
                  className="flex items-center justify-between rounded-2xl glass px-5 py-3.5"
                >
                  <span className="text-sm text-fg/70">{row.k}</span>
                  <span className={`font-mono text-sm ${done ? 'text-accent-emerald' : 'text-fg/30'}`}>{row.v}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={run}
              disabled={phase !== 'idle' && !done}
              data-cursor="hover"
              className="btn-primary mt-6 w-full justify-center pt-3.5 disabled:opacity-60"
            >
              {phase === 'idle' ? 'Run AI Retina Scan' : done ? 'Scan Again' : 'Scanning…'}
            </button>
            <p className="mt-3 text-center text-xs text-fg/60">
              Illustrative demo · not a medical diagnosis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
