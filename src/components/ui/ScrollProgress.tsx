'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9997] h-[3px] w-full origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-medical-blue via-retina-cyan to-retina-purple shadow-[0_0_18px_rgba(56,225,255,0.7)]" />
    </motion.div>
  );
}
