'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clinic } from '@/lib/content';

export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-6 right-6 z-[120] flex flex-col gap-3"
        >
          <a
            href={clinic.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            data-cursor="hover"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.1.1.5-.1 1.2z" />
            </svg>
          </a>
          <a
            href={clinic.phoneHref}
            aria-label="Call"
            data-cursor="hover"
            className="flex h-14 w-14 items-center justify-center rounded-full glass-strong shadow-glass transition-transform hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38E1FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 011-2z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
