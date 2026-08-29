import type { ReactNode, CSSProperties } from "react";
import { useReveal } from "../hooks";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "tr" | "article";
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <Tag ref={ref as never} style={style} className={`reveal ${inView ? "in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------- section shell ---------- */
export function SectionShell({
  id,
  index,
  title,
  kicker,
  intro,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.05);
  return (
    <section id={`sec-${id}`} className="relative scroll-mt-24 border-t border-line/70 py-14 md:py-20">
      <div ref={ref} className={`reveal ${inView ? "in" : ""}`}>
        <div className="mb-8 flex items-start gap-5 md:mb-10 md:gap-8">
          <div
            aria-hidden
            className="font-display pointer-events-none select-none text-[64px] leading-[0.85] font-bold text-ink-700/80 md:text-[104px]"
          >
            {index}
          </div>
          <div className="min-w-0 pt-1 md:pt-3">
            <p className="font-mono text-[11px] tracking-[0.28em] text-teal uppercase">{kicker}</p>
            <span className={`line-mask ${inView ? "in" : ""} mt-1.5`}>
              <span className="font-display text-2xl font-bold tracking-tight text-paper uppercase md:text-4xl">
                {title}
              </span>
            </span>
            {intro ? <div className="mt-3 max-w-3xl text-sm leading-relaxed text-mute">{intro}</div> : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- badges ---------- */
const TONES: Record<string, string> = {
  teal: "text-teal border-teal/40 bg-teal/10",
  amber: "text-amber border-amber/40 bg-amber/10",
  coral: "text-coral border-coral/45 bg-coral/10",
  ice: "text-ice border-ice/40 bg-ice/10",
  mute: "text-mute border-ink-600 bg-ink-800/60",
  paper: "text-paper border-ink-600 bg-ink-800/40",
};

export function Badge({
  tone = "mute",
  children,
  className = "",
}: {
  tone?: keyof typeof TONES;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Chip({ children, tone = "mute" }: { children: ReactNode; tone?: keyof typeof TONES }) {
  return (
    <span className={`inline-flex items-center border px-2 py-1 font-mono text-[11px] leading-none ${TONES[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- stamp ---------- */
export function Stamp({ text, tone = "coral", className = "" }: { text: string; tone?: "coral" | "amber" | "teal"; className?: string }) {
  const c = tone === "coral" ? "text-coral border-coral" : tone === "amber" ? "text-amber border-amber" : "text-teal border-teal";
  return (
    <span
      className={`anim-stamp stamp-tilt inline-block border-[3px] px-4 py-1.5 font-display text-sm font-bold tracking-[0.22em] uppercase ${c} ${className}`}
      style={{ boxShadow: "inset 0 0 0 1.5px currentColor" }}
    >
      {text}
    </span>
  );
}

/* ---------- custom inline icons (16px stroke) ---------- */
type IconProps = { className?: string };
const base = "inline-block h-4 w-4 shrink-0";

export function IconNode({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <circle cx="8" cy="8" r="2.4" />
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.4 3.4l2.1 2.1M10.5 10.5l2.1 2.1M12.6 3.4l-2.1 2.1M5.5 10.5l-2.1 2.1" />
    </svg>
  );
}
export function IconShield({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M8 1.8 13.5 4v4c0 3.4-2.3 5.6-5.5 6.7C4.8 13.6 2.5 11.4 2.5 8V4L8 1.8Z" />
      <path d="m5.8 8 1.6 1.6L10.4 6.6" />
    </svg>
  );
}
export function IconLedger({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <rect x="2.5" y="2" width="11" height="12" />
      <path d="M5 5.5h6M5 8h6M5 10.5h3.5" />
    </svg>
  );
}
export function IconSync({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M2.5 8a5.5 5.5 0 0 1 9.4-3.9M13.5 8a5.5 5.5 0 0 1-9.4 3.9" />
      <path d="M12 1.5v3h-3M4 14.5v-3h3" />
    </svg>
  );
}
export function IconFreeze({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M8 1.5v13M2.4 4.75l11.2 6.5M13.6 4.75l-11.2 6.5" />
      <path d="m8 1.5-1.7 1.7M8 1.5l1.7 1.7M8 14.5l-1.7-1.7M8 14.5l1.7-1.7" />
    </svg>
  );
}
export function IconEye({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M1.8 8s2.4-4.3 6.2-4.3S14.2 8 14.2 8 11.8 12.3 8 12.3 1.8 8 1.8 8Z" />
      <circle cx="8" cy="8" r="1.9" />
    </svg>
  );
}
export function IconLock({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <rect x="3" y="7" width="10" height="7" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2M8 10v1.5" />
    </svg>
  );
}
export function IconArrow({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
export function IconSwap({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`} aria-hidden>
      <path d="M3 5.5h10M10 2.5l3 3-3 3M13 10.5H3M6 7.5l-3 3 3 3" />
    </svg>
  );
}
