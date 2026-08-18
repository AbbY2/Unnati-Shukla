'use client';

// A compact stylised retina used inside condition cards / modals.
// `affected` highlights a damaged region; `treated` shows the healed state.
export default function RetinaGlyph({
  accent,
  affected = false,
  treated = false,
  className = '',
}: {
  accent: string;
  affected?: boolean;
  treated?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id={`fund-${accent}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity={treated ? 0.9 : 0.6} />
          <stop offset="60%" stopColor="#d98a5c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7a2f2f" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill={`url(#fund-${accent})`} />
      {/* vessels */}
      <g stroke="#c9483a" strokeWidth="2.4" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M100,100 C80,70 60,55 30,45" />
        <path d="M100,100 C120,72 150,60 175,52" />
        <path d="M100,100 C85,135 70,160 45,175" />
        <path d="M100,100 C120,140 140,160 165,172" />
      </g>
      {/* optic disc */}
      <circle cx="100" cy="100" r="12" fill="#ffeec4" opacity="0.7" />
      {/* macula */}
      <circle cx="132" cy="112" r="16" fill="#a83c2c" opacity="0.3" />

      {/* affected region */}
      {affected && !treated && (
        <>
          <circle cx="132" cy="112" r="24" fill={accent} opacity="0.28">
            <animate attributeName="r" values="20;28;20" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="132" cy="112" r="30" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        </>
      )}
      {treated && (
        <circle cx="132" cy="112" r="18" fill="none" stroke={accent} strokeWidth="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
