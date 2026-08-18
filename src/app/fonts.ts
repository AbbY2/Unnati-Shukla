import localFont from 'next/font/local';

// Be Vietnam Pro — self-hosted from Bunny Fonts (fonts.bunny.net), no Google.
// Drives both --font-sans (body/UI) and --font-display (headlines, via globals.css).
export const beVietnamPro = localFont({
  src: [
    { path: '../../public/fonts/bvp-300.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/bvp-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/bvp-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/bvp-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/bvp-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/bvp-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../../public/fonts/bvp-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/bvp-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
