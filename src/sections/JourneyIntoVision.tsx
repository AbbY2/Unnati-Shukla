'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const layers = [
  { name: 'Cornea', desc: 'The clear front window that first bends incoming light.', at: 0.06 },
  { name: 'Lens', desc: 'Focuses light with exquisite precision onto the retina.', at: 0.26 },
  { name: 'Vitreous', desc: 'The clear gel that gives the eye its form.', at: 0.46 },
  { name: 'Macula', desc: 'The centre of sharp, detailed central vision.', at: 0.64 },
  { name: 'Retina', desc: 'A living screen that turns light into sight.', at: 0.8 },
  { name: 'Optic Nerve', desc: 'The cable carrying vision to the brain.', at: 0.94 },
];

function Ring({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const base = index / total;
  // Each ring flies toward the camera as progress advances
  const scale = useTransform(progress, [Math.max(0, base - 0.25), base + 0.2], [0.2, 3.2]);
  const opacity = useTransform(
    progress,
    [Math.max(0, base - 0.25), base - 0.05, base + 0.1, base + 0.22],
    [0, 0.7, 0.7, 0]
  );
  const hue = 190 + index * 18;
  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="h-[46vmin] w-[46vmin] rounded-full border"
        style={{
          borderColor: `hsla(${hue}, 90%, 65%, 0.5)`,
          boxShadow: `0 0 80px hsla(${hue}, 90%, 60%, 0.25), inset 0 0 60px hsla(${hue}, 90%, 60%, 0.12)`,
        }}
      />
    </motion.div>
  );
}

export default function JourneyIntoVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const coreScale = useTransform(scrollYProgress, [0, 1], [0.6, 2.4]);
  const coreGlow = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 1, 0.7]);
  const tunnelRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section id="journey" ref={ref} className="force-dark relative h-[420vh] bg-medical-deepnavy">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a274d_0%,#050f1f_60%,#04101f_100%)]" />

        {/* travelling rings — the tunnel */}
        <motion.div style={{ rotate: tunnelRotate }} className="absolute inset-0">
          {layers.map((_, i) => (
            <Ring key={i} progress={scrollYProgress} index={i} total={layers.length} />
          ))}
        </motion.div>

        {/* glowing core (the retina we approach) */}
        <motion.div
          style={{ scale: coreScale, opacity: coreGlow }}
          className="pointer-events-none absolute h-[30vmin] w-[30vmin] rounded-full"
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.55),rgba(122,92,255,0.15)_55%,transparent_72%)] blur-md" />
        </motion.div>

        {/* section title */}
        <div className="absolute top-[14%] z-10 px-6 text-center">
          <h2 className="font-display text-3xl font-light tracking-tightest text-white md:text-5xl">
            Journey Into Your Vision
          </h2>
        </div>

        {/* Anatomy labels */}
        {layers.map((l, i) => (
          <Label key={l.name} layer={l} progress={scrollYProgress} index={i} />
        ))}

        {/* progress rail */}
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {layers.map((l, i) => (
            <Dot key={i} progress={scrollYProgress} at={l.at} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Label({
  layer,
  progress,
  index,
}: {
  layer: { name: string; desc: string; at: number };
  progress: MotionValue<number>;
  index: number;
}) {
  const opacity = useTransform(
    progress,
    [layer.at - 0.09, layer.at - 0.02, layer.at + 0.06, layer.at + 0.12],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [layer.at - 0.09, layer.at + 0.12], [30, -30]);
  const side = index % 2 === 0;
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-20 max-w-xs px-6 ${
        side ? 'left-[8%] text-left md:left-[14%]' : 'right-[8%] text-right md:right-[14%]'
      }`}
    >
      <span className="text-[0.7rem] uppercase tracking-[0.3em] text-accent/70">
        0{index + 1}
      </span>
      <h3 className="mt-1 font-display text-3xl font-light text-white md:text-4xl">
        {layer.name}
      </h3>
      <p className="mt-2 text-sm text-white/55">{layer.desc}</p>
    </motion.div>
  );
}

function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const scale = useTransform(progress, [at - 0.08, at, at + 0.08], [1, 1.8, 1]);
  const bg = useTransform(
    progress,
    [at - 0.08, at, at + 0.08],
    ['rgba(255,255,255,0.25)', 'rgba(56,225,255,1)', 'rgba(255,255,255,0.25)']
  );
  return (
    <motion.span
      style={{ scale, backgroundColor: bg }}
      className="h-1.5 w-1.5 rounded-full"
    />
  );
}
