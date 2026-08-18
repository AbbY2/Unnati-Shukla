'use client';

import { clinic, socials, doctor } from '@/lib/content';

const nav = [
  { label: 'Journey', href: '#journey' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Specialist', href: '#specialist' },
  { label: 'Book', href: '#book' },
];

const social = [
  { label: 'Instagram', href: socials.instagram },
  { label: 'Facebook', href: socials.facebook },
  { label: 'KiviHealth', href: socials.kivihealth },
  { label: 'EyeWiki', href: socials.eyewiki },
  { label: 'Google Maps', href: socials.maps },
];

export default function Footer() {
  return (
    <footer className="force-dark relative overflow-hidden border-t border-white/10 bg-ink pt-20">
      <div className="container-p">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-retina-cyan to-retina-purple opacity-80 blur-[2px]" />
                <span className="absolute inset-[3px] rounded-full bg-ink" />
                <span className="relative h-2 w-2 rounded-full bg-retina-cyan shadow-[0_0_10px_rgba(56,225,255,0.9)]" />
              </span>
              <span className="font-display text-xl text-white">{clinic.name}</span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-white/50">
              Advanced retina care in {clinic.city}. {doctor.name}, {doctor.role} —
              protecting and restoring vision with precision and compassion.
            </p>
            <p className="mt-6 text-sm text-white/40">{clinic.addressLine}</p>
            <p className="text-sm text-white/40">{clinic.hours}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Explore</h4>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-white/70 transition hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Connect</h4>
            <ul className="mt-5 space-y-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition hover:text-accent"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p>
            Medical information is educational and not a substitute for professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
