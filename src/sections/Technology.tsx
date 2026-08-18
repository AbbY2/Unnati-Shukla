'use client';

import { technology } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const icons: Record<string, React.ReactNode> = {
  oct: (
    <g>
      <rect x="6" y="20" width="36" height="8" rx="2" />
      <path d="M6 34h36M6 40h24" />
    </g>
  ),
  fundus: (
    <g>
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="4" />
    </g>
  ),
  laser: (
    <g>
      <path d="M24 6v20M24 26l-6 16M24 26l6 16" />
      <circle cx="24" cy="26" r="3" />
    </g>
  ),
  vitrectomy: (
    <g>
      <path d="M14 10l20 20M32 8l6 6-4 4-6-6z" />
      <circle cx="16" cy="34" r="4" />
    </g>
  ),
  widefield: (
    <g>
      <ellipse cx="24" cy="24" rx="18" ry="11" />
      <circle cx="24" cy="24" r="4" />
    </g>
  ),
  octa: (
    <g>
      <path d="M8 24h8l4-10 6 20 4-10h10" />
    </g>
  ),
};

export default function Technology() {
  return (
    <section id="technology" className="relative overflow-hidden bg-alt py-28 md:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(14,77,146,0.12),transparent)]" />
      {/* holographic grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,225,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(56,225,255,0.5) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)',
        }}
      />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              World-class imaging.
              <br />
              <span className="text-gradient italic">Diagnosis you can trust.</span>
            </>
          }
          subtitle="A holographic suite of precision instruments that see your retina in extraordinary detail — layer by layer, vessel by vessel."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technology.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.08}>
              <div
                data-cursor="hover"
                className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out-strong hover:-translate-y-1.5 hover:border-retina-cyan/40 hover:shadow-glow"
              >
                {/* scanning beam on hover */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-x-4 top-0 h-24 -translate-y-full bg-gradient-to-b from-retina-cyan/25 to-transparent blur-md transition-transform duration-[1600ms] ease-in-out group-hover:translate-y-[400%]" />
                </div>

                <div className="relative flex items-start justify-between">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="url(#techgrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <defs>
                      <linearGradient id="techgrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38E1FF" />
                        <stop offset="100%" stopColor="#7A5CFF" />
                      </linearGradient>
                    </defs>
                    {icons[t.id]}
                  </svg>
                  <span className="rounded-full border border-fg/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-fg/60">
                    {t.name}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-normal text-fg">{t.full}</h3>
                <p className="relative mt-2 text-sm text-fg/65">{t.blurb}</p>

                {/* corner brackets — holographic UI */}
                <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-retina-cyan/40" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-retina-cyan/40" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
