'use client';

import { useRef, useState, useCallback } from 'react';
import { visionModes } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';

// A photoreal-ish "scene" rendered in pure CSS so it works offline.
function Scene() {
  return (
    <div className="absolute inset-0">
      {/* sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8fc7ff] via-[#cfe6ff] to-[#f3f1e6]" />
      {/* sun */}
      <div className="absolute right-[18%] top-[16%] h-20 w-20 rounded-full bg-[#fff6d6] blur-[2px] shadow-[0_0_60px_20px_rgba(255,246,214,0.8)]" />
      {/* hills */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#6fae5a] to-[#9fd07a]" style={{ borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }} />
      <div className="absolute bottom-0 left-[-10%] right-[40%] h-2/5 bg-gradient-to-t from-[#4f8a45] to-[#77b262]" style={{ borderRadius: '0 50% 0 0 / 0 60% 0 0' }} />
      {/* a person / focal subject */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
        <div className="mx-auto h-10 w-10 rounded-full bg-[#e8c9a0]" />
        <div className="mt-1 h-16 w-14 rounded-t-3xl bg-[#c0504d]" />
      </div>
      {/* eye chart letters (acuity reference) */}
      <div className="absolute left-[10%] top-[24%] font-display text-3xl font-bold text-[#123]/70">E F P</div>
      <div className="absolute right-[10%] top-[40%] font-display text-xl font-bold text-[#123]/60">T O Z</div>
    </div>
  );
}

// Overlay that distorts the scene per condition.
function ConditionOverlay({ mode }: { mode: string }) {
  if (mode === 'normal') return null;
  if (mode === 'diabetic')
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />
        {[...Array(9)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-black/70"
            style={{
              width: `${8 + (i % 3) * 10}px`,
              height: `${8 + (i % 3) * 10}px`,
              left: `${(i * 37) % 90}%`,
              top: `${(i * 53) % 85}%`,
              filter: 'blur(3px)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent_30%,rgba(80,20,20,0.35))]" />
      </div>
    );
  if (mode === 'amd')
    return (
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a2f22] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 blur-xl" />
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(1px)' }} />
      </div>
    );
  if (mode === 'detachment')
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[0.5px]" />
      </div>
    );
  return null;
}

export default function VisionSimulator() {
  const [mode, setMode] = useState<string>('diabetic');
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  const activeMode = visionModes.find((m) => m.id === mode)!;

  return (
    <section id="simulator" className="relative bg-page py-28 md:py-36">
      <div className="container-p">
        <SectionHeading
          title={
            <>
              See through
              <br />
              <span className="text-gradient italic">their eyes.</span>
            </>
          }
          subtitle="Drag the slider to compare healthy vision with how different retinal conditions can change the world — and why early care matters."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          {/* mode selector */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {visionModes
              .filter((m) => m.id !== 'normal')
              .map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  data-cursor="hover"
                  className={`rounded-full px-5 py-2.5 text-sm transition ${
                    mode === m.id
                      ? 'bg-fg text-page'
                      : 'glass text-fg/70 hover:text-fg'
                  }`}
                >
                  {m.label}
                </button>
              ))}
          </div>

          {/* comparison */}
          <div
            ref={wrap}
            onMouseMove={(e) => dragging.current && update(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => update(e.touches[0].clientX)}
            className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl glass-strong"
          >
            {/* Right = normal (base) */}
            <Scene />
            <span className="absolute right-4 top-4 z-20 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
              Healthy Vision
            </span>

            {/* Left = condition (clipped) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Scene />
              <ConditionOverlay mode={mode} />
              <span className="absolute left-4 top-4 z-20 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
                {activeMode.label}
              </span>
            </div>

            {/* handle */}
            <div
              className="absolute inset-y-0 z-30 w-0.5 bg-white/90"
              style={{ left: `${pos}%`, boxShadow: '0 0 20px rgba(255,255,255,0.6)' }}
            >
              <button
                onMouseDown={() => (dragging.current = true)}
                onTouchStart={() => {}}
                aria-label="Drag to compare"
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 cursor-ew-resize items-center justify-center rounded-full bg-white text-medical-navy shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-fg/65">{activeMode.desc}</p>
        </div>
      </div>
    </section>
  );
}
