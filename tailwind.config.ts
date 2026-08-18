import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic tokens (flip with light/dark). Alpha-enabled.
        fg: 'rgb(var(--fg) / <alpha-value>)',
        page: 'rgb(var(--page) / <alpha-value>)',
        alt: 'rgb(var(--alt) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-emerald': 'rgb(var(--accent-emerald) / <alpha-value>)',
        // Brand palette
        medical: {
          blue: '#0E4D92',
          navy: '#071A33',
          deepnavy: '#04101F',
        },
        retina: {
          cyan: '#38E1FF',
          glow: '#5CC8FF',
          purple: '#7A5CFF',
          violet: '#A66BFF',
          emerald: '#25E0A4',
        },
        ink: '#0A1220',
        mist: '#F4F8FC',
        haze: '#E6EEF6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      transitionTimingFunction: {
        // Strong custom curves (Emil Kowalski) — built-in easings are too weak for deliberate UI motion.
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 40px -12px rgba(14, 77, 146, 0.35)',
        glow: '0 18px 50px -14px rgba(56, 225, 255, 0.5)',
        lift: '0 30px 80px -30px rgba(4, 16, 31, 0.65)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.4,0,0.2,1) infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
