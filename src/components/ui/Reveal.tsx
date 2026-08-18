'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

// Fade + rise reveal on scroll into view.
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word cinematic text reveal.
export function RevealText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
