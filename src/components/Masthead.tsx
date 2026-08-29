import { useEffect, useState } from "react";
import { useClock, useScramble, usePrefersReducedMotion } from "../hooks";
import { EXCLUDED_REPOS, TICKER_LINES } from "../data";
import { Badge, IconEye, IconLock, Stamp } from "./ui";

export default function Masthead({
  masked,
  onToggleMasked,
}: {
  masked: boolean;
  onToggleMasked: () => void;
}) {
  const clock = useClock();
  const reduced = usePrefersReducedMotion();
  const title = useScramble("REPOSITORY CONSTELLATION", 24);
  const artifact = useScramble("QWEN_HUI_REPOSITORY_CONSTELLATION_V0_1", 12);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setTick((v) => v + 1), 2600);
    return () => window.clearInterval(t);
  }, []);

  const creed = ["OBSERVED ≠ AUTHORIZED", "IMPLEMENTED ≠ ACCEPTED", "ACCEPTED ≠ DEPLOYED"];

  return (
    <header className="relative overflow-hidden border-b border-line/70">
      <div className="scanline" aria-hidden />
      {/* status strip */}
      <div className="border-b border-line/70 bg-ink-900/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-mute uppercase md:px-8">
          <span className="flex items-center gap-2 text-paper">
            <span className="anim-pulse-teal inline-block h-2 w-2 rounded-full bg-teal" />
            QWEN CODE <span className="text-faint">//</span> MUSA X.X
          </span>
          <Badge tone="teal">READ_FIRST · SYNTHESIZE_BEFORE_WRITE</Badge>
          <span className="ml-auto hidden items-center gap-2 sm:flex">
            <IconLock className="text-amber" />
            REMOTE READ: <span className="text-amber">UNAVAILABLE</span>
          </span>
          <span className="tabular-nums text-ice">{clock} UTC</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-14 pb-12 md:grid-cols-[1.5fr_1fr] md:px-8 md:pt-20 md:pb-16">
        {/* left: title block */}
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.34em] text-amber uppercase">
            Cross-repository reconstruction &amp; synthesis
          </p>
          <h1
            className="font-display mt-4 text-[13vw] leading-[0.92] font-bold tracking-tight text-paper uppercase md:text-[76px]"
            aria-label="Repository Constellation"
          >
            {title || "\u00A0"}
          </h1>
          <p className="font-mono mt-5 text-[12px] break-all text-teal md:text-sm">
            <span className="text-faint">artifact:</span> {artifact || "\u00A0"}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {creed.map((c, i) => (
              <span
                key={c}
                className="corners border border-line bg-ink-850/80 px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] text-mute"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {c.split("≠")[0]}
                <span className="mx-1.5 font-display font-bold text-coral">≠</span>
                {c.split("≠")[1]}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#sec-A"
              className="group corners inline-flex items-center gap-3 border border-teal/50 bg-teal/10 px-5 py-3 font-display text-sm font-semibold tracking-[0.18em] text-teal uppercase transition-colors duration-300 hover:bg-teal/20"
            >
              <IconEye className="transition-transform duration-300 group-hover:translate-x-0.5" />
              Enter Section A — the map
            </a>
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              merge state: <span className="text-coral">FROZEN</span>
            </span>
          </div>
        </div>

        {/* right: ground-truth panel + ticker */}
        <div className="flex flex-col gap-4">
          <div className="corners border border-amber/40 bg-ink-900/80 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-sm font-bold tracking-[0.22em] text-amber uppercase">
                Ground-truth notice
              </h2>
              <Badge tone="amber">EP-0</Badge>
            </div>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-mute">
              <li className="flex gap-2.5">
                <span className="text-amber">▸</span>
                No remote read of the HUI-HolOmniverse org was performed in this environment —
                <span className="text-paper"> 0 bytes fetched</span>. All structure below is
                reconstruction from the mission text and naming conventions, flagged{" "}
                <Badge tone="amber" className="text-[9px]!">INFERRED</Badge>.
              </li>
              <li className="flex gap-2.5">
                <span className="text-amber">▸</span>
                Diffs for <span className="font-mono text-paper">b0385da</span> and{" "}
                <span className="font-mono text-paper">c1136a4</span> are unretrievable here; PR
                reconciliation is handled by protocol in Section F, not by assertion.
              </li>
              <li className="flex gap-2.5">
                <span className="text-amber">▸</span>
                {EXCLUDED_REPOS.map((r) => r.name).join(" and ")} — access{" "}
                <span className="text-paper">not attempted</span>, per directive.
              </li>
            </ul>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/70 pt-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                epistemic display
              </span>
              <button
                onClick={onToggleMasked}
                role="switch"
                aria-checked={masked}
                className={`group relative inline-flex h-6 w-12 items-center border transition-colors duration-300 ${
                  masked ? "border-amber/70 bg-amber/15" : "border-ink-600 bg-ink-800"
                }`}
              >
                <span
                  className={`absolute h-4 w-4 transition-all duration-300 ${
                    masked ? "left-6.5 bg-amber" : "left-1 bg-faint group-hover:bg-mute"
                  }`}
                />
                <span className="sr-only">Toggle masking of inferred data</span>
              </button>
              <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                {masked ? "INFERRED MASKED" : "INFERRED SHOWN"}
              </span>
            </div>
          </div>

          <div className="corners flex min-h-[86px] items-center border border-line bg-ink-900/60 px-5 py-4">
            <div className="flex w-full items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">recon log</span>
              <p
                key={tick}
                className={`anim-ticker font-mono text-[12px] text-ice ${reduced ? "" : ""}`}
              >
                <span className="text-teal">▸</span> {TICKER_LINES[tick % TICKER_LINES.length]}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <Stamp text="DO NOT MERGE" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              applies: #103 · #104
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
