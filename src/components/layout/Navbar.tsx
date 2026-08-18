'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clinic } from '@/lib/content';
import ThemeToggle from '@/components/ui/ThemeToggle';

const links = [
  { label: 'Journey', href: '#journey' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Specialist', href: '#specialist' },
  { label: 'Experience', href: '#simulator' },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  // At the top the bar floats over the always-dark hero → force light text.
  const onHero = !scrolled;
  const textMuted = onHero ? 'text-white/70 hover:text-white' : 'text-fg/70 hover:text-fg';
  const brandText = onHero ? 'text-white' : 'text-fg';
  const barLine = onHero ? 'bg-white' : 'bg-fg';
  const iconBorder = onHero ? 'border-white/20 text-white' : 'border-fg/20 text-fg';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div className={`transition-[padding] duration-300 ease-out-strong ${scrolled ? 'py-3' : 'py-5'}`}>
        <div
          className={`container-p flex items-center justify-between rounded-full transition-[max-width,padding,background-color,border-color,box-shadow] duration-300 ease-out-strong ${
            scrolled ? 'glass-strong mx-auto max-w-[1180px] px-6 py-2.5' : ''
          }`}
        >
          <button onClick={() => go('#top')} className="flex items-center gap-3" aria-label="Home">
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-retina-cyan to-retina-purple opacity-80 blur-[2px]" />
              <span className="absolute inset-[3px] rounded-full bg-medical-deepnavy" />
              <span className="relative h-2 w-2 rounded-full bg-retina-cyan shadow-[0_0_10px_rgba(56,225,255,0.9)]" />
            </span>
            <span className={`font-display text-[1.05rem] font-medium tracking-tight transition-colors ${brandText}`}>
              {clinic.name}
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${textMuted}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle
              className={onHero ? 'border-white/20 !bg-white/[0.06] text-white' : ''}
            />
            <button
              onClick={() => go('#book')}
              className="hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-page transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${iconBorder}`}
              aria-label="Menu"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-0.5 w-full transition-transform ${barLine} ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-full transition-transform ${barLine} ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-p lg:hidden"
          >
            <div className="glass-strong mt-2 rounded-3xl p-4">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-fg/80 hover:bg-fg/5"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go('#book')}
                className="mt-2 block w-full rounded-2xl bg-fg px-4 py-3 text-center font-medium text-page"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
