'use client';

import { clinic, socials, doctor } from '@/lib/content';

const nav = [
  { label: 'Journey', href: '#journey' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Specialist', href: '#specialist' },
  { label: 'Book', href: '#book' },
];

// Icon links — recognisable brand marks
const iconSocials = [
  {
    label: 'Instagram',
    href: socials.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: socials.facebook,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-7.03h2.36l.35-2.74H13.5V9.48c0-.79.22-1.33 1.36-1.33h1.45V5.7c-.25-.03-1.11-.1-2.11-.1-2.1 0-3.53 1.28-3.53 3.63v2.03H8.25v2.74h2.36V21z" />
      </svg>
    ),
  },
  {
    label: 'Google Maps',
    href: socials.maps,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6.5-4.2-6.5-9.5a6.5 6.5 0 1113 0C18.5 16.8 12 21 12 21z" />
        <circle cx="12" cy="11.2" r="2.3" />
      </svg>
    ),
  },
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
            <p className="mt-6 font-display text-lg text-white">{doctor.name}</p>
            <p className="mt-1.5 max-w-xs text-sm text-white/65">
              {doctor.role} · Advanced retina care in {clinic.city} — protecting and
              restoring vision with precision and compassion.
            </p>
            <p className="mt-6 text-sm text-white/55">{clinic.addressLine}</p>
            <p className="text-sm text-white/55">{clinic.hours}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/55">Explore</h4>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-white/75 transition hover:text-retina-cyan">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/55">Connect</h4>

            {/* Icon links */}
            <div className="mt-5 flex gap-3">
              {iconSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-white/85 transition duration-300 ease-out-strong hover:-translate-y-0.5 hover:text-retina-cyan"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p>Medical information is educational and not a substitute for professional advice.</p>
        </div>
      </div>
    </footer>
  );
}
