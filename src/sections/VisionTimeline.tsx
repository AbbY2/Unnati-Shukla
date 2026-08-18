'use client';

import { timelineStages } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import RetinaGlyph from '@/components/ui/RetinaGlyph';

export default function VisionTimeline() {
  return (
    <section className="relative overflow-hidden bg-alt py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,224,164,0.1),transparent_50%)]" />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              Every day counts on
              <br />
              <span className="text-gradient italic">the path to sight.</span>
            </>
          }
          subtitle="From a healthy retina to long-term eye health — early detection changes the entire story."
        />
      </div>

      {/* horizontal rail */}
      <div className="no-scrollbar mt-14 overflow-x-auto pb-6">
        <div className="container-p flex min-w-max gap-5">
          {timelineStages.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="relative w-[74vw] max-w-[300px] sm:w-[300px]">
                {/* connector */}
                {i < timelineStages.length - 1 && (
                  <div className="absolute right-[-22px] top-[86px] hidden h-px w-[22px] bg-gradient-to-r from-retina-cyan/60 to-transparent sm:block" />
                )}
                <div className="h-full rounded-3xl glass p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-accent/60">STAGE {i + 1}</span>
                    <span className="h-10 w-10">
                      <RetinaGlyph
                        accent={i < 3 ? '#38E1FF' : '#25E0A4'}
                        treated={i >= 3}
                        affected={i > 0 && i < 3}
                        className="h-full w-full"
                      />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-fg">{s.title}</h3>
                  <p className="mt-3 text-sm text-fg/70">{s.text}</p>
                  <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-fg/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-retina-cyan to-retina-emerald"
                      style={{ width: `${((i + 1) / timelineStages.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="container-p mt-2 text-center text-xs text-fg/60 sm:text-left">
        ← Scroll horizontally to follow the journey →
      </p>
    </section>
  );
}
