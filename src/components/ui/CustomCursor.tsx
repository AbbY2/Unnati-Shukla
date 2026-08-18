'use client';

import { useEffect, useRef, useState } from 'react';

// A soft glowing cursor blob with a trailing ring. Hidden on touch devices.
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive =
        t instanceof Element &&
        !!t.closest('a, button, [data-cursor="hover"], input, textarea, select');
      if (interactive !== hovering) {
        hovering = interactive;
        ring.current?.classList.toggle('cursor-hovering', hovering);
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x - 20}px, ${ringPos.y - 20}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-retina-cyan"
        style={{ boxShadow: '0 0 12px 2px rgba(56,225,255,0.9)' }}
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-retina-cyan/50 transition-[width,height,background,border-color] duration-300"
      />
      <style jsx global>{`
        .cursor-ring.cursor-hovering {
          width: 64px;
          height: 64px;
          margin-left: -12px;
          margin-top: -12px;
          background: rgba(56, 225, 255, 0.08);
          border-color: rgba(122, 92, 255, 0.7);
        }
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a,
          button {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
