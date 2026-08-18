'use client';

import { clinic, socials } from '@/lib/content';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export default function Locations() {
  return (
    <section className="relative bg-page py-28 md:py-36">
      <div className="container-p">
        <SectionHeading
          title={
            <>
              Find us in
              <br />
              <span className="text-gradient italic">the heart of Ahmedabad.</span>
            </>
          }
          align="left"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Info card */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl glass-strong p-8">
              <div>
                <h3 className="font-display text-2xl text-fg">{clinic.name}</h3>
                <div className="mt-6 space-y-5 text-sm">
                  <Row icon="pin" label="Address" value={clinic.addressLine} />
                  <Row icon="clock" label="Hours" value={clinic.hours} />
                  <Row icon="phone" label="Phone" value={clinic.phone} />
                  <Row icon="mail" label="Email" value={clinic.email} />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={socials.maps} target="_blank" rel="noopener noreferrer" className="btn-primary pt-3.5" data-cursor="hover">
                  Get Directions
                </a>
                <a href="#book" className="btn-ghost pt-3.5" data-cursor="hover">
                  Book Appointment
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="relative h-[380px] overflow-hidden rounded-3xl glass lg:h-full">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-page/50 to-transparent" />
              {/* pulsing pin overlay */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-retina-cyan opacity-70" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-retina-cyan shadow-[0_0_16px_rgba(56,225,255,0.9)]" />
                </span>
              </div>
              <iframe
                title="Unnati Retina Clinic location"
                src={clinic.mapEmbed}
                className="h-full w-full [filter:grayscale(0.2)_contrast(1.05)] dark:[filter:invert(0.9)_hue-rotate(180deg)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const paths: Record<string, string> = {
  pin: 'M12 21s-7-4.35-7-10a7 7 0 1114 0c0 5.65-7 10-7 10zM12 11a2 2 0 100-4 2 2 0 000 4z',
  clock: 'M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z',
  phone: 'M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 011-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
};

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-retina-cyan/10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38E1FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={paths[icon]} />
        </svg>
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-fg/60">{label}</div>
        <div className="mt-0.5 text-fg/80">{value}</div>
      </div>
    </div>
  );
}
