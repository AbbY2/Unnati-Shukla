'use client';

import { testimonials } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="mx-3 flex w-[85vw] max-w-[380px] shrink-0 flex-col rounded-3xl glass p-7">
      <div className="mb-4 flex gap-1 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21.2 7 14.2 2 9.3l7.1-1z" />
          </svg>
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-fg/75">“{t.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-retina-cyan/40 to-retina-purple/40 text-sm font-medium text-white">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-medium text-fg">{t.name}</span>
          <span className="block text-xs text-fg/65">{t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <div className="container-p">
        <SectionHeading
          title={
            <>
              Stories of vision,
              <br />
              <span className="text-gradient italic">restored.</span>
            </>
          }
        />
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_44s_linear_infinite] hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
