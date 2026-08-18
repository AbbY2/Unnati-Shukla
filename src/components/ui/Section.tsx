'use client';

import { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: {
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tightest text-fg md:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={`mt-5 text-base text-fg/70 md:text-lg ${align === 'center' ? 'mx-auto max-w-xl' : ''}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className = '',
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      data-cursor="hover"
      className={`group relative overflow-hidden rounded-3xl glass p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out-strong hover:-translate-y-1.5 hover:border-fg/25 hover:shadow-lift ${className}`}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-retina-cyan/10 via-transparent to-retina-purple/10" />
        </div>
      )}
      {children}
    </div>
  );
}
