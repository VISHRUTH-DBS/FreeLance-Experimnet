interface P {
  className?: string;
  strokeWidth?: number;
}

const base = "shrink-0";

export const IconPhone = ({ className = "", strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path
      d="M6.5 3h3l1.6 4-2 1.3a12.5 12.5 0 0 0 5.6 5.6L16 11.9l4 1.6v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconWhatsapp = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.9 9.9 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.36 5.68c0 4.44-3.61 8.05-8.05 8.05a8.1 8.1 0 0 1-4.1-1.12l-.3-.18-3.06.8.82-2.99-.19-.31a8 8 0 0 1-1.23-4.25c0-4.44 3.62-8.04 8.06-8.04Zm-3.2 4.06c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.74-1.8-.19-.46-.39-.4-.53-.4h-.5Z" />
  </svg>
);

export const IconInstagram = ({ className = "", strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
  </svg>
);

export const IconPin = ({ className = "", strokeWidth = 1.6 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path
      d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconStar = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5l1.11-6.47L2.6 9.45l6.5-.95L12 2.6Z" />
  </svg>
);

export const IconArrow = ({ className = "", strokeWidth = 1.7 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path
      d="M4 12h15m0 0-6-6m6 6-6 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconChevron = ({ className = "", strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="m8 5 7 7-7 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClose = ({ className = "", strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconCheck = ({ className = "", strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="m4 12.5 5 5L20 6.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPlus = ({ className = "", strokeWidth = 1.9 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconMenu = ({ className = "", strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

/* ---------- occasion icons ---------- */

export const IconCake = ({ className = "", strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M4 20h16v-6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v6Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M4 16c1.6 0 1.6 1.4 3.2 1.4S8.8 16 10.4 16s1.6 1.4 3.2 1.4S15.2 16 16.8 16s1.6 1.4 3.2 1.4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8 11V8m4 3V7.5m4 3.5V8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8 5.4c0-.9.9-1.4.9-1.4s.9.5.9 1.4-.9 1.3-.9 1.3-.9-.4-.9-1.3Zm4-.4c0-.9.9-1.4.9-1.4s.9.5.9 1.4-.9 1.3-.9 1.3-.9-.4-.9-1.3Zm4 .4c0-.9.9-1.4.9-1.4s.9.5.9 1.4-.9 1.3-.9 1.3-.9-.4-.9-1.3Z" fill="currentColor" />
  </svg>
);

export const IconRings = ({ className = "", strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <circle cx="9" cy="14.5" r="5.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="15.4" cy="14.5" r="5.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="m12 3.4 2 2.6h-4l2-2.6Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

export const IconBaby = ({ className = "", strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <circle cx="12" cy="9.5" r="5.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M10 8.6h.01M14 8.6h.01" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    <path d="M10.3 11.6c1 .9 2.4.9 3.4 0" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M5.2 18.4c1.4-1.7 4-2.6 6.8-2.6s5.4.9 6.8 2.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconCradle = ({ className = "", strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M4 9h16l-1.6 7.2a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6L4 9Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M12 9V5.5M9 5.5h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M2.5 19.5c2.2 1.6 4.6 1.6 6.8 0 2.2 1.6 4.6 1.6 6.8 0 1.1.8 2.3 1.2 3.4 1" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconBulb = ({ className = "", strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M9.5 17.5a6 6 0 1 1 5 0v1.7a1.8 1.8 0 0 1-1.8 1.8h-1.4a1.8 1.8 0 0 1-1.8-1.8v-1.7Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M10 21h4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconFlower = ({ className = "", strokeWidth = 1.4 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth={strokeWidth} />
    {[0, 60, 120, 180, 240, 300].map((d) => (
      <ellipse
        key={d}
        cx="12"
        cy="6.6"
        rx="2.5"
        ry="3.6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        transform={`rotate(${d} 12 12)`}
      />
    ))}
  </svg>
);

export const IconSparkle = ({ className = "", strokeWidth = 1.4 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M12 3c.7 4.3 2.7 6.3 7 7-4.3.7-6.3 2.7-7 7-.7-4.3-2.7-6.3-7-7 4.3-.7 6.3-2.7 7-7Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M18.5 16.2c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

export const ICONS: Record<string, (p: P) => React.ReactElement> = {
  cake: IconCake,
  rings: IconRings,
  baby: IconBaby,
  cradle: IconCradle,
  bulb: IconBulb,
  flower: IconFlower,
  sparkle: IconSparkle,
};
