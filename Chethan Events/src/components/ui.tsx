import React from "react";
import { useInView } from "../hooks";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.12);
  return (
    <Tag
      ref={ref}
      className={cn("reveal", seen && "in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children, tone = "marigold" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-body text-[11px] font-bold uppercase tracking-[0.28em]",
        tone === "marigold" && "text-marigold",
        tone === "peacock" && "text-peacock",
        tone === "cream" && "text-cream/70"
      )}
    >
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  italic,
  lead,
  tone = "marigold",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  lead?: string;
  tone?: "marigold" | "peacock";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={70}>
        <h2
          className={cn(
            "mt-4 font-display text-[clamp(2.1rem,5.4vw,4.1rem)] font-black leading-[0.95] tracking-[-0.025em] text-cream"
          )}
        >
          {title}{" "}
          {italic && (
            <em
              className={cn(
                "italic font-light",
                tone === "marigold" ? "text-marigold" : "text-peacock"
              )}
            >
              {italic}
            </em>
          )}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
          <p
            className={cn(
              "mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-cream/65 sm:text-base",
              align === "center" && "mx-auto"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marigold logo mark                                                  */
/* ------------------------------------------------------------------ */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9", className)} aria-hidden>
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="24"
            cy="11"
            rx="5.2"
            ry="8.4"
            fill="#F5A524"
            opacity={i % 2 ? 0.72 : 1}
            transform={`rotate(${i * 45} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="6.4" fill="#D2402F" />
        <circle cx="24" cy="24" r="2.6" fill="#FFC94A" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* String of bulbs                                                     */
/* ------------------------------------------------------------------ */
export function BulbString({
  count = 26,
  className,
  sag = 26,
}: {
  count?: number;
  className?: string;
  sag?: number;
}) {
  const W = 1440;
  const H = 100;
  const bulbs = Array.from({ length: count }).map((_, i) => {
    const t = (i + 0.5) / count;
    const x = t * W;
    const y = 8 + Math.sin(t * Math.PI) * sag;
    return { x, y, i };
  });
  const d = `M0 8 Q ${W / 2} ${8 + sag * 2} ${W} 8`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      aria-hidden
    >
      <path d={d} fill="none" stroke="rgba(224,179,106,0.5)" strokeWidth="1.4" />
      {bulbs.map(({ x, y, i }) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x} y2={y + 7} stroke="rgba(224,179,106,0.55)" strokeWidth="1.2" />
          <circle
            cx={x}
            cy={y + 12}
            r="4.6"
            fill={i % 3 === 0 ? "#FFC94A" : i % 3 === 1 ? "#F5A524" : "#D2402F"}
            className="a-twinkle"
            style={{ ["--delay" as string]: `${(i % 9) * 0.31}s`, ["--dur" as string]: `${2 + (i % 5) * 0.4}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Falling marigold petals                                             */
/* ------------------------------------------------------------------ */
export function Petals({ count = 14, className }: { count?: number; className?: string }) {
  const petals = Array.from({ length: count }).map((_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return {
      left: r(1) * 100,
      dur: 11 + r(2) * 12,
      delay: -r(3) * 20,
      drift: (r(4) - 0.5) * 220,
      size: 6 + r(5) * 9,
      color: ["#F5A524", "#FFC94A", "#D2402F", "#E0B36A"][i % 4],
    };
  });
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="a-petal absolute top-0 block rounded-[60%_40%_55%_45%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.82,
            background: p.color,
            opacity: 0.75,
            boxShadow: `0 0 12px ${p.color}55`,
            ["--dur" as string]: `${p.dur}s`,
            ["--delay" as string]: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rangoli / mandala background                                        */
/* ------------------------------------------------------------------ */
export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn("a-spin-slow", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="196" opacity="0.5" />
        <circle cx="200" cy="200" r="150" opacity="0.35" />
        <circle cx="200" cy="200" r="96" opacity="0.45" />
        <circle cx="200" cy="200" r="44" opacity="0.3" />
        {Array.from({ length: 24 }).map((_, i) => (
          <ellipse key={`a${i}`} cx="200" cy="104" rx="17" ry="44" opacity="0.4" transform={`rotate(${i * 15} 200 200)`} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={`b${i}`} d="M200 200 L200 4" opacity="0.18" transform={`rotate(${i * 22.5} 200 200)`} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={`c${i}`} cx="200" cy="150" r="9" opacity="0.35" transform={`rotate(${i * 30} 200 200)`} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
export function Marquee({
  items,
  dur = 42,
  className,
  separator = "✦",
}: {
  items: string[];
  dur?: number;
  className?: string;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="font-display text-[clamp(1rem,2vw,1.55rem)] font-semibold tracking-tight">{t}</span>
          <span className="mx-6 text-marigold/70 sm:mx-9">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("edge-fade overflow-hidden", className)}>
      <div className="a-marquee flex w-max" style={{ ["--dur" as string]: `${dur}s` }}>
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
export function Btn({
  href,
  children,
  variant = "solid",
  className,
  onClick,
  external,
  type,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "outline" | "dark";
  className?: string;
  onClick?: () => void;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 font-body text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97] disabled:opacity-50",
    variant === "solid" &&
      "bg-marigold text-ink shadow-[0_10px_30px_-10px_rgba(245,165,36,0.8)] hover:bg-haldi hover:shadow-[0_16px_40px_-12px_rgba(255,201,74,0.9)] hover:-translate-y-0.5",
    variant === "dark" && "bg-kumkum text-cream hover:bg-[#e04a37] hover:-translate-y-0.5",
    variant === "outline" &&
      "border border-gold/40 text-cream hover:border-marigold hover:bg-marigold/10 hover:-translate-y-0.5",
    variant === "ghost" && "text-cream/75 hover:text-marigold",
    className
  );
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {variant !== "ghost" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );
  if (href)
    return (
      <a
        href={href}
        className={styles}
        onClick={onClick}
        {...(external && !href.startsWith("https://wa.me/") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  return (
    <button type={type ?? "button"} className={styles} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
