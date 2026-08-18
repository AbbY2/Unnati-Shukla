'use client';

import { useRef, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  strength?: number;
  target?: string;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.35,
  target,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} group ${className}`;
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-fg/15 transition-transform duration-500 ease-out group-hover:translate-y-0" />
    </>
  );

  const commonProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    className: cls,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} onClick={onClick} {...commonProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...commonProps}>
      {inner}
    </motion.button>
  );
}
