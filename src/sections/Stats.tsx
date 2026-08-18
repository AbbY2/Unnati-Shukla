'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats } from '@/lib/content';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = n >= 1000 ? n.toLocaleString('en-IN') : n;
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-alt py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,225,255,0.14),transparent_55%)]" />
      <div className="container-p relative">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-light text-gradient-cyan md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mx-auto mt-3 max-w-[9rem] text-xs uppercase tracking-wider text-fg/65 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
